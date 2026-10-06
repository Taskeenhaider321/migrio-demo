import { ScoreBar, ScoreRing } from "@/components/brand/ScoreRing";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export const sampleScore = {
  total: 82,
  verdict: "Strong fit for the EU Blue Card",
  bars: [
    { label: "Qualifications", value: 92, verdict: "strong" as const },
    { label: "Salary threshold", value: 88, verdict: "strong" as const },
    { label: "Work history", value: 74, verdict: "ok" as const },
    { label: "Document readiness", value: 41, verdict: "weak" as const },
  ],
  weakest: "Document readiness",
  weakestNote:
    "Your degree isn’t listed in anabin yet. Get a ZAB statement of comparability before you file.",
};

export function AiScoreTeaser() {
  return (
    <Section id="ai-score" aria-labelledby="ai-score-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="ai-score-heading"
            eyebrow="Free AI plan score"
            title="Find out what’s wrong with your plan before you pay anyone"
            lead="Answer a few questions and get an instant, honest read on which European routes fit you — and the single weakest point most likely to get you refused."
          />

          <ul className="mt-7 space-y-3">
            {[
              "Scores route fit, qualifications, income, work history and timing",
              "Names your weakest link in plain language",
              "Attach it to a message so experts arrive already briefed",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] text-body">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-light text-primary-dark">
                  <Icon name="check" className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ButtonLink
              href="/eligibility"
              size="lg"
              ctaId="ai_score_teaser"
              intent="seeker"
              location="ai_score_teaser"
            >
              Get your free AI plan score
              <Icon name="arrowRight" className="size-4" />
            </ButtonLink>
            <p className="mt-3 text-sm text-muted">
              Free · ~2 minutes · Not legal advice
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-canvas p-6 shadow-lift sm:p-8">
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
      </div>
    </Section>
  );
}
