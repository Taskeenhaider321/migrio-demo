import {
  ages,
  choiceLabel,
  countryBy,
  destinationLabel,
  documents as documentChoices,
  educations,
  experiences,
  fields,
  incomes,
  jobOffers,
  languages,
  parties,
  purposes,
  savings,
  timelines,
} from "@/content/eligibility";
import type {
  AssessmentAnswers,
  EligibilityReport,
  FactorVerdict,
  ScoreFactor,
  SuggestedRoute,
} from "@/lib/eligibility/types";

/**
 * Scoring seam. Today this is a deterministic model of the factors a European
 * eligibility read actually turns on (route, qualifications, offer, funds,
 * language, documents). `createEligibilityReport` calls an external engine
 * first when ELIGIBILITY_ENGINE_URL is set, and falls back to this one.
 */

const DISCLAIMER =
  "This is an automated estimate, not a visa decision, a government ruling, or legal advice. Requirements change, and a verified expert should pressure-test anything you plan to file.";

const ENGLISH_FRIENDLY = new Set(["ie", "nl", "se", "dk", "fi", "de", "at", "mt"]);

const SHORTAGE_FIELDS = new Set(["tech", "health", "engineering"]);

type Purpose = AssessmentAnswers["purpose"];

const WEIGHTS: Record<string, Record<string, number>> = {
  work: { route: 18, qualifications: 22, work: 28, funds: 10, language: 12, documents: 10 },
  study: { route: 16, qualifications: 30, work: 6, funds: 20, language: 16, documents: 12 },
  family: { route: 26, qualifications: 8, work: 10, funds: 20, language: 14, documents: 22 },
  nomad: { route: 18, qualifications: 8, work: 14, funds: 32, language: 12, documents: 16 },
  business: { route: 20, qualifications: 14, work: 22, funds: 24, language: 8, documents: 12 },
  retire: { route: 18, qualifications: 6, work: 6, funds: 38, language: 12, documents: 20 },
};

