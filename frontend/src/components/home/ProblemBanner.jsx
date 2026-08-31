import React, { useState } from 'react';
import {
  TriangleAlert,
  Mountain,
  Info,
  Truck,
  Landmark,
  CloudRain,
  Radio,
  Route as RouteIcon,
  Sparkles,
  Activity,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const CHALLENGE_CHIPS = [
  {
    id: 'landslides',
    label: 'Landslides & Floods',
    shortLabel: 'Landslides & Floods',
    icon: TriangleAlert,
    type: 'warn',
    color: '#dc2626',
    markerId: 'marker-landslide',
  },
  {
    id: 'terrain',
    label: 'Remote Terrain',
    shortLabel: 'Remote Terrain',
    icon: Mountain,
    type: 'geo',
    color: '#059669',
    markerId: 'marker-terrain',
  },
  {
    id: 'info',
    label: 'Information Gaps',
    shortLabel: 'Information Gaps',
    icon: Info,
    type: 'info',
    color: '#0284c7',
    markerId: 'marker-info',
  },
  {
    id: 'supply',
    label: 'Supply Disruptions',
    shortLabel: 'Supply Disruptions',
    icon: Truck,
    type: 'supply',
    color: '#d97706',
    markerId: 'marker-supply',
  },
  {
    id: 'infra',
    label: 'Infrastructure Gaps',
    shortLabel: 'Infrastructure Gaps',
    icon: Landmark,
    type: 'infra',
    color: '#7c3aed',
    markerId: 'marker-infra',
  },
];

const MAP_MARKERS = [
  {
    id: 'marker-landslide',
    title: 'NH-29 Dzükou Ridge',
    tag: 'ACTIVE HAZARD',
    detail: 'Monsoon debris flow risk. Real-time sensor alert active.',
    icon: TriangleAlert,
    badgeColor: 'red',
    x: 77, // percentage from left
    y: 22, // percentage from top
    pulse: true,
  },
  {
    id: 'marker-weather',
    idChip: 'landslides',
    title: 'Cherrapunji–Mawlynnong Corridor',
    tag: 'WEATHER WARNING',
    detail: 'Heavy precipitation (>85mm/hr). Flood runoff advisory.',
    icon: CloudRain,
    badgeColor: 'amber',
    x: 69,
    y: 45,
    pulse: true,
  },
  {
    id: 'marker-terrain',
    title: 'Zunheboto Ridge Pass',
    tag: 'HIGH ELEVATION',
    detail: 'Elevation 1,850m. Gradient 14% with hairpin curves.',
    icon: Mountain,
    badgeColor: 'green',
    x: 61,
    y: 63,
    pulse: false,
  },
  {
    id: 'marker-infra',
    title: 'Barak River Single-Span',
    tag: 'CAPACITY BOTTLENECK',
    detail: 'Single-lane Bailey bridge. 25T axle load threshold.',
    icon: Landmark,
    badgeColor: 'purple',
    x: 87,
    y: 54,
    pulse: false,
  },
];

export function ProblemBanner() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [hoveredChip, setHoveredChip] = useState(null);

  return (
    <section className="ner-problem-banner reveal" id="ner-challenge">
      <div className="container ner-banner-card">
        {/* Left Column: Context, Typography & Categorized Challenge Pills */}
        <div className="ner-banner-left">
          {/* Eyebrow badge + Initiative title */}
          <div className="ner-banner-eyebrow">
            <span className="ner-badge">
              <span className="ner-badge-glyph" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </span>
              NER CHALLENGE
            </span>
            <span className="ner-eyebrow-divider" aria-hidden="true">|</span>
            <span className="ner-eyebrow-text">
              Northeast India Logistics Intelligence Initiative
            </span>
          </div>

          {/* Main Display Heading */}
          <h2 className="ner-banner-heading">
            <span className="ner-heading-main">Smart logistics for a stronger Northeast.</span>{' '}
            <span className="ner-heading-accent">Real-time intelligence. Better decisions.</span>
          </h2>

          {/* Body description */}
          <p className="ner-banner-text">
            The North Eastern Region faces major logistics challenges due to difficult terrain,
            extreme weather, limited connectivity, and frequent road disruptions from landslides &amp; floods —
            leading to supply shortages, increased costs, and disruption in public service delivery.
          </p>

          {/* Challenge Badges / Filter Chips */}
          <div className="ner-challenge-chips" role="list">
            {CHALLENGE_CHIPS.map((chip) => {
              const Icon = chip.icon;
              const isHighlighted =
                hoveredChip === chip.id ||
                (activeMarker &&
                  (chip.markerId === activeMarker ||
                    (chip.id === 'landslides' && activeMarker === 'marker-weather')));

              return (
                <button
                  type="button"
                  key={chip.id}
                  role="listitem"
                  className={`ner-chip ner-chip--${chip.type} ${isHighlighted ? 'ner-chip--active' : ''}`}
                  onMouseEnter={() => {
                    setHoveredChip(chip.id);
                    setActiveMarker(chip.markerId);
                  }}
                  onMouseLeave={() => {
                    setHoveredChip(null);
                    setActiveMarker(null);
                  }}
                  onClick={() => {
                    setActiveMarker((prev) => (prev === chip.markerId ? null : chip.markerId));
                  }}
                  aria-label={`Highlight ${chip.label} on map`}
                >
                  <Icon size={13} strokeWidth={2.4} className="ner-chip-icon" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Topographic Contour Map, Corridor Highway & Pinned Intelligence */}
        <div className="ner-banner-visual" aria-label="Interactive Topographic Elevation Map with Northeast Corridor Waypoints">
          {/* Topographic Contour Isobars (SVG) */}
          <svg
            className="ner-topo-canvas"
            viewBox="0 0 460 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="nerRouteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#087f4d" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="nerRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle Topographical Elevation Contours */}
            <path d="M40 320 C110 270, 180 290, 240 240 C300 190, 360 210, 460 170" stroke="#087f4d" strokeOpacity="0.09" strokeWidth="1" />
            <path d="M90 320 C150 250, 220 270, 290 200 C360 130, 400 160, 460 120" stroke="#087f4d" strokeOpacity="0.12" strokeWidth="1" />
            <path d="M140 320 C200 230, 260 240, 330 170 C400 100, 420 120, 460 70" stroke="#087f4d" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="4 3" />
            <path d="M190 320 C250 210, 310 210, 370 130 C420 60, 440 80, 460 30" stroke="#087f4d" strokeOpacity="0.1" strokeWidth="1" />
            <path d="M0 240 C60 190, 120 200, 190 140 C260 80, 340 100, 420 20" stroke="#087f4d" strokeOpacity="0.08" strokeWidth="1" />
            <path d="M0 170 C70 120, 150 140, 230 70 C290 20, 370 40, 440 0" stroke="#087f4d" strokeOpacity="0.07" strokeWidth="1" />
            <path d="M260 320 C320 250, 360 220, 410 160 C440 120, 450 130, 460 100" stroke="#087f4d" strokeOpacity="0.1" strokeWidth="0.8" />
            
            {/* Topographic elevation marks */}
            <text x="320" y="275" fill="#087f4d" fillOpacity="0.28" fontSize="8" fontFamily="DM Mono, monospace" fontWeight="600">540m</text>
            <text x="210" y="195" fill="#087f4d" fillOpacity="0.32" fontSize="8" fontFamily="DM Mono, monospace" fontWeight="600">1,120m</text>
            <text x="360" y="110" fill="#087f4d" fillOpacity="0.32" fontSize="8" fontFamily="DM Mono, monospace" fontWeight="600">1,850m</text>
            <text x="415" y="45" fill="#087f4d" fillOpacity="0.35" fontSize="8" fontFamily="DM Mono, monospace" fontWeight="600">2,420m</text>

            {/* Silhouetted Pine / Ridge Trees */}
            <g opacity="0.22" fill="#087f4d">
              {/* Tree 1 */}
              <path d="M335 88 L340 98 L337 98 L342 106 L338 106 L344 115 L336 115 L336 119 L334 119 L334 115 L326 115 L332 106 L328 106 L333 98 L330 98 Z" />
              {/* Tree 2 */}
              <path d="M385 168 L389 176 L387 176 L391 183 L388 183 L393 190 L386 190 L386 193 L384 193 L384 190 L377 190 L382 183 L379 183 L383 176 L381 176 Z" />
              {/* Tree 3 */}
              <path d="M410 268 L414 276 L412 276 L416 283 L413 283 L418 290 L411 290 L411 293 L409 293 L409 290 L402 290 L407 283 L404 283 L408 276 L406 276 Z" />
            </g>

            {/* Base Corridor Highway Shadow/Track */}
            <path
              d="M10 300 C90 285, 170 270, 235 210 C290 155, 325 140, 355 95 C385 50, 400 40, 445 10"
              stroke="#042a1b"
              strokeWidth="7"
              strokeLinecap="round"
              strokeOpacity="0.18"
            />

            {/* Glowing Emerald Highway Vector Corridor Line */}
            <path
              d="M10 300 C90 285, 170 270, 235 210 C290 155, 325 140, 355 95 C385 50, 400 40, 445 10"
              stroke="url(#nerRouteGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#nerRouteGlow)"
            />

            {/* Animated Highway Telemetry Dash Line */}
            <path
              className="ner-highway-dash"
              d="M10 300 C90 285, 170 270, 235 210 C290 155, 325 140, 355 95 C385 50, 400 40, 445 10"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="4 10"
            />

            {/* Connected Waypoint Nodes along the Corridor */}
            {/* Waypoint 1 */}
            <circle cx="280" cy="225" r="4.5" fill="#f7faf8" stroke="#087f4d" strokeWidth="2.5" />
            <circle cx="280" cy="225" r="1.5" fill="#10b981" />

            {/* Waypoint 2 (Main Intersection) */}
            <circle cx="330" cy="172" r="6.5" fill="#ffffff" stroke="#087f4d" strokeWidth="3" />
            <circle cx="330" cy="172" r="2.5" fill="#087f4d" />
            <circle cx="330" cy="172" r="11" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.2" />

            {/* Waypoint 3 */}
            <circle cx="380" cy="98" r="5" fill="#ffffff" stroke="#087f4d" strokeWidth="2.5" />
            <circle cx="380" cy="98" r="2" fill="#10b981" />

            {/* Waypoint 4 (Apex) */}
            <circle cx="415" cy="42" r="4.5" fill="#ffffff" stroke="#087f4d" strokeWidth="2" />
            <circle cx="415" cy="42" r="1.5" fill="#087f4d" />
          </svg>

          {/* Layered Floating Hazard & Intelligence Badges */}
          <div className="ner-markers-overlay" aria-hidden="false">
            {MAP_MARKERS.map((marker) => {
              const Icon = marker.icon;
              const isSelected = activeMarker === marker.id;
              const isHovered = hoveredChip && (
                marker.idChip === hoveredChip ||
                (hoveredChip === 'terrain' && marker.id === 'marker-terrain') ||
                (hoveredChip === 'infra' && marker.id === 'marker-infra') ||
                (hoveredChip === 'landslides' && marker.id === 'marker-landslide')
              );
              const isActive = isSelected || isHovered;

              return (
                <div
                  key={marker.id}
                  className={`ner-map-pin ner-map-pin--${marker.badgeColor} ${isActive ? 'ner-map-pin--active' : ''}`}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  onMouseEnter={() => setActiveMarker(marker.id)}
                  onMouseLeave={() => setActiveMarker(null)}
                  onClick={() => setActiveMarker((prev) => (prev === marker.id ? null : marker.id))}
                >
                  {/* Radar ping rings for active hazard / weather events */}
                  {marker.pulse && <span className="ner-pin-pulse" />}

                  {/* Marker Node Button */}
                  <div className="ner-pin-disc" title={marker.title}>
                    <Icon size={16} strokeWidth={2.4} />
                  </div>

                  {/* Dynamic Intelligence Tooltip Popover */}
                  {isActive && (
                    <div className="ner-pin-tooltip" role="tooltip">
                      <div className="ner-tooltip-tag">{marker.tag}</div>
                      <div className="ner-tooltip-title">{marker.title}</div>
                      <div className="ner-tooltip-detail">{marker.detail}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemBanner;
