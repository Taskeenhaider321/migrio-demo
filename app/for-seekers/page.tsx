import { expertiseCategories } from "@/content/experts";
import { seekerFaqs } from "@/content/faqs";
import { countries } from "@/content/stats";
import { seekerSteps } from "@/content/steps";
import { seekerTestimonials } from "@/content/testimonials";
import { hub } from "@/lib/cta";
import { ctaTracking } from "@/lib/analytics";
import { createMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductPreview } from "@/components/brand/ProductPreview";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

import { FaqSection } from "@/sections/FaqSection";
import { FeaturedExperts } from "@/sections/FeaturedExperts";
import { FeatureGrid, type Feature } from "@/sections/FeatureGrid";
import { FinalCta } from "@/sections/FinalCta";
import { HowItWorks } from "@/sections/HowItWorks";
import { PageHero } from "@/sections/PageHero";
import { Testimonials } from "@/sections/Testimonials";
import { TrustBar } from "@/sections/TrustBar";

const CAMPAIGN = "for_seekers";
const PATH = "/for-seekers";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "For seekers", path: PATH },
];

const features: Feature[] = [
  {
    icon: "sparkles",
    title: "A free AI score on your plan",
    body: "Two minutes, no account. See which European routes fit you and the single weakest point in your plan.",
  },
  {
    icon: "search",
    title: "Profiles you can actually judge",
    body: "Expertise, countries, routes, response times and real reviews — all on one screen, all from verified experts.",
  },
  {
    icon: "chat",
    title: "Free chat, free first consultation",
    body: "Message as many experts as you like and book a free call before you spend anything.",
  },
  {
    icon: "file",
    title: "Invite an expert to review your plan",
    body: "Already have a plan? Get a second opinion on what’s solid, what’s risky and what’s missing.",
  },
  {
    icon: "lock",
    title: "Orders with protected payment",
    body: "Agreed scope, agreed price, money released only when you confirm the work is done. Refund rights if it isn’t.",
  },
  {
    icon: "users",
    title: "A community that answers",
    body: "Post a question for free and get answers from verified experts, plus reviews from people who already moved.",
  },
];

export const metadata = createMetadata({
  title: "For seekers — find a verified expert",
  description:
    "Browse manually verified immigration experts for 27 European countries. Free AI plan score, free chat, free first consultation and protected payments.",
  path: PATH,
});

export default function ForSeekersPage() {
  return (
    <>
      <PageHero
        eyebrow="For people relocating to Europe"
        title="Get your move checked by someone who has done it before"
        lead="Migrio is immigration only. Every expert is verified by hand, the first step is free, and your payment is protected until the work is done."
        crumbs={crumbs}
        primaryCta={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "seekers_hero_ai_score",
          intent: "seeker",
        }}
        secondaryCta={{
          label: "Find a verified expert",
          href: hub.browseExperts(CAMPAIGN, "page_hero"),
          ctaId: "seekers_hero_browse",
          intent: "seeker",
        }}
        footnote="Free · No card required · Takes about 2 minutes"
        aside={<ProductPreview />}
      />

      <TrustBar />

      <HowItWorks
        title="How hiring works on Migrio"
        lead="You never pay to find out whether an expert is right for you."
        steps={seekerSteps}
        cta={{
          label: "Start free",
          href: "/eligibility",
          ctaId: "seekers_how_it_works",
          intent: "seeker",
        }}
      />

      <FeatureGrid
        id="what-you-get"
        eyebrow="What you get"
        title="Everything you need to choose well"
        lead="Not just a directory. The tools to compare, check and commit with confidence."
        features={features}
      />

      <Section
        id="browse"
        tone="surface"
        aria-labelledby="browse-heading"
      >
        <SectionHeading
          id="browse-heading"
          eyebrow="Browse"
          title="Search by what you need, or where you’re going"
          align="center"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-canvas p-6 shadow-card">
            <h3 className="text-lg">Areas of expertise</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {expertiseCategories.map((category) => (
                <li key={category.label}>
                  <a
                    href={hub.browseExperts(
                      CAMPAIGN,
                      `category_${category.label}`,
                    )}
                    rel="noopener"
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-body transition-colors hover:bg-surface hover:text-primary"
                    {...ctaTracking({
                      ctaId: "browse_category",
                      intent: "seeker",
                      location: "browse",
                      destination: "hub",
                    })}
                  >
                    {category.label}
                    <span className="shrink-0 text-xs text-muted">
                      {category.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-canvas p-6 shadow-card">
            <h3 className="text-lg">Destination countries</h3>
            <p className="mt-2 text-sm text-muted">
              27 European destinations covered end to end.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {countries.map((country) => (
                <li key={country}>
                  <a
                    href={hub.browseExperts(CAMPAIGN, `country_${country}`)}
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-body transition-colors hover:border-primary hover:text-primary"
                    {...ctaTracking({
                      ctaId: "browse_country",
                      intent: "seeker",
                      location: "browse",
                      destination: "hub",
                    })}
                  >
                    <Icon name="pin" className="size-3.5" />
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <FeaturedExperts campaign={CAMPAIGN} />

      <Testimonials
        title="What people say after they’ve actually moved"
        items={seekerTestimonials}
      />

      <FaqSection faqs={seekerFaqs} tone="surface" />

      <FinalCta
        title="Start with the free part"
        lead="Score your plan, chat with a verified expert, book a free consultation. Decide after that."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "seekers_final_cta_ai_score",
          intent: "seeker",
        }}
        secondary={{
          label: "Browse verified experts",
          href: hub.browseExperts(CAMPAIGN, "final_cta"),
          ctaId: "seekers_final_cta_browse",
          intent: "seeker",
        }}
        footnote="Free · No card required"
      />

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: "Hire a verified immigration expert",
            description:
              "Find, compare and hire manually verified immigration experts and advisors for relocation to 27 European countries.",
            path: PATH,
            serviceType: "Immigration advisory marketplace",
            audience: "People relocating to Europe",
          }),
          faqSchema(seekerFaqs),
        ]}
      />
    </>
  );
}
