import { Model } from 'sequelize';
export declare class Delivery extends Model {
    id: string;
    trip_id?: string | null;
    transporter_id: string;
    origin_district_id: string;
    dest_district_id: string;
    commodity_type: 'medicine' | 'food' | 'agri' | 'construction' | 'fuel' | 'general';
    priority: 'low' | 'medium' | 'high' | 'critical';
    consignee_name: string;
    consignee_phone: string;
    weight_kg: number;
    status: 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'canceled';
    pod_url?: string | null;
    delivered_at?: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Delivery.d.ts.map