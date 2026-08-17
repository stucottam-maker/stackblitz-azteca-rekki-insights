import { supabase } from "./supabase";

export const WORKSPACE_STATE_KEYS = [
  "approvedInvoiceDraft",
  "approvedInvoices",
  "currentStockTake",
  "ingredientPrices",
  "organisationSettings",
  "previousIngredientPrices",
  "purchaseOrders",
  "recipeCostSummaries",
  "salesThisPeriod",
  "stockTakeHistory",
  "theoreticalFoodCostPercent",
] as const;

let organisationIdPromise: Promise<string | null> | null = null;

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
  if (typeof window !== "undefined") localStorage.setItem(key, value);

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
  if (typeof window !== "undefined") localStorage.removeItem(key);

  const identity = await getWorkspaceIdentity();
  if (!identity) return;

  const { error } = await supabase
    .from("workspace_state")
    .delete()
    .eq("organisation_id", identity.organisationId)
    .eq("state_key", key);

  if (error) throw error;
}

export async function synchroniseWorkspaceState() {
  const identity = await getWorkspaceIdentity();
  if (!identity) return false;

  const { data, error } = await supabase
    .from("workspace_state")
    .select("state_key,state_value")
    .eq("organisation_id", identity.organisationId);

  if (error) throw error;

  const remote = new Map(
    (data ?? []).map((row) => [row.state_key, row.state_value] as const)
  );
  let hydratedFromCloud = false;

  remote.forEach((value, key) => {
    const serialised = JSON.stringify(value);
    if (localStorage.getItem(key) !== serialised) {
      localStorage.setItem(key, serialised);
      hydratedFromCloud = true;
    }
  });

  const localKeys = new Set<string>(WORKSPACE_STATE_KEYS);
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith("recipeCost:")) localKeys.add(key);
  }

  const missing = Array.from(localKeys).flatMap((key) => {
    const value = localStorage.getItem(key);
    return value !== null && !remote.has(key)
      ? [{
          organisation_id: identity.organisationId,
          state_key: key,
          state_value: parseStoredValue(value),
          updated_by: identity.userId,
          updated_at: new Date().toISOString(),
        }]
      : [];
  });

  if (missing.length) {
    const { error: uploadError } = await supabase
      .from("workspace_state")
      .upsert(missing, { onConflict: "organisation_id,state_key" });
    if (uploadError) throw uploadError;
  }

  return hydratedFromCloud;
}
