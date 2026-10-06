export type Step = {
  number: string;
  title: string;
  body: string;
  note?: string;
};

export const seekerSteps: Step[] = [
  {
    number: "01",
    title: "Score your plan — free",
    body: "Answer a few questions and get an instant AI read on which European routes fit you and where your plan is weak.",
    note: "Free, ~2 minutes, no account needed",
  },
  {
    number: "02",
    title: "Talk to a verified expert — free",
    body: "Browse profiles with real reviews, chat for free, and book a free consultation with the advisor you trust.",
    note: "Free chat, free first consultation",
  },
  {
    number: "03",
    title: "Order with your money protected",
    body: "Agree the scope and price, pay into protected holding, and release the funds only when the work is done.",
    note: "Secure payment, invoices, refund rights",
  },
];

export const expertSteps: Step[] = [
  {
    number: "01",
    title: "Create your profile in minutes",
    body: "Paste your LinkedIn or company website and Migrio’s AI drafts your bio, specialisms, countries and packages. You edit and approve.",
    note: "Free to list",
  },
  {
    number: "02",
    title: "Get verified by a human",
    body: "Upload your registration and proof of recent casework. Our trust team checks it against the relevant regulator, usually within five working days.",
    note: "Verified badge on your profile",
  },
  {
    number: "03",
    title: "Take orders and get paid",
    body: "Qualified leads arrive with their plan already scored. Manage chat, meetings, orders and invoices from one dashboard.",
    note: "Commission on completed orders only",
  },
];

export const verificationSteps: Step[] = [
  {
    number: "01",
    title: "Identity",
    body: "Government ID for individual advisors, and company registration documents for firms. Checked against official registries.",
  },
  {
    number: "02",
    title: "Licence & registration",
    body: "Bar membership, regulator listing or professional body registration confirmed directly with the issuing authority, where one exists for that country.",
  },
  {
    number: "03",
    title: "Immigration track record",
    body: "Evidence of recent, relevant immigration casework in the countries and routes the expert wants to list.",
  },
  {
    number: "04",
    title: "Annual re-check",
    body: "Verification expires after twelve months. Experts who don’t re-verify lose the badge and drop out of verified search results.",
  },
];

export const aiScoreFactors: {
  label: string;
  body: string;
}[] = [
  {
    label: "Route fit",
    body: "Which visa and residency routes your profile realistically qualifies for in your target country.",
  },
  {
    label: "Qualifications",
    body: "Whether your degree, trade qualification or professional registration is recognised where you’re going.",
  },
  {
    label: "Income & funds",
    body: "How your income, savings and proof of means compare to the published thresholds for the route.",
  },
  {
    label: "Work history",
    body: "Whether your role, seniority and sector match shortage-occupation or skilled-worker criteria.",
  },
  {
    label: "Family & dependants",
    body: "Who you’re bringing, and the extra requirements that triggers for housing, income and documents.",
  },
  {
    label: "Timing & risk",
    body: "Realistic processing times, and the single weakest point most likely to cause a refusal.",
  },
];
