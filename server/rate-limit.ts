import { logError } from "./log";

/**
 * Rate limiting for the contact endpoint.
 *
 * - Shared limiter (recommended for production / serverless): set
 *   UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to use a fixed-window
 *   counter in Upstash Redis via its REST API. No extra dependency needed.
 * - Fallback: an in-memory sliding window. On serverless platforms each
 *   instance has its own memory, so this alone is NOT a reliable limit —
 *   combine it with platform protection (e.g. a Vercel Firewall rate-limit
 *   rule on /api/contact). See README → Security.
 *
 * If the shared store errors, the in-memory limiter is used for that request
 * rather than blocking legitimate visitors.
 */

type Result = { allowed: boolean; retryAfter: number };
type Options = { limit: number; windowMs: number };

const buckets = new Map<string, number[]>();
const MAX_KEYS = 5000;

function memoryLimit(key: string, { limit, windowMs }: Options): Result {
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

async function upstashLimit(key: string, { limit, windowMs }: Options): Promise<Result> {
  const url = process.env.UPSTASH_REDIS_REST_URL!.replace(/\/+$/, "");
  const windowSec = Math.ceil(windowMs / 1000);
  const windowId = Math.floor(Date.now() / windowMs);
  const redisKey = `ratelimit:${key}:${windowId}`;

  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["EXPIRE", redisKey, String(windowSec), "NX"],
    ]),
    signal: AbortSignal.timeout(2000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash responded ${res.status}`);
  const [incr] = (await res.json()) as [{ result: number }];
  const count = Number(incr?.result);
  if (!Number.isFinite(count)) throw new Error("Unexpected Upstash response");

  if (count > limit) {
    const retryAfter = windowSec - (Math.floor(Date.now() / 1000) % windowSec);
    return { allowed: false, retryAfter };
  }
  return { allowed: true, retryAfter: 0 };
}

export function isSharedRateLimiterConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export async function rateLimit(key: string, options: Options): Promise<Result> {
  if (isSharedRateLimiterConfigured()) {
    try {
      return await upstashLimit(key, options);
    } catch (err) {
      logError("ratelimit.shared_store_failed", err);
    }
  }
  return memoryLimit(key, options);
}
