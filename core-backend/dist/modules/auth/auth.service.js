"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/postgres/User");
const env_1 = require("../../config/env");
const redis_1 = require("../../config/redis");
const sequelize_1 = require("sequelize");
class AuthService {
    static generateTokens(user) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            districtId: user.district_id,
            transporterId: user.transporter_id,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, env_1.env.jwtAccessSecret, {
            expiresIn: env_1.env.jwtAccessExpires,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, env_1.env.jwtRefreshSecret, { expiresIn: env_1.env.jwtRefreshExpires });
        return { accessToken, refreshToken };
    }
    static async register(data) {
        const existing = await User_1.User.findOne({ where: { email: data.email } });
        if (existing) {
            throw new Error('User with this email already exists');
        }
        const password_hash = await bcrypt_1.default.hash(data.password, 12);
        const user = await User_1.User.create({
            name: data.name,
            email: data.email,
            password_hash,
            role: data.role,
            district_id: data.district_id || null,
            transporter_id: data.transporter_id || null,
            agency: data.agency || null,
            phone: data.phone || null,
        });
        const tokens = this.generateTokens(user);
        // Save refresh token to Redis with 7 days TTL (604800s)
        await redis_1.redisClient.set(`refresh_token:${user.id}`, tokens.refreshToken, { ex: 604800 });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                districtId: user.district_id,
                transporterId: user.transporter_id,
                agency: user.agency,
                phone: user.phone,
            },
            ...tokens,
        };
    }
    static async login(identifier, password) {
        // Support finding by email or phone
        const user = await User_1.User.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { email: identifier },
                    { phone: identifier },
                ],
            },
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const tokens = this.generateTokens(user);
        await redis_1.redisClient.set(`refresh_token:${user.id}`, tokens.refreshToken, { ex: 604800 });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                districtId: user.district_id,
                transporterId: user.transporter_id,
                agency: user.agency,
                phone: user.phone,
            },
            ...tokens,
        };
    }
    static async refresh(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.env.jwtRefreshSecret);
            const savedToken = await redis_1.redisClient.get(`refresh_token:${decoded.id}`);
            if (!savedToken || savedToken !== refreshToken) {
                throw new Error('Invalid or expired refresh token');
            }
            const user = await User_1.User.findByPk(decoded.id);
            if (!user) {
                throw new Error('User not found');
            }
            const tokens = this.generateTokens(user);
            await redis_1.redisClient.set(`refresh_token:${user.id}`, tokens.refreshToken, { ex: 604800 });
            return tokens;
        }
        catch (err) {
            throw new Error(err.message || 'Token refresh failed');
        }
    }
    static async logout(userId) {
        await redis_1.redisClient.del(`refresh_token:${userId}`);
        return true;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map