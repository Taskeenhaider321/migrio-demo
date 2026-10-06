import { notFound } from "next/navigation";
import { getPost, posts, postsByDate } from "@/content/posts";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return createMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author],
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog & resources", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const related = postsByDate.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="border-b border-line bg-surface py-12 sm:py-16">
          <Container>
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-7 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="brand">{post.category}</Badge>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Icon name="clock" className="size-4" />
                  {post.readingMinutes} min read
                </span>
              </div>
              <h1 className="mt-4 text-[2.25rem] leading-[1.12] sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {post.description}
              </p>
              <p className="mt-6 text-sm text-muted">
                By {post.author} · Published{" "}
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt !== post.publishedAt ? (
                  <>
                    {" "}
                    · Updated{" "}
                    <time dateTime={post.updatedAt}>
                      {formatDate(post.updatedAt)}
                    </time>
                  </>
                ) : null}
              </p>
            </div>
          </Container>
        </header>

        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-2xl">
            {post.body.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} className="mt-10 text-2xl first:mt-0">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={index} className="mt-5 space-y-2.5">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[1.0625rem] leading-relaxed text-body"
                      >
                        <Icon
                          name="check"
                          className="mt-1.5 size-4 shrink-0 text-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "callout") {
                return (
                  <aside
                    key={index}
                    className="mt-8 flex gap-3 rounded-2xl border border-line-brand bg-primary-tint p-5"
                  >
                    <Icon
                      name="sparkles"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <p className="text-[0.9375rem] leading-relaxed text-body">
                      {block.text}
                    </p>
                  </aside>
                );
              }
              return (
                <p
                  key={index}
                  className="mt-5 text-[1.0625rem] leading-relaxed text-body first:mt-0"
                >
                  {block.text}
                </p>
              );
            })}

            <div className="mt-12 rounded-2xl border border-line bg-surface p-6 text-center">
              <h2 className="text-xl">Check this against your own situation</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">
                The free AI plan score takes about two minutes and tells you
                which requirement is your weakest.
              </p>
              <ButtonLink
                href="/eligibility"
                size="lg"
                ctaId="blog_post_ai_score"
                intent="seeker"
                location="blog_post"
                className="mt-5"
              >
                Get your free AI plan score
                <Icon name="arrowRight" className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </article>

      <Section id="related" tone="surface" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-2xl">
          Keep reading
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug}>
              <article className="h-full rounded-2xl border border-line bg-canvas p-6 shadow-card">
                <Badge tone="brand">{item.category}</Badge>
                <h3 className="mt-3 text-lg">
                  <a
                    href={`/blog/${item.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        schema={[
          breadcrumbSchema(crumbs),
          articleSchema({
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            image: "/opengraph-image",
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            authorName: post.author,
          }),
        ]}
      />
    </>
  );
}
