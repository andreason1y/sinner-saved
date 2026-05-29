import { getStatsOverview, getPopularPaths, getDailyViews } from "@/lib/analytics";
import { isSupabaseConfigured } from "@/lib/posts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Statistik" };

export default async function StatsPage() {
  const configured = isSupabaseConfigured();
  if (!configured) {
    return (
      <div className="px-6 py-10 lg:px-12 lg:py-14">
        <p className="text-sm text-ink-500">Supabase belum terkonfigurasi.</p>
      </div>
    );
  }

  const [overview, popular, daily] = await Promise.all([
    getStatsOverview(),
    getPopularPaths(10),
    getDailyViews(14),
  ]);

  const maxDaily = Math.max(...daily.map((d) => d.views), 1);

  return (
    <div className="px-6 py-10 lg:px-12 lg:py-14">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">Admin</p>
        <h1 className="serif-display mt-3 text-4xl tracking-tightest text-ink-900 sm:text-5xl">
          Statistik
        </h1>
        <p className="mt-3 max-w-xl text-sm text-ink-500">
          Data kunjungan halaman publik. Diperbarui real-time.
        </p>
      </div>

      {/* Summary tiles */}
      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
        <StatTile label="Total Views" value={overview.totalViews} />
        <StatTile label="Hari Ini" value={overview.viewsToday} />
        <StatTile label="7 Hari" value={overview.viewsThisWeek} />
        <StatTile label="Pengunjung Unik (7h)" value={overview.uniqueVisitors7d} accent />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Popular pages */}
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink-500">
            Halaman Populer
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
            {popular.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-ink-400">
                Belum ada data kunjungan.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-parchment-deep/50 text-[10px] uppercase tracking-[0.2em] text-ink-500">
                  <tr>
                    <th className="px-5 py-3 text-left">Halaman</th>
                    <th className="px-5 py-3 text-right">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/5">
                  {popular.map(({ path, views }) => (
                    <tr key={path} className="hover:bg-parchment-deep/30">
                      <td className="max-w-[240px] truncate px-5 py-3 font-mono text-xs text-ink-700">
                        {path}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="serif-display text-base text-ink-900">
                          {views}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Daily bar chart */}
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink-500">
            Views per Hari (14 Hari Terakhir)
          </p>
          <div className="mt-4 rounded-2xl border border-ink-900/10 bg-white p-5">
            {daily.every((d) => d.views === 0) ? (
              <p className="py-8 text-center text-sm text-ink-400">
                Belum ada data kunjungan.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {daily.map(({ date, views }) => {
                  const label = new Date(date + "T00:00:00").toLocaleDateString(
                    "id-ID",
                    { day: "numeric", month: "short" }
                  );
                  const pct = Math.round((views / maxDaily) * 100);
                  return (
                    <div key={date} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-right text-[11px] text-ink-400">
                        {label}
                      </span>
                      <div className="flex-1 overflow-hidden rounded-full bg-ink-900/5">
                        <div
                          className="h-2 rounded-full bg-sacred-500 transition-all"
                          style={{ width: `${Math.max(pct, views > 0 ? 2 : 0)}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-[11px] text-ink-500">
                        {views}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({
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
      <p className="text-xs uppercase tracking-[0.28em] text-ink-500">{label}</p>
      <p className="serif-display mt-2 text-4xl tracking-tightest text-ink-900">
        {value.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
