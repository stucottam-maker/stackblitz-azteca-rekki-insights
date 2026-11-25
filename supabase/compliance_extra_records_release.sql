-- Applied to Kommee Test only. Review and apply via a production migration before releasing the feature.
create table public.compliance_extra_records (
 id uuid primary key default gen_random_uuid(),
 organisation_id uuid not null references public.organisations(id),
 site_id uuid not null references public.sites(id),
 kind text not null check (kind in ('waste','allergen','haccp')),
 title text not null check (length(trim(title)) between 1 and 200),
 details jsonb not null check (jsonb_typeof(details)='object'),
 recorded_by uuid not null references auth.users(id),
 recorded_at timestamptz not null default now()
);
create index compliance_extra_records_scope_idx on public.compliance_extra_records(organisation_id,site_id,kind,recorded_at desc);
alter table public.compliance_extra_records enable row level security;
revoke all on public.compliance_extra_records from anon, authenticated;
grant select,insert on public.compliance_extra_records to authenticated;
create policy "Site members read extra compliance records" on public.compliance_extra_records for select to authenticated using (
 public.is_org_member(organisation_id) and public.is_site_member(site_id)
 and exists(select 1 from public.sites s where s.id=site_id and s.organisation_id=compliance_extra_records.organisation_id)
);
create policy "Site members append extra compliance records" on public.compliance_extra_records for insert to authenticated with check (
 recorded_by=(select auth.uid()) and public.is_org_member(organisation_id) and public.is_site_member(site_id)
 and exists(select 1 from public.sites s where s.id=site_id and s.organisation_id=compliance_extra_records.organisation_id)
);
