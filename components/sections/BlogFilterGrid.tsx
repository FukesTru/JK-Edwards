"use client";

import { useState } from "react";
import { BlogCard } from "@/components/cards/BlogCard";
import type { BlogPostSummary } from "@/content/blog/posts";
import { cn } from "@/lib/utils";

type Item = { post: BlogPostSummary; photo: { src: string; alt: string } };

/** Category chips + post grid for /blog. Filtering happens instantly in the browser. */
export function BlogFilterGrid({ items, categories }: { items: Item[]; categories: readonly string[] }) {
  const [active, setActive] = useState<string>("All");
  const visible = active === "All" ? items : items.filter((item) => item.post.category === active);
  const count = (category: string) =>
    category === "All" ? items.length : items.filter((item) => item.post.category === category).length;

  return (
    <div>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => {
          const selected = active === category;
          const total = count(category);
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              disabled={total === 0}
              onClick={() => setActive(category)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                selected
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-charcoal/40 hover:bg-paper",
              )}
            >
              {category}
              <span className={cn("text-xs tabular-nums", selected ? "text-mist" : "text-charcoal")}>{total}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {active === "All" ? `Showing all ${visible.length} articles` : `Showing ${visible.length} ${active} articles`}
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ post, photo }) => (
          <li key={post.slug} className="animate-fade-in">
            <BlogCard post={post} photo={photo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
