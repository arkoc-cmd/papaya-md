# Section Heading Badge Specification — Alivio Design System

## 1. Overview
This specification standardizes the **Section Heading Badge** across all homepage sections in the Alivio Telehealth web application. All sections adopt the exact structure, typography, micro-geometry, and aesthetic polish established by the **"HOW ALIVIO WORKS"** badge.

---

## 2. Component HTML Architecture
Every section badge uses the identical semantic HTML hierarchy:

```html
<div class="Alivio-pill-badge" aria-label="Section Context">
  <span class="Alivio-badge-icon" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" width="16" height="16">
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 10h6M10 7v6"/>
    </svg>
  </span>
  <span class="Alivio-badge-text">SECTION CONTEXT TEXT</span>
</div>
```

---

## 3. Styling & Token Specifications

### Base Dimensions & Spacing
- **Display**: `inline-flex`
- **Alignment**: `align-items: center`
- **Gap**: `8px`
- **Padding**: `5px 13px`
- **Border Radius**: `999px` (Pill geometry)
- **Border**: `1px solid currentColor` (or semantic border tone matching the background theme)
- **Margin Bottom**: `16px` to `20px` (consistent connection to section heading)

### Typography
- **Font Family**: `var(--sp-font-mono, "SF Mono", Menlo, Consolas, Monaco, monospace)`
- **Font Size**: `0.74rem` (11.8px)
- **Font Weight**: `500` (Medium)
- **Letter Spacing**: `0.08em`
- **Text Transform**: `uppercase`
- **Line Height**: `1`

### Icon Geometry
- **Width/Height**: `16px × 16px`
- **Stroke Width**: `1.6px`
- **Alignment**: Centered with inline flex container

---

## 4. Theme Color Variants

| Surface Theme | Text / Icon Color | Background Fill | Border Stroke |
| :--- | :--- | :--- | :--- |
| **Light Canvas (`#FFFFFF` / `#FFFBEF`)** | `#5B2008` (Dark Terracotta) | `rgba(91, 32, 8, 0.05)` | `rgba(91, 32, 8, 0.18)` |
| **Warm Linen Card (`#FAF2DE`)** | `#070706` (Charcoal Black) | `rgba(7, 7, 6, 0.04)` | `rgba(7, 7, 6, 0.18)` |
| **Forest Green Card (`#2D3622`)** | `#FFEBC4` (Apricot Cream) | `rgba(255, 235, 196, 0.08)` | `rgba(255, 235, 196, 0.24)` |
| **Chestnut Terracotta Card (`#5C2008`)** | `#FFEBC4` (Apricot Cream) | `rgba(255, 235, 196, 0.08)` | `rgba(255, 235, 196, 0.24)` |

---

## 5. Homepage Section Mapping

1. **How Alivio Works (`#how-it-works`)**:
   - Badge Text: `HOW ALIVIO WORKS`
   - Icon: Plus enclosed in circular disk
2. **Treatments Carousel (`#products`)**:
   - Badge Text: `TREATMENTS`
   - Icon: Plus enclosed in circular disk
3. **Personalized Hormone Care (`#care-stories`)**:
   - Badge Text: `OUR APPROACH`
   - Icon: Plus enclosed in circular disk
4. **Patient Stories Testimonial Marquee (`#patient-testimonials`)**:
   - Badge Text: `PATIENT STORIES`
   - Icon: Plus enclosed in circular disk
5. **Frequently Asked Questions (`#faq`)**:
   - Badge Text: `COMMON INQUIRIES`
   - Icon: Plus enclosed in circular disk

---

## 6. Accessibility & Responsiveness
- **Contrast**: Complies with WCAG 2.1 AA with contrast ratio $\ge 4.5:1$ across all light and dark card surfaces.
- **Screen Reader Support**: Semantic text is announced clearly; decorative icon is marked `aria-hidden="true"`.
