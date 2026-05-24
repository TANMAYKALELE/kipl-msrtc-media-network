
# MSRTC × KIPL — Elite Frontend Refinement Plan

Frontend-only upgrade. Zero changes to routes, copy, facts, numbers, rollout dates, CTA hierarchy, KIPL/MSRTC identity logic, or page count. All edits target the design system, components, and motion layer.

---

## 1. Refined Color Palette

Move from a light-default with dark sections to a **dark-first, editorial palette** with restrained warm accent.

Edit `src/index.css` `:root` tokens (light mode kept for forms, but dark surfaces become the visual backbone):

```text
--background        : 222 47% 5%     (midnight base)
--foreground        : 210 30% 96%    (ivory)
--surface-base      : 222 47% 5%
--surface-raised    : 220 40% 8%     (inset section)
--surface-elevated  : 220 36% 11%    (cards / glass panels)
--surface-muted     : 220 25% 96%    (kept for light form panels)

--primary           : 222 47% 9%
--accent            : 36 96% 56%     (warm amber — CTA only)
--accent-soft       : 36 96% 56% / 0.12

--steel             : 218 14% 58%    (secondary text on dark)
--hairline-on-dark  : 210 30% 96% / 0.08
--hairline-on-light : 220 18% 90%
--ring              : 36 96% 56%

--status-live       : 152 60% 45%
--status-soon       : 199 90% 55%
--status-pending    : 32 92% 55%
--status-fleet      : 262 60% 65%
```

Rule: amber appears **only** on primary CTAs, active-state chips, and 1-pixel highlight lines. Everything else lives in navy / steel / ivory.

---

## 2. Surface & Depth System (3 Tiers)

Add utilities in `src/index.css`:

- `.surface-1` — base midnight, page background
- `.surface-2` — `surface-raised`, used for alternating sections (Solutions, How It Works)
- `.surface-3` — `surface-elevated` + 1px hairline + soft inner highlight, used for cards
- `.glass-panel` — `bg-white/[0.03] backdrop-blur-md border border-white/8`
- `.hairline-top` — top 1px gradient line `linear-gradient(90deg, transparent, hsl(var(--accent)/0.4), transparent)` for premium section accents
- `.ambient-glow` — fixed radial gradient layer behind hero / CTA banner (low opacity amber + navy)

Section rhythm: alternate `surface-1 → surface-2 → surface-1` to create lighting shifts instead of one flat tone.

---

## 3. Typography Hierarchy

Keep current fonts (Plus Jakarta Sans display, Inter body). Tighten the scale:

```text
.h-display : clamp(2.5rem, 5.2vw, 4.5rem) / leading 1.02 / tracking -0.025em / weight 700
.h-section : clamp(2rem, 3.6vw, 3.25rem)  / leading 1.08 / tracking -0.02em
.h-card    : 1.25rem / 1.2 / -0.015em / weight 700
.eyebrow   : 11px uppercase, tracking 0.22em, accent color, with leading dot
.lede      : 1.125–1.25rem, leading 1.65, color steel/ivory mix
body       : 15px desktop / 16px mobile, leading 1.7
```

Add `text-balance` to all headings, `text-pretty` to ledes. Numbers use `tnum` (already present).

---

## 4. Header Redesign (`SiteHeader.tsx`)

Fix the white-on-white and weak-contrast issue.

- Always dark translucent: `bg-[hsl(222_47%_5%/0.72)] backdrop-blur-xl` regardless of route — drop the `transparent` branch.
- Bottom hairline: 1px `border-b border-white/8`, intensifies to `/14` after scroll.
- Logo lockup: amber square mark + "MSRTC Media Network" in ivory, secondary line "Implemented by KIPL" in 10px steel uppercase under brand on ≥md.
- Nav links: ivory/70 → ivory on hover, animated 1px amber underline (`scale-x` from origin-left, 200ms).
- Primary CTA pill: amber bg, subtle inner highlight, `cta-lift` + new `cta-shine` (translateX gradient sweep on hover).
- Mobile: drawer slides from right (Sheet), full-height dark panel, large tap targets, CTA pinned at bottom.
- Reduce header height to 64px desktop / 60px mobile; padding tightened.

---

## 5. Hero Redesign (`Index.tsx` hero block)

Same copy, upgraded stage:

