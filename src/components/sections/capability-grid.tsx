import type { Capability } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";

/** Editorial grid of capability groups with hairline dividers. */
export function CapabilityGrid({ items }: { items: Capability[] }) {
  return (
    <div className="grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
      {items.map((cap, i) => (
        <Reveal
          as="article"
          key={cap.title}
          delay={(i % 3) * 80}
          className="border-t border-line pb-6 pt-8 md:pb-10"
        >
          <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em]">{cap.title}</h3>
          {cap.description && <p className="mt-3 text-ink-soft">{cap.description}</p>}
          {cap.itemsLabel && (
            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">{cap.itemsLabel}</p>
          )}
          <ul className={cap.itemsLabel ? "mt-3 space-y-2" : "mt-6 space-y-2"}>
            {cap.items.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-[0.9375rem]">
                <span aria-hidden="true" className="relative top-[-0.15em] size-1.5 shrink-0 rotate-45 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
