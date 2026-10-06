import type { Faq } from "@/content/faqs";
import { FaqAccordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function FaqSection({
  id = "faq",
  title = "Questions people ask before they start",
  lead,
  faqs,
  tone = "canvas",
}: {
  id?: string;
  title?: string;
  lead?: string;
  faqs: Faq[];
  tone?: "canvas" | "surface";
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            id={headingId}
            eyebrow="FAQ"
            title={title}
            lead={lead}
          />
          <p className="mt-6 flex items-start gap-2.5 text-sm text-muted">
            <Icon name="mail" className="mt-0.5 size-4 text-primary" />
            Still unsure?{" "}
            <a
              href="/contact"
              className="font-semibold text-primary hover:underline"
            >
              Ask us directly
            </a>
          </p>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </Section>
  );
}
