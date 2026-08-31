# NER Smart Logistics Platform — Backend Implementation Plan
### Admin & Transporter Dashboards

**Scope:** JWT-authenticated REST API (Node.js/Express), ML risk-scoring service (FastAPI), PostgreSQL+PostGIS for spatial/structured data, MongoDB for unstructured field data, Redis for caching and real-time alerts. Dummy-but-realistic seed data throughout; real third-party APIs (weather, GPS, SMS, Bhashini) to be wired in later once credentials are provided. **Do not fabricate real API keys, credentials, or endpoints — use placeholders until provided.**

---

## 1. Architecture Overview

Three independent services, one shared PostgreSQL+PostGIS database, one shared MongoDB database, one Redis instance:

- **core-backend** — Node.js + Express + TypeScript. Handles auth, all admin + transporter CRUD, dashboard aggregation endpoints, WebSocket gateway (Socket.io) for live tracking and alerts.
- **ml-service** — Python + FastAPI. Hosts the risk engine, route-risk scoring, disruption prediction, alternate-route suggestion. Called internally by core-backend over HTTP (service-to-service, not exposed to frontend directly).
- **PostgreSQL + PostGIS** — districts, roads, bridges, routes, vehicles, deliveries, risk scores (anything spatial or relational).
- **MongoDB** — field incident reports, alerts/notifications log, uploaded media metadata, audit logs (anything unstructured/high-write/document-shaped).
- **Redis** — JWT refresh-token/session cache, live vehicle-position cache, alert pub/sub channel feeding Socket.io, rate limiting.

```
Frontend (Admin) ─┐
Frontend (Transporter) ─┼──► core-backend (Express, :5000) ──► PostgreSQL+PostGIS
                          │        │                    ──► MongoDB
                          │        │                    ──► Redis (cache + pub/sub)
                          │        └──► Socket.io (live tracking, alerts)
                          │
                          └──► ml-service (FastAPI, :8000) — called server-side only
```

---

## 2. Repository / Folder Structure

Monorepo, three top-level services plus shared types:

```
ner-logistics-platform/
├── core-backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/               # db.ts, redis.ts, env.ts
│   │   ├── models/
│   │   │   ├── postgres/         # Sequelize/Prisma models (District, Road, Bridge, Route, Vehicle, Delivery, RiskScore, User)
│   │   │   └── mongo/            # Mongoose models (FieldReport, Alert, AuditLog)
│   │   ├── middleware/           # auth.middleware.ts, validate.middleware.ts, role.middleware.ts, error.middleware.ts
│   │   ├── modules/
│   │   │   ├── auth/             # controller, service, routes, validators
│   │   │   ├── admin/            # overview, districts, routes, alerts, field-reports, supply-chain, users
│   │   │   ├── transporter/      # trips, tracking, deliveries, vehicles, drivers, documents
│   │   │   ├── vehicles/
│   │   │   ├── alerts/
│   │   │   └── ml-proxy/         # calls ml-service, caches results
│   │   ├── sockets/               # socket.io gateway, room logic
│   │   ├── seed/                  # dummy data seed scripts
│   │   ├── utils/
│   │   └── app.ts, server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── ml-service/                    # Python + FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/               # risk.py, route_suggestion.py, disruption.py
│   │   ├── models/                # pydantic schemas
│   │   ├── engine/                # risk_scoring.py, route_optimizer.py, weather_dummy.py
│   │   └── data/                  # dummy district/road/weather fixtures (JSON)
│   ├── requirements.txt
│   └── .env.example
├── shared/
│   └── types/                     # OpenAPI spec / shared TS+Pydantic contracts
├── docker-compose.yml              # postgres+postgis, mongo, redis, core-backend, ml-service
└── README.md
```

---

## 3. Database Design

### 3.1 PostgreSQL + PostGIS — spatial & structured data

