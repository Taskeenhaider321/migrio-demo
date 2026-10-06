import { NextResponse } from "next/server";
import { createEligibilityReport } from "@/lib/eligibility/engine";
import { deliverReport } from "@/lib/eligibility/email";
import { validateAssessment } from "@/lib/eligibility/validate";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The assessment couldn’t be read." },
      { status: 400 },
    );
  }

  const parsed = validateAssessment(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const report = await createEligibilityReport(parsed.answers);
  const emailSent = await deliverReport(report);

  return NextResponse.json({ report: { ...report, emailSent } });
}
