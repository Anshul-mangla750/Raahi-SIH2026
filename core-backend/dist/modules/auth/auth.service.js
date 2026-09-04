"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/mongo/User");
const User_2 = require("../../models/postgres/User");
const env_1 = require("../../config/env");
const redis_1 = require("../../config/redis");
const sequelize_1 = require("sequelize");
class AuthService {
    static normalizeRole(rawRole) {
        if (!rawRole)
            return 'user';
        const lower = rawRole.toLowerCase();
        if (lower === 'admin')
            return 'admin';
        if (lower === 'transporter')
            return 'transporter';
        if (lower === 'field_officer' || lower === 'field_worker' || lower === 'district_officer' || lower === 'field_agent') {
            return 'field_officer';
        }
        if (lower === 'driver')
            return 'driver';
        return 'user';
    }
    static generateTokens(user) {
        const role = this.normalizeRole(user.role);
        const payload = {
            id: user.id,
            customId: user.customId,
            name: user.name,
            email: user.email,
            role,
            assignedDistrict: user.assignedDistrict,
            transporterId: user.transporterId,
            agency: user.agency,
            company: user.company,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, env_1.env.jwtAccessSecret, {
            expiresIn: env_1.env.jwtAccessExpires,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, env_1.env.jwtRefreshSecret, { expiresIn: env_1.env.jwtRefreshExpires });
        return { accessToken, refreshToken };
    }
    static async register(data) {
        const normalizedEmail = data.email.toLowerCase().trim();
        const existing = await User_1.MongoUser.findOne({
            $or: [
                { email: normalizedEmail },
                ...(data.customId ? [{ customId: data.customId.trim() }] : []),
            ],
        });
        if (existing) {
            throw new Error('User with this email or ID already exists');
        }
        const role = this.normalizeRole(data.role);
        const mongoUser = new User_1.MongoUser({
            customId: data.customId ? data.customId.trim() : undefined,
            name: data.name.trim(),
            email: normalizedEmail,
            password: data.password, // Pre-save hook hashes with bcrypt
            role,
            phone: data.phone?.trim(),
            assignedDistrict: data.assignedDistrict,
            agency: data.agency,
            company: data.company || data.companyName,
            companyName: data.companyName || data.company,
            transporterId: data.transporterId,
            licenseNo: data.licenseNo,
            vehicleNo: data.vehicleNo,
            vehicleType: data.vehicleType,
        });
        await mongoUser.save();
        const formattedUser = {
            id: mongoUser._id.toString(),
            customId: mongoUser.customId,
            name: mongoUser.name,
            email: mongoUser.email,
            role,
            assignedDistrict: mongoUser.assignedDistrict,
            transporterId: mongoUser.transporterId,
            agency: mongoUser.agency,
            company: mongoUser.company || mongoUser.companyName,
            phone: mongoUser.phone,
        };
        const tokens = this.generateTokens(formattedUser);
        try {
            await redis_1.redisClient.set(`refresh_token:${formattedUser.id}`, tokens.refreshToken, { ex: 604800 });
        }
        catch (e) {
            // Redis fallback
        }
        return {
            user: formattedUser,
            ...tokens,
        };
    }
    static async login(identifier, password) {
        const idTrimmed = identifier.trim();
        const idLower = idTrimmed.toLowerCase();
        // 1. First check MongoDB (Primary source of truth for both Website & Mobile)
        let mongoUser = await User_1.MongoUser.findOne({
            $or: [
                { email: idLower },
                { phone: idTrimmed },
                { customId: idTrimmed },
            ],
        });
        if (mongoUser) {
            const isMatch = await mongoUser.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const role = this.normalizeRole(mongoUser.role);
            const formattedUser = {
                id: mongoUser._id.toString(),
                customId: mongoUser.customId,
                name: mongoUser.name,
                email: mongoUser.email,
                role,
                assignedDistrict: mongoUser.assignedDistrict,
                transporterId: mongoUser.transporterId,
                agency: mongoUser.agency,
                company: mongoUser.company || mongoUser.companyName,
                phone: mongoUser.phone,
            };
            const tokens = this.generateTokens(formattedUser);
            try {
                await redis_1.redisClient.set(`refresh_token:${formattedUser.id}`, tokens.refreshToken, { ex: 604800 });
            }
            catch (e) { }
            return {
                user: formattedUser,
                ...tokens,
            };
        }
        // 2. Fallback check PostgreSQL (for existing seeded users like admin@raahi.gov.in)
        const pgUser = await User_2.User.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { email: idLower },
                    { phone: idTrimmed },
                    { id: idTrimmed },
                ],
            },
        });
        if (pgUser) {
            const isMatch = await bcrypt_1.default.compare(password, pgUser.password_hash);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const role = this.normalizeRole(pgUser.role);
            // Auto-replicate to MongoDB so mobile and web stay in complete sync!
            try {
                const syncedMongoUser = new User_1.MongoUser({
                    customId: pgUser.id,
                    name: pgUser.name,
                    email: pgUser.email.toLowerCase(),
                    password, // will be hashed by pre-save
                    role,
                    phone: pgUser.phone || undefined,
                    agency: pgUser.agency || undefined,
                    assignedDistrict: pgUser.district_id || undefined,
                    transporterId: pgUser.transporter_id || undefined,
                });
                await syncedMongoUser.save();
            }
            catch (syncErr) {
                // Ignored if already created or email exists
            }
            const formattedUser = {
                id: pgUser.id,
                customId: pgUser.id,
                name: pgUser.name,
                email: pgUser.email,
                role,
                assignedDistrict: pgUser.district_id,
                transporterId: pgUser.transporter_id,
                agency: pgUser.agency,
                phone: pgUser.phone,
            };
            const tokens = this.generateTokens(formattedUser);
            try {
                await redis_1.redisClient.set(`refresh_token:${formattedUser.id}`, tokens.refreshToken, { ex: 604800 });
            }
            catch (e) { }
            return {
                user: formattedUser,
                ...tokens,
            };
        }
        throw new Error('Invalid credentials');
    }
    static async refresh(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.env.jwtRefreshSecret);
            let savedToken = null;
            try {
                savedToken = await redis_1.redisClient.get(`refresh_token:${decoded.id}`);
            }
            catch (e) { }
            if (savedToken && savedToken !== refreshToken) {
                throw new Error('Invalid or expired refresh token');
            }
            // Check Mongo first
            let user = await User_1.MongoUser.findById(decoded.id);
            if (user) {
                const tokens = this.generateTokens({
                    id: user._id.toString(),
                    customId: user.customId,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    assignedDistrict: user.assignedDistrict,
                    transporterId: user.transporterId,
                    agency: user.agency,
                    company: user.company,
                    phone: user.phone,
                });
                try {
                    await redis_1.redisClient.set(`refresh_token:${user._id}`, tokens.refreshToken, { ex: 604800 });
                }
                catch (e) { }
                return tokens;
            }
            // Check Postgres
            const pgUser = await User_2.User.findByPk(decoded.id);
            if (!pgUser) {
                throw new Error('User not found');
            }
            const tokens = this.generateTokens({
                id: pgUser.id,
                name: pgUser.name,
                email: pgUser.email,
                role: pgUser.role,
                assignedDistrict: pgUser.district_id,
                transporterId: pgUser.transporter_id,
                agency: pgUser.agency,
                phone: pgUser.phone,
            });
            try {
                await redis_1.redisClient.set(`refresh_token:${pgUser.id}`, tokens.refreshToken, { ex: 604800 });
            }
            catch (e) { }
            return tokens;
        }
        catch (err) {
            throw new Error(err.message || 'Token refresh failed');
        }
    }
    static async logout(userId) {
        try {
            await redis_1.redisClient.del(`refresh_token:${userId}`);
        }
        catch (e) { }
        return true;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map