# Implementation Plan: Hero Visual Enhancement

## Overview

This plan implements a purely visual/presentational enhancement of the homepage
hero (`components/sections/Hero.tsx`) plus additive utility classes in
`app/globals.css`. Two decorative layers are added *behind* the existing
content: an **Ornament_Layer** (large semi-transparent fleuron watermark + soft
paper-grain wash) and a thin gold **Line_Art** illustration (an open book with
fine light rays — no cross) anchored in the upper-right head region.

All work is additive: no Hero logic, data, props, state, or existing markup
ordering is changed. Each step builds on the previous one and ends with wiring
the decorative band behind the primary content and verifying it across themes
and viewports. Because the design contains no Correctness Properties section
(UI styling change), verification uses example-based component tests, visual
checks, and manual accessibility/performance checks rather than property-based
tests.

## Tasks

- [x] 1. Establish the decorative stacking context in the Hero
  - [x] 1.1 Add stacking layers to `components/sections/Hero.tsx`
    - In `components/sections/Hero.tsx`, add `relative z-10` to the existing
      inner content container(s) holding the masthead rule, kicker, date label,
      headline, intro, CTA grid, and frontispiece verse — without removing or
      reordering any existing markup.
    - Insert an empty decorative band as the first child of the existing
      `<section>`: `<div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />`
      (contents added in later tasks).
    - Confirm the `<section>` already carries `relative overflow-hidden` (the
      clipping/positioning context); do not add a new wrapper.
    - _Requirements: 1.3, 2.2, 3.1, 3.2, 6.4_

  - [ ]* 1.2 Write component test for stacking and pointer behavior
    - In the project's React test setup, assert the decorative band renders with
      `aria-hidden="true"`, `pointer-events-none`, and `z-0`, and that the
      content container carries `relative z-10`.
    - _Requirements: 1.3, 2.2, 2.6, 3.1, 3.2_

- [x] 2. Implement the inline open-book + light-rays Line_Art SVG
  - [x] 2.1 Add the `OpenBookLineArt` inline SVG to `components/sections/Hero.tsx`
    - Define a small local function `OpenBookLineArt` in
      `components/sections/Hero.tsx` returning an inline `<svg viewBox="0 0 120 90">`
      with two mirrored page curves, a short central spine, and 3-4 short rays
      rising from the gutter (NO cross motif).
    - All paths use `stroke="currentColor"`, `fill="none"`, `strokeWidth={1.25}`
      (≤1.5), `strokeLinecap="round"`, and `vectorEffect="non-scaling-stroke"`.
      Use zero hard-coded color literals (no `#`, `rgb(`, `hsl(`).
    - _Requirements: 1.1, 2.1, 4.3, 6.1, 6.2_

  - [x] 2.2 Render the Line_Art inside the decorative band
    - Inside the decorative band from task 1.1, render the Line_Art using the
      hero's existing `reveal` framer-motion variant (reuse its existing
      `duration`/`ease`, introduce no new easing) wrapped in a `motion.div` with
      class `hero-lineart hidden text-gold-500 dark:text-gold-300 md:block`, and
      place `<OpenBookLineArt />` inside it.
    - _Requirements: 1.1, 1.4, 5.1, 7.2_

  - [ ]* 2.3 Write component test for the Line_Art color/responsive contract
    - Assert the Line_Art parent carries `hidden` and `md:block` (mobile
      suppression) and the gold token classes `text-gold-500 dark:text-gold-300`,
      and that the serialized SVG markup contains no `#`, `rgb(`, or `hsl(`
      color literals.
    - _Requirements: 4.3, 5.1_

- [x] 3. Implement the Ornament_Layer (fleuron watermark + paper-grain wash)
  - [x] 3.1 Add the fleuron watermark and grain wash markup to `components/sections/Hero.tsx`
    - Inside the decorative band, add a `<span className="hero-fleuron-watermark fleuron" aria-hidden>` using
      the existing Unicode ornament glyph (`&#10070;`) already used in the hero,
      and a `<span className="hero-grain-wash absolute inset-0 bg-grain" aria-hidden />`
      that reuses the existing `bg-grain` texture.
    - Keep the ornament count within 1-3 elements and ensure they convey no
      textual/interactive information.
    - _Requirements: 2.1, 2.5, 6.1, 6.2_

  - [ ]* 3.2 Write component test for the Ornament_Layer
    - Assert the fleuron and grain-wash elements are present inside the
      `aria-hidden` / `pointer-events-none` band, reuse the `fleuron` and
      `bg-grain` classes, and add no remote image request markup.
    - _Requirements: 2.1, 2.2, 2.5, 6.2_

