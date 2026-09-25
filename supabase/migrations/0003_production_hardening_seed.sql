create index if not exists idx_articles_status_publish on public.articles(status,publish_at desc);
create index if not exists idx_articles_category on public.articles(category_id);
create index if not exists idx_articles_flags on public.articles(featured,breaking,trending);
create index if not exists idx_article_translations_locale on public.article_translations(locale);
create index if not exists idx_jobs_status_dates on public.jobs(status,apply_end);
create index if not exists idx_job_translations_locale on public.job_translations(locale);
create index if not exists idx_results_status_publish on public.results(status,publish_at desc);
create index if not exists idx_analytics_events_created on public.analytics_events(created_at desc);

create policy "public read categories" on public.categories for select using(enabled=true);
create policy "staff manage categories" on public.categories for all using(public.is_manager()) with check(public.is_manager());
create policy "public read jobs" on public.jobs for select using(status='published');
create policy "staff manage jobs" on public.jobs for all using(public.is_manager()) with check(public.is_manager());
create policy "public read job translations" on public.job_translations for select using(exists(select 1 from public.jobs j where j.id=job_id and j.status='published'));
create policy "staff manage job translations" on public.job_translations for all using(public.is_manager()) with check(public.is_manager());
create policy "public read results" on public.results for select using(status='published');
create policy "staff manage results" on public.results for all using(public.is_manager()) with check(public.is_manager());
create policy "public read tools" on public.tools for select using(enabled=true);
create policy "staff manage tools" on public.tools for all using(public.is_manager()) with check(public.is_manager());

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.email)) on conflict(id) do nothing; insert into public.user_preferences(user_id) values(new.id) on conflict(user_id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

insert into public.categories(slug,name_bn,name_hi,name_en,sort_order) values ('news','সংবাদ','समाचार','News',1),('jobs','চাকরি','नौकरी','Jobs',2),('education','শিক্ষা','शिक्षा','Education',3),('results','রেজাল্ট','परिणाम','Results',4),('government','সরকারি আপডেট','सरकारी अपडेट','Government',5),('weather','আবহাওয়া','मौसम','Weather',6),('sports','খেলা','खेल','Sports',7),('business','ব্যবসা','व्यवसाय','Business',8),('technology','প্রযুক্তি','प्रौद्योगिकी','Technology',9),('entertainment','বিনোদন','मनोरंजन','Entertainment',10) on conflict(slug) do nothing;
insert into public.homepage_sections(section_key,enabled,sort_order,priority) values ('breaking',true,1,100),('hero',true,2,100),('latest',true,3,90),('trending',true,4,80),('jobs',true,5,70),('education',true,6,60),('results',true,7,50),('government',true,8,50),('weather',true,9,40),('sports',true,10,40),('business',true,11,40),('technology',true,12,40),('entertainment',true,13,40),('important-dates',true,14,30),('social',true,15,20) on conflict(section_key) do nothing;
insert into public.site_settings(key,value) values ('site','{"name":"Kicholche","domain":"kicholche.com","default_locale":"bn","supported_locales":["bn","hi","en"]}'::jsonb),('features','{"guest_favorites":true,"push_notifications":true,"theme_switcher":true,"social_reminder":true}'::jsonb) on conflict(key) do nothing;
insert into public.tools(slug,category,name_bn,name_hi,name_en,description,sort_order) values ('pdf-tools','pdf','PDF টুলস','PDF टूल्स','PDF Tools','PDF merge, split, compress and convert tools.',1),('image-tools','image','ইমেজ টুলস','इमेज टूल्स','Image Tools','Useful image resize, compress and convert tools.',2),('text-tools','text','টেক্সট টুলস','टेक्स्ट टूल्स','Text Tools','Everyday text utilities.',3),('translator','language','অনুবাদক','अनुवादक','Translator','Multilingual translation utility.',4),('resume-maker','career','রেজিউমে মেকার','रिज्यूमे मेकर','Resume Maker','Create a professional resume.',5),('calculators','calculator','ক্যালকুলেটর','कैलकुलेटर','Calculators','Everyday finance, student and unit calculators.',6) on conflict(slug) do nothing;
do $$ begin insert into storage.buckets(id,name,public) values('media','media',true) on conflict(id) do nothing; exception when undefined_table then null; end $$;
