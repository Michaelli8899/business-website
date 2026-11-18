import { Seo, type SeoProps } from "@/app/head";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectFilter } from "@/components/sections/project-filter";
import { CtaSection } from "@/components/sections/cta-section";

const seo: SeoProps = {
  title: "Work",
  description:
    "Concept projects exploring how thoughtful design and intelligent technology can solve everyday business challenges.",
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
        description="Exploring how thoughtful design and intelligent technology can solve everyday business challenges."
      />
      <section aria-label="Projects" className="pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="container-site">
          <p className="mb-10 max-w-2xl rounded-md border border-line bg-surface p-4 text-sm text-ink-soft">
            <strong className="font-medium text-ink">A note on concept projects:</strong> projects labelled &ldquo;Concept
            Project&rdquo; are self-initiated demonstrations, not client engagements. Their outcomes describe what each solution is
            designed to achieve rather than measured results.
          </p>
          <ProjectFilter projects={projects} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
