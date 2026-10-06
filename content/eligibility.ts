/**
 * Questions for the free AI eligibility assessment.
 * Option ids are the contract with the scoring engine — keep them stable.
 */

export type Choice = {
  id: string;
  label: string;
  hint?: string;
};

export type Country = {
  id: string;
  label: string;
  region: "Europe" | "Americas" | "Asia" | "Africa" | "Oceania" | "Other";
  /** EU/EEA free movement, Swiss facilitated movement, or none. */
  movement: "eu" | "ch" | "none";
};

export const featuredDestinations: Choice[] = [
  { id: "de", label: "Germany" },
  { id: "nl", label: "Netherlands" },
  { id: "pt", label: "Portugal" },
  { id: "es", label: "Spain" },
  { id: "fr", label: "France" },
  { id: "ie", label: "Ireland" },
  { id: "it", label: "Italy" },
  { id: "se", label: "Sweden" },
];

export const purposes: Choice[] = [
  {
    id: "work",
    label: "Work",
    hint: "A job, a contract, or skilled work you’re aiming for",
  },
  {
    id: "study",
    label: "Study",
    hint: "University, college, or a long course",
  },
  {
    id: "family",
    label: "Family",
    hint: "Joining a partner or close family already there",
  },
  {
    id: "nomad",
    label: "Remote work",
    hint: "You keep a job or clients outside the destination",
  },
  {
    id: "business",
    label: "Start a business",
    hint: "Moving or founding a company",
  },
  {
    id: "retire",
    label: "Retire or slow down",
    hint: "Living on savings or passive income",
  },
];

export const parties: Choice[] = [
  { id: "solo", label: "Just me" },
  { id: "partner", label: "Me and a partner" },
  { id: "children", label: "Me and children" },
  { id: "family", label: "My whole family" },
];

export const ages: Choice[] = [
  { id: "18-24", label: "18–24" },
  { id: "25-34", label: "25–34" },
  { id: "35-44", label: "35–44" },
  { id: "45-54", label: "45–54" },
  { id: "55-plus", label: "55+" },
];

export const educations: Choice[] = [
  { id: "secondary", label: "Secondary school" },
  { id: "vocational", label: "Vocational / trade" },
  { id: "bachelor", label: "Bachelor’s degree" },
  { id: "master", label: "Master’s degree" },
  { id: "doctorate", label: "Doctorate" },
];

export const fields: Choice[] = [
  { id: "tech", label: "Tech" },
  { id: "health", label: "Health" },
  { id: "engineering", label: "Engineering" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "trades", label: "Trades" },
  { id: "hospitality", label: "Hospitality" },
  { id: "other", label: "Something else" },
];

export const experiences: Choice[] = [
  { id: "0-1", label: "Under a year" },
  { id: "1-3", label: "1–3 years" },
  { id: "4-7", label: "4–7 years" },
  { id: "8-plus", label: "8+ years" },
];

export const jobOffers: Choice[] = [
  {
    id: "yes-destination",
    label: "Yes, in that country",
    hint: "A concrete offer or signed contract",
  },
  {
    id: "yes-remote",
    label: "Yes, but the job stays abroad",
    hint: "Remote employment or your own clients",
  },
  {
    id: "interviewing",
    label: "Not yet — I’m interviewing",
  },
  { id: "no", label: "No offer right now" },
];

export const incomes: Choice[] = [
  { id: "under-18", label: "Under €18k" },
  { id: "18-30", label: "€18–30k" },
  { id: "30-50", label: "€30–50k" },
  { id: "50-80", label: "€50–80k" },
  { id: "80-plus", label: "Over €80k" },
  { id: "prefer-not", label: "Prefer not to say" },
];

export const savings: Choice[] = [
  { id: "under-3", label: "Under 3 months" },
  { id: "3-6", label: "3–6 months" },
  { id: "6-12", label: "6–12 months" },
  { id: "12-plus", label: "Over a year" },
];

export const languages: Choice[] = [
  { id: "local", label: "Comfortable in the local language" },
  { id: "english", label: "Fine in English, still learning the local one" },
  { id: "basic", label: "Only the basics" },
  { id: "none", label: "Not yet" },
];

export const timelines: Choice[] = [
  { id: "asap", label: "As soon as I can" },
  { id: "3-months", label: "Within 3 months" },
  { id: "6-months", label: "Within 6 months" },
  { id: "year-plus", label: "This year or later" },
];

export const documents: Choice[] = [
  { id: "passport", label: "Passport, valid 12+ months" },
  { id: "degree", label: "Degree certificates" },
  { id: "employment", label: "Employment or client contracts" },
  { id: "funds", label: "Proof of savings or income" },
  { id: "police", label: "Police clearance" },
];

export const refusals: Choice[] = [
  { id: "no", label: "No" },
  { id: "yes", label: "Yes, I’ve been refused before" },
];

