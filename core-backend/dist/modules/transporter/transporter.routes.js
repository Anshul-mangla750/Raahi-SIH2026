"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transporter_controller_1 = require("./transporter.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
// Apply JWT Auth and Role Guard for all Transporter endpoints
router.use(auth_middleware_1.authenticateJwt);
router.use((0, role_middleware_1.requireRole)(['transporter', 'driver', 'admin']));
// 1. Overview
router.get('/overview/kpis', transporter_controller_1.TransporterController.getOverviewKpis);
// 2. Trips
router.post('/trips/plan', transporter_controller_1.TransporterController.planTrip);
router.post('/trips', transporter_controller_1.TransporterController.createTrip);
router.get('/trips', transporter_controller_1.TransporterController.getTrips);
// 3. Vehicles
router.get('/vehicles', transporter_controller_1.TransporterController.getVehicles);
router.post('/vehicles', transporter_controller_1.TransporterController.createVehicle);
router.patch('/vehicles/:id', transporter_controller_1.TransporterController.updateVehicle);
router.delete('/vehicles/:id', transporter_controller_1.TransporterController.deleteVehicle);
// 4. Drivers
router.get('/drivers', transporter_controller_1.TransporterController.getDrivers);
router.post('/drivers', transporter_controller_1.TransporterController.createDriver);
router.patch('/drivers/:id', transporter_controller_1.TransporterController.updateDriver);
router.delete('/drivers/:id', transporter_controller_1.TransporterController.deleteDriver);
// 5. Alerts
router.get('/alerts', transporter_controller_1.TransporterController.getAlerts);
// 6. Deliveries
router.get('/deliveries', transporter_controller_1.TransporterController.getDeliveries);
router.patch('/deliveries/:id/status', transporter_controller_1.TransporterController.updateDeliveryStatus);
router.post('/deliveries/:id/pod', transporter_controller_1.TransporterController.uploadProofOfDelivery);
// 7. Field Reports
router.post('/field-reports', transporter_controller_1.TransporterController.createFieldReport);
// 8. Documents
router.get('/documents', transporter_controller_1.TransporterController.getDocuments);
// 9. History & Reports Export
router.get('/reports/history', transporter_controller_1.TransporterController.getDeliveryHistory);
router.get('/reports/export', transporter_controller_1.TransporterController.exportReports);
exports.default = router;
//# sourceMappingURL=transporter.routes.js.map