"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  ages,
  countries,
  documents,
  educations,
  experiences,
  featuredDestinations,
  fields,
  incomes,
  jobOffers,
  languages,
  otherDestinations,
  parties,
  purposes,
  refusals,
  savings,
  timelines,
  type Choice,
} from "@/content/eligibility";
import { ScoreRing } from "@/components/brand/ScoreRing";
import { trackEvent } from "@/lib/analytics";
import { STEP_IDS, type AssessmentAnswers, type ScoreBand, type StepId } from "@/lib/eligibility/types";
import { validateStep } from "@/lib/eligibility/validate";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import {
  clearDraft,
  getDraftSnapshot,
  saveDraft,
  saveReport,
  useIsClient,
  type AssessmentDraft,
} from "./storage";

const REGIONS = ["Europe", "Americas", "Asia", "Africa", "Oceania", "Other"] as const;

const STAGES = [
  "Reading your destination and reason for moving",
  "Comparing them with common European routes",
  "Finding the softest spot in the file",
  "Writing your report",
];

const EMPTY: Partial<AssessmentAnswers> = { documents: [] };

type ProfilePreview = {
  score: number;
  band: ScoreBand;
  bandLabel: string;
  headline: string;
};

/** Bring a newly revealed control fully above the sticky step footer. */
function revealField(node: HTMLElement | null) {
  if (!node) return;
  const footer = document.querySelector("[data-step-footer]");
  const footerHeight = footer?.getBoundingClientRect().height ?? 72;
  const rect = node.getBoundingClientRect();
  const limit = window.innerHeight - footerHeight - 16;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

  if (rect.bottom > limit) {
    window.scrollBy({ top: rect.bottom - limit, behavior });
  } else if (rect.top < 12) {
    window.scrollBy({ top: rect.top - 12, behavior });
  }
}

function subscribeOverflow(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  const observer = new ResizeObserver(onChange);
  observer.observe(document.body);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    observer.disconnect();
  };
}

function overflowSnapshot() {
  const footer = document.querySelector("[data-step-footer]");
  const step = document.querySelector("[data-step-body]");
  if (!footer || !step) return false;
  return step.getBoundingClientRect().bottom > footer.getBoundingClientRect().top + 20;
}

