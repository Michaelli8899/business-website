import { Link } from "@/components/ui/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/visuals/project-image";
import { EngagementBadge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

/**
 * Portfolio card. "stacked" suits grids; "featured" places the image and
 * text side by side on large screens for a single highlighted project.
 */
export function ProjectCard({
  project,
  headingLevel: H = "h3",
  className,
  layout = "stacked",
  priority = false,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  className?: string;
  layout?: "stacked" | "featured";
  priority?: boolean;
}) {
  const featured = layout === "featured";
  return (
    <article className={cn("group relative", featured && "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12", className)}>
      <div className={cn("relative overflow-hidden rounded-lg border border-line", featured && "lg:col-span-7")}>
        <ProjectImage
          image={project.image}
          priority={priority}
          className="aspect-[16/10]"
          imgClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.025]"
          sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
        />
        <EngagementBadge engagement={project.engagement} className="absolute left-4 top-4" />
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 grid size-10 translate-y-1 place-items-center rounded-full bg-canvas text-ink opacity-0 transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className={cn("flex flex-col gap-2", featured ? "lg:col-span-5" : "mt-5 md:mt-6")}>
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">{project.type}</p>
        <H className={cn("font-semibold tracking-[-0.025em]", featured ? "text-title" : "text-2xl")}>
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none group-focus-within:underline group-focus-within:underline-offset-4"
          >
            {project.title}
          </Link>
        </H>
        <p className={cn("text-ink-soft", featured ? "mt-2 text-lg" : "max-w-lg")}>{project.summary}</p>
        {featured && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.scope.map((s) => (
              <li key={s} className="rounded-full border border-line-strong px-3 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
        )}
        {featured && (
          <span className="mt-6 inline-flex items-center gap-2 font-medium text-ink">
            Read the case study
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </article>
  );
}
