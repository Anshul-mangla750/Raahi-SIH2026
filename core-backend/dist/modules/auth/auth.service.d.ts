import { UserRole } from '../../models/mongo/User';
export declare class AuthService {
    static normalizeRole(rawRole: string): UserRole;
    static generateTokens(user: {
        id: string;
        customId?: string;
        name: string;
        email: string;
        role: string;
        assignedDistrict?: string | null;
        transporterId?: string | null;
        agency?: string | null;
        company?: string | null;
        phone?: string | null;
    }): {
        accessToken: string;
        refreshToken: string;
    };
    static register(data: {
        customId?: string;
        name: string;
        email: string;
        password: string;
        role: UserRole;
        assignedDistrict?: string;
        transporterId?: string;
        agency?: string;
        companyName?: string;
        company?: string;
        phone?: string;
        licenseNo?: string;
        vehicleNo?: string;
        vehicleType?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            customId: string | undefined;
            name: string;
            email: string;
            role: UserRole;
            assignedDistrict: string | undefined;
            transporterId: string | undefined;
            agency: string | undefined;
            company: string | undefined;
            phone: string | undefined;
        };
    }>;
    static login(identifier: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            customId: string | undefined;
            name: string;
            email: string;
            role: UserRole;
            assignedDistrict: string | undefined;
            transporterId: string | undefined;
            agency: string | undefined;
            company: string | undefined;
            phone: string | undefined;
        };
    } | {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            customId: string;
            name: string;
            email: string;
            role: UserRole;
            assignedDistrict: string | null | undefined;
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