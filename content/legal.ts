export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  description: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * TEMPLATE TEXT — written to be sensible and specific to how Migrio works,
 * but it is not legal advice and has not been reviewed by a lawyer. Have
 * counsel review and adapt all three documents before launch.
 */

export const privacyDoc: LegalDoc = {
  title: "Privacy policy",
  description:
    "How Migrio collects, uses, shares and protects your personal data, and the rights you have over it under the GDPR.",
  path: "/privacy",
  updated: "2026-09-30",
  intro:
    "This policy explains what personal data Migrio collects when you use migrio.com and hub.migrio.com, why we collect it, who we share it with, and the rights you have over it.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Migrio operates a marketplace connecting people relocating to Europe with verified immigration experts and advisors. For the data described in this policy, Migrio is the data controller. You can reach our privacy team at privacy@migrio.com.",
      ],
    },
    {
      heading: "What we collect",
      bullets: [
        "Account data: name, email address, password hash, country, and role (seeker, Expert or Advisor).",
        "Profile data for Experts and Advisors: company registration, professional licence details, qualifications, specialisms and the content of your public profile.",
        "Plan data: the answers you give to the AI plan score and any relocation details you choose to share.",
        "Transaction data: orders, invoices, and payment status. Card details are handled by our payment provider and are never stored by Migrio.",
        "Communications: messages, consultation bookings and support correspondence.",
        "Technical data: IP address, device and browser type, and pages visited, collected through cookies and similar technologies.",
      ],
    },
    {
      heading: "Why we use it, and our legal basis",
      bullets: [
        "To provide the service — performance of a contract with you.",
        "To verify Experts and Advisors — legitimate interest in marketplace safety, and legal obligation where applicable.",
        "To process payments, refunds and invoices — performance of a contract and legal obligation.",
        "To prevent fraud and abuse — legitimate interest.",
        "To send product and marketing email — consent, which you can withdraw at any time.",
        "To measure and improve the site — consent for non-essential analytics cookies.",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We share the minimum necessary with the expert you choose to engage, our payment provider, our hosting and infrastructure providers, our email and analytics providers, and professional advisers or authorities where the law requires it. We do not sell personal data.",
      ],
    },
    {
      heading: "Where your data is stored",
      paragraphs: [
        "Personal data is processed and stored within the European Union. Where a provider processes data outside the EU, we rely on adequacy decisions or Standard Contractual Clauses.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Account and profile data is kept while your account is active and for 12 months afterwards. Transaction records are kept for the period required by tax and accounting law, typically seven years. Message history tied to an order is kept for three years to support disputes. Analytics data is kept for 14 months.",
      ],
    },
    {
      heading: "Your rights",
      bullets: [
        "Access a copy of the personal data we hold about you.",
        "Correct data that is inaccurate or incomplete.",
        "Delete your data, where we have no overriding legal obligation to keep it.",
        "Restrict or object to processing based on legitimate interest.",
        "Port your data to another provider in a structured, machine-readable format.",
        "Withdraw consent at any time, without affecting processing that already happened.",
        "Complain to your national data protection authority.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "Data is encrypted in transit and at rest. Access to production systems is restricted, logged and reviewed. Documents you upload are visible only to you, the expert you share them with, and the small Migrio team that handles disputes.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We will post any changes on this page and update the date above. If a change materially affects your rights, we will tell you by email before it takes effect.",
      ],
    },
  ],
};

