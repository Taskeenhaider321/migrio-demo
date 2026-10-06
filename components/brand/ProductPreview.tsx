import { Badge, VerifiedBadge } from "@/components/ui/Badge";
import { Avatar, Stars } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ScoreRing } from "./ScoreRing";

/**
 * The hero visual: a verified-expert profile card with the free AI score and
 * payment protection floating beside it. Together these show the three things
 * that make Migrio different, before the visitor reads a word.
 */
export function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      <div className="rounded-3xl border border-line bg-canvas p-6 shadow-float">
        {/* Reserves the top-right corner for the floating score chip */}
        <div className="flex items-start gap-4 sm:pr-40">
          <Avatar initials="NI" className="size-14 text-base" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-base font-semibold text-title">
                Nordhaus Immigration
              </p>
              <Badge tone="neutral">Expert</Badge>
            </div>
            <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted">
              <Icon name="pin" className="size-3.5" />
              Germany · EU Blue Card specialists
            </p>
            <div className="mt-2">
              <VerifiedBadge />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-3">
          <Stars rating={4.9} reviews={214} />
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Icon name="clock" className="size-4" />
            Replies in ~2h
          </span>
        </div>

        <ul className="mt-4 space-y-2.5 text-sm text-body">
          {[
            "Free 30-minute consultation",
            "Free chat before you commit",
            "Payment released when you approve",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success-tint text-success-ink">
                <Icon name="check" className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-surface p-3">
          <div>
            <p className="text-xs text-muted">Blue Card package from</p>
            <p className="text-lg font-semibold text-title">€890</p>
          </div>
          <span className="inline-flex h-10 items-center rounded-brand bg-primary px-4 text-sm font-semibold text-white">
            Book free call
          </span>
        </div>
      </div>

      {/* Floating: the free AI score */}
      <div className="absolute -right-3 -top-8 hidden rounded-2xl border border-line bg-canvas p-3 shadow-lift sm:-right-8 sm:block">
        <div className="flex items-center gap-3">
          <ScoreRing score={82} size={76} />
          <div className="pr-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              AI plan score
            </p>
            <p className="mt-0.5 text-sm font-medium text-title">
              Strong fit
            </p>
            <p className="text-xs text-muted">Free · 2 min</p>
          </div>
        </div>
      </div>

      {/* Floating: payment protection */}
      <div className="absolute -bottom-6 -left-3 hidden items-center gap-2.5 rounded-2xl border border-line bg-canvas px-4 py-3 shadow-lift sm:-left-8 sm:flex">
        <span className="grid size-9 place-items-center rounded-full bg-primary-light text-primary-dark">
          <Icon name="lock" className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-title">Payment protected</p>
          <p className="text-xs text-muted">Released when you approve</p>
        </div>
      </div>
    </div>
  );
}
