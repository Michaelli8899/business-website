import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.displayName,
    description: siteConfig.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#F7F7F2",
    theme_color: "#F7F7F2",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
