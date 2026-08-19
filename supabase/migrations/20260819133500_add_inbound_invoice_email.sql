create table if not exists public.inbound_invoice_routes (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null references public.sites(id) on delete cascade,
  email_address text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inbound_invoice_routes_email_unique unique (email_address)
);

create table if not exists public.inbound_invoice_emails (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null references public.sites(id) on delete cascade,
  resend_email_id text not null unique,
  message_id text,
  sender text not null,
  recipients text[] not null default '{}',
  subject text,
  status text not null default 'received',
  error_message text,
  received_at timestamptz not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inbound_invoice_emails_status_check
    check (status in ('received', 'processing', 'needs_review', 'processed', 'duplicate', 'failed', 'ignored'))
);

create table if not exists public.inbound_invoice_attachments (
  id uuid primary key default gen_random_uuid(),
  inbound_email_id uuid not null references public.inbound_invoice_emails(id) on delete cascade,
  resend_attachment_id text not null,
  invoice_id uuid references public.invoices(id) on delete set null,
  file_name text not null,
  content_type text not null,
  size_bytes bigint,
  storage_path text,
  status text not null default 'received',
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inbound_invoice_attachments_unique unique (inbound_email_id, resend_attachment_id),
  constraint inbound_invoice_attachments_status_check
    check (status in ('received', 'stored', 'extracted', 'duplicate', 'failed', 'ignored'))
);

create index if not exists inbound_invoice_emails_queue_idx
  on public.inbound_invoice_emails (organisation_id, site_id, status, received_at desc);
create index if not exists inbound_invoice_attachments_email_idx
  on public.inbound_invoice_attachments (inbound_email_id);

alter table public.inbound_invoice_routes enable row level security;
alter table public.inbound_invoice_emails enable row level security;
alter table public.inbound_invoice_attachments enable row level security;

grant select on public.inbound_invoice_routes, public.inbound_invoice_emails, public.inbound_invoice_attachments to authenticated;

create policy "Members can read inbound invoice routes"
  on public.inbound_invoice_routes for select to authenticated
  using (public.is_org_member(organisation_id));

create policy "Members can read inbound invoice emails"
  on public.inbound_invoice_emails for select to authenticated
  using (public.is_org_member(organisation_id));

create policy "Members can read inbound invoice attachments"
  on public.inbound_invoice_attachments for select to authenticated
  using (
    exists (
      select 1 from public.inbound_invoice_emails email
      where email.id = inbound_email_id
        and public.is_org_member(email.organisation_id)
    )
  );

insert into public.inbound_invoice_routes (organisation_id, site_id, email_address)
select o.id, s.id, 'azteca-invoices@vimnale.resend.app'
from public.organisations o
join public.sites s on s.organisation_id = o.id
where s.name = 'Azteca'
on conflict (email_address) do update
set organisation_id = excluded.organisation_id,
    site_id = excluded.site_id,
    active = true,
    updated_at = now();
