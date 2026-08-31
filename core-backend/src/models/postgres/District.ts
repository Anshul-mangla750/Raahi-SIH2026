import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class District extends Model {
  public id!: string;
  public name!: string;
  public state!: string;
  public connectivity_status!: 'accessible' | 'partial' | 'blocked';
  public connectivity_score!: number;
  public population!: number;
  public lat!: number;
  public lng!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

District.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    connectivity_status: {
      type: DataTypes.ENUM('accessible', 'partial', 'blocked'),
      defaultValue: 'accessible',
    },
    connectivity_score: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    population: {
      type: DataTypes.INTEGER,
      defaultValue: 100000,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'districts',
    timestamps: true,
  }
);
