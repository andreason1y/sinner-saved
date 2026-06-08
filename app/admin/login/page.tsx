import { LoginForm } from "@/components/admin/LoginForm";

type Props = {
  searchParams?: { next?: string; error?: string };
};

export const metadata = { title: "Admin · Login" };

export default function AdminLoginPage({ searchParams }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment p-5">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">
            Admin Panel
          </p>
          <h1 className="serif-display mt-3 text-4xl tracking-tightest text-ink-900">
            Sinner<span className="font-semibold text-sacred-500">Saved</span>
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            Akses dibatasi untuk admin saja.
          </p>
        </div>
        {searchParams?.error === "not-admin" && (
          <p className="mt-6 rounded-lg border border-crimson-500/30 bg-crimson-500/5 px-4 py-3 text-sm text-crimson-600">
            Akun ini tidak memiliki akses admin.
          </p>
        )}
        <LoginForm next={searchParams?.next} />
        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.22em] text-ink-400">
          DB baru?{" "}
          <a
            href="/admin/setup"
            className="text-ink-700 underline-offset-4 hover:underline"
          >
            Buka halaman setup
          </a>
        </p>
      </div>
    </div>
  );
}
