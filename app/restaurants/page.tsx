"use client";

import Link from "next/link";
import { useWorkspace } from "../components/WorkspaceProvider";

/**
 * Workspace selection stays under More instead of occupying a home dashboard
 * shortcut. Access is inherited from the signed-in user's workspace grants.
 */
export default function RestaurantsPage() {
  const {
    activeWorkspace,
    availableWorkspaces,
    loading,
    switching,
    switchWorkspace,
  } = useWorkspace();

  return (
    <main className="page restaurants-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Your workspaces</p>
          <h1>Restaurants</h1>
          <p className="page-description">
            View and switch between the restaurants and sites you can access.
          </p>
        </div>
        <Link href="/">Back to dashboard</Link>
      </header>

      {loading ? (
        <section className="panel"><p>Loading your restaurants…</p></section>
      ) : !availableWorkspaces.length ? (
        <section className="panel">
          <h2>No restaurants available</h2>
          <p>Your account has no restaurant access yet. Ask an administrator to add you to a workspace.</p>
        </section>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {availableWorkspaces.map((organisation) => (
            <section className="panel" key={organisation.organisationId}>
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Restaurant group</p>
                  <h2>{organisation.organisationName}</h2>
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {organisation.sites.map((site) => {
                  const selected =
                    activeWorkspace?.organisationId === organisation.organisationId &&
                    activeWorkspace?.siteId === site.id;

                  return (
                    <div
                      key={site.id}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "14px 16px",
                        border: selected ? "1px solid #11936c" : "1px solid #e1e9e3",
                        borderRadius: 16,
                      }}
                    >
                      <div>
                        <strong>{site.name}</strong>
                        {site.location ? (
                          <p className="muted-text" style={{ marginTop: 4 }}>{site.location}</p>
                        ) : null}
                      </div>
                      {selected ? (
                        <span style={{ color: "#0c8060", fontWeight: 700 }}>Current site</span>
                      ) : (
                        <button
                          className="btn btn-secondary"
                          type="button"
                          disabled={switching}
                          onClick={() => void switchWorkspace(organisation.organisationId, site.id)}
                        >
                          {switching ? "Switching…" : "Switch to site"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {activeWorkspace ? (
        <section className="panel" style={{ marginTop: 16 }}>
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Administration</p>
              <h2>Current restaurant settings</h2>
              <p className="muted-text">Manage purchasing preferences and team access for the selected workspace.</p>
            </div>
            <Link href="/settings">Open settings</Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
