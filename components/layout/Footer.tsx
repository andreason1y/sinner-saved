import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-ink-900/10 bg-ink-950 text-ink-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
        {/* Brand block */}
        <div className="lg:col-span-5">
          <p className="serif-display text-4xl tracking-tightest text-ink-50">
            Sinner<span className="italic text-sacred-300">Saved</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
            Jurnal teologi independen — membaca Alkitab dengan jujur, berpikir
            dengan tertib, dan hidup dalam kasih karunia. Semua tulisan ditulis
            secara perlahan, bukan reaktif.
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.32em] text-ink-400">
            By a sinner, for sinners — saved by grace alone.
          </p>
        </div>

        {/* Sitemap */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
          {CATEGORIES.map((cat) => (
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
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} SinnerSaved. Soli Deo Gloria.
          </p>
          <p className="opacity-70">
            Built with Next.js · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
