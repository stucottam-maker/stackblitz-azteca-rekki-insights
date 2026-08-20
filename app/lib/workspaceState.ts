import { resolveActiveWorkspace } from "./clientWorkspace";
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

let workspaceIdentityPromise: Promise<{
  organisationId: string;
  siteId: string;
  userId: string;
} | null> | null = null;
function parseStoredValue(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

async function getWorkspaceIdentity() {
  if (!workspaceIdentityPromise) {
    workspaceIdentityPromise = resolveActiveWorkspace().then((workspace) =>
      workspace
        ? {
            organisationId: workspace.organisationId,
            siteId: workspace.siteId,
            userId: workspace.userId,
          }
        : null
    );
  }

  return workspaceIdentityPromise;
}

export async function persistWorkspaceState(key: string, value: string) {
  const identity = await getWorkspaceIdentity();
  if (!identity) return;

  const { error } = await supabase.from("workspace_state").upsert(
    {
      organisation_id: identity.organisationId,
      site_id: identity.siteId,
      state_key: key,
      state_value: parseStoredValue(value),
      updated_by: identity.userId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "organisation_id,site_id,state_key" }
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
    .eq("site_id", identity.siteId)
    .eq("state_key", key);

  if (error) throw error;
}

export async function readWorkspaceState<T>(key: string, fallback: T): Promise<T> {
  const identity = await getWorkspaceIdentity();
  if (!identity) return fallback;

  const { data, error } = await supabase
    .from("workspace_state")
    .select("state_value")
    .eq("organisation_id", identity.organisationId)
    .eq("site_id", identity.siteId)
    .eq("state_key", key)
    .maybeSingle();

  if (error) throw error;
  return data ? (data.state_value as T) : fallback;
}

export async function readWorkspaceStates(keys: readonly string[]) {
  const identity = await getWorkspaceIdentity();
  if (!identity) return new Map<string, unknown>();

  const { data, error } = await supabase
    .from("workspace_state")
    .select("state_key,state_value")
    .eq("organisation_id", identity.organisationId)
    .eq("site_id", identity.siteId)
    .in("state_key", [...keys]);

  if (error) throw error;
  return new Map((data ?? []).map((row) => [row.state_key, row.state_value]));
}

export function migrateLegacyWorkspaceState() {
  // Legacy browser data was migrated before multi-restaurant access existed.
  // Re-uploading unscoped localStorage values after a workspace switch can copy
  // one restaurant's data into another, so migration is intentionally retired.
  return Promise.resolve();
}
