import { BrandGlow } from "@/components/brand/JourneyArc";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export type PageHeroCta = {
  label: string;
  href: string;
  ctaId: string;
  intent?: string;
  variant?: "primary" | "secondary";
};

/** Shared hero for every page except the home page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  primaryCta,
  secondaryCta,
  footnote,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs: Crumb[];
  primaryCta: PageHeroCta;
  secondaryCta?: PageHeroCta;
  footnote?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-canvas py-12 sm:py-16 lg:py-20">
      <BrandGlow />
      <Container>
        <Breadcrumbs crumbs={crumbs} />
        <div
          className={
            aside
              ? "mt-7 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]"
              : "mt-7"
          }
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-brand bg-primary-tint px-3 py-1.5 text-xs font-semibold text-primary-dark">
              <Icon name="shield" className="size-3.5" />
              {eyebrow}
            </p>
            <h1 className="mt-5 text-[2.25rem] leading-[1.1] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={primaryCta.href}
                external={primaryCta.href.startsWith("http")}
                size="lg"
                ctaId={primaryCta.ctaId}
                intent={primaryCta.intent}
                location="page_hero"
              >
                {primaryCta.label}
                <Icon name="arrowRight" className="size-4" />
              </ButtonLink>
              {secondaryCta ? (
                <ButtonLink
                  href={secondaryCta.href}
                  external={secondaryCta.href.startsWith("http")}
                  size="lg"
                  variant="secondary"
                  ctaId={secondaryCta.ctaId}
                  intent={secondaryCta.intent}
                  location="page_hero"
                >
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>

            {footnote ? (
              <p className="mt-3 text-sm text-muted">{footnote}</p>
            ) : null}
          </div>

          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
