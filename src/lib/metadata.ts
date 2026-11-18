import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Social image entries. Only emitted when an absolute base URL is known, so
 * metadata never points at localhost or a guessed domain in production.
 */
export function ogImages() {
  if (!siteConfig.metadataBase) return undefined;
  return [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.seo.title }];
}

/**
 * Builds consistent per-page metadata. Canonical URLs are only emitted when
 * a real production URL is configured (see src/config/site.ts).
 */
export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const desc = description ?? siteConfig.seo.description;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.title;
  return {
    title: title ?? { absolute: siteConfig.seo.title },
    description: desc,
    alternates: siteConfig.url ? { canonical: path } : undefined,
    openGraph: {
      title: fullTitle,
      description: desc,
      ...(siteConfig.url ? { url: path } : {}),
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: ogImages()?.map((i) => i.url),
    },
  };
}
