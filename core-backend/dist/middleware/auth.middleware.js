"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return (0, response_1.sendError)(res, 'Authentication token missing or invalid', 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtAccessSecret);
        req.user = decoded;
        return next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return (0, response_1.sendError)(res, 'Token has expired', 401);
        }
        return (0, response_1.sendError)(res, 'Invalid token', 401);
    }
};
exports.authenticateJwt = authenticateJwt;
//# sourceMappingURL=auth.middleware.js.map