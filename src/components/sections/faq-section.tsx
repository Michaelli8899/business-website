import type { Faq } from "@/data/faqs";
import { Accordion } from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { TextLink } from "@/components/ui/text-link";

export function FaqSection({ items, title = "Questions, answered." }: { items: Faq[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="section-y">
      <div className="container-site grid-site gap-y-12">
        <Reveal className="col-span-full lg:col-span-4">
          <Eyebrow className="mb-6">FAQ</Eyebrow>
          <h2 id="faq-title" className="text-title font-semibold md:text-[clamp(2rem,1.4rem+2vw,3rem)]">
            {title}
          </h2>
          <p className="mt-5 max-w-sm text-ink-soft">
            Have a question that isn&apos;t covered here?{" "}
          </p>
          <div className="mt-3">
            <TextLink href="/contact">Ask directly</TextLink>
          </div>
        </Reveal>
        <Reveal delay={100} className="col-span-full lg:col-span-7 lg:col-start-6">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
