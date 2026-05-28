"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { CATEGORIES, localizeCategory } from "@/lib/categories";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function Footer() {
  const { t, locale } = useLocale();

  return (
    <footer className="relative mt-32 border-t border-ink-900/10 bg-ink-950 text-ink-100 dark:border-white/5">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
        {/* Brand block */}
        <div className="lg:col-span-5">
          <p className="serif-display text-4xl tracking-tightest text-ink-50">
            Sinner<span className="italic text-sacred-300">Saved</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
            {t.footer.tagline}
          </p>

          {/* Email contact block */}
          <div className="mt-8 inline-flex flex-col gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
            <p className="text-[10px] uppercase tracking-[0.32em] text-sacred-300">
              {t.footer.sectionContact}
            </p>
            <a
              href="mailto:andreassina6a@gmail.com"
              className="serif-display group inline-flex items-center gap-2 text-lg text-ink-50 hover:text-sacred-300"
            >
              <Mail size={16} className="opacity-70 transition-transform group-hover:-translate-y-0.5" />
              andreassina6a@gmail.com
            </a>
            <p className="text-xs text-ink-400">
              {t.contact.blurb.split(".")[0]}.
            </p>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.32em] text-ink-400">
            By a sinner, for sinners — saved by grace alone.
          </p>
        </div>

        {/* Sitemap */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
          {CATEGORIES.map((rawCat) => {
            const cat = localizeCategory(rawCat, locale);
            return (
            <div key={cat.slug}>
              <p className="text-xs uppercase tracking-[0.22em] text-sacred-300">
                {cat.name}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink-200">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/kategori/${cat.slug}/${sub.slug}`}
                      className="link-underline text-ink-200/80 hover:text-ink-50"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} SinnerSaved. {t.footer.glory}</p>
          <p className="opacity-70">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
