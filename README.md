# SinnerSaved

A modern, animation-heavy theological journal & biblical literacy platform — with a custom CMS.

> Independent. Editorial. Spring-physics first.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom editorial palette (`ink` / `parchment` / `sacred`) and `@tailwindcss/typography`
- **Framer Motion** for spring physics, scroll reveals, page transitions, 3D flip cards, animated filters
- **Supabase** — Postgres + Auth + Storage (`@supabase/ssr` for cookie-aware sessions)
- **Tiptap** — headless WYSIWYG editor (markdown shortcuts, code blocks, blockquotes, lists, links, image upload)
- **Playfair Display** + **Inter** fonts via `<link>`

## Roadmap

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Boilerplate · Homepage (Hero, bento grid, 4 category sections, 3D flip cards, masonry, footer) | ✅ |
| 2 | Category/archive pages with filtering animations · Single post reading layout (progress bar + sticky TOC) | ✅ |
| 3 | Supabase schema · Admin auth · CMS dashboard · WYSIWYG editor · CRUD · Image upload | ✅ |
| 4 | Dark mode · ID/EN i18n · `/kontak` page + Contact section + email integration | ✅ |

## Getting started — Phase 3 setup

> If you're just running the frontend locally without a database, the site falls back to mock data and stays demo-able. Only follow these steps when you want the real CMS.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` → `.env.local` and fill in your Supabase project credentials (already filled for the project owner):

```env
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

### 3. Apply the database schema

Open the Supabase Dashboard → **SQL Editor** → New query, paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql), and click **Run**. The script is idempotent (safe to re-run) and creates:

- `public.profiles` — extends `auth.users` with a `role` column (`admin` / `user`)
- `public.posts` — main content table (Tiptap JSON + rendered HTML)
- Auto-trigger that creates a `profiles` row whenever a new auth user signs up
- Updated-at + `published_at` auto-stamping triggers
- RLS policies — public reads only see `status = 'published'`; admins see/write everything
- Storage bucket `post-covers` with admin-only writes + public reads

### 4. Seed sample data + create admin user

```bash
npm run seed
```

This will:
- Create the admin user — **email: `andreassina6a@gmail.com`** / **password: `admin11!`** (override via `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME` env vars)
- Promote that user's profile to `role='admin'`
- Insert all 9 sample posts as Tiptap JSON + pre-rendered HTML

### 5. Run the dev server

```bash
npm run dev
```

- Public site: <http://localhost:3000>
- Admin login: <http://localhost:3000/admin/login>

## Admin Panel

| Route | What it does |
| --- | --- |
| `/admin/login` | Email + password login. Non-admin accounts are rejected. |
| `/admin` | Dashboard — list of all posts, status filter, "Tulisan baru" CTA |
| `/admin/posts/new` | Create form (Tiptap editor + sidebar: status, cover, slug, category, tags) |
| `/admin/posts/[id]/edit` | Edit form (same layout) — also has Delete and Preview buttons |

The middleware (`middleware.ts`) gates `/admin/*` to authenticated admins; non-admins are bounced to `/admin/login`.

## Public extras (Phase 4)

- **`/kontak`** — dedicated contact page with a copyable email address (`andreassina6a@gmail.com`) and three pre-filled mailto cards: Pertanyaan / Kritik / Saran. Reachable from Navbar and Footer.
- **Dark mode** — class-based (`html.dark`), no-flash bootstrap script, `<ThemeToggle>` in the Navbar. Respects `prefers-color-scheme` on first visit, then persists in `localStorage`.
- **i18n (ID / EN)** — UI chrome translates between Indonesian and English via a small dictionary (`lib/i18n/dictionary.ts`). The `<LocaleToggle>` lives next to the theme toggle. The chosen locale is stored in a cookie so server-rendered surfaces (post date, category labels) match instantly. Editorial body copy stays in its original language.

### Editor features

- Headings (H2 / H3), paragraphs, **bold**, *italic*, `inline code`
- Bullet & numbered lists
- Blockquotes
- Code blocks (use these for biblical-language samples — Greek/Hebrew display in monospace)
- Horizontal rules
- Links (auto-linkify on paste)
- Image upload — files go to the public `post-covers` Supabase Storage bucket
- Markdown shortcuts (e.g. `# `, `## `, `> `, `- `, `1. `, ` ``code`` `, `**bold**`, `*italic*`, `---`)
- Undo / redo

The editor stores Tiptap JSON in `posts.content_json` and pre-renders to HTML in `posts.content_html` on every save (see `lib/editor/render-html.ts`). Reading routes serve the pre-rendered HTML — zero conversion at request time.

## Project structure

```
app/
  layout.tsx                         Root: <html> + body + Google fonts
  globals.css                        Editorial base + .post-prose styles
  (public)/                          Route group with the public chrome
    layout.tsx                       Navbar + Footer + PageTransition
    page.tsx                         Homepage
    [main]/[slug]/page.tsx           Single post (reading layout)
    kategori/[main]/page.tsx         Category archive
  admin/
    layout.tsx                       Sidebar shell (visible to admins only)
    login/page.tsx                   Login
    page.tsx                         Dashboard
    posts/new/page.tsx               Create
    posts/[id]/edit/page.tsx         Edit
components/
  layout/                            Navbar, Footer
  motion/                            Reveal, FlipCard, MotionCard, PageTransition
  sections/                          Hero, FeaturedBento, Ruang* sections, SinnersNote
  post/                              PostCard, PostBody, PostContent, ReadingProgress, TOC,
                                     CategoryArchive, CategoryFilter, RelatedPosts
  admin/                             LoginForm, PostForm, Editor (Tiptap)
lib/
  actions/                           "use server" — auth + posts CRUD
  editor/                            Tiptap extensions + server-side render-to-HTML
  supabase/                          server.ts (cookies), admin.ts (service-role), middleware.ts
  posts.ts                           Data-access layer (with mock fallback)
  categories.ts                      Category taxonomy
  mock-data.ts                       Phase 1/2 fallback content
  toc.ts                             Heading-extract + slugify
  types.ts                           Shared types
  utils.ts                           cn(), formatDate(), readingTime()
middleware.ts                        Gates /admin/* to admins
supabase/schema.sql                  One-shot DDL + RLS + storage bucket
scripts/seed.mjs                     Admin user + sample posts seeder
```

## Animation primitives

- `<Reveal>` — single-element spring fade-in-up on scroll
- `<StaggerContainer>` + `<FadeInUp>` — cascading reveals (~0.1s)
- `<FlipCard>` — 3D rotateY hover/click flip (Biblical Facts)
- `<MotionCard>` — spring hover lift + shadow grow
- `<PageTransition>` — `AnimatePresence` route wrapper
- `<ReadingProgress>` — top progress bar, spring-smoothed
- `<TableOfContents>` — IntersectionObserver-driven, animated `layoutId` marker
- `<CategoryFilter>` — `layoutId` background slide between active pills

All easings are spring-based (stiffness 140–260 / damping 18–28).
