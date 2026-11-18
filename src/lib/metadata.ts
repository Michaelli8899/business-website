import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Builds consistent per-page metadata (title, description, OG, canonical). */
export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const desc = description ?? siteConfig.description;
  const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;
  return {
    title: title ?? { absolute: fullTitle },
    description: desc,
    alternates: siteConfig.url ? { canonical: path } : undefined,
    openGraph: {
      title: fullTitle,
      description: desc,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}
