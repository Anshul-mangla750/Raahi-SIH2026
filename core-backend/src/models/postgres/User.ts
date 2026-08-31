import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'admin' | 'district_officer' | 'field_agent' | 'transporter' | 'driver' | 'viewer';
  public district_id?: string | null;
  public transporter_id?: string | null;
  public agency?: string | null;
  public phone?: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'district_officer', 'field_agent', 'transporter', 'driver', 'viewer'),
      allowNull: false,
      defaultValue: 'viewer',
    },
    district_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    transporter_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    agency: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);
