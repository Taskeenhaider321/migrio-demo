import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Tone = "brand" | "verified" | "success" | "amber" | "neutral" | "accent";

const tones: Record<Tone, string> = {
  brand: "bg-primary-light text-primary-dark",
  verified: "bg-ocean-tint text-ocean",
  success: "bg-success-tint text-success-ink",
  amber: "bg-warning-tint text-warning-ink",
  neutral: "bg-surface-strong text-body",
  accent: "bg-accent-tint text-accent-dark",
};

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The verification mark, used anywhere an expert is shown. */
export function VerifiedBadge({
  label = "Verified by Migrio",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <Badge tone="verified" className={cn("font-semibold", className)}>
      <Icon name="shield" className="size-3.5" />
      {label}
    </Badge>
  );
}
