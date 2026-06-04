import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n/dictionary";
import type { Post } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Locale-aware title/excerpt for a post. Falls back to the Indonesian text
 * when the English translation hasn't been generated yet, so cards never go
 * blank. Lets list/card components localize instantly on a locale toggle
 * (the English fields are already part of the fetched post data).
 */
export function postTitle(
  post: Pick<Post, "title" | "titleEn">,
  locale: Locale
): string {
  return locale === "en" && post.titleEn ? post.titleEn : post.title;
}

export function postExcerpt(
  post: Pick<Post, "excerpt" | "excerptEn">,
  locale: Locale
): string {
  return locale === "en" && post.excerptEn ? post.excerptEn : post.excerpt;
}

const LOCALE_MAP: Record<Locale, string> = {
  id: "id-ID",
  en: "en-US",
};

export function formatDate(date: string | Date, locale: Locale = "id") {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(LOCALE_MAP[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} menit baca`;
}
