"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
// Apply JWT Auth and Role Guard for all Admin endpoints
router.use(auth_middleware_1.authenticateJwt);
router.use((0, role_middleware_1.requireRole)(['admin', 'district_officer']));
// 1. Overview
router.get('/overview/kpis', admin_controller_1.AdminController.getOverviewKpis);
router.get('/overview/recent-alerts', admin_controller_1.AdminController.getRecentAlerts);
// 2. Districts
router.get('/districts', admin_controller_1.AdminController.getDistricts);
router.get('/districts/:id', admin_controller_1.AdminController.getDistrictById);
router.get('/districts/:id/roads', admin_controller_1.AdminController.getDistrictRoads);
// 3. Routes & Risk
router.get('/routes', admin_controller_1.AdminController.getRoutes);
router.get('/routes/:id/risk', admin_controller_1.AdminController.getRouteRisk);
router.get('/routes/:id/alternates', admin_controller_1.AdminController.getRouteAlternates);
// 4. Vehicles
router.get('/vehicles', admin_controller_1.AdminController.getVehicles);
router.get('/vehicles/:id', admin_controller_1.AdminController.getVehicleById);
// 5. Alerts
router.get('/alerts', admin_controller_1.AdminController.getAlerts);
router.post('/alerts', admin_controller_1.AdminController.createAlert);
router.patch('/alerts/:id', admin_controller_1.AdminController.updateAlert);
// 6. Field Reports
router.get('/field-reports', admin_controller_1.AdminController.getFieldReports);
router.patch('/field-reports/:id/verify', admin_controller_1.AdminController.verifyFieldReport);
router.patch('/field-reports/:id/reject', admin_controller_1.AdminController.rejectFieldReport);
// 7. Supply Chain & Deliveries
router.get('/supply-chain/gaps', admin_controller_1.AdminController.getSupplyChainGaps);
router.get('/deliveries', admin_controller_1.AdminController.getDeliveries);
// 8. Analytics
router.get('/analytics/disruption-trends', admin_controller_1.AdminController.getDisruptionTrends);
router.get('/analytics/delay-trends', admin_controller_1.AdminController.getDelayTrends);
router.get('/analytics/export', admin_controller_1.AdminController.exportAnalytics);
// 9. Users
router.get('/users', admin_controller_1.AdminController.getUsers);
router.post('/users', admin_controller_1.AdminController.createUser);
router.patch('/users/:id', admin_controller_1.AdminController.updateUser);
router.delete('/users/:id', admin_controller_1.AdminController.deleteUser);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map