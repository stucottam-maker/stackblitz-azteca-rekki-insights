"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setReady(Boolean(data.session));
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" || session) {
        setReady(true);
        setChecking(false);
      }

      if (event === "SIGNED_OUT") {
        setReady(false);
        setChecking(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use at least 8 characters for your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setSuccess(true);
    setLoading(false);
  }

  return (
    <main className="login-page password-reset-page">
      <section className="login-intro" aria-label="Kitchen Insights password recovery">
        <div className="login-brand-row">
          <div className="login-brand-icon">
            <Image
              src="/pwa-icon.svg"
              alt="Kitchen Insights"
              width={42}
              height={42}
              priority
            />
          </div>
          <div className="login-brand-copy">
            <strong>Kitchen Insights</strong>
            <span>Cost control & operations</span>
          </div>
        </div>

        <div className="login-intro-copy">
          <p className="login-kicker">Account security</p>
          <h1>Get securely back into your workspace.</h1>
          <p>Choose a new password, then sign back in to the restaurants and sites you already have access to.</p>
        </div>

        <p className="login-intro-footer">Secure cloud workspace · Password recovery</p>
      </section>

      <section className="login-panel">
        <div className="login-shell">
          <div className="login-heading">
            <p className="eyebrow">Password recovery</p>
            <h2>{success ? "Password updated" : "Choose a new password"}</h2>
            <p>
              {success
                ? "Your password has been changed. Sign in again using the new password."
                : "Use a password you do not use anywhere else."}
            </p>
          </div>

          {checking ? (
            <div className="account-auth-status" role="status">Checking your reset link…</div>
          ) : success ? (
            <Link href="/login" className="primary-button login-button account-auth-link">
              Back to sign in
            </Link>
          ) : !ready ? (
            <div className="account-auth-expired">
              <div className="login-error" role="alert">
                This reset link is invalid or has expired. Request a fresh link from the sign-in screen.
              </div>
              <Link href="/login" className="primary-button login-button account-auth-link">
                Return to sign in
              </Link>
            </div>
          ) : (
            <form className="login-form" onSubmit={submit}>
              <label className="login-field">
                <span>New password</span>
                <div className="login-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                    autoComplete="new-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="login-field">
                <span>Confirm new password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Enter it again"
                  minLength={8}
                  required
                  autoComplete="new-password"
                />
              </label>

              {error && <div className="login-error" role="alert">{error}</div>}

              <button
                type="submit"
                className="primary-button login-button"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Updating password…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
