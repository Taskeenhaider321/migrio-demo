import { useSyncExternalStore } from "react";
import type { AssessmentAnswers, EligibilityReport } from "@/lib/eligibility/types";

const REPORT_KEY = "migrio.eligibility.report";
const DRAFT_KEY = "migrio.eligibility.draft";

/** True only after hydration, so session storage can be read without a mismatch. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export type AssessmentDraft = {
  step: number;
  answers: Partial<AssessmentAnswers>;
};

let draftRaw: string | null | undefined;
let draftCache: AssessmentDraft | null = null;

function parseDraft(raw: string | null): AssessmentDraft | null {
  const draft = raw ? readRaw<AssessmentDraft>(raw) : null;
  if (!draft || typeof draft.step !== "number" || typeof draft.answers !== "object") {
    return null;
  }
  return draft;
}

/** Stable until the stored draft string changes. Safe to call during render. */
export function getDraftSnapshot(): AssessmentDraft | null {
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (raw === draftRaw) return draftCache;
  draftRaw = raw;
  draftCache = parseDraft(raw);
  return draftCache;
}

function readRaw<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveDraft(draft: AssessmentDraft): void {
  try {
    const raw = JSON.stringify(draft);
    sessionStorage.setItem(DRAFT_KEY, raw);
    draftRaw = raw;
    draftCache = draft;
  } catch {
    // Private mode can refuse storage. The assessment still works in memory.
  }
}

export function clearDraft(): void {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
    draftRaw = null;
    draftCache = null;
  } catch {
    // Ignore.
  }
}

export function saveReport(report: EligibilityReport): void {
  try {
    const raw = JSON.stringify(report);
    sessionStorage.setItem(REPORT_KEY, raw);
    reportRaw = raw;
    reportCache = report;
  } catch {
    // The dashboard will show its empty state and the email still holds the result.
  }
}

let reportRaw: string | null | undefined;
let reportCache: EligibilityReport | null = null;

/** Stable until the stored report string changes. Safe to call during render. */
export function getReportSnapshot(): EligibilityReport | null {
  const raw = sessionStorage.getItem(REPORT_KEY);
  if (raw === reportRaw) return reportCache;
  reportRaw = raw;
  const report = raw ? readRaw<EligibilityReport>(raw) : null;
  reportCache =
    report && typeof report.score === "number" && report.person?.email ? report : null;
  return reportCache;
}

export function clearReport(): void {
  try {
    sessionStorage.removeItem(REPORT_KEY);
    reportRaw = null;
    reportCache = null;
  } catch {
    // Ignore.
  }
}
