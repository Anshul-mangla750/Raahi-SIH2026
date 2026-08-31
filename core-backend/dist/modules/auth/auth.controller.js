"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const response_1 = require("../../utils/response");
class AuthController {
    static async register(req, res) {
        try {
            const result = await auth_service_1.AuthService.register(req.body);
            return (0, response_1.sendSuccess)(res, result, 'User registered successfully', 201);
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message, 400);
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            return (0, response_1.sendSuccess)(res, result, 'Login successful');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message, 401);
        }
    }
    static async refresh(req, res) {
        try {
            const { refreshToken } = req.body;
            const tokens = await auth_service_1.AuthService.refresh(refreshToken);
            return (0, response_1.sendSuccess)(res, tokens, 'Token refreshed successfully');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message, 401);
        }
    }
    static async logout(req, res) {
        try {
            if (req.user?.id) {
                await auth_service_1.AuthService.logout(req.user.id);
            }
            return (0, response_1.sendSuccess)(res, null, 'Logged out successfully');
        }
        catch (err) {
            return (0, response_1.sendError)(res, err.message, 500);
        }
    }
    static async me(req, res) {
        return (0, response_1.sendSuccess)(res, req.user, 'Current user profile');
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map