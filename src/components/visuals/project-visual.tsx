import type { ReactNode } from "react";
import type { Project, ProjectVisualVariant } from "@/data/projects";
import { cn } from "@/lib/cn";
import { assetPath } from "@/config/site";

/**
 * Illustrated interface mockups for concept projects.
 *
 * Built with HTML + container-query units so they scale crisply with their
 * card and need no image downloads. Swap for real screenshots by adding an
 * `image` to a project in src/data/projects.ts.
 */

type Variant = ProjectVisualVariant | "workflow";

const labels: Record<Variant, string> = {
  fitness: "Illustrated mockup of a fitness studio website showing a class schedule with booking buttons.",
  cafe: "Illustrated mockup of a café website showing opening hours and a digital menu.",
  leads: "Illustrated mockup of a lead review queue with classified inquiries and drafted replies.",
  assistant: "Illustrated mockup of a website customer assistant answering a question with an option to reach a person.",
  workflow: "Diagram of an automated workflow from inquiry to human-approved response.",
};

const surfaces: Record<Variant, string> = {
  fitness: "bg-[#dfe6da]",
  cafe: "bg-clay-soft",
  leads: "bg-night",
  assistant: "bg-[#e9ebe3]",
  workflow: "bg-surface",
};

export function ProjectVisual({
  variant,
  view,
  image,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  variant: Variant;
  view?: string;
  image?: Project["image"];
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (image) {
    return (
      <div className={cn("relative aspect-[4/3] overflow-hidden", className)}>
        <img
          src={assetPath(image.src)}
          alt={image.alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={labels[variant]}
      className={cn("@container relative aspect-[4/3] overflow-hidden", surfaces[variant], className)}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {variant === "fitness" && <FitnessMock view={view} />}
        {variant === "cafe" && <CafeMock view={view} />}
        {variant === "leads" && <LeadsMock />}
        {variant === "assistant" && <AssistantMock />}
        {variant === "workflow" && <WorkflowMock />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Browser({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-[1.4cqw] shadow-[0_3cqw_6cqw_-2cqw_rgb(32_35_31/0.25)]",
        dark ? "bg-night" : "bg-surface",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-[4.5cqw] items-center gap-[0.9cqw] border-b px-[2cqw]",
          dark ? "border-night-line" : "border-line",
        )}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("size-[1cqw] rounded-full", dark ? "bg-night-line" : "bg-line-strong")} />
        ))}
        <span className={cn("ml-auto h-[1.6cqw] w-[24cqw] rounded-full", dark ? "bg-night-soft" : "bg-canvas")} />
      </div>
      {children}
    </div>
  );
}

