"use client";

import { FormEvent, useEffect, useState } from "react";

import PwaInstallButton from "../components/PwaInstallButton";
import { useWorkspace } from "../components/WorkspaceProvider";
import {
  ORGANISATION_SETTINGS_KEY,
  defaultOrganisationSettings,
  type OrganisationSettings,
} from "../lib/purchasing";
import { supabase } from "../lib/supabase";
import { persistWorkspaceState, readWorkspaceState } from "../lib/workspaceState";

type TeamSite = {
  id: string;
  name: string;
  location?: string | null;
};

type TeamMember = {
  userId: string;
  email: string;
  fullName: string;
  role: "owner" | "admin" | "member";
  joinedAt?: string;
  siteId: string;
  siteRole: "manager" | "chef" | "member" | "viewer";
};

type TeamPayload = {
  members: Array<{
    userId: string;
    email: string;
    fullName: string;
    role: TeamMember["role"];
    joinedAt?: string;
    sites?: Array<{ siteId: string; role: TeamMember["siteRole"] }>;
  }>;
  sites: TeamSite[];
  canManageOwners: boolean;
  error?: string;
};

async function authHeaders(json = false) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Your session has expired. Sign in again.");
  return {
    Authorization: `Bearer ${session.access_token}`,
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

export default function SettingsPage() {
  const { activeWorkspace } = useWorkspace();
  const [settings, setSettings] = useState<OrganisationSettings>(defaultOrganisationSettings);
  const [saved, setSaved] = useState(false);

  const [teamLoading, setTeamLoading] = useState(true);
  const [teamAllowed, setTeamAllowed] = useState(true);
  const [teamError, setTeamError] = useState("");
  const [teamMessage, setTeamMessage] = useState("");
  const [teamSites, setTeamSites] = useState<TeamSite[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [canManageOwners, setCanManageOwners] = useState(false);
  const [teamBusy, setTeamBusy] = useState("");
  const [invite, setInvite] = useState({
    fullName: "",
    email: "",
    organisationRole: "member" as TeamMember["role"],
    siteId: "",
    siteRole: "chef" as TeamMember["siteRole"],
  });

  useEffect(() => {
    readWorkspaceState<OrganisationSettings>(
      ORGANISATION_SETTINGS_KEY,
      defaultOrganisationSettings
    )
      .then((stored) =>
        setSettings({
          ...defaultOrganisationSettings,
          ...stored,
          name:
            stored.name && stored.name !== defaultOrganisationSettings.name
              ? stored.name
              : activeWorkspace?.organisationName || stored.name || defaultOrganisationSettings.name,
          internalOrderEmails:
            stored.internalOrderEmails ?? defaultOrganisationSettings.internalOrderEmails,
        })
      )
      .catch((error) => console.error("Settings cloud load failed", error));
  }, [activeWorkspace?.organisationName]);

  async function loadTeam() {
    setTeamLoading(true);
    setTeamError("");
    try {
      const response = await fetch("/api/team", { headers: await authHeaders() });
      const payload = (await response.json()) as TeamPayload;
      if (response.status === 403) {
        setTeamAllowed(false);
        setTeamMembers([]);
        setTeamSites([]);
        return;
      }
      if (!response.ok) throw new Error(payload.error || "Could not load the team.");

      setTeamAllowed(true);
      setCanManageOwners(Boolean(payload.canManageOwners));
      setTeamSites(payload.sites ?? []);
      setTeamMembers(
        (payload.members ?? []).map((member) => ({
          userId: member.userId,
          email: member.email,
          fullName: member.fullName,
          role: member.role,
          joinedAt: member.joinedAt,
          siteId: member.sites?.[0]?.siteId ?? payload.sites?.[0]?.id ?? "",
          siteRole: member.sites?.[0]?.role ?? "member",
        }))
      );
      setInvite((current) => ({
        ...current,
        siteId: current.siteId || payload.sites?.[0]?.id || "",
      }));
    } catch (error: any) {
      setTeamError(error?.message || "Could not load the team.");
    } finally {
      setTeamLoading(false);
    }
  }

  useEffect(() => {
    void loadTeam();
  }, [activeWorkspace?.organisationId, activeWorkspace?.siteId]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    await persistWorkspaceState(ORGANISATION_SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  function updateEmail(index: number, value: string) {
    setSettings((current) => ({
      ...current,
      internalOrderEmails: current.internalOrderEmails.map((email, emailIndex) =>
        emailIndex === index ? value : email
      ),
    }));
  }

  async function inviteMember(event: FormEvent) {
    event.preventDefault();
    if (!invite.email.trim()) return;
    setTeamBusy("invite");
    setTeamError("");
    setTeamMessage("");
    try {
      const response = await fetch("/api/team", {
        method: "POST",
        headers: await authHeaders(true),
        body: JSON.stringify({
          email: invite.email,
          fullName: invite.fullName,
          organisationRole: invite.organisationRole,
          siteId: invite.siteId,
          siteRole: invite.siteRole,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not add this team member.");
      setInvite((current) => ({
        ...current,
        fullName: "",
        email: "",
        organisationRole: "member",
        siteRole: "chef",
      }));
      setTeamMessage(payload.existingAccount ? "Team access added." : "Invitation sent.");
      await loadTeam();
    } catch (error: any) {
      setTeamError(error?.message || "Could not add this team member.");
    } finally {
      setTeamBusy("");
    }
  }

  function patchMember(userId: string, patch: Partial<TeamMember>) {
    setTeamMembers((current) =>
      current.map((member) => (member.userId === userId ? { ...member, ...patch } : member))
    );
  }

  async function saveMember(member: TeamMember) {
    setTeamBusy(member.userId);
    setTeamError("");
    setTeamMessage("");
    try {
      const response = await fetch("/api/team", {
        method: "PATCH",
        headers: await authHeaders(true),
        body: JSON.stringify({
          userId: member.userId,
          organisationRole: member.role,
          siteId: member.siteId,
          siteRole: member.siteRole,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not update access.");
      setTeamMessage(`Access updated for ${member.fullName || member.email}.`);
      await loadTeam();
    } catch (error: any) {
      setTeamError(error?.message || "Could not update access.");
    } finally {
      setTeamBusy("");
    }
  }

  async function removeMember(member: TeamMember) {
    if (!window.confirm(`Remove ${member.fullName || member.email} from this restaurant?`)) return;
    setTeamBusy(member.userId);
    setTeamError("");
    setTeamMessage("");
    try {
      const response = await fetch("/api/team", {
        method: "DELETE",
        headers: await authHeaders(true),
        body: JSON.stringify({ userId: member.userId }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not remove access.");
      setTeamMessage("Team member removed.");
      await loadTeam();
    } catch (error: any) {
      setTeamError(error?.message || "Could not remove access.");
    } finally {
      setTeamBusy("");
    }
  }

  return (
    <div className="page settings-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Settings</h1>
          <p className="page-description">
            {activeWorkspace
              ? `${activeWorkspace.organisationName} · ${activeWorkspace.siteName}`
              : "Manage this restaurant workspace."}
          </p>
        </div>
      </header>

      <section className="panel pwa-settings-card">
        <div>
          <p className="panel-kicker">Mobile app</p>
          <h2>Install Kitchen Insights</h2>
          <p className="page-description">
            Add Kitchen Insights to the home screen so it opens like a kitchen app.
          </p>
        </div>
        <PwaInstallButton className="primary-button pwa-settings-install" />
      </section>

      <form className="panel organisation-settings" onSubmit={submit}>
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Purchasing</p>
            <h2>Order delivery</h2>
          </div>
          <button className="primary-button" type="submit">Save settings</button>
        </div>

        {saved && <div className="settings-saved">Settings saved.</div>}

        <label className="settings-field">
          <span>Organisation name</span>
          <input
            value={settings.name}
            onChange={(event) =>
              setSettings((current) => ({ ...current, name: event.target.value }))
            }
          />
        </label>

        <div className="settings-section">
          <div>
            <strong>Internal order emails</strong>
            <p>Copies are sent to these contacts when an order is placed.</p>
          </div>
          {settings.internalOrderEmails.map((email, index) => (
            <div className="settings-email-row" key={index}>
              <input
                type="email"
                aria-label={`Internal order email ${index + 1}`}
                value={email}
                onChange={(event) => updateEmail(index, event.target.value)}
              />
              <button
                className="cancel-button"
                type="button"
                onClick={() =>
                  setSettings((current) => ({
                    ...current,
                    internalOrderEmails: current.internalOrderEmails.filter(
                      (_, emailIndex) => emailIndex !== index
                    ),
                  }))
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="secondary-inline-button"
            type="button"
            onClick={() =>
              setSettings((current) => ({
                ...current,
                internalOrderEmails: [...current.internalOrderEmails, ""],
              }))
            }
          >
            Add contact email
          </button>
        </div>

        <div className="settings-options">
          {([
            ["sendInternalCopy", "Send order confirmation internally"],
            ["sendSupplierEmail", "Send order directly to supplier"],
            ["attachPurchaseOrder", "Include purchase order PDF"],
            ["includeOrderNotes", "Include delivery notes"],
          ] as const).map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, [key]: event.target.checked }))
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </form>

      <section className="panel team-management-card">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">People & access</p>
            <h2>Team</h2>
            <p className="page-description">
              Invite staff, choose their role and control site access without sharing logins.
            </p>
          </div>
          {teamAllowed && !teamLoading && (
            <button type="button" className="secondary-inline-button" onClick={() => void loadTeam()}>
              Refresh
            </button>
          )}
        </div>

        {teamLoading ? (
          <div className="team-loading">Loading team…</div>
        ) : !teamAllowed ? (
          <div className="team-permission-note">
            Team management is available to restaurant owners and admins.
          </div>
        ) : (
          <>
            {teamError && <div className="team-error">{teamError}</div>}
            {teamMessage && <div className="settings-saved">{teamMessage}</div>}

            <div className="team-list">
              {teamMembers.map((member) => (
                <article className="team-row" key={member.userId}>
                  <div>
                    <strong>{member.fullName || member.email || "Team member"}</strong>
                    <span>{member.email || member.userId}</span>
                  </div>

                  <select
                    aria-label={`Organisation role for ${member.fullName || member.email}`}
                    value={member.role}
                    onChange={(event) =>
                      patchMember(member.userId, { role: event.target.value as TeamMember["role"] })
                    }
                  >
                    {canManageOwners && <option value="owner">Owner</option>}
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>

                  <select
                    aria-label={`Site for ${member.fullName || member.email}`}
                    value={member.siteId}
                    onChange={(event) => patchMember(member.userId, { siteId: event.target.value })}
                  >
                    {teamSites.map((site) => (
                      <option key={site.id} value={site.id}>{site.name}</option>
                    ))}
                  </select>

                  <select
                    aria-label={`Site role for ${member.fullName || member.email}`}
                    value={member.siteRole}
                    onChange={(event) =>
                      patchMember(member.userId, { siteRole: event.target.value as TeamMember["siteRole"] })
                    }
                  >
                    <option value="manager">Manager</option>
                    <option value="chef">Chef</option>
                    <option value="member">Member</option>
                    <option value="viewer">Viewer</option>
                  </select>

                  <div className="team-row-actions">
                    <button
                      type="button"
                      className="secondary-inline-button"
                      disabled={teamBusy === member.userId}
                      onClick={() => void saveMember(member)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      disabled={teamBusy === member.userId}
                      onClick={() => void removeMember(member)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <form className="team-form-grid" onSubmit={inviteMember}>
              <label>
                <span>Name</span>
                <input
                  value={invite.fullName}
                  placeholder="Chef name"
                  onChange={(event) => setInvite((current) => ({ ...current, fullName: event.target.value }))}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  required
                  value={invite.email}
                  placeholder="chef@example.com"
                  onChange={(event) => setInvite((current) => ({ ...current, email: event.target.value }))}
                />
              </label>
              <label>
                <span>Organisation role</span>
                <select
                  value={invite.organisationRole}
                  onChange={(event) =>
                    setInvite((current) => ({ ...current, organisationRole: event.target.value as TeamMember["role"] }))
                  }
                >
                  {canManageOwners && <option value="owner">Owner</option>}
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              </label>
              <label>
                <span>Site</span>
                <select
                  value={invite.siteId}
                  onChange={(event) => setInvite((current) => ({ ...current, siteId: event.target.value }))}
                >
                  {teamSites.map((site) => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Kitchen role</span>
                <select
                  value={invite.siteRole}
                  onChange={(event) =>
                    setInvite((current) => ({ ...current, siteRole: event.target.value as TeamMember["siteRole"] }))
                  }
                >
                  <option value="manager">Manager</option>
                  <option value="chef">Chef</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                </select>
              </label>
              <button type="submit" className="primary-button" disabled={teamBusy === "invite"}>
                {teamBusy === "invite" ? "Sending…" : "Invite"}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
