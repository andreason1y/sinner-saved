# SinnerSaved

A modern, animation-heavy theological journal & biblical literacy platform.

> Independent. Editorial. Spring-physics first.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom editorial palette (ink / parchment / sacred)
- **Framer Motion** for spring-based physics, scroll reveals, page transitions, and 3D flip cards
- **Supabase** (`@supabase/ssr`) — wired in `lib/supabase/client.ts`, fully activated in Phase 3
- **Playfair Display** (serif) + **Inter** (sans) via `next/font/google`

## Roadmap

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Boilerplate · Homepage (Hero, bento grid, 4 category sections, 3D flip cards, masonry, footer) | ✅ |
| 2 | Category/archive pages with filtering animations · Single post reading layout (progress bar + sticky TOC) | ⏳ |
| 3 | Supabase schema · Admin auth · CMS dashboard · WYSIWYG editor · CRUD | ⏳ |

## Content taxonomy

Four main categories, each with its own visual treatment:

- **Ruang Alkitab** — Biblical Facts (3D flip cards), Sejarah & Budaya, Makna Kata Asli, Di Balik Ayat, Ayat-ayat Sulit
- **Ruang Teologi** — Teologi, Bedah Doktrin, Apologetics, Kritik
- **Ruang Lensa** — Lensa Injil & Budaya, Biografi Singkat
- **Sinner's Note** — Refleksi, Catatan (masonry layout)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys (Phase 3)
npm run dev
```

Visit http://localhost:3000.

## Project structure

```
app/                      Next.js App Router
  layout.tsx              Root layout — fonts, Navbar, Footer, page transition
  page.tsx                Homepage (composes all section components)
  globals.css             Editorial base styles + 3D primitives + masonry
  kategori/[main]/        Category placeholder route (full version in Phase 2)
components/
  layout/                 Navbar, Footer
  motion/                 Reveal, FlipCard, MotionCard, PageTransition
  sections/               Hero, FeaturedBento, RuangAlkitab, RuangTeologi,
                          RuangLensa, SinnersNote, SectionHeader
lib/
  categories.ts           Category taxonomy
  mock-data.ts            Phase 1 mock posts + biblical facts (replaced in Phase 3)
  supabase/client.ts      Browser Supabase client (forward-compat)
  types.ts                Post / Category / BiblicalFact types
  utils.ts                cn(), formatDate(), readingTime()
```

## Animation primitives

- `<Reveal>` — single-element spring fade-in-up on scroll
- `<StaggerContainer>` + `<FadeInUp>` — cascading reveals with ~0.1s stagger
- `<FlipCard>` — 3D rotateY hover/click flip used by Biblical Facts
- `<MotionCard>` — spring-physics hover lift + shadow grow
- `<PageTransition>` — `AnimatePresence` wrapper for smooth route changes

All easings are spring-based (stiffness 140–260 / damping 18–28) for a premium, never-rigid feel.
