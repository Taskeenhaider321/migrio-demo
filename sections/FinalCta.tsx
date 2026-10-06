import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JourneyArc } from "@/components/brand/JourneyArc";

export function FinalCta({
  title,
  lead,
  primary,
  secondary,
  footnote,
}: {
  title: string;
  lead: string;
  primary: { label: string; href: string; ctaId: string; intent: string };
  secondary?: { label: string; href: string; ctaId: string; intent: string };
  footnote?: string;
}) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-primary-dark py-16 sm:py-20"
    >
      <JourneyArc
        className="pointer-events-none absolute inset-x-0 top-6 -z-10 opacity-20"
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="final-cta-heading"
            className="text-3xl text-white sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary-light">
            {lead}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={primary.href}
              external={primary.href.startsWith("http")}
              size="lg"
              variant="inverse"
              ctaId={primary.ctaId}
              intent={primary.intent}
              location="final_cta"
            >
              {primary.label}
              <Icon name="arrowRight" className="size-4" />
            </ButtonLink>
            {secondary ? (
              <ButtonLink
                href={secondary.href}
                external={secondary.href.startsWith("http")}
                size="lg"
                variant="ghost"
                ctaId={secondary.ctaId}
                intent={secondary.intent}
                location="final_cta"
                className="text-white hover:bg-white/10"
              >
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>

          {footnote ? (
            <p className="mt-4 text-sm text-primary-light/80">{footnote}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
