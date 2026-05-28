import Link from "next/link";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ main: c.slug }));
}

export default function CategoryPlaceholder({
  params,
}: {
  params: { main: string };
}) {
  const cat = getCategory(params.main);
  if (!cat) notFound();

  return (
    <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
      <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">
        Kategori
      </p>
      <h1 className="serif-display mt-4 text-5xl leading-tight tracking-tightest text-ink-900">
        {cat.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-600">{cat.blurb}</p>
      <div className="mt-10 flex flex-wrap gap-2">
        {cat.subcategories.map((s) => (
          <span
            key={s.slug}
            className="rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs text-ink-700"
          >
            {s.name}
          </span>
        ))}
      </div>
      <p className="mt-16 text-sm text-ink-500">
        Halaman arsip lengkap akan tersedia di <strong>Phase 2</strong>.{" "}
        <Link href="/" className="link-underline text-ink-800">
          Kembali ke beranda
        </Link>
      </p>
    </section>
  );
}
