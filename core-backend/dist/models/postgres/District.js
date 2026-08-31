"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.District = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class District extends sequelize_1.Model {
}
exports.District = District;
District.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    connectivity_status: {
        type: sequelize_1.DataTypes.ENUM('accessible', 'partial', 'blocked'),
        defaultValue: 'accessible',
    },
    connectivity_score: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 100,
    },
    population: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 100000,
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
    tableName: 'districts',
    timestamps: true,
});
//# sourceMappingURL=District.js.map