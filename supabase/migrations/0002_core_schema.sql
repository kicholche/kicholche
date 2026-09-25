create extension if not exists pgcrypto;
do $$ begin create type public.app_role as enum ('ADMIN','MANAGER','USER'); exception when duplicate_object then null; end $$;
do $$ begin create type public.content_status as enum ('draft','translating','translated','review','approved','scheduled','published','archived'); exception when duplicate_object then null; end $$;

create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text, avatar_url text,
 role public.app_role not null default 'USER',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.permissions(id uuid primary key default gen_random_uuid(),code text unique not null,label text not null);
create table if not exists public.role_permissions(role public.app_role not null,permission_id uuid not null references public.permissions(id) on delete cascade,primary key(role,permission_id));
create table if not exists public.categories(id uuid primary key default gen_random_uuid(),slug text unique not null,name_bn text,name_hi text,name_en text,enabled boolean not null default true,sort_order int not null default 0);
create table if not exists public.authors(id uuid primary key default gen_random_uuid(),name text not null,bio text,avatar_url text,created_at timestamptz not null default now());
create table if not exists public.media(id uuid primary key default gen_random_uuid(),storage_path text unique not null,alt_text text,caption text,mime_type text,width int,height int,created_by uuid references auth.users(id),created_at timestamptz not null default now());create table if not exists public.articles(
 id uuid primary key default gen_random_uuid(),slug text unique not null,original_locale text not null check(original_locale in ('bn','hi','en')),
 category_id uuid references public.categories(id),author_id uuid references public.authors(id),featured_media_id uuid references public.media(id),
 status public.content_status not null default 'draft',featured boolean not null default false,breaking boolean not null default false,trending boolean not null default false,
 breaking_start timestamptz,breaking_end timestamptz,publish_at timestamptz,updated_at timestamptz not null default now(),created_at timestamptz not null default now()
);
create table if not exists public.article_translations(
 id uuid primary key default gen_random_uuid(),article_id uuid not null references public.articles(id) on delete cascade,
 locale text not null check(locale in ('bn','hi','en')),title text not null,excerpt text,content text not null,seo_title text,seo_description text,translated_status text not null default 'draft',
 unique(article_id,locale)
);
create table if not exists public.jobs(
 id uuid primary key default gen_random_uuid(),slug text unique not null,job_type text not null,company text,location text,qualification text,age_text text,salary_text text,vacancies int,apply_start date,apply_end date,official_url text,status public.content_status not null default 'draft',created_at timestamptz not null default now()
);
create table if not exists public.job_translations(
 id uuid primary key default gen_random_uuid(),job_id uuid not null references public.jobs(id) on delete cascade,
 locale text not null check(locale in ('bn','hi','en')),title text not null,description text,important_dates text,unique(job_id,locale)
);
create table if not exists public.results(id uuid primary key default gen_random_uuid(),slug text unique not null,result_type text not null,official_url text,publish_at timestamptz,status public.content_status not null default 'draft',created_at timestamptz not null default now());
create table if not exists public.tools(id uuid primary key default gen_random_uuid(),slug text unique not null,category text not null,name_bn text,name_hi text,name_en text,description text,enabled boolean not null default true,sort_order int not null default 0);create table if not exists public.saved_articles(user_id uuid references auth.users(id) on delete cascade,article_id uuid references public.articles(id) on delete cascade,created_at timestamptz not null default now(),primary key(user_id,article_id));
create table if not exists public.saved_jobs(user_id uuid references auth.users(id) on delete cascade,job_id uuid references public.jobs(id) on delete cascade,created_at timestamptz not null default now(),primary key(user_id,job_id));
create table if not exists public.tool_usage(user_id uuid references auth.users(id) on delete set null,tool_id uuid references public.tools(id) on delete cascade,used_at timestamptz not null default now());
create table if not exists public.user_preferences(user_id uuid primary key references auth.users(id) on delete cascade,locale text default 'bn',theme text default 'light',notifications boolean default true,updated_at timestamptz not null default now());
create table if not exists public.homepage_sections(id uuid primary key default gen_random_uuid(),section_key text unique not null,enabled boolean default true,sort_order int default 0,priority int default 0);
create table if not exists public.site_settings(key text primary key,value jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now());
create table if not exists public.audit_logs(id uuid primary key default gen_random_uuid(),actor_id uuid references auth.users(id),action text not null,entity_type text,entity_id uuid,metadata jsonb,created_at timestamptz not null default now());
create table if not exists public.error_logs(id uuid primary key default gen_random_uuid(),severity text not null,message text not null,route text,metadata jsonb,created_at timestamptz not null default now());
create table if not exists public.analytics_events(id uuid primary key default gen_random_uuid(),user_id uuid references auth.users(id) on delete set null,event_name text not null,route text,metadata jsonb,created_at timestamptz not null default now());alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.article_translations enable row level security;
alter table public.jobs enable row level security;
alter table public.job_translations enable row level security;
alter table public.results enable row level security;
alter table public.tools enable row level security;
alter table public.saved_articles enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.tool_usage enable row level security;
alter table public.user_preferences enable row level security;
alter table public.audit_logs enable row level security;
alter table public.error_logs enable row level security;
alter table public.analytics_events enable row level security;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='ADMIN') $$;
create or replace function public.is_manager() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('ADMIN','MANAGER')) $$;
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles" on public.articles for select using(status='published');
drop policy if exists "staff manage articles" on public.articles;
create policy "staff manage articles" on public.articles for all using(public.is_manager()) with check(public.is_manager());drop policy if exists "public read translations" on public.article_translations;
create policy "public read translations" on public.article_translations for select using(exists(select 1 from public.articles a where a.id=article_id and a.status='published'));
drop policy if exists "staff manage translations" on public.article_translations;
create policy "staff manage translations" on public.article_translations for all using(public.is_manager()) with check(public.is_manager());
drop policy if exists "users own saved articles" on public.saved_articles;
create policy "users own saved articles" on public.saved_articles for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
drop policy if exists "users own saved jobs" on public.saved_jobs;
create policy "users own saved jobs" on public.saved_jobs for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
drop policy if exists "users own preferences" on public.user_preferences;
create policy "users own preferences" on public.user_preferences for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
drop policy if exists "users own tool usage" on public.tool_usage;
create policy "users own tool usage" on public.tool_usage for select using(auth.uid()=user_id);
drop policy if exists "staff audit read" on public.audit_logs;
create policy "staff audit read" on public.audit_logs for select using(public.is_manager());
drop policy if exists "admin audit write" on public.audit_logs;
create policy "admin audit write" on public.audit_logs for insert with check(public.is_admin());
insert into public.permissions(code,label) values
('posts','Posts'),('jobs','Jobs'),('results','Results'),('translations','Translations'),('media','Media'),('homepage','Homepage'),('tools','Tools'),('notifications','Notifications'),('analytics','Analytics')
on conflict(code) do nothing;