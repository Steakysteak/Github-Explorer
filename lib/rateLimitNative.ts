// A global memory map to store IP hit records
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function isRateLimited(ip: string, limit = 30, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If IP doesn't exist or window expired, spin up a fresh record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false; // Not limited
  }

  // If they clicked past the ceiling, block them
  if (record.count >= limit) {
    return true; // Limited!
  }

  // Increment their click count and let them pass
  record.count++;
  return false;
}