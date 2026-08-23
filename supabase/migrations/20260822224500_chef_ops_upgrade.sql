create table if not exists public.invoice_extraction_jobs (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null,
  created_by uuid references auth.users(id) on delete set null,
  source_type text not null check (source_type in ('upload','email')),
  source_ref text,
  files jsonb not null default '[]'::jsonb,
  status text not null default 'queued'
    check (status in ('queued','processing','needs_review','saved','failed','discarded')),
  extracted_payload jsonb,
  error_message text,
  attempt_count integer not null default 0,
  last_attempt_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint invoice_extraction_jobs_site_org_fkey
    foreign key (site_id, organisation_id)
    references public.sites(id, organisation_id)
    on delete cascade
);

create index if not exists invoice_extraction_jobs_workspace_status_idx
  on public.invoice_extraction_jobs (organisation_id, site_id, status, created_at desc);

create unique index if not exists invoice_extraction_jobs_source_ref_idx
  on public.invoice_extraction_jobs (organisation_id, site_id, source_type, source_ref)
  where source_ref is not null;

alter table public.invoice_extraction_jobs enable row level security;
revoke all on public.invoice_extraction_jobs from anon, authenticated;
grant select, insert, update, delete on public.invoice_extraction_jobs to service_role;

alter table public.inbound_invoice_attachments
  add column if not exists extraction_job_id uuid
  references public.invoice_extraction_jobs(id) on delete set null;

alter table public.invoices
  add column if not exists matched_order_ref text;

create or replace function public.queue_workspace_invite(
  p_email text,
  p_full_name text,
  p_organisation_id uuid,
  p_site_id uuid,
  p_organisation_role text default 'member',
  p_site_role text default 'member'
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_organisation_role not in ('owner','admin','member') then
    raise exception 'Invalid organisation role';
  end if;

  if p_site_role not in ('manager','chef','member','viewer') then
    raise exception 'Invalid site role';
  end if;

  if not exists (
    select 1
    from public.sites
    where id = p_site_id
      and organisation_id = p_organisation_id
  ) then
    raise exception 'Site does not belong to organisation';
  end if;

  insert into private.pending_user_invites (
    email,
    full_name,
    organisation_id,
    site_id,
    organisation_role,
    site_role,
    created_at
  ) values (
    lower(trim(p_email)),
    nullif(trim(p_full_name), ''),
    p_organisation_id,
    p_site_id,
    p_organisation_role,
    p_site_role,
    now()
  )
  on conflict (email) do update
    set full_name = excluded.full_name,
        organisation_id = excluded.organisation_id,
        site_id = excluded.site_id,
        organisation_role = excluded.organisation_role,
        site_role = excluded.site_role,
        created_at = now();
end;
$$;

revoke all on function public.queue_workspace_invite(text,text,uuid,uuid,text,text)
  from public, anon, authenticated;
grant execute on function public.queue_workspace_invite(text,text,uuid,uuid,text,text)
  to service_role;
