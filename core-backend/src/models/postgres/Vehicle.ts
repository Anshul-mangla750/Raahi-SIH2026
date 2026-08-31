import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class Vehicle extends Model {
  public id!: string; // registration number e.g. AS-01-AB-1234
  public model!: string;
  public transporter_id!: string;
  public type!: string;
  public capacity_kg!: number;
  public status!: 'moving' | 'idle' | 'stopped' | 'delayed' | 'offline' | 'maintenance';
  public current_lat!: number;
  public current_lng!: number;
  public speed!: number;
  public fuel_percent!: number;
  public current_route?: string | null;
  public assigned_driver_id?: string | null;
  public last_ping_at!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    transporter_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'transporter_01',
    },
    type: {
      type: DataTypes.STRING(50),
      defaultValue: 'Medium Commercial Vehicle',
    },
    capacity_kg: {
      type: DataTypes.INTEGER,
      defaultValue: 5000,
    },
    status: {
      type: DataTypes.ENUM('moving', 'idle', 'stopped', 'delayed', 'offline', 'maintenance'),
      defaultValue: 'moving',
    },
    current_lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 26.1445,
    },
    current_lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 91.7362,
    },
    speed: {
      type: DataTypes.DOUBLE,
      defaultValue: 45,
    },
    fuel_percent: {
      type: DataTypes.INTEGER,
      defaultValue: 80,
    },
    current_route: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    assigned_driver_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_ping_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'vehicles',
    timestamps: true,
  }
);
