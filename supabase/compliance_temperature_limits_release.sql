-- Apply after compliance_equipment_register_release.sql. Test environment only at initial implementation.
alter table public.compliance_equipment
 add column min_temperature_c numeric(6,2),
 add column max_temperature_c numeric(6,2),
 add constraint compliance_equipment_limits_order check (min_temperature_c is null or max_temperature_c is null or min_temperature_c <= max_temperature_c);
grant update(min_temperature_c,max_temperature_c) on public.compliance_equipment to authenticated;

alter table public.compliance_checks
 add column limit_min_c numeric(6,2),
 add column limit_max_c numeric(6,2),
 add column corrective_action text;

create function public.validate_equipment_temperature() returns trigger
 language plpgsql security invoker set search_path='' as $$
 declare unit public.compliance_equipment%rowtype;
 begin
   if new.check_type <> 'temperature' or new.equipment_id is null then return new; end if;
   select * into unit from public.compliance_equipment e
     where e.id=new.equipment_id and e.site_id=new.site_id and e.organisation_id=new.organisation_id and e.active;
   if not found then raise exception 'Equipment is not active or accessible'; end if;
   if new.measured_temperature_c is null then raise exception 'Measured temperature required'; end if;
   new.equipment_name := unit.name;
   new.limit_min_c := unit.min_temperature_c;
   new.limit_max_c := unit.max_temperature_c;
   if (unit.min_temperature_c is not null and new.measured_temperature_c < unit.min_temperature_c)
     or (unit.max_temperature_c is not null and new.measured_temperature_c > unit.max_temperature_c) then
     if nullif(btrim(new.corrective_action),'') is null then raise exception 'Corrective action required for an out-of-range reading'; end if;
     new.status := 'failed';
   else
     new.status := 'needs_review';
   end if;
   return new;
 end;
 $$;
revoke execute on function public.validate_equipment_temperature() from public,anon,authenticated;
create trigger validate_equipment_temperature_before_insert before insert on public.compliance_checks
 for each row execute function public.validate_equipment_temperature();
