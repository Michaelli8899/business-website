import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { HeroVisual } from "@/components/visuals/hero-visual";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-site grid-site items-center gap-y-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:min-h-[calc(100dvh-4.5rem)] lg:pb-20 lg:pt-10">
        <div className="col-span-full lg:col-span-7">
          <Reveal>
            <Eyebrow className="mb-8">Independent Digital Studio</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 id="hero-title" className="text-display font-semibold">
              Better websites.
              <br />
              <span className="text-accent">Smarter</span> businesses.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-lede text-ink-soft md:mt-10">
              We design digital experiences and build intelligent systems that help businesses grow,
              simplify their operations, and focus on what matters.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg" arrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="#services" size="lg" variant="secondary">
              Explore our services
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={200} className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
          <HeroVisual className="h-auto w-full" />
        </Reveal>
      </div>

      <div className="container-site">
        <ul className="grid grid-cols-2 border-t border-line text-sm text-ink-soft md:grid-cols-4">
          {["Design & development", "AI & automation", "Client-owned accounts", "Founder-led, direct communication"].map(
            (item, i) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-line py-5 md:border-b-0 [&:nth-child(odd)]:pr-4 md:[&:not(:first-child)]:pl-6 md:[&:not(:last-child)]:border-r"
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
