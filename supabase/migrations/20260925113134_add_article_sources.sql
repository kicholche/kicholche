alter table public.articles
  add column if not exists source_name text,
  add column if not exists source_url text,
  add column if not exists source_published_at timestamptz;

create index if not exists articles_source_published_at_idx
  on public.articles(source_published_at desc);
