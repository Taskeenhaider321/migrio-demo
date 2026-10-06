export type HeroCopy = {
  id: string;
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  subline: string;
};

/**
 * Three tested angles on the same promise. Swap `activeHero` to run a
 * different one — nothing else in the codebase needs to change.
 */
export const heroVariants: Record<string, HeroCopy> = {
  verified: {
    id: "verified",
    eyebrow: "Immigration experts for Europe — verified by hand",
    headline: "Move to Europe with an expert",
    headlineHighlight: "we’ve already verified",
    subline:
      "Immigration only. Every advisor is manually checked by Migrio. Start free with an AI score on your plan, then talk to someone who has done it before.",
  },
  focused: {
    id: "focused",
    eyebrow: "The Europe relocation marketplace",
    headline: "The marketplace for moving to Europe",
    headlineHighlight: "and nothing else",
    subline:
      "No freelancer noise. Just verified immigration experts, a free score on your plan, and payments held safe until the work is done.",
  },
  risk: {
    id: "risk",
    eyebrow: "Verified immigration experts, Europe only",
    headline: "Don’t gamble your visa on",
    headlineHighlight: "a random freelancer",
    subline:
      "Migrio verifies every immigration expert by hand. Your first step costs nothing: AI plan score, consultation and chat are all free.",
  },
};

export const activeHero: HeroCopy = heroVariants.verified;
