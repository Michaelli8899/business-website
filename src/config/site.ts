/**
 * Central site configuration.
 *
 * Everything that identifies the studio — name, founder, contact details,
 * social links, booking URL — lives here so branding can be finalised
 * without touching components. Values marked "placeholder" should be
 * replaced before launch.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  /** Placeholder studio name — replace when branding is finalised. */
  name: process.env.NEXT_PUBLIC_STUDIO_NAME || "Studio Name",
  /** Short form used in the wordmark and tight spaces. */
  shortName: process.env.NEXT_PUBLIC_STUDIO_SHORT_NAME || "Studio",
  tagline: "Better websites. Smarter businesses.",
  description:
    "An independent digital studio designing thoughtful websites and practical AI automation for small and medium-sized businesses.",
  /** Positioning line used in the footer. */
  positioning:
    "An independent studio for website design, development and practical business automation.",

  /**
   * Production URL, e.g. https://example.com. Used for canonical URLs,
   * the sitemap and Open Graph metadata. Leave unset during development.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ""),

  founder: {
    name: process.env.NEXT_PUBLIC_FOUNDER_NAME || "Founder Name",
    role: "Founder, Designer & Developer",
    /**
     * Founder biography, one paragraph per entry. Edit freely — keep it
     * honest and avoid referencing confidential employer work.
     */
    bio: [
      "I started the studio to give small and medium-sized businesses direct access to the kind of design and technical thinking usually reserved for larger organisations — without the overhead, hand-offs or jargon.",
      "My background spans human-computer interaction, information systems, product design and product management. More recently I have focused on AI workflow design and integration: figuring out where automation genuinely helps, and building it so people can trust and maintain it.",
      "When you work with the studio, you work with me directly — from the first conversation through design, build, launch and support.",
    ],
    background: [
      "Human-computer interaction",
      "Information systems",
      "Product design",
      "Product management",
      "AI workflow design & integration",
    ],
  },

  contact: {
    /** Placeholder business email. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
    /** Set to an empty string to hide the location. */
    location: "Dallas, Texas",
    /**
     * Optional scheduling link (Cal.com, Calendly, etc.). When set, a
     * "Book a discovery call" option appears on the contact page.
     */
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  },

  /** Social links. Remove entries or leave the array empty to hide them. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ] satisfies SocialLink[],

  /** Year the studio was founded — shown nowhere by default. */
  foundedYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL helper. Returns a relative path when no site URL is set. */
export function absoluteUrl(path = "/"): string {
  if (!siteConfig.url) return path;
  return new URL(path, siteConfig.url).toString();
}
