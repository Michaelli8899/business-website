import type { ProcessStep } from "@/data/process";
import { studioProcess } from "@/data/process";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessSteps } from "./process-steps";

export function Process({
  steps = studioProcess,
  eyebrow = "How we work",
  title = "From the first conversation to the final launch.",
  description = "A clear, collaborative process — with regular check-ins and no surprises.",
}: {
  steps?: ProcessStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="process-title" className="section-y on-night bg-night">
      <div className="container-site">
        <SectionHeading id="process-title" tone="inverse" eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-14 md:mt-20">
          <ProcessSteps steps={steps} tone="inverse" />
        </div>
      </div>
    </section>
  );
}
