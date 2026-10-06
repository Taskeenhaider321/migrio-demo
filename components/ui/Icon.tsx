import { cn } from "@/lib/utils";

/**
 * Inline stroke icons (24px grid, 1.6 stroke) so the site ships no icon
 * library and no extra network request. Add new glyphs to `paths`.
 */
const paths = {
  shield:
    "M12 3 4.5 6v5.5c0 4.4 3 8.4 7.5 9.5 4.5-1.1 7.5-5.1 7.5-9.5V6L12 3Z|M9 12l2.2 2.2L15.5 10",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z|M14.8 9.2 13.4 13.4 9.2 14.8l1.4-4.2 4.2-1.4Z",
  gift:
    "M20 12v8.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V12|M3.5 8h17a.5.5 0 0 1 .5.5V12H3V8.5a.5.5 0 0 1 .5-.5Z|M12 8v13|M12 8S10.5 3.5 8 3.5A2.25 2.25 0 0 0 8 8h4Zm0 0s1.5-4.5 4-4.5A2.25 2.25 0 0 1 16 8h-4Z",
  lock: "M6 10.5h12a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5Z|M8.5 10.5V7a3.5 3.5 0 1 1 7 0v3.5",
  chat: "M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.2-2.9-.4L4 21l1.3-3.6C4.2 16 3.5 14.1 3.5 12c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z",
  dashboard:
    "M4 4h7v7H4V4Zm0 9h7v7H4v-7Zm9-9h7v4h-7V4Zm0 6h7v10h-7V10Z",
  star: "M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9L12 3.5Z",
  check: "M4.5 12.5 9.5 17.5 19.5 7",
  arrowRight: "M4 12h15m0 0-6-6m6 6-6 6",
  chevronDown: "M6 9.5 12 15.5 18 9.5",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  sparkles:
    "M12 3.5 13.6 8 18 9.5 13.6 11 12 15.5 10.4 11 6 9.5 10.4 8 12 3.5Z|M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z",
  card: "M3.5 7.5h17a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5Z|M3 11h18|M6.5 14.5h3",
  users:
    "M15.5 20v-1.5a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4V20|M9.5 10.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z|M21 20v-1.5a4 4 0 0 0-3-3.87|M15.5 4.3a4 4 0 0 1 0 7.4",
  calendar:
    "M4.5 6.5h15a.5.5 0 0 1 .5.5v12.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5Z|M4 11h16|M8 4v4m8-4v4",
  mail: "M3.5 6h17a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5Z|M3.5 7 12 13l8.5-6",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z|M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z|M12 7.5V12l3 2",
  refund: "M3.5 12a8.5 8.5 0 1 0 2.6-6.1|M3.5 4.5V10h5.5",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5 -2 5 5",
  file: "M6 3.5h7l5 5V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V4a.5.5 0 0 1 .5-.5Z|M13 3.5v5h5|M9 13h6m-6 3.5h4",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z|M3.5 12h17|M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z",
  quote:
    "M9.5 6c-3 1.4-4.5 3.9-4.5 7.4V18h5.5v-5.5H7.3c0-2 .8-3.4 2.9-4.3L9.5 6Zm9 0c-3 1.4-4.5 3.9-4.5 7.4V18h5.5v-5.5h-3.2c0-2 .8-3.4 2.9-4.3L18.5 6Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className,
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
    >
      {paths[name].split("|").map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
