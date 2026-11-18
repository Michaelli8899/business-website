import { NextResponse, type NextRequest } from "next/server";
import { validateContact, type ContactResponse } from "@/lib/contact/schema";
import { deliverInquiry, isContactConfigured } from "@/lib/contact/deliver";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

/** Minimum time (ms) between rendering the form and submitting it. */
const MIN_FILL_TIME = 3000;
const MAX_BODY_BYTES = 20_000;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(req: NextRequest) {
  // Same-origin check — browsers always send Origin on cross-site POSTs.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return json({ ok: false, code: "bad_request", message: "Invalid request origin." }, 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: `Too many submissions. Please wait a few minutes, or email ${siteConfig.contact.email} directly.`,
      },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) throw new Error("too large");
    body = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("bad shape");
  } catch {
    return json({ ok: false, code: "bad_request", message: "The submission could not be read." }, 400);
  }

  // Spam protection: honeypot field + minimum fill time.
  const startedAt = Number(body.startedAt);
  if ((typeof body.fax === "string" && body.fax.length > 0) || !startedAt || Date.now() - startedAt < MIN_FILL_TIME) {
    return json(
      {
        ok: false,
        code: "spam",
        message: `Your message couldn't be submitted. Please try again, or email ${siteConfig.contact.email}.`,
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

  if (!isContactConfigured()) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message: `Online inquiries aren't connected yet, so your message was not sent. Please email ${siteConfig.contact.email} instead.`,
      },
      503,
    );
  }

  const { delivered } = await deliverInquiry(result.data);
  if (!delivered) {
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message: `Something went wrong sending your message. Please try again shortly, or email ${siteConfig.contact.email}.`,
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
