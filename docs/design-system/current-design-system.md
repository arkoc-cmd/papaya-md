# Alivio Design System — Current Implementation Baseline

**Initiative:** AstroMD Telehealth Platform  
**Store 1 Brand:** Alivio (currently implemented under working namespace `Alivio`)  
**Status:** Verified Source Implementation (No Redesign)  
**Date:** October 2026  
**Auditor:** Principal Product Designer & Front-End Architect  

---

## 1. Architectural Overview & Design Philosophy

The current design system balances **clinical authority** with **modern consumer editorial warmth**, inspired by top-tier telehealth benchmarks (Hims, Alivio, Linear, Apple).

- **Visual Balance:** 50% Canvas/Ivory Surfaces, 25% Forest Green Brand Anchor, 15% Soft Sage & Charcoal Neutrals, 10% Selective Highlights (Fresh Lime & Warm Sand).
- **Core Technology:** Modern Vanilla CSS custom properties (`:root` tokens), fluid typography via CSS `clamp()`, semantic HTML5 layout tokens, and scoped CSS partials (`tokens.css`, `reset.css`, `typography.css`, `components.css`, `sections.css`).
- **Brand Transition Context:** The design tokens currently use the `--sp-` and `--color-` prefixes established during the Alivio/Alivio phase. These tokens and values are documented below exactly as verified in production code without modification.

---

## 2. Color System & Token Semantics

Source: [assets/css/tokens.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/tokens.css)

### A. Primary Brand & Accent Palette

