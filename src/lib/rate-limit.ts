import "server-only";

/**
 * Small in-memory sliding-window rate limiter.
 *
 * Suitable for a single server instance. On serverless platforms each
 * instance keeps its own memory, so treat this as a first line of defence;
 * for stricter guarantees use a shared store (e.g. Upstash Redis) or the
 * hosting provider's firewall rules.
 */
const buckets = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { allowed: false, retryAfter: Math.ceil((windowMs - (now - hits[0]!)) / 1000) };
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > MAX_KEYS) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return { allowed: true, retryAfter: 0 };
}
