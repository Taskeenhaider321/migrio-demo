import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "canvas" | "surface" | "brand" | "ink";

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  brand: "bg-primary-tint",
  ink: "bg-primary-dark text-white",
};

export function Section({
  id,
  tone = "canvas",
  className,
  containerClassName,
  children,
  "aria-labelledby": ariaLabelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        toneClass[tone],
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "light";
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "brand" ? "text-primary" : "text-primary-press",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "center" && "mx-auto max-w-2xl",
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "text-3xl sm:text-4xl",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-lg",
            tone === "light" ? "text-primary-light" : "text-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
