import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/postgres/User';
import { env } from '../../config/env';
import { redisClient } from '../../config/redis';
import { Op } from 'sequelize';

export class AuthService {
  static generateTokens(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      districtId: user.district_id,
      transporterId: user.transporter_id,
    };

    const accessToken = jwt.sign(payload, env.jwtAccessSecret, {
      expiresIn: env.jwtAccessExpires as any,
    });

    const refreshToken = jwt.sign(
      { id: user.id },
      env.jwtRefreshSecret,
      { expiresIn: env.jwtRefreshExpires as any }
    );

    return { accessToken, refreshToken };
  }

  static async register(data: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'district_officer' | 'field_agent' | 'transporter' | 'driver' | 'viewer';
    district_id?: string;
    transporter_id?: string;
    agency?: string;
    phone?: string;
  }) {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error('User with this email already exists');
    }

    const password_hash = await bcrypt.hash(data.password, 12);

    const user = await User.create({
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
    await redisClient.set(`refresh_token:${user.id}`, tokens.refreshToken, { ex: 604800 });

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

  static async login(identifier: string, password: string) {
    // Support finding by email or phone
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const tokens = this.generateTokens(user);
    await redisClient.set(`refresh_token:${user.id}`, tokens.refreshToken, { ex: 604800 });

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

  static async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret) as { id: string };
      const savedToken = await redisClient.get(`refresh_token:${decoded.id}`);

      if (!savedToken || savedToken !== refreshToken) {
        throw new Error('Invalid or expired refresh token');
      }

      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }

      const tokens = this.generateTokens(user);
      await redisClient.set(`refresh_token:${user.id}`, tokens.refreshToken, { ex: 604800 });

      return tokens;
    } catch (err: any) {
      throw new Error(err.message || 'Token refresh failed');
    }
  }

  static async logout(userId: string) {
    await redisClient.del(`refresh_token:${userId}`);
    return true;
  }
}
