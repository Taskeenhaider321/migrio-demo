import { primaryNav } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JourneyArc } from "@/components/brand/JourneyArc";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <JourneyArc className="mx-auto max-w-xs text-primary" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            404
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">
            This page took a different route
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            The page you’re looking for has moved or never existed. Here’s where
            most people go next.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href="/eligibility"
              size="lg"
              ctaId="not_found_ai_score"
              intent="seeker"
              location="not_found"
            >
              Get your free AI plan score
              <Icon name="arrowRight" className="size-4" />
            </ButtonLink>
            <ButtonLink
              href="/"
              variant="secondary"
              size="lg"
              ctaId="not_found_home"
              location="not_found"
            >
              Back to home
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