| Table | Key Columns | Notes |
|---|---|---|
| districts | id, name, state, geom (POLYGON), connectivity_status, population | connectivity_status enum: accessible / partial / blocked |
| roads | id, name, district_id, geom (LINESTRING), road_type, condition, last_verified_at | condition enum: good / damaged / blocked |
| bridges | id, name, road_id, geom (POINT), status, load_capacity_tons | status enum: operational / damaged / closed |
| routes | id, origin_district_id, dest_district_id, road_ids[], geom (LINESTRING), distance_km, avg_travel_hours | used for AI route suggestion + delay estimation |
| risk_scores | id, route_id, score (0-100), risk_level, factors (JSONB), computed_at | written by ml-service via core-backend, one row per route per compute cycle |
| vehicles | id, reg_number, transporter_id, type, capacity_kg, status, current_lat, current_lng, last_ping_at | status enum: idle / on_trip / maintenance |
| drivers | id, name, license_number, license_expiry, vehicle_id, transporter_id, phone | |
| trips | id, vehicle_id, driver_id, route_id, origin, destination, status, started_at, eta, actual_arrival_at | status enum: planned / in_transit / delayed / completed |
| deliveries | id, trip_id, commodity_type, priority, consignee, status, pod_url | commodity_type: medicine / food / agri / construction; priority derived from commodity_type |
| users | id, name, email, password_hash, role, district_id (nullable), transporter_id (nullable) | role enum: admin / district_officer / field_agent / transporter / driver / viewer |

### 3.2 MongoDB — unstructured / high-write data

| Collection | Key Fields | Notes |
|---|---|---|
| field_reports | _id, reportedBy, districtId, location {lat,lng}, photos[], incidentType, description, status, createdAt | incidentType: landslide/flood/road_block/breakdown/accident; status: pending/verified/rejected |
| alerts | _id, type, severity, districtId, routeId, message, translations {en,as,bn,...}, channel, status, createdAt | type: blocked_road/inaccessible_region/delayed_delivery/high_risk_corridor |
| audit_logs | _id, userId, action, entityType, entityId, timestamp, meta | for admin traceability |
| notifications_log | _id, userId, alertId, channel (sms/app/push), deliveryStatus, sentAt | tracks multilingual notification delivery |

### 3.3 Redis — cache & real-time

- `refresh_token:<userId>` — rotating JWT refresh tokens, TTL matched to expiry
- `vehicle:live:<vehicleId>` — latest lat/lng/speed, TTL ~60s, updated on each GPS ping
- `alerts:pubsub` channel — core-backend publishes new alerts here; Socket.io gateway subscribes and pushes to connected clients (filtered by district/route relevance)
- `rate-limit:<ip or userId>` — sliding window counters for auth and public endpoints

---

## 4. Authentication & Authorization

- Single auth service in core-backend shared by both dashboards. JWT access token (15 min) + refresh token (7 days, stored hashed in Redis, rotated on use).
- Roles: `admin`, `district_officer`, `field_agent`, `transporter`, `driver`, `viewer`. Role embedded as a claim in the JWT; `role.middleware.ts` checks it per-route.
- Passwords hashed with bcrypt (cost 12). Login endpoint rate-limited via Redis to prevent brute force.
- Admin-only routes (user management, district config) require `role=admin`. Transporter routes require role in `[transporter, driver]` and are additionally scoped so a transporter only ever sees their own vehicles/trips/deliveries (enforced in the query layer, not just the route guard).

