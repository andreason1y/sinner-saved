/**
 * Central site configuration. Single source of truth for the canonical
 * URL, name, and descriptions used across metadata, sitemap, robots,
 * RSS feed, and structured data.
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sinner-saved.xyz",
  name: "SinnerSaved",
  title: "SinnerSaved — Catatan Iman",
  description:
    "Membaca Alkitab dengan jujur, berpikir dengan tertib, dan hidup dalam kasih karunia.",
  locale: "id_ID",
} as const;

/** Builds an absolute URL from a path (e.g. "/arsip" → full URL). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
