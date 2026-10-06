import { activeHero } from "@/content/hero";
import { trustStats } from "@/content/stats";
import { hub } from "@/lib/cta";
import { BrandGlow } from "@/components/brand/JourneyArc";
import { ProductPreview } from "@/components/brand/ProductPreview";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Card";

const CAMPAIGN = "home";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <BrandGlow />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-brand bg-primary-tint px-3 py-1.5 text-xs font-semibold text-primary-dark">
              <Icon name="shield" className="size-3.5" />
              {activeHero.eyebrow}
            </p>

            <h1 className="mt-5 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              {activeHero.headline}{" "}
              <span className="text-primary">{activeHero.headlineHighlight}</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              {activeHero.subline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/eligibility"
                size="lg"
                ctaId="hero_primary_ai_score"
                intent="seeker"
                location="hero"
              >
                Get your free AI plan score
                <Icon name="arrowRight" className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={hub.browseExperts(CAMPAIGN, "hero_secondary")}
                external
                size="lg"
                variant="secondary"
                ctaId="hero_secondary_find_expert"
                intent="seeker"
                location="hero"
              >
                Find a verified expert
              </ButtonLink>
            </div>

            <p className="mt-3 text-sm text-muted">
              Free · No account needed · Takes about 2 minutes
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              <Stars rating={4.9} />
              <span className="text-sm text-muted">
                from{" "}
                <strong className="font-semibold text-title">3,100+</strong>{" "}
                reviews
              </span>
              <span className="hidden h-4 w-px bg-line-strong sm:block" />
              <span className="text-sm text-muted">
                <strong className="font-semibold text-title">
                  {trustStats[0].value}
                </strong>{" "}
                verified experts
              </span>
              <span className="hidden h-4 w-px bg-line-strong sm:block" />
              <span className="text-sm text-muted">
                <strong className="font-semibold text-title">
                  {trustStats[1].value}
                </strong>{" "}
                European countries
              </span>
            </div>
          </div>

          <div className="lg:pl-6">
            <ProductPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
