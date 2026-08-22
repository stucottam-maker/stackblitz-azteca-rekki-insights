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

type WorkspaceHostnameHint = {
  organisationName: string;
  siteName?: string;
};

type StoredWorkspaceSelection = {
  organisationId: string;
  siteId: string;
  hostname?: string;
  explicit?: boolean;
};

const WORKSPACE_HOSTNAME_HINTS: Record<string, WorkspaceHostnameHint> = {
  azteca: {
    organisationName: "Azteca London",
    siteName: "Battersea",
  },
  max: {
    organisationName: "MAXIMILLIAN GREEN",
    siteName: "Main Site",
  },
  beauforthouse: {
    organisationName: "BEAUFORT HOUSE",
    siteName: "BEAUFORT HOUSE",
  },
  benditosmexicali: {
    organisationName: "BENDITOS MEXICALI",
    siteName: "Mexicali",
  },
  demo: {
    organisationName: "Kitchen Insights Test Restaurant",
    siteName: "Isolation Test Kitchen",
  },
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

function normalizeWorkspaceName(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function readCurrentHostname() {
  if (typeof window === "undefined") return "";
  return window.location.hostname.toLowerCase().replace(/\.$/, "");
}

function readHostnameHint(): WorkspaceHostnameHint | null {
  if (typeof window === "undefined") return null;

  const hostname = readCurrentHostname();
  const rootDomain = "kitcheninsights.uk";

  if (!hostname.endsWith(`.${rootDomain}`)) return null;

  const subdomain = hostname.slice(0, -(rootDomain.length + 1)).split(".")[0];
  return WORKSPACE_HOSTNAME_HINTS[subdomain] ?? null;
}

function readSelection(): StoredWorkspaceSelection | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(ACTIVE_WORKSPACE_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredWorkspaceSelection>;
    if (!parsed.organisationId || !parsed.siteId) return null;

    return {
      organisationId: parsed.organisationId,
      siteId: parsed.siteId,
      hostname: parsed.hostname,
      explicit: parsed.explicit === true,
    };
  } catch {
    return null;
  }
}

function persistSelectionLocally(
  organisationId: string,
  siteId: string,
  explicitSelection: boolean
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    ACTIVE_WORKSPACE_STORAGE_KEY,
    JSON.stringify({
      organisationId,
      siteId,
      hostname: readCurrentHostname(),
      explicit: explicitSelection,
    })
  );

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ACTIVE_WORKSPACE_COOKIE}=${encodeURIComponent(
    `${organisationId}.${siteId}`
  )}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export async function persistActiveWorkspace(
  organisationId: string,
  siteId: string,
  explicitSelection = true
) {
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
  persistSelectionLocally(organisationId, siteId, explicitSelection);
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
  const currentHostname = readCurrentHostname();
  const hostnameHint = readHostnameHint();
  const useExplicitStoredSelection = Boolean(
    stored?.explicit && stored.hostname && stored.hostname === currentHostname
  );

  let organisation = useExplicitStoredSelection
    ? available.find((item) => item.organisationId === stored?.organisationId)
    : undefined;

  if (!organisation && hostnameHint) {
    organisation = available.find(
      (item) =>
        normalizeWorkspaceName(item.organisationName) ===
        normalizeWorkspaceName(hostnameHint.organisationName)
    );
  }

  if (!organisation && stored) {
    organisation = available.find((item) => item.organisationId === stored.organisationId);
  }

  if (!organisation) organisation = available[0];
  if (!organisation.sites.length) return null;

  let site =
    useExplicitStoredSelection && organisation.organisationId === stored?.organisationId
      ? organisation.sites.find((item) => item.id === stored.siteId)
      : undefined;

  if (!site && hostnameHint && !useExplicitStoredSelection && hostnameHint.siteName) {
    site = organisation.sites.find(
      (item) =>
        normalizeWorkspaceName(item.name) === normalizeWorkspaceName(hostnameHint.siteName ?? "")
    );
  }

  if (!site && stored && organisation.organisationId === stored.organisationId) {
    site = organisation.sites.find((item) => item.id === stored.siteId);
  }

  if (!site) site = organisation.sites[0];

  await persistActiveWorkspace(organisation.organisationId, site.id, useExplicitStoredSelection);

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
