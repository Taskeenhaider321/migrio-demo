"use client";

import { useState } from "react";
import { ScoreBar, ScoreRing } from "@/components/brand/ScoreRing";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { hub } from "@/lib/cta";
import { formatDate } from "@/lib/utils";
import { clearDraft, clearReport, getReportSnapshot, useIsClient } from "./storage";

export function DashboardView() {
  const isClient = useIsClient();
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const report = isClient ? getReportSnapshot() : null;

  if (!isClient) {
    return <div className="min-h-[50vh]" />;
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Eligibility dashboard
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl">No score in this browser yet</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Your report stays in the browser where you took the assessment, and in
          the email we send. Take the free assessment to generate one.
        </p>
        <ButtonLink
          href="/eligibility"
          size="lg"
          ctaId="dashboard_empty_start"
          intent="seeker"
          location="eligibility_dashboard"
          className="mt-8"
        >
          Check my eligibility
          <Icon name="arrowRight" className="size-4" />
        </ButtonLink>
      </div>
    );
  }

  async function downloadPdf() {
    if (!report) return;
    setPdfError(null);
    setPdfBusy(true);
    try {
      const response = await fetch("/api/eligibility/pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: report.answers }),
      });
      if (!response.ok) throw new Error("The PDF couldn’t be created. Try again in a moment.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "migrio-eligibility-report.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setPdfError(
        error instanceof Error ? error.message : "The PDF couldn’t be created.",
      );
    } finally {
      setPdfBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Your eligibility dashboard
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl">
        {report.person.firstName}, here’s your score
      </h1>
      <p className="mt-2 text-sm text-muted">{formatDate(report.createdAt)}</p>

      <div
        className={
          report.emailSent
            ? "mt-6 flex items-start gap-3 rounded-2xl border border-success/30 bg-success-tint px-4 py-3 text-sm text-success-ink"
            : "mt-6 flex items-start gap-3 rounded-2xl bg-warning-tint px-4 py-3 text-sm text-warning-ink"
        }
      >
        <Icon name="mail" className="mt-0.5 size-4 shrink-0" />
        <p>
          {report.emailSent
            ? `A copy of this report is on its way to ${report.person.email}.`
            : `Your score is ready here. We couldn’t email ${report.person.email} just now — download the PDF and keep this page open.`}
        </p>
      </div>

      <section className="mt-6 rounded-3xl border border-line bg-canvas p-5 shadow-lift sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <ScoreRing score={report.score} label="Eligibility score" size={148} />
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {report.bandLabel}
            </p>
            <h2 className="mt-2 text-2xl">{report.headline}</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {report.summary}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-accent-tint px-4 py-3 text-sm leading-relaxed text-title">
          <p className="font-semibold">Softest spot: {report.weakest.label}</p>
          <p className="mt-1">{report.weakest.detail}</p>
        </div>

        <div className="mt-6 grid gap-4">
          {report.factors.map((factor) => (
            <ScoreBar
              key={factor.id}
              label={factor.label}
              value={factor.score}
              verdict={factor.verdict}
            />
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="routes-heading">
        <h2 id="routes-heading" className="text-xl">
          Routes to look at
        </h2>
        <ul className="mt-4 grid gap-3">
          {report.routes.map((route) => (
            <li key={route.name} className="rounded-2xl border border-line bg-canvas px-4 py-3">
              <p className="font-semibold text-title">{route.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{route.why}</p>
            </li>
          ))}
        </ul>
      </section>

      {report.flags.length > 0 ? (
        <ul className="mt-6 space-y-2">
          {report.flags.map((flag) => (
            <li
              key={flag}
              className="flex items-start gap-2 text-sm leading-relaxed text-body"
            >
              <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-primary" />
              {flag}
            </li>
          ))}
        </ul>
      ) : null}

      <section className="mt-8 rounded-3xl bg-primary-tint px-5 py-5 sm:px-6">
        <h2 className="text-lg">Next step</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{report.nextStep}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => void downloadPdf()}
            disabled={pdfBusy}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-brand bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Icon name="file" className="size-4" />
            {pdfBusy ? "Preparing PDF…" : "Download PDF report"}
          </button>
          <ButtonLink
            href={hub.browseExperts("eligibility_dashboard", "find_expert")}
            external
            variant="secondary"
            ctaId="dashboard_find_expert"
            intent="seeker"
            location="eligibility_dashboard"
          >
            Find a verified expert
          </ButtonLink>
        </div>
        {pdfError ? (
          <p role="alert" className="mt-3 text-sm font-medium text-danger">
            {pdfError}
          </p>
        ) : null}
      </section>

      <section className="mt-8" aria-labelledby="answers-heading">
        <h2 id="answers-heading" className="text-xl">
          What you told us
        </h2>
        <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-canvas">
          {report.summaryRows.map((row) => (
            <div key={row.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="text-sm font-medium text-title">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-6 text-xs leading-relaxed text-muted">{report.disclaimer}</p>

      <p className="mt-6">
        <a
          href="/eligibility"
          className="text-sm font-semibold text-primary"
          onClick={() => {
            clearReport();
            clearDraft();
          }}
        >
          Retake the assessment
        </a>
      </p>
    </div>
  );
}
