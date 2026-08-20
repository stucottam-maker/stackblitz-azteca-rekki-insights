"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
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
      : "/";

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
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail);

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage(
          "If that email belongs to a Kitchen Insights account, a secure password reset link has been sent."
        );
      }

      setLoading(false);
      return;
    }

    if (mode === "activate") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
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
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  const eyebrow =
    mode === "activate" ? "First-time access" : mode === "forgot" ? "Account recovery" : "Welcome back";
  const heading =
    mode === "activate"
      ? "Activate your workspace"
      : mode === "forgot"
        ? "Reset your password"
        : "Sign in to your workspace";
  const description =
    mode === "activate"
      ? "Use the invited email address and temporary password provided by your administrator."
      : mode === "forgot"
        ? "Enter your account email and we’ll send you a secure reset link."
        : "Enter your details to continue to Kitchen Insights.";

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="Kitchen Insights introduction">
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
          <p className="login-kicker">Kitchen operations, connected</p>
          <h1>Know what your kitchen costs—before it costs you.</h1>
          <p>Purchasing, invoices, recipe costs and stock in one clear workspace.</p>
        </div>

        <div className="login-workspace-card">
          <div className="login-workspace-mark">KI</div>
          <div className="login-workspace-copy">
            <span>Secure workspace</span>
            <strong>Your restaurant</strong>
            <small>Only the sites you can access load after sign in</small>
          </div>
        </div>

        <p className="login-intro-footer">Secure cloud workspace · Live invoice intelligence</p>
      </section>

      <section className="login-panel">
        <div className="login-shell">
          <div className="login-heading">
            <p className="eyebrow">{eyebrow}</p>
            <h2>{heading}</h2>
            <p>{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-field">
              <span>Email address</span>
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
                <span>{mode === "activate" ? "Temporary password" : "Password"}</span>
                <div className="login-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={mode === "activate" ? "Enter temporary password" : "Enter your password"}
                    required
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
                Forgot your password?
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
                    ? "Sending reset link…"
                    : "Signing in…"
                : mode === "activate"
                  ? "Activate account"
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
              ? "Back to sign in"
              : mode === "signin"
                ? "First time here? Activate account"
                : "Already activated? Sign in"}
          </button>

          <p className="login-help">Need access? Contact your Kitchen Insights administrator.</p>
        </div>
      </section>
    </main>
  );
}
