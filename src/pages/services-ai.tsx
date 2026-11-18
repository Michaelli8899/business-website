import { Seo, type SeoProps } from "@/app/head";
import { aiCapabilities, aiOutcomes, aiPrinciples } from "@/data/services";
import { aiProcess } from "@/data/process";
import { aiFaqs } from "@/data/faqs";
import { getProjectsByCategory } from "@/data/projects";
import { PageHero } from "@/components/sections/page-hero";
import { CapabilityGrid } from "@/components/sections/capability-grid";
import { RelatedProjects } from "@/components/sections/related-projects";
import { Process } from "@/components/sections/process";
import { Ownership } from "@/components/sections/ownership";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { WorkflowDemo } from "@/components/sections/workflow-demo";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

const seo: SeoProps = {
  title: "AI & Automation",
  description:
    "Practical AI and workflow automation for small businesses — connecting your tools, reducing repetitive work and keeping people in control.",
  path: "/services/ai",
};

export default function AiPage() {
  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="AI & Automation"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }, { label: "AI & Automation" }]}
        title="Less busywork. More business."
        description="We help small businesses identify repetitive tasks and implement practical AI-powered systems that make everyday operations simpler."
        actions={
          <>
            <ButtonLink href="/contact?service=ai-automation" size="lg" arrow>
              Explore automation opportunities
            </ButtonLink>
            <ButtonLink href="#workflow" size="lg" variant="secondary">
              See an example
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <p className="font-mono text-eyebrow uppercase text-ink-soft">What practical automation looks like</p>
            <ul className="mt-6 divide-y divide-line">
              {aiOutcomes.map((o, i) => (
                <li key={o} className="flex items-center gap-4 py-4 text-lg font-medium tracking-[-0.01em]">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section id="capabilities" aria-labelledby="capabilities-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            title="Useful technology, applied with care."
            description="Every engagement starts with how your business actually works — then we choose the simplest tool that solves the problem."
          />
          <div className="mt-14 md:mt-20">
            <CapabilityGrid items={aiCapabilities} />
          </div>
        </div>
      </section>

      <section id="workflow" aria-labelledby="workflow-title" className="section-y border-t border-line bg-canvas">
        <div className="container-site">
          <SectionHeading
            id="workflow-title"
            eyebrow="Workflow demonstration"
            title="How a single inquiry flows through an automated system."
            description="An illustrative example. Step through it, or let it play — notice that it waits for a person before anything reaches the customer."
          />
          <Reveal className="mt-14 md:mt-20">
            <WorkflowDemo />
          </Reveal>
          <Reveal className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {aiOutcomes.map((o) => (
              <div key={o} className="bg-surface p-6">
                <p className="text-sm text-ink-soft">Intended outcome</p>
                <p className="mt-1 text-lg font-medium tracking-[-0.01em]">{o}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-y on-night bg-night">
        <div className="container-site grid-site gap-y-12">
          <Reveal className="col-span-full lg:col-span-4">
            <Eyebrow tone="inverse" className="mb-6">
              AI design principles
            </Eyebrow>
            <h2 id="principles-title" className="text-headline font-semibold text-on-night">
              Responsible by design.
            </h2>
            <p className="mt-6 max-w-sm text-lede text-on-night-soft">
              AI is a tool, not the point. These principles guide every system we build.
            </p>
          </Reveal>
          <ol className="col-span-full grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {aiPrinciples.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 80} className="border-t border-night-line py-7">
                <span className="font-mono text-xs text-accent-on-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-on-night">{p.title}</h3>
                <p className="mt-2 text-on-night-soft">{p.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <RelatedProjects
        projects={getProjectsByCategory("ai")}
        title="Automation concepts."
        description="Self-initiated concept projects exploring practical AI for everyday business tasks."
      />

      <Process
        steps={aiProcess}
        eyebrow="Automation process"
        title="Start with the work, not the technology."
        description="We map how things happen today before deciding what — if anything — should be automated."
      />

      <Ownership eyebrow="After launch" title="Your workflows, your accounts." />

      <FaqSection items={aiFaqs} />

      <CtaSection
        title={
          <>
            Spending too much time
            <br />
            <span className="text-accent-on-dark">on the same tasks?</span>
          </>
        }
        description="Tell us where your team loses time today. We'll explore whether automation can help — and be honest if it can't."
        cta={{ label: "Explore automation opportunities", href: "/contact?service=ai-automation" }}
      />
    </>
  );
}
