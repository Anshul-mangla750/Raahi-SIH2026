"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'district_officer', 'field_agent', 'transporter', 'driver', 'viewer'),
        allowNull: false,
        defaultValue: 'viewer',
    },
    district_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    transporter_id: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    agency: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'users',
    timestamps: true,
});
//# sourceMappingURL=User.js.map