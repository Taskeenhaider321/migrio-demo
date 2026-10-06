export type CommunityThread = {
  question: string;
  excerpt: string;
  answeredBy: string;
  answeredByRole: string;
  country: string;
  answers: number;
};

/**
 * PLACEHOLDER THREADS — swap for a live feed from the hub’s community API,
 * or for real, consented excerpts.
 */
export const communityThreads: CommunityThread[] = [
  {
    question: "Does a UK degree still count for the German Blue Card?",
    excerpt:
      "Yes, but it has to appear in the anabin database as equivalent, or you need a statement of comparability from ZAB. Check anabin before you pay for anything else.",
    answeredBy: "Lena Fischer",
    answeredByRole: "Verified Expert",
    country: "Germany",
    answers: 12,
  },
  {
    question: "Can I apply for the Portugal D8 while already in Portugal?",
    excerpt:
      "Generally no — the D8 is applied for at the consulate in your country of residence. Entering as a tourist first and switching is the single most common reason these get refused.",
    answeredBy: "Mariana Costa",
    answeredByRole: "Verified Advisor",
    country: "Portugal",
    answers: 24,
  },
  {
    question: "How long does the Dutch 30% ruling take after the permit?",
    excerpt:
      "File within four months of your start date and it backdates to day one. After that window you only get it from the month of application, so this is worth prioritising.",
    answeredBy: "De Vries & Partners",
    answeredByRole: "Verified Expert",
    country: "Netherlands",
    answers: 8,
  },
];
