import { NextResponse } from "next/server";
import { scoreEligibility } from "@/lib/eligibility/engine";
import { validateScoreInput } from "@/lib/eligibility/validate";

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

  const parsed = validateScoreInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const report = scoreEligibility(parsed.answers);
  return NextResponse.json({
    profile: {
      score: report.score,
      band: report.band,
      bandLabel: report.bandLabel,
      headline: report.headline,
    },
  });
}
