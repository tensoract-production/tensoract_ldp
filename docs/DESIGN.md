---
name: Tensoract
description: A seven-person company's printed record — giấy dó paper, woodblock ink, and a cinnabar seal used only where an outsider attested.
colors:
  paper: "oklch(95.2% 0.012 84deg)"
  paper-sunk: "oklch(92.4% 0.016 82deg)"
  paper-edge: "oklch(89% 0.018 80deg)"
  ink: "oklch(23% 0.014 60deg)"
  ink-soft: "oklch(50% 0.016 62deg)"
  rule: "oklch(84.5% 0.018 80deg)"
  son: "oklch(52% 0.155 34deg)"
  son-deep: "oklch(43% 0.14 33deg)"
  son-wash: "oklch(93% 0.03 40deg)"
typography:
  display:
    fontFamily: "Petrona, Georgia, serif"
    fontSize: "clamp(2.5rem, 6.6vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  headline:
    fontFamily: "Petrona, Georgia, serif"
    fontSize: "clamp(2rem, 4.6vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Petrona, Georgia, serif"
    fontSize: "clamp(1.6rem, 3vw, 2.15rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  record:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.06em"
    fontFeature: "tnum"
  seal:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  press: "0.125rem"
  seal: "2px"
spacing:
  row: "2.5rem"
  section-edge: "1.75rem"
  section: "6rem"
  section-lg: "8rem"
components:
  ink-action:
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "0"
  ink-action-hover:
    textColor: "{colors.son-deep}"
  seal:
    textColor: "{colors.son-deep}"
    typography: "{typography.seal}"
    rounded: "{rounded.seal}"
    padding: "0.4rem 0.7rem"
  section-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "{spacing.section} 0"
  section-sunk:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    padding: "{spacing.section} 0"
  product-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "2.5rem 0"
  product-row-hover:
    textColor: "{colors.son-deep}"
  header-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    height: "4.5rem"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "5rem 0"
---

# Design System: Tensoract

## Overview

**Creative North Star: "Giấy dó & mộc bản — the printed record"**

The site behaves like a sheet of Vietnamese handmade paper that has been through a press. One warm ground runs edge to edge with its fibre still visible, and everything on it is an impression: type cut rather than drawn, illustration in flat blocks of one ink, boundaries that waver the way a pressed line wavers. Nothing is a panel floating over a canvas; there is only the sheet and what was printed on it. The company is seven people, so the surface argues by showing what already exists in public record rather than by asserting scale.

Density is low and the rhythm is vertical. Sections are long pressings separated by an inked edge, never by a card boundary, and content lengths differ because the things being described differ — a product with three facts occupies less row than one with five. The palette is two materials and one seal: paper, ink, and cinnabar. Cinnabar is not an accent colour; it is evidence, pressed only where an outside body attested to something.

The build ships locked to `data-theme="light"`. A full dark token set exists in the stylesheet but the root layout hard-codes the light attribute, so the paper ground is the only shipped world; treat the dark values as unshipped until a theme control exists. Confirmed rejections: the SaaS hero-metric band, the grid of identical product cards, the chromed pill CTA, and the 1px UI hairline.

**Key Characteristics:**
- One warm paper ground with a fixed multiply-blended fibre layer behind the entire site
- Cut-serif display type at press scale, carrying the page without a supporting label
- Cinnabar reserved for attested facts; never decorative
- Printed edges instead of borders wherever a section or row boundary is drawn
- Flat two-block woodblock illustration with a deliberate registration offset
- Near-zero radius (2px); the seal is the only rotated element on the site

## Colors

Two materials and one seal: warm off-white paper, warm woodblock ink that is never neutral grey, and cinnabar held in reserve.

### Primary
- **Woodblock Ink** (`oklch(23% 0.014 60deg)`): All body text, headings, the primary action, icon strokes, and the solid footer field. Warm-shifted so it reads as ink absorbed into fibre rather than screen black.
- **Ink Soft** (`oklch(50% 0.016 62deg)`): Secondary prose, lead paragraphs, record metadata, nav links at rest, captions. The one step down in voice; there is no third.

