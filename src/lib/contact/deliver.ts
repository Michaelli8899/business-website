import "server-only";
import type { ContactInput } from "./schema";
import { labelFor } from "./schema";
import { siteConfig } from "@/config/site";

/**
 * Inquiry delivery.
 *
 * Two integrations are supported, configured with environment variables
 * (see README → "Contact form delivery"):
 *
 *  1. Email via Resend (https://resend.com)
 *     RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 *  2. Generic webhook (Zapier, Make, n8n, a CRM, Slack workflow, …)
 *     CONTACT_WEBHOOK_URL, optional CONTACT_WEBHOOK_SECRET
 *
 * If neither is configured, submissions are rejected with a clear
 * "not configured" response — they are never silently dropped.
 */

type Channel = "email" | "webhook";

export function getConfiguredChannels(): Channel[] {
  const channels: Channel[] = [];
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) channels.push("email");
  if (process.env.CONTACT_WEBHOOK_URL) channels.push("webhook");
  return channels;
}

export function isContactConfigured(): boolean {
  return getConfiguredChannels().length > 0;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function summaryRows(data: ContactInput): [string, string][] {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Services", data.services.map(labelFor.service).join(", ")],
    ["Website", data.website || "—"],
    ["Timeline", data.timeline ? labelFor.timeline(data.timeline) : "—"],
    ["Preferred contact", data.contactMethod ? labelFor.contactMethod(data.contactMethod) : "—"],
    ...(data.phone ? ([["Phone", data.phone]] as [string, string][]) : []),
  ];
}

async function sendEmail(data: ContactInput): Promise<void> {
  const rows = summaryRows(data);
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Project description:", data.description].join("\n");
  const html = `
    <h2 style="font-family:sans-serif">New project inquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#62685f">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:sans-serif">Project description</h3>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.description)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} Website <onboarding@resend.dev>`,
      to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `New inquiry: ${data.company} — ${data.services.map(labelFor.service).join(", ")}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

async function sendWebhook(data: ContactInput): Promise<void> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.CONTACT_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.CONTACT_WEBHOOK_SECRET;

  const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "project_inquiry",
      submittedAt: new Date().toISOString(),
      source: siteConfig.url || "website",
      ...data,
      serviceLabels: data.services.map(labelFor.service),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * Sends the inquiry through every configured channel. Succeeds if at least
 * one channel delivered it; failures are logged server-side.
 */
export async function deliverInquiry(data: ContactInput): Promise<{ delivered: boolean }> {
  const channels = getConfiguredChannels();
  const results = await Promise.allSettled(
    channels.map((c) => (c === "email" ? sendEmail(data) : sendWebhook(data))),
  );
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[contact] ${channels[i]} delivery failed:`, r.reason);
  });
  return { delivered: results.some((r) => r.status === "fulfilled") };
}
