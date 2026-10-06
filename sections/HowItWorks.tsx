import type { Step } from "@/content/steps";
import { JourneyArc } from "@/components/brand/JourneyArc";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function HowItWorks({
  id = "how-it-works",
  eyebrow = "How it works",
  title,
  lead,
  steps,
  cta,
  tone = "surface",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  steps: Step[];
  cta: { label: string; href: string; ctaId: string; intent: string };
  tone?: "canvas" | "surface";
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <SectionHeading
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        align="center"
      />

      <JourneyArc className="mx-auto mt-10 hidden max-w-2xl text-primary lg:block" />

      <ol className="mt-10 grid gap-5 lg:mt-6 lg:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.number}
            className="relative rounded-2xl border border-line bg-canvas p-6 shadow-card"
          >
            <span className="inline-grid size-11 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
              {step.number}
            </span>
            <h3 className="mt-4 text-xl">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              {step.body}
            </p>
            {step.note ? (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success-tint px-2.5 py-1 text-xs font-semibold text-success-ink">
                <Icon name="check" className="size-3" />
                {step.note}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-center">
        <ButtonLink
          href={cta.href}
          external={cta.href.startsWith("http")}
          size="lg"
          ctaId={cta.ctaId}
          intent={cta.intent}
          location={id}
        >
          {cta.label}
          <Icon name="arrowRight" className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}
