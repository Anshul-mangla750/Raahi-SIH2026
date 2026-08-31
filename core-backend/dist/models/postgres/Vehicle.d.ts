import { Model } from 'sequelize';
export declare class Vehicle extends Model {
    id: string;
    model: string;
    transporter_id: string;
    type: string;
    capacity_kg: number;
    status: 'moving' | 'idle' | 'stopped' | 'delayed' | 'offline' | 'maintenance';
    current_lat: number;
    current_lng: number;
    speed: number;
    fuel_percent: number;
    current_route?: string | null;
    assigned_driver_id?: string | null;
    last_ping_at: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Vehicle.d.ts.map