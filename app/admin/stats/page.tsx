import {
  getStatsOverview,
  getPopularPaths,
  getDailyViews,
  getTopReferrers,
  getDeviceBreakdown,
  getCountryBreakdown,
} from "@/lib/analytics";
import { isSupabaseConfigured } from "@/lib/posts";
import { Monitor, Smartphone, Tablet, Globe, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Statistik" };

const COUNTRY_NAMES: Record<string, string> = {
  ID: "Indonesia", US: "Amerika Serikat", GB: "Inggris", MY: "Malaysia",
  SG: "Singapura", AU: "Australia", NL: "Belanda", DE: "Jerman",
  JP: "Jepang", KR: "Korea Selatan", IN: "India", CA: "Kanada",
  FR: "Prancis", BR: "Brasil", PH: "Filipina", TH: "Thailand",
  NZ: "Selandia Baru", SA: "Arab Saudi", AE: "Uni Emirat Arab",
  CN: "Tiongkok", HK: "Hong Kong", TW: "Taiwan",
};

function countryLabel(code: string) {
  return COUNTRY_NAMES[code.toUpperCase()] ?? code;
}

const DEVICE_ICONS: Record<string, React.ReactNode> = {
  desktop: <Monitor size={14} className="shrink-0" />,
  mobile:  <Smartphone size={14} className="shrink-0" />,
  tablet:  <Tablet size={14} className="shrink-0" />,
};

export default async function StatsPage() {
  const configured = isSupabaseConfigured();
  if (!configured) {
    return (
      <div className="px-6 py-10 lg:px-12 lg:py-14">
        <p className="text-sm text-ink-500">Supabase belum terkonfigurasi.</p>
      </div>
    );
  }

  const [overview, popular, daily, referrers, devices, countries] =
    await Promise.all([
      getStatsOverview(),
      getPopularPaths(10),
      getDailyViews(14),
      getTopReferrers(8),
      getDeviceBreakdown(),
      getCountryBreakdown(8),
    ]);

  const maxDaily  = Math.max(...daily.map((d) => d.views), 1);
  const maxPopular = Math.max(...popular.map((p) => p.views), 1);

  const totalDevice = devices.reduce((s, d) => s + d.views, 0) || 1;

  return (
    <div className="px-6 py-10 lg:px-12 lg:py-14">
      {/* Header */}
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
        <StatTile label="Total Views"          value={overview.totalViews} />
        <StatTile label="Hari Ini"             value={overview.viewsToday} />
        <StatTile label="7 Hari"               value={overview.viewsThisWeek} />
        <StatTile label="Pengunjung Unik (7h)" value={overview.uniqueVisitors7d} accent />
      </div>

      {/* Halaman populer + grafik harian */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">

        {/* Popular pages — with proportion bars */}
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink-500">Halaman Populer</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
            {popular.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-ink-400">Belum ada data kunjungan.</p>
            ) : (
              <div className="divide-y divide-ink-900/5">
                {popular.map(({ path, views }) => {
                  const pct = Math.round((views / maxPopular) * 100);
                  return (
                    <div key={path} className="group flex items-center gap-3 px-5 py-3 hover:bg-parchment-deep/30">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-mono text-xs text-ink-700">{path}</span>
                          <ArrowUpRight size={10} className="shrink-0 text-ink-300 opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="mt-1.5 overflow-hidden rounded-full bg-ink-900/5">
                          <div
                            className="h-1 rounded-full bg-sacred-400 transition-all"
                            style={{ width: `${Math.max(pct, 2)}%` }}
                          />
                        </div>
                      </div>
                      <span className="serif-display w-10 shrink-0 text-right text-base text-ink-900">
                        {views}
                      </span>
                    </div>
                  );
                })}
              </div>
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
              <p className="py-8 text-center text-sm text-ink-400">Belum ada data kunjungan.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {daily.map(({ date, views }) => {
                  const label = new Date(date + "T00:00:00").toLocaleDateString("id-ID", {
                    day: "numeric", month: "short",
                  });
                  const pct = Math.round((views / maxDaily) * 100);
                  return (
                    <div key={date} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-right text-[11px] text-ink-400">{label}</span>
                      <div className="flex-1 overflow-hidden rounded-full bg-ink-900/5">
                        <div
                          className="h-2 rounded-full bg-sacred-500 transition-all"
                          style={{ width: `${Math.max(pct, views > 0 ? 2 : 0)}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-[11px] text-ink-500">{views}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audience breakdowns */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Sumber Traffic */}
        <BreakdownCard title="Sumber Traffic" empty={referrers.length === 0}>
          {referrers.map(({ label, views }) => {
            const total = referrers.reduce((s, r) => s + r.views, 0) || 1;
            const pct = Math.round((views / total) * 100);
            return (
              <BreakdownRow
                key={label}
                label={label}
                views={views}
                pct={pct}
                barColor="bg-sacred-500"
              />
            );
          })}
        </BreakdownCard>

        {/* Perangkat — donut-style percentage + icon */}
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink-500">Perangkat</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
            {devices.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-ink-400">Belum ada data kunjungan.</p>
            ) : (
              <div className="divide-y divide-ink-900/5">
                {devices.map(({ label, views }) => {
                  const pct = Math.round((views / totalDevice) * 100);
                  const icon = DEVICE_ICONS[label.toLowerCase()] ?? <Monitor size={14} className="shrink-0" />;
                  return (
                    <div key={label} className="flex items-center gap-3 px-5 py-3.5 hover:bg-parchment-deep/30">
                      <span className="text-ink-400">{icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm capitalize text-ink-700">{label}</span>
                          <span className="text-xs text-ink-400">{pct}%</span>
                        </div>
                        <div className="mt-1.5 overflow-hidden rounded-full bg-ink-900/5">
                          <div
                            className="h-1.5 rounded-full bg-ink-700 transition-all"
                            style={{ width: `${Math.max(pct, 2)}%` }}
                          />
                        </div>
                      </div>
                      <span className="serif-display w-8 shrink-0 text-right text-base text-ink-900">
                        {views}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Negara */}
        <BreakdownCard title="Negara" empty={countries.length === 0}>
          {countries.map(({ label, views }) => {
            const total = countries.reduce((s, c) => s + c.views, 0) || 1;
            const pct = Math.round((views / total) * 100);
            const isCode = /^[A-Z]{2}$/.test(label);
            return (
              <BreakdownRow
                key={label}
                icon={isCode ? <Globe size={13} className="shrink-0 text-ink-400" /> : undefined}
                label={isCode ? countryLabel(label) : label}
                views={views}
                pct={pct}
                barColor="bg-sacred-400"
              />
            );
          })}
        </BreakdownCard>

      </div>
    </div>
  );
}

/* ── sub-components ──────────────────────────────────────────────────── */

function BreakdownCard({
  title,
  empty,
  children,
}: {
  title: string;
  empty: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.32em] text-ink-500">{title}</p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
        {empty ? (
          <p className="px-6 py-8 text-center text-sm text-ink-400">Belum ada data kunjungan.</p>
        ) : (
          <div className="divide-y divide-ink-900/5">{children}</div>
        )}
      </div>
    </div>
  );
}

function BreakdownRow({
  icon,
  label,
  views,
  pct,
  barColor,
}: {
  icon?: React.ReactNode;
  label: string;
  views: number;
  pct: number;
  barColor: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-parchment-deep/30">
      {icon && <span>{icon}</span>}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm text-ink-700">{label}</span>
          <span className="ml-2 shrink-0 text-xs text-ink-400">{pct}%</span>
        </div>
        <div className="mt-1.5 overflow-hidden rounded-full bg-ink-900/5">
          <div
            className={`h-1.5 rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.max(pct, 2)}%` }}
          />
        </div>
      </div>
      <span className="serif-display w-8 shrink-0 text-right text-base text-ink-900">
        {views}
      </span>
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
        accent ? "border-sacred-300 bg-sacred-50" : "border-ink-900/10 bg-white"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-ink-500">{label}</p>
      <p className="serif-display mt-2 text-4xl tracking-tightest text-ink-900">
        {value.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
