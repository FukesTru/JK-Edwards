import { getPost, posts } from "@/content/blog/posts";
import { ogSize, renderArticleOgImage, renderDefaultOgImage } from "@/lib/og";

export const alt = "JK Edwards & Company blog article";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return renderDefaultOgImage();
  return renderArticleOgImage({ eyebrow: post.category, title: post.title });
}
