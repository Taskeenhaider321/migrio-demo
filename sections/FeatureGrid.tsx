import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export type Feature = {
  icon: IconName;
  title: string;
  body: string;
};

export function FeatureGrid({
  id,
  eyebrow,
  title,
  lead,
  features,
  tone = "canvas",
  columns = 3,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  features: Feature[];
  tone?: "canvas" | "surface";
  columns?: 2 | 3;
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <SectionHeading
        id={headingId}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        align="center"
      />
      <ul
        className={
          columns === 2
            ? "mt-12 grid gap-5 sm:grid-cols-2"
            : "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {features.map((feature) => (
          <li
            key={feature.title}
            className="rounded-2xl border border-line bg-canvas p-6 shadow-card"
          >
            <span className="inline-grid size-11 place-items-center rounded-xl bg-primary-light text-primary-dark">
              <Icon name={feature.icon} />
            </span>
            <h3 className="mt-4 text-lg">{feature.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              {feature.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
