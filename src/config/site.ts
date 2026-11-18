/**
 * Central site configuration.
 *
 * Everything that identifies the studio — name, founder, contact details,
 * social links, booking URL — lives here so the identity stays consistent
 * across navigation, pages, metadata, structured data and emails.
 */

export type SocialLink = {
  label: string;
  href: string;
};

/* ------------------------------------------------------------------ */
/* Site URL resolution                                                 */
/* ------------------------------------------------------------------ */

function cleanUrl(value: string | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!/^https?:$/.test(url.protocol)) return "";
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return "";
    // Keep any sub-path (e.g. GitHub Pages project sites: /business-website).
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return "";
  }
}

/**
 * The public production URL, used for canonical URLs, the sitemap,
 * robots.txt and absolute Open Graph URLs.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL, when explicitly configured.
 *  2. A production URL supplied by the hosting platform
 *     (Vercel production deployments, Netlify production context).
 *  3. Otherwise empty — no canonical URLs or sitemap entries are emitted,
 *     so preview and local builds never advertise a fake production URL.
 *
 * No custom domain has been chosen yet; do not hardcode one here.
 */
function resolveSiteUrl(): string {
  const explicit = cleanUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit;
  if (process.env.VERCEL_ENV === "production") {
    const vercel = cleanUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    if (vercel) return vercel;
  }
  if (process.env.NETLIFY === "true" && process.env.CONTEXT === "production") {
    const netlify = cleanUrl(process.env.URL);
    if (netlify) return netlify;
  }
  return "";
}

/**
 * Base URL for resolving relative metadata (e.g. Open Graph images) when no
 * production URL is known: the deployment's own URL on preview builds, or
 * localhost during `next dev`. Empty otherwise. Never used for canonical URLs.
 */
function resolveMetadataBase(siteUrl: string): string {
  if (siteUrl) return siteUrl;
  const deployment = cleanUrl(process.env.VERCEL_URL) || cleanUrl(process.env.DEPLOY_PRIME_URL);
  if (deployment) return deployment;
  if (process.env.NODE_ENV === "development") return `http://localhost:${process.env.PORT || 3000}`;
  // Unknown production host: emit no absolute metadata URLs rather than a fake one.
  return "";
}

/* ------------------------------------------------------------------ */
/* Social links                                                        */
/* ------------------------------------------------------------------ */

const socialSources: { label: string; env: string | undefined; hosts: string[] }[] = [
  { label: "LinkedIn", env: process.env.NEXT_PUBLIC_LINKEDIN_URL, hosts: ["linkedin.com"] },
  { label: "Instagram", env: process.env.NEXT_PUBLIC_INSTAGRAM_URL, hosts: ["instagram.com"] },
  { label: "GitHub", env: process.env.NEXT_PUBLIC_GITHUB_URL, hosts: ["github.com"] },
];

/**
 * A social link is only published when it is a valid https URL on the
 * expected domain and points at a specific profile (not the bare homepage).
 * Unset or invalid values are hidden automatically.
 */
function validSocialLinks(): SocialLink[] {
  return socialSources.flatMap(({ label, env, hosts }) => {
    if (!env) return [];
    try {
      const url = new URL(env.trim());
      const host = url.hostname.replace(/^www\./, "");
      const hasProfilePath = url.pathname.replace(/\/+$/, "").length > 1;
      if (url.protocol !== "https:" || !hosts.includes(host) || !hasProfilePath) return [];
      return [{ label, href: url.toString() }];
    } catch {
      return [];
    }
  });
}

/* ------------------------------------------------------------------ */

const siteUrl = resolveSiteUrl();

