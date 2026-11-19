import { serviceSummaries } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCard } from "./service-card";

export function ServicesOverview() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title="Digital solutions built around your business."
          description="Three disciplines under one roof — research-led design, careful builds and practical automation, designed to work together."
        />
        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {serviceSummaries.map((s, i) => (
            <Reveal key={s.id} delay={i * 120}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