function verdict(score: number): FactorVerdict {
  if (score >= 75) return "strong";
  if (score >= 50) return "ok";
  return "weak";
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function residenceOf(answers: AssessmentAnswers): string {
  return answers.residence === "same" ? answers.nationality : answers.residence;
}

function movementBetween(nationality: string, destination: string): "free" | "facilitated" | "visa" {
  if (destination === "unsure") return "visa";
  const from = countryBy(nationality)?.movement;
  const to = countryBy(destination)?.movement;
  if (from === "eu" && to === "eu") return "free";
  if ((from === "eu" && to === "ch") || (from === "ch" && to === "eu") || (from === "ch" && to === "ch")) {
    return "facilitated";
  }
  return "visa";
}

function qualificationsScore(answers: AssessmentAnswers): number {
  const base: Record<string, number> = {
    doctorate: 95,
    master: 88,
    bachelor: 78,
    vocational: 62,
    secondary: 46,
  };
  let score = base[answers.education] ?? 50;
  if (
    SHORTAGE_FIELDS.has(answers.field) &&
    (answers.education === "bachelor" ||
      answers.education === "master" ||
      answers.education === "doctorate")
  ) {
    score += 4;
  }
  return clamp(score);
}

function workScore(answers: AssessmentAnswers): number {
  const offer: Record<string, number> = {
    "yes-destination": 96,
    "yes-remote": 68,
    interviewing: 48,
    no: 30,
  };
  const experience: Record<string, number> = {
    "8-plus": 90,
    "4-7": 78,
    "1-3": 60,
    "0-1": 40,
  };
  return clamp(
    (offer[answers.jobOffer] ?? 40) * 0.62 + (experience[answers.experience] ?? 50) * 0.38,
  );
}

function fundsScore(answers: AssessmentAnswers): number {
  const income: Record<string, number> = {
    "80-plus": 92,
    "50-80": 80,
    "30-50": 66,
    "18-30": 48,
    "under-18": 34,
    "prefer-not": 52,
  };
  const saved: Record<string, number> = {
    "12-plus": 92,
    "6-12": 76,
    "3-6": 55,
    "under-3": 34,
  };
  const savingsWeight =
    answers.purpose === "retire" || answers.purpose === "nomad" ? 0.7 : 0.45;
  return clamp(
    (income[answers.income] ?? 50) * (1 - savingsWeight) +
      (saved[answers.savings] ?? 50) * savingsWeight,
  );
}

function languageScore(answers: AssessmentAnswers): number {
  if (answers.language === "local") return 92;
  if (answers.language === "english") {
    return ENGLISH_FRIENDLY.has(answers.destination) ? 78 : 56;
  }
  if (answers.language === "basic") return 46;
  return 28;
}

function documentScore(answers: AssessmentAnswers): number {
  const unique = new Set(answers.documents);
  let score = Math.round((unique.size / documentChoices.length) * 100);
  if (!unique.has("passport")) score = Math.min(score, 36);
  if (unique.size === 0) score = 18;
  return clamp(score);
}

function routeScore(answers: AssessmentAnswers, movement: "free" | "facilitated" | "visa"): number {
  if (movement === "free") return 96;
  if (movement === "facilitated") return 84;

  let score = answers.destination === "unsure" ? 64 : 72;

  if (answers.purpose === "work" && answers.jobOffer === "no" && answers.education === "secondary") {
    score = 42;
  }
  if (answers.purpose === "work" && answers.jobOffer === "yes-destination") score += 10;
  if (answers.purpose === "retire" && (answers.age === "18-24" || answers.age === "25-34")) {
    score = 48;
  }
  if (answers.purpose === "family" && answers.party === "solo") score = 50;
  if (answers.purpose === "study" && answers.age === "55-plus") score -= 8;

  return clamp(score);
}

function suggestRoutes(
  answers: AssessmentAnswers,
  movement: "free" | "facilitated" | "visa",
): SuggestedRoute[] {
  if (movement === "free") {
    return [
      {
        name: "Registration, not a visa",
        why: "EU and EEA citizens generally register their residence instead of applying for a work or family visa.",
      },
    ];
  }
  if (movement === "facilitated") {
    return [
      {
        name: "Swiss–EU free movement",
        why: "The agreement is real, but registration, quotas in some cantons, and the order of steps still matter.",
      },
    ];
  }

  const degree =
    answers.education === "bachelor" ||
    answers.education === "master" ||
    answers.education === "doctorate";

  const byPurpose: Record<Purpose, SuggestedRoute[]> = {
    work: [
      degree
        ? {
            name: "EU Blue Card",
            why: "The usual route when a recognised degree meets a qualifying job offer and salary threshold.",
          }
        : {
            name: "Skilled worker permit",
            why: "Built for a concrete job offer plus a recognised qualification, including many vocational ones.",
          },
      answers.jobOffer === "yes-destination"
        ? {
            name: "Employer-sponsored permit",
            why: "A signed offer lets the employer start their side of the filing while you prepare documents.",
          }
        : {
            name: "Job-seeker or opportunity route",
            why: "A few countries let you search on the ground. Most still want the offer before a work visa.",
          },
    ],
    study: [
      {
        name: "Student residence permit",
        why: "Admission first, then a permit that hinges on funds, insurance, and a place to live.",
      },
    ],
    family: [
      {
        name: "Family reunification",
        why: "It follows the sponsor’s status. The relationship, housing, and income evidence do the heavy lifting.",
      },
    ],
    nomad: [
      {
        name: answers.destination === "pt" ? "Portugal D8" : "Digital nomad residence",
        why: "Remote income from outside the country, proven over several months, plus health insurance.",
      },
    ],
    business: [
      {
        name: "Start-up or entrepreneur visa",
        why: "A credible plan, funds, and sometimes a local approval. The company paperwork comes before the permit.",
      },
    ],
    retire: [
      {
        name: answers.destination === "pt" ? "Portugal D7" : "Passive-income residence",
        why: "Stable income or savings you can document, health cover, and a place to live. No local job required.",
      },
    ],
  };

  return (byPurpose[answers.purpose] ?? byPurpose.work).slice(0, 2);
}

function factorNote(
  id: string,
  answers: AssessmentAnswers,
  score: number,
): string {
  switch (id) {
    case "route":
      if (answers.destination === "unsure") {
        return "Without a country, this is a range. Naming a destination is what turns it into a real route.";
      }
      return score >= 75
        ? "The combination of country and reason to move lines up with a published route."
        : "This country and purpose can be combined, but it isn’t the straightforward version of the route.";
    case "qualifications":
      return score >= 75
        ? "Your level of study is the kind most skilled and study routes are written around."
        : "Several work routes expect a recognised degree or a vocational qualification on a shortage list.";
    case "work":
      if (answers.jobOffer === "yes-destination") {
        return "An offer in the destination country is the single strongest thing a work route can see.";
      }
      if (answers.jobOffer === "yes-remote") {
        return "Remote income helps nomad and passive routes. It rarely replaces a local contract for a work visa.";
      }
      return "Most work visas start from an offer. Searching first is normal — filing before you have one usually isn’t.";
    case "funds":
      if (answers.income === "prefer-not") {
        return "Income was left blank, so funds are scored cautiously. Passive and student routes live or die on this evidence.";
      }
      return score >= 75
        ? "Income and savings look like enough to document, which is what the file actually needs."
        : "Thin funds are the usual reason passive, nomad, and student files stall.";
    case "language":
      return score >= 75
        ? "Language isn’t likely to be the thing that blocks the file."
        : "Some permits and most day-to-day processes expect at least a working language. This is learnable before you file.";
    case "documents":
      return answers.documents.includes("passport")
        ? "You’re part-way there. The missing pieces are what an expert will ask for on the first call."
        : "A passport with enough validity left is the one document every route asks for first.";
    default:
      return "";
  }
}

function buildFactors(
  answers: AssessmentAnswers,
  movement: "free" | "facilitated" | "visa",
): ScoreFactor[] {
  const specs = [
    { id: "route", label: "Route fit", score: routeScore(answers, movement) },
    { id: "qualifications", label: "Qualifications", score: qualificationsScore(answers) },
    { id: "work", label: "Work situation", score: workScore(answers) },
    { id: "funds", label: "Funds", score: fundsScore(answers) },
    { id: "language", label: "Language", score: languageScore(answers) },
    { id: "documents", label: "Documents", score: documentScore(answers) },
  ];

  return specs.map((factor) => ({
    ...factor,
    verdict: verdict(factor.score),
    note: factorNote(factor.id, answers, factor.score),
  }));
}

function overallScore(answers: AssessmentAnswers, factors: ScoreFactor[]): number {
  const weights = WEIGHTS[answers.purpose] ?? WEIGHTS.work;
  const totalWeight = factors.reduce((sum, factor) => sum + (weights[factor.id] ?? 0), 0);
  const weighted = factors.reduce(
    (sum, factor) => sum + factor.score * (weights[factor.id] ?? 0),
    0,
  );
  return clamp(weighted / totalWeight);
}

export function scoreEligibility(answers: AssessmentAnswers): EligibilityReport {
  const residence = residenceOf(answers);
  const movement = movementBetween(answers.nationality, answers.destination);
  const factors = buildFactors(answers, movement);
  let score = overallScore(answers, factors);

  const flags: string[] = [];
  if (answers.refusal === "yes") {
    score = clamp(score - 8);
    flags.push(
      "A previous refusal doesn’t end a later application, but it has to be declared and explained. Don’t leave it for the form to surprise you.",
    );
  }
  if (residence === answers.destination && answers.destination !== "unsure") {
    score = clamp(score - 6);
    flags.push(
      "You may already be in the destination country. Some visas have to be filed from home, and switching from a tourist stay is a common reason files are refused.",
    );
  }
  if (movement === "free") {
    score = Math.max(score, 90);
    flags.push(
      "As an EU or EEA citizen you usually don’t apply for a visa to live in another member state. The work is registration, tax, and the order of practical steps.",
    );
  } else if (movement === "facilitated") {
    score = Math.max(score, 80);
  }

  const weakestFactor = [...factors].sort((a, b) => a.score - b.score)[0];
  const band = score >= 75 ? "strong" : score >= 52 ? "fixable" : "unlikely";
  const routes = suggestRoutes(answers, movement);
  const dest = destinationLabel(answers.destination);
  const purpose = choiceLabel(purposes, answers.purpose).toLowerCase();

  const bandLabel =
    band === "strong" ? "Strong fit" : band === "fixable" ? "Fixable gaps" : "Needs a better route";

  const headline =
    movement === "free"
      ? "You likely need registration, not a visa"
      : band === "strong"
        ? `Strong fit for the ${routes[0]?.name ?? "main route"}`
        : band === "fixable"
          ? `Promising, once ${weakestFactor.label.toLowerCase()} is stronger`
          : "This particular route is a stretch";

  const summary =
    movement === "free"
      ? `${answers.firstName}, moving to ${dest} looks open to you. The score reflects practical readiness — documents, timing, and money — rather than a visa hurdle.`
      : `${answers.firstName}, this scores ${score} out of 100 for a ${purpose} move${answers.destination === "unsure" ? " to Europe" : ` to ${dest}`}. It’s a read on fit, not a promise that an authority will say yes.`;

  const weakest =
    weakestFactor.score >= 75
      ? {
          label: weakestFactor.label,
          detail: `Nothing here is a red flag. The softest spot is ${weakestFactor.label.toLowerCase()}. ${weakestFactor.note}`,
        }
      : { label: weakestFactor.label, detail: weakestFactor.note };

  const nextStep =
    movement === "free"
      ? "Talk to a verified expert about the order of registration, housing, and tax — not about which visa to buy."
      : band === "strong"
        ? "Take this report to a verified expert and ask them to pressure-test the softest spot before anyone files."
        : band === "fixable"
          ? "A free first call is the right next step. Ask whether this gap is a delay or a reason to switch routes."
          : "Don’t pay for an application yet. Ask an expert which route fits this profile better, and take the report with you.";

  const documentValue =
    answers.documents.length === 0
      ? "None yet"
      : answers.documents
          .map((id) => choiceLabel(documentChoices, id))
          .join(", ");

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    score,
    band,
    bandLabel,
    headline,
    summary,
    weakest,
    factors,
    routes,
    nextStep,
    flags,
    disclaimer: DISCLAIMER,
    person: {
      firstName: answers.firstName,
      lastName: answers.lastName,
      email: answers.email,
    },
    summaryRows: [
      { label: "Destination", value: dest },
      { label: "Reason", value: choiceLabel(purposes, answers.purpose) },
      { label: "Who’s moving", value: choiceLabel(parties, answers.party) },
      { label: "Nationality", value: countryBy(answers.nationality)?.label ?? "—" },
      {
        label: "Lives in",
        value:
          answers.residence === "same"
            ? "Same as nationality"
            : (countryBy(answers.residence)?.label ?? "—"),
      },
      { label: "Age", value: choiceLabel(ages, answers.age) },
      { label: "Education", value: choiceLabel(educations, answers.education) },
      { label: "Field", value: choiceLabel(fields, answers.field) },
      { label: "Experience", value: choiceLabel(experiences, answers.experience) },
      { label: "Job offer", value: choiceLabel(jobOffers, answers.jobOffer) },
      { label: "Income", value: choiceLabel(incomes, answers.income) },
      { label: "Savings runway", value: choiceLabel(savings, answers.savings) },
      { label: "Language", value: choiceLabel(languages, answers.language) },
      { label: "Timing", value: choiceLabel(timelines, answers.timeline) },
      { label: "Documents in hand", value: documentValue },
      {
        label: "Previous refusal",
        value: answers.refusal === "yes" ? "Yes" : "No",
      },
    ],
    answers,
    emailSent: false,
  };
}

