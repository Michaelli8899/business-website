import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";

/** Hero for interior pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative border-b border-line">
      <div className="container-site pb-16 pt-10 md:pb-24 md:pt-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-12 md:mb-20" />}
        <div className="grid-site items-end gap-y-10">
          <div className={aside ? "col-span-full lg:col-span-7" : "col-span-full lg:col-span-10"}>
            {eyebrow && (
              <Reveal>
                <Eyebrow className="mb-6 md:mb-8">{eyebrow}</Eyebrow>
              </Reveal>
            )}
            <Reveal delay={60}>
              <h1 className="text-headline font-semibold md:text-[clamp(3rem,1.6rem+4.4vw,6rem)] md:leading-[0.96]">
                {title}
              </h1>
            </Reveal>
            {description && (
              <Reveal delay={120}>
                <div className="mt-8 max-w-2xl text-lede text-ink-soft">{description}</div>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={180} className="mt-10 flex flex-col gap-3 sm:flex-row">
                {actions}
              </Reveal>
            )}
          </div>
          {aside && (
            <Reveal delay={160} className="col-span-full lg:col-span-5">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
