import { Sequelize } from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize(env.postgresUri, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: env.nodeEnv === 'development' ? false : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (Neon) connected successfully.');
    // Enable PostGIS extension if available
    try {
      await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
      console.log('✅ PostGIS extension checked/enabled.');
    } catch (extErr: any) {
      console.warn('⚠️ PostGIS extension notice:', extErr.message);
    }
  } catch (error: any) {
    console.error('❌ PostgreSQL connection error:', error.message);
    throw error;
  }
};
