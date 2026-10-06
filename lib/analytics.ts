/**
 * GA4 / GTM contract for the marketing site.
 *
 * Markup opts into tracking declaratively:
 *
 *   <a href="..." data-analytics-event="cta_click"
 *      data-analytics-cta_id="hero_primary"
 *      data-analytics-intent="seeker">…</a>
 *
 * A single delegated listener in <Analytics /> picks these up, so CTAs stay
 * server-rendered and ship no per-button JavaScript.
 *
 * The eligibility assessment also emits, via trackEvent:
 *   eligibility_step { step_index, step_id }
 *   eligibility_complete { band }
 *   announcement_dismiss { announcement_id }
 */

export const EVENT_ATTR = "data-analytics-event";
export const PARAM_PREFIX = "data-analytics-";

export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Spreads the `data-analytics-*` attributes for a CTA onto an element.
 * Returns plain props so it works on server components.
 */
export function ctaTracking(params: {
  ctaId: string;
  intent?: string;
  destination?: string;
  location?: string;
}): Record<string, string> {
  const attrs: Record<string, string> = {
    [EVENT_ATTR]: "cta_click",
    [`${PARAM_PREFIX}cta_id`]: params.ctaId,
  };
  if (params.intent) attrs[`${PARAM_PREFIX}intent`] = params.intent;
  if (params.destination)
    attrs[`${PARAM_PREFIX}destination`] = params.destination;
  if (params.location) attrs[`${PARAM_PREFIX}location`] = params.location;
  return attrs;
}

/** Scroll-depth thresholds reported as `scroll_depth` events, in percent. */
export const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;
