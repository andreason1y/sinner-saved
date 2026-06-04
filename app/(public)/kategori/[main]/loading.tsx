/**
 * Skeleton for category + sub-category archives. Placed at the [main]
 * segment so it also covers the nested [sub] route. Mirrors CategoryArchive:
 * header, filter row, then a 3-column card grid.
 */
export default function CategoryLoading() {
  return (
    <section className="relative pb-32 pt-28 sm:pt-32" aria-busy="true" aria-label="Memuat kategori">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="skeleton h-3 w-40 shrink-0" />
          <span className="h-px flex-1 bg-gold-leaf opacity-40" />
        </div>
        <div className="skeleton mt-6 h-14 w-2/3" />
        <div className="skeleton mt-6 h-4 w-full max-w-2xl" />
        <div className="skeleton mt-2 h-4 w-1/2 max-w-md" />

        {/* Filter row */}
        <div className="mt-12 flex flex-wrap gap-2 border-y border-ink-900/10 py-5 dark:border-white/10">
          {[64, 88, 72, 96, 80].map((w, i) => (
            <div key={i} className="skeleton h-8 rounded-full" style={{ width: w }} />
          ))}
        </div>

        {/* Card grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-parchment-light shadow-card ring-1 ring-ink-900/10 dark:bg-ink-900 dark:ring-white/10"
            >
              <div className="skeleton aspect-[4/3] w-full !rounded-none" />
              <div className="space-y-3 p-5">
                <div className="skeleton h-2.5 w-20" />
                <div className="skeleton h-5 w-full" />
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton mt-2 h-3 w-full" />
                <div className="flex justify-between pt-2">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-3 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