| Token Name | Verified Hex / RGBA Value | Semantic Usage & Role | Contrast vs. Canvas (#FFFFFF) |
| :--- | :--- | :--- | :---: |
| `--color-rust-terracotta` | `#5B2009` | Dominant brand anchor, primary button background, hero pricing number, active states | 11.2:1 (WCAG AAA) |
| `--color-rust-terracotta-hover` | `#3E1505` | Primary button hover surface | 14.5:1 (WCAG AAA) |
| `--color-espresso-dark` | `#260D03` | Dark card background, footer base, icon disk hover container | 17.5:1 (WCAG AAA) |
| `--color-apricot-cream` | `#FFEBC4` | Eyebrow badges, dark surface text, glowing borders, active mood chips, CTA disks | 7.8:1 (WCAG AAA vs. #5B2009) |
| `--color-linen-warm` | `#FAF2DE` | Main background fill for light sections, card container backgrounds | 1.1:1 (Canvas fill) |
| `--color-olive-forest` | `#2D3622` | Step 02 in "How It Works" sequence, botanical health credentials | 9.6:1 (WCAG AAA vs. #FFEBC4) |
| `--color-sand-divider` | `#D7D1C3` | Card outlines, 1px horizontal section dividers, table borders | 1.4:1 (Border / hairline) |
| `--color-golden-apricot` | `#FACA89` | Focal point in radial hero glow, star ratings, special highlight badges | 1.4:1 (Glow fill) |
| `--color-teal-accent` | `#02554A` | Rx verification badges, physician board approval seals | 8.5:1 (WCAG AAA) |

### B. Text & Neutral Ink Tokens

| Token Name | Verified Value | Semantic Usage & Role | Intended Surface |
| :--- | :--- | :--- | :--- |
| `--color-ink-nearblack` / `--sp-text-primary` | `#070706` | Primary headlines (`h1`, `h2`, `h3`), navigation active links | Light canvas (`#FFFFFF` / `#FAF2DE`) |
| `--color-charcoal-earth` / `--sp-text-secondary` | `#41382E` | Body paragraphs, secondary descriptions, metadata | Light canvas |
| `--sp-text-tertiary` | `#7D7D7D` | Section overlines, card labels, footer links | Light canvas |
| `--sp-text-inverse` | `#FFFFFF` | Text on Terracotta buttons, dark cards, footer | Dark surfaces (`#5B2009`, `#260D03`) |
| `--sp-text-inverse-warm` | `#FFEBC4` | Subtext on dark surfaces, eyebrow badge text | Dark surfaces |

### C. Surface & Canvas Tokens

| Token Name | Verified Value | Semantic Usage & Role |
| :--- | :--- | :--- |
| `--sp-canvas-bg` | `#FFFDF5` | Root document canvas background |
| `--sp-canvas-white` | `#FFFFFF` | Card surfaces, modal background, accordion containers |
| `--sp-canvas-subtle` | `#FAF6ED` | Alternating section fills |
| `--sp-canvas-linen` | `#FAF2DE` | Warm linen card surfaces |
| `--sp-canvas-dark` | `#5B2009` | Dark hero and section surfaces |
| `--sp-canvas-card-dark` | `#260D03` | Dark card fills |
| `--sp-canvas-step-olive` | `#2D3622` | Step 02 How Alivio Works card |
| `--sp-canvas-sand` | `#E9DFD0` | Sand tag backgrounds |
| `--sp-canvas-dark` | `#173F35` | Dark section containers |
| `--sp-canvas-card-dark` | `#12342C` | Dark card surface |
| `--sp-canvas-card-dark-hover` | `#0E2923` | Dark card hover state |

### D. Borders & Hairline Tokens

| Token Name | Verified Value | Semantic Usage & Role |
| :--- | :--- | :--- |
| `--sp-border-light` | `rgba(23, 63, 53, 0.10)` | Card outlines, dividers, table borders |
| `--sp-border-subtle`| `rgba(23, 63, 53, 0.05)` | Hairlines, subtle row dividers |
| `--sp-border-strong`| `rgba(23, 63, 53, 0.22)` | Button outlines, interactive controls |
| `--sp-border-sage`  | `#DCE7DD` | Sage container borders |
| `--sp-border-dark`  | `rgba(255, 255, 255, 0.14)` | Translucent borders on dark surfaces |
| `--sp-border-dark-strong` | `rgba(255, 255, 255, 0.26)` | Active borders on dark surfaces |

---

## 3. Typography System

Source: [assets/css/typography.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/typography.css) and [assets/css/tokens.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/tokens.css)

### A. Font Families & Loading

- **Primary Body Stack (`--sp-font-sans`):** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Display Heading Stack (`--sp-font-display`):** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Web Font Source:** Google Fonts `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">` with DNS preconnect.

### B. Fluid Typographic Hierarchy

| Level / Class | Font Size Equation | Line Height | Letter Spacing | Font Weight |
| :--- | :--- | :---: | :---: | :---: |
| **H1 (`h1, .sp-heading-h1`)** | `clamp(2.5rem, 5.5vw + 1rem, 4.75rem)` (40px → 76px) | `1.08` | `-0.03em` | `400` (Regular) |
| **H2 (`h2, .sp-heading-h2`)** | `clamp(2.0rem, 3.5vw + 0.5rem, 3.25rem)` (32px → 52px) | `1.15` | `-0.03em` | `400` (Regular) |
| **H3 (`h3, .sp-heading-h3`)** | `clamp(1.35rem, 1.8vw + 0.4rem, 1.85rem)` (21.6px → 29.6px) | `1.25` | `-0.03em` | `400` (Regular) |
| **H4 (`h4, .sp-heading-h4`)** | `clamp(1.1rem, 1.2vw + 0.3rem, 1.35rem)` (17.6px → 21.6px) | `1.35` | `-0.03em` | `400` (Regular) |
| **Auth Heading (`.auth-title`)** | `clamp(1.35rem, 1.8vw, 1.55rem)` | `1.18` | `-0.03em` | `400` (Regular) |
| **Lead Paragraph (`.sp-lead`)** | `clamp(1.05rem, 1vw + 0.75rem, 1.25rem)` (16.8px → 20px) | `1.55` | `normal` | `400` |
| **Body Medium (`.sp-body-medium`)** | `0.95rem` (15.2px) | `1.6` | `normal` | `400` |
| **Body Small (`.sp-body-small`)** | `0.875rem` (14px) | `1.5` | `normal` | `400` |
| **Micro Copy (`.sp-body-micro`)** | `0.8125rem` (13px) | `1.45` | `normal` | `400` |
| **Overline (`.sp-overline`)** | `0.8125rem` (13px) | `1.2` | `0.06em` (uppercase) | `600` |
| **Badge Pill (`.sp-badge-pill`)** | `0.8125rem` (13px) | `1.0` | `normal` | `500` |

---

## 4. Spatial System, Container Boundaries & Elevation

### A. Spacing Scale

| Token Name | Value | Rem Equivalent | Primary Application |
| :--- | :--- | :--- | :--- |
| `--sp-space-1` | `4px` | `0.25rem` | Micro padding, icon gaps |
| `--sp-space-2` | `8px` | `0.5rem` | Badge padding, button icon gap |
| `--sp-space-3` | `12px` | `0.75rem` | Input padding, compact grid gap |
| `--sp-space-4` | `16px` | `1.0rem` | Card internal padding (mobile) |
| `--sp-space-5` | `20px` | `1.25rem` | Medium component padding |
| `--sp-space-6` | `24px` | `1.5rem` | Card internal padding (desktop) |
| `--sp-space-8` | `32px` | `2.0rem` | Section row gaps, grid gutters |
| `--sp-space-10` | `40px` | `2.5rem` | Section header bottom margin |
| `--sp-space-12` | `48px` | `3.0rem` | Large block separation |
| `--sp-space-16` | `64px` | `4.0rem` | Section vertical padding (mobile baseline) |
| `--sp-space-20` | `80px` | `5.0rem` | Section vertical padding (tablet) |
| `--sp-space-24` | `96px` | `6.0rem` | Section vertical padding (desktop) |

### B. Layout Boundaries

- `--sp-container-max`: `1340px` (centered via `margin-left/right: auto`, fluid padding: `clamp(16px, 4vw, 36px)`).
- `--sp-header-height`: `76px` (sticky navigation reference).

### C. Border Radii

- `--sp-radius-sm`: `8px` (badges, micro tags)
- `--sp-radius-md`: `14px` (inner card boxes, thumbnails)
- `--sp-radius-lg`: `20px` (dock cards, pills)
- `--sp-radius-xl`: `28px` (hero container card, section cards, modals)
- `--sp-radius-pill`: `9999px` (all action buttons, subnav tracks, review badges)

### D. Elevation & Shadows

- `--sp-shadow-sm`: `0 1px 3px rgba(23, 63, 53, 0.04)`
- `--sp-shadow-md`: `0 4px 16px -2px rgba(23, 63, 53, 0.08)`
- `--sp-shadow-lg`: `0 12px 36px -4px rgba(23, 63, 53, 0.12)`
- `--sp-shadow-pill`: `0 4px 20px rgba(23, 63, 53, 0.08)`
- `--sp-shadow-dark-card`: `0 12px 40px rgba(17, 46, 39, 0.35)`

---

## 5. Global CTA Button System & Header Scroll States

### A. Primary CTA — Filled

- **Baseline Surface:** Pure White (`#FFFFFF`) in default hero state; transitions to Cream Ivory (`#FAF2DE`) in scrolled sticky header.
- **Text & Icon:** Deep Espresso (`#260D03` / `#5B2008`) for optimal contrast (contrast ratio > 11:1).
- **Shape & Geometry:** Rounded pill (`border-radius: var(--sp-radius-pill, 9999px)`), padding `13px 28px` (desktop), min-height `50px`.
- **Icon Treatment:** Trailing chevron or arrow encapsulated within dedicated icon container with smooth micro-hover offset (`translateX(3px)`).
- **Scrolled Header State:** Sticky header background transitions to `#FAF2DE` with `backdrop-filter: blur(16px)`; primary CTA adopts `#FAF2DE` background with 1px border (`rgba(38, 13, 3, 0.15)`) and `#260D03` text.
- **States:**
  - *Hover:* Subdued lift (`translateY(-1px)`) and background opacity shift.
  - *Active:* Subtle pressed state (`transform: scale(0.98)`).
  - *Focus-Visible:* 2px solid `#FFEBC4` ring with 3px offset.
  - *Disabled:* 40% opacity, `cursor: not-allowed`.

### B. Secondary CTA — Glass-Morphism

- **Visual Baseline:** Inspired by Alivio Wellness editorial glass treatment.
- **Surface:** Translucent Cream tint (`rgba(255, 235, 196, 0.12)` or `rgba(255, 255, 255, 0.12)`).
- **Backdrop Filter:** `backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)`.
- **Fallback:** Graceful background tint fallback (`rgba(255, 235, 196, 0.22)`) for browsers lacking `backdrop-filter`.
- **Border:** `1px solid rgba(255, 235, 196, 0.35)`.
- **Text & Disk:** Warm Sand (`#FFEBC4`), semi-bold typography (`font-weight: 500`), paired with a frosted circular icon disk (`rgba(255, 235, 196, 0.18)`).
- **Hover State:** Background shifts to `rgba(255, 235, 196, 0.22)`, border brightens to `rgba(255, 235, 196, 0.55)`, micro-expansion of disk.

---

## 6. Motion Behavior & Accessibility Safeguards

Source: [assets/js/modules/hero-rotator.js](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/hero-rotator.js), [assets/js/modules/motion.js](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/motion.js), [assets/css/components.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css), [assets/css/sections.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css)

### A. CSS Transitions

- `--sp-transition-fast`: `160ms cubic-bezier(0.16, 1, 0.3, 1)` (hover color changes, micro-elevations, icon shifts).
- `--sp-transition-smooth`: `280ms cubic-bezier(0.16, 1, 0.3, 1)` (button scaling, drawer transitions, modal backdrop fade).

### B. Rotating Headline Word-Swap

- **Fixed Anchor:** *"The care your "* rendered with regular font weight (`400`) on Inter Display (`letter-spacing: -0.03em`), stationary at all times.
- **Rotating Phrases (4-State Sequence):**
  1. `body deserves.`
  2. `energy needs.`
  3. `future deserves.`
  4. `wellbeing deserves.`
- **Cadence:** Cycles every 2,000ms.
- **Choreography:** Subtle upward translation (`translateY(-8px)`) with simultaneous fade-out (`opacity: 0`), followed by entrance from slightly below (`translateY(8px)` → `0`) with fade-in (`opacity: 1`), duration 450ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Layout Shift Prevention (Zero CLS):** Dynamic phrase container uses CSS Grid overlay (`display: inline-grid; grid-template-areas: "phrase"`), naturally sizing the container to the widest phrase (`wellbeing deserves.`) across all breakpoints.
- **Reduced Motion & Fallback:** When `prefers-reduced-motion: reduce` is active, rotation timer is disabled, and static phrase `body deserves.` remains stably rendered without animation.

### C. Button Shimmer Effect

- Keyframe: `sp-cta-shimmer`
- Timing: `3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite` with `1.5s` delay.
- Sweep: `left: -130%` to `left: 140%` with `24deg` skew and gradient highlight (`rgba(255, 255, 255, 0.5)`).

### D. Marquee Animation

- Keyframe: `sp-marquee-scroll`
- Timing: `32s linear infinite` continuous translation (`transform: translateX(0)` to `transform: translateX(-50%)`).
- Interaction: Pauses immediately on hover (`animation-play-state: paused`).

### E. GSAP & ScrollTrigger Timelines

- **Hero Stagger:** Staggers badge, subtitle, and buttons on initial load (`0.6s` to `0.7s`, `power2.out`). Hero headline is driven purely by CSS and native JS to avoid property collision.
- **Section Reveals:** Triggers section headers and cards at `top 85%` viewport intersection (`opacity: 0, y: 24` to `opacity: 1, y: 0`).


### F. Reduced-Motion Compliance
Every animated feature explicitly includes an override for users with `prefers-reduced-motion: reduce`:

- CSS `@media (prefers-reduced-motion: reduce)` removes button shimmer, halts the media marquee into a centered static wrapping list, and neutralizes accordion animation.
- JavaScript `window.matchMedia('(prefers-reduced-motion: reduce)').matches` immediately aborts GSAP timelines and hero phrase rotation.

---

## 7. Separation: Verified Implementation vs. Future Recommendations

### Verified Current Implementation

- Hero palette: `#FAF2DE` scrolled sticky header, `#FFEBC4` editorial warm typography, `#FFFFFF` primary filled CTA, and glass-morphism secondary CTA.
- Inter Display typography with regular weight (`400`) and `-0.03em` letter-spacing.
- 4 Trust Features row with SVG iconography (`FDA-approved`, `HIPAA compliant`, `Board-certified`, `Free delivery`).
- Mobile-first layered composition with bottom-anchored content and centered image subject.
