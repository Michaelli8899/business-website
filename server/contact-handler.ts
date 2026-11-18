import { createHash } from "node:crypto";
import { validateContact, type ContactResponse } from "../src/lib/contact/schema";
import { identity } from "../src/config/identity";
import { deliverInquiry } from "./deliver";
import { rateLimit } from "./rate-limit";
import { logError, logEvent } from "./log";

/**
 * Contact form backend — a portable Web-standard handler
 * (Request → Response) that validates inquiries and emails them via Resend.
 *
 * The website itself is static (GitHub Pages), so this runs separately as a
 * serverless function, e.g. on Vercel or Netlify (Node runtime). Point the
 * site's VITE_CONTACT_ENDPOINT at its URL. See README → Contact form delivery.
 *
 * Function environment variables:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL   (see deliver.ts)
 *   ALLOWED_ORIGINS   Comma-separated site origins allowed to submit,
 *                     e.g. "https://michaelli8899.github.io". Required.
 *   UPSTASH_REDIS_REST_URL / _TOKEN   Shared rate limiting (recommended)
 */

/** Minimum time (ms) between rendering the form and submitting it. */
const MIN_FILL_TIME = 3000;
/** Maximum age of a form session before it must be reloaded. */
const MAX_FILL_TIME = 24 * 60 * 60 * 1000;
/** Generous upper bound — the largest valid submission is well under this. */
const MAX_BODY_BYTES = 16_000;

const email = identity.email;

function allowedOrigins(): string[] {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !allowedOrigins().includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: ContactResponse, status: number, origin: string | null, headers?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...corsHeaders(origin), ...headers },
  });
}

/** IPs are hashed before use as a rate-limit key so raw addresses are never stored. */
function clientKey(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

/** CORS preflight. */
export function OPTIONS(req: Request): Response {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  return new Response(null, { status: Object.keys(headers).length ? 204 : 403, headers });
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  try {
    // Only the configured site may submit (blocks cross-site abuse).
    if (!origin || !allowedOrigins().includes(origin)) {
      logEvent("contact.origin_rejected");
      return json({ ok: false, code: "bad_request", message: "Invalid request origin." }, 403, origin);
    }

    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ ok: false, code: "bad_request", message: "Unsupported content type." }, 415, origin);
    }

    const declaredLength = Number(req.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return json({ ok: false, code: "bad_request", message: "The submission is too large." }, 413, origin);
    }

    const limit = await rateLimit(`contact:${clientKey(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!limit.allowed) {
      logEvent("contact.rate_limited");
      return json(
        { ok: false, code: "rate_limited", message: `Too many submissions. Please wait a few minutes, or email ${email} directly.` },
        429,
        origin,
        { "Retry-After": String(limit.retryAfter) },
      );
    }

    let body: Record<string, unknown>;
    try {
      const text = await req.text();
      if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
        return json({ ok: false, code: "bad_request", message: "The submission is too large." }, 413, origin);
      }
      body = JSON.parse(text);
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("bad shape");
    } catch {
      return json({ ok: false, code: "bad_request", message: "The submission could not be read." }, 400, origin);
    }

    // Spam protection: honeypot field + plausible fill time.
    const startedAt = Number(body.startedAt);
    const elapsed = Date.now() - startedAt;
    const honeypotFilled = typeof body.fax === "string" && body.fax.length > 0;
    if (honeypotFilled || !Number.isFinite(startedAt) || elapsed < MIN_FILL_TIME || elapsed > MAX_FILL_TIME) {
      logEvent("contact.spam_blocked", { honeypot: honeypotFilled });
      return json(
        { ok: false, code: "spam", message: `Your message couldn't be submitted. Please reload the page and try again, or email ${email}.` },
        400,
        origin,
      );
    }

    const result = validateContact(body);
    if (!result.ok) {
      return json({ ok: false, code: "validation", message: "Please check the highlighted fields.", errors: result.errors }, 422, origin);
    }

    const delivery = await deliverInquiry(result.data);
    if (!delivery.delivered) {
      if (delivery.reason === "not_configured") {
        return json(
          {
            ok: false,
            code: "not_configured",
            message: `Online inquiries aren't connected yet, so your message was not sent. Please email ${email} instead.`,
          },
          503,
          origin,
        );
      }
      return json(
        { ok: false, code: "delivery_failed", message: `Your message could not be sent. Please try again shortly, or email ${email}.` },
        502,
        origin,
      );
    }

    return json({ ok: true }, 200, origin);
  } catch (err) {
    logError("contact.unhandled", err);
    return json({ ok: false, code: "delivery_failed", message: `Something went wrong. Please try again, or email ${email}.` }, 500, origin);
  }
}
