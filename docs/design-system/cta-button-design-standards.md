# Alivio CTA Button Design Standards & Specification

## Overview
This document establishes the strict, unified CTA button architecture for **Alivio** across desktop, tablet, and mobile breakpoints. Every primary action across the hero, product discovery, how it works, hormone care slider, testimonials, and patient intake must adhere strictly to these tokenized values.

---

## 1. Master Button Anatomy

| Element | Specification & Values |
| :--- | :--- |
| **Shape & Radius** | Fully rounded pill container (`border-radius: 9999px`) |
| **Height & Dimensions** | Strict uniform height: `height: 44px; min-height: 44px; max-height: 44px; box-sizing: border-box;` across all breakpoints (Desktop, Tablet, Mobile). |
| **Padding** | `6px 6px 6px 20px` (Desktop & Tablet), `6px 6px 6px 14px` (Mobile) |
| **Typography** | `Inter`, `font-size: 0.94rem`, `font-weight: 600`, `line-height: 1`, `letter-spacing: -0.01em` |
| **Text Alignment** | Optically centered label. On mobile, text is cleanly centered with the disk anchored to the right. |
| **Right Icon Disk** | `32px × 32px` circular disk (`border-radius: 50%`, `flex-shrink: 0`) |
| **Icon Standard** | Right chevron (`viewBox="0 0 16 16"`, `stroke-width="2.2"`, `d="M6 12l4-4-4-4"`), centered with `line-height: 0` |
| **Zero Green Rule** | Strictly ZERO green color across all CTAs, arrow disks, arrows, borders, and hover states. |
| **Soft Elevation** | Subdued, subtle natural shadow: `0 2px 8px rgba(38, 13, 3, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)` |
| **Hover Interaction** | Subtle `-2px` lift; disk expands smoothly (`scale(1.08) translateX(2px)`) |

---

## 2. Master Surface Variants (Benchmark: [Explore Women’s Hormone Care])

### Variant A — Dark Canvas (Hero Card, Deep Banners)
- **Primary Pill:** Pure White (`#FFFFFF`) background, Rust Terracotta text (`#5B2008`).
- **Disk:** Rust Terracotta background (`#5B2008`), Warm Apricot Cream chevron arrow (`#FFEBC4`).
- **Secondary Pill (Hero Glass):** Translucent Apricot Cream (`background: rgba(255, 235, 196, 0.12); border: 1px solid rgba(255, 235, 196, 0.35); color: #FFEBC4; backdrop-filter: blur(14px)`).
- **Secondary Disk:** Glass-morphism circle with Warm Apricot Cream chevron arrow (`#FFEBC4`). Strictly matched to 44px height.

### Variant B — Light Canvas (Sections, Care Cards, How It Works)
- **Primary Pill:** Rust Terracotta (`#5B2008`) background, Pure White text (`#FFFFFF`).
- **Disk:** Warm Apricot Cream background (`#FFEBC4`), Rust Terracotta chevron arrow (`#5B2008`).

---

## 3. Global Heading Typography Standard
- **Strict Regular Weight & Tracking:** All headings (`h1`, `h2`, `h3`, `h4`, `.auth-title`, `.sp-heading-h1`, `.sp-heading-h2`, etc.) must strictly use `Inter`, regular font weight `400`, and `-0.03em` letter-spacing:
  ```css
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-weight: 400 !important;
  letter-spacing: -0.03em !important;
  ```
  No bold (700) or semi-bold (600) weights on headings.

---

## 4. Navigation & Hamburger Drawer Standards
- **Header Floating Navbar:**
  - Desktop: Includes inline links, User Login Icon button (`nav-user-icon-btn`), Assessment Pill CTA, and Hamburger Drawer Toggle.
  - Mobile (<991px): Retains the User Login Icon button (`display: inline-flex; width: 36px; height: 36px`) alongside the Assessment Pill CTA and Hamburger Drawer Toggle for immediate direct access to patient login.
- **Hamburger Drawer CTA:**
  - Located in `.sp-drawer-footer` pinned to drawer bottom.
  - Background: Terracotta rust `#5B2008` (100% width, 44px uniform height).
  - Label: White `#FFFFFF`, centered (`flex: 1; text-align: center`).
  - Circular Disk: Signature warm apricot cream `#FFEBC4` with terracotta rust arrow `#5B2008`.
  - Zero green styling.
  - Treatment Items: Rendered as clean, unboxed rows (thumb box + treatment name + subtle arrow) with zero background container bar.

---

## 5. Responsive Breakpoint Matrix

### Desktop (`>= 992px`)
- **Container Sizing:** Natural inline-flex width conforming to label text length (`width: auto`, `min-width: 180px - 220px`). Height is locked to 44px.
- **Disk Sizing:** `32px` diameter, positioned cleanly on the right with `margin-left: 12px`.

### Tablet & Mobile (`< 768px`)
- **Strict 44px Height:** Height remains locked to 44px matching desktop and tablet.
- **Centered Text:** CTA label text is centered in the pill container.
- **Natural Content Fit:** Pill containers fit content naturally without forced awkward stretching or excessive padding.
