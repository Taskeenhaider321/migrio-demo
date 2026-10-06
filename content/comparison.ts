export type ComparisonRow = {
  dimension: string;
  migrio: string;
  generic: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: "Who can sell",
    migrio: "Only immigration experts we verified by hand",
    generic: "Anyone who can write a convincing listing",
  },
  {
    dimension: "Scope",
    migrio: "Europe relocation only — no noise",
    generic: "Logos, spreadsheets and visas in one search",
  },
  {
    dimension: "First step",
    migrio: "Free AI plan score, free chat, free consultation",
    generic: "Pay before anyone looks at your case",
  },
  {
    dimension: "Your money",
    migrio: "Held until you confirm the work is done, with refund rights",
    generic: "Generic escrow with no immigration context",
  },
  {
    dimension: "Reviews",
    migrio: "Only from people who paid for an immigration order",
    generic: "Mixed across unrelated categories of work",
  },
  {
    dimension: "If you get stuck",
    migrio: "Community Q&A answered by verified experts",
    generic: "A support ticket queue",
  },
];

export const differentiators: {
  title: string;
  body: string;
  icon: "shield" | "compass" | "gift" | "lock" | "chat" | "dashboard";
}[] = [
  {
    title: "Verified by a human, not a checkbox",
    body: "Every expert’s licence, registration and immigration casework is checked by Migrio before their profile goes live — and re-checked every year.",
    icon: "shield",
  },
  {
    title: "Europe, immigration, nothing else",
    body: "No logo designers, no copywriters. Search 27 European destinations by country and visa route and you only see people who do this work.",
    icon: "compass",
  },
  {
    title: "The first step is genuinely free",
    body: "AI plan score, profile browsing, chat and your first consultation cost nothing. You pay when you decide to place an order, not before.",
    icon: "gift",
  },
  {
    title: "Your money is held, not handed over",
    body: "Payments sit in protected holding and are released only when you confirm the agreed work is complete. Refund rights apply if it isn’t.",
    icon: "lock",
  },
  {
    title: "Real reviews and a real community",
    body: "Reviews only come from people who paid for an order. Ask anything in the community Q&A and get answers from verified experts.",
    icon: "chat",
  },
  {
    title: "Experts get a practice, not just a listing",
    body: "An AI-built profile, a ready-made dashboard for chat, meetings, orders and invoices, and a stream of leads who already scored their plan.",
    icon: "dashboard",
  },
];
