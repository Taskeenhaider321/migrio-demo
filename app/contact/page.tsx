import { site } from "@/config/site";
import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

import { PageHero } from "@/sections/PageHero";

const CAMPAIGN = "contact";
const PATH = "/contact";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

const channels: {
  icon: IconName;
  title: string;
  body: string;
  action: { label: string; href: string };
}[] = [
  {
    icon: "chat",
    title: "Relocating to Europe?",
    body: "The fastest answer isn’t from us — it’s from a verified expert, and the first conversation is free.",
    action: { label: "Find a verified expert", href: hub.browseExperts(CAMPAIGN, "channel") },
  },
  {
    icon: "shield",
    title: "Want to be listed?",
    body: "Companies join as Experts, individuals as Advisors. Listing is free and verification takes about five working days.",
    action: { label: "Join as an expert", href: hub.joinAsExpert(CAMPAIGN, "channel") },
  },
  {
    icon: "mail",
    title: "Support with an order",
    body: "Already using Migrio? Email support with your order number and we’ll pick it up.",
    action: { label: site.supportEmail, href: `mailto:${site.supportEmail}` },
  },
];

const topics = [
  "I’m relocating and have a question",
  "I want to join as an Expert or Advisor",
  "Support with an existing order",
  "Press or partnerships",
  "Something else",
];

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with the Migrio team about relocating to Europe, joining as a verified expert, support with an order, or press and partnerships.",
  path: PATH,
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We reply within one working day"
        title="Talk to the Migrio team"
        lead="For immigration questions you’ll get a better answer from a verified expert — and that’s free. For everything else, this reaches us directly."
        crumbs={crumbs}
        primaryCta={{
          label: "Find a verified expert",
          href: hub.browseExperts(CAMPAIGN, "page_hero"),
          ctaId: "contact_hero_browse",
          intent: "seeker",
        }}
        secondaryCta={{
          label: "Email us",
          href: `mailto:${site.email}`,
          ctaId: "contact_hero_email",
        }}
      />

      <Section id="contact" aria-labelledby="contact-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 id="contact-heading" className="text-2xl">
              Pick the fastest route
            </h2>
            <ul className="mt-6 space-y-4">
              {channels.map((channel) => (
                <li
                  key={channel.title}
                  className="rounded-2xl border border-line bg-canvas p-5 shadow-card"
                >
                  <span className="inline-grid size-10 place-items-center rounded-xl bg-primary-light text-primary-dark">
                    <Icon name={channel.icon} className="size-4" />
                  </span>
                  <h3 className="mt-3 text-base">{channel.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {channel.body}
                  </p>
                  <a
                    href={channel.action.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {channel.action.label}
                    <Icon name="arrowRight" className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-canvas p-6 shadow-card sm:p-8">
            <h2 className="text-2xl">Send us a message</h2>
            <p className="mt-2 text-sm text-muted">
              We read everything. Please don’t send sensitive documents here —
              share those with your expert inside Migrio instead.
            </p>

            {/* Revealed by the :target CSS variant when the API redirects to
                /contact#form-error. Keeps this page statically generated. */}
            <p
              id="form-error"
              role="alert"
              className="mt-5 hidden scroll-mt-28 rounded-xl border border-danger/30 bg-accent-tint px-4 py-3 text-sm text-danger target:block"
            >
              Something was missing. Please check your name, a valid email and a
              message, then try again.
            </p>

            {/* Plain HTML POST: works with JavaScript disabled. */}
            <form
              action="/api/contact"
              method="post"
              className="mt-6 flex flex-col gap-4"
            >
              {/* Honeypot: hidden from users, catches naive bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label htmlFor="company-website">Leave this field empty</label>
                <input
                  id="company-website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Field label="Your name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              <Field label="What’s this about?" htmlFor="topic">
                <select
                  id="topic"
                  name="topic"
                  defaultValue={topics[0]}
                  className={inputClass}
                >
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </Field>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  minLength={10}
                  className={`${inputClass} h-auto resize-y py-3`}
                />
              </Field>

              <label className="flex items-start gap-2.5 text-sm text-muted">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-[var(--color-primary)]"
                />
                <span>
                  I agree to Migrio processing this message in line with the{" "}
                  <a
                    href="/privacy"
                    className="font-semibold text-primary hover:underline"
                  >
                    privacy policy
                  </a>
                  .
                </span>
              </label>

              <Button
                ctaId="contact_form_submit"
                location="contact_form"
                size="lg"
                className="mt-2 self-start"
              >
                Send message
                <Icon name="arrowRight" className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </Section>

      <JsonLd schema={breadcrumbSchema(crumbs)} />
    </>
  );
}

const inputClass =
  "h-12 w-full rounded-brand border border-line-strong bg-canvas px-3.5 text-[0.9375rem] text-title " +
  "placeholder:text-subtle focus:border-primary focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[0.8125rem] font-medium text-title"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
