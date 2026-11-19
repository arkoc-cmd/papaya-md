# Pre-Development Implementation Specification — Alivio Homepage

**Brand Name:** Alivio  
**Target Viewport Baseline:** Mobile-First (390px) → Tablet (768px - 834px) → Desktop (1280px - 1440px+)  
**Art Direction:** The Editorial Apothecary (Warm Bone `#FBF9F5`, Deep Obsidian `#18181B`, Terracotta `#A35C3E`, Muted Pine `#4A6B5D`)  
**Typography:** Playfair Display (Editorial Display Serif) + Inter (Precision Sans)  
**Infrastructure Integration:** Alivio Telehealth Infrastructure Headless Clinical Engine (Intake Form Builder, Provider EMR, Pharmacy Routing)  
**Strict Directives:** Vanilla HTML5, Vanilla CSS (Design Tokens, Custom Properties), Modular Vanilla JavaScript, GSAP + ScrollTrigger (purposeful & reduced-motion compliant). Zero frontend frameworks (no React, Next.js, Vue, Svelte). Zero Python.

---

## 1. Production File & Directory Architecture

```
/Users/codeclouds-arko/Desktop/Telehealth Mockup/
├── index.html                   # Semantic HTML5 single-page homepage application
├── assets/
│   ├── css/
│   │   ├── tokens.css           # CSS Custom Properties (Colors, Type scale, Spacing, Elevation)
│   │   ├── reset.css            # Modern CSS reset & baseline box-sizing
│   │   ├── typography.css       # Font face rules, fluid scale clamp(), editorial styles
│   │   ├── components.css       # Buttons, cards, pills, badges, modal drawer, accordions
│   │   ├── sections.css         # Section-specific layout rules (Hero, Pillars, Journey, FAQ)
│   │   └── main.css             # Root import manifest & global utility definitions
│   ├── js/
│   │   ├── modules/
│   │   │   ├── navigation.js    # Mobile drawer state, scroll lock, accessible ARIA traps
│   │   │   ├── accordion.js     # FAQ disclosure panels with smooth height transitions
│   │   │   ├── category-rail.js # Horizontal touch-drag & scroll snap observers
│   │   │   └── motion.js        # GSAP timelines, ScrollTrigger reveals, reduced-motion bypass
│   │   └── main.js              # Application entry point & ES module bootstrapping
│   └── images/
│       ├── hero-treatment.webp  # Hero Module A: Apothecary bottle & pen on travertine
│       ├── hero-vitality.webp   # Hero Module B: Relatable patient portrait in natural light
│       ├── cat-metabolic.webp   # Care Pillar 1: Metabolic & weight wellness still life
│       ├── cat-hair.webp        # Care Pillar 2: Amber dropper bottle & hair ritual
│       ├── cat-hormones.webp    # Care Pillar 3: Serene morning wellness routine
│       ├── doctor-profile.webp  # Clinical Director: Board-certified physician portrait
│       ├── privacy-box.webp     # Discretion: 100% unmarked kraft packaging box
│       └── icons/               # Inline SVG glyphs for clinical markers & navigation
└── docs/                        # Project governance, strategy, design system & UX specifications
```

---

## 2. Semantic HTML5 Section Blueprint

The homepage will be structured into distinct semantic regions with unique IDs for testing and accessibility:

1. **`#utility-notice` (`<aside>` / `<div role="region" aria-label="Clinical Notice">`):**
   - Top banner indicating state eligibility and discreet cold-chain delivery.
2. **`#site-header` (`<header>` + `<nav aria-label="Main Navigation">`):**
   - Sticky floating container with Alivio editorial wordmark, desktop navigation links, right-aligned Patient Portal link, and primary *"Start Free Assessment"* CTA button.
   - Includes `<button aria-expanded="false" aria-controls="mobile-drawer">` for mobile viewports.
3. **`#mobile-drawer` (`<div role="dialog" aria-modal="true" aria-label="Navigation Menu">`):**
   - Off-canvas full-screen navigation with focus trapping, large-type category links, and quick-action intake button.
4. **`#hero` (`<section aria-labelledby="hero-title">`):**
   - `<h1>` with dual-font hierarchy (*"The medical care your body actually deserves"*).
   - Value proposition paragraph, CTA cluster, trust badge strip, and dual visual modules (`#hero-treatment-card` and `#hero-vitality-card`).
