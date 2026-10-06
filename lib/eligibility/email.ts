import type { EligibilityReport } from "@/lib/eligibility/types";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export function reportEmail(report: EligibilityReport): {
  subject: string;
  text: string;
  html: string;
} {
  const name = `${report.person.firstName} ${report.person.lastName}`;
  const subject = `Your Migrio eligibility score: ${report.score}/100`;

  const factorLines = report.factors
    .map((factor) => `${factor.label}: ${factor.score}/100 — ${factor.note}`)
    .join("\n");
  const routeLines = report.routes
    .map((route) => `${route.name}: ${route.why}`)
    .join("\n");
  const flagLines = report.flags.map((flag) => `- ${flag}`).join("\n");

  const text = [
    `Hi ${report.person.firstName},`,
    "",
    `Your free Migrio eligibility score is ${report.score}/100 (${report.bandLabel}).`,
    report.headline,
    "",
    report.summary,
    "",
    `Softest spot: ${report.weakest.label}. ${report.weakest.detail}`,
    "",
    "Factors",
    factorLines,
    "",
    "Routes to look at",
    routeLines,
    "",
    flagLines,
    "",
    `Next step: ${report.nextStep}`,
    "",
    report.disclaimer,
    "",
    "— Migrio",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const factorsHtml = report.factors
    .map(
      (factor) =>
        `<li><strong>${escapeHtml(factor.label)}</strong> — ${factor.score}/100<br>${escapeHtml(factor.note)}</li>`,
    )
    .join("");
  const routesHtml = report.routes
    .map(
      (route) =>
        `<li><strong>${escapeHtml(route.name)}</strong> — ${escapeHtml(route.why)}</li>`,
    )
    .join("");
  const flagsHtml = report.flags
    .map((flag) => `<li>${escapeHtml(flag)}</li>`)
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f7f7fa;font-family:Poppins,Segoe UI,sans-serif;color:#222;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;">
      <tr><td>
        <p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#4e46b4;font-weight:600;">Migrio</p>
        <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;">${report.score}<span style="font-size:16px;color:#666;">/100</span></h1>
        <p style="margin:4px 0 0;font-weight:600;">${escapeHtml(report.bandLabel)}</p>
        <h2 style="margin:16px 0 0;font-size:20px;">${escapeHtml(report.headline)}</h2>
        <p style="line-height:1.5;">Hi ${escapeHtml(report.person.firstName)},</p>
        <p style="line-height:1.5;">${escapeHtml(report.summary)}</p>
        <p style="line-height:1.5;background:#fff4f1;border-radius:12px;padding:12px 14px;"><strong>Softest spot: ${escapeHtml(report.weakest.label)}.</strong> ${escapeHtml(report.weakest.detail)}</p>
        <h3>How the score breaks down</h3>
        <ul style="line-height:1.5;padding-left:18px;">${factorsHtml}</ul>
        <h3>Routes to look at</h3>
        <ul style="line-height:1.5;padding-left:18px;">${routesHtml}</ul>
        ${flagsHtml ? `<ul style="line-height:1.5;padding-left:18px;">${flagsHtml}</ul>` : ""}
        <p style="line-height:1.5;"><strong>Next step.</strong> ${escapeHtml(report.nextStep)}</p>
        <p style="font-size:12px;line-height:1.5;color:#666;">${escapeHtml(report.disclaimer)}</p>
        <p style="font-size:12px;color:#666;">Prepared for ${escapeHtml(name)}.</p>
      </td></tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

export async function deliverReport(report: EligibilityReport): Promise<boolean> {
  const webhook = process.env.ELIGIBILITY_WEBHOOK_URL;
  const email = reportEmail(report);

  if (!webhook) {
    console.info("[eligibility] no ELIGIBILITY_WEBHOOK_URL set", {
      email: report.person.email,
      score: report.score,
      band: report.band,
    });
    return false;
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "eligibility_report",
        to: report.person.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
        report: {
          id: report.id,
          score: report.score,
          band: report.band,
          headline: report.headline,
          summary: report.summary,
        },
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.error("[eligibility] webhook responded", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[eligibility] webhook failed", error);
    return false;
  }
}
