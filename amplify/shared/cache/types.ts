export interface CacheEntry<T> {
  cacheKey: string;
  response: T;
  expiresAt: number;
}