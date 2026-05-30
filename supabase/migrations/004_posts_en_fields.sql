-- ======================================================================
-- SinnerSaved · Add English translation columns to posts
-- ======================================================================
-- These columns store cached auto-translations so the public page can
-- serve EN content without calling the translate API on every request.
-- All nullable — null means "not yet translated".
-- Idempotent: safe to re-run.
-- ======================================================================

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS title_en        text,
  ADD COLUMN IF NOT EXISTS excerpt_en      text,
  ADD COLUMN IF NOT EXISTS content_html_en text;
