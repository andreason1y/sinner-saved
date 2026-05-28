import Link from "next/link";
import {
  getSetupStatus,
  readSchemaSqlAction,
  seedSampleDataAction,
} from "@/lib/actions/setup";
import { SetupClient } from "@/components/admin/SetupClient";

export const metadata = { title: "Admin · Setup" };
export const dynamic = "force-dynamic";

type Props = {
  searchParams?: {
    seeded?: string;
    inserted?: string;
    email?: string;
    error?: string;
    errors?: string;
  };
};

/**
 * Self-service setup page. Walks the project owner through:
 *   1) Apply supabase/schema.sql in the Supabase SQL Editor.
 *   2) Seed sample data + create the admin user.
 *
 * Reachable at /admin/setup. The middleware whitelist allows this
 * route without requiring an admin session, otherwise the very first
 * setup would be impossible.
 */
export default async function AdminSetupPage({ searchParams }: Props) {
  const [status, schemaSql] = await Promise.all([
    getSetupStatus(),
    readSchemaSqlAction(),
  ]);

  const projectRef = (() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) return null;
    const m = url.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co/i);
    return m ? m[1] : null;
  })();
  const sqlEditorUrl = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}/sql/new`
    : "https://supabase.com/dashboard";

  return (
    <div className="min-h-screen bg-parchment px-5 py-12 sm:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">
          Admin · One-shot setup
        </p>
        <h1 className="serif-display mt-3 text-4xl tracking-tightest text-ink-900 sm:text-5xl">
          Aktifkan Database
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-500">
          Halaman ini menyiapkan project Supabase Anda — apply skema, set
          policies, buat user admin, dan isi 9 artikel awal — dalam dua
          langkah singkat.
        </p>

        {/* Result banners (after seed action redirects back here) */}
        {searchParams?.error && (
          <div className="mt-8 rounded-2xl border border-crimson-500/30 bg-crimson-500/5 p-5 text-sm text-crimson-700">
            <p className="font-medium">Setup gagal.</p>
            <p className="mt-1 text-crimson-600/90">{searchParams.error}</p>
          </div>
        )}
        {searchParams?.seeded === "1" && !searchParams?.error && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-sm text-emerald-800">
            <p className="font-medium">Seed selesai.</p>
            <p className="mt-1">
              {searchParams.inserted ?? "0"} artikel ter-upsert.
              {searchParams.email && (
                <>
                  {" "}Login admin:{" "}
                  <code className="rounded bg-emerald-600/10 px-1">
                    {searchParams.email}
                  </code>
                </>
              )}
            </p>
            {searchParams.errors && (
              <p className="mt-2 text-emerald-700/80">
                Catatan: {searchParams.errors}
              </p>
            )}
          </div>
        )}

        {/* Status panel */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatusRow
            label="Env vars"
            ok={!!process.env.NEXT_PUBLIC_SUPABASE_URL}
            detail={
              process.env.NEXT_PUBLIC_SUPABASE_URL
                ? "URL & service-role terbaca"
                : "NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum ter-set"
            }
          />
          <StatusRow
            label="Schema (tables + RLS)"
            ok={status.schemaApplied}
            detail={
              status.schemaApplied
                ? "Tabel posts/profiles aktif"
                : status.schemaError
                  ? "Belum di-apply"
                  : "Belum dicek"
            }
          />
          <StatusRow
            label="Storage bucket"
            ok={status.bucketExists}
            detail={
              status.bucketExists ? "post-covers ✓" : "post-covers belum ada"
            }
          />
          <StatusRow
            label="Admin user"
            ok={status.adminUserExists}
            detail={
              status.adminUserExists
                ? "Sudah ada akun admin"
                : "Belum ada — akan dibuat di langkah 2"
            }
          />
        </div>

        {/* Step 1: schema */}
        <Step
          n={1}
          title="Apply schema ke Supabase"
          done={status.schemaApplied}
        >
          {status.schemaApplied ? (
            <p className="text-sm text-emerald-700">
              Skema sudah aktif di project Anda. Lanjut ke langkah 2.
            </p>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-ink-600">
                Kami tidak bisa menjalankan{" "}
                <code className="rounded bg-parchment-deep/60 px-1">
                  CREATE TABLE
                </code>{" "}
                lewat REST API. Buka SQL Editor Supabase Anda, paste isi
                file <code>supabase/schema.sql</code>, klik <em>Run</em>.
                Skripnya idempotent — aman di-run ulang.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={sqlEditorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-parchment hover:bg-ink-800"
                >
                  Buka SQL Editor →
                </a>
                <SetupClient sql={schemaSql} />
              </div>
            </>
          )}
        </Step>

        {/* Step 2: seed */}
        <Step
          n={2}
          title="Buat admin user + seed 9 artikel"
          done={status.schemaApplied && status.adminUserExists && status.postCount >= 9}
          disabled={!status.schemaApplied}
        >
          {!status.schemaApplied ? (
            <p className="text-sm text-ink-500">
              Selesaikan langkah 1 terlebih dahulu.
            </p>
          ) : status.adminUserExists && status.postCount >= 9 ? (
            <div className="space-y-3 text-sm text-emerald-700">
              <p>
                Admin user sudah ada. Total tulisan ter-publish:{" "}
                <strong>{status.postCount}</strong>.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-parchment hover:bg-ink-800"
              >
                Lanjut ke login →
              </Link>
            </div>
          ) : (
            <form action={seedSampleDataAction} className="space-y-4">
              <p className="text-sm leading-relaxed text-ink-600">
                Akan membuat user admin (kalau belum ada) dan upsert 9
                artikel sample sebagai status <em>published</em>. Aman
                diulang — tidak akan duplikasi.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  name="email"
                  label="Email admin"
                  defaultValue="andreassina6a@gmail.com"
                  type="email"
                />
                <Field
                  name="password"
                  label="Password admin"
                  defaultValue="admin11!"
                  type="text"
                />
                <Field
                  name="display_name"
                  label="Display name"
                  defaultValue="Andreas Sina"
                  type="text"
                />
              </div>
              <p className="text-[11px] text-ink-500">
                Anda bisa ganti email/password sesuai keinginan sebelum
                klik tombol di bawah. Password bisa Anda ubah lagi nanti
                lewat Supabase Dashboard.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-sacred-500 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-ink-900 hover:bg-sacred-400"
              >
                Jalankan seed →
              </button>
            </form>
          )}
        </Step>

        <div className="mt-12 border-t border-ink-900/10 pt-8 text-xs text-ink-500">
          <p>
            Sudah selesai?{" "}
            <Link href="/admin/login" className="link-underline text-ink-800">
              Masuk ke /admin/login
            </Link>{" "}
            atau{" "}
            <Link href="/" className="link-underline text-ink-800">
              kembali ke situs publik
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-ink-900/10 bg-white px-4 py-3">
      <span
        className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${
          ok ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm text-ink-800">{detail}</p>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  done,
  disabled,
  children,
}: {
  n: number;
  title: string;
  done?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`mt-8 rounded-2xl border p-6 sm:p-8 ${
        done
          ? "border-emerald-300 bg-emerald-50/50"
          : disabled
            ? "border-ink-900/10 bg-parchment-deep/30 opacity-70"
            : "border-ink-900/15 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
            done
              ? "bg-emerald-500 text-white"
              : "bg-ink-900 text-parchment"
          }`}
        >
          {done ? "✓" : n}
        </span>
        <h2 className="serif-display text-2xl tracking-tightest text-ink-900">
          {title}
        </h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-ink-500">
        {label}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-ink-900 focus:ring-2 focus:ring-sacred-500/40"
      />
    </label>
  );
}
