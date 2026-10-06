import { site } from "@/config/site";

export type Intent = "seeker" | "expert";

export type HubLinkOptions = {
  /** Path on hub.migrio.com, e.g. "/signup" or "/ai-score". */
  path?: string;
  /** Lets the hub branch onboarding without asking the visitor again. */
  intent: Intent;
  /** Which page the click came from — becomes utm_campaign. */
  campaign: string;
  /** Which button was clicked — becomes utm_content. */
  content: string;
};

/**
 * Every outbound link to the hub goes through here so the hub always receives
 * a consistent `intent` plus a full UTM set, and so the tracking contract lives
 * in exactly one file.
 */
export function hubLink({
  path = "/signup",
  intent,
  campaign,
  content,
}: HubLinkOptions): string {
  const url = new URL(path, `${site.hubUrl}/`);
  url.searchParams.set("intent", intent);
  url.searchParams.set("utm_source", "migrio.com");
  url.searchParams.set("utm_medium", "marketing_site");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

/** Shorthands for the handful of hub destinations the site links to. */
export const hub = {
  signup: (campaign: string, content: string, intent: Intent = "seeker") =>
    hubLink({ path: "/signup", intent, campaign, content }),
  login: () => `${site.hubUrl}/login`,
  aiScore: (campaign: string, content: string) =>
    hubLink({ path: "/ai-score", intent: "seeker", campaign, content }),
  browseExperts: (campaign: string, content: string) =>
    hubLink({ path: "/experts", intent: "seeker", campaign, content }),
  expertProfile: (slug: string, campaign: string, content: string) =>
    hubLink({ path: `/experts/${slug}`, intent: "seeker", campaign, content }),
  community: (campaign: string, content: string) =>
    hubLink({ path: "/community", intent: "seeker", campaign, content }),
  joinAsExpert: (campaign: string, content: string) =>
    hubLink({ path: "/signup", intent: "expert", campaign, content }),
};
