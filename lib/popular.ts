import "server-only";
import { getPopularPostPaths } from "@/lib/analytics";
import { getPublishedPosts, isSupabaseConfigured } from "@/lib/posts";
import type { Post } from "@/lib/types";

/**
 * Returns the most-read published posts, ordered by traffic.
 *
 * Fallback ladder so the rail is never empty:
 *   1. most-read in the last 30 days  (true "trending")
 *   2. most-read all-time             (older site, quiet month)
 *   3. most-recent published          (fresh site, no analytics yet)
 *
 * Each rung only fills the slots the previous one left open, and we never
 * surface a path that no longer maps to a published post.
 */
export async function getPopularPosts(limit = 5): Promise<Post[]> {
  const published = await getPublishedPosts();
  if (published.length === 0) return [];

  const byPath = new Map(published.map((p) => [`/${p.mainCategory}/${p.slug}`, p]));

  const picked: Post[] = [];
  const seen = new Set<string>();
  const take = (posts: Post[]) => {
    for (const post of posts) {
      if (picked.length >= limit) break;
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      picked.push(post);
    }
  };

  if (isSupabaseConfigured()) {
    try {
      const fromPaths = async (sinceDays?: number) => {
        const ranked = await getPopularPostPaths(limit, sinceDays);
        return ranked
          .map((r) => byPath.get(r.path))
          .filter((p): p is Post => Boolean(p));
      };
      take(await fromPaths(30)); // 1. trending
      if (picked.length < limit) take(await fromPaths()); // 2. all-time
    } catch {
      // Analytics unavailable — fall through to recency.
    }
  }

  if (picked.length < limit) take(published); // 3. recent (already date-sorted)

  return picked.slice(0, limit);
}
