-- Test migration; production release requires review and application.
create table public.compliance_equipment (
 id uuid primary key default gen_random_uuid(),
 organisation_id uuid not null references public.organisations(id),
 site_id uuid not null references public.sites(id),
 name text not null check (length(trim(name)) between 1 and 100),
 equipment_type text not null check (equipment_type in ('fridge','freezer','cold_room','hot_holding','other')),
 active boolean not null default true,
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),
 unique(id,organisation_id,site_id)
);
create unique index compliance_equipment_active_name on public.compliance_equipment(organisation_id,site_id,lower(trim(name))) where active;
alter table public.compliance_equipment enable row level security;
revoke all on public.compliance_equipment from anon, authenticated;
grant select,insert on public.compliance_equipment to authenticated;
grant update(name,equipment_type,active) on public.compliance_equipment to authenticated;
create policy "Members read equipment" on public.compliance_equipment for select to authenticated using (
 public.is_org_member(organisation_id) and public.is_site_member(site_id)
 and exists(select 1 from public.sites s where s.id=site_id and s.organisation_id=compliance_equipment.organisation_id)
);
create policy "Managers add equipment" on public.compliance_equipment for insert to authenticated with check (
 created_by=(select auth.uid()) and public.is_site_member(site_id) and exists(select 1 from public.sites s where s.id=site_id and s.organisation_id=compliance_equipment.organisation_id)
 and exists(select 1 from public.organisation_members m where m.organisation_id=compliance_equipment.organisation_id and m.user_id=(select auth.uid()) and m.role in ('owner','admin','manager'))
);
create policy "Managers update equipment" on public.compliance_equipment for update to authenticated using (
 public.is_site_member(site_id) and exists(select 1 from public.organisation_members m where m.organisation_id=compliance_equipment.organisation_id and m.user_id=(select auth.uid()) and m.role in ('owner','admin','manager'))
) with check (
 public.is_site_member(site_id) and exists(select 1 from public.sites s where s.id=site_id and s.organisation_id=compliance_equipment.organisation_id)
 and exists(select 1 from public.organisation_members m where m.organisation_id=compliance_equipment.organisation_id and m.user_id=(select auth.uid()) and m.role in ('owner','admin','manager'))
);
alter table public.compliance_checks add column equipment_id uuid;
alter table public.compliance_checks add constraint compliance_checks_equipment_scope_fkey foreign key(equipment_id,organisation_id,site_id) references public.compliance_equipment(id,organisation_id,site_id);
create index compliance_checks_equipment_time on public.compliance_checks(equipment_id,recorded_at desc) where equipment_id is not null;
