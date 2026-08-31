import { Model } from 'sequelize';
export declare class Bridge extends Model {
    id: string;
    name: string;
    road_id: string;
    district_id: string;
    status: 'operational' | 'damaged' | 'closed';
    load_capacity_tons: number;
    lat: number;
    lng: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Bridge.d.ts.map