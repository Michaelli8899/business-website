import type { Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";

export function RelatedProjects({
  projects,
  eyebrow = "Concept projects",
  title,
  description,
}: {
  projects: Project[];
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="related-title" className="section-y border-t border-line bg-surface">
      <div className="container-site">
        <SectionHeading
          id="related-title"
          eyebrow={eyebrow}
          title={title}
          description={description}
          aside={
            <div>
              <ButtonLink href="/work" variant="secondary" arrow>
                View all projects
              </ButtonLink>
            </div>
          }
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
