import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/actions/auth";
import { LogOut, FilePlus, LayoutDashboard, ExternalLink, BarChart2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only show the admin sidebar for confirmed admins. Middleware already
  // gates protected routes; the login route renders this layout too, so
  // we keep the shell minimal for unauthenticated visitors.
  let displayName = "";
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, role, email")
      .eq("id", user.id)
      .maybeSingle();
    isAdmin = profile?.role === "admin";
    displayName = profile?.display_name || profile?.email || "Admin";
  }

  return (
    <div className="min-h-screen bg-parchment-deep/40">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {isAdmin && (
          <aside className="hidden w-64 shrink-0 border-r border-ink-900/10 bg-parchment p-6 lg:block">
            <Link href="/" className="block">
              <span className="serif-display text-xl tracking-tightest text-ink-900">
                Sinner<span className="italic text-sacred-500">Saved</span>
              </span>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.32em] text-ink-500">
                Admin Panel
              </p>
            </Link>
            <nav className="mt-10 flex flex-col gap-1 text-sm">
              <NavLink href="/admin" icon={<LayoutDashboard size={14} />}>
                Dashboard
              </NavLink>
              <NavLink href="/admin/posts/new" icon={<FilePlus size={14} />}>
                Tulisan baru
              </NavLink>
              <NavLink href="/admin/stats" icon={<BarChart2 size={14} />}>
                Statistik
              </NavLink>
              <NavLink href="/" icon={<ExternalLink size={14} />} external>
                Lihat situs
              </NavLink>
            </nav>
            <div className="mt-12 border-t border-ink-900/10 pt-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-ink-500">
                Masuk sebagai
              </p>
              <p className="mt-1 truncate text-sm text-ink-900">
                {displayName}
              </p>
              <form action={signOutAction} className="mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-500 hover:text-ink-900"
                >
                  <LogOut size={12} />
                  Sign out
                </button>
              </form>
            </div>
          </aside>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  external,
  children,
}: {
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
    >
      <span className="text-ink-400">{icon}</span>
      {children}
    </Link>
  );
}
