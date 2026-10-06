export const STEP_IDS = [
  "destination",
  "purpose",
  "party",
  "origin",
  "background",
  "work",
  "means",
  "readiness",
  "score",
  "details",
] as const;

export type StepId = (typeof STEP_IDS)[number];

export type AssessmentAnswers = {
  destination: string;
  purpose: string;
  party: string;
  nationality: string;
  /** Country of residence, or "same" to reuse nationality. */
  residence: string;
  age: string;
  education: string;
  field: string;
  experience: string;
  jobOffer: string;
  income: string;
  savings: string;
  language: string;
  timeline: string;
  documents: string[];
  refusal: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type FactorVerdict = "strong" | "ok" | "weak";

export type ScoreFactor = {
  id: string;
  label: string;
  score: number;
  verdict: FactorVerdict;
  note: string;
};

export type SuggestedRoute = {
  name: string;
  why: string;
};

export type SummaryRow = {
  label: string;
  value: string;
};

export type ScoreBand = "strong" | "fixable" | "unlikely";

export type EligibilityReport = {
  id: string;
  createdAt: string;
  score: number;
  band: ScoreBand;
  bandLabel: string;
  headline: string;
  summary: string;
  weakest: { label: string; detail: string };
  factors: ScoreFactor[];
  routes: SuggestedRoute[];
  nextStep: string;
  flags: string[];
  disclaimer: string;
  person: { firstName: string; lastName: string; email: string };
  summaryRows: SummaryRow[];
  answers: AssessmentAnswers;
  /** Set by the API after the delivery attempt. */
  emailSent: boolean;
};