### Secondary
- **Cinnabar (Son)** (`oklch(52% 0.155 34deg)`): The seal stroke, the underline under the primary action, the focus ring, and the second block in every woodblock plate. Appears on a fraction of any screen by design.
- **Cinnabar Deep** (`oklch(43% 0.14 33deg)`): Hover state for ink-coloured links and headings, and the seal's own text colour.
- **Cinnabar Wash** (`oklch(93% 0.03 40deg)`): Text selection background only. Not a fill for surfaces.

### Neutral
- **Giấy Dó Paper** (`oklch(95.2% 0.012 84deg)`): The global ground, the header bar, and the reverse type colour inside the footer.
- **Paper Sunk** (`oklch(92.4% 0.016 82deg)`): The alternate section tone, used to set a statement or quote apart without drawing a container.
- **Paper Edge** (`oklch(89% 0.018 80deg)`): Deepest paper step, for the rare recessed field.
- **Rule** (`oklch(84.5% 0.018 80deg)`): The only literal hairline in the system — the header underline and mobile nav dividers, plus the resting underline colour on secondary links.

### Named Rules
**The Attestation Rule.** Cinnabar marks a fact somebody outside this company ruled on: a competition result, an award, an external source. It never becomes a highlight, a badge, a tag, or a section accent. If you cannot name the outside body, the mark is ink.

**The Warm Neutral Rule.** No neutral grey and no pure black or white anywhere. Every paper and ink value carries chroma in the 60–84° hue range; a value at chroma 0 is out of world.

**The Reverse Field Rule.** The footer is the only surface that inverts — solid ink with paper type, opacities stepped at 85% / 65% / 45% for text hierarchy. Do not invent additional dark bands.

## Typography

**Display Font:** Petrona (Georgia, serif)
**Body Font:** Be Vietnam Pro (ui-sans-serif, system-ui)
**Record Font:** Geist Mono (ui-monospace)

**Character:** Petrona is cut rather than drawn — irregular stroke endings and a low wide lowercase that reads as a block impression rather than a book face. Be Vietnam Pro was drawn for Vietnamese, so diacritics in body copy sit clear of the ascenders above them. The pairing is a press proof: a headline that looks pressed, a text face that stays legible in two languages.

### Hierarchy
- **Display** (500, `clamp(2.5rem, 6.6vw, 5rem)`, 1.04): The hero headline only, one per page, authored with hard line breaks and set line by line. Balanced wrapping is on.
- **Headline** (500, `clamp(2rem, 4.6vw, 3.4rem)`, 1.04): Section headings. Split layout puts the heading in the left six columns and its intro in columns 8–12; the stacked variant caps at 22ch.
- **Title** (500, `clamp(1.6rem, 3vw, 2.15rem)`, 1.04): Product row titles and award entries. Shifts to cinnabar deep on row hover.
- **Body** (400, `1.0625rem`, 1.7): All prose. Reading passages are capped at 68ch; leads step up to `1.125–1.25rem` in ink soft.
- **Record** (400, `0.75rem`, `0.06em`, tabular figures): Product codes, years, hostnames, statuses, footer column labels and legal line. Measured data only.
- **Seal** (400, `0.6875rem`, `0.12em`, uppercase): Only inside the seal component.

### Named Rules
**The No-Kicker Rule.** Nothing sits above a heading. No eyebrow, no kicker, no category label, no all-caps section number. The CMS carries eyebrow fields and the templates deliberately do not render them; keep it that way. A label above a heading is the tell of a page that did not trust its own words.

**The Record-Only Mono Rule.** Mono is data that was measured or recorded — codes, years, counts, hostnames, statuses, labels over lists. It is never used for running prose, for buttons, or as costume to make a paragraph look technical.

**The Serif-Carries-It Rule.** Every heading level on the site, including CMS rich-text `h1`–`h4`, is set in Petrona at weight 500 with `-0.018em` tracking. There is no sans-serif heading anywhere.

## Layout