5. **`#category-rail` (`<section aria-labelledby="categories-title">`):**
   - Horizontally scrollable category discovery strip containing 5 interactive pills: Weight & Metabolic, Hair Restoration, Hormonal Health, Skin & Dermatology, Longevity Labs.
6. **`#care-pillars` (`<section id="treatments" aria-labelledby="pillars-title">`):**
   - 3 comprehensive treatment cards (`<article>`) detailing clinical protocols, what's included, dosage format, and clear pricing ranges.
7. **`#how-it-works` (`<section aria-labelledby="journey-title">`):**
   - Numbered 3-step timeline: Digital Intake (5 mins) → Physician Evaluation → Doorstep Delivery.
8. **`#clinical-oversight` (`<section aria-labelledby="clinical-title">`):**
   - Physician-led credibility narrative, board certification credentials, ongoing asynchronous check-ins, EMR infrastructure note.
9. **`#pricing-transparency` (`<section id="pricing" aria-labelledby="pricing-title">`):**
   - Additive pricing calculator / breakdown card disaggregating treatment medication from unlimited clinical physician support.
10. **`#discretion-privacy` (`<section aria-labelledby="privacy-title">`):**
    - Unmarked packaging visual, HIPAA 256-bit encryption assurance, LegitScript certification.
11. **`#faq` (`<section id="faq" aria-labelledby="faq-title">`):**
    - 5 accessible disclosure accordions (`<details>` or button/div pairs with `aria-expanded`).
12. **`#final-cta` (`<section aria-labelledby="cta-title">`):**
    - High-conversion closing banner with direct intake trigger.
13. **`#site-footer` (`<footer role="contentinfo">`):**
    - Regulatory disclosures, medical disclaimers, category directory, copyright, Alivio Telehealth Infrastructure clinical platform notice.

---

## 3. CSS Architecture & Design Token System

### A. Root Design Tokens (`tokens.css`)
```css
:root {
  /* Surface & Canvas Tokens (The Editorial Apothecary) */
  --color-canvas-bg: #FBF9F5;         /* Warm Bone / Linen */
  --color-canvas-elevated: #F2EDE4;   /* Warm Oatmeal Card Surface */
  --color-canvas-subtle: #EFE9DE;     /* Light Muted Greige */
  --color-canvas-dark: #18181B;       /* Deep Obsidian Surface */

  /* Text & Ink Tokens */
  --color-text-primary: #18181B;      /* Deep Obsidian (14.2:1 contrast) */
  --color-text-secondary: #52525B;    /* Muted Slate / Zinc 600 */
  --color-text-tertiary: #71717A;     /* Subtle Zinc 500 */
  --color-text-inverse: #FBF9F5;      /* Warm Bone Text on Dark */

  /* Brand Action & Trust Accents */
  --color-accent-action: #A35C3E;     /* Warm Terracotta Pill */
  --color-accent-action-hover: #8B4A2F;
  --color-accent-trust: #4A6B5D;      /* Deep Pine (Clinical Authority) */
  --color-border-hairline: #E7E2D9;   /* Warm Greige Structural Line */
  --color-border-strong: #D5CEC2;     /* Card Focus / Hover Border */

  /* Semantic Health Status */
  --color-status-rx: #2D5A43;         /* Deep Forest Green */
  --color-status-rx-bg: #EAF2ED;      /* Soft Sage Pill Background */

  /* Typography Families */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Fluid Spacing Scale (8pt Baseline) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  /* Elevation Shadows */
  --shadow-card: 0 4px 20px -2px rgba(24, 24, 27, 0.04);
  --shadow-card-hover: 0 12px 32px -4px rgba(24, 24, 27, 0.08);
  --shadow-drawer: -8px 0 32px rgba(24, 24, 27, 0.12);

  /* Corner Radii */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;

  /* Layout Boundaries */
  --container-max: 1320px;
  --header-height: 72px;
}
```

