"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";

/** The assessment and its dashboard are full-screen flows, so the marketing footer stays off. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/eligibility")) return null;
  return <SiteFooter />;
}