```
POST /api/auth/register        (admin creates users; self-signup disabled)
POST /api/auth/login           -> { accessToken, refreshToken, user }
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

---

## 5. REST API — Admin Dashboard

| Page | Key Endpoints |
|---|---|
| Overview | `GET /api/admin/overview/kpis`<br>`GET /api/admin/overview/recent-alerts` |
| District Map | `GET /api/admin/districts`<br>`GET /api/admin/districts/:id`<br>`GET /api/admin/districts/:id/roads` |
| Route Risk | `GET /api/admin/routes`<br>`GET /api/admin/routes/:id/risk` (proxies ml-service)<br>`GET /api/admin/routes/:id/alternates` |
| Vehicle Tracking | `GET /api/admin/vehicles`<br>`GET /api/admin/vehicles/:id`<br>`WS vehicle:position` (live) |
| Alerts & Incidents | `GET /api/admin/alerts`<br>`PATCH /api/admin/alerts/:id`<br>`POST /api/admin/alerts` (manual) |
| Field Reports | `GET /api/admin/field-reports`<br>`PATCH /api/admin/field-reports/:id/verify`<br>`PATCH /api/admin/field-reports/:id/reject` |
| Supply Chain | `GET /api/admin/supply-chain/gaps`<br>`GET /api/admin/deliveries?district=&commodity=` |
| Analytics | `GET /api/admin/analytics/disruption-trends`<br>`GET /api/admin/analytics/delay-trends`<br>`GET /api/admin/analytics/export` |
| User Management | `GET/POST/PATCH/DELETE /api/admin/users` |

---

## 6. REST API — Transporter Dashboard

| Page | Key Endpoints |
|---|---|
| Overview | `GET /api/transporter/overview/kpis` |
| Trip Planning | `POST /api/transporter/trips/plan` (calls ml-service route suggestion)<br>`POST /api/transporter/trips` |
| Live Tracking | `GET /api/transporter/vehicles`<br>`WS vehicle:position` (scoped to own fleet) |
| Alerts | `GET /api/transporter/alerts?relevant=true` |
| Delivery Management | `GET /api/transporter/deliveries`<br>`PATCH /api/transporter/deliveries/:id/status`<br>`POST /api/transporter/deliveries/:id/pod` |
| Vehicle/Driver Mgmt | `CRUD /api/transporter/vehicles`<br>`CRUD /api/transporter/drivers` |
| Incident Reporting | `POST /api/transporter/field-reports` (writes to shared field_reports collection) |
| Documents | `CRUD /api/transporter/documents` (permits, insurance, licenses + expiry tracking) |
| History/Reports | `GET /api/transporter/reports/history`<br>`GET /api/transporter/reports/export` |

> All transporter endpoints filter by `req.user.transporterId` at the query layer — never trust a client-supplied transporter id.

---

## 7. Real-Time Alerts Architecture

- GPS pings (dummy simulator for now) hit `POST /api/vehicles/:id/ping` → written to Redis (`vehicle:live:*`) and periodically flushed to Postgres.
- Socket.io gateway on core-backend: clients join rooms by role+district/transporterId on connect. Admin joins room `admin:all`; transporter joins `transporter:<id>`.
- New alert (from field report verification, risk engine breach, or manual admin action) is written to Mongo, then published to the Redis `alerts` channel with district/route metadata, then Socket.io gateway emits to the relevant rooms only.
- Multilingual delivery: alert stored with a `translations` map; for now populate via a dummy translation stub (returns same text tagged per language) — swap for Bhashini/Google Translate API later without changing the schema.

---

## 8. ML / Risk Engine (FastAPI)

Exposed only to core-backend, not the internet, on an internal network/port.

```
POST /risk/route-score        { routeId, roadIds, weatherSnapshot } -> { score, level, factors }
POST /risk/disruption-predict { districtId, weatherSnapshot }      -> { landslideRisk, floodRisk, confidence }
POST /route/suggest         { originDistrictId, destDistrictId }  -> { primary, alternates[], etaMinutes }
POST /vision/road-damage    { imageUrl }                          -> { damageDetected, severity, confidence }
```

### Risk scoring model (v1, dummy-data phase)

Weighted composite score, 0–100, recomputed per route on a schedule (e.g. every 15 min) and on-demand:

| Factor | Weight | Source (dummy phase) |
|---|---|---|
| Terrain/slope risk | 25% | static per-road value seeded from road metadata |
| Rainfall intensity (24h) | 25% | dummy weather fixture, swappable for IMD API |
| Historical disruption frequency | 20% | count of past field_reports/alerts on that route |
| Road/bridge condition | 20% | from roads.condition, bridges.status |
| Traffic congestion (separate model) | 10% | dummy congestion fixture by time-of-day |

Output bands: **0–30 low, 31–60 medium, 61–80 high, 81–100 critical**.

Implementation: start with this explicit weighted-rule engine (transparent, demo-able, no training data needed) behind the same FastAPI endpoint contract; an LSTM/regression model can be swapped in later without changing the API shape — feature flag `ENGINE_MODE=rule_based|ml_model` in ml-service `.env`.

---

## 9. Data Validation Strategy

- core-backend: Zod (or Joi) schemas per route, applied in `validate.middleware.ts` before controller logic runs; reject with `422` + field-level errors.
- ml-service: Pydantic models for every request/response — FastAPI validates automatically.
- Mongoose schemas enforce structure on write for field_reports/alerts; Sequelize/Prisma models + Postgres constraints (NOT NULL, enums, foreign keys) for relational data.
- File uploads (photos/PoD): validate mime-type + size limit at the middleware layer before hitting storage.

---

## 10. Dummy Data Seeding Strategy

Seed scripts under `core-backend/src/seed/`, run via `npm run seed`:

- 8–10 real NER districts (Assam, Meghalaya, Manipur, Nagaland, Tripura, Mizoram, Arunachal Pradesh, Sikkim) with approximate real boundaries/centroids so the map isn't obviously fake.
- ~30 roads/routes connecting them with realistic distance/travel-time values.
- ~15 dummy vehicles across 3–4 dummy transporter accounts, with a GPS ping simulator (`setInterval`-based) that nudges lat/lng along a route path so live tracking looks real.
- ~20 field reports and ~15 alerts across varying severities/types.
- One admin, a few district_officer/field_agent, and transporter/driver users with known login credentials documented in README for demo purposes.

---

## 11. Build Phases & Order

| Phase | Deliverable |
|---|---|
| 1 | Repo scaffold, docker-compose (Postgres+PostGIS, Mongo, Redis), env config, DB connections verified |
| 2 | Auth module end-to-end (register/login/refresh/JWT/RBAC middleware) + seed users |
| 3 | Postgres models + Mongo models + seed script (districts/roads/vehicles/etc.) |
| 4 | Admin REST endpoints (all 9 pages) returning seeded/dummy data, validated |
| 5 | Transporter REST endpoints (all 9 pages) returning seeded/dummy data, validated |
| 6 | ml-service scaffold + rule-based risk engine + route suggestion, wired via ml-proxy module |
| 7 | Socket.io real-time layer: live vehicle position + alert push, GPS ping simulator |
| 8 | Integration pass: connect to scanned frontend, fix contract mismatches, error handling, logging |

---

## 12. Setup Commands

### 12.1 Scaffold

```bash
mkdir ner-logistics-platform && cd ner-logistics-platform
mkdir core-backend ml-service shared

