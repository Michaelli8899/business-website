import { createContext, useContext, useEffect } from "react";
import { absoluteUrl, assetPath, siteConfig } from "@/config/site";

/**
 * Document head management for a prerendered SPA.
 *
 * - During prerendering, <Seo> records its tags in a collector supplied by
 *   entry-server.tsx; scripts/prerender.mjs injects them into each HTML file.
 * - In the browser, <Seo> replaces the tags it owns (marked data-head) after
 *   each navigation.
 */

export type HeadTag =
  | { tag: "title"; content: string }
  | { tag: "meta"; attrs: Record<string, string> }
  | { tag: "link"; attrs: Record<string, string> }
  | { tag: "script"; attrs: Record<string, string>; content: string };

export type HeadCollector = { tags: HeadTag[]; set: (tags: HeadTag[]) => void };

export const HeadContext = createContext<HeadCollector | null>(null);

export type SeoProps = {
  /** Page title without the studio suffix. Omit on the homepage. */
  title?: string;
  description?: string;
  /** Router path, e.g. "/about". */
  path: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
};

export function buildHeadTags({ title, description, path, jsonLd, noindex }: SeoProps): HeadTag[] {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.title;
  const desc = description ?? siteConfig.seo.description;
  const tags: HeadTag[] = [
    { tag: "title", content: fullTitle },
    { tag: "meta", attrs: { name: "description", content: desc } },
    { tag: "meta", attrs: { property: "og:title", content: fullTitle } },
    { tag: "meta", attrs: { property: "og:description", content: desc } },
    { tag: "meta", attrs: { property: "og:site_name", content: siteConfig.name } },
    { tag: "meta", attrs: { property: "og:type", content: "website" } },
    { tag: "meta", attrs: { property: "og:locale", content: "en_US" } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: fullTitle } },
    { tag: "meta", attrs: { name: "twitter:description", content: desc } },
  ];
  // Absolute URLs only when a real site URL is configured.
  if (siteConfig.url) {
    const url = absoluteUrl(path);
    const image = absoluteUrl("/og.png");
    tags.push(
      { tag: "link", attrs: { rel: "canonical", href: url } },
      { tag: "meta", attrs: { property: "og:url", content: url } },
      { tag: "meta", attrs: { property: "og:image", content: image } },
      { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
      { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
      { tag: "meta", attrs: { property: "og:image:alt", content: siteConfig.seo.title } },
      { tag: "meta", attrs: { name: "twitter:image", content: image } },
    );
  }
  if (noindex || siteConfig.noindex) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex, nofollow" } });
  }
  if (jsonLd) {
    tags.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      content: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
    });
  }
  return tags;
}

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Serialises head tags for prerendered HTML. */
export function headTagsToHtml(tags: HeadTag[]): string {
  return tags
    .map((t) => {
      if (t.tag === "title") return `<title>${escapeText(t.content)}</title>`;
      const attrs = Object.entries(t.attrs)
        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
        .join(" ");
      if (t.tag === "script") return `<script data-head ${attrs}>${t.content}</script>`;
      return `<${t.tag} data-head ${attrs}>`;
    })
    .join("\n    ");
}

function applyHeadTags(tags: HeadTag[]) {
  document.head.querySelectorAll("[data-head]").forEach((el) => el.remove());
  for (const t of tags) {
    if (t.tag === "title") {
      document.title = t.content;
      continue;
    }
    const el = document.createElement(t.tag);
    el.setAttribute("data-head", "");
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    if (t.tag === "script") el.textContent = t.content;
    document.head.appendChild(el);
  }
}

/** Declares the current page's title, description and metadata. */
export function Seo(props: SeoProps) {
  const collector = useContext(HeadContext);
  const tags = buildHeadTags(props);
  collector?.set(tags);

  const key = JSON.stringify(tags);
  useEffect(() => {
    applyHeadTags(JSON.parse(key) as HeadTag[]);
  }, [key]);

  return null;
}

/** Static head links shared by every page (icons, manifest). */
export function staticHeadHtml(): string {
  return [
    `<link rel="icon" href="${assetPath("/favicon.ico")}" sizes="48x48">`,
    `<link rel="icon" href="${assetPath("/icon.svg")}" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${assetPath("/apple-touch-icon.png")}">`,
    `<link rel="manifest" href="${assetPath("/manifest.webmanifest")}">`,
  ].join("\n    ");
}
