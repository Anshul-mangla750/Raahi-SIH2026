import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<["admin", "district_officer", "field_agent", "transporter", "driver", "viewer"]>;
        district_id: z.ZodOptional<z.ZodString>;
        transporter_id: z.ZodOptional<z.ZodString>;
        agency: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        role: "admin" | "district_officer" | "field_agent" | "transporter" | "driver" | "viewer";
        password: string;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
        agency?: string | undefined;
        phone?: string | undefined;
    }, {
        name: string;
        email: string;
        role: "admin" | "district_officer" | "field_agent" | "transporter" | "driver" | "viewer";
        password: string;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
        agency?: string | undefined;
        phone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        role: "admin" | "district_officer" | "field_agent" | "transporter" | "driver" | "viewer";
        password: string;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
        agency?: string | undefined;
        phone?: string | undefined;
    };
}, {
    body: {
        name: string;
        email: string;
        role: "admin" | "district_officer" | "field_agent" | "transporter" | "driver" | "viewer";
        password: string;
        district_id?: string | undefined;
        transporter_id?: string | undefined;
        agency?: string | undefined;
        phone?: string | undefined;
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