export const countries: Country[] = [
  { id: "at", label: "Austria", region: "Europe", movement: "eu" },
  { id: "be", label: "Belgium", region: "Europe", movement: "eu" },
  { id: "bg", label: "Bulgaria", region: "Europe", movement: "eu" },
  { id: "hr", label: "Croatia", region: "Europe", movement: "eu" },
  { id: "cy", label: "Cyprus", region: "Europe", movement: "eu" },
  { id: "cz", label: "Czechia", region: "Europe", movement: "eu" },
  { id: "dk", label: "Denmark", region: "Europe", movement: "eu" },
  { id: "ee", label: "Estonia", region: "Europe", movement: "eu" },
  { id: "fi", label: "Finland", region: "Europe", movement: "eu" },
  { id: "fr", label: "France", region: "Europe", movement: "eu" },
  { id: "de", label: "Germany", region: "Europe", movement: "eu" },
  { id: "gr", label: "Greece", region: "Europe", movement: "eu" },
  { id: "hu", label: "Hungary", region: "Europe", movement: "eu" },
  { id: "is", label: "Iceland", region: "Europe", movement: "eu" },
  { id: "ie", label: "Ireland", region: "Europe", movement: "eu" },
  { id: "it", label: "Italy", region: "Europe", movement: "eu" },
  { id: "lv", label: "Latvia", region: "Europe", movement: "eu" },
  { id: "li", label: "Liechtenstein", region: "Europe", movement: "eu" },
  { id: "lt", label: "Lithuania", region: "Europe", movement: "eu" },
  { id: "lu", label: "Luxembourg", region: "Europe", movement: "eu" },
  { id: "mt", label: "Malta", region: "Europe", movement: "eu" },
  { id: "nl", label: "Netherlands", region: "Europe", movement: "eu" },
  { id: "no", label: "Norway", region: "Europe", movement: "eu" },
  { id: "pl", label: "Poland", region: "Europe", movement: "eu" },
  { id: "pt", label: "Portugal", region: "Europe", movement: "eu" },
  { id: "ro", label: "Romania", region: "Europe", movement: "eu" },
  { id: "sk", label: "Slovakia", region: "Europe", movement: "eu" },
  { id: "si", label: "Slovenia", region: "Europe", movement: "eu" },
  { id: "es", label: "Spain", region: "Europe", movement: "eu" },
  { id: "se", label: "Sweden", region: "Europe", movement: "eu" },
  { id: "ch", label: "Switzerland", region: "Europe", movement: "ch" },
  { id: "gb", label: "United Kingdom", region: "Europe", movement: "none" },
  { id: "ua", label: "Ukraine", region: "Europe", movement: "none" },
  { id: "tr", label: "Turkey", region: "Europe", movement: "none" },
  { id: "us", label: "United States", region: "Americas", movement: "none" },
  { id: "ca", label: "Canada", region: "Americas", movement: "none" },
  { id: "mx", label: "Mexico", region: "Americas", movement: "none" },
  { id: "br", label: "Brazil", region: "Americas", movement: "none" },
  { id: "ar", label: "Argentina", region: "Americas", movement: "none" },
  { id: "co", label: "Colombia", region: "Americas", movement: "none" },
  { id: "in", label: "India", region: "Asia", movement: "none" },
  { id: "pk", label: "Pakistan", region: "Asia", movement: "none" },
  { id: "bd", label: "Bangladesh", region: "Asia", movement: "none" },
  { id: "cn", label: "China", region: "Asia", movement: "none" },
  { id: "jp", label: "Japan", region: "Asia", movement: "none" },
  { id: "kr", label: "South Korea", region: "Asia", movement: "none" },
  { id: "ph", label: "Philippines", region: "Asia", movement: "none" },
  { id: "vn", label: "Vietnam", region: "Asia", movement: "none" },
  { id: "id", label: "Indonesia", region: "Asia", movement: "none" },
  { id: "np", label: "Nepal", region: "Asia", movement: "none" },
  { id: "lk", label: "Sri Lanka", region: "Asia", movement: "none" },
  { id: "ng", label: "Nigeria", region: "Africa", movement: "none" },
  { id: "gh", label: "Ghana", region: "Africa", movement: "none" },
  { id: "ke", label: "Kenya", region: "Africa", movement: "none" },
  { id: "za", label: "South Africa", region: "Africa", movement: "none" },
  { id: "eg", label: "Egypt", region: "Africa", movement: "none" },
  { id: "ma", label: "Morocco", region: "Africa", movement: "none" },
  { id: "dz", label: "Algeria", region: "Africa", movement: "none" },
  { id: "tn", label: "Tunisia", region: "Africa", movement: "none" },
  { id: "au", label: "Australia", region: "Oceania", movement: "none" },
  { id: "nz", label: "New Zealand", region: "Oceania", movement: "none" },
  { id: "other", label: "My country isn’t listed", region: "Other", movement: "none" },
];

const countryById = new Map(countries.map((country) => [country.id, country]));

export function countryBy(id: string): Country | undefined {
  return countryById.get(id);
}

export function choiceLabel(choices: Choice[], id: string | undefined): string {
  return choices.find((choice) => choice.id === id)?.label ?? "Not answered";
}

/** Destinations that can actually be scored, including "not sure". */
export function destinationLabel(id: string | undefined): string {
  if (id === "unsure") return "Not sure yet";
  return countryBy(id ?? "")?.label ?? "Not answered";
}

export const otherDestinations = countries.filter(
  (country) =>
    country.region === "Europe" &&
    country.id !== "gb" &&
    country.id !== "ua" &&
    country.id !== "tr" &&
    !featuredDestinations.some((featured) => featured.id === country.id),
);
