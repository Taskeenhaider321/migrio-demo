import { expertFaqs } from "@/content/faqs";
import { expertStats } from "@/content/stats";
import { expertSteps, verificationSteps } from "@/content/steps";
import { expertTestimonials } from "@/content/testimonials";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge, VerifiedBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

import { FaqSection } from "@/sections/FaqSection";
import { FeatureGrid, type Feature } from "@/sections/FeatureGrid";
import { FinalCta } from "@/sections/FinalCta";
import { HowItWorks } from "@/sections/HowItWorks";
import { PageHero } from "@/sections/PageHero";
import { Testimonials } from "@/sections/Testimonials";
import { TrustBar } from "@/sections/TrustBar";

const CAMPAIGN = "for_experts";
const PATH = "/for-experts";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "For experts & advisors", path: PATH },
];

const features: Feature[] = [
  {
    icon: "sparkles",
    title: "AI-built profile",
    body: "Paste a LinkedIn URL or your website. Migrio drafts your bio, specialisms, countries and packages — you just review it.",
  },
  {
    icon: "shield",
    title: "The verification badge",
    body: "A manual check you can point to. Verified profiles rank first and convert at a higher rate than unverified listings.",
  },
  {
    icon: "users",
    title: "Qualified leads",
    body: "People arrive having already scored their plan, so the first conversation starts with facts rather than discovery.",
  },
  {
    icon: "calendar",
    title: "Meetings and appointments",
    body: "Publish your availability, cap free consultations per week, and let clients book without the email ping-pong.",
  },
  {
    icon: "chat",
    title: "Chat with seekers",
    body: "One inbox for every enquiry, with documents and case context attached to the right conversation.",
  },
  {
    icon: "dashboard",
    title: "Order management",
    body: "Scope, milestones, deliverables and status in one place, for your whole team on a company profile.",
  },
  {
    icon: "card",
    title: "Secure payments and invoices",
    body: "Clients pay up front into protected holding, funds release on completion, and invoices generate themselves.",
  },
  {
    icon: "file",
    title: "Packages and plans",
    body: "Sell fixed-price packages, quote custom scopes, or both. You set price, scope and turnaround.",
  },
  {
    icon: "star",
    title: "Reviews that are worth having",
    body: "Only paying clients can review, and nobody can buy or delete one — so a good rating actually means something.",
  },
];

export const metadata = createMetadata({
  title: "For experts & advisors",
  description:
    "Join Migrio as a verified immigration Expert or Advisor. AI-built profile, verification badge, qualified leads, bookings, orders, secure payments and invoices.",
  path: PATH,
});

export default function ForExpertsPage() {
  return (
    <>
      <PageHero
        eyebrow="For immigration companies and advisors"
        title="Get verified. Get leads who already know what they need."
        lead="Companies join as Experts, individuals as Advisors. Both get an AI-built profile, a ready-made practice dashboard and a stream of people actively planning a move to Europe."
        crumbs={crumbs}
        primaryCta={{
          label: "Join as an Expert or Advisor",
          href: hub.joinAsExpert(CAMPAIGN, "page_hero"),
          ctaId: "experts_hero_join",
          intent: "expert",
        }}
        secondaryCta={{
          label: "See how verification works",
          href: "#verification",
          ctaId: "experts_hero_verification",
          intent: "expert",
        }}
        footnote="Free to list · Commission on completed orders only"
        aside={<ExpertDashboardPreview />}
      />

      <TrustBar stats={expertStats} showPayments={false} />

      <HowItWorks
        id="join"
        eyebrow="Joining Migrio"
        title="Listed in minutes, verified in days"
        lead="You don’t write marketing copy and you don’t pay to be listed."
        steps={expertSteps}
        cta={{
          label: "Start your profile",
          href: hub.joinAsExpert(CAMPAIGN, "how_it_works"),
          ctaId: "experts_how_it_works_join",
          intent: "expert",
        }}
      />

      <FeatureGrid
        id="toolkit"
        eyebrow="Your toolkit"
        title="A practice, not just a listing"
        lead="Everything you’d otherwise stitch together from a calendar, an inbox, a spreadsheet and an invoicing tool."
        features={features}
      />

      <Section
        id="verification"
        tone="surface"
        aria-labelledby="verification-heading"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              id="verification-heading"
              eyebrow="Verification"
              title="The badge is the product"
              lead="Seekers choose Migrio because they can’t tell who’s real on a general marketplace. Verification is what makes you worth more here than there."
            />
            <div className="mt-7 rounded-2xl border border-line-brand bg-primary-tint p-5">
              <VerifiedBadge />
              <p className="mt-3 text-sm leading-relaxed text-body">
                Verified profiles appear above unverified ones in search, can
                take orders, and display the badge on every message, quote and
                review.
              </p>
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

      <Testimonials
        title="What experts say"
        items={expertTestimonials}
        eyebrow="From the other side"
      />

      <FaqSection
        faqs={expertFaqs}
        title="Questions experts ask before joining"
        tone="surface"
      />

      <FinalCta
        title="Join as an Expert or Advisor"
        lead="Free to list. Verified in days. You only pay commission when an order completes."
        primary={{
          label: "Join as an Expert or Advisor",
          href: hub.joinAsExpert(CAMPAIGN, "final_cta"),
          ctaId: "experts_final_cta_join",
          intent: "expert",
        }}
        secondary={{
          label: "Talk to our team",
          href: "/contact",
          ctaId: "experts_final_cta_contact",
          intent: "expert",
        }}
        footnote="No listing fee · No subscription to get started"
      />

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: "Migrio for immigration experts and advisors",
            description:
              "A verified marketplace listing, AI-built profile, bookings, chat, order management, secure payments and invoices for immigration professionals serving Europe.",
            path: PATH,
            serviceType: "Marketplace for immigration professionals",
            audience: "Immigration companies and independent advisors",
          }),
          faqSchema(expertFaqs),
        ]}
      />
    </>
  );
}

/** Compact stand-in for the hub dashboard, shown in the hero. */
function ExpertDashboardPreview() {
  const rows = [
    { label: "New enquiries", value: "14", tone: "brand" as const },
    { label: "Free calls booked", value: "6", tone: "verified" as const },
    { label: "Orders in progress", value: "9", tone: "amber" as const },
    { label: "Paid out this month", value: "€12,480", tone: "success" as const },
  ];

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-canvas p-6 shadow-float lg:max-w-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-title">Your dashboard</p>
          <p className="text-xs text-muted">Nordhaus Immigration · Berlin</p>
        </div>
        <VerifiedBadge label="Verified" />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        {rows.map((row) => (
          <div key={row.label} className="rounded-xl bg-surface p-3.5">
            <dt className="text-xs text-muted">{row.label}</dt>
            <dd className="mt-1 text-xl font-semibold text-title">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 space-y-2.5 border-t border-line pt-5">
        {[
          { icon: "sparkles" as const, text: "Profile built from LinkedIn" },
          { icon: "calendar" as const, text: "3 consultations tomorrow" },
          { icon: "card" as const, text: "2 invoices generated automatically" },
        ].map((item) => (
          <p
            key={item.text}
            className="flex items-center gap-2.5 text-sm text-body"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-light text-primary-dark">
              <Icon name={item.icon} className="size-3.5" />
            </span>
            {item.text}
          </p>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-primary-tint p-3.5">
        <p className="text-sm text-body">Lead quality</p>
        <Badge tone="success">Plan score attached</Badge>
      </div>
    </div>
  );
}
