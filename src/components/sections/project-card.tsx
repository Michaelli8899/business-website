import { Link } from "@/components/ui/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/visuals/project-visual";
import { ConceptBadge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  headingLevel: H = "h3",
  className,
  size = "default",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  className?: string;
  size?: "default" | "large";
}) {
  return (
    <article className={cn("group relative", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <ProjectVisual
          variant={project.visual}
          image={project.image}
          className="transition-transform duration-700 ease-out-soft group-hover:scale-[1.025]"
          sizes={size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
        />
        {project.isConcept && <ConceptBadge className="absolute left-4 top-4" />}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 grid size-10 translate-y-1 place-items-center rounded-full bg-canvas text-ink opacity-0 transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-2 md:mt-6">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">{project.type}</p>
        <H className="text-2xl font-semibold tracking-[-0.025em]">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none group-focus-within:underline group-focus-within:underline-offset-4"
          >
            {project.title}
          </Link>
        </H>
        <p className="max-w-lg text-ink-soft">{project.summary}</p>
      </div>
    </article>
  );
}
