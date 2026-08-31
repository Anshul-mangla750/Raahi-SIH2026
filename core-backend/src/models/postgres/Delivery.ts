import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class Delivery extends Model {
  public id!: string; // Tracking ID e.g. CON-2025-0891
  public trip_id?: string | null;
  public transporter_id!: string;
  public origin_district_id!: string;
  public dest_district_id!: string;
  public commodity_type!: 'medicine' | 'food' | 'agri' | 'construction' | 'fuel' | 'general';
  public priority!: 'low' | 'medium' | 'high' | 'critical';
  public consignee_name!: string;
  public consignee_phone!: string;
  public weight_kg!: number;
  public status!: 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'canceled';
  public pod_url?: string | null;
  public delivered_at?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Delivery.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    trip_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    transporter_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'transporter_01',
    },
    origin_district_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dest_district_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    commodity_type: {
      type: DataTypes.ENUM('medicine', 'food', 'agri', 'construction', 'fuel', 'general'),
      defaultValue: 'general',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium',
    },
    consignee_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    consignee_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    weight_kg: {
      type: DataTypes.DOUBLE,
      defaultValue: 1000,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_transit', 'delivered', 'delayed', 'canceled'),
      defaultValue: 'in_transit',
    },
    pod_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'deliveries',
    timestamps: true,
  }
);
