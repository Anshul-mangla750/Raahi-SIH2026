export declare const redisClient: {
    get<T = any>(key: string): Promise<T | null>;
    set(key: string, value: any, options?: {
        ex?: number;
    }): Promise<"OK">;
    del(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
};
//# sourceMappingURL=redis.d.ts.map