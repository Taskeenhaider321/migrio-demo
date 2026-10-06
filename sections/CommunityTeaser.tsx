import { communityThreads } from "@/content/community";
import { hub } from "@/lib/cta";
import { VerifiedBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function CommunityTeaser({ campaign = "home" }: { campaign?: string }) {
  return (
    <Section id="community" tone="surface" aria-labelledby="community-heading">
      <SectionHeading
        id="community-heading"
        eyebrow="Community Q&A"
        title="Ask first. Hire later."
        lead="Post a question for free and get answers from verified experts — not from strangers guessing on a forum."
        align="center"
      />

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {communityThreads.map((thread) => (
          <li key={thread.question}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-canvas p-6 shadow-card">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                <Icon name="pin" className="size-3.5" />
                {thread.country}
                <span className="text-subtle">·</span>
                {thread.answers} answers
              </p>
              <h3 className="mt-3 text-base leading-snug">{thread.question}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {thread.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-4">
                <span className="text-sm font-medium text-title">
                  {thread.answeredBy}
                </span>
                <VerifiedBadge label={thread.answeredByRole} />
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <ButtonLink
          href={hub.community(campaign, "community_teaser")}
          external
          size="lg"
          variant="secondary"
          ctaId="community_ask_question"
          intent="seeker"
          location="community_teaser"
        >
          <Icon name="chat" className="size-4" />
          Ask your question for free
        </ButtonLink>
      </div>
    </Section>
  );
}
