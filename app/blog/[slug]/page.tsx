import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Phone } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts, getPost, toSummary, type BlogCategory, type BlogPost } from "@/content/blog/posts";
import { getImage } from "@/lib/images";
import { blogPostingSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    image: { url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title },
  });
}

type HelpLink = { label: string; href: string };

/** Where each topic's readers usually need help next. */
const helpLinks: Record<BlogCategory, HelpLink[]> = {
  "Tax Tips": [
    { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
    { label: "Bookkeeping", href: "/services/bookkeeping" },
    { label: "Payroll", href: "/services/payroll" },
  ],
  "Small Business": [
    { label: "New Business Setup", href: "/services/new-business-setup" },
    { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
    { label: "Business Advisory / CFO", href: "/services/business-advisory" },
  ],
  Payroll: [
    { label: "Payroll", href: "/services/payroll" },
    { label: "IRS Problem Resolution", href: "/services/irs-tax-resolution" },
    { label: "Bookkeeping", href: "/services/bookkeeping" },
  ],
  "IRS & Compliance": [
    { label: "IRS Problem Resolution", href: "/services/irs-tax-resolution" },
    { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
    { label: "Client Center", href: "/client-center" },
  ],
  "Expat Tax": [
    { label: "U.S. Expat Tax Services", href: "/industries/expat-tax" },
    { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
    { label: "IRS Problem Resolution", href: "/services/irs-tax-resolution" },
  ],
  Trucking: [
    { label: "Trucking & Transportation", href: "/industries/trucking" },
    { label: "Bookkeeping", href: "/services/bookkeeping" },
    { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
  ],
};

function relatedPosts(post: BlogPost, count = 3) {
  const others = posts.filter((other) => other.slug !== post.slug);
  const sameTopic = others.filter((other) => other.category === post.category);
  return [...sameTopic, ...others.filter((other) => other.category !== post.category)].slice(0, count);
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await post.load();
  const photo = getImage(post.image);
  const path = `/blog/${post.slug}`;
  const related = relatedPosts(post);

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          path,
          image: photo.src,
          datePublished: post.date,
          dateModified: post.updated,
          category: post.category,
        })}
      />
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt} image={post.image}>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist">
          <span className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden className="h-4 w-4 text-accent-light" strokeWidth={1.75} />
            <span>
              Published <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </span>
          {post.updated && (
            <span>
              Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Clock aria-hidden className="h-4 w-4 text-accent-light" strokeWidth={1.75} />
            {post.readMinutes} min read
          </span>
          <span>By the {site.name} team</span>
        </p>
      </PageHero>
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
      />

      <Section tone="white" reveal={false}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <div className="max-w-[46rem]">
              <div className="prose-jk prose prose-lg max-w-none">
                <Content />
              </div>
            </div>

            <aside aria-labelledby="post-cta" className="mt-14 max-w-[46rem] rounded-2xl bg-ink p-8 text-white sm:p-10">
              <h2 id="post-cta" className="font-serif text-[1.75rem] leading-tight font-semibold text-balance">
                Facing this situation? Book a free consultation.
              </h2>
              <p className="mt-3 max-w-xl text-mist">
                Every situation is a little different. Talk it through with our team — there’s no cost and no
                obligation.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">Book a Free Consultation</ButtonLink>
                <ButtonLink href={site.phone.href} variant="outline-light">
                  Call {site.phone.display}
                </ButtonLink>
              </div>
            </aside>

            <p className="mt-8 max-w-[46rem] border-t border-line pt-6 text-sm leading-relaxed text-charcoal">
              <strong className="font-semibold text-ink">Disclaimer:</strong> This article is general information, not
              tax, legal or investment advice for your specific situation. Tax laws change and individual circumstances
              vary, so please consult a qualified professional before acting on it. Reading this article does not create
              a client relationship with {site.name}.
            </p>
          </article>

          <aside
            aria-label="Get help with this topic"
            className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start"
          >
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="font-serif text-xl font-semibold text-ink">How we can help</p>
              <ul className="mt-4 space-y-1">
                {helpLinks[post.category].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-3 rounded-lg py-2 text-[15px] font-medium text-ink hover:text-accent-strong"
                    >
                      {link.label}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-sm text-charcoal">Questions? Talk to a real person.</p>
                <a
                  href={site.phone.href}
                  className="mt-2 inline-flex items-center gap-2 font-semibold text-ink tabular-nums hover:text-accent-strong"
                >
                  <Phone aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper" labelledBy="related-posts">
        <SectionHeading id="related-posts" eyebrow="Keep reading" title="Related articles" />
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((other) => (
            <StaggerItem key={other.slug}>
              <BlogCard post={toSummary(other)} photo={getImage(other.image)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
