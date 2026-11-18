"use client";


import KitchenLogo from "../components/KitchenLogo";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { supabase } from "../lib/supabase";

type LoginMode = "signin" | "activate" | "forgot";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPath = searchParams.get("next");
  const requestedEmail = searchParams.get("email") ?? "";
  const requestedMode: LoginMode = searchParams.get("activate") === "1" ? "activate" : "signin";

  const [mode, setMode] = useState<LoginMode>(requestedMode);
  const [email, setEmail] = useState(requestedEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const nextPath =
    requestedPath && requestedPath.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/?app=1";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace(nextPath);
        router.refresh();
      }
    });
  }, [nextPath, router]);

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

    if (mode === "activate") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.replace(nextPath);
        router.refresh();
        return;
      }

      setMessage("Account created. Check your email to confirm it, then sign in.");
      setMode("signin");
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
          ? "We couldn’t sign you in. If this is your first time on Kommee, create your account below."
          : signInError.message
      );
      setLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  const heading =
    mode === "activate"
      ? "Activate your account"
      : mode === "forgot"
        ? "Reset your password"
        : "Sign in";

  const description =
    mode === "activate"
      ? "Create your Kommee login with your email and a new password."
      : mode === "forgot"
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
              <p className="eyebrow">{mode === "forgot" ? "Account recovery" : "First-time access"}</p>
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
                <span>{mode === "activate" ? "Choose a password" : "Password"}</span>
                <div className="login-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={mode === "activate" ? "Choose a secure password" : "Your password"}
                    required
                    minLength={mode === "activate" ? 8 : undefined}
                    autoComplete={mode === "activate" ? "new-password" : "current-password"}
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
              {loading
                ? mode === "activate"
                  ? "Activating…"
                  : mode === "forgot"
                    ? "Sending…"
                    : "Signing in…"
                : mode === "activate"
                  ? "Create Kommee account"
                  : mode === "forgot"
                    ? "Send reset link"
                    : "Sign in"}
            </button>
          </form>

          <button
            type="button"
            className="login-mode-switch"
            onClick={() => {
              if (mode === "forgot") switchMode("signin");
              else if (mode === "signin") switchMode("activate");
              else switchMode("signin");
            }}
          >
            {mode === "forgot"
              ? "← Back to sign in"
              : mode === "signin"
                ? "First time here? Create account"
                : "Already activated? Sign in"}
          </button>
        </div>

        <p className="login-simple-footer">Orders · invoices · stock · recipe costs</p>
      </section>
    </main>
  );
}
