import { hub } from "@/lib/cta";
import { createMetadata } from "@/lib/seo/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export const metadata = createMetadata({
  title: "Message received",
  description: "Thanks for contacting Migrio. We reply within one working day.",
  path: "/contact/thanks",
  noIndex: true,
});

export default function ContactThanksPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-grid size-14 place-items-center rounded-full bg-success-tint text-success-ink">
            <Icon name="check" className="size-7" />
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl">Message received</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Thanks — we read everything and reply within one working day.
          </p>
          <p className="mt-3 text-[0.9375rem] text-muted">
            If your question is about your own relocation, you’ll get a faster
            and better answer from a verified expert. Chat and the first
            consultation are free.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={hub.browseExperts("contact_thanks", "primary")}
              external
              size="lg"
              ctaId="thanks_browse_experts"
              intent="seeker"
              location="contact_thanks"
            >
              Find a verified expert
              <Icon name="arrowRight" className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="/"
              variant="secondary"
              size="lg"
              ctaId="thanks_back_home"
              location="contact_thanks"
            >
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
