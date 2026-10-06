import {
  ages,
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
  countries,
} from "@/content/eligibility";
import {
  STEP_IDS,
  type AssessmentAnswers,
  type StepId,
} from "@/lib/eligibility/types";

const destinationIds = new Set([
  ...featuredDestinations.map((choice) => choice.id),
  ...otherDestinations.map((country) => country.id),
  "unsure",
]);

const countryIds = new Set(countries.map((country) => country.id));
const purposeIds = ids(purposes);
const partyIds = ids(parties);
const ageIds = ids(ages);
const educationIds = ids(educations);
const fieldIds = ids(fields);
const experienceIds = ids(experiences);
const offerIds = ids(jobOffers);
const incomeIds = ids(incomes);
const savingsIds = ids(savings);
const languageIds = ids(languages);
const timelineIds = ids(timelines);
const documentIds = ids(documents);
const refusalIds = ids(refusals);

function ids(choices: { id: string }[]): Set<string> {
  return new Set(choices.map((choice) => choice.id));
}

function oneOf(
  value: unknown,
  allowed: Set<string>,
  message: string,
): string | null {
  if (typeof value !== "string" || !allowed.has(value)) return message;
  return null;
}

export function validateStep(
  step: StepId,
  answers: Partial<AssessmentAnswers>,
): string | null {
  switch (step) {
    case "destination":
      return oneOf(
        answers.destination,
        destinationIds,
        "Choose the country you have in mind.",
      );
    case "purpose":
      return oneOf(answers.purpose, purposeIds, "Choose the main reason for the move.");
    case "party":
      return oneOf(answers.party, partyIds, "Tell us who’s making the move.");
    case "origin": {
      const nationality = oneOf(
        answers.nationality,
        countryIds,
        "Choose your nationality.",
      );
      if (nationality) return nationality;
      if (answers.residence === "same") return null;
      return oneOf(
        answers.residence,
        countryIds,
        "Choose the country you live in now.",
      );
    }
    case "background": {
      const age = oneOf(answers.age, ageIds, "Choose your age range.");
      if (age) return age;
      return oneOf(
        answers.education,
        educationIds,
        "Choose the highest level you’ve completed.",
      );
    }
    case "work": {
      const field = oneOf(answers.field, fieldIds, "Choose the field you work in.");
      if (field) return field;
      const experience = oneOf(
        answers.experience,
        experienceIds,
        "Choose how long you’ve been doing it.",
      );
      if (experience) return experience;
      return oneOf(
        answers.jobOffer,
        offerIds,
        "Tell us where a job offer stands.",
      );
    }
    case "means": {
      const income = oneOf(
        answers.income,
        incomeIds,
        "Choose the income band closest to yours.",
      );
      if (income) return income;
      const saved = oneOf(
        answers.savings,
        savingsIds,
        "Choose how long your savings would cover you.",
      );
      if (saved) return saved;
      return oneOf(
        answers.language,
        languageIds,
        "Choose the language option closest to you.",
      );
    }
    case "readiness": {
      const timeline = oneOf(
        answers.timeline,
        timelineIds,
        "Choose when you’d like to move.",
      );
      if (timeline) return timeline;
      if (!Array.isArray(answers.documents)) {
        return "Tell us which documents you already have.";
      }
      if (answers.documents.some((id) => !documentIds.has(id))) {
        return "Choose documents from the list.";
      }
      return oneOf(
        answers.refusal,
        refusalIds,
        "Tell us whether you’ve had a visa refusal.",
      );
    }
    case "score":
      return null;
    case "details":
      return validatePerson(answers);
    default:
      return "That step isn’t part of the assessment.";
  }
}

function validatePerson(answers: Partial<AssessmentAnswers>): string | null {
  const first = cleanName(answers.firstName);
  if (!first) return "Enter your first name.";
  const last = cleanName(answers.lastName);
  if (!last) return "Enter your last name.";
  const email = typeof answers.email === "string" ? answers.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) {
    return "Enter a valid email so we can send the report.";
  }
  return null;
}

function cleanName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length < 1 || name.length > 60) return null;
  if (!/^[\p{L}][\p{L}\s.'’-]*$/u.test(name)) return null;
  return name;
}

export function validateAssessment(
  input: unknown,
): { ok: true; answers: AssessmentAnswers } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "The assessment couldn’t be read." };
  }

  const raw = input as Partial<AssessmentAnswers> & { companyWebsite?: unknown };
  if (typeof raw.companyWebsite === "string" && raw.companyWebsite.trim() !== "") {
    return { ok: false, error: "The assessment couldn’t be read." };
  }

  const documents = Array.isArray(raw.documents)
    ? [...new Set(raw.documents.filter((id): id is string => typeof id === "string"))]
    : raw.documents;

  const candidate: Partial<AssessmentAnswers> = {
    ...raw,
    documents,
    firstName: cleanName(raw.firstName) ?? raw.firstName,
    lastName: cleanName(raw.lastName) ?? raw.lastName,
    email: typeof raw.email === "string" ? raw.email.trim() : raw.email,
  };

  for (const step of STEP_IDS) {
    const error = validateStep(step, candidate);
    if (error) return { ok: false, error };
  }

  return { ok: true, answers: candidate as AssessmentAnswers };
}

/** Score the assessment before a name and email have been collected. */
export function validateScoreInput(
  input: unknown,
): { ok: true; answers: AssessmentAnswers } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "The assessment couldn’t be read." };
  }

  const raw = input as Partial<AssessmentAnswers> & { companyWebsite?: unknown };
  if (typeof raw.companyWebsite === "string" && raw.companyWebsite.trim() !== "") {
    return { ok: false, error: "The assessment couldn’t be read." };
  }

  const documents = Array.isArray(raw.documents)
    ? [...new Set(raw.documents.filter((id): id is string => typeof id === "string"))]
    : [];

  const candidate: Partial<AssessmentAnswers> = {
    ...raw,
    documents,
    firstName: "You",
    lastName: "There",
    email: "preview@migrio.com",
  };

  for (const step of STEP_IDS) {
    if (step === "score" || step === "details") continue;
    const error = validateStep(step, candidate);
    if (error) return { ok: false, error };
  }

  return { ok: true, answers: candidate as AssessmentAnswers };
}
