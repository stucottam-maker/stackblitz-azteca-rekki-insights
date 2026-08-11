import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.https://owwabaoxadjhkxiijbjp.supabase.co!;
const supabasePublishableKey =
  process.env.sb_publishable_rf9sqxZKVb13cAWqEb2_6g_OuvKC12D!;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
