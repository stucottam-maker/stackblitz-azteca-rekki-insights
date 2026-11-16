create or replace function private.is_org_member(p_organisation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from public.organisation_members m
    where m.organisation_id = p_organisation_id and m.user_id = auth.uid()
  );
$$;

create or replace function private.is_site_member(p_site_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from public.site_memberships m
    where m.site_id = p_site_id and m.user_id = auth.uid()
  );
$$;

revoke all on function private.is_org_member(uuid) from public, anon, authenticated;
revoke all on function private.is_site_member(uuid) from public, anon, authenticated;
grant execute on function private.is_org_member(uuid) to authenticated, service_role;
grant execute on function private.is_site_member(uuid) to authenticated, service_role;

create or replace function public.is_org_member(p_organisation_id uuid)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$ select private.is_org_member(p_organisation_id); $$;

create or replace function public.is_site_member(p_site_id uuid)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$ select private.is_site_member(p_site_id); $$;

revoke all on function public.is_org_member(uuid) from public, anon;
revoke all on function public.is_site_member(uuid) from public, anon;
grant execute on function public.is_org_member(uuid) to authenticated, service_role;
grant execute on function public.is_site_member(uuid) to authenticated, service_role;
