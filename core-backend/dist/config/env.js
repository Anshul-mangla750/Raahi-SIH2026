"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    postgresUri: process.env.POSTGRES_URI || '',
    mongoUri: process.env.MONGO_URI || '',
    upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL || '',
    upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'fallback_access_secret',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
    jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
    jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
    mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:8000',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
//# sourceMappingURL=env.js.map