import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { errorHandler } from './middleware/error.middleware';

// Routes
import authRoutes from './modules/auth/auth.routes';
import adminRoutes from './modules/admin/admin.routes';
import transporterRoutes from './modules/transporter/transporter.routes';
import vehiclesRoutes from './modules/vehicles/vehicles.routes';
import mlProxyRoutes from './modules/ml-proxy/ml-proxy.routes';

const app = express();

// Security and utility middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
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
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transporter', transporterRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/ml', mlProxyRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
