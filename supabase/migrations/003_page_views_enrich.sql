-- ======================================================================
-- SinnerSaved · Enrich page_views with traffic source / device / geo
-- ======================================================================
-- Adds optional columns so the analytics dashboard can break down visits
-- by referrer, device, browser, OS and country. All columns are nullable
-- and additive — safe to run on a populated table; existing rows stay as-is.
-- Idempotent: uses ADD COLUMN IF NOT EXISTS / CREATE INDEX IF NOT EXISTS.
-- ======================================================================

ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS referrer_host text,
  ADD COLUMN IF NOT EXISTS device        text,
  ADD COLUMN IF NOT EXISTS browser       text,
  ADD COLUMN IF NOT EXISTS os            text,
  ADD COLUMN IF NOT EXISTS country       text;

CREATE INDEX IF NOT EXISTS page_views_referrer_idx ON public.page_views (referrer_host);
CREATE INDEX IF NOT EXISTS page_views_device_idx   ON public.page_views (device);
CREATE INDEX IF NOT EXISTS page_views_country_idx  ON public.page_views (country);
