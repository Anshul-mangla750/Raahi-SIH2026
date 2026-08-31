import { Router } from 'express';
import { TransporterController } from './transporter.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/role.middleware';

const router = Router();

// Apply JWT Auth and Role Guard for all Transporter endpoints
router.use(authenticateJwt);
router.use(requireRole(['transporter', 'driver', 'admin']));

// 1. Overview
router.get('/overview/kpis', TransporterController.getOverviewKpis);

// 2. Trips
router.post('/trips/plan', TransporterController.planTrip);
router.post('/trips', TransporterController.createTrip);
router.get('/trips', TransporterController.getTrips);

// 3. Vehicles
router.get('/vehicles', TransporterController.getVehicles);
router.post('/vehicles', TransporterController.createVehicle);
router.patch('/vehicles/:id', TransporterController.updateVehicle);
router.delete('/vehicles/:id', TransporterController.deleteVehicle);

// 4. Drivers
router.get('/drivers', TransporterController.getDrivers);
router.post('/drivers', TransporterController.createDriver);
router.patch('/drivers/:id', TransporterController.updateDriver);
router.delete('/drivers/:id', TransporterController.deleteDriver);

// 5. Alerts
router.get('/alerts', TransporterController.getAlerts);

// 6. Deliveries
router.get('/deliveries', TransporterController.getDeliveries);
router.patch('/deliveries/:id/status', TransporterController.updateDeliveryStatus);
router.post('/deliveries/:id/pod', TransporterController.uploadProofOfDelivery);

// 7. Field Reports
router.post('/field-reports', TransporterController.createFieldReport);

// 8. Documents
router.get('/documents', TransporterController.getDocuments);

// 9. History & Reports Export
router.get('/reports/history', TransporterController.getDeliveryHistory);
router.get('/reports/export', TransporterController.exportReports);

export default router;
