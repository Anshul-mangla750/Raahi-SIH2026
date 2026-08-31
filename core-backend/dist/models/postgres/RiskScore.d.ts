import { Model } from 'sequelize';
export declare class RiskScore extends Model {
    id: string;
    route_id: string;
    score: number;
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    factors: Record<string, any>;
    computed_at: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=RiskScore.d.ts.map