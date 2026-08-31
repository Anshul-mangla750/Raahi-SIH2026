"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const mongo_1 = require("./config/mongo");
const socket_gateway_1 = require("./sockets/socket.gateway");
const gpsSimulator_1 = require("./sockets/gpsSimulator");
const server = http_1.default.createServer(app_1.default);
// Initialize Socket.io
(0, socket_gateway_1.initSocketGateway)(server);
async function startServer() {
    try {
        console.log('🚀 Initializing NER Smart Logistics Platform Core Backend...');
        // Connect to databases
        await (0, db_1.connectPostgres)();
        await (0, mongo_1.connectMongo)();
        // Start Live GPS Telemetry Simulator
        (0, gpsSimulator_1.startGpsSimulator)();
        server.listen(env_1.env.port, () => {
            console.log(`\n======================================================`);
            console.log(`🛰️  RAAHI / NER LogiSmart Core Backend is ACTIVE`);
            console.log(`📡  Port: ${env_1.env.port} | Mode: ${env_1.env.nodeEnv}`);
            console.log(`🔗  Health: http://localhost:${env_1.env.port}/health`);
            console.log(`🔐  Auth:   http://localhost:${env_1.env.port}/api/auth/login`);
            console.log(`🏛️  Admin:  http://localhost:${env_1.env.port}/api/admin/overview/kpis`);
            console.log(`🚚  Fleet:  http://localhost:${env_1.env.port}/api/transporter/overview/kpis`);
            console.log(`======================================================\n`);
        });
    }
    catch (err) {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map