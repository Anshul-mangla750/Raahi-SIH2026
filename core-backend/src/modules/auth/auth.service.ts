import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoUser, IUser, UserRole } from '../../models/mongo/User';
import { User as PgUser } from '../../models/postgres/User';
import { env } from '../../config/env';
import { redisClient } from '../../config/redis';
import { Op } from 'sequelize';

export class AuthService {
  static normalizeRole(rawRole: string): UserRole {
    if (!rawRole) return 'user';
    const lower = rawRole.toLowerCase();
    if (lower === 'admin') return 'admin';
    if (lower === 'transporter') return 'transporter';
    if (lower === 'field_officer' || lower === 'field_worker' || lower === 'district_officer' || lower === 'field_agent') {
      return 'field_officer';
    }
    if (lower === 'driver') return 'driver';
    return 'user';
  }

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
  }) {
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
  }) {
    const normalizedEmail = data.email.toLowerCase().trim();
    const existing = await MongoUser.findOne({
      $or: [
        { email: normalizedEmail },
        ...(data.customId ? [{ customId: data.customId.trim() }] : []),
      ],
    });

    if (existing) {
      throw new Error('User with this email or ID already exists');
    }

    const role = this.normalizeRole(data.role);

    const mongoUser = new MongoUser({
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
      await redisClient.set(`refresh_token:${formattedUser.id}`, tokens.refreshToken, { ex: 604800 });
    } catch (e) {
      // Redis fallback
    }

    return {
      user: formattedUser,
      ...tokens,
    };
  }

  static async login(identifier: string, password: string) {
    const idTrimmed = identifier.trim();
    const idLower = idTrimmed.toLowerCase();

    // 1. First check MongoDB (Primary source of truth for both Website & Mobile)
    let mongoUser = await MongoUser.findOne({
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
        await redisClient.set(`refresh_token:${formattedUser.id}`, tokens.refreshToken, { ex: 604800 });
      } catch (e) {}

      return {
        user: formattedUser,
        ...tokens,
      };
    }

    // 2. Fallback check PostgreSQL (for existing seeded users like admin@raahi.gov.in)
    const pgUser = await PgUser.findOne({
      where: {
        [Op.or]: [
          { email: idLower },
          { phone: idTrimmed },
          { id: idTrimmed },
        ],
      },
    });

    if (pgUser) {
      const isMatch = await bcrypt.compare(password, pgUser.password_hash);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const role = this.normalizeRole(pgUser.role);

      // Auto-replicate to MongoDB so mobile and web stay in complete sync!
      try {
        const syncedMongoUser = new MongoUser({
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
      } catch (syncErr) {
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
        await redisClient.set(`refresh_token:${formattedUser.id}`, tokens.refreshToken, { ex: 604800 });
      } catch (e) {}

      return {
        user: formattedUser,
        ...tokens,
      };
    }

    throw new Error('Invalid credentials');
  }

  static async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret) as { id: string };
      let savedToken: string | null = null;
      try {
        savedToken = await redisClient.get(`refresh_token:${decoded.id}`);
      } catch (e) {}

      if (savedToken && savedToken !== refreshToken) {
        throw new Error('Invalid or expired refresh token');
      }

      // Check Mongo first
      let user: any = await MongoUser.findById(decoded.id);
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
          await redisClient.set(`refresh_token:${user._id}`, tokens.refreshToken, { ex: 604800 });
        } catch (e) {}
        return tokens;
      }

      // Check Postgres
      const pgUser = await PgUser.findByPk(decoded.id);
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
        await redisClient.set(`refresh_token:${pgUser.id}`, tokens.refreshToken, { ex: 604800 });
      } catch (e) {}

      return tokens;
    } catch (err: any) {
      throw new Error(err.message || 'Token refresh failed');
    }
  }

  static async logout(userId: string) {
    try {
      await redisClient.del(`refresh_token:${userId}`);
    } catch (e) {}
    return true;
  }
}