export const siteConfig = {
  /** Full legal-style trading name used in metadata, policy and emails. */
  name: "Frame & Flow Studio",
  /** Short display name for tight spaces. */
  displayName: "Frame & Flow",
  /** Lowercase wordmark text (rendered as an SVG logo). */
  wordmark: "frame&flow.",
  tagline: "Better websites. Smarter businesses.",
  description:
    "Frame & Flow Studio is an independent digital solutions studio specializing in website design, development, deployment, and practical AI-powered business automation.",
  /** Positioning line used in the footer. */
  positioning:
    "An independent digital solutions studio for website design, development and practical AI-powered business automation.",

  seo: {
    title: "Frame & Flow Studio | Websites & Business Automation",
    description:
      "Thoughtful website design, development, and practical AI automation for small businesses. Built to help you grow, simplify operations, and stay in control.",
  },

  /** Production URL — empty until one is configured (see resolveSiteUrl). */
  url: siteUrl,
  /** Base for resolving relative metadata URLs. Never used for canonicals. */
  metadataBase: resolveMetadataBase(siteUrl),
  /**
   * Base path the site is served under (static export on GitHub Pages
   * project sites, e.g. "/business-website"). Empty on a root domain.
   */
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, ""),
  /** Static HTML export (GitHub Pages): no server routes, no form delivery. */
  isStaticExport: process.env.STATIC_EXPORT === "true",
  /**
   * Keep the site out of search engines: preview deployments, or any build
   * with NEXT_PUBLIC_NOINDEX=true (e.g. the GitHub Pages test deployment).
   */
  noindex:
    process.env.NEXT_PUBLIC_NOINDEX === "true" ||
    process.env.VERCEL_ENV === "preview" ||
    (process.env.NETLIFY === "true" && !!process.env.CONTEXT && process.env.CONTEXT !== "production"),

  founder: {
    name: "Michael Li",
    role: "Founder & Digital Solutions Designer",
    /** Founder biography, one paragraph per entry. */
    bio: [
      "I'm a designer and product professional with a background in human-computer interaction, information systems, and AI product development.",
      "I founded Frame & Flow Studio to help small businesses build a stronger digital presence and simplify the way they work.",
      "My approach combines thoughtful design with practical technology. Whether it's creating a website or implementing an automated workflow, I focus on solutions that are intuitive, reliable, and built around real business needs.",
      "I believe businesses should have control over the technology they use. That's why every project is designed with long-term usability, clear documentation, and flexible maintenance options in mind.",
    ],
    /** Areas named in the biography. Keep this list factual. */
    background: ["Human-computer interaction", "Information systems", "AI product development"],
  },

  contact: {
    /** Public business email — used for mailto links and inquiry notifications. */
    email: "michaelmlidesign@gmail.com",
    /** Set to an empty string to hide the location. */
    location: "Dallas, Texas, United States",
    address: {
      locality: "Dallas",
      region: "TX",
      country: "US",
    },
    /**
     * Optional scheduling link (Cal.com, Calendly, etc.). When set, a
     * "Book a discovery call" option appears on the contact page.
     */
    bookingUrl: cleanUrl(process.env.NEXT_PUBLIC_BOOKING_URL) ? process.env.NEXT_PUBLIC_BOOKING_URL!.trim() : "",
  },

  /**
   * Verified social profiles only. Configure with NEXT_PUBLIC_LINKEDIN_URL,
   * NEXT_PUBLIC_INSTAGRAM_URL and NEXT_PUBLIC_GITHUB_URL — links appear
   * automatically once a valid profile URL is provided.
   */
  social: validSocialLinks(),

  privacy: {
    /**
     * Shown on the privacy page. Set to the actual publication date at
     * launch, and update whenever the policy changes.
     */
    lastUpdated: process.env.NEXT_PUBLIC_PRIVACY_LAST_UPDATED || "",
    /**
     * Flip to true once the owner (and ideally a legal professional) has
     * reviewed the policy. Until then, the page shows a review notice.
     */
    reviewed: process.env.NEXT_PUBLIC_PRIVACY_REVIEWED === "true",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Absolute URL helper. Joins onto the site URL, keeping any sub-path.
 * Returns the base-path-prefixed relative path when no site URL is set.
 */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!siteConfig.url) return assetPath(clean);
  return `${siteConfig.url}${clean === "/" ? "/" : clean}`;
}

/** Prefixes a root-relative path with the base path (for non-<Link> URLs). */
export function assetPath(path: string): string {
  return `${siteConfig.basePath}${path}`;
}
