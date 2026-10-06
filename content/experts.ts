export type Expert = {
  slug: string;
  name: string;
  /** Companies register as Experts, individuals as Advisors. */
  kind: "Expert" | "Advisor";
  headline: string;
  country: string;
  specialisms: string[];
  rating: number;
  reviews: number;
  /** Initials used by the avatar placeholder until real photos are supplied. */
  initials: string;
  responseTime: string;
  freeConsultation: boolean;
};

/**
 * PLACEHOLDER PROFILES — illustrative only. Replace with real, consented
 * expert data (and photos) before launch.
 */
export const featuredExperts: Expert[] = [
  {
    slug: "nordhaus-immigration",
    name: "Nordhaus Immigration",
    kind: "Expert",
    headline: "German Blue Card and skilled-worker visas for tech hires",
    country: "Germany",
    specialisms: ["EU Blue Card", "Skilled Worker", "Family reunification"],
    rating: 4.9,
    reviews: 214,
    initials: "NI",
    responseTime: "Replies in ~2h",
    freeConsultation: true,
  },
  {
    slug: "mariana-costa",
    name: "Mariana Costa",
    kind: "Advisor",
    headline: "Portugal D7, D8 and residency-by-income applications",
    country: "Portugal",
    specialisms: ["D7 visa", "Digital nomad D8", "NIF & banking"],
    rating: 5.0,
    reviews: 168,
    initials: "MC",
    responseTime: "Replies in ~1h",
    freeConsultation: true,
  },
  {
    slug: "de-vries-partners",
    name: "De Vries & Partners",
    kind: "Expert",
    headline: "Dutch highly skilled migrant permits and 30% ruling",
    country: "Netherlands",
    specialisms: ["HSM permit", "30% ruling", "Employer sponsorship"],
    rating: 4.8,
    reviews: 301,
    initials: "DV",
    responseTime: "Replies in ~3h",
    freeConsultation: true,
  },
  {
    slug: "aoife-brennan",
    name: "Aoife Brennan",
    kind: "Advisor",
    headline: "Irish critical skills permits and citizenship routes",
    country: "Ireland",
    specialisms: ["Critical Skills", "Stamp 4", "Naturalisation"],
    rating: 4.9,
    reviews: 97,
    initials: "AB",
    responseTime: "Replies in ~4h",
    freeConsultation: true,
  },
  {
    slug: "estudio-marin",
    name: "Estudio Marín",
    kind: "Expert",
    headline: "Spanish non-lucrative, digital nomad and entrepreneur visas",
    country: "Spain",
    specialisms: ["Non-lucrative", "Digital nomad", "Autónomo setup"],
    rating: 4.7,
    reviews: 142,
    initials: "EM",
    responseTime: "Replies in ~5h",
    freeConsultation: true,
  },
  {
    slug: "kaspar-tamm",
    name: "Kaspar Tamm",
    kind: "Advisor",
    headline: "Estonian e-residency, start-up visa and company formation",
    country: "Estonia",
    specialisms: ["Start-up visa", "e-Residency", "Company formation"],
    rating: 4.9,
    reviews: 73,
    initials: "KT",
    responseTime: "Replies in ~2h",
    freeConsultation: true,
  },
];

export const expertiseCategories = [
  { label: "Work & skilled-worker visas", count: 186 },
  { label: "Digital nomad & remote-work visas", count: 124 },
  { label: "Family reunification", count: 98 },
  { label: "Study & student permits", count: 87 },
  { label: "Permanent residency & citizenship", count: 142 },
  { label: "Business, start-up & investor routes", count: 76 },
  { label: "Appeals & refused applications", count: 54 },
  { label: "Relocation logistics & settling in", count: 112 },
];
