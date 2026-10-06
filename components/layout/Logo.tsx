import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The supplied logo is a dark-indigo wordmark. Until a white variant is
 * delivered, `tone="light"` knocks it out to white with a filter so it stays
 * legible on the dark footer and CTA bands.
 */
export function Logo({
  tone = "dark",
  className,
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo/migrio.svg"
      alt="Migrio"
      width={364}
      height={158}
      priority={priority}
      unoptimized
      className={cn(
        "h-9 w-auto",
        tone === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
