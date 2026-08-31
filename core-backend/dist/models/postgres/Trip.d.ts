import { Model } from 'sequelize';
export declare class Trip extends Model {
    id: string;
    vehicle_id: string;
    driver_id: string;
    route_id: string;
    transporter_id: string;
    origin: string;
    destination: string;
    status: 'planned' | 'in_transit' | 'delayed' | 'completed' | 'canceled';
    progress_percent: number;
    started_at: Date;
    eta: Date;
    actual_arrival_at?: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Trip.d.ts.map