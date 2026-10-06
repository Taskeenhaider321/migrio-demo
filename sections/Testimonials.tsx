import type { Testimonial } from "@/content/testimonials";
import { Avatar, Stars } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Testimonials({
  id = "testimonials",
  eyebrow = "Reviews",
  title,
  lead,
  items,
  tone = "canvas",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  items: Testimonial[];
  tone?: "canvas" | "surface";
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

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <li key={item.name} className="min-w-0">
            <figure className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-canvas p-4 shadow-card sm:p-6">
              <Icon
                name="quote"
                filled
                className="size-6 text-primary-light sm:size-7"
              />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-body sm:text-[0.9375rem]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar initials={item.initials} className="size-10 text-xs" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-title">
                      {item.name}
                    </p>
                    <p className="text-xs leading-snug text-muted">{item.role}</p>
                    <p className="text-xs leading-snug text-primary">{item.route}</p>
                  </div>
                </div>
                <Stars rating={item.rating} className="shrink-0 sm:ml-auto" />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
