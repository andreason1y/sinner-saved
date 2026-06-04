/**
 * Instant skeleton for a post page. Next.js renders this the moment a
 * post link is clicked, while the (force-dynamic) page renders on the
 * server — so the click feels immediate instead of "hanging".
 * Mirrors the real article layout: cover, header card, prose, TOC.
 */
export default function PostLoading() {
  return (
    <article className="relative overflow-x-clip" aria-busy="true" aria-label="Memuat tulisan">
      {/* Cover */}
      <div className="skeleton h-[55vh] min-h-[420px] w-full !rounded-none" />

      {/* Header card */}
      <header className="relative mx-auto -mt-32 max-w-3xl px-5 pb-12 lg:px-0">
        <div className="rounded-3xl bg-parchment p-8 shadow-card dark:bg-ink-900 sm:p-12">
          <div className="skeleton h-3 w-32" />
          <div className="skeleton mt-4 h-3 w-24" />
          <div className="skeleton mt-6 h-10 w-full" />
          <div className="skeleton mt-3 h-10 w-4/5" />
          <div className="skeleton mt-7 h-4 w-full" />
          <div className="skeleton mt-2 h-4 w-2/3" />
          <div className="mt-8 flex gap-4">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-3 w-20" />
            <div className="skeleton h-3 w-16" />
          </div>
        </div>
      </header>

      {/* Body + TOC */}
      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="min-w-0 space-y-4 lg:col-span-8 lg:col-start-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="skeleton h-4"
                style={{ width: `${[100, 96, 88, 100, 70, 94, 82, 60][i]}%` }}
              />
            ))}
            <div className="skeleton mt-8 h-4 w-full" />
            <div className="skeleton h-4 w-11/12" />
            <div className="skeleton h-4 w-3/4" />
          </div>

          <aside className="hidden lg:col-span-3 lg:block">
            <div className="skeleton h-3 w-24" />
            <div className="mt-5 space-y-3">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-5/6" />
              <div className="skeleton h-3 w-4/6" />
              <div className="skeleton h-3 w-3/4" />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