export const termsDoc: LegalDoc = {
  title: "Terms of service",
  description:
    "The terms that govern your use of Migrio, including orders, payments, refunds, verification and the limits of what Migrio is responsible for.",
  path: "/terms",
  updated: "2026-09-30",
  intro:
    "These terms govern your use of Migrio. By creating an account or placing an order you agree to them. Please read the sections on refunds and limitations carefully.",
  sections: [
    {
      heading: "Migrio is a marketplace, not a law firm",
      paragraphs: [
        "Migrio connects you with independent immigration experts and advisors. We verify them, host the platform and handle payment, but we do not provide immigration advice, and we are not a party to the professional relationship between you and the expert you engage. The expert is solely responsible for the advice and work they provide.",
      ],
    },
    {
      heading: "Accounts",
      bullets: [
        "You must be 18 or over and provide accurate information.",
        "Companies register as Experts; individual professionals register as Advisors.",
        "You are responsible for activity under your account and for keeping your credentials secure.",
        "We may suspend or close an account that breaches these terms or our content rules.",
      ],
    },
    {
      heading: "Verification",
      paragraphs: [
        "Verification means Migrio has checked the expert’s identity, registration or licence, and evidence of recent immigration casework against the relevant authority. It is a check of credentials, not a guarantee of the quality or outcome of any particular piece of work. Verification lapses after 12 months unless renewed.",
      ],
    },
    {
      heading: "Orders and payment",
      bullets: [
        "The scope and price of every order are agreed in writing before you pay.",
        "Payment is taken at the point of order and held in protected holding.",
        "Funds are released to the expert when you confirm the agreed work is complete, or when an approved milestone is delivered.",
        "Migrio charges the expert a commission on completed orders. Listing is free.",
      ],
    },
    {
      heading: "Refunds and disputes",
      bullets: [
        "You can open a dispute within 30 days of the delivery date, from the order screen.",
        "Grounds include work not delivered, work materially different from the agreed scope, or an unresponsive expert.",
        "A refusal by a national authority is not on its own grounds for a refund, because no expert can guarantee a government decision.",
        "The expert has five working days to respond. If no agreement is reached, Migrio reviews the order scope, message history and deliverables and decides.",
        "Approved refunds are returned to the original payment method, typically within 5–10 working days.",
      ],
    },
    {
      heading: "The AI plan score",
      paragraphs: [
        "The AI plan score is an automated estimate generated from the information you provide and from publicly documented immigration requirements. It is not legal advice, is not a prediction of any decision, and may be incomplete or out of date. Do not rely on it as your only basis for a decision.",
      ],
    },
    {
      heading: "Reviews and community content",
      bullets: [
        "Reviews may only be left by a user who placed and paid for a completed order.",
        "Experts cannot edit, buy or remove reviews.",
        "Migrio removes content only where it breaks our content rules or the law.",
        "You keep ownership of what you post, and grant Migrio a licence to display it on the platform.",
      ],
    },
    {
      heading: "Acceptable use",
      bullets: [
        "Do not take payment or move a client off-platform to avoid commission or payment protection.",
        "Do not misrepresent your qualifications, registration or track record.",
        "Do not upload unlawful content or anyone else’s personal data without a lawful basis.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the extent permitted by law, Migrio is not liable for the acts or omissions of experts, for the outcome of any immigration application, or for indirect or consequential loss. Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the law of the jurisdiction in which Migrio is established, without affecting any mandatory consumer protections available to you where you live.",
      ],
    },
  ],
};

export const cookiesDoc: LegalDoc = {
  title: "Cookie policy",
  description:
    "The cookies Migrio uses, what each category does, how long they last, and how to change your choices at any time.",
  path: "/cookies",
  updated: "2026-09-30",
  intro:
    "Cookies are small files stored on your device. We use a small number of them, and nothing beyond the strictly necessary ones runs until you consent.",
  sections: [
    {
      heading: "Strictly necessary",
      paragraphs: [
        "Required for the site to function: keeping you signed in on the hub, remembering your cookie choices, load balancing and protecting against fraud. These cannot be switched off and typically last from the session up to 12 months.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "Google Analytics 4, used to understand which pages help people and which don’t. These cookies measure page views, scroll depth, video plays and clicks on calls to action. They run only with your consent and last up to 14 months. Data is aggregated and IP addresses are truncated.",
      ],
    },
    {
      heading: "Marketing",
      paragraphs: [
        "If enabled, these measure the performance of advertising campaigns and let us show relevant ads on other platforms. They run only with your consent and last up to 12 months.",
      ],
    },
    {
      heading: "Changing your choices",
      paragraphs: [
        "Open the cookie settings link in the footer to change your consent at any time. You can also clear or block cookies in your browser settings, though blocking strictly necessary cookies will stop parts of the service from working.",
      ],
    },
    {
      heading: "Third parties",
      bullets: [
        "Google Analytics / Google Tag Manager — analytics and tag delivery.",
        "Our payment provider — fraud prevention on checkout.",
        "Our hosting provider — load balancing and security.",
      ],
    },
  ],
};
