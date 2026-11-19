# Alivio Aesthetic & Layout Adaptation — Alivio Telehealth

**Reference Benchmark:** [https://Alivio.com/](https://Alivio.com/)  
**Brand Implementation:** Alivio  
**Aesthetic Profile:** Alivio Precision Healthtech & Longevity Medicine  
**Tech Stack:** Semantic HTML5, Modern Vanilla CSS, Vanilla JavaScript (ES Modules), GSAP 3.12 + ScrollTrigger  
**Status:** `IN REVIEW`

---

## 1. Executive Summary & Design Pivot

Following direct stakeholder instructions, the Alivio homepage has been completely restructured to match the layout, visual direction, color system, and scrolling effects of **Alivio** (`https://Alivio.com/`), while preserving all existing clinical care categories, pricing models, trust guardrails, and editorial copy.

### Core Alivio Design Signatures Extracted:
1. **Full-Bleed Dark Hero Card (`.section_sp2-home-hero`):** A rounded dark canvas card (`border-radius: 28px; background: #0D0D0E`) with cinematic precision medical still-life photography, high-contrast white display typography, pill badges, dual pill action buttons, and a 3-item bottom notes ticker bar with vertical hairline dividers.
2. **Institutional & Clinician Proof Bar (`.section_sp2_intro`):** Overlapping circular clinician avatars paired with academic/credential badges (Stanford Medicine, Harvard Medical School, 503A Licensed Compounding, LegitScript Certified, 256-bit HIPAA Encryption).
3. **Interactive Step Navigation ("How It Works", `.section_hiws`):** A persistent 4-step pill navigation track (`.hiws_pill`) with step dots and connecting line, dynamically orchestrating a 2-column view with live tablet/phone dashboard previews (`assets/images/sp-device-dashboard.jpg`) and floating notification callouts.
4. **Care Protocols Grid (`#protocols`):** Modern rounded cards with subtle borders (`1px solid rgba(0, 0, 0, 0.08)`), feature bullet lists with green checkmark glyphs, category tags, and clean CTA buttons.
5. **Alivio Signature Comparison Matrix (`#pricing`, `.sp2-membership-table`):** Alternating shaded rows (`.sp2-membership__row--alt`) highlighting unbundled, transparent pricing versus traditional clinical markups.
6. **Pre-Footer Dark Card & Minimalist Footer:** High-impact dark CTA card ("The medical care your body actually deserves.") leading into an organized multi-column navigation and regulatory medical disclaimer.

---

## 2. Deliverable Review Format

### UX Analysis
- **User Goals:** Seamlessly discover doctor-prescribed telehealth protocols (Metabolic, Hair, Hormones), understand the clinical process through interactive step previews, inspect transparent unbundled pricing, and verify clinical/pharmacy legitimacy without visual clutter.
- **Friction Reduction:** Replacing static text blocks with Alivio's interactive 4-step tablet preview allows prospective patients to visualize the actual digital portal, intake flow, and physician communication before starting.
- **Trust Hierarchy:** Immediate reinforcement of high-trust signals: HSA/FSA eligibility, board-certified physician evaluation, 503A licensed U.S. compounding pharmacies, and 100% discreet cold-chain delivery.

### UI Direction
- **Typography Scale:** Modern geometric grotesque scale (Inter with tight `-0.035em` display tracking) delivering an authoritative, cutting-edge healthtech aesthetic:
  - Hero Display: `clamp(2.5rem, 5.5vw + 1rem, 4.75rem)` with `1.08` line-height.
  - Section Headings: `clamp(2rem, 3.5vw + 0.5rem, 3.25rem)` with `1.15` line-height.
- **Palette Semantics:**
  - Dark Canvas Surfaces: Obsidian Black (`#0D0D0E`), Card Dark (`#151518`), Dark Card Hover (`#1C1C20`).
  - Light Canvas Surfaces: Warm Minimalist Gray (`#F7F7F6`), Pure White (`#FFFFFF`), Card Subtle (`#EFEFEA`).
  - Accent Tokens: Deep Obsidian (`#0D0D0E`), Emerald Clinical Trust (`#10B981`), Warm Terracotta Accent (`#C86D48`).
- **Elevation & Radii:** Alivio-style extra-large corner radii (`--sp-radius-xl: 28px`), circular pill buttons (`--sp-radius-pill: 9999px`), and layered ambient drop shadows (`--sp-shadow-dark-card`).

### Motion Opportunities & Scrolling Effects
- **Hero Entrance Timeline:** GSAP staggered reveal sequentially introducing the HSA/FSA pill badge, main headline, subhead, dual pill buttons, and bottom notes bar.
- **Desktop Hero Parallax:** Restrained `ScrollTrigger` scrub on `.sp-hero-img` (`yPercent: 8, scrub: 0.5`) providing subtle physical depth without layout shift.
- **Interactive How-It-Works Dynamic Switching:** Clicking any of the 4 step pills (`.hiws_pill-step`) executes a smooth crossfade of the headline, body copy, mini-FAQ buttons, and tablet dashboard screen.
- **Membership Table Stagger:** Staggered lateral slide-in (`x: -12` to `0`, `stagger: 0.05s`) on table rows as the user scrolls into view.
- **Reduced Motion Adherence:** Bypasses all tweens and pins if `prefers-reduced-motion: reduce` is detected.

### Accessibility Review
- **WCAG 2.1 AA/AAA Compliance:** High contrast text on dark hero surfaces (`#FFFFFF` on `#0D0D0E`, ratio > 18:1) and light body surfaces (`#0D0D0E` on `#F7F7F6`, ratio > 16:1).
- **Interactive State & Keyboard Navigation:**
  - Full keyboard accessibility on all buttons, links, accordion triggers, and step pills (`Tab`, `Enter`, `Space`, `Esc`).
  - Accessible focus rings via `:focus-visible { outline: 2px solid #0D0D0E; outline-offset: 3px; }`.
  - Step navigation buttons declare `role="tab"` and dynamic `aria-selected="true/false"`.

### Frontend Implementation
- **Zero Frameworks:** Clean Vanilla HTML5, modern Vanilla CSS custom properties, and modular ES6 JavaScript (`main.js`, `how-it-works.js`, `navigation.js`, `accordion.js`, `motion.js`).
- **Image Optimization:** Critical hero image preloaded via `<link rel="preload">`; below-the-fold assets use native `loading="lazy"`.

---

## 3. Bespoke Image Inventory (Alivio Visual Language)

1. **`assets/images/sp-hero-precision.jpg` (16:9 widescreen):**
   - *Subject:* Precision apothecary amber glass bottle with minimalist white typography and a matte obsidian subcutaneous medication pen on slate and frosted glass with cinematic rim lighting.
2. **`assets/images/sp-device-dashboard.jpg` (16:9 tablet landscape):**
   - *Subject:* Apple iPad tablet resting on concrete medical desk displaying the dark-mode clinical dashboard, metabolic curves, hormone markers, and doctor consultation status.
3. **`assets/images/sp-protocol-action.jpg` (16:9 modern portrait):**
   - *Subject:* Confident patient holding a minimalist wellness kit and health app in a sunlit architectural clinical reception.
4. **Preserved Supporting Assets:**
   - `doctor-profile.jpg` (Physician leadership)
   - `privacy-box.jpg` (100% unprinted kraft parcel delivery)
   - `cat-metabolic.jpg`, `cat-hair.jpg`, `cat-hormones.jpg` (Care protocol pillars)
