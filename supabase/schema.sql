-- ======================================================================
-- SinnerSaved · Phase 3 schema
-- ======================================================================
-- Paste this whole file into Supabase Dashboard → SQL Editor → Run.
-- Idempotent: safe to re-run (uses IF NOT EXISTS / DROP IF EXISTS).
-- ======================================================================

-- 1) Extensions ---------------------------------------------------------
create extension if not exists "pgcrypto";

-- 2) Profiles table -----------------------------------------------------
-- Mirrors auth.users with an app-level role. Admin-only routes check role.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth.user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) Posts table --------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  -- Tiptap stores content as JSON for editing; we also persist rendered
  -- HTML so reading routes don't need to run the editor on the server.
  content_json jsonb not null default '{}'::jsonb,
  content_html text not null default '',
  cover text,
  main_category text not null check (
    main_category in (
      'ruang-alkitab', 'ruang-teologi', 'ruang-lensa', 'sinners-note'
    )
  ),
  sub_category text not null,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  title_en        text,
  excerpt_en      text,
  content_html_en text,
  reading_minutes int,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

-- For databases created before EN columns were added.
alter table public.posts
  add column if not exists title_en        text,
  add column if not exists excerpt_en      text,
  add column if not exists content_html_en text;

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc nulls last);
create index if not exists posts_main_category_idx
  on public.posts (main_category);
create index if not exists posts_sub_category_idx
  on public.posts (sub_category);
create index if not exists posts_slug_idx on public.posts (slug);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  -- Auto-stamp published_at when transitioning to published
  if new.status = 'published' and (old.status is distinct from 'published') then
    new.published_at = coalesce(new.published_at, now());
  end if;
  return new;
end; $$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- 4) RLS ----------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles policies
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- posts policies
drop policy if exists "posts_public_read_published" on public.posts;
create policy "posts_public_read_published" on public.posts
  for select using (status = 'published');

drop policy if exists "posts_admin_read_all" on public.posts;
create policy "posts_admin_read_all" on public.posts
  for select using (public.is_admin());

drop policy if exists "posts_admin_write" on public.posts;
create policy "posts_admin_write" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- 5) Storage bucket for post cover images ------------------------------
-- Bucket: post-covers (public read, admin write)
insert into storage.buckets (id, name, public)
values ('post-covers', 'post-covers', true)
on conflict (id) do update set public = excluded.public;

-- Storage policies on storage.objects (the "post-covers" bucket only)
drop policy if exists "post_covers_public_read" on storage.objects;
create policy "post_covers_public_read" on storage.objects
  for select using (bucket_id = 'post-covers');

drop policy if exists "post_covers_admin_write" on storage.objects;
create policy "post_covers_admin_write" on storage.objects
  for insert with check (bucket_id = 'post-covers' and public.is_admin());

drop policy if exists "post_covers_admin_update" on storage.objects;
create policy "post_covers_admin_update" on storage.objects
  for update using (bucket_id = 'post-covers' and public.is_admin())
  with check (bucket_id = 'post-covers' and public.is_admin());

drop policy if exists "post_covers_admin_delete" on storage.objects;
create policy "post_covers_admin_delete" on storage.objects
  for delete using (bucket_id = 'post-covers' and public.is_admin());

-- 6) Page views table (analytics) --------------------------------------
-- referrer_host/device/browser/os/country are optional enrichment columns
-- populated by /api/track from the request's referrer, user-agent and geo
-- headers. Older rows (or visits we couldn't classify) leave them null.
create table if not exists public.page_views (
  id            uuid default gen_random_uuid() primary key,
  path          text not null,
  visitor_id    text not null,
  referrer_host text,
  device        text,
  browser       text,
  os            text,
  country       text,
  viewed_at     timestamptz default now() not null
);

-- For existing databases created before the enrichment columns existed.
alter table public.page_views
  add column if not exists referrer_host text,
  add column if not exists device        text,
  add column if not exists browser       text,
  add column if not exists os            text,
  add column if not exists country       text;

create index if not exists page_views_viewed_at_idx on public.page_views (viewed_at desc);
create index if not exists page_views_path_idx     on public.page_views (path, viewed_at desc);
create index if not exists page_views_visitor_idx  on public.page_views (visitor_id, viewed_at desc);
create index if not exists page_views_referrer_idx on public.page_views (referrer_host);
create index if not exists page_views_device_idx   on public.page_views (device);
create index if not exists page_views_country_idx  on public.page_views (country);

alter table public.page_views enable row level security;

drop policy if exists "Admin reads page_views" on public.page_views;
create policy "Admin reads page_views" on public.page_views
  for select to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ======================================================================
-- Done. Next: run `npm run seed` to populate sample posts and create
-- the admin user (default: admin@sinnersaved.com / sinnersaved123).
-- ======================================================================
