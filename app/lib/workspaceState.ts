import { supabase } from "./supabase";

export const WORKSPACE_STATE_KEYS = [
  "approvedInvoiceDraft",
  "approvedInvoices",
  "currentStockTake",
  "ingredientPrices",
  "invoiceProductMappings",
  "organisationSettings",
  "previousIngredientPrices",
  "purchaseOrders",
  "recipeCostSummaries",
  "salesThisPeriod",
  "stockTakeHistory",
  "supplierCatalogueOverrides",
  "theoreticalFoodCostPercent",
] as const;

let organisationIdPromise: Promise<string | null> | null = null;
let legacyMigrationPromise: Promise<void> | null = null;

function parseStoredValue(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

async function getWorkspaceIdentity() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  if (!organisationIdPromise) {
    organisationIdPromise = (async () => {
      const { data, error } = await supabase
        .from("organisation_members")
        .select("organisation_id")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data?.organisation_id ?? null;
    })();
  }

  const organisationId = await organisationIdPromise;
  return organisationId ? { organisationId, userId: user.id } : null;
}

export async function persistWorkspaceState(key: string, value: string) {
  const identity = await getWorkspaceIdentity();
  if (!identity) return;

  const { error } = await supabase.from("workspace_state").upsert(
    {
      organisation_id: identity.organisationId,
      state_key: key,
      state_value: parseStoredValue(value),
      updated_by: identity.userId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "organisation_id,state_key" }
  );

  if (error) throw error;
}

export async function removeWorkspaceState(key: string) {
  const identity = await getWorkspaceIdentity();
  if (!identity) return;

  const { error } = await supabase
    .from("workspace_state")
    .delete()
    .eq("organisation_id", identity.organisationId)
    .eq("state_key", key);

  if (error) throw error;
}

export async function readWorkspaceState<T>(key: string, fallback: T): Promise<T> {
  await migrateLegacyWorkspaceState();
  const identity = await getWorkspaceIdentity();
  if (!identity) return fallback;

  const { data, error } = await supabase
    .from("workspace_state")
    .select("state_value")
    .eq("organisation_id", identity.organisationId)
    .eq("state_key", key)
    .maybeSingle();

  if (error) throw error;
  return data ? (data.state_value as T) : fallback;
}

export async function readWorkspaceStates(keys: readonly string[]) {
  await migrateLegacyWorkspaceState();
  const identity = await getWorkspaceIdentity();
  if (!identity) return new Map<string, unknown>();

  const { data, error } = await supabase
    .from("workspace_state")
    .select("state_key,state_value")
    .eq("organisation_id", identity.organisationId)
    .in("state_key", [...keys]);

  if (error) throw error;
  return new Map((data ?? []).map((row) => [row.state_key, row.state_value]));
}

async function performLegacyWorkspaceMigration() {
  const identity = await getWorkspaceIdentity();
  if (!identity || typeof window === "undefined") return;

  const { data, error } = await supabase
    .from("workspace_state")
    .select("state_key,state_value")
    .eq("organisation_id", identity.organisationId);

  if (error) throw error;

  const remote = new Map(
    (data ?? []).map((row) => [row.state_key, row.state_value] as const)
  );
  const localKeys = new Set<string>(WORKSPACE_STATE_KEYS);
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith("recipe:") || key?.startsWith("recipeCost:")) {
      localKeys.add(key);
    }
  }

  const missing = Array.from(localKeys).flatMap((key) => {
    const value = localStorage.getItem(key);
    return value !== null && !remote.has(key)
      ? [
          {
            organisation_id: identity.organisationId,
            state_key: key,
            state_value: parseStoredValue(value),
            updated_by: identity.userId,
            updated_at: new Date().toISOString(),
          },
        ]
      : [];
  });

  if (missing.length) {
    const { error: uploadError } = await supabase
      .from("workspace_state")
      .upsert(missing, { onConflict: "organisation_id,state_key" });
    if (uploadError) throw uploadError;
  }

  localKeys.forEach((key) => localStorage.removeItem(key));
}

export function migrateLegacyWorkspaceState() {
  if (typeof window === "undefined") return Promise.resolve();
  if (!legacyMigrationPromise) {
    legacyMigrationPromise = performLegacyWorkspaceMigration();
  }
  return legacyMigrationPromise;
}
