"use client";

import { FormEvent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  ORGANISATION_SETTINGS_KEY,
  defaultOrganisationSettings,
  readOrganisationSettings,
  type OrganisationSettings,
} from "../lib/purchasing";
import { persistWorkspaceState } from "../lib/workspaceState";

export default function SettingsPage() {
  const [settings, setSettings] = useState<OrganisationSettings>(
    defaultOrganisationSettings
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => setSettings(readOrganisationSettings()), []);

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

  return (
    <main className="app-shell">
      <Sidebar active="settings" />
      <section className="main-content settings-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>Organisation settings</h1>
            <p className="page-description">
              Control who receives purchase orders and what is included when they are sent.
            </p>
          </div>
        </header>

        <form className="panel organisation-settings" onSubmit={submit}>
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Organisation</p>
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
              ["sendSupplierEmail", "Send order to supplier"],
              ["attachPurchaseOrder", "Include purchase order attachment"],
              ["includeOrderNotes", "Include delivery notes"],
            ] as const).map(([key, label]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      [key]: event.target.checked,
                    }))
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </form>
      </section>
    </main>
  );
}
