import { supabase } from "./supabase";

export const ACTIVE_WORKSPACE_STORAGE_KEY = "kiActiveWorkspace";
export const ACTIVE_WORKSPACE_COOKIE = "ki_workspace";

type Relation<T> = T | T[] | null;

type MembershipRow = {
  organisation_id: string;
  role: string;
  organisation: Relation<{ id: string; name: string }>;
};

type SiteRow = {
  id: string;
  organisation_id: string;
  name: string;
  location: string | null;
};

export type WorkspaceSite = {
  id: string;
  name: string;
  location: string;
};

export type WorkspaceAccess = {
  organisationId: string;
  organisationName: string;
  role: string;
  sites: WorkspaceSite[];
};

export type ActiveWorkspace = {
  userId: string;
  organisationId: string;
  organisationName: string;
  siteId: string;
  siteName: string;
  siteLocation: string;
  role: string;
};

function first<T>(value: Relation<T>): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function readSelection() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACTIVE_WORKSPACE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { organisationId?: string; siteId?: string };
    return parsed.organisationId && parsed.siteId
      ? { organisationId: parsed.organisationId, siteId: parsed.siteId }
      : null;
  } catch {
    return null;
  }
}

function persistSelectionLocally(organisationId: string, siteId: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    ACTIVE_WORKSPACE_STORAGE_KEY,
    JSON.stringify({ organisationId, siteId })
  );

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ACTIVE_WORKSPACE_COOKIE}=${encodeURIComponent(
    `${organisationId}.${siteId}`
  )}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export async function persistActiveWorkspace(organisationId: string, siteId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("You must be signed in to select a workspace.");

  const { error } = await supabase.from("user_workspace_selection").upsert(
    {
      user_id: user.id,
      organisation_id: organisationId,
      site_id: siteId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
  persistSelectionLocally(organisationId, siteId);
}

export async function listAvailableWorkspaces(): Promise<WorkspaceAccess[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return [];

  const { data: memberships, error: membershipError } = await supabase
    .from("organisation_members")
    .select("organisation_id,role,organisation:organisations(id,name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (membershipError) throw membershipError;

  const rows = (memberships ?? []) as unknown as MembershipRow[];
  const organisationIds = rows.map((row) => row.organisation_id);
  if (!organisationIds.length) return [];

  const { data: siteRows, error: siteError } = await supabase
    .from("sites")
    .select("id,organisation_id,name,location")
    .in("organisation_id", organisationIds)
    .order("created_at", { ascending: true });

  if (siteError) throw siteError;

  const sites = (siteRows ?? []) as SiteRow[];

  return rows.flatMap((membership) => {
    const organisation = first(membership.organisation);
    if (!organisation) return [];

    return [
      {
        organisationId: membership.organisation_id,
        organisationName: organisation.name,
        role: membership.role,
        sites: sites
          .filter((site) => site.organisation_id === membership.organisation_id)
          .map((site) => ({
            id: site.id,
            name: site.name,
            location: site.location ?? "",
          })),
      },
    ];
  });
}

export async function resolveActiveWorkspace(): Promise<ActiveWorkspace | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const available = await listAvailableWorkspaces();
  if (!available.length) return null;

  const stored = readSelection();
  let organisation = stored
    ? available.find((item) => item.organisationId === stored.organisationId)
    : undefined;

  if (!organisation) organisation = available[0];
  if (!organisation.sites.length) return null;

  let site = stored
    ? organisation.sites.find((item) => item.id === stored.siteId)
    : undefined;

  if (!site) site = organisation.sites[0];

  await persistActiveWorkspace(organisation.organisationId, site.id);

  return {
    userId: user.id,
    organisationId: organisation.organisationId,
    organisationName: organisation.organisationName,
    siteId: site.id,
    siteName: site.name,
    siteLocation: site.location,
    role: organisation.role,
  };
}
