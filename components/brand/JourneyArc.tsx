import { cn } from "@/lib/utils";

/**
 * The dashed arc and two pins from the Migrio logotype, reused as a section
 * graphic: origin (coral) → destination (ocean blue).
 */
export function JourneyArc({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 90"
      fill="none"
      aria-hidden="true"
      className={cn("w-full", className)}
    >
      <path
        d="M34 70C70 12 128 2 170 30c36 24 70 26 116-16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 10"
        className="text-primary-dark/60"
      />
      <g className="text-accent">
        <path
          d="M26 76s12-9.6 12-18.9A12 12 0 1 0 14 57c0 9.4 12 19 12 19Z"
          fill="currentColor"
        />
        <circle cx="26" cy="56.5" r="4.3" fill="#fff" />
      </g>
      <g className="text-ocean">
        <path
          d="M292 32s12-9.6 12-18.9A12 12 0 1 0 280 13c0 9.4 12 19 12 19Z"
          fill="currentColor"
        />
        <circle cx="292" cy="12.5" r="4.3" fill="#fff" />
      </g>
    </svg>
  );
}

/** Soft brand glow used behind hero and CTA sections. */
export function BrandGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-primary-light blur-3xl opacity-60" />
      <div className="absolute -right-32 top-24 size-[24rem] rounded-full bg-accent-tint blur-3xl opacity-70" />
    </div>
  );
}
