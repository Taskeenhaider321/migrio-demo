export type Stat = {
  value: string;
  label: string;
  detail?: string;
};

/**
 * PLACEHOLDER NUMBERS — replace with real figures before launch.
 * See README "Assets you need to supply".
 */
export const trustStats: Stat[] = [
  {
    value: "480+",
    label: "Verified experts",
    detail: "Companies and independent advisors, checked one by one",
  },
  {
    value: "27",
    label: "European countries",
    detail: "From Portugal to Estonia, covered end to end",
  },
  {
    value: "4.9/5",
    label: "Average rating",
    detail: "From 3,100+ reviews left by people who actually relocated",
  },
  {
    value: "100%",
    label: "Payments protected",
    detail: "Funds held until you confirm the work is done",
  },
];

export const expertStats: Stat[] = [
  {
    value: "12k+",
    label: "Qualified leads a month",
    detail: "People actively planning a move, not window shoppers",
  },
  {
    value: "8 min",
    label: "To a complete profile",
    detail: "AI builds it from your LinkedIn or website",
  },
  {
    value: "0%",
    label: "Listing fee",
    detail: "You only pay when you get paid",
  },
];

export const countries = [
  "Germany",
  "Netherlands",
  "Portugal",
  "Spain",
  "France",
  "Italy",
  "Ireland",
  "Poland",
  "Sweden",
  "Denmark",
  "Austria",
  "Belgium",
  "Czechia",
  "Estonia",
  "Finland",
  "Greece",
  "Norway",
  "Switzerland",
];
