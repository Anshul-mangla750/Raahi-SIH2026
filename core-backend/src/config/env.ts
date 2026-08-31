import dotenv from 'dotenv';
dotenv.config();

export const env = {
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
