import { createMetadata } from "@/lib/seo/metadata";
import { DashboardView } from "@/components/eligibility/DashboardView";

export const metadata = createMetadata({
  title: "Your eligibility score",
  description: "View the free AI eligibility report from your Migrio assessment.",
  path: "/eligibility/dashboard",
  noIndex: true,
});

export default function EligibilityDashboardPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-tint to-transparent" />
      <div className="relative">
        <DashboardView />
      </div>
    </div>
  );
}
