"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type DemoResult = {
  created?: boolean;
  ready?: boolean;
  email?: string;
  password?: string;
  site?: string;
  notice?: string;
  error?: string;
};

export default function DemoLoginAdminPage() {
  const [checking, setChecking] = useState(true);
  const [creating, setCreating] = useState(false);
  const [exists, setExists] = useState(false);
  const [credentials, setCredentials] = useState<DemoResult | null>(null);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  async function sessionHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("Sign into Kommee as the account owner first.");
    return {
      Authorization: "Bearer " + session.access_token,
      "Content-Type": "application/json",
    };
  }

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/admin/demo-login", {
          headers: await sessionHeaders(),
          cache: "no-store",
        });
        const payload: DemoResult = await response.json();
        if (!active) return;
        if (!response.ok) throw new Error(payload.error || "Demo account status unavailable.");
        setExists(Boolean(payload.ready));
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Cannot check the demo account.");
      } finally {
        if (active) setChecking(false);
      }
    })();
    return () => { active = false; };
  }, []);

  async function createDemo() {
    if (creating || exists) return;
    setCreating(true);
    setError("");
    try {
      const response = await fetch("/api/admin/demo-login", {
        method: "POST",
        headers: await sessionHeaders(),
        cache: "no-store",
        body: "{}",
      });
      const payload: DemoResult = await response.json();
      if (!response.ok) throw new Error(payload.error || "Demo account creation failed.");
      setCredentials(payload);
      setExists(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Demo account creation failed.");
    } finally {
      setCreating(false);
    }
  }

  async function copyLogin() {
    if (!credentials?.email || !credentials.password) return;
    try {
      await navigator.clipboard.writeText(
        "Kommee demo login\nhttps://kommee.co.uk/login\nEmail: " + credentials.email +
        "\nPassword: " + credentials.password
      );
      setCopyMessage("Login details copied.");
    } catch {
      setCopyMessage("Copy the login details manually.");
    }
  }

  return (
    <main className="page" style={{ maxWidth: 720, paddingBottom: 90 }}>
      <header className="topbar">
        <div>
          <Link className="back-link" href="/settings">← Settings</Link>
          <p className="eyebrow">For demonstrations & app review</p>
          <h1>Kommee demo login</h1>
          <p className="page-description">
            Create a separate demonstration account for testers and Google Play reviewers.
            It can see the fictional Demo Kitchen only, not your real restaurant data.
          </p>
        </div>
      </header>

      <section className="panel" style={{ display: "grid", gap: 15 }}>
        <div>
          <p className="panel-kicker">Demo restaurant</p>
          <h2>Kommee Demo · Demo Kitchen</h2>
          <p className="muted-text">
            Dedicated workspace with fictional invoice and stock records.
            The login is not an administrator account.
          </p>
        </div>
        {checking && <p>Checking account status…</p>}
        {error && <p role="alert" style={{ color: "#ab413f" }}>{error}</p>}
        {!checking && !exists && !error && (
          <button type="button" className="primary-button" onClick={() => void createDemo()} disabled={creating}>
            {creating ? "Creating demo login…" : "Create demo login"}
          </button>
        )}
        {!checking && exists && !credentials && (
          <div className="notice">
            The demo account already exists: <strong>demo@kommee.co.uk</strong>.
            Its previous password cannot be displayed. Use password recovery or update it in Supabase Auth.
          </div>
        )}
        {credentials?.created && (
          <div style={{ display: "grid", gap: 12 }}>
            <p role="status" style={{ color: "#176b4c", fontWeight: 750 }}>
              Demo account created! Save these credentials before leaving this page.
            </p>
            <label style={{ display: "grid", gap: 5 }}>
              <span>Email</span>
              <input readOnly value={credentials.email || ""} />
            </label>
            <label style={{ display: "grid", gap: 5 }}>
              <span>Password (displayed once)</span>
              <input readOnly value={credentials.password || ""} />
            </label>
            <button type="button" className="secondary-inline-button" onClick={() => void copyLogin()}>
              Copy demo login
            </button>
            {copyMessage && <p role="status">{copyMessage}</p>}
            <p className="muted-text">
              Keep these details somewhere safe. Anyone with the credentials can change the demo’s sample data.
              No live restaurant data is available to this account.
            </p>
            <Link href="/login">Open Kommee login</Link>
          </div>
        )}
      </section>
    </main>
  );
}
