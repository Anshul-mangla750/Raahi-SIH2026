import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class Road extends Model {
  public id!: string;
  public name!: string;
  public district_id!: string;
  public road_type!: string;
  public condition!: 'good' | 'damaged' | 'blocked';
  public last_verified_at!: Date;
  public slope_risk!: number; // 0 to 100
  public length_km!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Road.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    district_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    road_type: {
      type: DataTypes.STRING(50),
      defaultValue: 'National Highway',
    },
    condition: {
      type: DataTypes.ENUM('good', 'damaged', 'blocked'),
      defaultValue: 'good',
    },
    slope_risk: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    length_km: {
      type: DataTypes.DOUBLE,
      defaultValue: 50.0,
    },
    last_verified_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'roads',
    timestamps: true,
  }
);
