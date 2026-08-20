create schema if not exists private;
revoke all on schema private from public;

create table if not exists private.pending_user_invites (
  email text primary key,
  full_name text,
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null,
  organisation_role text not null default 'member' check (organisation_role in ('owner','admin','member')),
  site_role text not null default 'member' check (site_role in ('manager','chef','member','viewer')),
  created_at timestamptz not null default now(),
  constraint pending_user_invites_site_org_fkey
    foreign key (site_id, organisation_id)
    references public.sites(id, organisation_id)
    on delete cascade
);

revoke all on private.pending_user_invites from public, anon, authenticated;

create or replace function private.handle_pending_user_invite()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  invite_row private.pending_user_invites%rowtype;
begin
  select * into invite_row
  from private.pending_user_invites
  where lower(email) = lower(new.email)
  limit 1;

  if invite_row.email is null then
    return new;
  end if;

  insert into public.profiles (id, full_name)
  values (new.id, invite_row.full_name)
  on conflict (id) do update set full_name = excluded.full_name;

  insert into public.organisation_members (organisation_id, user_id, role)
  values (invite_row.organisation_id, new.id, invite_row.organisation_role)
  on conflict (organisation_id, user_id) do update set role = excluded.role;

  insert into public.site_memberships (site_id, user_id, role)
  values (invite_row.site_id, new.id, invite_row.site_role)
  on conflict (site_id, user_id) do update set role = excluded.role;

  insert into public.user_workspace_selection (user_id, organisation_id, site_id, updated_at)
  values (new.id, invite_row.organisation_id, invite_row.site_id, now())
  on conflict (user_id) do update
    set organisation_id = excluded.organisation_id,
        site_id = excluded.site_id,
        updated_at = now();

  delete from private.pending_user_invites
  where lower(email) = lower(new.email);

  return new;
end;
$$;

revoke all on function private.handle_pending_user_invite() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_assign_workspace on auth.users;
create trigger on_auth_user_created_assign_workspace
after insert on auth.users
for each row execute function private.handle_pending_user_invite();