- Background: dark base + low-opacity hero image (already there) + **two ambient glows**: amber radial top-left, navy radial bottom-right, both `animate-breathe`.
- Add fine grid SVG overlay (`opacity-[0.04]`) for editorial texture.
- Headline: `h-display`, line-by-line reveal already in place — increase stagger to 80ms and add subtle `mask-image` wipe on first paint.
- Add a thin amber underline (`w-16 h-px`) above eyebrow.
- Trust strip: lift to elevated glass panel with vertical hairline dividers; counters animate from 0 with `Counter` already in repo, ease-out 1.4s.
- CTA group: primary amber + secondary ghost-outline; both gain `cta-shine`.
- Right column `HeroMotif` — refine to layered concentric arcs + animated route line + 3 pulsing GPS dots (transform/opacity only).

---

## 6. Motion System

All motion via Framer Motion (already installed) + Tailwind keyframes. Performance-safe only.

Catalog:
- `fade-up` (12px, 500ms, ease `[0.2,0.7,0.2,1]`) — section entrances
- `reveal-line` — clipPath wipe for headlines
- `stagger` — 60–80ms children
- `count-up` — number tween, 1.4s
- `cta-lift` (-1px translateY + amber shadow) — hover
- `cta-shine` — diagonal gradient sweep, 700ms
- `card-hover` — translateY -3px, hairline glows amber/40, shadow softens
- `nav-underline` — scale-x 0→1 200ms
- `mobile-drawer` — slide-in-right 280ms
- `pulse-dot` — 2s opacity loop on live status chips

Forbidden: parallax, particles, canvas, autoplay video, rotation gimmicks, bounce. All animations gated by `prefers-reduced-motion: reduce` (already partially handled — extend to new utilities).

Use `IntersectionObserver` (existing `Reveal` component) — fire once, threshold 0.15.

---

## 7. Cards & Stat Redesign

**SolutionCard** (`src/components/SolutionCard.tsx`):
- `surface-3` background, 1px `border-white/8`, radius `rounded-2xl`, padding `p-7`.
- Icon in 44px rounded amber-tinted square (`bg-accent/12 text-accent`), top-left.
- Title `h-card` ivory, description steel, 14px.
- Status chip pinned top-right with new `StatusChip` styling (dot + label, soft tinted bg matching status hue).
- Hover: `card-hover` + animated amber hairline at top edge (scaleX 0→1).

**Stat strip / ScaleSection**:
- Move to `surface-2` band with hairline-top accent.
- Counters bumped to `clamp(2.5rem, 4.5vw, 3.75rem)`, weight 700, tnum, ivory.
- Label: 11px uppercase steel, 0.2em tracking.
- Vertical 1px hairline dividers between cells (no background grid blocks).
- Optional small spark detail: amber 4px dot before label.

**Why-Choose grid**: same elevated-card treatment; remove the gray block-grid look.

---

## 8. Proof Section Treatment

Convert to true bento (`Proof.tsx` + Index proof block):

- 12-col grid, two row heights, asymmetric: 1 large hero tile (6×2), 3 supporting tiles (6, 3, 3).
- Each tile: rounded-2xl, overflow-hidden, image with `object-cover` + dark gradient overlay `from-black/70 via-transparent`.
- Caption block bottom-left: amber tag pill ("GPS-Tagged", "Digital · Screen Logs"), then ivory caption.
- Hover: image `scale-[1.03]` 600ms, overlay deepens, tag glows.
- Bottom row of 3 trust mini-cards (already exist) move to `surface-3` with icon-in-tinted-square treatment.

---

## 9. Form Polish (`GetMediaPlan.tsx`)

Already multi-step — elevate visuals, no logic change:

- Wrap form in `surface-3` panel on `surface-2` page background, generous padding `p-8 md:p-12`, `rounded-3xl`, hairline border.
- Step indicator: 3 pill chips with connecting hairline; active = amber filled, completed = green check, upcoming = steel outline.
- Progress bar: 2px, amber fill with subtle glow.
- Inputs (`Input`, `Textarea`, `RadioGroup`): height 44px, radius `rounded-xl`, focus ring 2px amber + soft outer glow, invalid state amber→soft red transition.
- Radio cards: large clickable surfaces with check icon top-right when selected, hairline → amber on select.
- Step transitions: existing AnimatePresence x-slide kept; add 180ms opacity crossfade.
- Success state: scale-in check (already there) + ivory headline + amber underline + "Submit another" ghost button. Add confetti? **No** — keep restrained.
- Microcopy unchanged.

