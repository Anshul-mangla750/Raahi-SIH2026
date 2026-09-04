"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        customId: zod_1.z.string().optional(),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(4, 'Password must be at least 4 characters'),
        role: zod_1.z.enum(['admin', 'transporter', 'field_officer', 'field_worker', 'driver', 'user']),
        assignedDistrict: zod_1.z.string().optional(),
        district_id: zod_1.z.string().optional(),
        agency: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        companyName: zod_1.z.string().optional(),
        transporterId: zod_1.z.string().optional(),
        transporter_id: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        licenseNo: zod_1.z.string().optional(),
        vehicleNo: zod_1.z.string().optional(),
        vehicleType: zod_1.z.string().optional(),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, 'Email or phone is required'),
        password: zod_1.z.string().min(4, 'Password must be at least 4 characters'),
    }),
});
exports.refreshSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string().min(1, 'Refresh token is required'),
    }),
});
//# sourceMappingURL=auth.validators.js.map