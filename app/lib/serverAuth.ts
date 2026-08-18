import { createClient } from "@supabase/supabase-js";

export const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function requireOrganisation(request: Request) {
  const token = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "")
    .trim();

  if (!token) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  const { data: authData, error: authError } =
    await serviceSupabase.auth.getUser(token);

  if (authError || !authData.user) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  const { data: membership, error: membershipError } = await serviceSupabase
    .from("organisation_members")
    .select("organisation_id")
    .eq("user_id", authData.user.id)
    .limit(1)
    .maybeSingle();

  if (membershipError) {
    throw membershipError;
  }

  if (!membership?.organisation_id) {
    throw Object.assign(new Error("No organisation membership"), { status: 403 });
  }

  const { data: site, error: siteError } = await serviceSupabase
    .from("sites")
    .select("id,organisation_id")
    .eq("organisation_id", membership.organisation_id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (siteError) {
    throw siteError;
  }

  if (!site) {
    throw Object.assign(new Error("No site is configured for this organisation"), {
      status: 403,
    });
  }

  return {
    token,
    user: authData.user,
    organisationId: membership.organisation_id as string,
    siteId: site.id as string,
  };
}

export function authErrorResponse(error: unknown) {
  const err = error as Error & { status?: number };
  const status = err?.status && Number.isInteger(err.status) ? err.status : 500;

  return {
    status,
    message:
      status === 500
        ? err?.message || "Server error"
        : err?.message || "Unauthorized",
  };
}
