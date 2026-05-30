import Link from "next/link";
import { listAllPostsForAdmin } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/posts";
import { ArrowRight, Plus, Pencil } from "lucide-react";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const metadata = { title: "Admin · Dashboard" };

function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  const posts = configured ? await listAllPostsForAdmin() : [];

  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  return (
    <div className="px-6 py-10 lg:px-12 lg:py-14">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">
            Admin
          </p>
          <h1 className="serif-display mt-3 text-4xl tracking-tightest text-ink-900 sm:text-5xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-xl text-sm text-ink-500">
            Kelola tulisan, draft, dan publikasi. Halaman publik
            (re-)tergenerasi otomatis setiap kali Anda menekan Save.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-parchment transition-transform hover:scale-[1.02]"
        >
          <Plus size={14} />
          Tulisan baru
        </Link>
      </div>

      {/* Summary tiles */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <SummaryTile label="Total tulisan" value={posts.length} />
        <SummaryTile label="Diterbitkan" value={published.length} />
        <SummaryTile label="Draft" value={drafts.length} accent />
      </div>

      {!configured && (
        <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-sm text-amber-900">
          <p className="font-medium">Supabase belum terkonfigurasi.</p>
          <p className="mt-1 text-amber-800/90">
            Pastikan <code>.env.local</code> berisi{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, lalu jalankan SQL di{" "}
            <code>supabase/schema.sql</code>.
          </p>
        </div>
      )}

      {/* Posts list */}
      <div className="mt-12">
        <p className="text-xs uppercase tracking-[0.32em] text-ink-500">
          Semua tulisan
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/10">
          {posts.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-ink-500">
              Belum ada tulisan.{" "}
              <Link
                href="/admin/posts/new"
                className="link-underline text-ink-800"
              >
                Tulis yang pertama →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white">
            <table className="w-full text-sm">
              <thead className="bg-parchment-deep/50 text-[10px] uppercase tracking-[0.2em] text-ink-500">
                <tr>
                  <th className="px-5 py-3 text-left">Judul</th>
                  <th className="px-5 py-3 text-left">Kategori</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Diperbarui</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/5">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-parchment-deep/30">
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/posts/${p.id}/edit`}
                        className="serif-display text-base text-ink-900 hover:text-sacred-700"
                      >
                        {p.title}
                      </Link>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-ink-400">
                        /{p.slug}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-ink-700">
                      {categoryName(p.mainCategory)}
                      <span className="ml-1 text-ink-400">·</span>{" "}
                      <span className="text-ink-500">
                        {p.subCategory.replace(/-/g, " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-4 text-ink-500">
                      {formatDate(p.updatedAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${p.id}/edit`}
                          className="inline-flex items-center gap-1 rounded-full border border-ink-900/15 px-2.5 py-1 text-xs text-ink-600 transition-colors hover:bg-parchment-deep/40 hover:text-ink-900"
                        >
                          <Pencil size={11} />
                          Edit
                          <ArrowRight size={11} />
                        </Link>
                        <DeletePostButton id={p.id} title={p.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        accent
          ? "border-sacred-300 bg-sacred-50"
          : "border-ink-900/10 bg-white"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
        {label}
      </p>
      <p className="serif-display mt-2 text-4xl tracking-tightest text-ink-900">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: "draft" | "published" }) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-600">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-400" />
      Draft
    </span>
  );
}
