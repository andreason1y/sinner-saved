import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on /admin/* and /admin/login.
     * Skip Next internals and static assets.
     */
    "/admin/:path*",
    "/admin",
  ],
};
