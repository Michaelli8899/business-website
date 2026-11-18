import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional slot rendered to the right on desktop (e.g. a link). */
  aside?: ReactNode;
  tone?: "default" | "inverse";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

/**
 * Editorial section heading: eyebrow + oversized title on the left,
 * supporting copy offset to the right on large screens.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  tone = "default",
  as: Tag = "h2",
  className,
  id,
}: Props) {
  return (
    <div className={cn("grid-site gap-y-6", className)}>
      <Reveal className="col-span-full lg:col-span-7">
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-6">
            {eyebrow}
          </Eyebrow>
        )}
        <Tag
          id={id}
          className={cn(
            "text-headline font-semibold",
            tone === "default" ? "text-ink" : "text-on-night",
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {(description || aside) && (
        <Reveal
          delay={100}
          className="col-span-full flex flex-col justify-end gap-6 md:col-span-6 lg:col-span-4 lg:col-start-9"
        >
          {description && (
            <div
              className={cn(
                "text-lede",
                tone === "default" ? "text-ink-soft" : "text-on-night-soft",
              )}
            >
              {description}
            </div>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
