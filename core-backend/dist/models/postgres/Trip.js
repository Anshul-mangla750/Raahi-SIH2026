"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Trip extends sequelize_1.Model {
}
exports.Trip = Trip;
Trip.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    vehicle_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    driver_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    route_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    transporter_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'transporter_01',
    },
    origin: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    destination: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('planned', 'in_transit', 'delayed', 'completed', 'canceled'),
        defaultValue: 'in_transit',
    },
    progress_percent: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    started_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    eta: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    actual_arrival_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'trips',
    timestamps: true,
});
//# sourceMappingURL=Trip.js.map