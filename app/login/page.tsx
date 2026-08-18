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
      <section className="login-shell">
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

        <div className="login-heading">
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in</h1>
          <p>
            Sign in to access purchasing, invoices, ingredients, recipes, stock and reporting.
          </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
              autoComplete="current-password"
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button
            type="submit"
            className="primary-button login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-divider"><span /></div>

        <div className="login-workspace-card">
          <div className="login-workspace-mark">AZ</div>
          <div className="login-workspace-copy">
            <span>Workspace</span>
            <strong>Azteca</strong>
            <small>Battersea, London</small>
          </div>
        </div>
      </section>
    </main>
  );
}
