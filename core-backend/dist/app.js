"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const error_middleware_1 = require("./middleware/error.middleware");
// Routes
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const transporter_routes_1 = __importDefault(require("./modules/transporter/transporter.routes"));
const vehicles_routes_1 = __importDefault(require("./modules/vehicles/vehicles.routes"));
const ml_proxy_routes_1 = __importDefault(require("./modules/ml-proxy/ml-proxy.routes"));
const app = (0, express_1.default)();
// Security and utility middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
if (env_1.env.nodeEnv === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'NER LogiSmart Core Backend API',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        database: {
            postgres: 'connected',
            mongo: 'connected',
            redis: 'ready',
        },
    });
});
// API Routes Mounting
app.use('/api/auth', auth_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/transporter', transporter_routes_1.default);
app.use('/api/vehicles', vehicles_routes_1.default);
app.use('/api/ml', ml_proxy_routes_1.default);
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map