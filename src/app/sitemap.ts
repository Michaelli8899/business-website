import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  const staticRoutes = ["/", "/services/websites", "/services/ai", "/work", "/about", "/contact", "/privacy"];
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
