import { homeFaqs } from "@/content/faqs";
import { seekerSteps } from "@/content/steps";
import { seekerTestimonials } from "@/content/testimonials";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import { faqSchema, serviceSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";

import { AiScoreTeaser } from "@/sections/AiScoreTeaser";
import { CommunityTeaser } from "@/sections/CommunityTeaser";
import { FaqSection } from "@/sections/FaqSection";
import { FeaturedExperts } from "@/sections/FeaturedExperts";
import { FinalCta } from "@/sections/FinalCta";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";
import { Testimonials } from "@/sections/Testimonials";
import { TrustBar } from "@/sections/TrustBar";
import { WhyMigrio } from "@/sections/WhyMigrio";

const CAMPAIGN = "home";

export const metadata = createMetadata({
  title: "Migrio — Verified immigration experts for moving to Europe",
  description:
    "Hire manually verified immigration experts and advisors for your move to Europe. Free AI plan score, free consultation, free chat and protected payments.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      <HowItWorks
        title="Three steps, and the first two are free"
        lead="Score your plan, talk to someone who has filed your exact application before, then order with your money protected."
        steps={seekerSteps}
        cta={{
          label: "Start with your free plan score",
          href: "/eligibility",
          ctaId: "how_it_works_ai_score",
          intent: "seeker",
        }}
      />

      <WhyMigrio campaign={CAMPAIGN} />
      <FeaturedExperts campaign={CAMPAIGN} />
      <AiScoreTeaser />
      <CommunityTeaser campaign={CAMPAIGN} />

      <Testimonials
        title="3,100+ people have already moved with Migrio"
        lead="Reviews can only be left by someone who placed and paid for an order."
        items={seekerTestimonials}
      />

      <FaqSection faqs={homeFaqs} tone="surface" />

      <FinalCta
        title="Your move deserves a verified expert"
        lead="Start free. Score your plan in two minutes, then talk to an immigration specialist who has done it before."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "final_cta_ai_score",
          intent: "seeker",
        }}
        secondary={{
          label: "Join as an Expert or Advisor",
          href: hub.joinAsExpert(CAMPAIGN, "final_cta"),
          ctaId: "final_cta_join_as_expert",
          intent: "expert",
        }}
        footnote="Free · No card required · Not legal advice"
      />

      <JsonLd
        schema={[
          serviceSchema({
            name: "Verified immigration experts for Europe",
            description:
              "Migrio connects people relocating to Europe with manually verified immigration experts and advisors, with free consultations and protected payments.",
            path: "/",
            serviceType: "Immigration advisory marketplace",
            audience: "People relocating to Europe",
          }),
          faqSchema(homeFaqs),
        ]}
      />
    </>
  );
}
