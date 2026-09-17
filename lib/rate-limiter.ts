export const DAILY_FREE_LIMIT = 10;

interface UsageRecord {
  count: number;
  resetTime: number; // Unix timestamp in ms
}

// In-memory IP tracking store for server-side rate limiting
const ipUsageMap = new Map<string, UsageRecord>();

// Clean up expired records periodically (every 1 hour)
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipUsageMap.entries()) {
    if (now > record.resetTime) {
      ipUsageMap.delete(ip);
    }
  }
}, 60 * 60 * 1000);

function getMidnightResetTime(): number {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: number;
  isPro: boolean;
}

export function checkRateLimit(identifier: string, isPro: boolean = false): RateLimitResult {
  // Pro users have unlimited access
  if (isPro) {
    return {
      allowed: true,
      remaining: 9999,
      limit: 9999,
      resetAt: getMidnightResetTime(),
      isPro: true,
    };
  }

  const now = Date.now();
  const existing = ipUsageMap.get(identifier);

  if (!existing || now > existing.resetTime) {
    // New day or first request
    const resetTime = getMidnightResetTime();
    ipUsageMap.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: DAILY_FREE_LIMIT - 1,
      limit: DAILY_FREE_LIMIT,
      resetAt: resetTime,
      isPro: false,
    };
  }

  if (existing.count >= DAILY_FREE_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: DAILY_FREE_LIMIT,
      resetAt: existing.resetTime,
      isPro: false,
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: DAILY_FREE_LIMIT - existing.count,
    limit: DAILY_FREE_LIMIT,
    resetAt: existing.resetTime,
    isPro: false,
  };
}

export function resetRateLimit(identifier: string): RateLimitResult {
  const resetTime = getMidnightResetTime();
  ipUsageMap.delete(identifier);
  return {
    allowed: true,
    remaining: DAILY_FREE_LIMIT,
    limit: DAILY_FREE_LIMIT,
    resetAt: resetTime,
    isPro: false,
  };
}