---

## 10. Mobile Strategy

- Container padding `px-5` ≤sm, `px-8` ≥sm.
- Section vertical rhythm: `py-16` mobile, `py-24` md, `py-28` lg.
- Hero stacks: motif hidden <lg, replaced by 1 ambient glow + headline taking full attention.
- Stat strip: 2-col on mobile, hairline dividers, no horizontal scroll.
- Solutions: 1-col, full-width cards with breathing room.
- Proof bento: collapses to single column with maintained 16:10 tiles.
- CTA: sticky bottom amber bar appears after hero scrolled past on mobile only (`fixed bottom-3 inset-x-3 rounded-2xl`).
- Mobile drawer: full-screen dark panel, 24px gap nav, CTA pinned bottom.

---

## 11. Performance Guardrails

- No new heavy libs. Reuse Framer Motion + Tailwind keyframes already in project.
- Animate only `transform`, `opacity`, `filter` (sparingly), `clip-path`. Never `width/height/top/left`.
- `will-change` only on actively animated elements; remove after animation.
- All decorative visuals as inline SVG (HeroMotif, hairlines, grid overlay).
- Hero image: ensure `loading="eager" fetchpriority="high"`; proof images `loading="lazy" decoding="async"`.
- Backdrop-blur kept to header + form panel only (GPU cost).
- `Reveal` fires once via IntersectionObserver — no scroll listener spam.
- Respect `prefers-reduced-motion` for every new utility.

---

## 12. Files Touched (no new pages, no content changes)

- `src/index.css` — token overhaul, surface utilities, new motion utilities, reduced-motion guards
- `tailwind.config.ts` — add `surface-raised`, `surface-elevated`, `steel` colors + new keyframes (`shine`, `reveal-line`)
- `src/components/SiteHeader.tsx` — always-dark translucent, underline nav, refined CTA, polished mobile drawer
- `src/components/SiteFooter.tsx` — dark surface, hairline columns, ivory/steel hierarchy
- `src/components/SolutionCard.tsx` — elevated card, status chip placement, hover hairline
- `src/components/StatusChip.tsx` — dot + label, tinted bg per status
- `src/components/StepCard.tsx` — number badge refinement, connector dotted line
- `src/components/ProofTile.tsx` — overlay gradient, tag pill, hover scale
- `src/components/SectionHeading.tsx` — eyebrow underline, balanced text, optional dark variant tweaks
- `src/components/CTABanner.tsx` — ambient glow background, refined CTA
- `src/components/Counter.tsx` — verify ease-out + reduced-motion fallback
- `src/components/HeroMotif.tsx` — refined SVG: route arc, GPS pulses
- `src/components/Reveal.tsx` — extend stagger options
- `src/pages/Index.tsx` — wire surface tiers, ambient glows, bento grid spacing, sticky-mobile-CTA
- `src/pages/Solutions.tsx`, `Reach.tsx`, `Proof.tsx`, `HowItWorks.tsx`, `AboutKipl.tsx`, `Contact.tsx` — apply surface tiers, typography scale, motion reveals (no copy changes)
- `src/pages/GetMediaPlan.tsx` — premium panel wrapper, refined inputs/chips/progress, no logic change

---

## 13. What Will Make It Feel Elite (Summary)

1. **Dark-first stage** with controlled amber — kills the AI-template white feel.
2. **Three surface tiers + hairlines + ambient glows** — gives the page lighting and atmosphere.
3. **Always-dark translucent header** with animated underline nav — fixes the contrast problem and feels like a floating control bar.
4. **Headline-led hero** with line-by-line reveal, layered glows, and an editorial trust strip — flagship moment.
5. **Elevated cards with hover hairline glow** — replaces flat blocks with tactile, expensive surfaces.
6. **Editorial bento proof grid** with amber tag pills — turns image gallery into documented field evidence.
7. **Multi-step concierge form** with refined chips, progress, and validation states.
8. **Restrained motion vocabulary** (fade-up, reveal-line, count-up, cta-shine, card-hover) — alive but never gimmicky.
9. **Mobile-native polish** — sticky bottom CTA, real drawer, full-bleed cards.
10. **Performance-safe everywhere** — transform/opacity only, reduced-motion respected, lean DOM, no new deps.

Net result: same approved structure and content, but the surface, motion, and detail layer now reads as a handcrafted, enterprise-grade B2B media platform.