One centred column on paper. The container is fluid with `1.5rem` side padding, stepping to `2.5rem` at 48rem, and clamps at the breakpoint widths: 40rem (sm), 48rem (md), 64rem (lg), 80rem (xl), 86rem (2xl).

Inside it, a 12-column grid appears only where content genuinely splits. The hero is 7 / 5 — headline and action left, workroom plate right, aligned at the baseline of the block. Section headers are 6 / 5 with the intro starting at column 8. Product rows are 2 / 6 / 4 — plate, title and tagline, then record data right-aligned. Below `lg` everything collapses to a single stacked column; the hero plate falls under the headline.

Vertical rhythm is coarse and consistent: sections run `6rem` top and bottom, `8rem` from 48rem up. Rows inside a list run `2.5rem`, `3rem` at md. The hero's registration line sits `5rem` below the block, separated by a printed edge with `1.75rem` of clearance under it. Gaps within a grid stay in the 1.5–3.5rem band; nothing in the system uses a gap smaller than `0.5rem`.

The header is sticky at `4.5rem` tall with a paper background at 90% opacity and a light backdrop blur — the only translucency on the site. The footer is pushed to the bottom by a flex body column.

**The One Column Rule.** The page is a sheet, not a dashboard. No sidebars, no split-screen sections, no more than two content tracks in any row.

## Elevation & Depth

The system is flat. There is not one box-shadow in the authored surfaces, and depth is never simulated by lifting an element off the page. Everything sits *in* the sheet: separation comes from a printed edge, from a tonal step to paper-sunk, from the solid ink field of the footer, and from the fibre texture that runs behind all of it.

The fibre layer is the site's only ambient depth device — a fixed, full-viewport fractal-noise SVG at `mix-blend-mode: multiply`, pinned behind all content at `z-index: 0` with content at `z-index: 1`. Because it is fixed, scrolling reads as one continuous pressing rather than a series of textured panels.

### Named Rules
**The No-Shadow Rule.** No `box-shadow`, no `filter: drop-shadow`, no glow on any surface. If an element needs to separate from its neighbour, give it a printed edge or a paper-sunk ground.

**The One Pressing Rule.** The fibre background is declared once on `body::before` and is never re-applied to a child. Nested texture layers double the noise and break the illusion of a single sheet.

## Shapes

Corners are effectively square: the radius token is `0.125rem` (2px) and `sm`/`md` both resolve to it, with `lg` and `xl` only 2px and 4px above. Nothing in the world is a pill or a rounded card.

The system's signature form is the **printed edge** — a repeating turbulence-displaced SVG rule, roughly 1.1px of ink at 34% opacity across a 320px tile, applied as a background image at the top (`.edge-print`) or bottom (`.edge-print-b`) of an element with the real border forced to zero. It replaces the UI hairline at every section and row boundary. Literal 1px borders survive only in the header chrome and mobile nav, where they are structural rather than editorial.

Illustration is cut, not drawn: flat fills in exactly two colours, no gradients and no variable stroke weight, each shape passed through a shared turbulence-and-displacement filter so the edge seeps into the fibre. Every plate prints a cinnabar block first, translated 2–3px off register, then the ink block over it. The filter lives in a single `<defs>` mounted once in the root layout; plates reference it by id.

Icons are drawn SVG at one stroke weight, sized in `em` so they scale with their text.

**The Printed Edge Rule.** A boundary between two pieces of content is a pressed line, never a `1px solid`. If you reach for `border-top`, reach for `.edge-print` instead.

**The Two-Block Rule.** A plate has exactly two inks and the second is out of register. Three colours, a gradient, or a perfectly aligned overlay stops reading as a print and starts reading as a vector icon.

## Components

### Primary Action (Ink Action)
The page's one action is the email address itself. Serif, `clamp(1.35rem, 2.6vw, 1.85rem)`, ink coloured, underlined at 2px in cinnabar with a `0.28em` offset — a printed reference, not a control.
- **Shape:** none; no box, no fill, no radius.
- **Hover:** text shifts to cinnabar deep over 0.2s. The underline stays.
- **Secondary links:** ink-soft text with a rule-coloured 1px underline at `6px` offset, going cinnabar deep with a cinnabar underline on hover.
- **One per page.** Anything after the first link in a hero link array renders as the quiet secondary treatment.

