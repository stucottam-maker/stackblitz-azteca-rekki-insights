"use client";

import { type FormEvent, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, []);

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("We could not read your account email. Sign out and back in, then try again.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Use at least 8 characters for your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The two new passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("Choose a new password that is different from your current password.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (signInError) {
      setError("Your current password is incorrect.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Password changed successfully.");
    setLoading(false);
  }

  async function sendResetEmail() {
    if (!email || resetLoading) return;

    setError("");
    setMessage("");
    setResetLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Password reset email sent. Check your inbox and follow the secure link.");
    }

    setResetLoading(false);
  }

  return (
    <div className="page account-security-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Your account</p>
          <h1>Account & password</h1>
          <p className="page-description">
            Manage your Kitchen Insights login. These settings follow your user account, not the selected restaurant.
          </p>
        </div>
      </header>

      <section className="panel account-profile-card">
        <div>
          <p className="panel-kicker">Signed in as</p>
          <h2>{email || "Loading account…"}</h2>
          <p className="muted-text">Your workspace access is managed separately from your password.</p>
        </div>
      </section>

      <section className="panel account-security-card">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Security</p>
            <h2>Change password</h2>
            <p className="muted-text">Confirm your current password before choosing a new one.</p>
          </div>
        </div>

        <form className="account-security-form" onSubmit={changePassword}>
          <label className="account-field">
            <span>Current password</span>
            <input
              type={showPasswords ? "text" : "password"}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          <label className="account-field">
            <span>New password</span>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={8}
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
            />
          </label>

          <label className="account-field">
            <span>Confirm new password</span>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
              autoComplete="new-password"
            />
          </label>

          <label className="account-password-visibility">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(event) => setShowPasswords(event.target.checked)}
            />
            <span>Show passwords</span>
          </label>

          {error && <div className="login-error" role="alert">{error}</div>}
          {message && <div className="login-success" role="status">{message}</div>}

          <div className="account-security-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Changing password…" : "Change password"}
            </button>

            <button
              type="button"
              className="account-reset-email-button"
              onClick={sendResetEmail}
              disabled={resetLoading || !email}
            >
              {resetLoading ? "Sending reset email…" : "Forgot current password? Email me a reset link"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
