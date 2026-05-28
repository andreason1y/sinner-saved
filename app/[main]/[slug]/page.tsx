import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  MOCK_POSTS,
} from "@/lib/mock-data";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { PostContent } from "@/components/post/PostContent";
import { ReadingProgress } from "@/components/post/ReadingProgress";
import {
  TableOfContents,
  type TocItem,
} from "@/components/post/TableOfContents";
import { RelatedPosts } from "@/components/post/RelatedPosts";

export function generateStaticParams() {
  return MOCK_POSTS.map((p) => ({ main: p.mainCategory, slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { main: string; slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default function PostPage({
  params,
}: {
  params: { main: string; slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post || post.mainCategory !== params.main) notFound();

  const category = getCategory(post.mainCategory);
  const subName =
    category?.subcategories.find((s) => s.slug === post.subCategory)?.name ??
    post.subCategory;

  const blocks = post.content ?? [];

  // Build TOC from headings
  const toc: TocItem[] = blocks
    .filter(
      (b): b is Extract<typeof blocks[number], { type: "heading" }> =>
        b.type === "heading"
    )
    .map((h) => ({
      id:
        h.id ??
        h.text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
      text: h.text,
      level: h.level,
    }));

  const related = getRelatedPosts(post, 3);

  return (
    <article className="relative">
      <ReadingProgress />

      {/* Cover */}
      {post.cover && (
        <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Top scrim for navbar contrast + bottom fade into parchment */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-parchment/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/10 to-parchment" />
          <div className="absolute inset-x-0 bottom-0 grain-overlay h-32" />
        </div>
      )}

      {/* Article header */}
      <header
        className={`relative mx-auto max-w-3xl px-5 ${
          post.cover ? "-mt-32 pb-12 pt-0" : "pt-32 pb-12"
        } lg:px-0`}
      >
        <div
          className={`rounded-3xl ${
            post.cover ? "bg-parchment p-8 shadow-card sm:p-12" : ""
          }`}
        >
          <Link
            href={`/kategori/${post.mainCategory}`}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.28em] text-sacred-600 hover:text-sacred-700"
          >
            <ChevronLeft size={12} />
            {category?.name}
          </Link>
          <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-ink-500">
            {subName}
          </p>
          <h1 className="serif-display mt-4 text-4xl leading-[1.05] tracking-tightest text-ink-900 sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">
            {post.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
            {post.author && (
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-xs font-medium uppercase text-parchment">
                  {post.author.name.charAt(0)}
                </span>
                <span className="text-ink-800">{post.author.name}</span>
              </div>
            )}
            <span aria-hidden className="text-ink-300">
              ·
            </span>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            {post.readingMinutes && (
              <>
                <span aria-hidden className="text-ink-300">
                  ·
                </span>
                <span>{post.readingMinutes} menit baca</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Body + TOC */}
      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-2">
            <PostContent blocks={blocks} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 flex flex-wrap gap-2 border-t border-ink-900/10 pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs text-ink-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author bio */}
            {post.author?.bio && (
              <div className="mt-12 rounded-2xl bg-white/60 p-6 ring-1 ring-ink-900/5 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-medium uppercase text-parchment">
                    {post.author.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-sacred-600">
                      Tentang penulis
                    </p>
                    <p className="serif-display mt-1 text-xl text-ink-900">
                      {post.author.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-3">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </div>

      <RelatedPosts posts={related} parentCategorySlug={post.mainCategory} />
    </article>
  );
}
