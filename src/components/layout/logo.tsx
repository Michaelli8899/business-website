import { Link } from "@/components/ui/link";
import { siteConfig } from "@/config/site";
import { monogramGlyphs, wordmarkGlyphs, type BrandGlyphs } from "./brand-glyphs";
import { cn } from "@/lib/cn";

/**
 * Frame & Flow brand marks, rendered from outlined Geist SemiBold paths
 * (see scripts/generate-brand.cjs). Colours follow the surrounding tone:
 * charcoal + sage on light backgrounds, ivory + light sage on dark.
 */
function Glyphs({ glyphs, className, title }: { glyphs: BrandGlyphs; className?: string; title?: string }) {
  return (
    <svg
      viewBox={`0 0 ${glyphs.width} ${glyphs.height}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {glyphs.parts.map((p, i) => (
        <path key={i} d={p.d} fill={p.role === "ink" ? "var(--logo-ink)" : "var(--logo-accent)"} />
      ))}
    </svg>
  );
}

const tones = {
  default: "[--logo-ink:var(--color-ink)] [--logo-accent:var(--color-accent)]",
  inverse: "[--logo-ink:var(--color-on-night)] [--logo-accent:var(--color-accent-on-dark)]",
};

export function Wordmark({
  className,
  tone = "default",
  title,
}: {
  className?: string;
  tone?: "default" | "inverse";
  title?: string;
}) {
  return <Glyphs glyphs={wordmarkGlyphs} className={cn("h-6 w-auto", tones[tone], className)} title={title} />;
}

export function Monogram({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  return <Glyphs glyphs={monogramGlyphs} className={cn("h-6 w-auto", tones[tone], className)} />;
}

/** Linked wordmark used in the navigation and footer. */
export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center rounded-sm py-1", className)}
    >
      <Wordmark
        tone={tone}
        className="h-[1.375rem] transition-opacity duration-200 group-hover:opacity-80 md:h-6"
      />
    </Link>
  );
}
