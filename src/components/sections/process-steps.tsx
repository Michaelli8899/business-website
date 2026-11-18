import type { ProcessStep } from "@/data/process";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Horizontal steps on desktop, vertical timeline on mobile. */
export function ProcessSteps({ steps, tone = "default" }: { steps: ProcessStep[]; tone?: "default" | "inverse" }) {
  const inverse = tone === "inverse";
  return (
    <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.number}
          delay={i * 100}
          className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
        >
          {/* Mobile timeline rail */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 left-5 top-12 w-px lg:hidden",
              i === steps.length - 1 && "hidden",
              inverse ? "bg-night-line" : "bg-line",
            )}
          />
          <span
            className={cn(
              "relative z-10 grid size-10 place-items-center rounded-full border font-mono text-sm lg:mb-8",
              inverse ? "border-night-line bg-night text-accent-on-dark" : "border-line-strong bg-canvas text-accent",
            )}
          >
            {step.number}
          </span>
          {/* Desktop rail */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-14 right-0 top-5 hidden h-px lg:block",
              i === steps.length - 1 && "lg:hidden",
              inverse ? "bg-night-line" : "bg-line-strong",
            )}
          />
          <div className="pt-1.5 lg:pt-0">
            <h3 className={cn("text-2xl font-semibold tracking-[-0.025em]", inverse ? "text-on-night" : "text-ink")}>
              {step.title}
            </h3>
            <p className={cn("mt-3 max-w-xs", inverse ? "text-on-night-soft" : "text-ink-soft")}>{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
