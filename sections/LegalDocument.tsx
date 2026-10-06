import type { LegalDoc } from "@/content/legal";
import { site } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: doc.title, path: doc.path },
  ];

  return (
    <>
      <header className="border-b border-line bg-surface py-12 sm:py-16">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-7 max-w-2xl">
            <h1 className="text-[2.25rem] leading-tight sm:text-4xl">
              {doc.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {doc.intro}
            </p>
            <p className="mt-5 text-sm text-muted">
              Last updated{" "}
              <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
            </p>
          </div>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              On this page
            </h2>
            <ol className="mt-4 space-y-2">
              {doc.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-2xl">
            <div className="flex gap-3 rounded-2xl border border-line-brand bg-primary-tint p-5">
              <Icon name="file" className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-body">
                Template text, written for how Migrio actually works but not yet
                reviewed by a lawyer. Have counsel check it before launch. For
                questions, email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>

            {doc.sections.map((section) => (
              <section key={section.heading} className="mt-10 scroll-mt-28" id={slugify(section.heading)}>
                <h2 className="text-xl">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-[1.0625rem] leading-relaxed text-body"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[1.0625rem] leading-relaxed text-body"
                      >
                        <Icon
                          name="check"
                          className="mt-1.5 size-4 shrink-0 text-primary"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
