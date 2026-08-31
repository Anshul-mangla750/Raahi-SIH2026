import { Model } from 'sequelize';
export declare class Driver extends Model {
    id: string;
    name: string;
    phone: string;
    license_number: string;
    license_expiry: Date;
    vehicle_id?: string | null;
    transporter_id: string;
    status: 'active' | 'on_leave' | 'inactive';
    rating: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Driver.d.ts.map