/**
 * Prerenders every route to static HTML after `vite build`.
 *
 * Each page ships as real HTML (fast first paint, crawlable, correct titles
 * and metadata), then React hydrates it in the browser. Also generates
 * 404.html, sitemap.xml, robots.txt and manifest.webmanifest.
 *
 * Run via `npm run build`, which first builds the client bundle (dist/) and
 * the server render bundle (dist-ssr/).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, staticRoutes, siteConfig, absoluteUrl, assetPath } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function page(url) {
  const { html, head } = render(url);
  // Guard against silently shipping empty pages (e.g. a router mismatch).
  if (!html.includes("<main") || !head.includes("<title>")) {
    throw new Error(`Prerender produced an empty page for ${url}`);
  }
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
}

function write(rel, content) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

for (const route of staticRoutes) {
  const html = page(route);
  if (route === "/") {
    write("index.html", html);
    continue;
  }
  const rel = route.slice(1);
  // /about -> about.html (GitHub Pages serves it at /about, no trailing slash).
  write(`${rel}.html`, html);
  // Routes that are also directories (e.g. /work with /work/<slug>) also get
  // an index.html in case the host resolves the directory first.
  if (staticRoutes.some((r) => r.startsWith(`${route}/`))) write(`${rel}/index.html`, html);
}

// Served by GitHub Pages for unknown paths; React renders the not-found page.
write("404.html", page("/__not-found__"));

// robots.txt — disallow everything on noindex (test) builds.
const robots = siteConfig.noindex
  ? "User-agent: *\nDisallow: /\n"
  : `User-agent: *\nAllow: /\n${siteConfig.url ? `\nSitemap: ${absoluteUrl("/sitemap.xml")}\n` : ""}`;
write("robots.txt", robots);

// sitemap.xml — only with a real site URL, never a guessed domain.
const urls = siteConfig.url
  ? staticRoutes.map((r) => `  <url><loc>${absoluteUrl(r)}</loc></url>`).join("\n")
  : "";
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

write(
  "manifest.webmanifest",
  JSON.stringify(
    {
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
    },
    null,
    2,
  ),
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${staticRoutes.length} routes + 404.html, sitemap.xml, robots.txt, manifest.webmanifest`);
