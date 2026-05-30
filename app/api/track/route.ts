import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseUserAgent } from "@/lib/analytics/ua";

// Resolve the referrer's host, treating same-origin and empty referrers as
// "Direct" (null). Internal SPA navigations carry our own host as referrer,
// so we don't want to count them as a traffic source.
function referrerHost(referrer: unknown, selfHost: string | null): string | null {
  if (typeof referrer !== "string" || referrer === "") return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (selfHost && host === selfHost.replace(/^www\./, "")) return null;
    return host || null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { path, referrer } = await req.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const cookieStore = cookies();
    const existing = cookieStore.get("ss-visitor")?.value;
    const visitorId = existing ?? crypto.randomUUID();

    // Enrichment from request metadata (best-effort; never blocks the insert).
    const h = headers();
    const { device, browser, os } = parseUserAgent(h.get("user-agent"));
    const country =
      h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? null;
    const host = h.get("host");

    const admin = createSupabaseAdminClient();
    await admin.from("page_views").insert({
      path,
      visitor_id: visitorId,
      referrer_host: referrerHost(referrer, host),
      device,
      browser,
      os,
      country: country && country !== "XX" ? country : null,
    });

    const res = NextResponse.json({ ok: true });
    if (!existing) {
      res.cookies.set("ss-visitor", visitorId, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
