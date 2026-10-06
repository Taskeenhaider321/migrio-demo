import { comparisonRows, differentiators } from "@/content/comparison";
import { hub } from "@/lib/cta";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

const iconFor: Record<string, IconName> = {
  shield: "shield",
  compass: "compass",
  gift: "gift",
  lock: "lock",
  chat: "chat",
  dashboard: "dashboard",
};

export function WhyMigrio({ campaign = "home" }: { campaign?: string }) {
  return (
    <Section id="why-migrio" aria-labelledby="why-migrio-heading">
      <SectionHeading
        id="why-migrio-heading"
        eyebrow="Why Migrio"
        title="A general marketplace can’t check immigration expertise. We can."
        lead="Upwork and Fiverr are built to sell everything. Migrio does one thing, which is why the guarantees are different."
        align="center"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-line bg-canvas p-6 shadow-card"
          >
            <span className="inline-grid size-11 place-items-center rounded-xl bg-primary-light text-primary-dark">
              <Icon name={iconFor[item.icon]} />
            </span>
            <h3 className="mt-4 text-lg">{item.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-14 overflow-hidden rounded-2xl border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Migrio compared with general freelance marketplaces
          </caption>
          <thead>
            <tr className="bg-primary-dark text-white">
              <th scope="col" className="w-1/3 p-4 text-sm font-semibold">
                <span className="sr-only">Comparison area</span>
              </th>
              <th scope="col" className="p-4 text-sm font-semibold">
                Migrio
              </th>
              <th
                scope="col"
                className="p-4 text-sm font-semibold text-primary-light/80"
              >
                General marketplaces
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-canvas">
            {comparisonRows.map((row) => (
              <tr key={row.dimension} className="align-top">
                <th
                  scope="row"
                  className="p-4 text-sm font-semibold text-title"
                >
                  {row.dimension}
                </th>
                <td className="p-4 text-sm text-body">
                  <span className="flex gap-2">
                    <Icon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-success"
                    />
                    {row.migrio}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted">
                  <span className="flex gap-2">
                    <Icon
                      name="close"
                      className="mt-0.5 size-4 shrink-0 text-subtle"
                    />
                    {row.generic}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-center">
        <ButtonLink
          href={hub.browseExperts(campaign, "why_migrio")}
          external
          size="lg"
          ctaId="why_migrio_browse_experts"
          intent="seeker"
          location="why_migrio"
        >
          Browse verified experts
          <Icon name="arrowRight" className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}
