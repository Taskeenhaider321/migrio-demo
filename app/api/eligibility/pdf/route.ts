import { NextResponse } from "next/server";
import { createEligibilityReport } from "@/lib/eligibility/engine";
import { renderReportPdf } from "@/lib/eligibility/pdf";
import { validateAssessment } from "@/lib/eligibility/validate";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The report couldn’t be read." }, { status: 400 });
  }

  const source =
    body && typeof body === "object" && "answers" in body
      ? (body as { answers: unknown }).answers
      : body;

  const parsed = validateAssessment(source);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const report = await createEligibilityReport(parsed.answers);
  const pdf = await renderReportPdf(report);

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="migrio-eligibility-report.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
