"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPostgres = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("./env");
exports.sequelize = new sequelize_1.Sequelize(env_1.env.postgresUri, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: env_1.env.nodeEnv === 'development' ? false : false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
const connectPostgres = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('✅ PostgreSQL (Neon) connected successfully.');
        // Enable PostGIS extension if available
        try {
            await exports.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
            console.log('✅ PostGIS extension checked/enabled.');
        }
        catch (extErr) {
            console.warn('⚠️ PostGIS extension notice:', extErr.message);
        }
    }
    catch (error) {
        console.error('❌ PostgreSQL connection error:', error.message);
        throw error;
    }
};
exports.connectPostgres = connectPostgres;
//# sourceMappingURL=db.js.map