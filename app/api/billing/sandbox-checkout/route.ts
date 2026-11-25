import { NextResponse } from "next/server";
import { serviceSupabase } from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sandbox-only foundation. Do not enable production billing or grant workspace
// access from a Checkout return URL. Entitlements require verified webhooks.
const plans = {
  starter: { env: "STRIPE_TEST_PRICE_STARTER", amount: 2900 },
  professional: { env: "STRIPE_TEST_PRICE_PROFESSIONAL", amount: 5900 },
  group: { env: "STRIPE_TEST_PRICE_GROUP", amount: 11900 },
} as const;

function reply(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const key = process.env.STRIPE_TEST_SECRET_KEY;
  const configuredOrigin = process.env.STRIPE_TEST_RETURN_ORIGIN;
  // Refuse live keys and production deployments, even if misconfigured.
  if (process.env.VERCEL_ENV !== "preview" || process.env.KOMMEE_STRIPE_SANDBOX !== "1" ||
      !key || !/^(sk|rk)_test_/.test(key) || !configuredOrigin) {
    return reply("Sandbox checkout is not configured.", 503);
  }
  try {
    const origin = new URL(configuredOrigin);
    if (origin.protocol !== "https:" || origin.origin !== configuredOrigin ||
        !origin.hostname.endsWith(".vercel.app") || origin.username || origin.password) {
      return reply("Sandbox return origin is invalid.", 503);
    }
    const token = request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
    if (!token) return reply("Sign in to continue.", 401);
    const { data, error } = await serviceSupabase.auth.getUser(token);
    if (error || !data.user?.email || !data.user.email_confirmed_at) return reply("Verified sign-in required.", 401);
    const body = await request.json().catch(() => null);
    const plan = body?.plan;
    if (typeof plan !== "string" || !Object.prototype.hasOwnProperty.call(plans, plan)) {
      return reply("Select a valid plan.", 400);
    }
    const selected = plans[plan as keyof typeof plans];
    const priceId = process.env[selected.env];
    if (!priceId || !/^price_[A-Za-z0-9]+$/.test(priceId)) return reply("Sandbox price is not configured.", 503);
    const headers = { Authorization: "Bearer " + key };
    const priceResponse = await fetch("https://api.stripe.com/v1/prices/" + priceId, { headers, cache: "no-store" });
    const price = await priceResponse.json();
    if (!priceResponse.ok || price.livemode !== false || !price.active ||
        price.currency !== "gbp" || price.unit_amount !== selected.amount ||
        price.recurring?.interval !== "month" || price.recurring?.interval_count !== 1) {
      return reply("Sandbox price does not match the draft plan.", 503);
    }
    const form = new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "subscription_data[trial_period_days]": "7",
      "subscription_data[trial_settings][end_behavior][missing_payment_method]": "cancel",
      "subscription_data[metadata][kommee_user_id]": data.user.id,
      "subscription_data[metadata][kommee_plan]": plan,
      "metadata[kommee_user_id]": data.user.id,
      "metadata[kommee_plan]": plan,
      payment_method_collection: "always",
      customer_email: data.user.email,
      client_reference_id: data.user.id,
      success_url: origin.origin + "/pricing?checkout=test-success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origin.origin + "/pricing?checkout=test-cancelled",
    });
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": "kommee-sandbox-" + data.user.id + "-" + plan + "-" + new Date().toISOString().slice(0, 10) },
      body: form,
      cache: "no-store",
    });
    const session = await stripeResponse.json();
    if (!stripeResponse.ok || session.livemode !== false || typeof session.url !== "string") {
      return reply("Could not create sandbox checkout.", 502);
    }
    const checkoutUrl = new URL(session.url);
    if (checkoutUrl.protocol !== "https:" || checkoutUrl.hostname !== "checkout.stripe.com") {
      return reply("Invalid checkout URL.", 502);
    }
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return reply("Sandbox checkout is temporarily unavailable.", 503);
  }
}