function FitnessMock({ view }: { view?: string }) {
  const classes = [
    ["06:30", "Strength Foundations", "45 min"],
    ["08:00", "Mobility Flow", "30 min"],
    ["12:15", "Lunchtime HIIT", "30 min"],
    ["17:45", "Barre Sculpt", "50 min"],
  ];

  if (view === "schedule") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <Browser className="inset-x-[6%] top-[8%] bottom-[-4%]">
        <div className="p-[3cqw]">
          <div className="flex items-end justify-between">
            <p className="text-[4cqw] font-semibold tracking-[-0.03em] text-ink">This week</p>
            <div className="flex gap-[1cqw]">
              {["All", "Strength", "Flow"].map((f, i) => (
                <span key={f} className={cn("rounded-full px-[1.6cqw] py-[0.6cqw] text-[1.5cqw]", i === 0 ? "bg-ink text-canvas" : "border border-line text-ink-soft")}>
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[2.5cqw] grid grid-cols-6 gap-[1cqw]">
            {days.map((d, di) => (
              <div key={d} className="space-y-[1cqw]">
                <p className="text-[1.5cqw] font-medium text-ink-soft">{d}</p>
                {[0, 1, 2].map((r) => {
                  const filled = (di + r) % 3 !== 2;
                  return (
                    <div
                      key={r}
                      className={cn(
                        "rounded-[0.8cqw] p-[1cqw]",
                        filled ? (r === 1 && di % 2 ? "bg-accent text-canvas" : "bg-accent-soft") : "border border-dashed border-line",
                      )}
                    >
                      <span className={cn("block h-[0.9cqw] w-[70%] rounded-full", filled ? "bg-current opacity-60" : "bg-transparent")} />
                      <span className={cn("mt-[0.8cqw] block h-[0.9cqw] w-[45%] rounded-full", filled ? "bg-current opacity-30" : "bg-transparent")} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Browser>
    );
  }

  return (
    <>
      <Browser className="left-[6%] top-[9%] w-[64%] bottom-[-6%]" dark>
        <div className="relative p-[3cqw]">
          <p className="font-mono text-[1.4cqw] tracking-[0.15em] text-accent-on-dark">STRENGTH · MOBILITY · FLOW</p>
          <p className="mt-[1.5cqw] text-[6.4cqw] font-semibold leading-[0.92] tracking-[-0.045em] text-on-night">
            Move well.
            <br />
            Feel strong.
          </p>
          <div className="mt-[3cqw] flex gap-[1.2cqw]">
            <span className="rounded-full bg-accent-on-dark px-[2cqw] py-[1cqw] text-[1.6cqw] font-medium text-night">Book a class</span>
            <span className="rounded-full border border-night-line px-[2cqw] py-[1cqw] text-[1.6cqw] text-on-night">Memberships</span>
          </div>
          <div className="mt-[3.5cqw] grid grid-cols-3 gap-[1.2cqw]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-[1cqw] bg-night-soft">
                <div className="h-full w-full rounded-[1cqw] bg-[radial-gradient(circle_at_50%_35%,rgb(180_201_174/0.35),transparent_60%)]" />
              </div>
            ))}
          </div>
        </div>
      </Browser>
      <div className="absolute right-[5%] top-[22%] w-[38%] rounded-[1.6cqw] bg-surface p-[2.2cqw] shadow-[0_3cqw_6cqw_-2cqw_rgb(32_35_31/0.3)]">
        <p className="text-[1.4cqw] font-medium uppercase tracking-[0.12em] text-ink-soft">Today</p>
        <ul className="mt-[1.2cqw] divide-y divide-line">
          {classes.map(([time, name, len]) => (
            <li key={time} className="flex items-center gap-[1.4cqw] py-[1.2cqw]">
              <span className="font-mono text-[1.4cqw] text-ink-soft">{time}</span>
              <span className="flex-1">
                <span className="block text-[1.6cqw] font-medium leading-tight text-ink">{name}</span>
                <span className="block text-[1.3cqw] text-ink-soft">{len}</span>
              </span>
              <span className="rounded-full bg-ink px-[1.4cqw] py-[0.6cqw] text-[1.3cqw] text-canvas">Book</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function CafeMock({ view }: { view?: string }) {
  const menu = [
    ["Espresso", "Single origin, rotating"],
    ["Flat white", "Oat or whole milk"],
    ["Cardamom bun", "Baked each morning · V"],
    ["Seasonal toast", "Sourdough, ricotta · V"],
    ["Iced tea", "House blend · VG"],
  ];

  if (view === "menu") {
    return (
      <Browser className="inset-x-[10%] top-[8%] bottom-[-4%]">
        <div className="px-[5cqw] py-[3.5cqw]">
          <p className="text-center font-mono text-[1.4cqw] tracking-[0.2em] text-clay">MENU</p>
          <p className="mt-[1cqw] text-center font-serif text-[5cqw] italic tracking-[-0.02em] text-ink">Morning &amp; All Day</p>
          <div className="mt-[2cqw] flex justify-center gap-[1cqw]">
            {["Coffee", "Bakery", "Kitchen"].map((t, i) => (
              <span key={t} className={cn("rounded-full px-[1.8cqw] py-[0.6cqw] text-[1.5cqw]", i === 0 ? "bg-[#3b2a1e] text-clay-soft" : "text-ink-soft")}>
                {t}
              </span>
            ))}
          </div>
          <ul className="mt-[2.5cqw] space-y-[1.6cqw]">
            {menu.map(([name, note]) => (
              <li key={name}>
                <div className="flex items-baseline gap-[1cqw]">
                  <span className="text-[2cqw] font-medium text-ink">{name}</span>
                  <span className="flex-1 border-b border-dotted border-line-strong" />
                  <span className="h-[1cqw] w-[4cqw] rounded-full bg-line" />
                </div>
                <p className="text-[1.4cqw] text-ink-soft">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Browser>
    );
  }

  return (
    <>
      <Browser className="left-[6%] top-[9%] w-[66%] bottom-[-6%]">
        <div className="relative h-full bg-[#fbf6ef]">
          <div className="flex items-center justify-between px-[3cqw] py-[2cqw]">
            <span className="font-serif text-[2.4cqw] italic text-[#3b2a1e]">the café</span>
            <span className="flex gap-[2cqw] text-[1.4cqw] text-[#6b5444]">
              <span>Menu</span>
              <span>Visit</span>
              <span>Story</span>
            </span>
          </div>
          <div className="mx-[3cqw] h-[24cqw] overflow-hidden rounded-[1cqw] bg-[#e8d6c2]">
            <svg viewBox="0 0 200 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              <circle cx="150" cy="40" r="36" fill="#d9b48f" />
              <rect x="0" y="70" width="200" height="30" fill="#c99d74" />
              <path d="M40 70 q10 -30 20 0" fill="#8a5a3a" />
              <rect x="62" y="48" width="26" height="22" rx="3" fill="#fbf6ef" />
              <path d="M88 54 q8 0 8 6 q0 6 -8 6" fill="none" stroke="#fbf6ef" strokeWidth="2" />
            </svg>
          </div>
          <p className="px-[3cqw] pt-[2.4cqw] font-serif text-[4.6cqw] leading-[1] tracking-[-0.02em] text-[#3b2a1e]">
            Slow coffee,
            <br />
            <span className="italic">good company.</span>
          </p>
        </div>
      </Browser>
      <div className="absolute right-[5%] top-[30%] w-[34%] rounded-[1.6cqw] bg-[#3b2a1e] p-[2.4cqw] text-clay-soft shadow-[0_3cqw_6cqw_-2cqw_rgb(32_35_31/0.35)]">
        <p className="font-mono text-[1.3cqw] tracking-[0.15em] text-clay">OPEN TODAY</p>
        <p className="mt-[0.8cqw] text-[3cqw] font-semibold tracking-[-0.02em]">7am – 4pm</p>
        <div className="mt-[1.6cqw] space-y-[0.9cqw] border-t border-white/10 pt-[1.6cqw] text-[1.4cqw]">
          <p className="flex justify-between"><span className="opacity-70">Mon – Fri</span><span>7 – 4</span></p>
          <p className="flex justify-between"><span className="opacity-70">Sat – Sun</span><span>8 – 3</span></p>
        </div>
        <span className="mt-[1.8cqw] block rounded-full bg-clay-soft py-[0.9cqw] text-center text-[1.4cqw] font-medium text-[#3b2a1e]">
          Get directions
        </span>
      </div>
    </>
  );
}

function LeadsMock() {
  const rows = [
    { tag: "Quote request", tone: "bg-accent-on-dark text-night", status: "Draft ready", active: true },
    { tag: "Service question", tone: "bg-clay-soft text-[#3b2a1e]", status: "Draft ready" },
    { tag: "Partnership", tone: "bg-on-night-soft/30 text-on-night", status: "Needs review" },
    { tag: "Quote request", tone: "bg-accent-on-dark text-night", status: "Synced to CRM" },
  ];
  return (
    <>
      <div className="absolute left-[6%] top-[9%] bottom-[-6%] w-[50%] rounded-[1.4cqw] border border-night-line bg-night-soft p-[2.4cqw]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[1.4cqw] tracking-[0.15em] text-on-night-soft">INQUIRIES</p>
          <span className="flex items-center gap-[0.6cqw] text-[1.3cqw] text-accent-on-dark">
            <span className="size-[0.9cqw] animate-pulse-soft rounded-full bg-accent-on-dark" /> Live
          </span>
        </div>
        <ul className="mt-[1.8cqw] space-y-[1.2cqw]">
          {rows.map((r, i) => (
            <li
              key={i}
              className={cn(
                "rounded-[1cqw] border p-[1.6cqw]",
                r.active ? "border-accent-on-dark/60 bg-night" : "border-night-line",
              )}
            >
              <div className="flex items-center justify-between gap-[1cqw]">
                <span className={cn("rounded-full px-[1.2cqw] py-[0.4cqw] text-[1.2cqw] font-medium", r.tone)}>{r.tag}</span>
                <span className="text-[1.2cqw] text-on-night-soft">{r.status}</span>
              </div>
              <span className="mt-[1.2cqw] block h-[1cqw] w-[70%] rounded-full bg-on-night/70" />
              <span className="mt-[0.8cqw] block h-[0.8cqw] w-[50%] rounded-full bg-on-night-soft/40" />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute right-[5%] top-[16%] w-[39%] rounded-[1.4cqw] bg-surface p-[2.4cqw] shadow-[0_3cqw_6cqw_-2cqw_rgb(0_0_0/0.5)]">
        <p className="font-mono text-[1.3cqw] tracking-[0.15em] text-ink-soft">EXTRACTED</p>
        <dl className="mt-[1.4cqw] space-y-[1cqw] text-[1.4cqw]">
          {[
            ["Name", "w-[50%]"],
            ["Company", "w-[60%]"],
            ["Service", "w-[44%]"],
            ["Timeline", "w-[36%]"],
          ].map(([k, w]) => (
            <div key={k} className="flex items-center gap-[1.4cqw]">
              <dt className="w-[11cqw] shrink-0 text-ink-soft">{k}</dt>
              <dd className={cn("h-[1cqw] rounded-full bg-ink/80", w)} />
            </div>
          ))}
        </dl>
        <div className="mt-[2cqw] rounded-[1cqw] bg-canvas p-[1.6cqw]">
          <p className="text-[1.3cqw] font-medium text-ink">Drafted reply</p>
          {[90, 80, 62].map((w) => (
            <span key={w} className="mt-[0.9cqw] block h-[0.8cqw] rounded-full bg-line-strong" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-[1.6cqw] flex gap-[1cqw]">
          <span className="flex-1 rounded-full bg-ink py-[0.9cqw] text-center text-[1.3cqw] text-canvas">Approve &amp; send</span>
          <span className="rounded-full border border-line px-[1.6cqw] py-[0.9cqw] text-[1.3cqw] text-ink">Edit</span>
        </div>
      </div>
    </>
  );
}

function AssistantMock() {
  return (
    <>
      <Browser className="left-[6%] top-[9%] w-[58%] bottom-[-6%]">
        <div className="space-y-[1.4cqw] p-[3cqw]">
          <span className="block h-[1.2cqw] w-[20%] rounded-full bg-accent" />
          <span className="block h-[3cqw] w-[80%] rounded-[0.5cqw] bg-ink" />
          <span className="block h-[3cqw] w-[55%] rounded-[0.5cqw] bg-ink" />
          <span className="block h-[1cqw] w-[70%] rounded-full bg-line-strong" />
          <span className="block h-[1cqw] w-[60%] rounded-full bg-line-strong" />
          <div className="grid grid-cols-2 gap-[1.4cqw] pt-[1.6cqw]">
            <span className="aspect-[4/3] rounded-[1cqw] bg-accent-soft" />
            <span className="aspect-[4/3] rounded-[1cqw] bg-canvas" />
          </div>
        </div>
      </Browser>
      <div className="absolute right-[5%] top-[12%] bottom-[8%] flex w-[42%] flex-col overflow-hidden rounded-[1.8cqw] bg-surface shadow-[0_3cqw_6cqw_-2cqw_rgb(32_35_31/0.35)]">
        <div className="flex items-center gap-[1.2cqw] bg-ink px-[2cqw] py-[1.6cqw]">
          <span className="grid size-[3.4cqw] place-items-center rounded-full bg-accent-on-dark text-[1.5cqw] font-semibold text-night">?</span>
          <span>
            <span className="block text-[1.5cqw] font-medium text-on-night">Help &amp; questions</span>
            <span className="block text-[1.2cqw] text-on-night-soft">Answers from our help centre</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-[1.2cqw] p-[2cqw] text-[1.4cqw] leading-snug">
          <p className="max-w-[80%] self-end rounded-[1.4cqw] rounded-br-[0.3cqw] bg-accent px-[1.6cqw] py-[1.1cqw] text-canvas">
            Do you offer weekend appointments?
          </p>
          <p className="max-w-[88%] rounded-[1.4cqw] rounded-bl-[0.3cqw] bg-canvas px-[1.6cqw] py-[1.1cqw] text-ink">
            Yes — Saturday mornings are available. You can book directly or I can connect you with the team.
          </p>
          <div className="flex flex-wrap gap-[0.8cqw]">
            <span className="rounded-full border border-line px-[1.4cqw] py-[0.6cqw] text-[1.25cqw] text-ink">Book a time</span>
            <span className="rounded-full border border-accent px-[1.4cqw] py-[0.6cqw] text-[1.25cqw] text-accent-strong">Talk to a person</span>
          </div>
        </div>
        <div className="mx-[2cqw] mb-[2cqw] flex items-center rounded-full border border-line px-[1.6cqw] py-[1cqw]">
          <span className="h-[0.9cqw] w-[40%] rounded-full bg-line" />
          <span className="ml-auto size-[2.4cqw] rounded-full bg-ink" />
        </div>
      </div>
    </>
  );
}

function WorkflowMock() {
  const steps = ["Inquiry", "Capture", "Classify", "CRM", "Draft", "Review", "Reply"];
  return (
    <div className="flex h-full flex-col justify-center bg-blueprint px-[5%]">
      <div className="relative grid grid-cols-7 items-center gap-[1.2cqw]">
        <span className="absolute inset-x-[7%] top-1/2 h-px -translate-y-1/2 border-t border-dashed border-accent" />
        {steps.map((s, i) => (
          <div key={s} className="relative flex flex-col items-center gap-[1.4cqw]">
            <span
              className={cn(
                "grid size-[8cqw] place-items-center rounded-full border font-mono text-[1.8cqw]",
                i === 5
                  ? "border-transparent bg-clay text-surface"
                  : i === 2 || i === 4
                    ? "border-transparent bg-ink text-on-night"
                    : "border-line-strong bg-surface text-ink",
              )}
            >
              0{i + 1}
            </span>
            <span className="text-[1.6cqw] font-medium text-ink">{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-[6cqw] flex justify-center gap-[3cqw] text-[1.4cqw] text-ink-soft">
        <span className="flex items-center gap-[0.8cqw]"><span className="size-[1.4cqw] rounded-full bg-ink" /> AI-assisted</span>
        <span className="flex items-center gap-[0.8cqw]"><span className="size-[1.4cqw] rounded-full bg-clay" /> Human review</span>
        <span className="flex items-center gap-[0.8cqw]"><span className="size-[1.4cqw] rounded-full border border-line-strong bg-surface" /> Automated</span>
      </div>
    </div>
  );
}
