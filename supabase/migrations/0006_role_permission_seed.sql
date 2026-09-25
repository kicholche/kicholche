insert into public.role_permissions(role,permission_id) select 'MANAGER',id from public.permissions where code in ('posts','jobs','results','translations','media','homepage','tools','notifications','analytics') on conflict do nothing;
insert into public.role_permissions(role,permission_id) select 'ADMIN',id from public.permissions on conflict do nothing;
drop policy if exists "users read own profile" on public.profiles;
drop policy if exists "admins manage profiles" on public.profiles;
create policy "users read own profile" on public.profiles for select to authenticated using((select auth.uid())=id);
create policy "admins manage profiles" on public.profiles for update to authenticated using(public.is_admin()) with check(public.is_admin());
