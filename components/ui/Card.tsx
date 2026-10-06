import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-canvas p-6 shadow-card",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Stars({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className="inline-flex gap-0.5 text-rated"
        role="img"
        aria-label={`Rated ${rating} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn(
              "size-4",
              index < rounded ? "fill-current" : "fill-line-strong",
            )}
          >
            <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9L12 3.5Z" />
          </svg>
        ))}
      </span>
      <span className="text-sm font-semibold text-title">
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined ? (
        <span className="text-sm text-muted">({reviews})</span>
      ) : null}
    </span>
  );
}

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full bg-primary-light text-sm font-semibold text-primary-dark",
        className,
      )}
    >
      {initials}
    </span>
  );
}
