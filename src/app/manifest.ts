import type { MetadataRoute } from "next";
import { assetPath, siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.displayName,
    description: siteConfig.seo.description,
    start_url: assetPath("/"),
    display: "browser",
    background_color: "#F7F7F2",
    theme_color: "#F7F7F2",
    icons: [
      { src: assetPath("/icon.svg"), type: "image/svg+xml", sizes: "any" },
      { src: assetPath("/brand/icon-192.png"), type: "image/png", sizes: "192x192" },
      { src: assetPath("/brand/icon-512.png"), type: "image/png", sizes: "512x512" },
    ],
  };
}
