import { createMetadata } from "@/lib/metadata";
import { websiteCapabilities } from "@/data/services";
import { websiteProcess } from "@/data/process";
import { websiteFaqs } from "@/data/faqs";
import { getProjectsByCategory } from "@/data/projects";
import { PageHero } from "@/components/sections/page-hero";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { RelatedProjects } from "@/components/sections/related-projects";
import { Process } from "@/components/sections/process";
import { Ownership } from "@/components/sections/ownership";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ProjectVisual } from "@/components/visuals/project-visual";
import { ConceptBadge } from "@/components/ui/badge";

export const metadata = createMetadata({
  title: "Website Solutions",
  description:
    "Custom website design, development, deployment and maintenance for small and medium-sized businesses — built to reflect your brand and support your goals.",
  path: "/services/websites",
});

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Website Solutions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }, { label: "Website Solutions" }]}
        title="Websites built for the way you do business."
        description="From the first design to the final launch, we create thoughtful, reliable websites that reflect your brand and support your business goals."
        actions={
          <>
            <ButtonLink href="/contact?service=new-website" size="lg" arrow>
              Discuss your website
            </ButtonLink>
            <ButtonLink href="#capabilities" size="lg" variant="secondary">
              What&apos;s included
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative overflow-hidden rounded-lg">
            <ProjectVisual variant="fitness" priority sizes="(min-width: 1024px) 40vw, 100vw" />
            <ConceptBadge className="absolute left-4 top-4" />
          </div>
        }
      />

      <section id="capabilities" aria-labelledby="capabilities-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            title="Everything a modern business website needs."
            description="Design, build, launch and long-term care — handled by one studio, so nothing falls between the cracks."
          />
          <div className="mt-14 md:mt-20">
            <CapabilityGrid items={websiteCapabilities} />
          </div>
        </div>
      </section>

      <RelatedProjects
        projects={getProjectsByCategory("websites")}
        title="Website concepts."
        description="Self-initiated concept projects that show the design and build approach in practice."
      />

      <Process
        steps={websiteProcess}
        eyebrow="Website process"
        title="A clear path from idea to launch."
        description="Regular check-ins at every stage, with designs you can review before anything is built."
      />

      <Ownership eyebrow="After launch" title="Supported, or fully yours to run." />

      <FaqSection items={websiteFaqs} />

      <CtaSection
        title={
          <>
            Ready for a website
            <br />
            <span className="text-accent-on-dark">that works as hard as you do?</span>
          </>
        }
        description="Tell us about your business and what you'd like your website to achieve. We'll follow up to arrange a short discovery call."
        cta={{ label: "Discuss your website", href: "/contact?service=new-website" }}
      />
    </>
  );
}
