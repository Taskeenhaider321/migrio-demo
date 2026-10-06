import { featuredExperts } from "@/content/experts";
import { hub } from "@/lib/cta";
import { ctaTracking } from "@/lib/analytics";
import { Badge, VerifiedBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Avatar, Stars } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function FeaturedExperts({ campaign = "home" }: { campaign?: string }) {
  return (
    <Section
      id="featured-experts"
      tone="surface"
      aria-labelledby="featured-experts-heading"
    >
      <SectionHeading
        id="featured-experts-heading"
        eyebrow="Verified experts"
        title="Every profile here passed a manual check"
        lead="Companies register as Experts, individuals as Advisors. Both go through the same verification before they can take a single order."
        align="center"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredExperts.map((expert) => (
          <li key={expert.slug}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-canvas p-6 shadow-card transition-shadow hover:shadow-lift">
              <div className="flex items-start gap-3.5">
                <Avatar initials={expert.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-base font-semibold text-title">
                      {expert.name}
                    </h3>
                    <Badge tone="neutral">{expert.kind}</Badge>
                  </div>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted">
                    <Icon name="pin" className="size-3.5" />
                    {expert.country}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                {expert.headline}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {expert.specialisms.map((specialism) => (
                  <li key={specialism}>
                    <Badge tone="brand">{specialism}</Badge>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
                <Stars rating={expert.rating} reviews={expert.reviews} />
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Icon name="clock" className="size-4" />
                  {expert.responseTime}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <VerifiedBadge label="Verified" />
                <a
                  href={hub.expertProfile(
                    expert.slug,
                    campaign,
                    `expert_card_${expert.slug}`,
                  )}
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  {...ctaTracking({
                    ctaId: "expert_card_view_profile",
                    intent: "seeker",
                    location: "featured_experts",
                    destination: "hub",
                  })}
                >
                  View profile
                  <Icon name="arrowRight" className="size-3.5" />
                  <span className="sr-only">for {expert.name}</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-3">
        <ButtonLink
          href={hub.browseExperts(campaign, "featured_experts")}
          external
          size="lg"
          ctaId="featured_experts_browse_all"
          intent="seeker"
          location="featured_experts"
        >
          Browse all verified experts
          <Icon name="arrowRight" className="size-4" />
        </ButtonLink>
        <p className="text-sm text-muted">
          Free to browse · Free to chat · Free first consultation
        </p>
      </div>
    </Section>
  );
}
