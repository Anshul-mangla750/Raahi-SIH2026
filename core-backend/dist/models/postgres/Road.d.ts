import { Model } from 'sequelize';
export declare class Road extends Model {
    id: string;
    name: string;
    district_id: string;
    road_type: string;
    condition: 'good' | 'damaged' | 'blocked';
    last_verified_at: Date;
    slope_risk: number;
    length_km: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Road.d.ts.map