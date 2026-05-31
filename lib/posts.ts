import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./supabase/server";
import type { Post } from "./types";

/**
 * Database row shape (snake_case) → app shape (camelCase).
 */
type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_json: unknown;
  content_html: string;
  cover: string | null;
  main_category: Post["mainCategory"];
  sub_category: string;
  tags: string[];
  status: Post["status"];
  reading_minutes: number | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  author_id: string | null;
  title_en: string | null;
  excerpt_en: string | null;
  content_html_en: string | null;
};

function rowToPost(row: PostRow): Post & { contentHtml: string } {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    cover: row.cover ?? undefined,
    mainCategory: row.main_category,
    subCategory: row.sub_category,
    tags: row.tags,
    status: row.status,
    readingMinutes: row.reading_minutes ?? undefined,
    createdAt: row.published_at ?? row.created_at,
    updatedAt: row.updated_at,
    contentHtml: row.content_html,
    titleEn: row.title_en ?? undefined,
    excerptEn: row.excerpt_en ?? undefined,
    contentHtmlEn: row.content_html_en ?? undefined,
  };
}

const COMMON_SELECT =
  "id,title,slug,excerpt,content_json,content_html,cover,main_category,sub_category,tags,status,reading_minutes,created_at,updated_at,published_at,author_id,title_en,excerpt_en,content_html_en";

/**
 * Returns true if Supabase is configured. We still use mock fallback when
 * env is missing OR a query fails (e.g. before schema is applied), so the
 * frontend stays demo-able during local development.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

async function queryPublishedPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    // Public reads use a stateless anon client (no cookies). This makes the
    // function safe to call from generateStaticParams during the build.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
    const { data, error } = await supabase
      .from("posts")
      .select(COMMON_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.warn("[posts] supabase error:", error.message);
      return [];
    }
    return (data as PostRow[]).map(rowToPost);
  } catch (e) {
    console.warn("[posts] supabase query failed:", (e as Error).message);
    return [];
  }
}

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  return await queryPublishedPosts();
});

export async function getFeaturedPosts(limit = 5): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all.slice(0, limit);
}

export async function getPostsByMainCategory(
  main: string,
  limit?: number
): Promise<Post[]> {
  const all = await getPublishedPosts();
  const filtered = all.filter((p) => p.mainCategory === main);
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export const getPostBySlug = cache(async (
  slug: string
): Promise<(Post & { contentHtml?: string }) | null> => {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      const { data, error } = await supabase
        .from("posts")
        .select(COMMON_SELECT)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (!error && data) return rowToPost(data as PostRow);
    } catch (e) {
      console.warn("[posts] getPostBySlug failed:", (e as Error).message);
    }
  }
  return null;
});

export async function getRelatedPosts(
  post: Post,
  limit = 3
): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all
    .filter((p) => p.id !== post.id && p.mainCategory === post.mainCategory)
    .slice(0, limit);
}

/**
 * Lists ALL posts (drafts + published) for the admin dashboard.
 * Uses the cookie-aware server client so RLS allows it for admins.
 */
export async function listAllPostsForAdmin(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(COMMON_SELECT)
    .order("updated_at", { ascending: false });
  if (error) {
    console.warn("[posts] listAllPostsForAdmin error:", error.message);
    return [];
  }
  return (data as PostRow[]).map(rowToPost);
}

export async function getPostByIdForAdmin(id: string): Promise<
  | (Post & {
      contentJson: unknown;
      contentHtml: string;
    })
  | null
> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(COMMON_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as PostRow;
  return {
    ...rowToPost(row),
    contentJson: row.content_json,
    contentHtml: row.content_html,
  };
}
