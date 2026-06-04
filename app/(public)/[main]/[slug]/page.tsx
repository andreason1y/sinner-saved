import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ChevronLeft } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  getPublishedPosts,
} from "@/lib/posts";
import { translatePostAction } from "@/lib/actions/translate";
import { getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { PostContent } from "@/components/post/PostContent";
import { PostBody } from "@/components/post/PostBody";
import { ScriptureLinker } from "@/components/post/ScriptureLinker";
import { ReadingProgress } from "@/components/post/ReadingProgress";
import { ShareButton } from "@/components/post/ShareButton";
import {
  TableOfContents,
  type TocItem,
} from "@/components/post/TableOfContents";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { extractTocFromHtml } from "@/lib/toc";
import type { ContentBlock } from "@/lib/types";
import {
  DEFAULT_LOCALE,
  DICTIONARIES,
  LOCALES,
  type Locale,
} from "@/lib/i18n/dictionary";

// force-dynamic: this page reads the locale cookie per-request, so it
// must be rendered dynamically. Combining revalidate + cookies() causes
// "Dynamic server usage" 500 errors on Vercel for paths not pre-generated.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ main: p.mainCategory, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { main: string; slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const canonical = absoluteUrl(`/${post.mainCategory}/${post.slug}`);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt ?? post.createdAt,
      images: post.cover ? [post.cover] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { main: string; slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post || post.mainCategory !== params.main) notFound();

  // Read locale cookie for server-rendered date + labels.
  const cookieLocale = cookies().get("ss-locale")?.value;
  const locale: Locale =
    cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : DEFAULT_LOCALE;
  const t = DICTIONARIES[locale];

  const category = getCategory(post.mainCategory);
  const subName =
    category?.subcategories.find((s) => s.slug === post.subCategory)?.name ??
    post.subCategory;

  const rawHtml = (post as { contentHtml?: string }).contentHtml ?? "";
  const blocks = (post as { content?: ContentBlock[] }).content ?? [];

  // Resolve EN content: use cache if present, otherwise translate on demand.
  let displayTitle = post.title;
  let displayExcerpt = post.excerpt;
  let html = rawHtml;

  if (locale === "en") {
    if (post.titleEn && post.excerptEn && post.contentHtmlEn) {
      displayTitle = post.titleEn;
      displayExcerpt = post.excerptEn;
      html = post.contentHtmlEn;
    } else if (rawHtml) {
      const translated = await translatePostAction(post.id, {
        title: post.title,
        excerpt: post.excerpt,
        contentHtml: rawHtml,
      });
      if (translated) {
        displayTitle = translated.titleEn;
        displayExcerpt = translated.excerptEn;
        html = translated.contentHtmlEn;
      }
    }
  }

  let toc: TocItem[] = [];
  if (html) {
    toc = extractTocFromHtml(html);
  } else if (blocks.length > 0) {
    toc = blocks
      .filter((b): b is Extract<ContentBlock, { type: "heading" }> =>
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
  }

  const related = await getRelatedPosts(post, 3);

  return (
    <article className="relative overflow-x-clip">
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(post)} />
      <ReadingProgress />

      {post.cover && (
        <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src={post.cover}
            alt={displayTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-parchment/80 to-transparent dark:from-ink-950/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/10 to-parchment dark:to-ink-950" />
        </div>
      )}

      <header
        className={`relative mx-auto max-w-3xl px-5 ${
          post.cover ? "-mt-32 pb-12 pt-0" : "pt-32 pb-12"
        } lg:px-0`}
      >
        <div
          className={`rounded-3xl ${
            post.cover
              ? "bg-parchment p-8 shadow-card dark:bg-ink-900 sm:p-12"
              : ""
          }`}
        >
          <Link
            href={`/kategori/${post.mainCategory}`}
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.28em] text-gold-600 hover:text-gold-700 dark:text-gold-300 dark:hover:text-gold-200"
          >
            <ChevronLeft size={12} />
            {category?.name}
          </Link>
          <Link
            href={`/kategori/${post.mainCategory}/${post.subCategory}`}
            className="kicker mt-3 block text-gold-600/80 hover:text-gold-600 dark:text-gold-300/80 dark:hover:text-gold-300"
          >
            {subName}
          </Link>
          <h1 className="serif-display mt-4 break-words text-4xl font-medium leading-[1.06] text-ink-900 dark:text-ink-50 sm:text-6xl">
            {displayTitle}
          </h1>
          <p className="mt-6 break-words text-lg leading-relaxed text-ink-600 dark:text-ink-300 sm:text-xl">
            {displayExcerpt}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
            <time dateTime={post.createdAt}>
              {formatDate(post.createdAt, locale)}
            </time>
            {post.readingMinutes && (
              <>
                <span aria-hidden className="text-ink-300 dark:text-ink-600">
                  ·
                </span>
                <span>{t.feature.readingTime(post.readingMinutes)}</span>
              </>
            )}
            <span aria-hidden className="text-ink-300 dark:text-ink-600">
              ·
            </span>
            <ShareButton
              title={displayTitle}
              label={t.post.share}
              copiedLabel={t.post.linkCopied}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8 lg:col-start-2">
            {locale === "en" && html && (
              <p className="mb-6 text-xs text-ink-400 dark:text-ink-500">
                Translated by machine — original in Indonesian.
              </p>
            )}
            <ScriptureLinker>
              {html ? <PostBody html={html} /> : <PostContent blocks={blocks} />}
            </ScriptureLinker>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 flex flex-wrap gap-2 border-t border-ink-900/10 pt-8 dark:border-white/10">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs text-ink-700 transition-colors hover:border-gold-400/60 hover:bg-gold-100/40 hover:text-ink-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:border-gold-300/40 dark:hover:bg-white/[0.08] dark:hover:text-ink-50"
                  >
                    #{tag}
                  </Link>
                ))}
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
