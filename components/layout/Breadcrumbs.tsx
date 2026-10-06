import { Icon } from "@/components/ui/Icon";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <Icon
                  name="chevronDown"
                  className="size-3.5 -rotate-90 text-subtle"
                />
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-title">
                  {crumb.name}
                </span>
              ) : (
                <a href={crumb.path} className="transition-colors hover:text-primary">
                  {crumb.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
