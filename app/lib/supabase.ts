import { createClient } from "@supabase/supabase-js";
import { requireKommeeSupabaseUrl } from "./kommeeSupabase";

export const supabase = createClient(
  requireKommeeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!
);
