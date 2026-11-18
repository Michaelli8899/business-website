import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Placeholder wordmark. Replace the mark below with an SVG logo when
 * branding is finalised — the name comes from src/config/site.ts.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <rect x="1" y="1" width="30" height="30" rx="4" fill="currentColor" />
      <path d="M9 22V10h7" stroke="var(--color-canvas)" strokeWidth="2.25" fill="none" />
      <circle cx="21.5" cy="19.5" r="3.25" fill="var(--color-accent-on-dark)" />
    </svg>
  );
}

export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-sm",
        tone === "default" ? "text-ink" : "text-on-night",
        className,
      )}
    >
      <LogoMark className={tone === "inverse" ? "text-night-soft [&_rect]:fill-on-night" : undefined} />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
        {siteConfig.name}
      </span>
      <span className="sr-only">— home</span>
    </Link>
  );
}