### B. Fluid Typography Scale (`typography.css`)
```css
/* Fluid scale clamps matching mobile-to-desktop viewports */
h1, .text-display-hero {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw + 1rem, 4.25rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 500;
}

h2, .text-display-section {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3vw + 0.75rem, 2.75rem);
  line-height: 1.22;
  letter-spacing: -0.015em;
  font-weight: 500;
}

h3, .text-display-card {
  font-family: var(--font-sans);
  font-size: clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem);
  line-height: 1.35;
  font-weight: 600;
  letter-spacing: -0.01em;
}

body, p {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 0.25vw + 0.95rem, 1.125rem);
  line-height: 1.6;
  color: var(--color-text-secondary);
}
```

---

## 4. Vanilla JavaScript Responsibilities (`assets/js/`)

JavaScript is strictly modular, self-contained, and event-delegated:

1. **Navigation Module (`navigation.js`):**
   - Handles hamburger toggle, mobile off-canvas drawer open/close.
   - Manages body scroll-lock (`overflow: hidden; touch-action: none;`) when drawer is active.
   - Implements full keyboard navigation (Escape to close, Tab trapping within drawer).
2. **Accordion Module (`accordion.js`):**
   - Handles FAQ section disclosures.
   - Smoothly animates CSS `grid-template-rows: 0fr` to `1fr` for seamless, lag-free height expansion.
   - Synchronizes `aria-expanded="true/false"` and `aria-hidden` attributes.
3. **Category Rail Observer (`category-rail.js`):**
   - Observes lateral scroll position of the 5-item category strip.
   - Highlights active pill as user scrolls past corresponding sections.
4. **Motion Engine (`motion.js`):**
   - Initializes GSAP and ScrollTrigger only if `window.matchMedia('(prefers-reduced-motion: no-preference)').matches`.
   - Bypasses all animation timelines instantly if reduced motion is requested by the operating system.

---

## 5. Purposeful GSAP & ScrollTrigger Motion Choreography

Animations are restrained, purposeful, and designed to guide user focus without causing distraction or lag:

1. **Hero Staggered Entrance:**
   - Elements: Announcement badge, `<h1>`, subhead, CTA pill group, and split cards.
   - Animation: Subtle vertical rise (`y: 20` to `y: 0`, `opacity: 0` to `1`, `duration: 0.7s`, `stagger: 0.08s`, `ease: "power2.out"`).
2. **ScrollTrigger Section Reveals:**
   - Cards in `#care-pillars` and steps in `#how-it-works` gently fade in with a 15px rise as they enter the bottom 20% of the viewport.
   - Uses `ScrollTrigger.batch()` for GPU-efficient bulk tweening.
3. **Sticky Pill Header State:**
   - As the user scrolls past the hero section, the floating pill header gently narrows its padding and increases its backdrop blur (`backdrop-filter: blur(20px); background: rgba(251, 249, 245, 0.92);`).
4. **Reduced-Motion Guarantee:**
   ```javascript
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
     // Instantly set all animated elements to their final resting state
     gsap.set('.reveal-on-scroll, .hero-element', { opacity: 1, y: 0 });
     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
   }
   ```

---

## 6. Responsive Breakpoint Matrix

| Viewport Tier | Range | Grid & Layout Behavior |
| :--- | :--- | :--- |
| **Mobile Baseline** | `375px – 480px` (390px baseline) | Single-column stack; 16px lateral margins; full-width buttons (min 48px height); horizontally swipeable category pill track; hamburger drawer navigation. |
| **Mobile Large / Phablet**| `481px – 767px` | 1-to-2 column fluid card adaptation; 20px lateral margins; hero split cards stack vertically. |
| **Tablet** | `768px – 1024px` | 2-column card grid; 24px margins; floating pill navigation visible; split hero cards sit side-by-side. |
| **Desktop Baseline** | `1025px – 1320px` | 12-column grid; 32px gutters; max container width 1320px; sticky header with dropdown hover states; side-by-side pricing calculation. |
| **Wide Desktop** | `1321px+` | Centered 1320px canvas with luxurious lateral whitespace (`margin: 0 auto;`). |

---

## 7. Interactive Elements, Form & CTA Destinations

