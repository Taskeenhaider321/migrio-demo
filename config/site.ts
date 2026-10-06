/**
 * Single source of truth for everything that is "the Migrio marketing site":
 * URLs, navigation, contact details and social profiles.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://migrio.com"
).replace(/\/$/, "");

const hubUrl = (
  process.env.NEXT_PUBLIC_HUB_URL ?? "https://hub.migrio.com"
).replace(/\/$/, "");

export const site = {
  name: "Migrio",
  legalName: "Migrio",
  url: siteUrl,
  hubUrl,
  tagline: "Verified immigration experts for moving to Europe",
  description:
    "Migrio is a marketplace of manually verified immigration experts and advisors for people relocating to Europe. Free AI plan score, free consultation, protected payments.",
  locale: "en",
  twitterHandle: "@migrio",
  email: "hello@migrio.com",
  supportEmail: "support@migrio.com",
  pressEmail: "press@migrio.com",
  address: {
    street: "Add street address",
    city: "Amsterdam",
    postalCode: "0000 AA",
    country: "NL",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/migrio",
    x: "https://x.com/migrio",
    instagram: "https://www.instagram.com/migrio",
    youtube: "https://www.youtube.com/@migrio",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  {
    label: "For seekers",
    href: "/for-seekers",
    description: "Find and hire a verified immigration expert",
  },
  {
    label: "For experts",
    href: "/for-experts",
    description: "Join Migrio as an expert company or advisor",
  },
  {
    label: "How it works",
    href: "/how-it-works",
    description: "Three steps from plan to approved application",
  },
  {
    label: "Trust & safety",
    href: "/trust-and-safety",
    description: "Verification, protected payments and refunds",
  },
  {
    label: "AI plan score",
    href: "/ai-score",
    description: "Instant, free read on your relocation plan",
  },
  { label: "Blog", href: "/blog", description: "Guides and relocation news" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "How it works", href: "/how-it-works" },
      { label: "AI plan score", href: "/ai-score" },
      { label: "Trust & safety", href: "/trust-and-safety" },
      { label: "For seekers", href: "/for-seekers" },
      { label: "For experts & advisors", href: "/for-experts" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog & resources", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
    ],
  },
];
