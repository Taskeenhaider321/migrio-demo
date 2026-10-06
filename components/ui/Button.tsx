import { ctaTracking } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-brand font-semibold " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-150 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_20px_-10px_rgb(78_70_180/0.9)] hover:bg-primary-dark",
  secondary:
    "border border-line-strong bg-canvas text-title hover:border-primary hover:text-primary",
  accent: "bg-accent text-white hover:bg-accent-dark",
  ghost: "text-primary hover:bg-primary-light",
  inverse: "bg-white text-primary-dark hover:bg-primary-light",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Identifier reported to GA4 as `cta_id`. */
  ctaId: string;
  /** "seeker" | "expert" — reported alongside the click. */
  intent?: string;
  /** Section the CTA sits in, e.g. "hero". */
  location?: string;
};

type ButtonLinkProps = CommonProps & {
  href: string;
  /** Hub links open in the same tab but are flagged as outbound. */
  external?: boolean;
};

/**
 * Renders a plain anchor. Internal navigation is intentionally a full page
 * load (no client-side router) so each route is a real document.
 */
export function ButtonLink({
  href,
  external = false,
  variant = "primary",
  size = "md",
  className,
  children,
  ctaId,
  intent,
  location,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { rel: "noopener" } : {})}
      {...ctaTracking({
        ctaId,
        intent,
        location,
        destination: external ? "hub" : "site",
      })}
    >
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ctaId,
  intent,
  location,
  type = "submit",
  onClick,
}: CommonProps & { type?: "submit" | "button"; onClick?: () => void }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...ctaTracking({ ctaId, intent, location, destination: "form" })}
    >
      {children}
    </button>
  );
}
