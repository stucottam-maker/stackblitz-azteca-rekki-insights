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

const ACTIVE_WORKSPACE_COOKIE = "ki_workspace";

function requestedWorkspace(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const entry = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${ACTIVE_WORKSPACE_COOKIE}=`));

  if (!entry) return null;

  try {
    const value = decodeURIComponent(entry.slice(ACTIVE_WORKSPACE_COOKIE.length + 1));
    const [organisationId, siteId] = value.split(".");
    return organisationId && siteId ? { organisationId, siteId } : null;
  } catch {
    return null;
  }
}

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

  const requested = requestedWorkspace(request);

  let membershipQuery = serviceSupabase
    .from("organisation_members")
    .select("organisation_id,role")
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: true });

  if (requested?.organisationId) {
    membershipQuery = membershipQuery.eq(
      "organisation_id",
      requested.organisationId
    );
  }

  const { data: memberships, error: membershipError } = await membershipQuery.limit(1);

  if (membershipError) throw membershipError;

  const membership = memberships?.[0] ?? null;
  if (!membership?.organisation_id) {
    throw Object.assign(
      new Error(
        requested
          ? "You do not have access to the selected organisation"
          : "No organisation membership"
      ),
      { status: 403 }
    );
  }

  let siteQuery = serviceSupabase
    .from("sites")
    .select("id,organisation_id,name,location")
    .eq("organisation_id", membership.organisation_id)
    .order("created_at", { ascending: true });

  if (requested?.siteId) {
    siteQuery = siteQuery.eq("id", requested.siteId);
  }

  const { data: sites, error: siteError } = await siteQuery.limit(1);

  if (siteError) throw siteError;

  const site = sites?.[0] ?? null;
  if (!site) {
    throw Object.assign(
      new Error(
        requested
          ? "You do not have access to the selected site"
          : "No site is configured for this organisation"
      ),
      { status: 403 }
    );
  }

  return {
    token,
    user: authData.user,
    organisationId: membership.organisation_id as string,
    siteId: site.id as string,
    role: membership.role as string,
    siteName: site.name as string,
    siteLocation: (site.location as string | null) ?? "",
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
