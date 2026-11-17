import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { serviceSupabase } from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_ID = "5597857e-cc1c-462b-9079-49f144618277";
const OWNER_ORG = "694a73e3-85ec-4c51-ae8f-9accd0bbd600";
const DEMO_ORG = "3a327991-668d-4f3f-b650-ac248f48b7c5";
const DEMO_SITE = "bdc7f8ad-10b5-483e-8574-b8a6bd519f2c";
const DEMO_EMAIL = "demo@kommee.co.uk";

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, private", "Pragma": "no-cache" },
  });
}

async function verifyPlatformOwner(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;

  const { data: verified, error } = await serviceSupabase.auth.getUser(token);
  if (error || !verified.user || verified.user.id !== ADMIN_ID || verified.user.email?.toLowerCase() !== "stucottam@gmail.com") {
    return false;
  }
  const { data: owner, error: ownerError } = await serviceSupabase
    .from("organisation_members")
    .select("id")
    .eq("organisation_id", OWNER_ORG)
    .eq("user_id", ADMIN_ID)
    .eq("role", "owner")
    .maybeSingle();
  return !ownerError && Boolean(owner);
}

async function existingDemoAccount() {
  const { data, error } = await serviceSupabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw error;
  return data.users.find((user) => user.email?.toLowerCase() === DEMO_EMAIL) ?? null;
}

export async function GET(request: Request) {
  try {
    if (!await verifyPlatformOwner(request)) return respond({ error: "Not authorised." }, 403);
    const account = await existingDemoAccount();
    return respond({ ready: Boolean(account), email: DEMO_EMAIL, site: "Demo Kitchen" });
  } catch {
    return respond({ error: "Could not check the demo account." }, 500);
  }
}

export async function POST(request: Request) {
  try {
    if (!await verifyPlatformOwner(request)) return respond({ error: "Not authorised." }, 403);

    const existing = await existingDemoAccount();
    if (existing) {
      return respond({ error: "A demo login already exists. For security, passwords cannot be retrieved. Use password recovery or create a new password in Supabase Auth." }, 409);
    }

    const { data: site, error: siteError } = await serviceSupabase
      .from("sites").select("id,organisation_id,name")
      .eq("id", DEMO_SITE).eq("organisation_id", DEMO_ORG).maybeSingle();
    if (siteError || site?.name !== "Demo Kitchen") return respond({ error: "Demo site not configured." }, 503);

    // Generated on the server. Returned once to the signed-in platform owner.
    // Do not write it to application logs, GitHub or stored workspace state.
    const password = randomBytes(24).toString("base64url");
    const { data: created, error: authError } = await serviceSupabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password,
      email_confirm: true,
      app_metadata: { kommee_demo: true },
      user_metadata: { full_name: "Kommee Demo" },
    });
    if (authError || !created.user) return respond({ error: "Could not create the demo user." }, 500);
    const userId = created.user.id;

    const { error: memberError } = await serviceSupabase.from("organisation_members")
      .insert({ organisation_id: DEMO_ORG, user_id: userId, role: "member" });
    if (memberError) {
      await serviceSupabase.auth.admin.deleteUser(userId);
      return respond({ error: "Could not assign the demo workspace." }, 500);
    }

    const { error: siteMemberError } = await serviceSupabase.from("site_memberships")
      .insert({ site_id: DEMO_SITE, user_id: userId, role: "member" });
    if (siteMemberError) {
      await serviceSupabase.from("organisation_members").delete()
        .eq("organisation_id", DEMO_ORG).eq("user_id", userId);
      await serviceSupabase.auth.admin.deleteUser(userId);
      return respond({ error: "Could not assign demo site access." }, 500);
    }

    const { error: selectionError } = await serviceSupabase.from("user_workspace_selection")
      .upsert({
        user_id: userId, organisation_id: DEMO_ORG, site_id: DEMO_SITE,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    if (selectionError) {
      await serviceSupabase.from("site_memberships").delete().eq("site_id", DEMO_SITE).eq("user_id", userId);
      await serviceSupabase.from("organisation_members").delete().eq("organisation_id", DEMO_ORG).eq("user_id", userId);
      await serviceSupabase.auth.admin.deleteUser(userId);
      return respond({ error: "Could not select the demo workspace." }, 500);
    }

    return respond({
      created: true,
      email: DEMO_EMAIL,
      password,
      site: "Kommee Demo · Demo Kitchen",
      notice: "Save these credentials now. The password will not be shown again.",
    }, 201);
  } catch {
    return respond({ error: "Could not provision the demonstration account." }, 500);
  }
}
