import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { engagementLabels, type Engagement } from "@/data/projects";

type Tone = "neutral" | "accent" | "concept" | "inverse";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-surface text-ink-soft",
  accent: "border-transparent bg-accent-soft text-accent-strong",
  concept: "border-ink/15 bg-canvas/90 text-ink backdrop-blur",
  inverse: "border-night-line bg-night-soft text-on-night-soft",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase leading-none tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Label describing how a portfolio project was done (client, academic, concept). */
export function EngagementBadge({ engagement, className }: { engagement: Engagement; className?: string }) {
  return (
    <Badge tone="concept" className={className}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", engagement === "concept" ? "bg-clay" : "bg-accent")} />
      {engagementLabels[engagement]}
    </Badge>
  );
}
