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
          description="Two disciplines under one roof — so your website and the systems behind it are designed to work together."
        />
        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-2 lg:gap-8">
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
