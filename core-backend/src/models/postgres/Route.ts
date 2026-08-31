import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class Route extends Model {
  public id!: string;
  public name!: string;
  public origin_district_id!: string;
  public dest_district_id!: string;
  public road_ids!: string[];
  public distance_km!: number;
  public avg_travel_hours!: number;
  public status!: 'good' | 'at_risk' | 'blocked';
  public current_risk_score!: number;
  public fuel_cost_estimate!: number;
  public toll_cost!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Route.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    origin_district_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dest_district_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    road_ids: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    distance_km: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    avg_travel_hours: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('good', 'at_risk', 'blocked'),
      defaultValue: 'good',
    },
    current_risk_score: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
    },
    fuel_cost_estimate: {
      type: DataTypes.DOUBLE,
      defaultValue: 2500,
    },
    toll_cost: {
      type: DataTypes.DOUBLE,
      defaultValue: 400,
    },
  },
  {
    sequelize,
    tableName: 'routes',
    timestamps: true,
  }
);
