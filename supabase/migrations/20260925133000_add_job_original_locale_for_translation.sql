alter table public.jobs
  add column if not exists original_locale text not null default 'bn';

alter table public.jobs
  drop constraint if exists jobs_original_locale_check;

alter table public.jobs
  add constraint jobs_original_locale_check
  check (original_locale in ('bn','hi','en'));
