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

import { identity } from "./identity";

const env = import.meta.env;

/* ------------------------------------------------------------------ */
/* URL helpers                                                         */
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
 * The public site URL, used for canonical URLs, the sitemap, robots.txt and
 * absolute Open Graph URLs. Set VITE_SITE_URL at build time (the GitHub
 * Pages workflow sets it automatically). When empty, no canonical URLs or
 * sitemap entries are generated — never a guessed domain.
 */
const siteUrl = cleanUrl(env.VITE_SITE_URL);

/** Base path the app is served under, from Vite's `base` (e.g. "/business-website"). */
const basePath = (env.BASE_URL || "/").replace(/\/+$/, "");

/* ------------------------------------------------------------------ */
/* Social links                                                        */
/* ------------------------------------------------------------------ */

const socialSources: { label: string; env: string | undefined; hosts: string[] }[] = [
  { label: "LinkedIn", env: env.VITE_LINKEDIN_URL, hosts: ["linkedin.com"] },
  { label: "Instagram", env: env.VITE_INSTAGRAM_URL, hosts: ["instagram.com"] },
  { label: "GitHub", env: env.VITE_GITHUB_URL, hosts: ["github.com"] },
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

export const siteConfig = {
  /** Full legal-style trading name used in metadata, policy and emails. */
  name: identity.name,
  /** Short display name for tight spaces. */
  displayName: identity.displayName,
  /** Lowercase wordmark text (rendered as an SVG logo). */
  wordmark: identity.wordmark,
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

  /** Public site URL — empty until configured (VITE_SITE_URL). */
  url: siteUrl,
  /** Base path the site is served under. Empty on a root domain. */
  basePath,
  /**
   * Keep the site out of search engines (noindex + robots disallow), e.g.
   * for the GitHub Pages test deployment. Set VITE_NOINDEX=true.
   */
  noindex: env.VITE_NOINDEX === "true",

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
    email: identity.email,
    /** Set to an empty string to hide the location. */
    location: identity.location,
    address: {
      locality: "Dallas",
      region: "TX",
      country: "US",
    },
    /**
     * Optional scheduling link (Cal.com, Calendly, etc.). When set, a
     * "Book a discovery call" option appears on the contact page.
     */
    bookingUrl: cleanUrl(env.VITE_BOOKING_URL) ? env.VITE_BOOKING_URL!.trim() : "",
    /**
     * Where the contact form POSTs inquiries (VITE_CONTACT_ENDPOINT). A static
     * site can't hold an email API key, so delivery needs a small backend —
     * e.g. server/contact-handler.ts deployed as a serverless function.
     * When empty, the form shows a "not connected" notice and an email
     * fallback, and never submits.
     */
    endpoint: cleanUrl(env.VITE_CONTACT_ENDPOINT) ? env.VITE_CONTACT_ENDPOINT!.trim() : "",
  },

  /**
   * Verified social profiles only. Configure with VITE_LINKEDIN_URL,
   * VITE_INSTAGRAM_URL and VITE_GITHUB_URL — links appear
   * automatically once a valid profile URL is provided.
   */
  social: validSocialLinks(),

  privacy: {
    /**
     * Shown on the privacy page. Set to the actual publication date at
     * launch, and update whenever the policy changes.
     */
    lastUpdated: env.VITE_PRIVACY_LAST_UPDATED || "",
    /**
     * Flip to true once the owner (and ideally a legal professional) has
     * reviewed the policy. Until then, the page shows a review notice.
     */
    reviewed: env.VITE_PRIVACY_REVIEWED === "true",
    /** Hosting provider named in the privacy policy. */
    hostingProvider: env.VITE_HOSTING_PROVIDER || "GitHub Pages, a service of GitHub, Inc.",
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

/** Prefixes a root-relative path with the base path (for non-router URLs such as assets). */
export function assetPath(path: string): string {
  return `${siteConfig.basePath}${path}`;
}
