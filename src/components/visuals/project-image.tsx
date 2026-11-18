import type { ProjectImage as ProjectImageData } from "@/data/projects";
import { assetPath } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Project screenshot. Width/height are set from the data so the browser can
 * reserve space (no layout shift); images below the fold load lazily.
 * Screenshots are anchored to the top so the header stays visible when
 * cropped to the card's aspect ratio.
 */
export function ProjectImage({
  image,
  className,
  imgClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image: ProjectImageData;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-accent-soft", className)}>
      <img
        src={assetPath(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        style={image.focus ? { objectPosition: image.focus } : undefined}
        className={cn("h-full w-full object-cover object-top", imgClassName)}
      />
    </div>
  );
}
