import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectPostgres } from './config/db';
import { connectMongo } from './config/mongo';
import { initSocketGateway } from './sockets/socket.gateway';
import { startGpsSimulator } from './sockets/gpsSimulator';

const server = http.createServer(app);

// Initialize Socket.io
initSocketGateway(server);

async function startServer() {
  try {
    console.log('🚀 Initializing NER Smart Logistics Platform Core Backend...');

    // Connect to databases
    await connectPostgres();
    await connectMongo();

    // Start Live GPS Telemetry Simulator
    startGpsSimulator();

    server.listen(env.port, () => {
      console.log(`\n======================================================`);
      console.log(`🛰️  RAAHI / NER LogiSmart Core Backend is ACTIVE`);
      console.log(`📡  Port: ${env.port} | Mode: ${env.nodeEnv}`);
      console.log(`🔗  Health: http://localhost:${env.port}/health`);
      console.log(`🔐  Auth:   http://localhost:${env.port}/api/auth/login`);
      console.log(`🏛️  Admin:  http://localhost:${env.port}/api/admin/overview/kpis`);
      console.log(`🚚  Fleet:  http://localhost:${env.port}/api/transporter/overview/kpis`);
      console.log(`======================================================\n`);
    });
  } catch (err: any) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
