alter table public.media
  add column if not exists purpose text,
  add column if not exists original_size bigint,
  add column if not exists optimized_size bigint,
  add column if not exists original_mime_type text,
  add column if not exists optimization_ratio numeric(6,2);
