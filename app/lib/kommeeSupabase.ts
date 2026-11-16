const KOMMEE_TEST_PROJECT_REF = "zfkzpqqyzjizjxijmpde";

export function requireKommeeSupabaseUrl(value: string | undefined) {
  if (!value) {
    throw new Error("Kommee Supabase is not configured for this deployment.");
  }

  const hostname = new URL(value).hostname.toLowerCase();
  if (hostname !== `${KOMMEE_TEST_PROJECT_REF}.supabase.co`) {
    throw new Error("Blocked: this Kommee build is not connected to the isolated Kommee Supabase project.");
  }

  return value;
}
