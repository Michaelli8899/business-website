import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { validateContact, type ContactResponse } from "@/lib/contact/schema";
import { deliverInquiry } from "@/lib/contact/deliver";
import { rateLimit } from "@/lib/rate-limit";
import { logError, logEvent } from "@/lib/log";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

/** Minimum time (ms) between rendering the form and submitting it. */
const MIN_FILL_TIME = 3000;
/** Maximum age of a form session before it must be reloaded. */
const MAX_FILL_TIME = 24 * 60 * 60 * 1000;
/** Generous upper bound — the largest valid submission is well under this. */
const MAX_BODY_BYTES = 16_000;

const email = siteConfig.contact.email;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** IPs are hashed before use as a rate-limit key so raw addresses are never stored. */
function clientKey(req: NextRequest): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  try {
    // Same-origin check — browsers always send Origin on cross-site POSTs.
    const origin = req.headers.get("origin");
    if (origin) {
      let sameOrigin = false;
      try {
        sameOrigin = new URL(origin).host === req.headers.get("host");
      } catch {}
      if (!sameOrigin) {
        return json({ ok: false, code: "bad_request", message: "Invalid request origin." }, 403);
      }
    }

    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ ok: false, code: "bad_request", message: "Unsupported content type." }, 415);
    }

    const declaredLength = Number(req.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return json({ ok: false, code: "bad_request", message: "The submission is too large." }, 413);
    }

    const limit = await rateLimit(`contact:${clientKey(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!limit.allowed) {
      logEvent("contact.rate_limited");
      return json(
        {
          ok: false,
          code: "rate_limited",
          message: `Too many submissions. Please wait a few minutes, or email ${email} directly.`,
        },
        429,
        { "Retry-After": String(limit.retryAfter) },
      );
    }

    let body: Record<string, unknown>;
    try {
      const text = await req.text();
      if (Buffer.byteLength(text) > MAX_BODY_BYTES) {
        return json({ ok: false, code: "bad_request", message: "The submission is too large." }, 413);
      }
      body = JSON.parse(text);
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("bad shape");
    } catch {
      return json({ ok: false, code: "bad_request", message: "The submission could not be read." }, 400);
    }

    // Spam protection: honeypot field + plausible fill time.
    const startedAt = Number(body.startedAt);
    const elapsed = Date.now() - startedAt;
    const honeypotFilled = typeof body.fax === "string" && body.fax.length > 0;
    if (honeypotFilled || !Number.isFinite(startedAt) || elapsed < MIN_FILL_TIME || elapsed > MAX_FILL_TIME) {
      logEvent("contact.spam_blocked", { honeypot: honeypotFilled });
      return json(
        {
          ok: false,
          code: "spam",
          message: `Your message couldn't be submitted. Please reload the page and try again, or email ${email}.`,
        },
        400,
      );
    }

    const result = validateContact(body);
    if (!result.ok) {
      return json(
        { ok: false, code: "validation", message: "Please check the highlighted fields.", errors: result.errors },
        422,
      );
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
        );
      }
      return json(
        {
          ok: false,
          code: "delivery_failed",
          message: `Your message could not be sent. Please try again shortly, or email ${email}.`,
        },
        502,
      );
    }

    return json({ ok: true }, 200);
  } catch (err) {
    logError("contact.unhandled", err);
    return json(
      { ok: false, code: "delivery_failed", message: `Something went wrong. Please try again, or email ${email}.` },
      500,
    );
  }
}