# core-backend
cd core-backend
npm init -y
npm install express cors helmet dotenv jsonwebtoken bcrypt \
  pg pg-hstore sequelize mongoose ioredis socket.io \
  zod morgan cookie-parser
npm install -D typescript ts-node-dev @types/node @types/express \
  @types/jsonwebtoken @types/bcrypt @types/cors
npx tsc --init
cd ..

# ml-service
cd ml-service
python3 -m venv venv && source venv/bin/activate
pip install fastapi uvicorn[standard] pydantic python-dotenv httpx numpy pandas
pip freeze > requirements.txt
cd ..
```

### 12.2 docker-compose.yml (Postgres+PostGIS, Mongo, Redis)

```yaml
services:
  postgres:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_DB: ner_logistics
      POSTGRES_USER: ner_admin
      POSTGRES_PASSWORD: change_me_local_only
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

  mongo:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: ["mongodata:/data/db"]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  pgdata:
  mongodata:
```

```bash
docker compose up -d
# then, from core-backend/:
npm run migrate      # once migration scripts exist
npm run seed
npm run dev           # ts-node-dev src/server.ts

# from ml-service/:
uvicorn app.main:app --reload --port 8000
```

---

## 13. Environment Variables (templates only — no real values)

### core-backend/.env.example

```
PORT=5000
NODE_ENV=development

POSTGRES_URI=postgres://ner_admin:change_me_local_only@localhost:5432/ner_logistics
MONGO_URI=mongodb://localhost:27017/ner_logistics
REDIS_URL=redis://localhost:6379

JWT_ACCESS_SECRET=replace_me
JWT_REFRESH_SECRET=replace_me
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

ML_SERVICE_URL=http://localhost:8000

# filled in later, not needed for dummy-data phase:
IMD_WEATHER_API_KEY=
SMS_GATEWAY_KEY=
BHASHINI_API_KEY=
```

### ml-service/.env.example

```
ENGINE_MODE=rule_based
CORE_BACKEND_INTERNAL_KEY=replace_me
```

---

## 14. Open Items — Needed Before Writing Code

- Frontend page/route names and API shape it already expects (from the Antigravity scan) — align every endpoint above to match exactly rather than adapting the frontend afterward.
- Confirm repo structure choice: monorepo as above, or backend as a standalone repo separate from existing frontend repos?
- Confirm Socket.io (not plain polling) is acceptable for live tracking/alerts on the frontend.
- Any existing Postgres/Mongo instance already provisioned (e.g. Atlas, RDS), or assume fully local via docker-compose for now?

Nothing above requires real credentials yet — everything runs on local Docker + dummy seed data. Do not fabricate real API keys, connection strings, or third-party endpoints; those get added only when provided.
