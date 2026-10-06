"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ctaTracking, trackEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const DISMISS_KEY = "migrio.announce.eligibility.dismissed";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismissedSnapshot(): boolean {
  return localStorage.getItem(DISMISS_KEY) === "1";
}

function dismissAnnouncement() {
  localStorage.setItem(DISMISS_KEY, "1");
  listeners.forEach((listener) => listener());
}

/**
 * Promo strip for the free eligibility assessment. Dismissal lives in
 * localStorage and is read through useSyncExternalStore so the server render
 * stays visible and hydration doesn't mismatch.
 */
export function AnnouncementBar() {
  const pathname = usePathname();
  const dismissed = useSyncExternalStore(subscribe, dismissedSnapshot, () => false);

  if (dismissed || pathname.startsWith("/eligibility")) return null;

  function dismiss() {
    dismissAnnouncement();
    trackEvent("announcement_dismiss", { announcement_id: "eligibility" });
  }

  return (
    <div className="bg-primary text-white">
      <Container>
        <div className="flex items-center gap-2 py-2 sm:gap-3">
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
            <span className="inline-flex h-8 shrink-0 items-center rounded-full bg-white px-3 text-xs font-semibold text-primary sm:text-sm">
              <span className="sm:hidden">Start free</span>
              <span className="hidden sm:inline">Check my eligibility</span>
            </span>
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="grid size-8 shrink-0 place-items-center rounded-full text-white/80 hover:bg-white/10"
          >
            <Icon name="close" className="size-4" />
          </button>
        </div>
      </Container>
    </div>
  );
}
