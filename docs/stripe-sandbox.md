# Kommee Stripe sandbox rollout

Launch monthly pricing approved by the owner on 25 November 2026: Starter £29, Professional £59, Group £119. Kommee is not currently VAT registered; do not add VAT to these launch prices. Revisit tax settings before VAT registration or changes to selling jurisdictions. Annual pricing is not approved. Checkout remains sandbox-only pending verification.

## Preview setup

Connect a Stripe sandbox separately from the live account. Create three GBP monthly recurring sandbox Prices matching the draft amounts. On the Vercel preview branch only, configure these variables directly in the dashboard (never commit credentials):

- KOMMEE_STRIPE_SANDBOX=1
- STRIPE_TEST_SECRET_KEY (restricted test key with Prices read and Checkout Sessions write permissions and required dependent resources)
- STRIPE_TEST_PRICE_STARTER
- STRIPE_TEST_PRICE_PROFESSIONAL
- STRIPE_TEST_PRICE_GROUP
- STRIPE_TEST_RETURN_ORIGIN (exact HTTPS preview deployment origin, no trailing slash)

Use the isolated Kommee Test Supabase project and test-only accounts, not production data. Verify branch-specific Supabase configuration. POST /api/billing/sandbox-checkout with a verified test user's Supabase bearer token and JSON body {"plan":"starter"} (or professional/group). The response is a Stripe-hosted test Checkout URL with a seven-day trial and card collection. The endpoint deliberately cannot run on production or with live keys. No entitlement is granted.

## Required before release

- Monthly UK launch pricing and current VAT status confirmed. Annual pricing remains undecided. Do not activate live billing before sandbox tests and release review.
- Add a signup UI and authenticated checkout flow, including clear trial end, renewal amount, cancellation terms and accessibility.
- Implement tenant-level billing records and a server-controlled pending onboarding record, unique Stripe customer/subscription mapping and transactional idempotent provisioning of organisation, owner and site.
- Verify raw webhook signatures with Stripe SDK, store event IDs, reconcile subscription state from Stripe, handle retries and out-of-order delivery. Grant access only when a verified subscription is trialing or active; define failed-payment grace period and cancellation behavior. Never trust return URL or client metadata for access.
- Update server authorization and database RLS for all tenant data, with explicit grandfathered entitlements for existing restaurants. Enforce site limits server-side. Keep invited staff separate from billable organisation owners.
- Add owner-only customer portal sessions and cancellation/payment method management.
- Test signup, duplicate submissions, cancelled/expired sessions, card declines, trial conversion, cancellation, replayed events, tenant isolation and existing account regressions in sandbox. Verify email confirmation and mobile flow. Confirm Android distribution/payment policy before enabling native-app billing links.
- Use separate live credentials and webhook signing secret in production only after review and passing tests.

This branch is intentionally incomplete and must not be merged or treated as a functional public subscription flow.
