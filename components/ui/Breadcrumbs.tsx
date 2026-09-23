import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";

/**
 * Small breadcrumb bar rendered directly below each inner-page hero, plus
 * BreadcrumbList structured data. "Home" is prepended automatically.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <div className="border-b border-line bg-white">
      <Container>
        <nav aria-label="Breadcrumb" className="py-3.5">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-charcoal">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={crumb.path} className="inline-flex items-center gap-1.5">
                  {isLast ? (
                    <span aria-current="page" className="font-medium text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="underline-offset-2 hover:text-accent-strong hover:underline">
                        {crumb.name}
                      </Link>
                      <ChevronRight aria-hidden className="h-3.5 w-3.5 text-steel" strokeWidth={1.5} />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </div>
  );
}
