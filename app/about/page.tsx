import { site } from "@/config/site";
import { trustStats } from "@/content/stats";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Avatar } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

import { FinalCta } from "@/sections/FinalCta";
import { PageHero } from "@/sections/PageHero";
import { TrustBar } from "@/sections/TrustBar";

const CAMPAIGN = "about";
const PATH = "/about";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

const values = [
  {
    icon: "shield" as const,
    title: "Verify, don’t vouch",
    body: "If we can’t check a claim against a registry or a regulator, it doesn’t get a badge. Trust has to be earned in public.",
  },
  {
    icon: "gift" as const,
    title: "Free until it’s worth paying for",
    body: "Nobody should pay to find out whether they’re even eligible. The first step stays free, permanently.",
  },
  {
    icon: "compass" as const,
    title: "Narrow beats broad",
    body: "We will never add unrelated categories. Doing one thing is what lets us make promises a general marketplace can’t.",
  },
  {
    icon: "chat" as const,
    title: "Plain language",
    body: "Immigration is already confusing enough. We write like a person, and we expect our experts to as well.",
  },
];

/** PLACEHOLDER TEAM — replace names, roles and photos before launch. */
const team = [
  { name: "Add founder name", role: "Co-founder & CEO", initials: "AF" },
  { name: "Add founder name", role: "Co-founder & CTO", initials: "AF" },
  { name: "Add name", role: "Head of Trust & Verification", initials: "AN" },
  { name: "Add name", role: "Head of Expert Partnerships", initials: "AN" },
];

export const metadata = createMetadata({
  title: "About",
  description:
    "Why Migrio exists: a verified, Europe-only marketplace for immigration expertise, built so nobody has to gamble their visa on an unchecked freelancer.",
  path: PATH,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Migrio"
        title="Nobody should have to gamble their visa on a stranger"
        lead="We built Migrio because the internet is full of people selling immigration help, and almost no way to tell which of them have ever filed your application."
        crumbs={crumbs}
        primaryCta={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "about_hero_ai_score",
          intent: "seeker",
        }}
        secondaryCta={{
          label: "Contact us",
          href: "/contact",
          ctaId: "about_hero_contact",
        }}
      />

      <TrustBar stats={trustStats} showPayments={false} />

      <Section id="story" aria-labelledby="story-heading">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            id="story-heading"
            eyebrow="Our story"
            title="The problem we kept hearing"
          />
          <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-body">
            <p>
              Every year millions of people decide to move to Europe. Almost all
              of them start the same way: a search engine, a forum thread, and a
              list of names they have no way to evaluate.
            </p>
            <p>
              Some of those names are excellent immigration lawyers. Some are
              well-meaning consultants who have never filed the application you
              need. A few are simply taking the money. On a general freelance
              marketplace, all three look identical — the same star rating, the
              same confident profile, the same stock photo.
            </p>
            <p>
              The cost of getting that wrong is not a refund. It’s a refusal on
              your record, a lost year, and a harder second attempt. That
              asymmetry is why immigration doesn’t belong in a marketplace built
              to sell everything.
            </p>
            <p>
              So we built a narrow one. Migrio covers relocation to Europe and
              nothing else. Every expert is checked by a person before they can
              take an order. The first consultation, the chat and the AI plan
              score are free, because deciding whether you’re even eligible
              shouldn’t cost money. And payments are held until you confirm the
              work is done.
            </p>
          </div>
        </div>
      </Section>

      <Section id="values" tone="surface" aria-labelledby="values-heading">
        <SectionHeading
          id="values-heading"
          eyebrow="What we hold to"
          title="Four rules we don’t bend"
          align="center"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-line bg-canvas p-6 shadow-card"
            >
              <span className="inline-grid size-11 place-items-center rounded-xl bg-primary-light text-primary-dark">
                <Icon name={value.icon} />
              </span>
              <h3 className="mt-4 text-lg">{value.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="team" aria-labelledby="team-heading">
        <SectionHeading
          id="team-heading"
          eyebrow="Team"
          title="The people behind Migrio"
          align="center"
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <li
              key={`${member.role}-${index}`}
              className="rounded-2xl border border-line bg-canvas p-5 text-center shadow-card"
            >
              <Avatar
                initials={member.initials}
                className="mx-auto size-16 text-lg"
              />
              <p className="mt-4 text-base font-semibold text-title">
                {member.name}
              </p>
              <p className="mt-0.5 text-sm text-muted">{member.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-muted">
          Press and partnership enquiries:{" "}
          <a
            href={`mailto:${site.pressEmail}`}
            className="font-semibold text-primary hover:underline"
          >
            {site.pressEmail}
          </a>
        </p>
      </Section>

      <FinalCta
        title="Wherever you’re going in Europe, start verified"
        lead="Free plan score, free chat, free first consultation. Pay only when you’re ready."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "about_final_cta_ai_score",
          intent: "seeker",
        }}
        secondary={{
          label: "Join as an Expert or Advisor",
          href: hub.joinAsExpert(CAMPAIGN, "final_cta"),
          ctaId: "about_final_cta_join",
          intent: "expert",
        }}
      />

      <JsonLd schema={breadcrumbSchema(crumbs)} />
    </>
  );
}
