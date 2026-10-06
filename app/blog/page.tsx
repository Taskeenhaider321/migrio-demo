import { postsByDate } from "@/content/posts";
import { site } from "@/config/site";
import { hub } from "@/lib/cta";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

import { FinalCta } from "@/sections/FinalCta";
import { PageHero } from "@/sections/PageHero";

const CAMPAIGN = "blog";
const PATH = "/blog";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog & resources", path: PATH },
];

export const metadata = createMetadata({
  title: "Blog & resources",
  description:
    "Practical, checked guides on relocating to Europe: visa routes, costs, document requirements and how to choose an immigration expert.",
  path: PATH,
});

export default function BlogIndexPage() {
  const [lead, ...rest] = postsByDate;

  return (
    <>
      <PageHero
        eyebrow="Guides & resources"
        title="Everything we wish someone had told us before the first application"
        lead="Written by the Migrio team and checked against current national rules. No fluff, no affiliate links."
        crumbs={crumbs}
        primaryCta={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "blog_hero_ai_score",
          intent: "seeker",
        }}
      />

      <Section id="posts" aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          All articles
        </h2>

        <article className="rounded-2xl border border-line bg-canvas p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="accent">Latest</Badge>
            <Badge tone="brand">{lead.category}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Icon name="clock" className="size-4" />
              {lead.readingMinutes} min read
            </span>
          </div>
          <h3 className="mt-4 text-2xl sm:text-3xl">
            <a
              href={`/blog/${lead.slug}`}
              className="transition-colors hover:text-primary"
            >
              {lead.title}
            </a>
          </h3>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">
            {lead.description}
          </p>
          <p className="mt-5 text-sm text-muted">
            {lead.author} · {formatDate(lead.publishedAt)}
          </p>
        </article>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-canvas p-6 shadow-card">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="brand">{post.category}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Icon name="clock" className="size-4" />
                    {post.readingMinutes} min read
                  </span>
                </div>
                <h3 className="mt-4 text-xl">
                  <a
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {post.description}
                </p>
                <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                  {post.author} · {formatDate(post.publishedAt)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta
        title="Reading is good. Checking is better."
        lead="Run the free AI plan score and see how the rules in these guides apply to your actual situation."
        primary={{
          label: "Get your free AI plan score",
          href: "/eligibility",
          ctaId: "blog_final_cta_ai_score",
          intent: "seeker",
        }}
      />

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          itemListSchema({
            name: "Migrio blog and resources",
            items: postsByDate.map((post) => ({
              name: post.title,
              url: `${site.url}/blog/${post.slug}`,
              description: post.description,
            })),
          }),
        ]}
      />
    </>
  );
}
