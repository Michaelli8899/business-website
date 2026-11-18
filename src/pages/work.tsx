import { Seo, type SeoProps } from "@/app/head";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectFilter } from "@/components/sections/project-filter";
import { CtaSection } from "@/components/sections/cta-section";

const seo: SeoProps = {
  title: "Work",
  description:
    "Selected website design and development work by Frame & Flow Studio, with case studies covering research, design, build and handover.",
  path: "/work",
};

export default function WorkPage() {
  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="Portfolio"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        title="Selected work."
        description="A closer look at recent work — the problem, the approach, and what was delivered."
      />
      <section aria-label="Projects" className="pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="container-site">
          <ProjectFilter projects={projects} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
