import { homeFaqs } from "@/content/faqs";
import { expertSteps, seekerSteps } from "@/content/steps";
import { explainerVideo } from "@/content/video";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  videoSchema,
} from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

import { FaqSection } from "@/sections/FaqSection";
import { FinalCta } from "@/sections/FinalCta";
import { HowItWorks } from "@/sections/HowItWorks";
import { PageHero } from "@/sections/PageHero";
import { TrustBar } from "@/sections/TrustBar";

const CAMPAIGN = "how_it_works";
const PATH = "/how-it-works";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "How it works", path: PATH },
];

const timeline = [
  {
    when: "Day 0",
    what: "Run your free AI plan score and read where your plan is weak.",
  },
  {
    when: "Day 0–2",
    what: "Message two or three verified experts. Chat is free and unlimited.",
  },
  {
    when: "Day 2–5",
    what: "Take your free consultations and compare approaches and prices.",
  },
  {
    when: "Day 5",
    what: "Agree a scope and place your order. Payment goes into protected holding.",
  },
  {
    when: "Ongoing",
    what: "Track documents, meetings and milestones in one thread.",
  },
  {
    when: "On completion",
    what: "You confirm the work is done, funds release, and your invoice is issued.",
  },
];

export const metadata = createMetadata({
  title: "How it works",
  description:
    "See how Migrio works in 90 seconds: free AI plan score, verified immigration experts, free consultation, and orders with protected payment and refunds.",
  path: PATH,
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch the 90-second explainer"
        title="From “where do I even start” to an application you trust"
        lead="Migrio turns the riskiest part of relocating — picking who to trust — into three steps, two of which cost nothing."
        crumbs={crumbs}
        primaryCta={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "hiw_hero_ai_score",
          intent: "seeker",
        }}
        secondaryCta={{
          label: "Find a verified expert",
          href: hub.browseExperts(CAMPAIGN, "page_hero"),
          ctaId: "hiw_hero_browse",
          intent: "seeker",
        }}
        footnote="Free · No card required"
        aside={
          <VideoEmbed
            videoId={explainerVideo.videoId}
            src={explainerVideo.src}
            poster={explainerVideo.poster}
            posterAlt={explainerVideo.posterAlt}
            captionsSrc={explainerVideo.captionsSrc}
            title={explainerVideo.title}
          />
        }
      />

      <TrustBar />

      <HowItWorks
        id="for-seekers-steps"
        eyebrow="If you’re relocating"
        title="Three steps for seekers"
        lead="You find out whether an expert is right for you before any money changes hands."
        steps={seekerSteps}
        cta={{
          label: "Start free",
          href: "/eligibility",
          ctaId: "hiw_seeker_steps",
          intent: "seeker",
        }}
      />

      <Section id="timeline" aria-labelledby="timeline-heading">
        <SectionHeading
          id="timeline-heading"
          eyebrow="Timeline"
          title="What a typical first week looks like"
          lead="Most people go from first question to a placed order inside a week, because nothing is gated behind a payment."
          align="center"
        />
        <ol className="mx-auto mt-12 max-w-2xl">
          {timeline.map((item, index) => (
            <li key={item.when} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid size-3 shrink-0 place-items-center rounded-full bg-primary ring-4 ring-primary-light" />
                {index < timeline.length - 1 ? (
                  <span className="w-px flex-1 bg-line-strong" />
                ) : null}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {item.when}
                </p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-body">
                  {item.what}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <HowItWorks
        id="for-experts-steps"
        eyebrow="If you’re an expert"
        title="Three steps for Experts and Advisors"
        lead="Companies register as Experts, individuals as Advisors. The verification is the same."
        steps={expertSteps}
        tone="surface"
        cta={{
          label: "Join as an Expert or Advisor",
          href: hub.joinAsExpert(CAMPAIGN, "expert_steps"),
          ctaId: "hiw_expert_steps_join",
          intent: "expert",
        }}
      />

      <Section id="safeguards" aria-labelledby="safeguards-heading">
        <SectionHeading
          id="safeguards-heading"
          eyebrow="Safeguards"
          title="What protects you at each step"
          align="center"
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: "shield" as const,
              title: "Before you choose",
              body: "Only manually verified experts can appear in search or take an order.",
            },
            {
              icon: "lock" as const,
              title: "While work is underway",
              body: "Your payment sits in protected holding, not in the expert’s account.",
            },
            {
              icon: "refund" as const,
              title: "If it goes wrong",
              body: "Open a dispute from the order screen and request a refund under our policy.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-line bg-canvas p-5 shadow-card"
            >
              <span className="inline-grid size-10 place-items-center rounded-xl bg-primary-light text-primary-dark">
                <Icon name={item.icon} className="size-4" />
              </span>
              <h3 className="mt-3 text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm">
          <a
            href="/trust-and-safety"
            className="font-semibold text-primary hover:underline"
          >
            Read the full trust & safety policy
          </a>
        </p>
      </Section>

      <FaqSection faqs={homeFaqs} tone="surface" />

      <FinalCta
        title="Two minutes to your first answer"
        lead="Run the free plan score, then decide whether you want to talk to anyone at all."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "hiw_final_cta_ai_score",
          intent: "seeker",
        }}
        secondary={{
          label: "Join as an Expert or Advisor",
          href: hub.joinAsExpert(CAMPAIGN, "final_cta"),
          ctaId: "hiw_final_cta_join",
          intent: "expert",
        }}
      />

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          videoSchema({
            name: explainerVideo.title,
            description: explainerVideo.description,
            thumbnailUrl: explainerVideo.poster,
            uploadDate: explainerVideo.uploadDate,
            duration: explainerVideo.durationIso,
            contentUrl: explainerVideo.src,
          }),
          faqSchema(homeFaqs),
        ]}
      />
    </>
  );
}
