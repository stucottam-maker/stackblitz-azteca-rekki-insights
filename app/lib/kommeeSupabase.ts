const KOMMEE_TEST_PROJECT_REF = "zfkzpqqyzjizjxijmpde";
const KOMMEE_PRODUCTION_PROJECT_REF = "owwabaoxadjhkxiijbjp";

export function requireKommeeSupabaseUrl(value: string | undefined) {
  if (!value) {
    throw new Error("Kommee Supabase is not configured for this deployment.");
  }

  let hostname: string;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.port || parsed.pathname !== "/" || parsed.search || parsed.hash) {
      throw new Error("Invalid Supabase URL");
    }
    hostname = parsed.hostname.toLowerCase();
  } catch {
    throw new Error("Kommee Supabase URL is invalid.");
  }

  const testHost = `${KOMMEE_TEST_PROJECT_REF}.supabase.co`;
  const productionHost = `${KOMMEE_PRODUCTION_PROJECT_REF}.supabase.co`;
  if (hostname !== testHost && hostname !== productionHost) {
    throw new Error("Blocked: this Kommee build is not connected to an authorised Supabase project.");
  }

  // Enforce environment isolation server-side. In the browser, Vercel's
  // server-only environment variables are deliberately unavailable.
  if (typeof window === "undefined") {
    const environment = process.env.VERCEL_ENV;
    if (environment === "production" && hostname !== productionHost) {
      throw new Error("Blocked: the production Kommee deployment must use production Supabase.");
    }
    if (environment === "preview" && hostname !== testHost) {
      throw new Error("Blocked: the Kommee preview must use isolated test Supabase.");
    }
  }

  return value;
}
