"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  EVENT_ATTR,
  PARAM_PREFIX,
  SCROLL_DEPTH_THRESHOLDS,
  trackEvent,
  type AnalyticsParams,
} from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Wires up the three things the brief asks to measure — CTA clicks, scroll
 * depth and video plays — using one delegated listener instead of handlers on
 * individual elements, so CTAs stay server-rendered.
 *
 * `video_play` is dispatched by <VideoEmbed /> through the same dataLayer.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        `[${EVENT_ATTR}]`,
      );
      if (!target) return;

      const eventName = target.getAttribute(EVENT_ATTR);
      if (!eventName) return;

      const params: AnalyticsParams = {};
      for (const attr of Array.from(target.attributes)) {
        if (attr.name === EVENT_ATTR) continue;
        if (!attr.name.startsWith(PARAM_PREFIX)) continue;
        params[attr.name.slice(PARAM_PREFIX.length)] = attr.value;
      }

      if (target instanceof HTMLAnchorElement) {
        params.link_url = target.href;
      }
      params.page_path = window.location.pathname;

      trackEvent(eventName, params);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    const reached = new Set<number>();
    let ticking = false;

    function measure() {
      ticking = false;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = ((window.scrollY / scrollable) * 100) | 0;
      for (const threshold of SCROLL_DEPTH_THRESHOLDS) {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackEvent("scroll_depth", {
            percent_scrolled: threshold,
            page_path: window.location.pathname,
          });
        }
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (GTM_ID) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    );
  }

  if (GA_ID) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}');`}
        </Script>
      </>
    );
  }

  // No measurement ID configured: listeners still populate window.dataLayer,
  // so events are verifiable in the console before analytics is connected.
  return null;
}
