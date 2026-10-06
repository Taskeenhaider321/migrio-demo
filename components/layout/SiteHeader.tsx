import { primaryNav } from "@/config/site";
import { hub } from "@/lib/cta";
import { ctaTracking } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnnouncementBar } from "@/components/announcement/AnnouncementBar";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="border-b border-line bg-canvas/90 backdrop-blur-md">
      <Container>
        <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <a
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Migrio home"
          >
            <Logo priority />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-brand px-3 py-2 text-[0.9375rem] font-medium text-body transition-colors hover:bg-surface hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={hub.login()}
              rel="noopener"
              className="hidden rounded-brand px-3 py-2 text-[0.9375rem] font-semibold text-title transition-colors hover:text-primary sm:inline-flex"
              {...ctaTracking({
                ctaId: "log_in",
                location: "header",
                destination: "hub",
              })}
            >
              Log in
            </a>
            <ButtonLink
              href={hub.signup("header", "get_started")}
              external
              size="sm"
              ctaId="get_started"
              intent="seeker"
              location="header"
              className="hidden sm:inline-flex"
            >
              Get started
            </ButtonLink>
            <MobileNav />
          </div>
        </div>
      </Container>
      </div>
    </header>
  );
}
