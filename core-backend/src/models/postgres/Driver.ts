import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class Driver extends Model {
  public id!: string;
  public name!: string;
  public phone!: string;
  public license_number!: string;
  public license_expiry!: Date;
  public vehicle_id?: string | null;
  public transporter_id!: string;
  public status!: 'active' | 'on_leave' | 'inactive';
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    license_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    transporter_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'transporter_01',
    },
    status: {
      type: DataTypes.ENUM('active', 'on_leave', 'inactive'),
      defaultValue: 'active',
    },
    rating: {
      type: DataTypes.DOUBLE,
      defaultValue: 4.8,
    },
  },
  {
    sequelize,
    tableName: 'drivers',
    timestamps: true,
  }
);
