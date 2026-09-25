drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using(bucket_id='media');
drop policy if exists "authenticated upload media" on storage.objects;
create policy "authenticated upload media" on storage.objects for insert to authenticated with check(bucket_id='media' and public.is_manager());
drop policy if exists "managers update media" on storage.objects;
create policy "managers update media" on storage.objects for update to authenticated using(bucket_id='media' and public.is_manager()) with check(bucket_id='media' and public.is_manager());
drop policy if exists "managers delete media" on storage.objects;
create policy "managers delete media" on storage.objects for delete to authenticated using(bucket_id='media' and public.is_manager());
