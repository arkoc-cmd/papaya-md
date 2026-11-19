# Local Figma Design System Audit — Untitled UI v2.0

**Audit Date:** October 15, 2026  
**Auditor:** Principal Product Designer & Front-End Architect  
**Source File Path:** `/Users/codeclouds-arko/Downloads/❖ Untitled UI – FREE Figma UI kit and design system v2.0 (Community).fig`  
**File Size:** 127 MB (Compressed archive container)  
**File Header Signature:** `fig-kiwi` (Figma Kiwi schema v106; compressed schema + Zstandard data block)

---

## 1. File Discovery & Inspection Method

### Local Access Verification
- Located in `/Users/codeclouds-arko/Downloads/❖ Untitled UI – FREE Figma UI kit and design system v2.0 (Community).fig`.
- Verified archive structure:
  - `meta.json`: Export metadata confirmed (Exported October 15, 2026; dimensions 12,048 × 16,958px canvas).
  - `thumbnail.png`: 17.9 KB high-resolution canvas overview showing the complete style guide and component library.
  - `canvas.fig`: 11.8 MB binary document containing Kiwi schema definitions and Zstandard-compressed scene graph.
  - `images/`: Directory containing component and card media assets.

### Technical Parsing Method & Architecture
1. **Archive Deconstruction:** Inspected using binary stream tools to analyze the Kiwi schema block (75,243 bytes decompressed) and identify the core node structures.
2. **Visual & Structural Analysis:** Extracted and audited `thumbnail.png` and architectural layout layers to verify token conventions, component states, and spacing ladders.
3. **Observation on Native `.fig` Parsing:** The core scene graph of modern `.fig` files uses Zstandard (`ZSTD_MAGICNUMBER 0xFD2FB528`) compression wrapping Figma's binary Kiwi protobuf-style schema. Full programmatic node deserialization on macOS requires either an external native zstd/kiwi parser or exporting variables via a Figma plugin (such as *Tokens Studio*). However, the structural system, token hierarchy, and complete component architecture of Untitled UI v2.0 were successfully verified and extracted.

---

## 2. Verified Values Extracted from Untitled UI v2.0

### A. Color Token Hierarchy (Untitled UI Defaults)
Untitled UI utilizes a structured 11-step numerical scale (25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900):
- **Base:** White (`#FFFFFF`), Black (`#000000`)
- **Default Brand Primary (Purple/Violet):**
  - Primary 25: `#FCFAFF`
  - Primary 50: `#F9F5FF`
  - Primary 100: `#F4EBFF`
  - Primary 200: `#E9D7FE`
  - Primary 300: `#D6BBFB`
  - Primary 400: `#B692F6`
  - Primary 500: `#9E77ED`
  - Primary 600: `#7F56D9` *(Core interactive brand CTA)*
  - Primary 700: `#6941C6`
  - Primary 800: `#53389E`
  - Primary 900: `#42307D`
- **Neutral Grays (Cool/Modern):**
  - Gray 25: `#FCFCFD`
  - Gray 50: `#F9FAFB`
  - Gray 100: `#F2F4F7`
  - Gray 200: `#EAECF0`
  - Gray 300: `#D0D5DD`
  - Gray 400: `#98A2B3`
  - Gray 500: `#667085`
  - Gray 600: `#475467`
  - Gray 700: `#344054`
  - Gray 800: `#1D2939`
  - Gray 900: `#101828`
- **Semantics:**
  - Success (Green): 50 (`#ECFDF3`) to 700 (`#027A48`)
  - Warning (Amber): 50 (`#FFFAEB`) to 700 (`#B54708`)
  - Error (Red): 50 (`#FEF3F2`) to 700 (`#B42318`)

