import { cn } from "@/lib/utils";

/** Circular gauge for the AI plan score. Pure SVG, no client JavaScript. */
export function ScoreRing({
  score,
  label = "Plan score",
  size = 160,
  className,
}: {
  score: number;
  label?: string;
  size?: number;
  className?: string;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(score, 0), 100) / 100);

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 128 128"
        className="size-full -rotate-90"
        role="img"
        aria-label={`${label}: ${score} out of 100`}
      >
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="11"
          className="stroke-primary-light"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary"
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-[2rem] font-semibold tracking-tight text-title">
          {score}
        </span>
        <span className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
          / 100
        </span>
      </div>
    </div>
  );
}

export function ScoreBar({
  label,
  value,
  verdict,
}: {
  label: string;
  value: number;
  verdict: "strong" | "ok" | "weak";
}) {
  const barTone = {
    strong: "bg-success",
    ok: "bg-rated",
    weak: "bg-accent",
  }[verdict];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-title">{label}</span>
        <span className="text-xs text-muted">{value}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-strong"
        role="img"
        aria-label={`${label}: ${value} percent, ${verdict}`}
      >
        <div
          className={cn("h-full rounded-full", barTone)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
