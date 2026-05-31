import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type StatsOverview = {
  totalViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  uniqueVisitors7d: number;
};

export type PathStat = {
  path: string;
  views: number;
};

export type DayStat = {
  date: string;
  views: number;
};

export type BreakdownStat = {
  label: string;
  views: number;
};

export async function getStatsOverview(): Promise<StatsOverview> {
  const admin = createSupabaseAdminClient();

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const [totalRes, todayRes, weekRes] = await Promise.all([
    admin.from("page_views").select("id", { count: "exact", head: true }),
    admin
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("viewed_at", todayStart.toISOString()),
    admin
      .from("page_views")
      .select("visitor_id")
      .gte("viewed_at", weekStart.toISOString()),
  ]);

  const totalViews = totalRes.count ?? 0;
  const viewsToday = todayRes.count ?? 0;
  const weekRows = weekRes.data ?? [];
  const viewsThisWeek = weekRows.length;
  const uniqueVisitors7d = new Set(weekRows.map((r) => r.visitor_id)).size;

  return { totalViews, viewsToday, viewsThisWeek, uniqueVisitors7d };
}

export async function getPopularPaths(limit = 10): Promise<PathStat[]> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("page_views")
    .select("path");

  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    counts[row.path] = (counts[row.path] ?? 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([path, views]) => ({ path, views }));
}

/**
 * Ranks only single-post URLs (`/{mainCategory}/{slug}`) by view count,
 * optionally restricted to the last `sinceDays`. Used to power the public
 * "most read" rail. Returns [] when Supabase has no data — callers should
 * fall back to recency.
 */
export async function getPopularPostPaths(
  limit = 5,
  sinceDays?: number
): Promise<PathStat[]> {
  const admin = createSupabaseAdminClient();
  let query = admin.from("page_views").select("path");
  if (typeof sinceDays === "number") {
    const since = new Date();
    since.setDate(since.getDate() - sinceDays);
    since.setHours(0, 0, 0, 0);
    query = query.gte("viewed_at", since.toISOString());
  }
  const { data } = await query;
  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    // Post URLs have exactly two non-empty segments.
    const segments = row.path.split("/").filter(Boolean);
    if (segments.length !== 2) continue;
    counts[row.path] = (counts[row.path] ?? 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([path, views]) => ({ path, views }));
}

// Generic "group a single text column and rank by count" helper, mirroring
// the in-memory aggregation used by getPopularPaths. `fallback` labels rows
// where the column is null/empty (e.g. "Direct" for missing referrers).
async function getColumnBreakdown(
  column: "referrer_host" | "device" | "country",
  { limit, fallback }: { limit?: number; fallback?: string } = {}
): Promise<BreakdownStat[]> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from("page_views").select(column);
  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    const raw = (row as Record<string, string | null>)[column];
    const label = raw && raw.trim() !== "" ? raw : fallback;
    if (!label) continue;
    counts[label] = (counts[label] ?? 0) + 1;
  }

  const ranked = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, views]) => ({ label, views }));

  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}

export function getTopReferrers(limit = 8): Promise<BreakdownStat[]> {
  return getColumnBreakdown("referrer_host", { limit, fallback: "Direct" });
}

export function getDeviceBreakdown(): Promise<BreakdownStat[]> {
  return getColumnBreakdown("device", { fallback: "Tidak diketahui" });
}

export function getCountryBreakdown(limit = 8): Promise<BreakdownStat[]> {
  return getColumnBreakdown("country", { limit, fallback: "Tidak diketahui" });
}

export async function getDailyViews(days = 14): Promise<DayStat[]> {
  const admin = createSupabaseAdminClient();

  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);

  const { data } = await admin
    .from("page_views")
    .select("viewed_at")
    .gte("viewed_at", start.toISOString());

  if (!data) return [];

  const counts: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    counts[d.toISOString().slice(0, 10)] = 0;
  }
  for (const row of data) {
    const date = row.viewed_at.slice(0, 10);
    if (date in counts) counts[date] = (counts[date] ?? 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, views]) => ({ date, views }));
}
