"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Driver extends sequelize_1.Model {
}
exports.Driver = Driver;
Driver.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    license_number: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    license_expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    vehicle_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    transporter_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'transporter_01',
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'on_leave', 'inactive'),
        defaultValue: 'active',
    },
    rating: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 4.8,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'drivers',
    timestamps: true,
});
//# sourceMappingURL=Driver.js.map