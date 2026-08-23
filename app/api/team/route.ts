import { NextResponse } from "next/server";

import { authErrorResponse, requireOrganisation, serviceSupabase } from "../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ORG_ROLES = new Set(["owner", "admin", "member"]);
const SITE_ROLES = new Set(["manager", "chef", "member", "viewer"]);

function ensureAdmin(role: string) {
  if (role !== "owner" && role !== "admin") {
    throw Object.assign(new Error("Only owners and admins can manage the team."), { status: 403 });
  }
}

async function organisationSites(organisationId: string) {
  const { data, error } = await serviceSupabase
    .from("sites")
    .select("id,name,location")
    .eq("organisation_id", organisationId)
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}

async function findAuthUserByEmail(email: string) {
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await serviceSupabase.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;
    const matched = data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
    if (matched) return matched;
    if (data.users.length < 100) break;
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const { organisationId, role } = await requireOrganisation(request);
    ensureAdmin(role);

    const [sites, membershipResult] = await Promise.all([
      organisationSites(organisationId),
      serviceSupabase
        .from("organisation_members")
        .select("user_id,role,created_at")
        .eq("organisation_id", organisationId)
        .order("created_at"),
    ]);
    if (membershipResult.error) throw membershipResult.error;

    const members = membershipResult.data ?? [];
    const userIds = members.map((member) => member.user_id);
    const siteIds = sites.map((site) => site.id);

    const [profilesResult, siteMembershipResult, authResult] = await Promise.all([
      userIds.length
        ? serviceSupabase.from("profiles").select("id,full_name").in("id", userIds)
        : Promise.resolve({ data: [], error: null } as any),
      userIds.length && siteIds.length
        ? serviceSupabase
            .from("site_memberships")
            .select("user_id,site_id,role")
            .in("user_id", userIds)
            .in("site_id", siteIds)
        : Promise.resolve({ data: [], error: null } as any),
      serviceSupabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    ]);

    if (profilesResult.error) throw profilesResult.error;
    if (siteMembershipResult.error) throw siteMembershipResult.error;
    if (authResult.error) throw authResult.error;

    const profileMap = new Map((profilesResult.data ?? []).map((profile: any) => [profile.id, profile.full_name]));
    const emailMap = new Map(authResult.data.users.map((user) => [user.id, user.email ?? ""]));

    const payload = members.map((member) => ({
      userId: member.user_id,
      email: emailMap.get(member.user_id) || "",
      fullName: profileMap.get(member.user_id) || "",
      role: member.role,
      joinedAt: member.created_at,
      sites: (siteMembershipResult.data ?? [])
        .filter((entry: any) => entry.user_id === member.user_id)
        .map((entry: any) => ({ siteId: entry.site_id, role: entry.role })),
    }));

    return NextResponse.json({ members: payload, sites, canManageOwners: role === "owner" });
  } catch (error) {
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}

