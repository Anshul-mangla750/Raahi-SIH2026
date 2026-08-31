import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

export class RiskScore extends Model {
  public id!: string;
  public route_id!: string;
  public score!: number; // 0-100
  public risk_level!: 'low' | 'medium' | 'high' | 'critical';
  public factors!: Record<string, any>;
  public computed_at!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RiskScore.init(
  {
    id: {
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    route_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    risk_level: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      allowNull: false,
    },
    factors: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    computed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'risk_scores',
    timestamps: true,
  }
);
