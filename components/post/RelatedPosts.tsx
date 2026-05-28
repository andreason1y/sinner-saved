import Link from "next/link";
import type { Post } from "@/lib/types";
import { PostCard } from "./PostCard";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { CATEGORIES } from "@/lib/categories";

export function RelatedPosts({
  posts,
  parentCategorySlug,
}: {
  posts: Post[];
  parentCategorySlug: string;
}) {
  if (posts.length === 0) return null;
  const cat = CATEGORIES.find((c) => c.slug === parentCategorySlug);

  return (
    <section className="border-t border-ink-900/10 bg-parchment-deep/40 py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">
              Selanjutnya di {cat?.name ?? "kategori ini"}
            </p>
            <h2 className="serif-display mt-3 text-3xl leading-tight tracking-tightest text-ink-900 sm:text-4xl">
              Bacaan terkait.
            </h2>
          </div>
          {cat && (
            <Link
              href={`/kategori/${cat.slug}`}
              className="hidden text-sm text-ink-700 link-underline sm:inline"
            >
              Lihat semua →
            </Link>
          )}
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <FadeInUp key={post.id}>
              <PostCard post={post} />
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
