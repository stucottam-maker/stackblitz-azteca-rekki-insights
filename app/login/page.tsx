"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestedPath = searchParams.get("next");
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

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="Kitchen Insights introduction">
        <div className="login-brand-row">
          <div className="login-brand-icon">
            <Image
              src="/icon.png"
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
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your workspace</h2>
            <p>Enter your details to continue to Kitchen Insights.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
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

            <label className="login-field">
              <span>Password</span>
              <div className="login-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
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

            {error && <div className="login-error" role="alert">{error}</div>}

            <button
              type="submit"
              className="primary-button login-button"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="login-help">Need access? Contact your Kitchen Insights administrator.</p>
        </div>
      </section>
    </main>
  );
}
