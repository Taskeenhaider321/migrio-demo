export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  route: string;
  rating: number;
  initials: string;
};

/**
 * PLACEHOLDER TESTIMONIALS — replace with real, written-consent quotes.
 */
export const seekerTestimonials: Testimonial[] = [
  {
    quote:
      "I’d already wasted money on a generic freelancer who had never filed a German application. Migrio’s expert spotted two missing documents on the free call.",
    name: "Priya R.",
    role: "Data engineer, moved from Bengaluru",
    route: "India → Germany, EU Blue Card",
    rating: 5,
    initials: "PR",
  },
  {
    quote:
      "The AI score told me my income evidence was the weak point before I paid anyone. That one screen saved me a rejected D7.",
    name: "Tom H.",
    role: "Freelance designer",
    route: "UK → Portugal, D7 visa",
    rating: 5,
    initials: "TH",
  },
  {
    quote:
      "Chatting was free, so I spoke to three advisors before choosing. Payment sat in escrow until my permit was approved.",
    name: "Sofia M.",
    role: "Product manager",
    route: "Brazil → Netherlands, HSM permit",
    rating: 5,
    initials: "SM",
  },
  {
    quote:
      "Knowing every profile had been checked by a human is the only reason I used a marketplace at all for something this important.",
    name: "Daniel K.",
    role: "Mechanical engineer",
    route: "Turkey → Ireland, Critical Skills",
    rating: 5,
    initials: "DK",
  },
];

export const expertTestimonials: Testimonial[] = [
  {
    quote:
      "The leads actually know what they want. People arrive with an AI plan score already attached, so the first call is substantive.",
    name: "Lena Fischer",
    role: "Managing partner",
    route: "Nordhaus Immigration, Berlin",
    rating: 5,
    initials: "LF",
  },
  {
    quote:
      "My profile was built from my LinkedIn in under ten minutes. I didn’t write a single paragraph of marketing copy.",
    name: "Kaspar Tamm",
    role: "Independent advisor",
    route: "Tallinn, Estonia",
    rating: 5,
    initials: "KT",
  },
  {
    quote:
      "Orders, meetings, chat and invoices in one dashboard. I stopped running my practice out of a spreadsheet and an inbox.",
    name: "Mariana Costa",
    role: "Immigration advisor",
    route: "Lisbon, Portugal",
    rating: 5,
    initials: "MC",
  },
];
