import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

export function CtaSection({
  title = (
    <>
      Have something in mind?
      <br />
      <span className="text-accent-on-dark">Let&apos;s make it work.</span>
    </>
  ),
  description = "Whether you need a new website, want to simplify a business process, or are exploring what technology can do for your business, we'd love to hear from you.",
  cta = { label: "Start a conversation", href: "/contact" },
}: {
  title?: ReactNode;
  description?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="on-night relative overflow-hidden bg-night">
      <svg aria-hidden="true" viewBox="0 0 800 800" className="pointer-events-none absolute -right-48 -top-40 w-[44rem] opacity-60 md:-right-24">
        <circle cx="400" cy="400" r="399" fill="none" stroke="var(--color-night-line)" />
        <circle cx="400" cy="400" r="300" fill="none" stroke="var(--color-night-line)" />
        <circle cx="400" cy="400" r="200" fill="none" stroke="var(--color-night-line)" />
      </svg>
      <div className="container-site relative py-24 md:py-32 lg:py-40">
        <Reveal>
          <h2 id="cta-title" className="max-w-5xl text-headline font-semibold text-on-night">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-2xl text-lede text-on-night-soft">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={cta.href} variant="inverse" size="lg" arrow>
              {cta.label}
            </ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.contact.email}`} variant="outline-inverse" size="lg">
              Email the studio
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
