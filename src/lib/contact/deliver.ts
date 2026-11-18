import "server-only";
import type { ContactInput } from "./schema";
import { labelFor } from "./schema";
import { siteConfig } from "@/config/site";
import { logError, logEvent } from "@/lib/log";

/**
 * Inquiry delivery via Resend (https://resend.com).
 *
 * Environment variables (server-only — never prefix with NEXT_PUBLIC_):
 *   RESEND_API_KEY      Resend API key (required)
 *   CONTACT_TO_EMAIL    Recipient(s), comma-separated. Defaults to the
 *                       public studio email in src/config/site.ts.
 *   CONTACT_FROM_EMAIL  Sender on a domain verified in Resend, e.g.
 *                       "Frame & Flow Studio <inquiries@your-domain>".
 *
 * Resend's shared test sender (onboarding@resend.dev) only delivers to the
 * email address that owns the Resend account. It is used only when
 * CONTACT_FROM_EMAIL is unset AND either running `next dev` or
 * CONTACT_ALLOW_TEST_SENDER=true is set explicitly. Production builds
 * otherwise require a verified sender and report "not configured" until one
 * is provided — submissions are never silently dropped or faked.
 *
 * The visitor's address is only ever used as Reply-To, never as From.
 */

const TEST_SENDER = `${siteConfig.name} <onboarding@resend.dev>`;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

type DeliveryConfig =
  | { ok: true; apiKey: string; to: string[]; from: string; usingTestSender: boolean }
  | { ok: false; reason: string };

function parseSender(value: string): string | null {
  const v = value.trim();
  const match = v.match(/^(.*)<([^>]+)>$/);
  const address = (match ? match[2] : v).trim();
  if (!EMAIL_RE.test(address)) return null;
  return v;
}

export function getDeliveryConfig(): DeliveryConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { ok: false, reason: "RESEND_API_KEY is not set" };

  const to = (process.env.CONTACT_TO_EMAIL || siteConfig.contact.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (to.length === 0 || !to.every((a) => EMAIL_RE.test(a))) {
    return { ok: false, reason: "CONTACT_TO_EMAIL is not a valid email list" };
  }

  const fromEnv = process.env.CONTACT_FROM_EMAIL?.trim();
  if (fromEnv) {
    const from = parseSender(fromEnv);
    if (!from) return { ok: false, reason: "CONTACT_FROM_EMAIL is not a valid sender" };
    return { ok: true, apiKey, to, from, usingTestSender: /@resend\.dev>?$/i.test(fromEnv) };
  }

  const allowTest = process.env.NODE_ENV === "development" || process.env.CONTACT_ALLOW_TEST_SENDER === "true";
  if (allowTest) return { ok: true, apiKey, to, from: TEST_SENDER, usingTestSender: true };

  return { ok: false, reason: "CONTACT_FROM_EMAIL is not set (a verified sender domain is required)" };
}

export function isContactConfigured(): boolean {
  return getDeliveryConfig().ok;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Removes control characters (incl. CR/LF) from single-line values such as the subject. */
function singleLine(s: string, max = 140): string {
  return s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

function formatTimestamp(date: Date): string {
  const local = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Chicago",
  }).format(date);
  return `${local} (${date.toISOString()})`;
}

export function buildInquiryEmail(data: ContactInput, submittedAt: Date) {
  const services = data.services.map(labelFor.service).join(", ");
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Service interests", services],
    ["Timeline", data.timeline ? labelFor.timeline(data.timeline) : "Not specified"],
    ["Existing website", data.website || "Not provided"],
    ["Preferred contact", data.contactMethod ? labelFor.contactMethod(data.contactMethod) : "Not specified"],
    ...(data.phone ? ([["Phone", data.phone]] as [string, string][]) : []),
    ["Submitted", formatTimestamp(submittedAt)],
  ];

  const subject = singleLine(`New inquiry: ${data.company} — ${services}`);

  const text = [
    `New project inquiry — ${siteConfig.name}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project description:",
    data.description,
    "",
    "Reply to this email to respond directly to the visitor.",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:#F7F7F2;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#20231F">
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #DADDD5;border-radius:8px">
    <tr><td style="padding:28px 32px 8px">
      <p style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.02em">frame<span style="color:#526B50">&amp;</span>flow<span style="color:#526B50">.</span></p>
      <h1 style="margin:20px 0 0;font-size:22px;font-weight:600;letter-spacing:-0.01em">New project inquiry</h1>
    </td></tr>
    <tr><td style="padding:16px 32px">
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;line-height:1.5">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 16px 8px 0;color:#62685F;vertical-align:top;white-space:nowrap;border-bottom:1px solid #EEF0EA">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid #EEF0EA">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </td></tr>
    <tr><td style="padding:8px 32px 28px">
      <h2 style="margin:0 0 8px;font-size:15px;font-weight:600">Project description</h2>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.description)}</p>
    </td></tr>
    <tr><td style="padding:16px 32px;border-top:1px solid #DADDD5;font-size:12px;color:#62685F">
      Sent from the ${escapeHtml(siteConfig.name)} website contact form. Reply to this email to respond directly to ${escapeHtml(data.name)}.
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}

export type DeliveryResult = { delivered: true; id?: string } | { delivered: false; reason: "not_configured" | "failed" };

/**
 * Sends the inquiry. Returns delivered: true only when Resend accepted the
 * message (2xx response).
 */
export async function deliverInquiry(data: ContactInput): Promise<DeliveryResult> {
  const config = getDeliveryConfig();
  if (!config.ok) {
    logEvent("contact.not_configured", { reason: config.reason });
    return { delivered: false, reason: "not_configured" };
  }

  const { subject, text, html } = buildInquiryEmail(data, new Date());

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: data.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      logError("contact.delivery_failed", new Error(`Resend responded ${res.status}`), {
        status: res.status,
        detail: detail.slice(0, 300),
        usingTestSender: config.usingTestSender,
      });
      return { delivered: false, reason: "failed" };
    }

    const body = (await res.json().catch(() => null)) as { id?: string } | null;
    logEvent("contact.delivered", { id: body?.id, usingTestSender: config.usingTestSender });
    return { delivered: true, id: body?.id };
  } catch (err) {
    logError("contact.delivery_failed", err, { usingTestSender: config.usingTestSender });
    return { delivered: false, reason: "failed" };
  }
}
