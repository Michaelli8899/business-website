import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getRelatedProjects, projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ConceptBadge, Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { CheckList } from "@/components/ui/check-list";
import { ProjectVisual } from "@/components/visuals/project-visual";
import { ProjectCard } from "@/components/sections/project-card";
import { CtaSection } from "@/components/sections/cta-section";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    title: `${project.title}${project.isConcept ? " (Concept)" : ""}`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

function Block({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid-site gap-y-6 border-t border-line py-12 md:py-16">
      <Reveal className="col-span-full lg:col-span-4">
        <p className="font-mono text-xs text-accent">{index}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{label}</h2>
      </Reveal>
      <Reveal delay={80} className="col-span-full lg:col-span-7 lg:col-start-6">
        {children}
      </Reveal>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy: cs } = project;
  const related = getRelatedProjects(project.slug, 2);
  const serviceLink = project.category === "websites" ? "/services/websites" : "/services/ai";

  return (
    <>
      <article>
        <header className="border-b border-line">
          <div className="container-site pb-12 pt-10 md:pb-16 md:pt-14">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.title }]}
              className="mb-12 md:mb-20"
            />
            <div className="grid-site items-end gap-y-8">
              <div className="col-span-full lg:col-span-8">
                <Reveal className="mb-6 flex flex-wrap items-center gap-3">
                  {project.isConcept && <ConceptBadge />}
                  <Badge>{project.type}</Badge>
                </Reveal>
                <Reveal delay={60}>
                  <h1 className="text-headline font-semibold md:text-[clamp(3rem,1.6rem+4.4vw,6rem)] md:leading-[0.96]">
                    {project.title}
                  </h1>
                </Reveal>
              </div>
              <Reveal delay={120} className="col-span-full lg:col-span-4">
                <p className="text-lede text-ink-soft">{project.summary}</p>
              </Reveal>
            </div>
          </div>
        </header>

        <div className="container-site pt-10 md:pt-14">
          <Reveal>
            <div className="overflow-hidden rounded-lg">
              <ProjectVisual
                variant={project.visual}
                image={project.image}
                priority
                sizes="(min-width: 1376px) 1280px, 100vw"
                className="aspect-[4/3] md:aspect-[16/9]"
              />
            </div>
          </Reveal>

          {/* 1–2. Overview & type */}
          <dl className="grid grid-cols-2 gap-6 py-12 md:grid-cols-4 md:py-16">
            {[
              ["Project type", project.type],
              ["Category", project.category === "websites" ? "Websites" : "AI & Automation"],
              ["Status", project.isConcept ? "Concept project" : "Client project"],
              ["Scope", project.highlights.slice(0, 2).join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ink pt-4">
                <dt className="font-mono text-eyebrow uppercase text-ink-soft">{k}</dt>
                <dd className="mt-2 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <Block index="01" label="Overview">
            <p className="text-lede text-ink">{cs.overview}</p>
            {project.isConcept && (
              <p className="mt-6 rounded-md border border-line bg-surface p-4 text-sm text-ink-soft">
                This is a self-initiated concept project created to demonstrate the studio&apos;s approach. It does not represent
                a real client, and no results have been measured.
              </p>
            )}
          </Block>

          <Block index="02" label="The business challenge">
            <p className="text-lg leading-relaxed text-ink-soft">{cs.challenge}</p>
          </Block>

          <Block index="03" label={project.category === "ai" ? "Technical approach" : "Design approach"}>
            <div className="space-y-8">
              {cs.approach.map((a) => (
                <div key={a.title}>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{a.title}</h3>
                  <p className="mt-2 text-ink-soft">{a.description}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block index="04" label="Proposed solution">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {cs.solution.map((s) => (
                <div key={s.title} className="border-t border-line pt-5">
                  <h3 className="text-lg font-semibold tracking-[-0.015em]">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-ink-soft">{s.description}</p>
                </div>
              ))}
            </div>
          </Block>
        </div>

        {/* 5. Visuals */}
        <section aria-labelledby="visuals-title" className="mt-12 bg-surface py-16 md:py-24">
          <div className="container-site">
            <Eyebrow className="mb-4">05 — Visuals</Eyebrow>
            <h2 id="visuals-title" className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
              {project.category === "ai" ? "Interfaces & workflow" : "Screens"}
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {cs.gallery.map((g, i) => (
                <Reveal as="figure" key={i} delay={i * 100}>
                  <div className="overflow-hidden rounded-lg border border-line">
                    <ProjectVisual variant={g.variant} view={g.view} />
                  </div>
                  <figcaption className="mt-4 flex gap-3 text-sm text-ink-soft">
                    <span className="font-mono text-accent">Fig. {i + 1}</span>
                    {g.caption}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="container-site pb-8 pt-8">
          <Block index="06" label={project.isConcept ? "Intended business outcomes" : "Business outcomes"}>
            {project.isConcept && (
              <p className="mb-4 text-sm text-ink-soft">
                These describe what the solution is designed to achieve. As a concept project, no outcomes have been measured.
              </p>
            )}
            <CheckList items={cs.intendedOutcomes} />
            {cs.measuredResults && cs.measuredResults.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold">Measured results</h3>
                <CheckList items={cs.measuredResults} className="mt-2" />
              </div>
            )}
          </Block>

          <Block index="07" label="Technology & capabilities">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-eyebrow uppercase text-ink-soft">Technology</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cs.technology.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong px-3 py-1.5 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-eyebrow uppercase text-ink-soft">Capabilities</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cs.capabilities.map((c) => (
                    <li key={c} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent-strong">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-10">
              <Link href={serviceLink} className="font-medium underline decoration-line-strong underline-offset-[6px] hover:text-accent hover:decoration-accent">
                Learn more about {project.category === "websites" ? "Website Solutions" : "AI & Automation"}
              </Link>
            </p>
          </Block>
        </div>
      </article>

      {/* 8. Related */}
      <section aria-labelledby="related-title" className="section-y border-t border-line bg-surface">
        <div className="container-site">
          <Eyebrow className="mb-4">Related projects</Eyebrow>
          <h2 id="related-title" className="text-title font-semibold">More concepts to explore.</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <CtaSection
        title={
          <>
            Have a similar challenge?
            <br />
            <span className="text-accent-on-dark">Let&apos;s talk it through.</span>
          </>
        }
        cta={{
          label: "Start a project inquiry",
          href: project.category === "websites" ? "/contact?service=new-website" : "/contact?service=ai-automation",
        }}
      />
    </>
  );
}
