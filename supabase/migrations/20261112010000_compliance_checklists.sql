create table public.compliance_checklist_submissions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null,
  checklist_type text not null check (checklist_type in ('opening','closing','cleaning')),
  check_date date not null,
  answers jsonb not null,
  failure_count integer not null default 0 check (failure_count >= 0),
  status text not null default 'needs_review' check (status in ('needs_review','reviewed')),
  submitted_by uuid not null references auth.users(id),
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  review_notes text,
  constraint compliance_checklists_site_org_fkey foreign key (site_id, organisation_id)
    references public.sites(id, organisation_id) on delete cascade
);

create index compliance_checklists_workspace_date_idx
  on public.compliance_checklist_submissions (organisation_id, site_id, check_date desc);
alter table public.compliance_checklist_submissions enable row level security;
grant select, insert, update on public.compliance_checklist_submissions to authenticated;

create policy "Site members read checklist submissions"
  on public.compliance_checklist_submissions for select to authenticated
  using (public.is_org_member(organisation_id) and public.is_site_member(site_id));
create policy "Site members submit checklists"
  on public.compliance_checklist_submissions for insert to authenticated
  with check ((select auth.uid()) = submitted_by and public.is_org_member(organisation_id)
    and public.is_site_member(site_id));
create policy "Organisation managers review checklists"
  on public.compliance_checklist_submissions for update to authenticated
  using (exists (select 1 from public.organisation_members m
    where m.organisation_id = compliance_checklist_submissions.organisation_id
      and m.user_id = (select auth.uid()) and m.role in ('owner','admin','manager')))
  with check (exists (select 1 from public.organisation_members m
    where m.organisation_id = compliance_checklist_submissions.organisation_id
      and m.user_id = (select auth.uid()) and m.role in ('owner','admin','manager')));
