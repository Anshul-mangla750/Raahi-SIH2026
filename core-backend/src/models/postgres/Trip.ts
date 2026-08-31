import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class Trip extends Model {
  public id!: string;
  public vehicle_id!: string;
  public driver_id!: string;
  public route_id!: string;
  public transporter_id!: string;
  public origin!: string;
  public destination!: string;
  public status!: 'planned' | 'in_transit' | 'delayed' | 'completed' | 'canceled';
  public progress_percent!: number;
  public started_at!: Date;
  public eta!: Date;
  public actual_arrival_at?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Trip.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    vehicle_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    route_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    transporter_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'transporter_01',
    },
    origin: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('planned', 'in_transit', 'delayed', 'completed', 'canceled'),
      defaultValue: 'in_transit',
    },
    progress_percent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    started_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    eta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    actual_arrival_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'trips',
    timestamps: true,
  }
);
