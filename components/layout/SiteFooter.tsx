import { footerNav, site } from "@/config/site";
import { hub } from "@/lib/cta";
import { ctaTracking } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const socialLinks = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "X", href: site.social.x },
  { label: "Instagram", href: site.social.instagram },
  { label: "YouTube", href: site.social.youtube },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary-dark text-primary-light">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-primary-light/80">
              Migrio is a marketplace of manually verified immigration experts
              and advisors for people relocating to Europe.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={hub.signup("footer", "get_started")}
                rel="noopener"
                className="inline-flex h-11 items-center rounded-brand bg-white px-5 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light"
                {...ctaTracking({
                  ctaId: "get_started",
                  intent: "seeker",
                  location: "footer",
                  destination: "hub",
                })}
              >
                Get started
              </a>
              <a
                href={hub.joinAsExpert("footer", "join_as_expert")}
                rel="noopener"
                className="inline-flex h-11 items-center rounded-brand border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                {...ctaTracking({
                  ctaId: "join_as_expert",
                  intent: "expert",
                  location: "footer",
                  destination: "hub",
                })}
              >
                Join as an expert
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm text-primary-light/80 transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 text-sm text-primary-light/70">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights
              reserved.
            </p>
            <p className="flex items-center gap-1.5">
              <Icon name="mail" className="size-4" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm text-primary-light/80 transition-colors hover:text-white"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-primary-light/60">
          Migrio is a marketplace. We verify the experts listed on the platform,
          but we are not a law firm and do not provide immigration advice
          ourselves. The AI plan score is an automated estimate, not legal
          advice, and no outcome is guaranteed.
        </p>
      </Container>
    </footer>
  );
}
