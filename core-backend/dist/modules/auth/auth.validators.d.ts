import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        customId: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<["admin", "transporter", "field_officer", "field_worker", "driver", "user"]>;
        assignedDistrict: z.ZodOptional<z.ZodString>;
        district_id: z.ZodOptional<z.ZodString>;
        agency: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        companyName: z.ZodOptional<z.ZodString>;
        transporterId: z.ZodOptional<z.ZodString>;
        transporter_id: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        licenseNo: z.ZodOptional<z.ZodString>;
        vehicleNo: z.ZodOptional<z.ZodString>;
        vehicleType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        password: string;
        role: "admin" | "transporter" | "field_officer" | "driver" | "user" | "field_worker";
        customId?: string | undefined;
        phone?: string | undefined;
        assignedDistrict?: string | undefined;
        agency?: string | undefined;
        company?: string | undefined;
        companyName?: string | undefined;
        transporterId?: string | undefined;
        licenseNo?: string | undefined;
        vehicleNo?: string | undefined;
        vehicleType?: string | undefined;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
    }, {
        name: string;
        email: string;
        password: string;
        role: "admin" | "transporter" | "field_officer" | "driver" | "user" | "field_worker";
        customId?: string | undefined;
        phone?: string | undefined;
        assignedDistrict?: string | undefined;
        agency?: string | undefined;
        company?: string | undefined;
        companyName?: string | undefined;
        transporterId?: string | undefined;
        licenseNo?: string | undefined;
        vehicleNo?: string | undefined;
        vehicleType?: string | undefined;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
        role: "admin" | "transporter" | "field_officer" | "driver" | "user" | "field_worker";
        customId?: string | undefined;
        phone?: string | undefined;
        assignedDistrict?: string | undefined;
        agency?: string | undefined;
        company?: string | undefined;
        companyName?: string | undefined;
        transporterId?: string | undefined;
        licenseNo?: string | undefined;
        vehicleNo?: string | undefined;
        vehicleType?: string | undefined;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
        role: "admin" | "transporter" | "field_officer" | "driver" | "user" | "field_worker";
        customId?: string | undefined;
        phone?: string | undefined;
        assignedDistrict?: string | undefined;
        agency?: string | undefined;
        company?: string | undefined;
        companyName?: string | undefined;
        transporterId?: string | undefined;
        licenseNo?: string | undefined;
        vehicleNo?: string | undefined;
        vehicleType?: string | undefined;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const refreshSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        refreshToken: string;
    };
}, {
    body: {
        refreshToken: string;
    };
}>;
//# sourceMappingURL=auth.validators.d.ts.map