import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { registerSchema, loginSchema, refreshSchema } from './auth.validators';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/role.middleware';

const router = Router();

// Public auth routes
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/refresh', validate(refreshSchema), AuthController.refresh);

// Protected routes
router.post(
  '/register',
  authenticateJwt,
  requireRole(['admin']),
  validate(registerSchema),
  AuthController.register
);
router.post('/logout', authenticateJwt, AuthController.logout);
router.get('/me', authenticateJwt, AuthController.me);

export default router;
