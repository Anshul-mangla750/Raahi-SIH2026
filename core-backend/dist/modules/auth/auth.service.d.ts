import { User } from '../../models/postgres/User';
export declare class AuthService {
    static generateTokens(user: User): {
        accessToken: string;
        refreshToken: string;
    };
    static register(data: {
        name: string;
        email: string;
        password: string;
        role: 'admin' | 'district_officer' | 'field_agent' | 'transporter' | 'driver' | 'viewer';
        district_id?: string;
        transporter_id?: string;
        agency?: string;
        phone?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "district_officer" | "field_agent" | "transporter" | "driver" | "viewer";
            districtId: string | null | undefined;
            transporterId: string | null | undefined;
            agency: string | null | undefined;
            phone: string | null | undefined;
        };
    }>;
    static login(identifier: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "district_officer" | "field_agent" | "transporter" | "driver" | "viewer";
            districtId: string | null | undefined;
            transporterId: string | null | undefined;
            agency: string | null | undefined;
            phone: string | null | undefined;
        };
    }>;
    static refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    static logout(userId: string): Promise<boolean>;
}
//# sourceMappingURL=auth.service.d.ts.map