"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Vehicle extends sequelize_1.Model {
}
exports.Vehicle = Vehicle;
Vehicle.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    model: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    transporter_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'transporter_01',
    },
    type: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'Medium Commercial Vehicle',
    },
    capacity_kg: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 5000,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('moving', 'idle', 'stopped', 'delayed', 'offline', 'maintenance'),
        defaultValue: 'moving',
    },
    current_lat: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 26.1445,
    },
    current_lng: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 91.7362,
    },
    speed: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 45,
    },
    fuel_percent: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 80,
    },
    current_route: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
    },
    assigned_driver_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    last_ping_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'vehicles',
    timestamps: true,
});
//# sourceMappingURL=Vehicle.js.map