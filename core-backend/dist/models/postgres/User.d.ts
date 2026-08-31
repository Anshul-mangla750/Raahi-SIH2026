import { Model } from 'sequelize';
export declare class User extends Model {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: 'admin' | 'district_officer' | 'field_agent' | 'transporter' | 'driver' | 'viewer';
    district_id?: string | null;
    transporter_id?: string | null;
    agency?: string | null;
    phone?: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map