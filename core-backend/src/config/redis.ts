import { Redis } from '@upstash/redis';
import { env } from './env';

// In-memory fallback map for offline / development resilience
const memoryStore = new Map<string, { value: any; expiry: number | null }>();

let upstashRedis: Redis | null = null;

if (env.upstashRedisUrl && env.upstashRedisToken) {
  try {
    upstashRedis = new Redis({
      url: env.upstashRedisUrl,
      token: env.upstashRedisToken,
    });
  } catch (err: any) {
    console.warn('⚠️ Upstash Redis init warning:', err.message);
  }
}

export const redisClient = {
  async get<T = any>(key: string): Promise<T | null> {
    if (upstashRedis) {
      try {
        return (await upstashRedis.get(key)) as T;
      } catch (err) {
        console.warn(`Redis get error for ${key}, falling back to memory store:`, err);
      }
    }
    const item = memoryStore.get(key);
    if (!item) return null;
    if (item.expiry && Date.now() > item.expiry) {
      memoryStore.delete(key);
      return null;
    }
    return item.value as T;
  },

  async set(key: string, value: any, options?: { ex?: number }): Promise<'OK'> {
    if (upstashRedis) {
      try {
        if (options?.ex) {
          await upstashRedis.set(key, value, { ex: options.ex });
        } else {
          await upstashRedis.set(key, value);
        }
        return 'OK';
      } catch (err) {
        console.warn(`Redis set error for ${key}, falling back to memory store:`, err);
      }
    }
    const expiry = options?.ex ? Date.now() + options.ex * 1000 : null;
    memoryStore.set(key, { value, expiry });
    return 'OK';
  },

  async del(key: string): Promise<number> {
    if (upstashRedis) {
      try {
        return await upstashRedis.del(key);
      } catch (err) {
        console.warn(`Redis del error for ${key}:`, err);
      }
    }
    const existed = memoryStore.has(key);
    memoryStore.delete(key);
    return existed ? 1 : 0;
  },

  async keys(pattern: string): Promise<string[]> {
    if (upstashRedis) {
      try {
        return await upstashRedis.keys(pattern);
      } catch (err) {
        console.warn(`Redis keys error for ${pattern}:`, err);
      }
    }
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return Array.from(memoryStore.keys()).filter((k) => regex.test(k));
  },
};
