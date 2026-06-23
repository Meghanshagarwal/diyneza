import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

// Cookie-less Supabase client for PUBLIC, cacheable reads (homepage content,
// blog, etc.). Using the cookie-based server client forces every route to be
// dynamic (it reads next/headers cookies), adding a DB round-trip to TTFB.
// This client has no session, so pages that only read public data can be
// statically generated / ISR-cached.
let client: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  if (client) return client;
  client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  return client;
}
