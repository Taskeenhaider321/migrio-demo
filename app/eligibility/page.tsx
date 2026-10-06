import { site } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { Assessment } from "@/components/eligibility/Assessment";

export const metadata = createMetadata({
  title: "Free AI eligibility score",
  description:
    "Answer a few questions and get a free AI eligibility score for your move to Europe. The report is emailed to you. No password, no account.",
  path: "/eligibility",
});

export default function EligibilityPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-tint to-transparent" />
      <div className="relative">
        <h1 className="sr-only">Free AI eligibility assessment</h1>
        <Assessment />
        <noscript>
          <p className="mx-auto max-w-xl px-5 pb-16 text-muted">
            This assessment runs in the browser. Enable JavaScript to get your
            free score, or email {site.email} and we’ll help you start.
          </p>
        </noscript>
      </div>
    </div>
  );
}