export function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"questions" | "processing" | "sent">("questions");
  const [stage, setStage] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [restored, setRestored] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "resent" | "error">("idle");
  const [profile, setProfile] = useState<ProfilePreview | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const isClient = useIsClient();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lock = useRef(false);
  const opened = useRef(false);
  const moreBelow = useSyncExternalStore(subscribeOverflow, overflowSnapshot, () => false);

  const stepId = STEP_IDS[step];

  // Adopt a saved draft once, during render, after hydration. Reading
  // sessionStorage in an effect trips the set-state-in-effect rule and
  // would also flash the first question before the saved step appears.
  if (isClient && !restored) {
    const draft = getDraftSnapshot();
    setRestored(true);
    if (draft) {
      setStep(Math.min(Math.max(draft.step, 0), STEP_IDS.length - 1));
      setAnswers({ ...EMPTY, ...draft.answers });
    }
  }

  useEffect(() => {
    if (!restored || phase !== "questions") return;
    const draft: AssessmentDraft = { step, answers };
    saveDraft(draft);
  }, [answers, phase, restored, step]);

  useEffect(() => {
    if (stepId !== "score" || phase !== "questions") return;
    const controller = new AbortController();
    fetch("/api/eligibility/preview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...answers, documents: answers.documents ?? [] }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          profile?: ProfilePreview;
          error?: string;
        };
        if (!response.ok || !payload.profile) {
          throw new Error(payload.error || "We couldn’t score that just now.");
        }
        setProfile(payload.profile);
        setProfileError(null);
      })
      .catch((caught: unknown) => {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setProfileError(
          caught instanceof Error ? caught.message : "We couldn’t score that just now.",
        );
      });
    return () => controller.abort();
  }, [answers, phase, stepId]);

  useEffect(() => {
    if (!restored) return;
    trackEvent("eligibility_step", { step_index: step + 1, step_id: stepId });
    if (!opened.current) {
      opened.current = true;
      return;
    }
    lock.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    headingRef.current?.focus({ preventScroll: true });
  }, [restored, step, stepId]);

  useEffect(() => {
    if (!error) return;
    revealField(document.querySelector("[role='alert']"));
  }, [error]);

  useEffect(() => {
    if (phase !== "processing") return;
    const id = window.setInterval(() => {
      setStage((current) => Math.min(current + 1, STAGES.length - 1));
    }, 520);
    return () => window.clearInterval(id);
  }, [phase]);

  function patch(partial: Partial<AssessmentAnswers>) {
    setError(null);
    setAnswers((current) => ({ ...current, ...partial }));
  }

  function goNext() {
    if (lock.current) return;
    lock.current = true;
    setError(null);
    setStep((current) => Math.min(current + 1, STEP_IDS.length - 1));
  }

  function back() {
    lock.current = false;
    setError(null);
    setStep((current) => Math.max(0, current - 1));
  }

  function next() {
    const problem = validateStep(stepId, answers);
    if (problem) {
      setError(problem);
      return;
    }
    goNext();
  }

  async function submitReport() {
    const response = await fetch("/api/eligibility", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...answers,
        documents: answers.documents ?? [],
        companyWebsite: honeypot,
      }),
    });
    const payload: { report?: Parameters<typeof saveReport>[0]; error?: string } =
      await response.json();
    if (!response.ok || !payload.report) {
      throw new Error(payload.error || "We couldn’t send that just now.");
    }
    saveReport(payload.report);
    clearDraft();
    trackEvent("eligibility_complete", { band: payload.report.band });
    return payload.report;
  }

  async function finish() {
    const problem = validateStep("details", answers);
    if (problem) {
      setError(problem);
      return;
    }

    setPhase("processing");
    setStage(0);
    const started = Date.now();

    try {
      const report = await submitReport();
      const wait = 1600 - (Date.now() - started);
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
      setEmailSent(report.emailSent);
      setResendState("idle");
      setPhase("sent");
    } catch (caught) {
      setPhase("questions");
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Your answers are still here.",
      );
    }
  }

  async function resend() {
    setResendState("sending");
    try {
      const report = await submitReport();
      setEmailSent(report.emailSent);
      setResendState(report.emailSent ? "resent" : "error");
    } catch {
      setResendState("error");
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (phase !== "questions") return;
    if (stepId === "details") void finish();
    else next();
  }

  if (phase === "processing") {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-md flex-col justify-center px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Free AI eligibility score
        </p>
        <h2 className="mt-3 text-3xl">Sending your report</h2>
        <p className="mt-3 text-muted">
          This usually takes a few seconds. We’ll ask you to check your inbox
          as soon as it’s on its way.
        </p>
        <ol className="mt-8 space-y-3" aria-live="polite">
          {STAGES.map((label, index) => {
            const done = index < stage;
            const current = index === stage;
            return (
              <li key={label} className="flex items-start gap-3 text-sm">
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                    done && "bg-success text-white",
                    current && "bg-primary text-white",
                    !done && !current && "bg-surface-strong text-transparent",
                  )}
                >
                  {done ? <Icon name="check" className="size-3" /> : null}
                </span>
                <span className={cn(current ? "font-semibold text-title" : "text-muted")}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  if (phase === "sent") {
    return (
      <SentScreen
        email={answers.email ?? ""}
        emailSent={emailSent}
        resendState={resendState}
        onResend={() => void resend()}
      />
    );
  }

  const stepReady =
    validateStep(stepId, answers) === null &&
    (stepId !== "score" || (profile !== null && profileError === null));

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-xl flex-col px-5"
      noValidate
    >
      <div className="pt-3 sm:pt-6">
        <div className="flex items-center gap-3">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-strong"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEP_IDS.length}
            aria-valuenow={step + 1}
            aria-label="Assessment progress"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${((step + 1) / STEP_IDS.length) * 100}%` }}
            />
          </div>
          <p className="shrink-0 text-xs font-semibold text-muted">
            {step + 1} / {STEP_IDS.length}
          </p>
        </div>
      </div>

      <div key={stepId} data-step-body className="step-in flex-1 pb-3 pt-4 sm:pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {stepId === "score" ? "Profile score" : "Free · about 2 minutes"}
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-[1.75rem] font-bold leading-[1.15] tracking-tight text-title outline-none sm:text-4xl"
        >
          {stepId === "score" && profile ? scoreStatus(profile.band) : titles[stepId]}
        </h2>

        <div className="mt-4">
          <StepBody
            stepId={stepId}
            answers={answers}
            profile={profile}
            profileError={profileError}
            patch={patch}
            onSingle={(id, field) => {
              patch({ [field]: id });
            }}
          />
        </div>

        {error ? (
          <p role="alert" className="mt-4 text-sm font-medium text-danger">
            {error}
          </p>
        ) : null}

        <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
          <label>
            Company website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div data-step-footer className="sticky bottom-0 z-10 -mx-5 mt-auto">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-full h-16 transition-opacity duration-200",
            moreBelow ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="h-full bg-gradient-to-t from-canvas via-canvas/75 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_top,black,transparent)]" />
        </div>
        <div className="border-t border-line bg-canvas/90 px-5 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex h-12 items-center gap-1 rounded-brand px-2 text-sm font-semibold text-title"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Back
            </button>
          ) : null}
          <button
            type="submit"
            disabled={!stepReady}
            className="cta-shimmer inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-brand bg-primary px-4 py-2.5 text-center text-sm font-semibold leading-snug text-white shadow-[0_10px_24px_-10px_rgb(78_70_180/0.95)] disabled:cursor-not-allowed disabled:bg-primary/40 disabled:shadow-none sm:text-base"
          >
            {stepId === "score"
              ? "Get detailed eligibility report"
              : stepId === "details"
                ? "Email my report"
                : "Continue"}
            <Icon name="arrowRight" className="size-4 shrink-0" />
          </button>
        </div>
        </div>
      </div>
    </form>
  );
}

const titles: Record<StepId, string> = {
  destination: "Where do you want to live in Europe?",
  purpose: "What’s taking you there?",
  party: "Who’s making the move?",
  origin: "Where are you starting from?",
  background: "A little about your background",
  work: "What do you do for work?",
  means: "The practical bit — money and language",
  readiness: "How ready is the file?",
  score: "Your profile score",
  details: "Your report is ready. Where should we send it?",
};

function StepBody({
  stepId,
  answers,
  profile,
  profileError,
  patch,
  onSingle,
}: {
  stepId: StepId;
  answers: Partial<AssessmentAnswers>;
  profile: ProfilePreview | null;
  profileError: string | null;
  patch: (partial: Partial<AssessmentAnswers>) => void;
  onSingle: (id: string, field: "destination" | "purpose" | "party") => void;
}) {
  switch (stepId) {
    case "destination":
      return <DestinationStep answers={answers} onSingle={onSingle} />;
    case "purpose":
      return (
        <ChoiceCards
          name="purpose"
          choices={purposes}
          value={answers.purpose}
          onChange={(id) => onSingle(id, "purpose")}
        />
      );
    case "party":
      return (
        <ChoiceCards
          name="party"
          choices={parties}
          value={answers.party}
          onChange={(id) => onSingle(id, "party")}
          columns={1}
        />
      );
    case "origin":
      return (
        <div className="space-y-5">
          <CountryField
            id="nationality"
            label="Your nationality"
            value={answers.nationality ?? ""}
            onChange={(nationality) => patch({ nationality })}
          />
          <CountryField
            id="residence"
            label="Where you live now"
            value={answers.residence ?? ""}
            allowSame
            onChange={(residence) => patch({ residence })}
          />
        </div>
      );
    case "background":
      return (
        <div className="space-y-4">
          <ChipGroup
            legend="Age range"
            name="age"
            choices={ages}
            value={answers.age}
            onChange={(age) => patch({ age })}
          />
          <ChipGroup
            legend="Highest level completed"
            name="education"
            choices={educations}
            value={answers.education}
            onChange={(education) => patch({ education })}
          />
        </div>
      );
    case "work":
      return (
        <div className="space-y-4">
          <ChipGroup
            legend="Field"
            name="field"
            choices={fields}
            value={answers.field}
            onChange={(field) => patch({ field })}
          />
          <ChipGroup
            legend="Years doing it"
            name="experience"
            choices={experiences}
            value={answers.experience}
            onChange={(experience) => patch({ experience })}
          />
          <ChoiceCards
            name="jobOffer"
            legend="Job offer"
            choices={jobOffers}
            value={answers.jobOffer}
            onChange={(jobOffer) => patch({ jobOffer })}
          />
        </div>
      );
    case "means":
      return (
        <div className="space-y-4">
          <ChipGroup
            legend="Household income, roughly"
            name="income"
            choices={incomes}
            value={answers.income}
            onChange={(income) => patch({ income })}
          />
          <ChipGroup
            legend="Savings that could cover living costs"
            name="savings"
            choices={savings}
            value={answers.savings}
            onChange={(savingsId) => patch({ savings: savingsId })}
          />
          <ChoiceCards
            name="language"
            legend="Language"
            choices={languages}
            value={answers.language}
            onChange={(language) => patch({ language })}
            columns={1}
          />
        </div>
      );
    case "readiness":
      return (
        <div className="space-y-4">
          <ChipGroup
            legend="When you’d like to move"
            name="timeline"
            choices={timelines}
            value={answers.timeline}
            onChange={(timeline) => patch({ timeline })}
          />
          <CheckboxGroup
            legend="Documents you already have"
            choices={documents}
            selected={answers.documents ?? []}
            onChange={(next) => patch({ documents: next })}
          />
          <ChoiceCards
            name="refusal"
            legend="Any previous visa refusal?"
            choices={refusals}
            value={answers.refusal}
            onChange={(refusal) => patch({ refusal })}
            columns={1}
          />
        </div>
      );
    case "score":
      return <ScoreStep profile={profile} error={profileError} />;
    case "details":
      return <DetailsStep answers={answers} patch={patch} />;
    default:
      return null;
  }
}

function DestinationStep({
  answers,
  onSingle,
}: {
  answers: Partial<AssessmentAnswers>;
  onSingle: (id: string, field: "destination") => void;
}) {
  const destination = answers.destination ?? "";
  const extended = otherDestinations.some((country) => country.id === destination);
  const choosingOther = destination === "other" || extended;
  const countryRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (!choosingOther) return;
    const node = countryRef.current;
    const frame = window.requestAnimationFrame(() => {
      revealField(node);
      node?.querySelector("select")?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [choosingOther]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {featuredDestinations.map((choice) => (
          <ChoiceCard
            key={choice.id}
            name="destination"
            choice={choice}
            checked={destination === choice.id}
            onChange={() => onSingle(choice.id, "destination")}
          />
        ))}
        <ChoiceCard
          name="destination"
          choice={{ id: "unsure", label: "Not sure yet" }}
          checked={destination === "unsure"}
          onChange={() => onSingle("unsure", "destination")}
          className="col-span-2"
        />
        <ChoiceCard
          name="destination"
          choice={{ id: "other", label: "Another European country" }}
          checked={choosingOther}
          onChange={() => onSingle("other", "destination")}
          className="col-span-2"
        />
      </div>
      {choosingOther ? (
        <label ref={countryRef} className="block scroll-mb-24">
          <span className="mb-1.5 block text-sm font-semibold text-title">Which country?</span>
          <span className="relative block">
            <select
              value={extended ? destination : ""}
              onChange={(event) => onSingle(event.target.value, "destination")}
              className="h-12 w-full appearance-none rounded-2xl border-2 border-line-strong bg-canvas px-3 pr-10 text-base text-title"
            >
              <option value="" disabled>
                Choose a country
              </option>
              {otherDestinations.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
          </span>
        </label>
      ) : null}
    </div>
  );
}

function ChoiceCards({
  name,
  legend,
  choices,
  value,
  onChange,
  columns = 1,
}: {
  name: string;
  legend?: string;
  choices: Choice[];
  value?: string;
  onChange: (id: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <fieldset>
      {legend ? (
        <legend className="mb-3 text-base font-bold text-title">{legend}</legend>
      ) : null}
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2")}>
        {choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            name={name}
            choice={choice}
            checked={value === choice.id}
            onChange={() => onChange(choice.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}

function ChoiceCard({
  name,
  choice,
  checked,
  onChange,
  className,
}: {
  name: string;
  choice: Choice;
  checked: boolean;
  onChange: () => void;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex min-h-12 cursor-pointer items-center gap-2.5 rounded-2xl border-2 px-3 py-2 text-left transition-colors",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
        checked
          ? "border-primary bg-primary-tint shadow-card"
          : "border-line-strong bg-canvas hover:border-primary",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={choice.id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold text-title">{choice.label}</span>
        {choice.hint ? (
          <span className="mt-0.5 block text-sm leading-snug text-muted">{choice.hint}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full border-2",
          checked ? "border-primary bg-primary text-white" : "border-primary/50 bg-canvas",
        )}
      >
        {checked ? <Icon name="check" className="size-3" /> : null}
      </span>
    </label>
  );
}

function ChipGroup({
  legend,
  name,
  choices,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  choices: Choice[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-bold text-title">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => {
          const checked = value === choice.id;
          return (
            <label
              key={choice.id}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-3.5 text-sm font-semibold",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                checked
                  ? "border-primary bg-primary text-white"
                  : "border-line-strong bg-canvas text-title hover:border-primary",
              )}
            >
              <input
                type="radio"
                name={name}
                value={choice.id}
                checked={checked}
                onChange={() => onChange(choice.id)}
                className="sr-only"
              />
              {choice.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({
  legend,
  choices,
  selected,
  onChange,
}: {
  legend: string;
  choices: Choice[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-bold text-title">{legend}</legend>
      <div className="grid gap-2">
        {choices.map((choice) => {
          const checked = selected.includes(choice.id);
          return (
            <label
              key={choice.id}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-2 px-3.5",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                checked ? "border-primary bg-primary-tint" : "border-line bg-canvas",
              )}
            >
              <input
                type="checkbox"
                name="documents"
                value={choice.id}
                checked={checked}
                onChange={() =>
                  onChange(
                    checked
                      ? selected.filter((id) => id !== choice.id)
                      : [...selected, choice.id],
                  )
                }
                className="size-4 accent-primary"
              />
              <span className="text-sm font-medium text-title">{choice.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function CountryField({
  id,
  label,
  value,
  onChange,
  allowSame = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (id: string) => void;
  allowSame?: boolean;
}) {
  const fieldId = useId();
  return (
    <label htmlFor={`${fieldId}-${id}`} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-title">{label}</span>
      <span className="relative block">
        <select
          id={`${fieldId}-${id}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-2xl border-2 border-line-strong bg-canvas px-3 pr-10 text-base text-title"
        >
          <option value="" disabled>
            Choose a country
          </option>
          {allowSame ? <option value="same">I live in my country of nationality</option> : null}
          {REGIONS.map((region) => (
            <optgroup key={region} label={region}>
              {countries
                .filter((country) => country.region === region)
                .map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
      </span>
    </label>
  );
}

function DetailsStep({
  answers,
  patch,
}: {
  answers: Partial<AssessmentAnswers>;
  patch: (partial: Partial<AssessmentAnswers>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          name="given-name"
          autoComplete="given-name"
          required
          value={answers.firstName ?? ""}
          onChange={(firstName) => patch({ firstName })}
        />
        <TextField
          label="Last name"
          name="family-name"
          autoComplete="family-name"
          required
          value={answers.lastName ?? ""}
          onChange={(lastName) => patch({ lastName })}
        />
      </div>
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={answers.email ?? ""}
        onChange={(email) => patch({ email })}
      />
      <p className="flex items-start gap-2 rounded-2xl bg-primary-tint px-3.5 py-3 text-sm leading-relaxed text-primary-dark">
        <Icon name="mail" className="mt-0.5 size-4 shrink-0" />
        We’ll send a secure link to your email. Open it to view your full
        report and download the PDF.
      </p>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  autoComplete: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-title">
        {label}
        {required ? (
          <abbr title="required" className="ml-0.5 text-danger no-underline">
            *
          </abbr>
        ) : null}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border-2 border-line-strong bg-canvas px-3 text-base text-title"
      />
    </label>
  );
}

function scoreStatus(band: ScoreBand): string {
  if (band === "strong") return "Congratulations";
  if (band === "fixable") return "You’re close";
  return "A better route may fit";
}

function ScoreStep({
  profile,
  error,
}: {
  profile: ProfilePreview | null;
  error: string | null;
}) {
  if (error) {
    return <p className="text-sm font-medium text-danger">{error}</p>;
  }
  if (!profile) {
    return <p className="text-sm text-muted">Working out your profile score…</p>;
  }

  return (
    <div className="flex flex-col items-center text-center">
      <ScoreRing score={profile.score} label="Profile score" size={148} />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {profile.bandLabel}
      </p>
      <p className="mt-2 text-lg font-semibold text-title">{profile.headline}</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        This is your profile score. The detailed report adds the route, the gaps,
        and a PDF.
      </p>
    </div>
  );
}

const POPPER_BITS = [
  { dx: "-72px", dy: "-36px", color: "bg-accent", delay: "40ms" },
  { dx: "76px", dy: "-28px", color: "bg-primary", delay: "80ms" },
  { dx: "-58px", dy: "48px", color: "bg-primary", delay: "120ms" },
  { dx: "64px", dy: "52px", color: "bg-accent", delay: "60ms" },
  { dx: "8px", dy: "-78px", color: "bg-primary", delay: "0ms" },
  { dx: "-8px", dy: "78px", color: "bg-accent", delay: "100ms" },
] as const;

function inboxUrl(email: string): string {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (domain === "gmail.com" || domain === "googlemail.com") return "https://mail.google.com";
  if (domain === "outlook.com" || domain === "hotmail.com" || domain === "live.com") {
    return "https://outlook.live.com/mail/0/";
  }
  if (domain === "yahoo.com" || domain === "ymail.com") return "https://mail.yahoo.com";
  if (domain === "icloud.com" || domain === "me.com" || domain === "mac.com") {
    return "https://www.icloud.com/mail";
  }
  if (domain === "proton.me" || domain === "protonmail.com") return "https://mail.proton.me";
  return `mailto:${email}`;
}

function MailIllustration() {
  return (
    <div className="relative">
      {POPPER_BITS.map((bit) => (
        <span
          key={bit.dx + bit.dy}
          aria-hidden
          className={cn("mail-popper", bit.color)}
          style={{ ["--dx" as string]: bit.dx, ["--dy" as string]: bit.dy, animationDelay: bit.delay }}
        />
      ))}
      <svg viewBox="0 0 160 140" className="mail-pop h-36 w-40" role="img" aria-label="">
        <circle cx="80" cy="70" r="58" className="fill-primary-tint" />
        <circle cx="118" cy="28" r="8" className="fill-accent/80" />
        <circle cx="36" cy="36" r="5" className="fill-primary/30" />
        <rect x="38" y="46" width="84" height="58" rx="12" className="fill-primary" />
        <path d="M38 58 80 84l42-26" fill="none" className="stroke-white" strokeWidth="3" strokeLinejoin="round" />
        <path d="M50 96h28" className="stroke-white/70" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SentScreen({
  email,
  emailSent,
  resendState,
  onResend,
}: {
  email: string;
  emailSent: boolean;
  resendState: "idle" | "sending" | "resent" | "error";
  onResend: () => void;
}) {
  const delivered = emailSent || resendState === "resent";
  const inbox = inboxUrl(email);
  const opensWebmail = inbox.startsWith("http");

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-md flex-col items-center justify-center px-5 py-16 text-center">
      <div aria-hidden="true">
        <MailIllustration />
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Check your mailbox
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-title sm:text-4xl">
        {delivered ? "Your report is on its way" : "We just sent it."}
      </h2>
      {/* <p className="mt-3 max-w-sm text-muted">
        {delivered
          ? `We sent a secure link to ${email}. Open it to view your full report and download the PDF. If it isn’t in your inbox, check spam.`
          : `We tried to email ${email}. Resend the link, or open the report on your dashboard while you wait.`}
      </p> */}
      {resendState === "error" ? (
        <p role="alert" className="mt-4 text-sm font-medium text-danger">
          The email didn’t go out. Try resending.
        </p>
      ) : null}
      <a
        href="/"
        className="cta-shimmer mt-8 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-brand bg-primary px-4 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgb(78_70_180/0.95)]"
      >
        Back to home
      </a>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
        <a
          href={inbox}
          target={opensWebmail ? "_blank" : undefined}
          rel={opensWebmail ? "noopener noreferrer" : undefined}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open MailBox
        </a>
        <button
          type="button"
          onClick={onResend}
          disabled={resendState === "sending"}
          className="font-semibold text-primary underline-offset-4 hover:underline disabled:opacity-60"
        >
          {resendState === "sending"
            ? "Sending…"
            : resendState === "resent"
              ? "Sent again"
              : "Resend email"}
        </button>
        <a href="/eligibility/dashboard" className="font-semibold text-title underline-offset-4 hover:underline">
          Open dashboard
        </a>
      </div>
    </div>
  );
}
