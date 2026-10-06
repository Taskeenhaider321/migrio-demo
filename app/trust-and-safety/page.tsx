import { trustFaqs } from "@/content/faqs";
import { verificationSteps } from "@/content/steps";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

import { FaqSection } from "@/sections/FaqSection";
import { FeatureGrid, type Feature } from "@/sections/FeatureGrid";
import { FinalCta } from "@/sections/FinalCta";
import { PageHero } from "@/sections/PageHero";

const CAMPAIGN = "trust_and_safety";
const PATH = "/trust-and-safety";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Trust & safety", path: PATH },
];

const paymentFeatures: Feature[] = [
  {
    icon: "lock",
    title: "Funds held, not forwarded",
    body: "When you place an order your payment goes into protected holding. The expert sees it is secured; they don’t receive it yet.",
  },
  {
    icon: "check",
    title: "Released on your confirmation",
    body: "Money only moves when you mark the agreed work complete, or when a milestone you approved is delivered.",
  },
  {
    icon: "card",
    title: "PCI-DSS compliant processing",
    body: "Card details are handled by our payment provider and never stored by Migrio.",
  },
  {
    icon: "file",
    title: "Invoices generated automatically",
    body: "Every completed order produces a VAT-ready invoice for both sides, stored in your account.",
  },
];

const refundSteps = [
  {
    title: "Open a dispute from the order",
    body: "Within 30 days of the delivery date, from the order screen. Explain what was agreed and what happened.",
  },
  {
    title: "The expert gets 5 days to respond",
    body: "Most cases resolve here, with the work completed or a partial refund agreed between you.",
  },
  {
    title: "Migrio reviews the evidence",
    body: "If you can’t agree, our team reads the order scope, the message history and the deliverables, and decides.",
  },
  {
    title: "Refunds return to your card",
    body: "Approved refunds go back to the original payment method, typically within 5–10 working days.",
  },
];

export const metadata = createMetadata({
  title: "Trust & safety",
  description:
    "How Migrio verifies every immigration expert, protects your payment until the work is done, handles refunds and disputes, and keeps reviews honest.",
  path: PATH,
});

export default function TrustAndSafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Verification · Payments · Refunds"
        title="The guarantees a general marketplace can’t make"
        lead="Immigration is too consequential for self-declared expertise. Here is exactly what we check, how your money is held, and what happens when something goes wrong."
        crumbs={crumbs}
        primaryCta={{
          label: "Find a verified expert",
          href: hub.browseExperts(CAMPAIGN, "page_hero"),
          ctaId: "trust_hero_browse",
          intent: "seeker",
        }}
        secondaryCta={{
          label: "Get verified as an expert",
          href: hub.joinAsExpert(CAMPAIGN, "page_hero"),
          ctaId: "trust_hero_join",
          intent: "expert",
        }}
      />

      <Section id="verification" aria-labelledby="verification-heading">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              id="verification-heading"
              eyebrow="Verification"
              title="What the badge means"
              lead="A human at Migrio checks each of these before a profile is published. Nothing here is self-declared, and nothing is automated."
            />
            <div className="mt-7 rounded-2xl border border-line-brand bg-primary-tint p-5">
              <VerifiedBadge />
              <ul className="mt-4 space-y-2 text-sm text-body">
                {[
                  "Checked against official registries, not uploaded PDFs alone",
                  "Required before an expert can take a single order",
                  "Re-checked every 12 months, or the badge is removed",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Icon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-success"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="space-y-4">
            {verificationSteps.map((step) => (
              <li
                key={step.number}
                className="flex gap-4 rounded-2xl border border-line bg-canvas p-5 shadow-card"
              >
                <span className="inline-grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FeatureGrid
        id="payments"
        eyebrow="Payments"
        title="Your money moves when you say so"
        lead="Protected payment is the default on every order. There is no way to pay an expert directly and no way to opt out of it."
        features={paymentFeatures}
        tone="surface"
        columns={2}
      />

      <Section id="refunds" aria-labelledby="refunds-heading">
        <SectionHeading
          id="refunds-heading"
          eyebrow="Refunds & disputes"
          title="If the work isn’t delivered, you get your money back"
          lead="You can request a refund when the agreed work wasn’t delivered, was materially different from the agreed scope, or the expert stopped responding."
          align="center"
        />
        <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {refundSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-canvas p-5 shadow-card"
            >
              <span className="inline-grid size-9 place-items-center rounded-full bg-primary-light text-xs font-semibold text-primary-dark">
                {index + 1}
              </span>
              <h3 className="mt-3 text-base">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
          A refusal by a national authority is not on its own grounds for a
          refund — no expert can guarantee a government decision. Full detail is
          in the{" "}
          <a href="/terms" className="font-semibold text-primary hover:underline">
            terms of service
          </a>
          .
        </p>
      </Section>

      <FeatureGrid
        id="integrity"
        eyebrow="Reviews & data"
        title="Reviews you can believe, data you control"
        features={[
          {
            icon: "star",
            title: "Only buyers can review",
            body: "A review requires a paid, completed order. Experts cannot buy, edit or delete reviews.",
          },
          {
            icon: "chat",
            title: "Moderated, not curated",
            body: "We remove reviews only when they break our content rules — never because an expert asked.",
          },
          {
            icon: "shield",
            title: "Documents stay private",
            body: "Your files are encrypted in transit and at rest, and visible only to the expert you share them with.",
          },
          {
            icon: "globe",
            title: "Stored in the EU",
            body: "Personal data is processed in the EU under GDPR. Export or delete it any time from your account.",
          },
        ]}
        tone="surface"
        columns={2}
      />

      <FaqSection faqs={trustFaqs} title="Trust & safety questions" />

      <FinalCta
        title="Hire with the guardrails on"
        lead="Verified experts, protected payments, honest reviews. Start with the free plan score."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "trust_final_cta_ai_score",
          intent: "seeker",
        }}
        secondary={{
          label: "Browse verified experts",
          href: hub.browseExperts(CAMPAIGN, "final_cta"),
          ctaId: "trust_final_cta_browse",
          intent: "seeker",
        }}
      />

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: "Migrio expert verification and payment protection",
            description:
              "Manual verification of immigration experts, protected payments held until work is confirmed complete, a refund and dispute process, and reviews restricted to paying clients.",
            path: PATH,
            serviceType: "Marketplace trust and safety",
          }),
          faqSchema(trustFaqs),
        ]}
      />
    </>
  );
}
