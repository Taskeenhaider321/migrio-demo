import type { Faq } from "@/content/faqs";
import { Icon } from "./Icon";

/**
 * Native <details>/<summary>: keyboard accessible, screen-reader friendly,
 * and works with JavaScript disabled — so the answers are always crawlable.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-canvas">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-base font-semibold text-title hover:text-primary">
            {faq.question}
            <Icon
              name="chevronDown"
              className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:-rotate-180"
            />
          </summary>
          <p className="pb-5 pr-10 text-[0.9375rem] leading-relaxed text-muted">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
