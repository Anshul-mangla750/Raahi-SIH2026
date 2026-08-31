"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const postgres_1 = require("../../models/postgres");
const mongo_1 = require("../../models/mongo");
const response_1 = require("../../utils/response");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminController {
    // 1. Overview KPIs
    static async getOverviewKpis(req, res) {
        try {
            const [totalRoutes, atRiskRoutes, blockedRoutes, activeVehicles, inTransitDeliveries] = await Promise.all([
                postgres_1.Route.count(),
                postgres_1.Route.count({ where: { status: 'at_risk' } }),
                postgres_1.Route.count({ where: { status: 'blocked' } }),
                postgres_1.Vehicle.count({ where: { status: ['moving', 'idle', 'delayed'] } }),
                postgres_1.Delivery.count({ where: { status: 'in_transit' } }),
            ]);
            const data = {
                totalRoutes: { value: totalRoutes || 1248, trend: '+12.5%', period: 'vs yesterday', isUp: true },
                routesAtRisk: { value: atRiskRoutes || 87, trend: '+8.3%', period: 'vs yesterday', isUp: true, isRisk: true },
                blockedRoutes: { value: blockedRoutes || 23, trend: '+15.2%', period: 'vs yesterday', isUp: true, isDanger: true },
                activeVehicles: { value: activeVehicles || 312, trend: '+6.1%', period: 'vs yesterday', isUp: true },
                deliveriesInTransit: { value: inTransitDeliveries || 156, trend: '+9.4%', period: 'vs yesterday', isUp: true },
            };
            return (0, response_1.sendSuccess)(res, data, 'Dashboard KPIs retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 2. Recent Alerts
    static async getRecentAlerts(req, res) {
        try {
            const alerts = await mongo_1.Alert.find().sort({ createdAt: -1 }).limit(10);
            return (0, response_1.sendSuccess)(res, alerts, 'Recent alerts retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 3. Districts
    static async getDistricts(req, res) {
        try {
            const districts = await postgres_1.District.findAll({
                include: [{ model: postgres_1.Road, as: 'roads' }],
            });
            return (0, response_1.sendSuccess)(res, districts, 'Districts retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getDistrictById(req, res) {
        try {
            const district = await postgres_1.District.findByPk(String(req.params.id), {
                include: [
                    { model: postgres_1.Road, as: 'roads' },
                    { model: postgres_1.Bridge, as: 'bridges' },
                ],
            });
            if (!district)
                return (0, response_1.sendError)(res, 'District not found', 404);
            return (0, response_1.sendSuccess)(res, district, 'District details retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getDistrictRoads(req, res) {
        try {
            const roads = await postgres_1.Road.findAll({
                where: { district_id: String(req.params.id) },
                include: [{ model: postgres_1.Bridge, as: 'bridges' }],
            });
            return (0, response_1.sendSuccess)(res, roads, 'District roads retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 4. Routes & Risk
    static async getRoutes(req, res) {
        try {
            const routes = await postgres_1.Route.findAll({
                include: [{ model: postgres_1.RiskScore, as: 'risk_scores', limit: 1, order: [['computed_at', 'DESC']] }],
            });
            return (0, response_1.sendSuccess)(res, routes, 'Routes retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getRouteRisk(req, res) {
        try {
            const route = await postgres_1.Route.findByPk(String(req.params.id), {
                include: [{ model: postgres_1.RiskScore, as: 'risk_scores', limit: 5, order: [['computed_at', 'DESC']] }],
            });
            if (!route)
                return (0, response_1.sendError)(res, 'Route not found', 404);
            return (0, response_1.sendSuccess)(res, route, 'Route risk score retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getRouteAlternates(req, res) {
        try {
            const route = await postgres_1.Route.findByPk(String(req.params.id));
            if (!route)
                return (0, response_1.sendError)(res, 'Route not found', 404);
            // Return alternate route suggestions
            const alternates = [
                {
                    id: 'opt-01',
                    name: 'Optimized Primary Alternative',
                    distance_km: route.distance_km * 1.05,
                    avg_travel_hours: route.avg_travel_hours * 1.1,
                    fuel_cost: route.fuel_cost_estimate * 1.04,
                    toll_cost: route.toll_cost,
                    risk_level: 'low',
                    efficiency: '94%',
                },
                {
                    id: 'eco-02',
                    name: 'Low Elevation Bypass Corridor',
                    distance_km: route.distance_km * 1.18,
                    avg_travel_hours: route.avg_travel_hours * 1.25,
                    fuel_cost: route.fuel_cost_estimate * 0.92,
                    toll_cost: 0,
                    risk_level: 'low',
                    efficiency: '88%',
                },
            ];
            return (0, response_1.sendSuccess)(res, { current: route, alternates }, 'Alternate routes retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 5. Vehicles
    static async getVehicles(req, res) {
        try {
            const vehicles = await postgres_1.Vehicle.findAll({
                include: [{ model: postgres_1.Driver, as: 'driver' }],
            });
            return (0, response_1.sendSuccess)(res, vehicles, 'Fleet vehicles retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getVehicleById(req, res) {
        try {
            const vehicle = await postgres_1.Vehicle.findByPk(String(req.params.id), {
                include: [{ model: postgres_1.Driver, as: 'driver' }],
            });
            if (!vehicle)
                return (0, response_1.sendError)(res, 'Vehicle not found', 404);
            return (0, response_1.sendSuccess)(res, vehicle, 'Vehicle detail retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 6. Alerts CRUD
    static async getAlerts(req, res) {
        try {
            const { severity, status } = req.query;
            const filter = {};
            if (severity)
                filter.severity = severity;
            if (status)
                filter.status = status;
            const alerts = await mongo_1.Alert.find(filter).sort({ createdAt: -1 });
            return (0, response_1.sendSuccess)(res, alerts, 'Alerts list retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async createAlert(req, res) {
        try {
            const id = `alt-${Date.now()}`;
            const alert = await mongo_1.Alert.create({
                id,
                ...req.body,
                time: req.body.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
            return (0, response_1.sendSuccess)(res, alert, 'Alert created and broadcasted', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async updateAlert(req, res) {
        try {
            const alert = await mongo_1.Alert.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true });
            if (!alert)
                return (0, response_1.sendError)(res, 'Alert not found', 404);
            return (0, response_1.sendSuccess)(res, alert, 'Alert updated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 7. Field Reports
    static async getFieldReports(req, res) {
        try {
            const { status, priority } = req.query;
            const filter = {};
            if (status)
                filter.status = status;
            if (priority)
                filter.priority = priority;
            const reports = await mongo_1.FieldReport.find(filter).sort({ createdAt: -1 });
            return (0, response_1.sendSuccess)(res, reports, 'Field reports retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async verifyFieldReport(req, res) {
        try {
            const report = await mongo_1.FieldReport.findOneAndUpdate({ id: req.params.id }, {
                $set: {
                    status: 'Resolved',
                    verifiedBy: req.user?.name || 'Admin',
                    verifiedAt: new Date(),
                },
            }, { new: true });
            if (!report)
                return (0, response_1.sendError)(res, 'Field report not found', 404);
            // Audit Log
            await mongo_1.AuditLog.create({
                userId: req.user?.id || 'admin',
                action: 'VERIFY_FIELD_REPORT',
                entityType: 'FieldReport',
                entityId: req.params.id,
                meta: { status: 'Resolved' },
            });
            return (0, response_1.sendSuccess)(res, report, 'Field report verified successfully');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async rejectFieldReport(req, res) {
        try {
            const { reason } = req.body;
            const report = await mongo_1.FieldReport.findOneAndUpdate({ id: req.params.id }, {
                $set: {
                    status: 'Rejected',
                    rejectionReason: reason || 'Information unverified',
                },
            }, { new: true });
            if (!report)
                return (0, response_1.sendError)(res, 'Field report not found', 404);
            return (0, response_1.sendSuccess)(res, report, 'Field report rejected');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 8. Supply Chain & Deliveries
    static async getSupplyChainGaps(req, res) {
        try {
            const gaps = [
                { commodity: 'Essential Medicines', targetBufferDays: 30, currentStockDays: 12, status: 'critical', affectedDistricts: ['dima_hasao', 'west_khasi', 'imphal_west'] },
                { commodity: 'Food Grain (Rice/Wheat)', targetBufferDays: 45, currentStockDays: 38, status: 'good', affectedDistricts: [] },
                { commodity: 'Petroleum & Diesel', targetBufferDays: 15, currentStockDays: 6, status: 'high_risk', affectedDistricts: ['aizawl', 'cachar'] },
                { commodity: 'Construction Material', targetBufferDays: 60, currentStockDays: 42, status: 'moderate', affectedDistricts: ['papum_pare'] },
            ];
            return (0, response_1.sendSuccess)(res, gaps, 'Supply chain gap analysis retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getDeliveries(req, res) {
        try {
            const { district, commodity, status } = req.query;
            const where = {};
            if (district)
                where.dest_district_id = district;
            if (commodity)
                where.commodity_type = commodity;
            if (status)
                where.status = status;
            const deliveries = await postgres_1.Delivery.findAll({ where });
            return (0, response_1.sendSuccess)(res, deliveries, 'Deliveries retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 9. Analytics
    static async getDisruptionTrends(req, res) {
        try {
            const data = [
                { date: '15 May', good: 800, moderate: 450, atRisk: 220, blocked: 15 },
                { date: '16 May', good: 1020, moderate: 680, atRisk: 310, blocked: 45 },
                { date: '17 May', good: 1000, moderate: 620, atRisk: 360, blocked: 60 },
                { date: '18 May', good: 1200, moderate: 710, atRisk: 420, blocked: 80 },
                { date: '19 May', good: 1220, moderate: 690, atRisk: 390, blocked: 50 },
                { date: '20 May', good: 1210, moderate: 640, atRisk: 330, blocked: 40 },
                { date: '21 May', good: 1248, moderate: 680, atRisk: 350, blocked: 23 },
            ];
            return (0, response_1.sendSuccess)(res, data, 'Disruption trend analytics retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getDelayTrends(req, res) {
        try {
            const data = [
                { route: 'NH-6 (Shillong-Silchar)', avgDelayHours: 3.4, incidentsCount: 14 },
                { route: 'NH-2 (Dimapur-Imphal)', avgDelayHours: 6.2, incidentsCount: 22 },
                { route: 'NH-306 (Silchar-Aizawl)', avgDelayHours: 2.8, incidentsCount: 9 },
                { route: 'NH-27 (Guwahati-Tezpur)', avgDelayHours: 0.4, incidentsCount: 3 },
            ];
            return (0, response_1.sendSuccess)(res, data, 'Delay trend analytics retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async exportAnalytics(req, res) {
        try {
            const summary = {
                exportedAt: new Date().toISOString(),
                totalDistrictsMonitored: 12,
                totalRoutesMonitored: 1248,
                activeIncidentsCount: 8,
                resolvedIncidentsThisMonth: 78,
            };
            return (0, response_1.sendSuccess)(res, summary, 'Analytics export bundle generated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 10. User Management CRUD
    static async getUsers(req, res) {
        try {
            const users = await postgres_1.User.findAll({
                attributes: { exclude: ['password_hash'] },
            });
            return (0, response_1.sendSuccess)(res, users, 'User directory retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async createUser(req, res) {
        try {
            const { name, email, password, role, district_id, transporter_id, agency, phone } = req.body;
            const password_hash = await bcrypt_1.default.hash(password || 'raahi2026', 12);
            const user = await postgres_1.User.create({
                name,
                email,
                password_hash,
                role: role || 'viewer',
                district_id,
                transporter_id,
                agency,
                phone,
            });
            const json = user.toJSON();
            delete json.password_hash;
            return (0, response_1.sendSuccess)(res, json, 'User created successfully', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async updateUser(req, res) {
        try {
            const user = await postgres_1.User.findByPk(String(req.params.id));
            if (!user)
                return (0, response_1.sendError)(res, 'User not found', 404);
            const { name, role, district_id, transporter_id, agency, phone, password } = req.body;
            if (password) {
                user.password_hash = await bcrypt_1.default.hash(password, 12);
            }
            if (name)
                user.name = name;
            if (role)
                user.role = role;
            if (district_id !== undefined)
                user.district_id = district_id;
            if (transporter_id !== undefined)
                user.transporter_id = transporter_id;
            if (agency !== undefined)
                user.agency = agency;
            if (phone !== undefined)
                user.phone = phone;
            await user.save();
            const json = user.toJSON();
            delete json.password_hash;
            return (0, response_1.sendSuccess)(res, json, 'User updated successfully');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async deleteUser(req, res) {
        try {
            const count = await postgres_1.User.destroy({ where: { id: req.params.id } });
            if (!count)
                return (0, response_1.sendError)(res, 'User not found', 404);
            return (0, response_1.sendSuccess)(res, null, 'User deleted successfully');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map