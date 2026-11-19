import { Link } from "@/components/ui/link";
import { ArrowRight } from "lucide-react";
import type { ServiceSummary } from "@/data/services";
import { cn } from "@/lib/cn";

/** Large service card. Each service has its own motif and tone. */
export function ServiceCard({ service }: { service: ServiceSummary }) {
  const dark = service.id === "ai";
  const soft = service.id === "ux";
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border p-7 transition-shadow duration-500 hover:shadow-lift md:p-10",
        dark
          ? "on-night border-night bg-night text-on-night"
          : soft
            ? "border-transparent bg-accent-soft text-ink"
            : "border-line bg-surface text-ink",
      )}
    >
      <div className="relative mb-12 aspect-[16/9] md:mb-16" aria-hidden="true">
        {dark ? <SystemsMotif /> : soft ? <FlowMotif /> : <LayoutMotif />}
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <span className={cn("font-mono text-sm", dark ? "text-accent-on-dark" : "text-accent")}>
          {service.index}
        </span>
      </div>
      <h3 className="mt-3 text-title font-semibold">{service.title}</h3>
      <p className={cn("mt-4 max-w-md", dark ? "text-on-night-soft" : "text-ink-soft")}>{service.description}</p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {service.capabilities.map((c) => (
          <li
            key={c}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm",
              dark ? "border-night-line text-on-night" : soft ? "border-accent/25 text-ink" : "border-line text-ink",
            )}
          >
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <Link
          href={service.cta.href}
          className={cn(
            "inline-flex items-center gap-2 font-medium after:absolute after:inset-0 after:content-['']",
            dark ? "text-on-night" : "text-ink",
          )}
        >
          {service.cta.label}
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full transition-transform duration-300 ease-out-soft group-hover:translate-x-1",
              dark ? "bg-on-night text-night" : "bg-ink text-canvas",
            )}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </article>
  );
}

/** Wireframe screens joined into a user flow, for the UI/UX service. */
function FlowMotif() {
  const screens = [
    { x: 8, y: 34 },
    { x: 120, y: 18 },
    { x: 232, y: 34 },
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.25" strokeDasharray="3 5">
        <path d="M88 90 C 104 90, 104 80, 120 80" />
        <path d="M200 80 C 216 80, 216 90, 232 90" />
      </g>
      {screens.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`} className="transition-transform duration-700 ease-out-soft group-hover:-translate-y-1">
          <rect width="80" height="124" rx="10" fill="var(--color-surface)" stroke="var(--color-line-strong)" />
          <rect x="10" y="12" width="34" height="5" rx="2.5" fill="var(--color-accent)" />
          <rect x="10" y="26" width="60" height="30" rx="4" fill={i === 1 ? "var(--color-accent)" : "var(--color-accent-soft)"} opacity={i === 1 ? 0.85 : 1} />
          <rect x="10" y="64" width="52" height="4" rx="2" fill="var(--color-line-strong)" />
          <rect x="10" y="73" width="40" height="4" rx="2" fill="var(--color-line-strong)" />
          <rect x="10" y="98" width="60" height="14" rx="7" fill={i === 2 ? "var(--color-ink)" : "none"} stroke="var(--color-ink)" />
        </g>
      ))}
      <path d="M182 128 l0 22 l6 -6 l5 10 l4 -2 l-5 -10 l8 0 z" fill="var(--color-ink)" stroke="var(--color-surface)" strokeWidth="1.5" />
    </svg>
  );
}

/** Swiss-style layout grid for the website service. */
function LayoutMotif() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <g stroke="var(--color-line)" fill="none">
        {Array.from({ length: 13 }).map((_, i) => (
          <path key={i} d={`M${i * 26.66} 0V180`} />
        ))}
      </g>
      <rect x="0" y="16" width="160" height="10" fill="var(--color-accent)" className="origin-left transition-transform duration-700 ease-out-soft group-hover:scale-x-110" />
      <rect x="0" y="40" width="213" height="22" fill="var(--color-ink)" />
      <rect x="0" y="68" width="133" height="22" fill="var(--color-ink)" />
      <rect x="0" y="106" width="106" height="5" fill="var(--color-line-strong)" />
      <rect x="0" y="117" width="133" height="5" fill="var(--color-line-strong)" />
      <rect x="240" y="40" width="80" height="140" fill="var(--color-accent-soft)" className="transition-transform duration-700 ease-out-soft group-hover:-translate-y-2" />
      <circle cx="280" cy="98" r="24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
      <rect x="0" y="146" width="53" height="18" rx="9" fill="var(--color-ink)" />
    </svg>
  );
}

/** Connected-systems motif for the AI service. */
function SystemsMotif() {
  const nodes: [number, number, string][] = [
    [40, 90, "IN"],
    [130, 40, "AI"],
    [130, 140, "DB"],
    [220, 90, "CRM"],
    [290, 90, "OUT"],
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <g stroke="var(--color-night-line)" fill="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M0 ${i * 25.7}H320`} />
        ))}
      </g>
      <g fill="none" stroke="var(--color-accent-on-dark)" strokeWidth="1.25" strokeDasharray="3 6" className="[&>path]:animate-flow">
        <path d="M40 90 L130 40 L220 90 L290 90" />
        <path d="M40 90 L130 140 L220 90" />
      </g>
      {nodes.map(([x, y, l], i) => (
        <g key={l} transform={`translate(${x} ${y})`}>
          <circle r={i === 1 ? 22 : 17} fill={i === 1 ? "var(--color-accent-on-dark)" : "var(--color-night-soft)"} stroke={i === 1 ? "none" : "var(--color-night-line)"} />
          <text y="3.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.5" fill={i === 1 ? "var(--color-night)" : "var(--color-on-night)"}>
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}
