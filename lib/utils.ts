import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n/dictionary";
import type { Post } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function localizePost(post: Post, locale: Locale): Post {
  if (locale === "id") return post;
  return {
    ...post,
    title: post.titleEn ?? post.title,
    excerpt: post.excerptEn ?? post.excerpt,
  };
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} menit baca`;
}
