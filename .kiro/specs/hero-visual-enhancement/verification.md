# Task 9.1 — Manual Verification Report (static inspection)

> Environment note: this spec workspace cannot launch a browser, so every check
> below was confirmed by **static inspection** of the final
> `components/sections/Hero.tsx`, the hero decorative block at the end of
> `app/globals.css`, and the token definitions in `tailwind.config.ts` /
> `:root` / `html.dark`. Items that can only be *measured* in a live browser are
> flagged as residual risks with the reasoning that makes them low-risk.

## Token baseline (for contrast reasoning)

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#f4ecdb` (warm ivory) | `#120c06` (near-black) |
| `--foreground` | `#15100a` | `#efe6d3` |
| `--gold` | `#b8924a` | `#cdab68` |
| headline `text-ink-900 / dark:text-ink-50` | `#15100a` | `#f6f1e6` |

Headline/CTA text renders in the `relative z-10` band at **opacity 1.0**; all
decoration lives in the `absolute inset-0 z-0` band beneath it.

## Check-by-check results

| # | Check | Requirement | Status | Evidence / reasoning |
| --- | --- | --- | --- | --- |
| 1 | Decorative opacities correct (line-art 0.12 light / 0.16 dark; fleuron 0.08 / 0.06; grain multiply 0.5 / screen 0.18) | 4.5, 2.3, 2.4 | **PASS** | Exact values present in `.hero-lineart`, `.hero-fleuron-watermark`, `.hero-grain-wash` and their `html.dark` overrides. |
| 2 | Colors only from gold tokens / `currentColor`, no hard-coded literals | 4.3, 2.5 | **PASS** | Line-art SVG uses `stroke="currentColor"`; parent carries `text-gold-500 dark:text-gold-300`. Fleuron uses `color: var(--gold)`. Grain uses the monochrome `bg-grain` data-URI (alpha-only `feColorMatrix`). The hero decorative CSS block contains zero `#`/`rgb(`/`hsl(` literals. |
| 3 | No stroke overlaps headline/CTA glyphs | 3.3, 1.2, 1.6 | **PASS (browser-confirm advised)** | Line-art is `top:4rem; right:1.25rem; width:9rem` in the right whitespace; headline is left-aligned `max-w-5xl`, CTA is in its own grid cell. Section `overflow-hidden` clips bleed. Pixel-exact non-overlap with the right-aligned date label is the one item worth a visual glance (see residual risks). |
| 4 | WCAG 2.1 SC 1.4.3 contrast ≥4.5:1, headline + CTA, both themes | 3.4 | **PASS** | Light: `#15100a` ink on `#f4ecdb` paper ≈ 15:1. Dark: `#f6f1e6` on `#120c06` ≈ 16:1. The only thing composited behind the text is the faint grain wash (subtle monochrome noise); it cannot pull a ~15:1 pair below 4.5:1. The line-art/fleuron do not sit behind the headline/CTA. |
| 5 | Contrast holds at a sampled mid-animation frame | 3.5 | **PASS** | The `reveal` variant animates only the *decorative* `motion.div`'s `opacity` (0→1) and `y` (14→0). It never touches the z-10 text layer, which stays at opacity 1.0 throughout. A mid-frame only makes the faint line-art *fainter*, never reducing text contrast. |
| 6 | No horizontal scrollbar 320–1920px | 5.4 | **PASS** | Line-art is `hidden md:block` (suppressed <768px). The fleuron deliberately bleeds (`right:-1rem`, `16rem` glyph) but the section is `relative overflow-hidden`, clipping all bleed. Grain is `inset-0`. Nothing contributes flow width. |
| 7 | No remote raster image request | 6.2 | **PASS** | Decoration is inline `<svg>` plus the `bg-grain` `data:image/svg+xml` URI. No `<img>` and no `url()` to a remote asset. |
| 8 | CLS contribution ≤0.01 | 6.4 | **PASS** | The whole decorative band is `absolute inset-0` (out of flow); line-art/fleuron/grain are all absolutely positioned and contribute no layout box, so they cannot shift content. |
| 9 | Decoration does not block first text paint | 6.5 | **PASS** | Everything is inline (SVG markup + inline data-URI CSS); there is no external/blocking asset between the parser and the text. |
| 10 | Tab order skips the decorative band | 2.6, 3.1 | **PASS** | Band is `aria-hidden="true"` + `pointer-events-none`; the SVG is `focusable="false"`; the only interactive elements (`<a>` CTAs) live in the z-10 content band. No focusable nodes in the decoration. |
| 11 | Theme toggle recolors decoration within 400ms, no stale tokens | 4.4 | **PASS** | All decoration colors resolve from `var(--gold)` / `currentColor` (Tailwind `dark:` variant) and the `html.dark` opacity/blend overrides. These recompute on the class swap in the same style recalculation (effectively instant, well under 400ms). No per-element color transition is defined that could leave a stale token; the 350ms `body` transition affects only the page background, not the decorative tokens. |

## Residual risks (only confirmable in a real browser)

1. **Date-label proximity (Req 1.2).** Static geometry indicates the line-art's
   ray tips begin around `top:4rem` while the right-aligned date label sits in
   the `sm:pt-20` (~5rem) masthead row, and the line-art sits further toward the
   section's right edge than the centered, padded content column — so they
   should not share pixels. A quick desktop glance at ~1024–1280px (where the
   content column is closest to full width) is the cheapest way to confirm zero
   bounding-box overlap.
2. **Payload (Req 6.3) and exact CLS/paint numbers (6.4/6.5)** are architecturally
   safe (tiny inline SVG, out-of-flow positioning) but their precise measured
   values would come from a Lighthouse/Performance trace.
3. **`prefers-reduced-motion` resting state (Req 7.x)** is enforced by both the
   CSS media query (`transition:none; animation:none`) and framer-motion; a live
   toggle check is the final confirmation.

## Conclusion

All checks in scope for task 9.1 (Reqs 3.4, 3.5, 4.4, 5.4, 6.2, 6.4, 6.5, 2.6)
**PASS** under static inspection. The implementation matches the design's
requirements-traceability table with no discrepancies. No code defects were
found, so no changes were made. The only suggested follow-up is a brief visual
glance in a real browser to confirm the date-label non-overlap (Req 1.2) and to
capture exact performance numbers.
