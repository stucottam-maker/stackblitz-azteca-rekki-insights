"use client";


import KitchenLogo from "../components/KitchenLogo";
import { type FormEvent, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

type LoginMode = "signin" | "forgot";

function loginDestination() {
  const requestedPath = new URLSearchParams(window.location.search).get("next");
  return requestedPath &&
    requestedPath.startsWith("/") &&
    !requestedPath.startsWith("//") &&
    !requestedPath.startsWith("/\\")
      ? requestedPath
      : "/?app=1";
}

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email") ?? "");
    // Old activation URLs no longer expose public account creation. Invited staff use their email invitation.

    void supabase.auth.getSession()
      .then(({ data }) => {
        if (active && data.session) window.location.replace(loginDestination());
      })
      .catch((error) => {
        console.error("Login session check failed", error);
      });

    return () => { active = false; };
  }, []);

  function switchMode(nextMode: LoginMode) {
    setMode(nextMode);
    setPassword("");
    setShowPassword(false);
    setError("");
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (mode === "forgot") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage("If that email belongs to a Kommee account, we’ve sent a password reset link.");
      }

      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "We couldn’t sign you in. New to Kommee? Sign up below."
          : signInError.message
      );
      setLoading(false);
      return;
    }

    window.location.replace(loginDestination());
  }

  const heading = mode === "forgot" ? "Reset your password" : "Sign in";
  const description = mode === "forgot"
    ? "Enter your email and we’ll send you a reset link."
    : "Welcome back to Kommee.";

  return (
    <main className="login-page">
      <section className="login-simple-shell">
        <div className="login-brand-row login-simple-brand">
          <KitchenLogo size={54} className="login-v2-logo-image" />
          <div className="login-brand-copy">
            <strong>Kommee</strong>
            <span>Your kitchen’s right hand.</span>
          </div>
        </div>

        <div className="login-shell">
          <div className="login-heading">
            {mode !== "signin" && (
              <p className="eyebrow">Account recovery</p>
            )}
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                autoFocus
              />
            </label>

            {mode !== "forgot" && (
              <label className="login-field">
                <span>Password</span>
                <div className="login-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>
            )}

            {mode === "signin" && (
              <button
                type="button"
                className="login-forgot-link"
                onClick={() => switchMode("forgot")}
              >
                Forgot password?
              </button>
            )}

            {error && <div className="login-error" role="alert">{error}</div>}
            {message && <div className="login-success" role="status">{message}</div>}

            <button
              type="submit"
              className="primary-button login-button"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (mode === "forgot" ? "Sending…" : "Signing in…") : (mode === "forgot" ? "Send reset link" : "Sign in")}
            </button>
          </form>

          {mode === "forgot" ? (
            <button type="button" className="login-mode-switch" onClick={() => switchMode("signin")}>← Back to sign in</button>
          ) : (
            <>
              <a className="login-mode-switch" href="/pricing">New to Kommee? Sign up</a>
              <a className="login-mode-switch" href="/join">Invited by your kitchen? Join your team</a>
            </>
          )}
        </div>

        <p className="login-simple-footer">Orders · invoices · stock · recipe costs</p>
      </section>
    </main>
  );
}
