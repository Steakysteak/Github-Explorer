type CacheEntry = {
  data: any;
  expiresAt: number;
};

// Ensures global scope works correctly across hot reloads in Next.js development
const globalForCache = global as unknown as { repoCache?: Map<string, CacheEntry> };
export const cache = globalForCache.repoCache ?? new Map<string, CacheEntry>();

if (process.env.NODE_ENV !== 'production') globalForCache.repoCache = cache;

export const CACHE_TTL = 60 * 1000; // 60 seconds
