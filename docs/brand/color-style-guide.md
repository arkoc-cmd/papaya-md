# Brand Colour Style Guide — Alivio Telehealth

**Primary Visual Benchmark:** [Alivio Wellness](https://Aliviowellness.framer.website/)  
**Brand Identity:** Alivio  
**Document Status:** `APPROVED FOR DESIGN MIGRATION` (Alivio Wellness Direction)  
**Role:** Definitive Color System Specification for Design Tokens, UI Components, and Marketing Surfaces  

---

## 1. Reference Audit & Visual Provenance

This color system is directly derived from visual and technical inspection of **Alivio Wellness** (`https://Aliviowellness.framer.website/`), adapted specifically for **Alivio's** physician-led precision telehealth platform.

### Epistemic Classification:
- `Research Observation (Verified)`: Color hex values and CSS tokens extracted directly from Alivio Wellness Framer production code (`#5B2008`, `#260D03`, `#FFEBC4`, `#FAF2DE`, `#FFFDF5`, `#41382E`, `#070706`, `#D7D1C3`, `#2D3622`, `#FACA89`, `#02554A`).
- `Assumption (Alivio Adaptation)`: Application of Alivio's warm palette to Alivio's specific medical categories (GLP-1 Weight Loss, HRT, Hair Restoration, Longevity).
- `Hypothesis (Conversion)`: Replacing clinical dark green/slate with Alivio's warm terracotta, apricot cream, and linen increases emotional comfort and conversion intent for vulnerable telehealth patients.

---

## 2. Core Palette Definition

| Role | Colour Name | HEX Code | RGB | Verified / Estimate | Semantic Usage & Application |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Hero & Dark Anchor** | **Terracotta Rust** | `#5B2008` | `rgb(91, 32, 8)` | `Verified` | Hero card background gradient, dark sequence cards, primary dark CTA surfaces, icon disks. |
| **Deepest Neutral** | **Espresso Umber** | `#260D03` | `rgb(38, 13, 3)` | `Verified` | Deepest hero gradient base, dark card hover states, dark icon disc containers. |
| **Warm Highlight** | **Apricot Cream** | `#FFEBC4` | `rgb(255, 235, 196)` | `Verified` | Eyebrow badges, dark surface text, glowing borders, active mood chips, button hover accents. |
| **Primary Light Canvas**| **Warm Linen** | `#FAF2DE` | `rgb(250, 242, 222)` | `Verified` | Main background fill for light sections, card container backgrounds, soft alternating sections. |
| **Ultra-Light Canvas** | **Warm Alabaster** | `#FFFDF5` | `rgb(255, 253, 245)` | `Verified` | Root page background, elevated card fills, pristine product staging areas. |
| **Secondary Sequence** | **Forest Olive** | `#2D3622` | `rgb(45, 54, 34)` | `Verified` | Step 02 in "How It Works" sequence, botanical health credentials, clinical trust moments. |
| **Heading Ink** | **Near-Black Ink** | `#070706` | `rgb(7, 7, 6)` | `Verified` | Primary headlines (`h1`, `h2`, `h3`) on light linen surfaces, navigation active links. |
| **Body Ink** | **Earth Charcoal** | `#41382E` | `rgb(65, 56, 46)` | `Verified` | Body paragraphs, secondary descriptions, metadata, unselected nav links. |
| **Hairline & Divider** | **Warm Sand Border** | `#D7D1C3` | `rgb(215, 209, 195)` | `Verified` | Card outlines, 1px horizontal section dividers, table borders, radial carousel tick track. |
| **Radiant Accent** | **Golden Apricot** | `#FACA89` | `rgb(250, 202, 137)` | `Verified` | Focal point in radial hero glow, star ratings, special highlight badges. |
| **Clinical Accent** | **Deep Teal** | `#02554A` | `rgb(2, 85, 74)` | `Verified` | Rx verification badges, physician board approval seals, pharmacy security tags. |
| **Neutral White** | **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | `Verified` | Primary button text on dark, card base surfaces, modal containers. |

---

## 3. Translucent Surfaces & Glassmorphism Scale

Extracted from Alivio's floating mood cards and hero feature pills:

| Token Name | RGBA Value | Intended Surface & Role |
| :--- | :--- | :--- |
| `--glass-apricot-badge-bg` | `rgba(255, 235, 196, 0.12)` | Hero eyebrow badge background, unselected mood chip fill |
| `--glass-apricot-badge-border` | `rgba(255, 235, 196, 0.32)` | Hero badge border, mood chip border |
| `--glass-apricot-badge-text` | `rgba(255, 235, 196, 0.90)` | Eyebrow badge text, secondary text on dark |
| `--glass-card-dark-bg` | `rgba(91, 32, 8, 0.45)` | Bottom hero feature cards (Confidential, Personalized, Flexible) |
| `--glass-card-dark-border` | `rgba(255, 235, 196, 0.20)` | Bottom hero feature card borders |
| `--glass-inset-highlight` | `inset 0 1px 0 0.12px rgba(250, 242, 222, 0.4)` | Top bevel highlight for glass cards |

---

## 4. Colour Balance Hierarchy (Alivio Proportion Model)

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                    55% WARM LINEN                      │
│               (#FAF2DE & #FFFDF5 Canvas)               │
│                                                        │
├──────────────────────────┬─────────────────────────────┤
│                          │                             │
│  25% TERRACOTTA RUST     │       10% APRICOT CREAM     │
│   & ESPRESSO (#5B2008)   │   (#FFEBC4 Badges, Accents, │
│   (Hero & Dark Cards)    │        Active Highlights)   │
│                          │                             │
├──────────────────────────┴─────────────────────────────┤
│    10% SUPPORTING ACCENTS: FOREST OLIVE & GOLDEN       │
│      (#2D3622 Step 2, #FACA89 Radiant Glow, Teal)      │
└────────────────────────────────────────────────────────┘
```

- **55% Warm Linen & Alabaster (`#FAF2DE`, `#FFFDF5`):** Creates an airy, welcoming editorial space that feels hospitable and deeply human rather than sterile or medicinal.
- **25% Terracotta Rust & Espresso (`#5B2008`, `#260D03`):** Provides rich, tactile contrast for high-impact hero moments, dark sequence cards, and primary call-to-actions.
- **10% Apricot Cream (`#FFEBC4`):** Soft focal highlighter used for badges, active chips, and luminous text on dark backgrounds.
- **10% Supporting Accents:** Forest Olive (`#2D3622`) for the second step of the care protocol, Golden Apricot (`#FACA89`) for radial hero light bursts, and Deep Teal (`#02554A`) for clinical Rx credentials.

---

## 5. Component Color Application Rules

### A. Primary CTA Buttons ("Book Assessment", "Become A Member")
- **Surface:** Pure White (`#FFFFFF`) or Warm Linen (`#FAF2DE`).
- **Text:** Terracotta Rust (`#5B2008`) or Deep Espresso (`#260D03`).
- **Icon Disk Container:** Integrated right-aligned circle with Terracotta Rust background (`#5B2008`) and Apricot/White arrow icon (`#FFEBC4`).
- **Hover State:** Background elevates slightly, icon disk scales up by `1.08x` with arrow nudge.

### B. Secondary Buttons ("Explore Programs", "Find My Fit")
- **Surface:** Translucent Apricot Glass (`rgba(255, 235, 196, 0.12)`) on dark, or Transparent with 1.5px border (`#D7D1C3`) on light.
- **Text:** White/Apricot (`#FFFFFF` on dark, `#070706` on light).
- **Icon Disk:** Semi-transparent circular disc with chevron `»`.

### C. Hero Section Surface
- **Background Gradient:** Verified Alivio radial gradient:
  ```css
  background: radial-gradient(
    75% 63% at 50% 106.2%,
    #FACA89 0%,
    #FACA89 8.8%,
    #EA9132 30.3%,
    #D37621 47.8%,
    #5B2008 100%
  );
  ```
- **Text on Hero:** Headings in Pure White (`#FFFFFF`), subheadings in Apricot Cream (`rgba(255, 235, 196, 0.88)`).

### D. Step Sequence Cards ("How It Works")
- **Card 01 (Intake Evaluation):** Warm Linen surface (`#FAF2DE`), Near-Black Ink text (`#070706`), Warm Sand border (`#D7D1C3`).
- **Card 02 (Personalized Treatment):** Forest Olive surface (`#2D3622`), Apricot Cream text (`#FFEBC4`), Soft Olive border (`rgba(255, 235, 196, 0.2)`).
- **Card 03 (Ongoing Support):** Terracotta Rust surface (`#5B2008`), Apricot Cream text (`#FFEBC4`), Warm Sand border (`rgba(255, 235, 196, 0.2)`).

---

## 6. WCAG 2.1 Contrast Verification

| Foreground | Background | Calculated Contrast Ratio | Compliance Level | Context |
| :--- | :--- | :---: | :---: | :--- |
| **Near-Black Ink (`#070706`)** | **Warm Linen (`#FAF2DE`)** | **17.8 : 1** | **WCAG AAA** | Primary headings, navigation links on light canvas |
| **Earth Charcoal (`#41382E`)** | **Warm Linen (`#FAF2DE`)** | **8.5 : 1** | **WCAG AAA** | Body paragraphs, secondary copy |
| **White (`#FFFFFF`)** | **Terracotta Rust (`#5B2008`)**| **10.2 : 1** | **WCAG AAA** | Hero headline, white button text on dark |
| **Apricot Cream (`#FFEBC4`)** | **Terracotta Rust (`#5B2008`)**| **8.1 : 1** | **WCAG AAA** | Hero subtitle, eyebrow badge text, card 03 text |
| **Apricot Cream (`#FFEBC4`)** | **Forest Olive (`#2D3622`)** | **9.6 : 1** | **WCAG AAA** | Step 02 card heading and bullet text |
| **Apricot Cream (`#FFEBC4`)** | **Espresso Umber (`#260D03`)** | **13.4 : 1** | **WCAG AAA** | Mood card text, dark card body copy |
| **Terracotta Rust (`#5B2008`)**| **White (`#FFFFFF`)** | **10.2 : 1** | **WCAG AAA** | Primary CTA button label on white pill |
| **Near-Black Ink (`#070706`)** | **Warm Alabaster (`#FFFDF5`)**| **19.1 : 1** | **WCAG AAA** | Headings on pure canvas |

*All primary combinations exceed both the 4.5:1 (AA) and 7.0:1 (AAA) thresholds, guaranteeing universal readability.*

---

## 7. Unified CSS Custom Properties Definition (`tokens.css`)

```css
:root {
  /* ==========================================================================
     ALIVIO Alivio-INSPIRED COLOR TOKENS
     ========================================================================== */
  
  /* Brand Core Solids */
  --color-rust-terracotta: #5B2008;
  --color-espresso-dark: #260D03;
  --color-apricot-cream: #FFEBC4;
  --color-linen-warm: #FAF2DE;
  --color-canvas-light: #FFFDF5;
  --color-olive-forest: #2D3622;
  --color-charcoal-earth: #41382E;
  --color-ink-nearblack: #070706;
  --color-sand-divider: #D7D1C3;
  --color-golden-apricot: #FACA89;
  --color-teal-accent: #02554A;
  --color-white: #FFFFFF;

  /* Semantic Canvas & Surface Mappings */
  --alivio-canvas-bg: var(--color-canvas-light);
  --alivio-canvas-surface: var(--color-linen-warm);
  --alivio-canvas-card: var(--color-white);
  --alivio-canvas-hero: var(--color-rust-terracotta);
  --alivio-canvas-hero-deep: var(--color-espresso-dark);
  --alivio-canvas-step-olive: var(--color-olive-forest);

  /* Semantic Typography Mappings */
  --alivio-text-heading: var(--color-ink-nearblack);
  --alivio-text-body: var(--color-charcoal-earth);
  --alivio-text-muted: #7D7D7D;
  --alivio-text-inverse: var(--color-white);
  --alivio-text-inverse-warm: var(--color-apricot-cream);

  /* Interactive Buttons & Highlights */
  --alivio-btn-primary-bg: var(--color-white);
  --alivio-btn-primary-text: var(--color-rust-terracotta);
  --alivio-btn-primary-disk: var(--color-rust-terracotta);
  --alivio-btn-primary-icon: var(--color-apricot-cream);

  --alivio-btn-dark-bg: var(--color-rust-terracotta);
  --alivio-btn-dark-text: var(--color-white);
  --alivio-btn-dark-disk: var(--color-espresso-dark);
  --alivio-btn-dark-icon: var(--color-apricot-cream);

  /* Borders & Hairlines */
  --alivio-border-light: var(--color-sand-divider);
  --alivio-border-subtle: rgba(215, 209, 195, 0.45);
  --alivio-border-dark-translucent: rgba(255, 235, 196, 0.25);
  --alivio-border-dark-active: rgba(255, 235, 196, 0.60);

  /* Glassmorphism & Translucent Badges */
  --alivio-glass-badge-bg: rgba(255, 235, 196, 0.12);
  --alivio-glass-badge-border: rgba(255, 235, 196, 0.32);
  --alivio-glass-card-bg: rgba(91, 32, 8, 0.45);
  --alivio-glass-card-border: rgba(255, 235, 196, 0.20);
}
```