All interactive anchors and buttons are mapped to structured, realistic destinations:
- **Primary Hero CTA:** `"Start Free Clinical Assessment"` → `href="#intake-entry"` (triggers Alivio Telehealth Infrastructure intake modal or links to `/intake/start`).
- **Category Discovery Pills:**
  - Weight & Metabolic → `href="#care-pillars"` (filters to Card 1)
  - Hair Restoration → `href="#care-pillars"` (filters to Card 2)
  - Hormonal Vitality → `href="#care-pillars"` (filters to Card 3)
  - Skin & Dermatology → `href="#care-pillars"`
  - Longevity & Labs → `href="#care-pillars"`
- **Header "Log In":** `href="#portal-login"` (Patient Portal login dialog / endpoint).
- **FAQ Triggers:** Accessible `<button class="faq-question" aria-expanded="false">`.
- **Final CTA:** `"Get Started Online"` → `href="#intake-entry"`.

---

## 8. Asset Loading Strategy & Performance Budgets

- **Image Formats:** All assets converted to modern WebP with explicit width/height attributes to prevent Cumulative Layout Shift (CLS).
- **Hero Image Priority:** `#hero-treatment-still-life` loaded with `<link rel="preload" as="image">` and `fetchpriority="high"` for immediate Largest Contentful Paint (LCP < 1.2s).
- **Lazy Loading:** All below-the-fold imagery (`#cat-*`, `#doctor-profile`, `#privacy-box`) tagged with `loading="lazy"` and `decoding="async"`.
- **Performance Targets:**
  - LCP (Largest Contentful Paint): `< 1.5s` on mobile 4G.
  - CLS (Cumulative Layout Shift): `0.00`.
  - INP (Interaction to Next Paint): `< 100ms`.
  - Total Initial Page Weight: `< 650 KB` (including fonts, CSS, JS, and compressed WebP imagery).

---

## 9. Accessibility & WCAG 2.1 AA/AAA Conformance

- **Color Contrast:** Deep Obsidian (`#18181B`) on Warm Bone (`#FBF9F5`) yields **14.2:1**, far exceeding the 7:1 AAA requirement. Terracotta action buttons (`#A35C3E`) on Bone yield **5.1:1**, exceeding the 4.5:1 AA requirement.
- **Focus Management:** Global visible focus ring:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-text-primary);
    outline-offset: 3px;
  }
  ```
- **Semantic HTML5:** Strict hierarchy (`h1` → `h2` → `h3`) with zero skipped levels.
- **Screen Reader Announcements:** ARIA live regions for interactive pricing calculators and drawer open states.
- **Touch Target Sizing:** All mobile buttons and clickable pills adhere to a minimum bounding box of **48 × 48px**.

---

## 10. Acceptance Criteria Checklist

- [ ] Homepage renders flawlessly from mobile (390px) up to ultra-wide desktop (1440px+).
- [ ] Brand name **Alivio** is consistently applied across all hero, body, and footer copy.
- [ ] The Editorial Apothecary visual direction is faithfully manifested (warm bone canvas, obsidian text, terracotta pills, hairline borders).
- [ ] No frontend frameworks (React/Vue/Next.js) or Python are used.
- [ ] GSAP and ScrollTrigger execute smoothly and degrade gracefully to static layouts when `prefers-reduced-motion` is active.
- [ ] Mobile navigation drawer opens smoothly, locks body scroll, and traps keyboard focus.
- [ ] All FAQ accordion items expand and collapse with accessible ARIA state synchronization.
- [ ] Zero unverified medical claims or guaranteed outcomes are made; all clinical disclaimers are prominently displayed.
- [ ] Underlying Alivio Telehealth Infrastructure platform is appropriately attributed as clinical infrastructure without confusing consumer brand identity.

---

## 11. Unresolved Business, Clinical & Legal Items (Requiring Client Sign-Off)

1. **Target State Licensing:** Specific U.S. states where Alivio Telehealth Infrastructure's clinician network is authorized to prescribe at launch (currently templated as `[Target States Placeholder]`).
2. **Exact Treatment Pricing:** Final commercial pricing tiers for compounded Semaglutide, Tirzepatide, and topical formulations (currently templated as `[From $XX/mo]`).
3. **Compound Pharmacy Partner Disclosure:** Legal confirmation on whether specific 503A pharmacy names should be explicitly named in the FAQ or kept generic.
4. **Medical Director Formal Sign-Off:** Licensed physician review of all protocol descriptions prior to paid media launch.
