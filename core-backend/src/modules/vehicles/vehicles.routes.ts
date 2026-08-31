import { Router } from 'express';
import { VehiclesController } from './vehicles.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();

// GPS ping endpoint (supports device tokens / simulated pings)
router.post('/:id/ping', VehiclesController.pingPosition);

// Authenticated live fleet coordinates
router.get('/live', authenticateJwt, VehiclesController.getLivePositions);

export default router;
