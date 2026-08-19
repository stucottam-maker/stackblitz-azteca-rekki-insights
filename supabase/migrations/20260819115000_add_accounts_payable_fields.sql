alter table public.invoices
  add column if not exists due_date date,
  add column if not exists payment_terms text,
  add column if not exists payment_status text not null default 'unpaid',
  add column if not exists paid_at timestamptz,
  add column if not exists match_status text not null default 'unmatched',
  add column if not exists discrepancy_amount numeric;

update public.invoices
set due_date = coalesce(due_date, invoice_date + 30),
    payment_terms = coalesce(payment_terms, '30 days')
where invoice_date is not null
  and (due_date is null or payment_terms is null);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'invoices_payment_status_check') then
    alter table public.invoices add constraint invoices_payment_status_check
      check (payment_status in ('unpaid', 'scheduled', 'paid', 'disputed'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'invoices_match_status_check') then
    alter table public.invoices add constraint invoices_match_status_check
      check (match_status in ('unmatched', 'matched', 'discrepancy'));
  end if;
end $$;

create index if not exists invoices_ap_queue_idx
  on public.invoices (organisation_id, site_id, payment_status, due_date)
  where status = 'approved';
