import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/cn";

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="section-y border-t border-line bg-surface">
      <div className="container-site">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Ideas brought to life."
          description="Recent work, from research and information architecture to a careful build and a documented handover."
          aside={
            <div>
              <ButtonLink href="/work" variant="secondary" arrow>
                View all projects
              </ButtonLink>
            </div>
          }
        />
        {projects.length === 1 ? (
          <Reveal className="mt-14 md:mt-20">
            <ProjectCard project={projects[0]} layout="featured" />
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
            {projects.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120} className={cn(i % 2 === 1 && "md:mt-24")}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
