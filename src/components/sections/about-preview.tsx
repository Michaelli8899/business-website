import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { TextLink } from "@/components/ui/text-link";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="section-y border-t border-line bg-surface">
      <div className="container-site grid-site gap-y-12">
        <Reveal className="col-span-full lg:col-span-5">
          <Eyebrow className="mb-6">The studio</Eyebrow>
          <h2 id="about-preview-title" className="text-headline font-semibold">
            Design-minded. Technology-driven.
          </h2>
        </Reveal>
        <Reveal delay={120} className="col-span-full space-y-6 text-lede text-ink-soft lg:col-span-6 lg:col-start-7">
          <p className="text-ink">
            An independent digital studio working at the intersection of design, technology, and business.
          </p>
          <p>
            Our approach combines thoughtful user experience design with practical implementation, helping
            businesses adopt technology without unnecessary complexity.
          </p>
          <p className="text-base">
            {siteConfig.name} is founder-led: you work directly with the person designing and building your
            solution, from first conversation to launch and beyond.
          </p>
          <div className="pt-2 text-base">
            <TextLink href="/about">Get to know the studio</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
