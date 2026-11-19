import { Seo, type SeoProps } from "@/app/head";
import { uxCapabilities } from "@/data/services";
import { uxProcess } from "@/data/process";
import { uxFaqs } from "@/data/faqs";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/sections/page-hero";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { RelatedProjects } from "@/components/sections/related-projects";
import { Process } from "@/components/sections/process";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectImage } from "@/components/visuals/project-image";
import { EngagementBadge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";

const seo: SeoProps = {
  title: "UI/UX Design",
  description:
    "Research-led UI/UX design for apps, websites and digital products — user research, information architecture, prototyping, interface design and design systems.",
  path: "/services/ux-design",
};

const deliverables = [
  "Research findings and prioritized insights",
  "User flows and information architecture",
  "Interactive prototypes",
  "Final interface designs for every key screen",
  "Reusable components and a documented design system",
  "A handoff session for your team or developers",
];

/** Projects whose scope includes UX work. */
const uxWork = projects.filter(
  (p) => p.category === "ux" || p.scope.some((s) => /\bUX\b|information architecture|usability/i.test(s)),
);

export default function UxDesignPage() {
  const featured = uxWork.find((p) => p.category === "ux") ?? uxWork[0];
  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="UI/UX Design"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }, { label: "UI/UX Design" }]}
        title="Interfaces people understand."
        description="We research how people actually use your product, then design clear, accessible experiences and interfaces — tested with real users before anything is built."
        actions={
          <>
            <ButtonLink href="/contact?service=ux-design" size="lg" arrow>
              Discuss your project
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
                  image={featured.image}
                  priority
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.025]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <EngagementBadge engagement={featured.engagement} className="absolute left-4 top-4" />
              </Link>
              <figcaption className="mt-3 text-sm text-ink-soft">
                {featured.title} · {featured.type}
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
            title="From research to a design your team can build."
            description="Design decisions grounded in how people really behave — for new products, redesigns and the screens that matter most."
          />
          <div className="mt-14 md:mt-20">
            <CapabilityGrid items={uxCapabilities} />
          </div>
        </div>
      </section>

      <RelatedProjects
        projects={uxWork}
        title="Recent UI/UX work."
        description="Research, information architecture and interface design on real projects."
      />

      <Process
        steps={uxProcess}
        eyebrow="UI/UX process"
        title="Research first, then design, then prove it."
        description="Every stage includes reviews with you, and the riskiest assumptions get tested with real users."
      />

      <section aria-labelledby="deliverables-title" className="section-y">
        <div className="container-site grid-site gap-y-10">
          <Reveal className="col-span-full lg:col-span-5">
            <Eyebrow className="mb-6">Deliverables</Eyebrow>
            <h2 id="deliverables-title" className="text-headline font-semibold">
              What you receive.
            </h2>
          </Reveal>
          <Reveal delay={100} className="col-span-full lg:col-span-6 lg:col-start-7">
            <p className="text-lede text-ink-soft">
              Everything is organized for the people who will build and maintain the product — and it all belongs to you.
            </p>
            <CheckList items={deliverables} className="mt-8" />
          </Reveal>
        </div>
      </section>

      <FaqSection items={uxFaqs} />

      <CtaSection
        title={
          <>
            Is your product harder
            <br />
            <span className="text-accent-on-dark">to use than it should be?</span>
          </>
        }
        description="Tell us about your product and the people who use it. We'll suggest where research and design can make the biggest difference."
        cta={{ label: "Discuss your project", href: "/contact?service=ux-design" }}
      />
    </>
  );
}
