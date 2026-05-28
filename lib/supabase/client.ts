// Phase 3 will fully wire up Supabase Auth + RLS-backed CMS.
// For Phase 1 we expose a thin browser client factory for forward-compat.
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
