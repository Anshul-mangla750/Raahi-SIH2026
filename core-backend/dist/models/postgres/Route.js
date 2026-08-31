"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Route extends sequelize_1.Model {
}
exports.Route = Route;
Route.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    origin_district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    dest_district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    road_ids: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: [],
    },
    distance_km: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    avg_travel_hours: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('good', 'at_risk', 'blocked'),
        defaultValue: 'good',
    },
    current_risk_score: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 15,
    },
    fuel_cost_estimate: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 2500,
    },
    toll_cost: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 400,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'routes',
    timestamps: true,
});
//# sourceMappingURL=Route.js.map