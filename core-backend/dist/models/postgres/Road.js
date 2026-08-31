"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Road = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Road extends sequelize_1.Model {
}
exports.Road = Road;
Road.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    road_type: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: 'National Highway',
    },
    condition: {
        type: sequelize_1.DataTypes.ENUM('good', 'damaged', 'blocked'),
        defaultValue: 'good',
    },
    slope_risk: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 10,
    },
    length_km: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 50.0,
    },
    last_verified_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'roads',
    timestamps: true,
});
//# sourceMappingURL=Road.js.map