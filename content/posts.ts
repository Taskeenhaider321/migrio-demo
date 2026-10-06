export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: "Guides" | "Visas" | "Money" | "Hiring an expert";
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  author: string;
  authorRole: string;
  body: Block[];
};

/**
 * Seed SEO content. Replace or extend — the blog index, sitemap and
 * structured data all read from this array.
 */
export const posts: Post[] = [
  {
    slug: "how-to-choose-an-immigration-expert",
    title: "How to choose an immigration expert (and spot the ones to avoid)",
    description:
      "Nine questions that separate a genuine immigration specialist from a confident generalist, plus the red flags that should end the conversation.",
    category: "Hiring an expert",
    readingMinutes: 7,
    publishedAt: "2026-08-12",
    updatedAt: "2026-09-30",
    author: "Migrio Editorial",
    authorRole: "Migrio",
    body: [
      {
        type: "p",
        text: "Immigration advice is one of the few purchases where a bad supplier costs you more than money. A weak application can mean a refusal on your record, a wasted year, and a harder second attempt. That makes choosing the right person the single highest-leverage decision in your move.",
      },
      {
        type: "h2",
        text: "Ask about the route, not the country",
      },
      {
        type: "p",
        text: "Plenty of advisors can talk broadly about Germany. Far fewer have personally filed twenty EU Blue Card applications for software engineers with non-EU degrees. Ask how many of your exact route they handled in the last twelve months, and what the most common reason for refusal was.",
      },
      {
        type: "h2",
        text: "Nine questions worth asking on the free call",
      },
      {
        type: "ul",
        items: [
          "How many applications on this exact route did you file last year?",
          "What’s the most common reason this route gets refused?",
          "Looking at my situation, what’s my weakest point?",
          "What documents will you need from me, and by when?",
          "Who actually does the work — you, or someone on your team?",
          "What is and isn’t included in the price?",
          "What happens, and what does it cost, if we’re refused?",
          "What’s a realistic timeline from today to a decision?",
          "Are you registered with a regulator, and can I verify that?",
        ],
      },
      {
        type: "h2",
        text: "Red flags",
      },
      {
        type: "ul",
        items: [
          "A guaranteed outcome. Nobody can guarantee a government decision.",
          "Pressure to pay immediately, or to pay outside the platform.",
          "Vagueness about who holds the licence and in which country.",
          "No written scope of work before you pay.",
          "Reviews that are all five stars, all recent, and all one sentence.",
        ],
      },
      {
        type: "callout",
        text: "On Migrio, every expert’s registration and casework is checked by a human before their profile goes live, chat and the first consultation are free, and payment is held until you confirm the work is complete.",
      },
    ],
  },
  {
    slug: "eu-blue-card-2026-what-changed",
    title: "The EU Blue Card in 2026: what actually changed",
    description:
      "Lower salary thresholds, shorter contracts and easier intra-EU movement. A plain-English summary of the current Blue Card rules and who they help.",
    category: "Visas",
    readingMinutes: 6,
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    author: "Migrio Editorial",
    authorRole: "Migrio",
    body: [
      {
        type: "p",
        text: "The EU Blue Card is the bloc’s flagship route for skilled non-EU workers, and the version in force today is noticeably more generous than the one most online guides still describe.",
      },
      { type: "h2", text: "The headline changes" },
      {
        type: "ul",
        items: [
          "Shorter minimum contract length, which opens the route to fixed-term roles.",
          "Lower salary thresholds relative to the national average, with reduced floors for shortage occupations.",
          "Recognised professional experience can substitute for a degree in IT roles.",
          "Easier movement to a second EU country after a qualifying period in the first.",
          "Clearer, faster family reunification for spouses and children.",
        ],
      },
      { type: "h2", text: "Who this helps most" },
      {
        type: "p",
        text: "Self-taught and bootcamp-trained developers benefit most from the experience-instead-of-degree provision. People on two-year contracts, previously excluded by minimum-duration rules, are now in scope in several member states.",
      },
      {
        type: "callout",
        text: "Implementation differs by country. Thresholds, shortage lists and processing times are national, so check the rules for your specific destination before you plan around them.",
      },
      {
        type: "p",
        text: "If you’re not sure whether your degree is recognised or your salary clears the threshold, run a free AI plan score — it flags exactly which of these is your weak point before you talk to anyone.",
      },
    ],
  },
  {
    slug: "cost-of-relocating-to-europe",
    title: "What relocating to Europe actually costs in 2026",
    description:
      "A realistic budget covering visa fees, document legalisation, translation, flights, deposits and the first three months — with the costs people forget.",
    category: "Money",
    readingMinutes: 8,
    publishedAt: "2026-07-18",
    updatedAt: "2026-09-14",
    author: "Migrio Editorial",
    authorRole: "Migrio",
    body: [
      {
        type: "p",
        text: "Most people budget for the visa fee and the flight, then get caught out by everything in between. Here’s the fuller picture, based on what applicants actually report spending.",
      },
      { type: "h2", text: "Before you leave" },
      {
        type: "ul",
        items: [
          "Visa or permit application fee, per person including dependants.",
          "Apostille or legalisation of birth, marriage and degree certificates.",
          "Sworn translation of each document into the destination language.",
          "Degree recognition or statement of comparability, where required.",
          "Police clearance certificates from every country you’ve lived in.",
          "Medical insurance covering the gap before local cover starts.",
          "Professional fees, if you use an immigration advisor.",
        ],
      },
      { type: "h2", text: "The first three months" },
      {
        type: "ul",
        items: [
          "Rental deposit, typically one to three months' rent, plus agency fees.",
          "Proof-of-funds balance that must stay untouched in your account.",
          "Residence registration and residence-card issuance fees.",
          "Local bank account, tax number and health-insurance registration.",
          "Temporary accommodation while you search for a long-term rental.",
        ],
      },
      {
        type: "callout",
        text: "Proof-of-funds is the one that trips people up. It isn’t a fee — it’s money that must sit in your account, visible and unspent, often for several consecutive months before you apply.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export const postsByDate = [...posts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);
