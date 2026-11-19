import type { ReactNode } from "react";
import { useParams } from "react-router";
import { Link } from "@/components/ui/link";
import { engagementLabels, getProject } from "@/data/projects";
import { Seo } from "@/app/head";
import { cn } from "@/lib/cn";
import { assetPath } from "@/config/site";
import NotFoundPage from "./not-found";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EngagementBadge, Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { CheckList } from "@/components/ui/check-list";
import { ProjectImage } from "@/components/visuals/project-image";
import { ArrowUpRight } from "lucide-react";
import { CtaSection } from "@/components/sections/cta-section";

function Block({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
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

export default function CaseStudyPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;

  const { caseStudy: cs } = project;
  const service = {
    ux: { href: "/services/ux-design", label: "UI/UX Design", inquiry: "ux-design" },
    websites: { href: "/services/websites", label: "Website Solutions", inquiry: "new-website" },
    ai: { href: "/services/ai", label: "AI & Automation", inquiry: "ai-automation" },
  }[project.category];
  const isConcept = project.engagement === "concept";
  const measured = cs.measuredResults && cs.measuredResults.length > 0;

  return (
    <>
      <Seo
        title={`${project.title}${isConcept ? " (Concept)" : ""}`}
        description={project.summary}
        path={`/work/${project.slug}`}
      />
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
                  <EngagementBadge engagement={project.engagement} />
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
                {(project.liveUrl || project.sourceUrl) && (
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    {[
                      project.liveUrl && { href: project.liveUrl, label: "Visit the live site" },
                      project.sourceUrl && { href: project.sourceUrl, label: "Full case study on michaelmli.com" },
                    ]
                      .filter((l): l is { href: string; label: string } => Boolean(l))
                      .map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 font-medium underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {l.label}
                          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ))}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </header>

        <div className="container-site pt-10 md:pt-14">
          <Reveal>
            <ProjectImage
              image={project.image}
              priority
              sizes="(min-width: 1376px) 1280px, 100vw"
              className="aspect-[16/10] rounded-lg border border-line"
            />
          </Reveal>

          {/* 1–2. Overview & type */}
          <dl className="grid grid-cols-2 gap-6 py-12 md:grid-cols-4 md:py-16">
            {(
              [
                ["Engagement", engagementLabels[project.engagement]],
                project.role ? ["Role", project.role] : ["Project type", project.type],
                project.team ? ["Team", project.team] : null,
                project.timeline ? ["Timeline", project.timeline] : null,
                !project.team && !project.timeline ? ["Scope", project.scope.join(" · ")] : null,
              ].filter(Boolean) as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="border-t border-ink pt-4">
                <dt className="font-mono text-eyebrow uppercase text-ink-soft">{k}</dt>
                <dd className="mt-2 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <Block index="01" label="Overview">
            <p className="text-lede text-ink">{cs.overview}</p>
            {project.note && (
              <p className="mt-6 rounded-md border border-line bg-surface p-4 text-sm text-ink-soft">{project.note}</p>
            )}
            {isConcept && (
              <p className="mt-6 rounded-md border border-line bg-surface p-4 text-sm text-ink-soft">
                This is a self-initiated concept project created to demonstrate the studio&apos;s approach. It does not represent
                a real client, and no results have been measured.
              </p>
            )}
          </Block>

          <Block index="02" label="The challenge">
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

          <Block index="04" label={isConcept ? "Proposed solution" : "The solution"}>
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
              {project.category === "websites" ? "Screens" : "Design & process"}
            </h2>
            <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
              {cs.gallery.map((g, i) => (
                <Reveal
                  as="figure"
                  key={i}
                  delay={(i % 2) * 100}
                  // Only large, very wide images (e.g. flows) span both columns; small
                  // screenshots stay in one column so they aren't upscaled.
                  className={cn(g.device !== "mobile" && g.image.width >= 1400 && g.image.width / g.image.height > 2 && "md:col-span-2")}
                >
                  {g.device === "mobile" ? (
                    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-line bg-canvas bg-blueprint py-6">
                      <img
                        src={assetPath(g.image.src)}
                        alt={g.image.alt}
                        width={g.image.width}
                        height={g.image.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-auto rounded-xl border border-line shadow-soft"
                      />
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-line bg-surface">
                      <img
                        src={assetPath(g.image.src)}
                        alt={g.image.alt}
                        width={g.image.width}
                        height={g.image.height}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full"
                      />
                    </div>
                  )}
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
          <Block index="06" label={isConcept ? "Intended outcomes" : measured ? "Goals & results" : "Project goals"}>
            {!measured && (
              <p className="mb-4 text-sm text-ink-soft">
                {isConcept
                  ? "These describe what the solution is designed to achieve. As a concept project, no outcomes have been measured."
                  : "These are the goals the work was designed around. No performance metrics were measured for this project."}
              </p>
            )}
            <CheckList items={cs.goals} />
            {measured && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold">Measured results</h3>
                <CheckList items={cs.measuredResults!} className="mt-2" />
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
              <Link href={service.href} className="font-medium underline decoration-line-strong underline-offset-[6px] hover:text-accent hover:decoration-accent">
                Learn more about {service.label}
              </Link>
            </p>
          </Block>
        </div>
      </article>

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
          href: `/contact?service=${service.inquiry}`,
        }}
      />
    </>
  );
}
