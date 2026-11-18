import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (siteConfig.isPreviewDeployment) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    // Only advertise a sitemap/host once a real production URL is configured.
    ...(siteConfig.url ? { sitemap: absoluteUrl("/sitemap.xml"), host: siteConfig.url } : {}),
  };
}