export async function POST(request: Request) {
  try {
    const { organisationId, role: actorRole } = await requireOrganisation(request);
    ensureAdmin(actorRole);
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const fullName = String(body.fullName || "").trim();
    const organisationRole = String(body.organisationRole || "member");
    const siteRole = String(body.siteRole || "member");
    const siteId = String(body.siteId || "").trim();

    if (!email || !email.includes("@")) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (!ORG_ROLES.has(organisationRole) || !SITE_ROLES.has(siteRole)) {
      return NextResponse.json({ error: "Invalid team role." }, { status: 400 });
    }
    if (organisationRole === "owner" && actorRole !== "owner") {
      return NextResponse.json({ error: "Only an owner can add another owner." }, { status: 403 });
    }

    const sites = await organisationSites(organisationId);
    const site = sites.find((item) => item.id === siteId) ?? sites[0];
    if (!site) return NextResponse.json({ error: "No site is configured for this restaurant." }, { status: 400 });

    const existingUser = await findAuthUserByEmail(email);
    if (existingUser) {
      const { error: profileError } = await serviceSupabase.from("profiles").upsert({
        id: existingUser.id,
        full_name: fullName || existingUser.user_metadata?.full_name || null,
      });
      if (profileError) throw profileError;

      const { error: memberError } = await serviceSupabase.from("organisation_members").upsert({
        organisation_id: organisationId,
        user_id: existingUser.id,
        role: organisationRole,
      }, { onConflict: "organisation_id,user_id" });
      if (memberError) throw memberError;

      const { error: siteError } = await serviceSupabase.from("site_memberships").upsert({
        site_id: site.id,
        user_id: existingUser.id,
        role: siteRole,
      }, { onConflict: "site_id,user_id" });
      if (siteError) throw siteError;

      return NextResponse.json({ added: true, existingAccount: true });
    }

    const { error: queueError } = await serviceSupabase.rpc("queue_workspace_invite", {
      p_email: email,
      p_full_name: fullName,
      p_organisation_id: organisationId,
      p_site_id: site.id,
      p_organisation_role: organisationRole,
      p_site_role: siteRole,
    });
    if (queueError) throw queueError;

    const origin = new URL(request.url).origin;
    const { data, error: inviteError } = await serviceSupabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${origin}/reset-password`,
      data: { full_name: fullName },
    });
    if (inviteError) throw inviteError;

    return NextResponse.json({ invited: true, userId: data.user?.id ?? null });
  } catch (error) {
    console.error("TEAM INVITE FAILED", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}

export async function PATCH(request: Request) {
  try {
    const { organisationId, role: actorRole } = await requireOrganisation(request);
    ensureAdmin(actorRole);
    const body = await request.json();
    const userId = String(body.userId || "").trim();
    const organisationRole = String(body.organisationRole || "member");
    const siteId = String(body.siteId || "").trim();
    const siteRole = String(body.siteRole || "member");

    if (!userId || !ORG_ROLES.has(organisationRole) || !SITE_ROLES.has(siteRole)) {
      return NextResponse.json({ error: "Invalid team update." }, { status: 400 });
    }
    if (organisationRole === "owner" && actorRole !== "owner") {
      return NextResponse.json({ error: "Only an owner can grant owner access." }, { status: 403 });
    }

    const { data: current, error: currentError } = await serviceSupabase
      .from("organisation_members")
      .select("role")
      .eq("organisation_id", organisationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (currentError) throw currentError;
    if (!current) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    if (current.role === "owner" && actorRole !== "owner") {
      return NextResponse.json({ error: "Only an owner can change another owner's access." }, { status: 403 });
    }

    const sites = await organisationSites(organisationId);
    const site = sites.find((item) => item.id === siteId) ?? sites[0];
    if (!site) return NextResponse.json({ error: "No site is configured." }, { status: 400 });

    const { error: memberError } = await serviceSupabase
      .from("organisation_members")
      .update({ role: organisationRole })
      .eq("organisation_id", organisationId)
      .eq("user_id", userId);
    if (memberError) throw memberError;

    const { error: siteError } = await serviceSupabase.from("site_memberships").upsert({
      site_id: site.id,
      user_id: userId,
      role: siteRole,
    }, { onConflict: "site_id,user_id" });
    if (siteError) throw siteError;

    return NextResponse.json({ updated: true });
  } catch (error) {
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}

export async function DELETE(request: Request) {
  try {
    const { organisationId, role: actorRole, user } = await requireOrganisation(request);
    ensureAdmin(actorRole);
    const body = await request.json();
    const userId = String(body.userId || "").trim();
    if (!userId) return NextResponse.json({ error: "Missing team member." }, { status: 400 });
    if (userId === user.id) return NextResponse.json({ error: "You cannot remove your own access here." }, { status: 400 });

    const { data: member, error: memberLoadError } = await serviceSupabase
      .from("organisation_members")
      .select("role")
      .eq("organisation_id", organisationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (memberLoadError) throw memberLoadError;
    if (!member) return NextResponse.json({ removed: true });
    if (member.role === "owner" && actorRole !== "owner") {
      return NextResponse.json({ error: "Only an owner can remove another owner." }, { status: 403 });
    }
    if (member.role === "owner") {
      const { count, error } = await serviceSupabase
        .from("organisation_members")
        .select("id", { count: "exact", head: true })
        .eq("organisation_id", organisationId)
        .eq("role", "owner");
      if (error) throw error;
      if ((count ?? 0) <= 1) return NextResponse.json({ error: "The restaurant must keep at least one owner." }, { status: 400 });
    }

    const sites = await organisationSites(organisationId);
    if (sites.length) {
      const { error } = await serviceSupabase
        .from("site_memberships")
        .delete()
        .eq("user_id", userId)
        .in("site_id", sites.map((site) => site.id));
      if (error) throw error;
    }

    const { error } = await serviceSupabase
      .from("organisation_members")
      .delete()
      .eq("organisation_id", organisationId)
      .eq("user_id", userId);
    if (error) throw error;

    return NextResponse.json({ removed: true });
  } catch (error) {
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
