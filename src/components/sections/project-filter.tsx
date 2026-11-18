import { useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/cn";

type Filter = "all" | ProjectCategory;

/** Filterable project grid for /work. */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {projectCategories.map((c) => {
            const count = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
            const selected = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                  selected
                    ? "border-ink bg-ink text-canvas"
                    : "border-line-strong text-ink hover:border-ink",
                )}
              >
                {c.label}
                <span className={cn("font-mono text-xs", selected ? "text-canvas/70" : "text-ink-soft")}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-ink-soft" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {visible.map((p) => (
          <li key={p.slug} className="animate-fade-in">
            <ProjectCard project={p} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
