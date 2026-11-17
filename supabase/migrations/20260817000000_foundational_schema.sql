create schema if not exists private;

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organisations_name_unique unique (name)
);

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sites_id_organisation_unique unique (id, organisation_id),
  constraint sites_organisation_name_unique unique (organisation_id, name)
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organisation_members (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','manager','member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organisation_members_unique unique (organisation_id, user_id)
);

create table public.site_memberships (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('manager','chef','member','viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_memberships_unique unique (site_id, user_id)
);

create table public.user_workspace_selection (
  user_id uuid primary key references auth.users(id) on delete cascade,
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null,
  updated_at timestamptz not null default now(),
  constraint user_workspace_selection_site_org_fkey foreign key (site_id, organisation_id)
    references public.sites(id, organisation_id) on delete cascade
);

create table public.suppliers (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  whatsapp text,
  order_method text,
  logo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint suppliers_organisation_name_unique unique (organisation_id, name)
);

create table public.ingredients (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  category text,
  base_unit text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ingredients_organisation_name_unique unique (organisation_id, name)
);

create table public.supplier_products (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  ingredient_id uuid references public.ingredients(id) on delete set null,
  supplier_product_name text not null,
  supplier_product_code text,
  price_unit text,
  latest_price numeric,
  preferred boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint supplier_products_organisation_supplier_name_unique
    unique (organisation_id, supplier_id, supplier_product_name)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid not null,
  supplier_id uuid references public.suppliers(id) on delete set null,
  invoice_number text,
  invoice_date date,
  subtotal numeric,
  vat numeric,
  total numeric,
  file_name text,
  file_path text,
  status text not null default 'review' check (status in ('review','approved')),
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint invoices_site_org_fkey foreign key (site_id, organisation_id)
    references public.sites(id, organisation_id) on delete cascade
);

create table public.invoice_lines (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  supplier_product_id uuid references public.supplier_products(id) on delete set null,
  ingredient_id uuid references public.ingredients(id) on delete set null,
  product_name text not null,
  quantity numeric,
  pack text,
  unit_price numeric,
  line_total numeric,
  price_unit text,
  created_at timestamptz not null default now()
);

create table public.ingredient_prices (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  site_id uuid references public.sites(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id) on delete cascade,
  supplier_product_id uuid references public.supplier_products(id) on delete set null,
  price numeric not null,
  price_unit text,
  effective_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create or replace function public.is_org_member(p_organisation_id uuid)
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
revoke all on function public.is_org_member(uuid) from public, anon;
grant execute on function public.is_org_member(uuid) to authenticated, service_role;

create or replace function public.is_site_member(p_site_id uuid)
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
revoke all on function public.is_site_member(uuid) from public, anon;
grant execute on function public.is_site_member(uuid) to authenticated, service_role;

alter table public.organisations enable row level security;
alter table public.sites enable row level security;
alter table public.profiles enable row level security;
alter table public.organisation_members enable row level security;
alter table public.site_memberships enable row level security;
alter table public.user_workspace_selection enable row level security;
alter table public.suppliers enable row level security;
alter table public.ingredients enable row level security;
alter table public.supplier_products enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_lines enable row level security;
alter table public.ingredient_prices enable row level security;

grant select on public.organisations, public.sites, public.organisation_members,
  public.site_memberships, public.suppliers, public.ingredients, public.supplier_products,
  public.invoices, public.invoice_lines, public.ingredient_prices to authenticated;
grant select, insert, update on public.profiles, public.user_workspace_selection to authenticated;

create policy "Members read organisations" on public.organisations for select to authenticated
  using (public.is_org_member(id));
create policy "Members read sites" on public.sites for select to authenticated
  using (public.is_org_member(organisation_id));
create policy "Users read own profile" on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "Users insert own profile" on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);
create policy "Users update own profile" on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Members read organisation memberships" on public.organisation_members for select to authenticated
  using (public.is_org_member(organisation_id));
create policy "Members read site memberships" on public.site_memberships for select to authenticated
  using (public.is_site_member(site_id));
create policy "Users manage own workspace selection" on public.user_workspace_selection for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id and public.is_org_member(organisation_id) and public.is_site_member(site_id));
create policy "Members read suppliers" on public.suppliers for select to authenticated
  using (public.is_org_member(organisation_id));
create policy "Members read ingredients" on public.ingredients for select to authenticated
  using (public.is_org_member(organisation_id));
create policy "Members read supplier products" on public.supplier_products for select to authenticated
  using (public.is_org_member(organisation_id));
create policy "Members read invoices" on public.invoices for select to authenticated
  using (public.is_org_member(organisation_id) and public.is_site_member(site_id));
create policy "Members read invoice lines" on public.invoice_lines for select to authenticated
  using (exists (select 1 from public.invoices i where i.id = invoice_id
    and public.is_org_member(i.organisation_id) and public.is_site_member(i.site_id)));
create policy "Members read ingredient prices" on public.ingredient_prices for select to authenticated
  using (public.is_org_member(organisation_id));

insert into storage.buckets (id, name, public)
values ('invoice-files', 'invoice-files', false)
on conflict (id) do nothing;

create policy "Users upload own invoice files" on storage.objects for insert to authenticated
  with check (bucket_id = 'invoice-files' and (storage.foldername(name))[1] = 'uploads'
    and (storage.foldername(name))[2] = (select auth.uid())::text);
create policy "Users read own invoice files" on storage.objects for select to authenticated
  using (bucket_id = 'invoice-files' and (storage.foldername(name))[1] = 'uploads'
    and (storage.foldername(name))[2] = (select auth.uid())::text);
create policy "Users update own invoice files" on storage.objects for update to authenticated
  using (bucket_id = 'invoice-files' and (storage.foldername(name))[1] = 'uploads'
    and (storage.foldername(name))[2] = (select auth.uid())::text)
  with check (bucket_id = 'invoice-files' and (storage.foldername(name))[1] = 'uploads'
    and (storage.foldername(name))[2] = (select auth.uid())::text);
create policy "Users delete own invoice files" on storage.objects for delete to authenticated
  using (bucket_id = 'invoice-files' and (storage.foldername(name))[1] = 'uploads'
    and (storage.foldername(name))[2] = (select auth.uid())::text);
