"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Props = {
  mainCategorySlug: string;
  categoryName: string;
  categoryNameEn: string;
  subName: string;
  subNameEn: string;
};

export function PostCategoryBreadcrumb({
  mainCategorySlug,
  categoryName,
  categoryNameEn,
  subName,
  subNameEn,
}: Props) {
  const { locale } = useLocale();
  const displayCategory = locale === "en" ? categoryNameEn : categoryName;
  const displaySub = locale === "en" ? subNameEn : subName;

  return (
    <>
      <Link
        href={`/kategori/${mainCategorySlug}`}
        className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.28em] text-sacred-600 hover:text-sacred-700 dark:text-sacred-300 dark:hover:text-sacred-200"
      >
        <ChevronLeft size={12} />
        {displayCategory}
      </Link>
      <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-ink-500 dark:text-ink-400">
        {displaySub}
      </p>
    </>
  );
}
