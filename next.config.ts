import type { NextConfig } from "next";

/**
 * Two build modes:
 *
 *  - Default (Vercel / any Node host): full app, including the
 *    /api/contact route that delivers inquiries through Resend.
 *  - Static export (STATIC_EXPORT=true), used for GitHub Pages: plain HTML
 *    in `out/`, served under NEXT_PUBLIC_BASE_PATH (e.g. /business-website).
 *    Server-only routes are excluded, so the contact form shows its
 *    "not connected" state with an email fallback instead of submitting.
 *
 * Server-only route handlers use the `.server.ts` extension, which is only
 * registered as a page extension in the default (server) mode.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath: basePath || undefined,
      images: { unoptimized: true },
      pageExtensions: ["tsx", "ts"],
    }
  : {
      pageExtensions: ["tsx", "ts", "server.ts"],
    };

export default nextConfig;
