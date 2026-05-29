CREATE TABLE IF NOT EXISTS public.page_views (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path       text NOT NULL,
  visitor_id text NOT NULL,
  viewed_at  timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS page_views_viewed_at_idx ON public.page_views (viewed_at DESC);
CREATE INDEX IF NOT EXISTS page_views_path_idx     ON public.page_views (path, viewed_at DESC);
CREATE INDEX IF NOT EXISTS page_views_visitor_idx  ON public.page_views (visitor_id, viewed_at DESC);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin reads page_views" ON public.page_views;
CREATE POLICY "Admin reads page_views" ON public.page_views
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
