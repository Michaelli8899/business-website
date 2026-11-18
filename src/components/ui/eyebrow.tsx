import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label used above section headlines. */
export function Eyebrow({
  children,
  className,
  tone = "default",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverse";
  as?: "p" | "span" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-3 font-mono text-eyebrow font-medium uppercase",
        tone === "default" ? "text-ink-soft" : "text-on-night-soft",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6", tone === "default" ? "bg-accent" : "bg-accent-on-dark")}
      />
      {children}
    </Tag>
  );
}