### Product Row
A product is an entry in a printed index, not a card. Each row is a full-width `li` with a printed top edge, a small plate at left, title and tagline in the middle, and right-aligned record data (code · status, hostname) with a "read more" line and arrow. Hover shifts the title and the read-more line to cinnabar deep and nudges the arrow 4px right over 200ms. No background, no border, no radius, no lift.

### Seal
The evidence mark. An inline-flex box rotated `-4.5deg`, 2px cinnabar stroke, 2px radius, `0.4rem 0.7rem` padding, mono uppercase at `0.6875rem` with `0.12em` tracking, held at 92% opacity so the ink sits unevenly. It appears in the hero registration line and against award results only.

### Section
A pressing on the sheet: printed top edge, `6rem`/`8rem` vertical padding, and an optional `sunk` tone that swaps the ground to paper-sunk. Its header is heading-plus-intro with no label above the heading.

### Navigation
Header: sticky, `4.5rem`, translucent paper with a light blur, rule-coloured bottom border. Links are ink-soft with a transparent 1px underline at `7px` offset that inks in cinnabar on hover. The CTA link takes the same treatment as any nav link — the chrome deliberately holds no pill button. Below `md` the bar collapses to a text "Menu"/"Close" toggle over a stacked list of rule-divided rows.

Footer: solid ink field with paper type, mono column labels at 45% opacity, links at 85% going cinnabar on hover, and a rule at 15% paper opacity above the legal line.

### Motion
Two devices, nothing else. The hero settles once on load (`0.85s cubic-bezier(0.16, 0.84, 0.24, 1)`, 8px rise plus fade) with a stagger of 0.1s / 0.18s / 0.26s so the headline lands before the plate. Everything below the fold uses a scroll reveal: 14px rise plus fade, `0.55s` on `cubic-bezier(0.2, 0.7, 0.2, 1)`, 70ms per item, fired once at 25% visibility. Reduced motion is honoured globally by a media query and by `MotionConfig reducedMotion="user"`, which drops the transform and keeps the fade on an identical tree; a `noscript` style unhides revealed content when scripting is off.

## Do's and Don'ts

### Do:
- **Do** put every heading in Petrona at weight 500 with `-0.018em` tracking, and let it start the section with nothing above it.
- **Do** draw section and row boundaries with `.edge-print` / `.edge-print-b`; forced `border: 0` plus the pressed background is the pattern.
- **Do** reserve cinnabar for facts an outside party attested, and reach for ink or ink-soft for everything else.
- **Do** cap prose at 68ch with `.measure`, and let row heights differ because their contents differ.
- **Do** set codes, years, counts, hostnames and statuses in `.record` with tabular figures.
- **Do** draw new illustration as two flat ink blocks through the shared bleed filter, with the cinnabar block 2–3px out of register.
- **Do** keep the whole surface in the light paper world; the shipped root is hard-coded to `data-theme="light"`.
- **Do** localize every copy-bearing field: the site serves VI and EN under `/vi` and `/en`, and layouts must survive Vietnamese line lengths and diacritics.

### Don't:
- **Don't** put a kicker, eyebrow, category label, or section number above a heading. The CMS eyebrow fields exist and are intentionally not rendered.
- **Don't** add a box-shadow, drop-shadow, or glow to anything.
- **Don't** use cinnabar as decoration, a highlight, a badge fill, or a section accent.
- **Don't** set prose or UI labels in mono; it is record data only.
- **Don't** build a grid of equal-size product cards, or a hero band of large metric numerals.
- **Don't** introduce a filled pill CTA in the header or anywhere else; the primary action is the underlined address.
- **Don't** use a neutral grey, pure black, or pure white value.
- **Don't** re-apply the fibre texture to a child element or add a second rounded corner scale; radius stays at 2px.
- **Don't** replace a printed edge with `1px solid` outside the header chrome and mobile nav.
