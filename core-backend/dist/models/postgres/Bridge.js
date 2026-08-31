"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Bridge extends sequelize_1.Model {
}
exports.Bridge = Bridge;
Bridge.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    road_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('operational', 'damaged', 'closed'),
        defaultValue: 'operational',
    },
    load_capacity_tons: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 40.0,
    },
    lat: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    lng: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'bridges',
    timestamps: true,
});
//# sourceMappingURL=Bridge.js.map