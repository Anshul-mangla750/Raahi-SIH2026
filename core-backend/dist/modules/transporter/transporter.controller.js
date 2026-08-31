"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransporterController = void 0;
const postgres_1 = require("../../models/postgres");
const mongo_1 = require("../../models/mongo");
const response_1 = require("../../utils/response");
class TransporterController {
    // 1. Overview KPIs
    static async getOverviewKpis(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const [totalVehicles, movingVehicles, deliveriesInTransit, delayedDeliveries, completedDeliveries] = await Promise.all([
                postgres_1.Vehicle.count({ where: { transporter_id: transporterId } }),
                postgres_1.Vehicle.count({ where: { transporter_id: transporterId, status: 'moving' } }),
                postgres_1.Delivery.count({ where: { transporter_id: transporterId, status: 'in_transit' } }),
                postgres_1.Delivery.count({ where: { transporter_id: transporterId, status: 'delayed' } }),
                postgres_1.Delivery.count({ where: { transporter_id: transporterId, status: 'delivered' } }),
            ]);
            const totalCompleted = completedDeliveries || 1248;
            const onTimeRate = '94.6%';
            const data = {
                totalFleet: totalVehicles || 6,
                movingVehicles: movingVehicles || 3,
                deliveriesInTransit: deliveriesInTransit || 2,
                delayedDeliveries: delayedDeliveries || 1,
                totalCompletedDeliveries: totalCompleted,
                onTimeRate,
                fuelEfficiencyAvg: '7.6 km/L',
            };
            return (0, response_1.sendSuccess)(res, data, 'Transporter overview KPIs retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 2. Trip Planning & Creation
    static async planTrip(req, res) {
        try {
            const { originDistrictId, destDistrictId, commodityType, weightKg } = req.body;
            const route = await postgres_1.Route.findOne({
                where: {
                    origin_district_id: originDistrictId,
                    dest_district_id: destDistrictId,
                },
            });
            const distanceKm = route ? route.distance_km : 180;
            const travelHours = route ? route.avg_travel_hours : 4.5;
            const baseFuelCost = distanceKm * 14.5;
            const suggestion = {
                primary: {
                    routeId: route ? route.id : 'R-SUG-01',
                    name: route ? route.name : `${originDistrictId} → ${destDistrictId}`,
                    distanceKm,
                    estimatedHours: travelHours,
                    fuelCostEstimate: Math.round(baseFuelCost),
                    riskScore: route ? route.current_risk_score : 18,
                    riskLevel: route && route.current_risk_score > 60 ? 'high' : 'low',
                    recommendedDeparture: '06:00 AM (Early Window before Fog)',
                },
                alternates: [
                    {
                        name: 'Low Elevation Bypass Corridor',
                        distanceKm: Math.round(distanceKm * 1.15),
                        estimatedHours: Number((travelHours * 1.2).toFixed(1)),
                        fuelCostEstimate: Math.round(baseFuelCost * 1.1),
                        riskScore: 12,
                        riskLevel: 'low',
                    },
                ],
            };
            return (0, response_1.sendSuccess)(res, suggestion, 'Trip plan generated with risk evaluation');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async createTrip(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const id = `TRIP-${Date.now().toString().slice(-6)}`;
            const trip = await postgres_1.Trip.create({
                id,
                transporter_id: transporterId,
                vehicle_id: req.body.vehicleId,
                driver_id: req.body.driverId,
                route_id: req.body.routeId || 'R-01',
                origin: req.body.origin,
                destination: req.body.destination,
                status: 'in_transit',
                progress_percent: 0,
                started_at: new Date(),
                eta: new Date(Date.now() + 6 * 3600 * 1000),
            });
            return (0, response_1.sendSuccess)(res, trip, 'Trip scheduled successfully', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async getTrips(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const trips = await postgres_1.Trip.findAll({
                where: { transporter_id: transporterId },
                include: [
                    { model: postgres_1.Vehicle, as: 'vehicle' },
                    { model: postgres_1.Driver, as: 'driver' },
                ],
                order: [['createdAt', 'DESC']],
            });
            return (0, response_1.sendSuccess)(res, trips, 'Trips retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 3. Vehicles CRUD (Transporter Scoped)
    static async getVehicles(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const vehicles = await postgres_1.Vehicle.findAll({
                where: { transporter_id: transporterId },
                include: [{ model: postgres_1.Driver, as: 'driver' }],
            });
            return (0, response_1.sendSuccess)(res, vehicles, 'Fleet vehicles retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async createVehicle(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const vehicle = await postgres_1.Vehicle.create({
                ...req.body,
                transporter_id: transporterId,
            });
            return (0, response_1.sendSuccess)(res, vehicle, 'Vehicle registered to fleet', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async updateVehicle(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const vehicle = await postgres_1.Vehicle.findOne({
                where: { id: req.params.id, transporter_id: transporterId },
            });
            if (!vehicle)
                return (0, response_1.sendError)(res, 'Vehicle not found', 404);
            await vehicle.update(req.body);
            return (0, response_1.sendSuccess)(res, vehicle, 'Vehicle updated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async deleteVehicle(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const count = await postgres_1.Vehicle.destroy({
                where: { id: req.params.id, transporter_id: transporterId },
            });
            if (!count)
                return (0, response_1.sendError)(res, 'Vehicle not found', 404);
            return (0, response_1.sendSuccess)(res, null, 'Vehicle removed from fleet');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 4. Drivers CRUD (Transporter Scoped)
    static async getDrivers(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const drivers = await postgres_1.Driver.findAll({
                where: { transporter_id: transporterId },
                include: [{ model: postgres_1.Vehicle, as: 'vehicle' }],
            });
            return (0, response_1.sendSuccess)(res, drivers, 'Drivers retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async createDriver(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const id = `DRV-${Date.now().toString().slice(-4)}`;
            const driver = await postgres_1.Driver.create({
                id,
                ...req.body,
                transporter_id: transporterId,
            });
            return (0, response_1.sendSuccess)(res, driver, 'Driver onboarded', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async updateDriver(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const driver = await postgres_1.Driver.findOne({
                where: { id: req.params.id, transporter_id: transporterId },
            });
            if (!driver)
                return (0, response_1.sendError)(res, 'Driver not found', 404);
            await driver.update(req.body);
            return (0, response_1.sendSuccess)(res, driver, 'Driver updated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async deleteDriver(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const count = await postgres_1.Driver.destroy({
                where: { id: req.params.id, transporter_id: transporterId },
            });
            if (!count)
                return (0, response_1.sendError)(res, 'Driver not found', 404);
            return (0, response_1.sendSuccess)(res, null, 'Driver removed');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 5. Relevant Alerts
    static async getAlerts(req, res) {
        try {
            const alerts = await mongo_1.Alert.find({ status: 'active' }).sort({ createdAt: -1 }).limit(10);
            return (0, response_1.sendSuccess)(res, alerts, 'Corridor alerts for fleet retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 6. Deliveries / Consignments
    static async getDeliveries(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const deliveries = await postgres_1.Delivery.findAll({
                where: { transporter_id: transporterId },
                order: [['createdAt', 'DESC']],
            });
            return (0, response_1.sendSuccess)(res, deliveries, 'Consignments retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async updateDeliveryStatus(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const delivery = await postgres_1.Delivery.findOne({
                where: { id: req.params.id, transporter_id: transporterId },
            });
            if (!delivery)
                return (0, response_1.sendError)(res, 'Consignment not found', 404);
            const { status } = req.body;
            delivery.status = status;
            if (status === 'delivered') {
                delivery.delivered_at = new Date();
            }
            await delivery.save();
            return (0, response_1.sendSuccess)(res, delivery, 'Consignment status updated');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async uploadProofOfDelivery(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const delivery = await postgres_1.Delivery.findOne({
                where: { id: req.params.id, transporter_id: transporterId },
            });
            if (!delivery)
                return (0, response_1.sendError)(res, 'Consignment not found', 404);
            const { podUrl } = req.body;
            delivery.pod_url = podUrl || '/assets/pods/sample_pod.pdf';
            delivery.status = 'delivered';
            delivery.delivered_at = new Date();
            await delivery.save();
            return (0, response_1.sendSuccess)(res, delivery, 'Proof of Delivery attached and delivery marked complete');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 7. Incident / Field Reporting from Transporter
    static async createFieldReport(req, res) {
        try {
            const id = `FR-${Date.now().toString().slice(-6)}`;
            const report = await mongo_1.FieldReport.create({
                id,
                reportedBy: req.user?.name || 'Driver on Route',
                status: 'Pending',
                reportedOn: new Date().toLocaleString(),
                ...req.body,
            });
            return (0, response_1.sendSuccess)(res, report, 'Incident reported successfully to regional command center', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 8. Documents & Compliance
    static async getDocuments(req, res) {
        try {
            const documents = [
                { id: 'DOC-01', title: 'All India Motor Vehicle Permit', category: 'Permit', expiryDate: '2027-04-30', status: 'valid', vehicleId: 'AS-01-AB-1234' },
                { id: 'DOC-02', title: 'Comprehensive Commercial Insurance', category: 'Insurance', expiryDate: '2026-11-15', status: 'valid', vehicleId: 'AS-01-CD-5678' },
                { id: 'DOC-03', title: 'NER Hill Corridor Special Transit Pass', category: 'Hill Transit', expiryDate: '2026-09-01', status: 'expiring_soon', vehicleId: 'AS-01-EF-9012' },
                { id: 'DOC-04', title: 'Pollution Under Control (PUC)', category: 'PUC', expiryDate: '2026-10-10', status: 'valid', vehicleId: 'AS-01-GH-3456' },
            ];
            return (0, response_1.sendSuccess)(res, documents, 'Compliance documents retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    // 9. History & Reports Export
    static async getDeliveryHistory(req, res) {
        try {
            const transporterId = req.user?.transporterId || 'transporter_01';
            const history = await postgres_1.Delivery.findAll({
                where: { transporter_id: transporterId },
                order: [['createdAt', 'DESC']],
            });
            return (0, response_1.sendSuccess)(res, history, 'Delivery history log retrieved');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
    static async exportReports(req, res) {
        try {
            const summary = {
                exportedAt: new Date().toISOString(),
                totalConsignments: 1248,
                onTimeRate: '94.6%',
                totalFuelSavedLiters: 340,
                co2ReductionKg: 890,
            };
            return (0, response_1.sendSuccess)(res, summary, 'Transporter performance report export ready');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message);
        }
    }
}
exports.TransporterController = TransporterController;
//# sourceMappingURL=transporter.controller.js.map