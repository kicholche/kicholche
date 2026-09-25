create table if not exists public.article_engagement (
  article_id uuid primary key references public.articles(id) on delete cascade,
  views bigint not null default 0,
  likes bigint not null default 0,
  shares bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.article_engagement enable row level security;

drop policy if exists "Public can read article engagement" on public.article_engagement;
create policy "Public can read article engagement"
  on public.article_engagement for select
  to anon, authenticated
  using (true);

grant select on public.article_engagement to anon, authenticated;
revoke insert, update, delete on public.article_engagement from anon, authenticated;

create or replace function public.bump_article_engagement(p_article_id uuid, p_metric text)
returns public.article_engagement
language plpgsql
security definer
set search_path = ''
as $$
declare
  result public.article_engagement;
begin
  if p_metric not in ('views','likes','shares') then
    raise exception 'Invalid engagement metric';
  end if;
  insert into public.article_engagement(article_id)
  values (p_article_id)
  on conflict (article_id) do nothing;
  if p_metric = 'views' then
    update public.article_engagement set views=views+1,updated_at=now() where article_id=p_article_id returning * into result;
  elsif p_metric = 'likes' then
    update public.article_engagement set likes=likes+1,updated_at=now() where article_id=p_article_id returning * into result;
  else
    update public.article_engagement set shares=shares+1,updated_at=now() where article_id=p_article_id returning * into result;
  end if;
  return result;
end;
$$;

revoke execute on function public.bump_article_engagement(uuid,text) from public;
grant execute on function public.bump_article_engagement(uuid,text) to anon, authenticated;
