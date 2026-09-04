import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    customId: z.string().optional(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    role: z.enum(['admin', 'transporter', 'field_officer', 'field_worker', 'driver', 'user']),
    assignedDistrict: z.string().optional(),
    district_id: z.string().optional(),
    agency: z.string().optional(),
    company: z.string().optional(),
    companyName: z.string().optional(),
    transporterId: z.string().optional(),
    transporter_id: z.string().optional(),
    phone: z.string().optional(),
    licenseNo: z.string().optional(),
    vehicleNo: z.string().optional(),
    vehicleType: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email or phone is required'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});