- [x] 4. Checkpoint - structure renders behind content
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add decorative utility classes and per-theme tuning in globals.css
  - [x] 5.1 Add base Line_Art and Ornament_Layer utilities to `app/globals.css`
    - Add additive `.hero-lineart` (absolute placement in the upper-right head
      region with `top`/`right`, desktop `width`, and Light_Mode `opacity: 0.12`),
      `.hero-fleuron-watermark` (absolute top-right bleed, large `font-size`,
      Light_Mode `opacity: 0.08`, `user-select: none`), and `.hero-grain-wash`
      (`opacity` + `mix-blend-mode: multiply`) rules.
    - Source all gold color from existing tokens (`var(--gold)` / `text-gold-*`
      via `currentColor`); introduce zero hard-coded color literals.
    - _Requirements: 1.1, 1.5, 2.3, 2.5, 4.3, 5.3, 6.3_

  - [x] 5.2 Add dark-mode overrides in `app/globals.css`
    - Add `html.dark .hero-lineart { opacity: 0.16 }`,
      `html.dark .hero-fleuron-watermark { opacity: 0.06 }`, and
      `html.dark .hero-grain-wash { opacity / mix-blend-mode: screen }` so every
      decorative element keeps opacity ≤0.20, fleuron ≤0.08 (dark), and uses only
      dark-theme tokens with no light-token bleed.
    - _Requirements: 1.5, 2.4, 4.1, 4.2, 4.5_

  - [ ]* 5.3 Write test asserting opacity and color-literal constraints
    - Add a test/lint assertion that the feature-authored CSS keeps line-art
      opacity within 0.05-0.20, fleuron within the spec'd ranges, and contains no
      `#`, `rgb(`, or `hsl(` literals.
    - _Requirements: 1.5, 2.3, 2.4, 4.3, 4.5_

- [x] 6. Implement responsive scaling and overflow safety
  - [x] 6.1 Add tablet scale override and overflow-clip safeguards in `app/globals.css`
    - Add `@media (min-width: 768px) and (max-width: 1023.98px)` override that
      reduces `.hero-lineart` `width`/`top` to an intermediate scale clear of the
      headline, leaving mobile suppressed (`hidden`) and desktop (≥1024px) at full
      scale in the upper-right quadrant.
    - Rely on the section's existing `overflow-hidden` to clip the watermark
      bleed so no horizontal scrollbar appears from 320-1920px.
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 6.2 Write viewport visual-regression checks
    - Capture hero snapshots at 320, 375, 768, 1024, 1440, and 1920px asserting
      mobile suppression, intermediate tablet scale, desktop quadrant placement,
      and absence of horizontal overflow.
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 7. Implement motion-preference compliance
  - [x] 7.1 Add reduced-motion handling in `app/globals.css`
    - Add `@media (prefers-reduced-motion: reduce) { .hero-lineart { transition: none; animation: none } }`
      so the Line_Art renders in its final resting state, complementing
      framer-motion's reduced-motion handling on the existing `reveal` variant.
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ]* 7.2 Write reduced-motion component test
    - With `prefers-reduced-motion` mocked as active, assert the Line_Art renders
      in its resting state with no animated transform/opacity changing over time.
    - _Requirements: 7.1, 7.3_

- [x] 8. Legibility, contrast, and payload safeguards
  - [x] 8.1 Verify and adjust legibility/clipping in `components/sections/Hero.tsx` and `app/globals.css`
    - Confirm no decorative stroke is painted within the bounding box of any
      headline glyph or CTA link; adjust `.hero-lineart` `top`/`right` offsets so
      the art sits beside (not over) the date label and clear of the headline.
    - Confirm `Primary_Content` text stays at opacity 1.0 above all decoration.
    - _Requirements: 1.2, 1.6, 3.2, 3.3_

  - [ ]* 8.2 Write payload guard test
    - Add a test measuring the combined uncompressed serialized size of the
      decorative markup plus its associated CSS and assert it is ≤15 KB.
    - _Requirements: 6.3_

- [x] 9. Final verification - manual visual & accessibility checks
  - [x] 9.1 Document and perform manual verification of the rendered hero
    - Verify in both Light_Mode and Dark_Mode that decorative colors and
      opacities are correct and no stroke overlaps headline/CTA glyphs.
    - Verify WCAG 2.1 SC 1.4.3 contrast ≥4.5:1 for headline and CTA against the
      composited decorative background in both themes, including a sampled
      mid-animation frame.
    - Verify no horizontal scrollbar from 320-1920px, no remote raster image
      request in the network panel, CLS contribution ≤0.01, decoration does not
      block first text paint, tab order skips the decorative band, and a theme
      toggle recolors decoration within 400ms with no stale tokens.
    - _Requirements: 3.4, 3.5, 4.4, 5.4, 6.2, 6.4, 6.5, 2.6_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional (tests/visual-regression) and can be skipped
  for a faster MVP; core implementation tasks are never optional.
- Every task is additive and presentational only — no Hero logic, data, props, or
  existing markup ordering is changed.
- Each task references specific requirement criteria for traceability.
- No property-based test tasks are included because the design has no Correctness
  Properties section (UI styling/layout change); verification is example-based,
  visual-regression, and manual instead.
- All decorative color derives from existing ink/gold tokens; no new color
  literals are introduced.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "3.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.2"] },
    { "id": 3, "tasks": ["5.1"] },
    { "id": 4, "tasks": ["5.2", "5.3"] },
    { "id": 5, "tasks": ["6.1", "7.1"] },
    { "id": 6, "tasks": ["6.2", "7.2", "8.1"] },
    { "id": 7, "tasks": ["8.2", "9.1"] }
  ]
}
```
