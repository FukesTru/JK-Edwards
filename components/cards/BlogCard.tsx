import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostSummary } from "@/content/blog/posts";
import { cn, formatDate } from "@/lib/utils";

/**
 * Blog post card. `photo` is resolved by the (server) caller so this component
 * can also render inside the client-side category filter without shipping the
 * whole image manifest to the browser.
 */
export function BlogCard({
  post,
  photo,
  className,
}: {
  post: BlogPostSummary;
  photo: { src: string; alt: string };
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(22,24,27,0.4)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-paper">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="rounded-full bg-accent/10 px-2.5 py-1 font-semibold text-accent-strong">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-charcoal">
            {formatDate(post.date)}
          </time>
          <span className="text-charcoal">· {post.readMinutes} min read</span>
        </div>
        <h3 className="mt-4 font-serif text-[1.3rem] leading-snug font-semibold text-ink">
          <Link href={`/blog/${post.slug}`} className="outline-none after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-charcoal">{post.excerpt}</p>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
