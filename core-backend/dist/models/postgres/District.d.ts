import { Model } from 'sequelize';
export declare class District extends Model {
    id: string;
    name: string;
    state: string;
    connectivity_status: 'accessible' | 'partial' | 'blocked';
    connectivity_score: number;
    population: number;
    lat: number;
    lng: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=District.d.ts.map