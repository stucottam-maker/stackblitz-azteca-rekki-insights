create table if not exists public.workspace_state (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  state_key text not null,
  state_value jsonb not null default 'null'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workspace_state_organisation_key_unique unique (organisation_id, state_key)
);

create index if not exists workspace_state_organisation_id_idx
  on public.workspace_state (organisation_id);
create index if not exists workspace_state_updated_by_idx
  on public.workspace_state (updated_by);

alter table public.workspace_state enable row level security;

grant select, insert, update, delete on public.workspace_state to authenticated;

create policy "Members can read workspace state"
  on public.workspace_state for select
  to authenticated
  using (public.is_org_member(organisation_id));

create policy "Members can insert workspace state"
  on public.workspace_state for insert
  to authenticated
  with check (
    public.is_org_member(organisation_id)
    and updated_by = (select auth.uid())
  );

create policy "Members can update workspace state"
  on public.workspace_state for update
  to authenticated
  using (public.is_org_member(organisation_id))
  with check (
    public.is_org_member(organisation_id)
    and updated_by = (select auth.uid())
  );

create policy "Members can delete workspace state"
  on public.workspace_state for delete
  to authenticated
  using (public.is_org_member(organisation_id));
