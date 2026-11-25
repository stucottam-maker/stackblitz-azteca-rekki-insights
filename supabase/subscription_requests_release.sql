-- Initially applied to Kommee Test only. Do not release public intake without abuse controls and privacy review.
create table public.subscription_requests (
 id uuid primary key default gen_random_uuid(),
 plan text not null check(plan in ('starter','professional','group')),
 contact_name text not null check(length(btrim(contact_name)) between 1 and 100),
 business_name text not null check(length(btrim(business_name)) between 1 and 160),
 email text not null check(length(email) between 3 and 254 and email=lower(btrim(email))),
 site_count integer not null check(site_count between 1 and 1000),
 status text not null default 'pending' check(status in ('pending','contacted','closed')),
 created_at timestamptz not null default now(),
 unique(email,plan)
);
alter table public.subscription_requests enable row level security;
revoke all on public.subscription_requests from public,anon,authenticated;
grant select,insert,update on public.subscription_requests to service_role;
