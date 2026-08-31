import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/role.middleware';

const router = Router();

// Apply JWT Auth and Role Guard for all Admin endpoints
router.use(authenticateJwt);
router.use(requireRole(['admin', 'district_officer']));

// 1. Overview
router.get('/overview/kpis', AdminController.getOverviewKpis);
router.get('/overview/recent-alerts', AdminController.getRecentAlerts);

// 2. Districts
router.get('/districts', AdminController.getDistricts);
router.get('/districts/:id', AdminController.getDistrictById);
router.get('/districts/:id/roads', AdminController.getDistrictRoads);

// 3. Routes & Risk
router.get('/routes', AdminController.getRoutes);
router.get('/routes/:id/risk', AdminController.getRouteRisk);
router.get('/routes/:id/alternates', AdminController.getRouteAlternates);

// 4. Vehicles
router.get('/vehicles', AdminController.getVehicles);
router.get('/vehicles/:id', AdminController.getVehicleById);

// 5. Alerts
router.get('/alerts', AdminController.getAlerts);
router.post('/alerts', AdminController.createAlert);
router.patch('/alerts/:id', AdminController.updateAlert);

// 6. Field Reports
router.get('/field-reports', AdminController.getFieldReports);
router.patch('/field-reports/:id/verify', AdminController.verifyFieldReport);
router.patch('/field-reports/:id/reject', AdminController.rejectFieldReport);

// 7. Supply Chain & Deliveries
router.get('/supply-chain/gaps', AdminController.getSupplyChainGaps);
router.get('/deliveries', AdminController.getDeliveries);

// 8. Analytics
router.get('/analytics/disruption-trends', AdminController.getDisruptionTrends);
router.get('/analytics/delay-trends', AdminController.getDelayTrends);
router.get('/analytics/export', AdminController.exportAnalytics);

// 9. Users
router.get('/users', AdminController.getUsers);
router.post('/users', AdminController.createUser);
router.patch('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

export default router;
