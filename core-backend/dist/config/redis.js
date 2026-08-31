"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("@upstash/redis");
const env_1 = require("./env");
// In-memory fallback map for offline / development resilience
const memoryStore = new Map();
let upstashRedis = null;
if (env_1.env.upstashRedisUrl && env_1.env.upstashRedisToken) {
    try {
        upstashRedis = new redis_1.Redis({
            url: env_1.env.upstashRedisUrl,
            token: env_1.env.upstashRedisToken,
        });
    }
    catch (err) {
        console.warn('⚠️ Upstash Redis init warning:', err.message);
    }
}
exports.redisClient = {
    async get(key) {
        if (upstashRedis) {
            try {
                return (await upstashRedis.get(key));
            }
            catch (err) {
                console.warn(`Redis get error for ${key}, falling back to memory store:`, err);
            }
        }
        const item = memoryStore.get(key);
        if (!item)
            return null;
        if (item.expiry && Date.now() > item.expiry) {
            memoryStore.delete(key);
            return null;
        }
        return item.value;
    },
    async set(key, value, options) {
        if (upstashRedis) {
            try {
                if (options?.ex) {
                    await upstashRedis.set(key, value, { ex: options.ex });
                }
                else {
                    await upstashRedis.set(key, value);
                }
                return 'OK';
            }
            catch (err) {
                console.warn(`Redis set error for ${key}, falling back to memory store:`, err);
            }
        }
        const expiry = options?.ex ? Date.now() + options.ex * 1000 : null;
        memoryStore.set(key, { value, expiry });
        return 'OK';
    },
    async del(key) {
        if (upstashRedis) {
            try {
                return await upstashRedis.del(key);
            }
            catch (err) {
                console.warn(`Redis del error for ${key}:`, err);
            }
        }
        const existed = memoryStore.has(key);
        memoryStore.delete(key);
        return existed ? 1 : 0;
    },
    async keys(pattern) {
        if (upstashRedis) {
            try {
                return await upstashRedis.keys(pattern);
            }
            catch (err) {
                console.warn(`Redis keys error for ${pattern}:`, err);
            }
        }
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        return Array.from(memoryStore.keys()).filter((k) => regex.test(k));
    },
};
//# sourceMappingURL=redis.js.map