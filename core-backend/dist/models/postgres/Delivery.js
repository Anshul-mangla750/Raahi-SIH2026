"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Delivery extends sequelize_1.Model {
}
exports.Delivery = Delivery;
Delivery.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    trip_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    transporter_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'transporter_01',
    },
    origin_district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    dest_district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    commodity_type: {
        type: sequelize_1.DataTypes.ENUM('medicine', 'food', 'agri', 'construction', 'fuel', 'general'),
        defaultValue: 'general',
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high', 'critical'),
        defaultValue: 'medium',
    },
    consignee_name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    consignee_phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    weight_kg: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 1000,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'in_transit', 'delivered', 'delayed', 'canceled'),
        defaultValue: 'in_transit',
    },
    pod_url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    delivered_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'deliveries',
    timestamps: true,
});
//# sourceMappingURL=Delivery.js.map