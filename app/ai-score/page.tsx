import { aiScoreFaqs } from "@/content/faqs";
import { aiScoreFactors } from "@/content/steps";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScoreBar, ScoreRing } from "@/components/brand/ScoreRing";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

import { AiScoreTeaser, sampleScore } from "@/sections/AiScoreTeaser";
import { FaqSection } from "@/sections/FaqSection";
import { FinalCta } from "@/sections/FinalCta";
import { PageHero } from "@/sections/PageHero";

const CAMPAIGN = "ai_score";
const PATH = "/ai-score";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "AI plan score", path: PATH },
];

const bands = [
  {
    range: "80–100",
    title: "Strong fit",
    body: "Your profile matches the route’s published requirements. Focus on evidence and timing.",
    tone: "bg-success",
  },
  {
    range: "55–79",
    title: "Fixable gaps",
    body: "One or two requirements aren’t met yet. An expert can usually tell you how long closing them takes.",
    tone: "bg-rated",
  },
  {
    range: "0–54",
    title: "Wrong route",
    body: "This route is unlikely as things stand. The score suggests which alternative routes to look at instead.",
    tone: "bg-accent",
  },
];

export const metadata = createMetadata({
  title: "Free AI recommendation score for your relocation plan",
  description:
    "Get an instant, free AI score on your plan to move to Europe: which visa routes fit you, and the weakest point most likely to cause a refusal.",
  path: PATH,
});

export default function AiScorePage() {
  return (
    <>
      <PageHero
        eyebrow="Free · ~2 minutes · No account needed"
        title="An honest second opinion on your plan, before you pay anyone"
        lead="The AI plan score reads your situation against the real requirements of European routes and tells you which one fits, how close you are, and what’s most likely to go wrong."
        crumbs={crumbs}
        primaryCta={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "ai_score_hero",
          intent: "seeker",
        }}
        secondaryCta={{
          label: "Find a verified expert",
          href: hub.browseExperts(CAMPAIGN, "page_hero"),
          ctaId: "ai_score_hero_browse",
          intent: "seeker",
        }}
        footnote="An automated estimate, not legal advice"
        aside={<SampleScoreCard />}
      />

      <Section id="factors" tone="surface" aria-labelledby="factors-heading">
        <SectionHeading
          id="factors-heading"
          eyebrow="What it looks at"
          title="Six things that decide whether a route works for you"
          lead="The same things a good advisor checks on a first call — scored in two minutes instead of two weeks of searching."
          align="center"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiScoreFactors.map((factor, index) => (
            <li
              key={factor.label}
              className="rounded-2xl border border-line bg-canvas p-6 shadow-card"
            >
              <span className="inline-grid size-10 place-items-center rounded-xl bg-primary-light text-sm font-semibold text-primary-dark">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg">{factor.label}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {factor.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="reading" aria-labelledby="reading-heading">
        <SectionHeading
          id="reading-heading"
          eyebrow="Reading your score"
          title="What the number actually means"
          align="center"
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {bands.map((band) => (
            <li
              key={band.range}
              className="rounded-2xl border border-line bg-canvas p-6 shadow-card"
            >
              <span className={`block h-1.5 w-12 rounded-full ${band.tone}`} />
              <p className="mt-4 text-2xl font-semibold text-title">
                {band.range}
              </p>
              <h3 className="mt-1 text-base">{band.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {band.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl border border-line-brand bg-primary-tint p-5">
          <Icon name="shield" className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-body">
            <strong className="font-semibold text-title">
              The score is not legal advice and not a prediction.
            </strong>{" "}
            It is an automated read on publicly documented requirements, based
            on what you tell us. Immigration decisions are made by national
            authorities, and no score can guarantee an outcome. Use it to decide
            what to ask a verified expert, not instead of asking one.
          </p>
        </div>
      </Section>

      <AiScoreTeaser />

      <FaqSection
        faqs={aiScoreFaqs}
        title="Questions about the AI plan score"
        tone="surface"
      />

      <FinalCta
        title="Two minutes. No card. No account."
        lead="Find out where your plan is weak, then take that straight to a verified expert."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "ai_score_final_cta",
          intent: "seeker",
        }}
      />

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: "AI relocation plan score",
            description:
              "A free, instant AI assessment of how well a person’s profile fits European immigration routes, highlighting the weakest requirement in their plan.",
            path: PATH,
            serviceType: "Immigration eligibility assessment",
            audience: "People relocating to Europe",
          }),
          faqSchema(aiScoreFaqs),
        ]}
      />
    </>
  );
}

function SampleScoreCard() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-canvas p-6 shadow-float sm:p-8 lg:max-w-lg">
      <div className="flex items-center gap-5">
        <ScoreRing score={sampleScore.total} size={128} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Sample result
          </p>
          <p className="mt-1 text-lg font-semibold text-title">
            {sampleScore.verdict}
          </p>
          <p className="mt-1 text-sm text-muted">
            Germany · Software engineer · Family of 3
          </p>
        </div>
      </div>
      <div className="mt-7 space-y-4">
        {sampleScore.bars.map((bar) => (
          <ScoreBar key={bar.label} {...bar} />
        ))}
      </div>
      <div className="mt-6 flex gap-3 rounded-xl bg-accent-tint p-4">
        <Icon name="sparkles" className="mt-0.5 size-5 text-accent-dark" />
        <p className="text-sm leading-relaxed text-body">
          <strong className="font-semibold text-title">
            Your weakest link: {sampleScore.weakest}.
          </strong>{" "}
          {sampleScore.weakestNote}
        </p>
      </div>
    </div>
  );
}
