"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_validators_1 = require("./auth.validators");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
// Public auth routes
router.post('/login', (0, validate_middleware_1.validate)(auth_validators_1.loginSchema), auth_controller_1.AuthController.login);
router.post('/refresh', (0, validate_middleware_1.validate)(auth_validators_1.refreshSchema), auth_controller_1.AuthController.refresh);
// Protected routes
router.post('/register', auth_middleware_1.authenticateJwt, (0, role_middleware_1.requireRole)(['admin']), (0, validate_middleware_1.validate)(auth_validators_1.registerSchema), auth_controller_1.AuthController.register);
router.post('/logout', auth_middleware_1.authenticateJwt, auth_controller_1.AuthController.logout);
router.get('/me', auth_middleware_1.authenticateJwt, auth_controller_1.AuthController.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map