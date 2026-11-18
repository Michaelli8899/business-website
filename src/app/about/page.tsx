import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { clientExpectations, studioPrinciples } from "@/data/about";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} is an independent, founder-led digital studio combining thoughtful design with practical technology.`,
  path: "/about",
});

export default function AboutPage() {
  const { founder } = siteConfig;
  const initials = founder.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow="About the studio"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="Good design. Useful technology."
        description={`${siteConfig.name} is an independent, founder-led digital studio helping small and medium-sized businesses build better websites and smarter ways of working.`}
      />

      {/* Studio introduction */}
      <section aria-labelledby="intro-title" className="section-y">
        <div className="container-site grid-site gap-y-10">
          <Reveal className="col-span-full lg:col-span-4">
            <Eyebrow>The studio</Eyebrow>
            <h2 id="intro-title" className="sr-only">
              Studio introduction
            </h2>
          </Reveal>
          <Reveal delay={80} className="col-span-full space-y-6 lg:col-span-7 lg:col-start-6">
            <p className="text-title font-medium text-ink">
              A small, deliberate studio at the intersection of design, technology and business.
            </p>
            <p className="text-lede text-ink-soft">
              Many businesses know their website could do more, or that hours disappear into repetitive admin — but they
              don&apos;t want to hire an agency with layers of account managers, or adopt technology they can&apos;t
              understand.
            </p>
            <p className="text-lede text-ink-soft">
              The studio exists to bridge that gap: thoughtful user experience design paired with practical implementation,
              delivered personally, and handed over in a way you can own.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section aria-labelledby="founder-title" className="section-y border-t border-line bg-surface">
        <div className="container-site grid-site gap-y-12">
          <Reveal className="col-span-full md:col-span-4 lg:col-span-4">
            {/* Replace with a real portrait: <Image src="/founder.jpg" ... /> */}
            <div
              role="img"
              aria-label={`Portrait placeholder for ${founder.name}`}
              className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-lg bg-accent-soft bg-blueprint"
            >
              <span className="text-[clamp(4rem,10vw,7rem)] font-semibold tracking-[-0.05em] text-accent">{initials}</span>
              <span className="absolute bottom-4 left-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-strong">
                Portrait placeholder
              </span>
            </div>
          </Reveal>
          <Reveal delay={80} className="col-span-full md:col-span-4 lg:col-span-7 lg:col-start-6">
            <Eyebrow className="mb-6">Founder</Eyebrow>
            <h2 id="founder-title" className="text-title font-semibold">
              {founder.name}
            </h2>
            <p className="mt-2 text-ink-soft">{founder.role}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {founder.bio.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-10 font-mono text-eyebrow uppercase text-ink-soft">Background</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {founder.background.map((b) => (
                <li key={b} className="rounded-full border border-line-strong px-3 py-1.5 text-sm">
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Philosophy & approach */}
      <section aria-labelledby="philosophy-title" className="section-y">
        <div className="container-site">
          <h2 id="philosophy-title" className="sr-only">
            Design philosophy and approach to technology
          </h2>
          <div className="grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
            <Reveal className="border-t-2 border-ink pt-8">
              <Eyebrow className="mb-6">Design philosophy</Eyebrow>
              <h3 className="text-title font-semibold">Clarity over decoration.</h3>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Good design makes it easy for people to understand who you are, what you offer and what to do next. The work
                is grounded in research and user experience principles, expressed through considered typography, generous
                space and details that feel intentional.
              </p>
            </Reveal>
            <Reveal delay={100} className="border-t-2 border-ink pt-8">
              <Eyebrow className="mb-6">Approach to technology</Eyebrow>
              <h3 className="text-title font-semibold">Proportionate, not flashy.</h3>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Technology should earn its place. That means choosing established, well-supported tools, introducing AI where
                it removes real friction, keeping people in control of important decisions — and documenting everything so it
                remains yours to understand.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section aria-labelledby="expect-title" className="section-y on-night bg-night">
        <div className="container-site">
          <SectionHeading
            id="expect-title"
            tone="inverse"
            eyebrow="Working together"
            title="What you can expect."
            description="An independent studio means a direct line to the work — and a commitment to doing it properly."
          />
          <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
            {clientExpectations.map((e, i) => (
              <Reveal as="li" key={e.title} delay={(i % 3) * 80} className="border-t border-night-line py-7">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-on-night">{e.title}</h3>
                <p className="mt-2 text-on-night-soft">{e.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="principles-title" eyebrow="Core principles" title="Six principles behind every project." />
          <ol className="mt-14 border-t border-line md:mt-20">
            {studioPrinciples.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                className="grid-site items-baseline gap-y-2 border-b border-line py-8 md:py-10"
              >
                <span className="col-span-1 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="col-span-3 text-2xl font-semibold tracking-[-0.025em] md:col-span-4 md:text-3xl lg:col-span-5">
                  {p.title}
                </h3>
                <p className="col-span-full text-ink-soft md:col-span-3 md:col-start-6 lg:col-span-5 lg:col-start-8">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Let&apos;s see if we&apos;re
            <br />
            <span className="text-accent-on-dark">a good fit.</span>
          </>
        }
        description="A short, no-pressure conversation about your business and what you'd like to achieve."
      />
    </>
  );
}
