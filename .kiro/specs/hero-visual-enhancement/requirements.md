# Requirements Document

## Introduction

This feature is a purely visual/presentational enhancement of the homepage hero
(`components/sections/Hero.tsx`) for the editorial blog "SinnerSaved". It does
**not** introduce new functional behavior, data, navigation, or interaction
beyond the existing decorative motion already present in the hero.

The current hero head feels empty: the upper-right region near the date label
has no visual counterweight, and the page background reads as flat. This
enhancement adds two restrained decorative layers that preserve the existing
"printed page" / typography-first aesthetic:

1. **Subtle ornament/texture** — thin gold hairline motifs, a large
   semi-transparent fleuron watermark, and/or a soft paper-grain texture that
   reinforce the printed-page feel.
2. **Thin gold line-art illustration** — a minimalist line-art motif drawn in
   the gold-leaf palette, placed to fill the empty upper-right head region as a
   visual counterweight, without disturbing the calm, minimal aesthetic.

All additions must respect the existing editorial design language, work in both
light and dark mode using existing ink/gold tokens, never reduce the legibility
of the headline or call-to-action, remain responsive from mobile to desktop,
favor SVG/CSS over heavy raster imagery for performance, and honor
`prefers-reduced-motion` when any motion is involved.

## Glossary

- **Hero**: The homepage hero section rendered by `components/sections/Hero.tsx`,
  containing the masthead rule, kicker labels, date label, headline, intro
  paragraph, call-to-action links, and frontispiece verse.
- **Head_Region**: The upper area of the Hero spanning the masthead rule and the
  headline, including the empty upper-right space adjacent to the date label.
- **Ornament_Layer**: A decorative visual layer composed of one or more of: thin
  gold hairline motifs, a large semi-transparent fleuron watermark, and a soft
  paper-grain texture.
- **Line_Art**: A thin-stroke, minimalist SVG illustration rendered in the
  gold-leaf palette, used as the visual counterweight in the Head_Region.
- **Decorative_Element**: Any element introduced by this feature, i.e. an
  Ornament_Layer or Line_Art element.
- **Ink_Token**: The existing CSS color variables for foreground/text tones
  (`--foreground`, `--muted`) and Tailwind `ink-*` classes used in the Hero.
- **Gold_Token**: The existing CSS color variables and classes for the gold-leaf
  palette (`--gold`, `--accent`, `bg-gold-leaf`, `.rule-gold`, `.fleuron`,
  Tailwind `gold-*` classes).
- **Dark_Mode**: The theme active when the `dark` class is present on the
  `html` element.
- **Light_Mode**: The theme active when the `dark` class is absent from the
  `html` element.
- **Reduced_Motion**: The user preference expressed by the CSS media query
  `prefers-reduced-motion: reduce`.
- **Primary_Content**: The Hero headline text and the call-to-action links
  (`t.hero.cta` and `t.hero.explore`) plus the intro paragraph.
- **Mobile_Viewport**: A viewport width below 768px.
- **Tablet_Viewport**: A viewport width from 768px to 1023px inclusive.
- **Desktop_Viewport**: A viewport width of 1024px or greater (at or above the
  Tailwind `lg` breakpoint).

## Requirements

### Requirement 1: Visual counterweight in the head region

**User Story:** As a reader landing on the homepage, I want the empty upper-right
area of the hero head to carry a visual counterweight, so that the head feels
composed and balanced rather than empty.

#### Acceptance Criteria

1. THE Hero SHALL render a Line_Art element within the upper-right quadrant of
   the Head_Region, defined as the area spanning the top 50% of the Head_Region
   height and the right 50% of its width.
2. WHERE the viewport is a Desktop_Viewport, THE Hero SHALL position the
   Line_Art adjacent to the date label such that the Line_Art bounding box has
   zero pixel overlap with the rendered bounding box of the date label text.
3. THE Hero SHALL render the Line_Art behind the Primary_Content in stacking
   order so that the Primary_Content remains the foremost layer and is never
   visually obscured by the Line_Art.
4. THE Hero SHALL render the Line_Art using the defined ink/gold color tokens so
   that it remains visible against the background in both Light_Mode and
   Dark_Mode.
5. THE Hero SHALL render the Line_Art at an opacity between 5% and 20% inclusive
   so that the Primary_Content remains the dominant visual element of the
   Head_Region.
6. WHERE the viewport is narrower than a Desktop_Viewport, THE Hero SHALL render
   the Line_Art without any pixel overlap of the Primary_Content text.

### Requirement 2: Subtle ornament and texture

**User Story:** As a reader, I want the hero background to carry subtle ornament
and texture, so that the section reads as a printed page rather than a flat
gradient.

#### Acceptance Criteria

1. THE Hero SHALL render an Ornament_Layer containing at least one and at most
   three decorative elements drawn from the following set: a gold hairline motif
   with stroke width at most 1.5 px, a fleuron watermark, or a paper-grain
   texture; and none of these elements shall convey textual or interactive
   information.
2. THE Ornament_Layer SHALL be positioned behind the Primary_Content in stacking
   order such that the Primary_Content remains fully visible and is never
   occluded by the Ornament_Layer.
3. WHERE a fleuron watermark is rendered in Light_Mode, THE Hero SHALL set its
   opacity to a value within the range 0.00 to 0.12 inclusive.
4. WHERE a fleuron watermark is rendered in Dark_Mode, THE Hero SHALL set its
   opacity to a value within the range 0.00 to 0.08 inclusive.
