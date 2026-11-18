import { Seo, type SeoProps } from "@/app/head";
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
import { ProjectImage } from "@/components/visuals/project-image";
import { EngagementBadge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";

const seo: SeoProps = {
  title: "Website Solutions",
  description:
    "Custom website design, development, deployment and maintenance for small and medium-sized businesses — built to reflect your brand and support your goals.",
  path: "/services/websites",
};

export default function WebsitesPage() {
  const websiteWork = getProjectsByCategory("websites");
  const featured = websiteWork[0];
  // A different screenshot from the work section's cover, to avoid repeating it.
  const heroImage = featured?.caseStudy.gallery.find((g) => g.device !== "mobile")?.image ?? featured?.image;
  return (
    <>
      <Seo {...seo} />
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
          featured && (
            <figure>
              <Link href={`/work/${featured.slug}`} className="group relative block overflow-hidden rounded-lg border border-line">
                <ProjectImage
                  image={heroImage!}
                  priority
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.025]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <EngagementBadge engagement={featured.engagement} className="absolute left-4 top-4" />
              </Link>
              <figcaption className="mt-3 text-sm text-ink-soft">
                {featured.title} — {featured.type.toLowerCase()}
              </figcaption>
            </figure>
          )
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
        projects={websiteWork}
        title="Recent website work."
        description="How the design and build process comes together on a real project."
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