function isUsableReport(value: unknown): value is EligibilityReport {
  if (!value || typeof value !== "object") return false;
  const report = value as EligibilityReport;
  return (
    typeof report.score === "number" &&
    typeof report.headline === "string" &&
    typeof report.summary === "string" &&
    Array.isArray(report.factors) &&
    report.factors.every(
      (factor) =>
        typeof factor?.label === "string" &&
        typeof factor?.score === "number" &&
        (factor?.verdict === "strong" ||
          factor?.verdict === "ok" ||
          factor?.verdict === "weak"),
    ) &&
    Array.isArray(report.routes)
  );
}

/** Prefer a configured engine; always return a complete report. */
export async function createEligibilityReport(
  answers: AssessmentAnswers,
): Promise<EligibilityReport> {
  const local = scoreEligibility(answers);
  const endpoint = process.env.ELIGIBILITY_ENGINE_URL;

  if (!endpoint) return local;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answers }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Engine responded ${response.status}`);
    const remote: unknown = await response.json();
    if (!isUsableReport(remote)) throw new Error("Engine payload didn’t match the report shape");

    return {
      ...local,
      ...remote,
      id: local.id,
      createdAt: local.createdAt,
      person: local.person,
      answers: local.answers,
      summaryRows: remote.summaryRows?.length ? remote.summaryRows : local.summaryRows,
      disclaimer: remote.disclaimer || local.disclaimer,
      emailSent: false,
    };
  } catch (error) {
    console.error("[eligibility] external engine failed, using built-in", error);
    return local;
  }
}