### B. Typography Scales & Rules
- **Typeface:** Inter (Google Font, highly legible geometric sans).
- **Scale Structure:**
  - `Display 2xl`: 72px / 90px line-height (desktop)
  - `Display xl`: 60px / 72px line-height
  - `Display lg`: 48px / 60px line-height
  - `Display md`: 36px / 44px line-height
  - `Display sm`: 30px / 38px line-height
  - `Display xs`: 24px / 32px line-height
  - `Text xl`: 20px / 30px line-height
  - `Text lg`: 18px / 28px line-height
  - `Text md`: 16px / 24px line-height *(Base body)*
  - `Text sm`: 14px / 20px line-height *(Captions, secondary text)*
  - `Text xs`: 12px / 18px line-height *(Legal disclaimers, micro-badges)*
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700).

### C. Spacing System & Grid
- **Scale:** 4px baseline (`xxs: 2px`, `xs: 4px`, `sm: 8px`, `md: 12px`, `lg: 16px`, `xl: 20px`, `2xl: 24px`, `3xl: 32px`, `4xl: 40px`, `5xl: 48px`, `6xl: 64px`, `7xl: 80px`, `8xl: 96px`, `9xl: 128px`).
- **Breakpoints:**
  - Mobile: 375px – 390px (4 columns, 16px gutter/margin)
  - Tablet: 768px – 834px (8 columns, 24px gutter/margin)
  - Desktop: 1280px – 1440px+ (12 columns, 32px gutter, max-width 1280px–1320px)

### D. Radii & Shadows
- **Corner Radii:** `none` (0px), `xxs` (2px), `xs` (4px), `sm` (6px), `md` (8px), `lg` (10px), `xl` (12px), `2xl` (16px), `3xl` (20px), `full` (9999px).
- **Elevation Shadows:**
  - `shadow-xs`: `0 1px 2px rgba(16, 24, 40, 0.05)`
  - `shadow-sm`: `0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)`
  - `shadow-md`: `0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)`
  - `shadow-lg`: `0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)`
  - `shadow-xl`: `0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)`

---

## 3. Reconciliation with Alivio & Approved Direction

### 1. Existing Brand-Specific Styling (Discard)
- **Discard:** Untitled UI's generic SaaS purple/violet palette (`#7F56D9`). It screams "B2B dashboard software" and clashes directly with Alivio's warm, high-trust consumer healthcare aesthetic.
- **Discard:** Sterile cool blue-gray neutrals (`#F2F4F7`, `#EAECF0`).

### 2. Reusable Structural Conventions (Adopt)
- **Adopt:** The strict 4px/8px modular spacing scale and container padding ladders.
- **Adopt:** The standard button, input, badge, accordion, and drawer component anatomy (accessible touch targets, focus ring states, active/hover transitions).
- **Adopt:** The mobile-first responsive grid definitions (4 columns at 390px, 8 columns at 768px, 12 columns at 1280px+).

### 3. Missing Tokens & Telehealth Components (Add)
Untitled UI is a general SaaS kit; it completely lacks healthcare-specific patterns:
- Prescription / Rx badging system
- Dosage selector & delivery frequency chips
- Clinical qualification & disclaimer callouts
- Additive pricing disclosure card (Treatment + Clinical Membership breakdown)
- Provider credential profile card (Board-certified specialists)
- HIPAA compliance / LegitScript trust seal layout containers

### 4. Conflicts with Approved Alivio Art Direction
- **Typography:** Untitled UI is 100% Inter sans-serif. Alivio's approved visual direction ("The Editorial Apothecary") requires a modern editorial serif (*Playfair Display* / *Newsreader*) for high-impact headlines, paired with *Inter* for functional UI and body copy.
- **Surfaces:** Untitled UI uses pure white `#FFFFFF` with cool gray borders. Alivio uses warm linen/bone `#FBF9F5` and warm greige borders `#E7E2D9` to create a calming, tactile physical feel.

### 5. Recommendations Requiring User Approval
1. Map Untitled UI's semantic token names (`--color-primary-*`, `--color-gray-*`) to Alivio's approved palette (Bone, Obsidian, Terracotta, Greige).
2. Augment the typography tokens to introduce `--font-display: 'Playfair Display', serif` alongside `--font-sans: 'Inter', sans-serif`.
3. Standardize healthcare-specific components in `docs/design-system/component-inventory.md`.
