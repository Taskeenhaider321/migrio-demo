"use client";

import { usePathname } from "next/navigation";
import { ctaTracking } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";

/** Promo strip for the free eligibility assessment. Hidden once the visitor is already in that flow. */
export function AnnouncementBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/eligibility")) return null;

  return (
    <div className="bg-primary text-white">
      <Container>
        <div className="flex items-center py-2">
          <a
            href="/eligibility"
            className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-md"
            {...ctaTracking({
              ctaId: "announcement_eligibility",
              intent: "seeker",
              location: "announcement_bar",
              destination: "site",
            })}
          >
            <p className="min-w-0 text-sm leading-snug">
              <span className="font-semibold">Free AI eligibility scoring</span>
              <span className="hidden md:inline">
                {" "}
                — see if your move to Europe fits, in about 2 minutes.
              </span>
            </p>
            <span className="cta-shimmer cta-shimmer-on-light inline-flex h-8 shrink-0 items-center rounded-full bg-white px-3 text-xs font-semibold text-primary sm:text-sm">
              <span className="sm:hidden">Start free</span>
              <span className="hidden sm:inline">Check my eligibility</span>
            </span>
          </a>
        </div>
      </Container>
    </div>
  );
}
