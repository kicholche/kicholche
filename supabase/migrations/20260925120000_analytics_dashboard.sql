drop policy if exists "public insert analytics" on public.analytics_events;
create policy "public insert analytics" on public.analytics_events
for insert to anon, authenticated
with check (
  event_name in ('page_view','click','visitor_heartbeat')
  and coalesce(length(route),0) <= 500
  and (metadata is null or pg_column_size(metadata) <= 8192)
);

drop policy if exists "staff read analytics" on public.analytics_events;
create policy "staff read analytics" on public.analytics_events
for select to authenticated
using (public.is_manager());

grant insert on public.analytics_events to anon, authenticated;
grant select on public.analytics_events to authenticated;
