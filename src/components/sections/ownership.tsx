import { KeyRound, LifeBuoy, BookOpen } from "lucide-react";
import { maintenanceOptions, ownershipNote } from "@/data/maintenance";
import type { MaintenanceOption as Option } from "@/data/maintenance";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckList } from "@/components/ui/check-list";
import { Reveal } from "@/components/ui/reveal";

export function MaintenanceOptionCard({ option }: { option: Option }) {
  const Icon = option.id === "managed" ? LifeBuoy : BookOpen;
  return (
    <article className="flex h-full flex-col border-t-2 border-ink pt-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-eyebrow uppercase text-ink-soft">{option.label}</p>
        <Icon aria-hidden="true" className="size-5 text-accent" strokeWidth={1.5} />
      </div>
      <h3 className="mt-6 text-title font-semibold">{option.headline}</h3>
      <p className="mt-4 max-w-md text-ink-soft">{option.description}</p>
      <CheckList items={option.capabilities} className="mt-8" />
    </article>
  );
}

export function Ownership({
  eyebrow = "Your business. Your control.",
  title = "Built to be yours.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section aria-labelledby="ownership-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="ownership-title"
          eyebrow={eyebrow}
          title={title}
          description="Every business is different. Whether you want ongoing technical support or the independence to manage everything yourself, we build solutions around the way you prefer to work."
        />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-10 lg:gap-16">
          {maintenanceOptions.map((o, i) => (
            <Reveal key={o.id} delay={i * 120}>
              <MaintenanceOptionCard option={o} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col gap-5 rounded-lg bg-accent-soft p-6 sm:flex-row sm:items-start md:mt-20 md:p-8">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-canvas">
            <KeyRound aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.01em]">Client ownership, in both arrangements.</h3>
            <p className="mt-1.5 max-w-3xl text-ink-soft">{ownershipNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
