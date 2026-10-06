import type { Stat } from "@/content/stats";
import { trustStats } from "@/content/stats";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const paymentMarks = ["Visa", "Mastercard", "American Express", "Stripe"];

export function TrustBar({
  stats = trustStats,
  showPayments = true,
}: {
  stats?: Stat[];
  showPayments?: boolean;
}) {
  return (
    <section
      aria-label="Migrio at a glance"
      className="border-y border-line bg-surface py-8"
    >
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold text-title sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm font-medium text-title">
                  {stat.label}
                </span>
                {stat.detail ? (
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {stat.detail}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        {showPayments ? (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-title">
              <Icon name="lock" className="size-4 text-primary" />
              Secure payments by
            </span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {paymentMarks.map((mark) => (
                <li
                  key={mark}
                  className="rounded-md border border-line bg-canvas px-2.5 py-1 text-xs font-semibold text-muted"
                >
                  {mark}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <Icon name="shield" className="size-4 text-success" />
              GDPR compliant · Data stored in the EU
            </span>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
