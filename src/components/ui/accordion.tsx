import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

/**
 * FAQ accordion built on native <details>/<summary> — keyboard and
 * screen-reader accessible without client JavaScript.
 */
export function Accordion({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-lg font-medium tracking-[-0.01em] transition-colors hover:text-accent md:text-xl [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,background-color,border-color] duration-300 ease-out-soft group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-canvas"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="max-w-prose pb-7 pr-14 text-ink-soft leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
