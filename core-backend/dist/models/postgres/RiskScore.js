"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskScore = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class RiskScore extends sequelize_1.Model {
}
exports.RiskScore = RiskScore;
RiskScore.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    route_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    risk_level: {
        type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high', 'critical'),
        allowNull: false,
    },
    factors: {
        type: sequelize_1.DataTypes.JSONB,
        defaultValue: {},
    },
    computed_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'risk_scores',
    timestamps: true,
});
//# sourceMappingURL=RiskScore.js.map