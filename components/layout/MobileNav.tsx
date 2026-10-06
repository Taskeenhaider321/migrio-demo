"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { primaryNav } from "@/config/site";
import { hub } from "@/lib/cta";
import { ctaTracking } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";

/**
 * The only interactive chrome on the site. Kept small and self-contained so
 * the rest of the header stays a server component.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setPanelTop(header.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          const header = document.querySelector("header");
          if (header) setPanelTop(header.offsetHeight);
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-11 place-items-center rounded-brand border border-line-strong text-title"
      >
        <Icon name={open ? "close" : "menu"} className="size-5" />
      </button>

      {/*
        Portalled to <body>: the header uses backdrop-blur, which makes it the
        containing block for fixed-position descendants and would clip the
        panel to the header's own height.
      */}
      {open
        ? createPortal(
            <div
              id={panelId}
              style={{ top: panelTop }}
              className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas px-5 pb-10 pt-4"
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {primaryNav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex flex-col gap-0.5 border-b border-line py-4"
                      >
                        <span className="text-base font-semibold text-title">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="text-sm text-muted">
                            {item.description}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={hub.signup("mobile_nav", "get_started")}
                  rel="noopener"
                  className="inline-flex h-12 items-center justify-center rounded-brand bg-primary px-5 font-semibold text-white"
                  {...ctaTracking({
                    ctaId: "get_started",
                    intent: "seeker",
                    location: "mobile_nav",
                    destination: "hub",
                  })}
                >
                  Get started
                </a>
                <a
                  href={hub.login()}
                  rel="noopener"
                  className="inline-flex h-12 items-center justify-center rounded-brand border border-line-strong px-5 font-semibold text-title"
                  {...ctaTracking({
                    ctaId: "log_in",
                    location: "mobile_nav",
                    destination: "hub",
                  })}
                >
                  Log in
                </a>
                <a
                  href={hub.joinAsExpert("mobile_nav", "join_as_expert")}
                  rel="noopener"
                  className="py-2 text-center text-sm font-semibold text-primary"
                  {...ctaTracking({
                    ctaId: "join_as_expert",
                    intent: "expert",
                    location: "mobile_nav",
                    destination: "hub",
                  })}
                >
                  Join as an Expert or Advisor
                </a>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