5. THE Ornament_Layer SHALL apply only the existing Gold_Token color values for
   all gold-colored elements and SHALL NOT introduce any new color values.
6. THE Ornament_Layer SHALL be non-interactive such that it does not receive
   pointer or focus events and does not alter the focus order of the
   Primary_Content.

### Requirement 3: Legibility preservation

**User Story:** As a reader, I want the headline and call-to-action to stay fully
readable, so that the decorative additions never compromise comprehension.

#### Acceptance Criteria

1. THE Decorative_Element SHALL set `pointer-events` to `none` so that all
   pointer, touch, and click events pass through to the Primary_Content rendered
   beneath it.
2. THE Hero SHALL render the Primary_Content text at an opacity value of 1.0
   (100%) and positioned above every Decorative_Element in the visual stacking
   order.
3. IF a Decorative_Element would overlap the headline text or a call-to-action
   link, THEN THE Hero SHALL render that Decorative_Element with the overlapping
   portion clipped or offset such that no Decorative_Element stroke is painted
   within the bounding box of any Primary_Content glyph.
4. THE Hero SHALL maintain a contrast ratio of at least 4.5:1 between the
   Primary_Content text and the composited background directly behind that text,
   measured per WCAG 2.1 Success Criterion 1.4.3, in both Light_Mode and
   Dark_Mode.
5. WHILE a Decorative_Element is animating, THE Hero SHALL keep the contrast
   ratio between the Primary_Content text and its composited background at or
   above 4.5:1 for every frame of the animation.

### Requirement 4: Light and dark mode support

**User Story:** As a reader using either theme, I want the decorative additions
to look correct in both light and dark mode, so that the hero is consistent
across themes.

#### Acceptance Criteria

1. WHILE Dark_Mode is active, THE Hero SHALL render every Decorative_Element
   using only the Dark_Mode Gold_Token and Ink_Token values, with no Light_Mode
   token bleed.
2. WHILE Light_Mode is active, THE Hero SHALL render every Decorative_Element
   using only the Light_Mode Gold_Token and Ink_Token values, with no Dark_Mode
   token bleed.
3. THE Decorative_Element SHALL derive all colors from existing CSS color
   variables or Tailwind token classes and SHALL contain zero hard-coded hex,
   rgb, or hsl color literals.
4. WHEN the active theme changes between Light_Mode and Dark_Mode, THE Hero SHALL
   update every Decorative_Element's colors to the new theme's tokens within
   400ms, leaving no stale colors.
5. THE Decorative_Element SHALL render at an opacity no greater than 0.20 so it
   does not obscure the Primary_Content in either theme.

### Requirement 5: Responsive behavior

**User Story:** As a reader on any device, I want the decorative additions to
adapt to my screen size, so that the hero stays balanced and uncluttered from
mobile to desktop.

#### Acceptance Criteria

1. WHERE the viewport width is less than 768px (Mobile_Viewport), THE Hero SHALL
   render the Line_Art such that its rendered bounding box has zero pixel overlap
   with the bounding box of the headline text, either by setting the Line_Art to
   not be displayed or by scaling it down.
2. WHERE the viewport width is from 768px to 1023px inclusive (Tablet_Viewport),
   THE Hero SHALL render the Line_Art at a scale between its Mobile_Viewport size
   and its Desktop_Viewport size with zero pixel overlap with the headline text
   bounding box.
3. WHERE the viewport width is 1024px or greater (Desktop_Viewport), THE Hero
   SHALL display the Line_Art at its full defined scale, positioned within the
   upper-right quadrant of the Hero container (the region above the vertical
   midpoint and right of the horizontal midpoint).
4. THE Decorative_Element SHALL NOT cause the document body to render a
   horizontal scrollbar or content wider than the viewport width at any viewport
   width from 320px to 1920px inclusive.

### Requirement 6: Performance-conscious rendering

**User Story:** As a reader on a constrained connection, I want the decorative
additions to be lightweight, so that hero rendering performance is not degraded.

#### Acceptance Criteria

1. THE Decorative_Element SHALL be implemented using inline SVG or CSS rather
   than raster photographic image files.
2. WHEN the Hero renders, THE Hero SHALL display the Decorative_Element without
   issuing any additional network request for an external raster image asset.
3. THE combined uncompressed payload (markup plus styles) contributed by all
   Decorative_Elements in the Hero SHALL NOT exceed 15 KB.
4. WHEN the Hero renders the Decorative_Element, THE Hero SHALL NOT contribute
   more than 0.01 to the page Cumulative Layout Shift score attributable to the
   Decorative_Element.
5. THE Decorative_Element SHALL be rendered without blocking the initial paint
   of the Hero's primary textual content.

### Requirement 7: Motion preference compliance

**User Story:** As a reader who prefers reduced motion, I want any animation on
the decorative additions to be suppressed, so that the hero respects my
accessibility preference.

#### Acceptance Criteria

1. WHERE a Decorative_Element is animated, WHILE Reduced_Motion is active, THE
   Hero SHALL render that Decorative_Element in its final resting state with no
   animated property (transform, position, scale, rotation, or opacity) changing
   over time.
2. WHERE a Decorative_Element is animated, WHILE Reduced_Motion is not active,
   THE Hero SHALL apply the animation reusing the animation duration and easing
   functions already defined for the Hero's existing decorative motion, without
   introducing any new easing function.
3. WHEN Reduced_Motion becomes active while a Decorative_Element animation is in
   progress, THE Hero SHALL stop that animation and render the Decorative_Element
   in its final resting state.
