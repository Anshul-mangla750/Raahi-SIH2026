import { Model } from 'sequelize';
export declare class Route extends Model {
    id: string;
    name: string;
    origin_district_id: string;
    dest_district_id: string;
    road_ids: string[];
    distance_km: number;
    avg_travel_hours: number;
    status: 'good' | 'at_risk' | 'blocked';
    current_risk_score: number;
    fuel_cost_estimate: number;
    toll_cost: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Route.d.ts.map