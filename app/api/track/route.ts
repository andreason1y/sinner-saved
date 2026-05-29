import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const cookieStore = cookies();
    const existing = cookieStore.get("ss-visitor")?.value;
    const visitorId = existing ?? crypto.randomUUID();

    const admin = createSupabaseAdminClient();
    await admin.from("page_views").insert({ path, visitor_id: visitorId });

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
