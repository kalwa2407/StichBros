import { Redis } from '@upstash/redis';

// This works automatically when you add Upstash Redis integration in Vercel dashboard
// It reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from env
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});
