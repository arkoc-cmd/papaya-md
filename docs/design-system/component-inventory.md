# Alivio UI Component Inventory

**Initiative:** AstroMD Telehealth Platform  
**Store 1 Brand:** Alivio (currently implemented under working namespace `Alivio`)  
**Status:** Verified Implementation Baseline  
**Date:** October 2026  
**Auditor:** Principal Product Designer & Front-End Architect  

---

## 1. Overview & Architectural Hierarchy

The Alivio interface is constructed from modular Vanilla CSS components defined across:
- [assets/css/components.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css) (Core reusable components: buttons, cards, pills, accordions, modals)
- [assets/css/sections.css](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css) (Section-level composite components: hero card, header, drawer, marquee, tables)
- [assets/js/modules/](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/) (Interactive behavioral modules)

---

## 2. Component Register

### Component 01: Promotional Pencil Banner
- **DOM Selector:** `.sp-utility-bar`, `.sp-utility-slider`, `.sp-utility-slide`
- **Source:** [assets/css/sections.css:L1-L150](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L1-L150), [assets/js/modules/navigation.js:L67-L84](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/navigation.js#L67-L84)
- **Role & Description:** Sticky top utility and promotional notice bar displaying alternating announcements with automated vertical slide transitions.
- **Visual Composition:** Espresso Umber background (`#260D03`), 12px white/neutral typography, Apricot Cream tags (`#FFEBC4`), phone link with inline SVG handset icon.
- **Behavior & Transitions:**
  - Automated loop cycling every `3500ms` via JavaScript interval.
  - Active slide transitions from `translateY(100%)` to `translateY(0)` with opacity fade.
  - Exiting slide transitions to `translateY(-100%)` with opacity fade over `650ms`.
  - Mobile behavior: Flex-wraps into two centered rows with compact 11px typography to prevent truncation.

### Component 02: Sticky Floating Navigation Header
- **DOM Selector:** `.site-header`, `.nav-pill-container`, `.brand-wordmark`, `.desktop-nav`, `.nav-actions`
- **Source:** [assets/css/sections.css:L152-L350](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L152-L350), [assets/js/modules/navigation.js:L58-L65](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/navigation.js#L58-L65)
- **Role & Description:** Global navigation header anchored at the top of the viewport.
- **Visual Composition:**
  - Floating pill container with transparent background in resting state; gains a pure white backdrop (`#FFFFFF`), subtle border (`rgba(23, 63, 53, 0.1)`), and shadow (`--sp-shadow-md`) when scrolled (`.scrolled` class triggered at `window.scrollY > 15px`).
  - Brand wordmark: Official Alivio SVG vector mark (`brand-logo-svg`, 130px × 45px) with `fill="currentColor"` adapting to surface theme.
  - Navigation links: 6 category anchors (`Weight Loss`, `Sexual Health`, `Fertility`, `Hair`, `Daily Health`, `What We Treat`) spaced equally with 10px top/bottom padding.
  - Action cluster: Patient Login User Icon button (`.nav-user-icon-btn`) + Small primary CTA (`.sp-btn-sm`) with label "2-Minutes Assessment →".

### Component 03: Off-Canvas Mobile Navigation Drawer
- **DOM Selector:** `.sp-drawer`, `.sp-drawer-backdrop`, `.sp-drawer-header`, `.sp-drawer-nav`, `.menu-toggle`
- **Source:** [assets/css/sections.css:L351-L417](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L351-L417), [assets/js/modules/navigation.js:L6-L56](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/navigation.js#L6-L56)
- **Role & Description:** Responsive navigation drawer triggered by the hamburger toggle on viewports `<= 991px`.
- **Visual Composition:** Full-height slide-over drawer from the right, pure white background (`#FFFFFF`), backdrop blur overlay (`rgba(13, 13, 14, 0.5)`).
- **Behavior & Accessibility:**
  - Manages `aria-expanded` and `aria-hidden` attributes.
  - Scroll locks document body (`document.body.style.overflow = 'hidden'`).
  - Dismisses on backdrop click, close button click, navigation link click, or Escape key press.

### Component 04: Action Button Suite (`.sp-btn`)
- **DOM Selector:** `.sp-btn`, `.sp-btn-primary`, `.sp-btn-white`, `.sp-btn-outline`, `.sp-btn-frosted`, `.sp-btn-ghost`
- **Source:** [assets/css/components.css:L18-L169](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L18-L169)
- **Role & Description:** Universal interactive buttons styled as pills with consistent typography and hover states.
- **Variants:**
  - `Primary (.sp-btn-primary)`: Deep Forest background (`#173F35`), white text, subtle shadow. Equipped with animated pseudo-element shimmer.
  - `White (.sp-btn-white)`: Pure white surface (`#FFFFFF`), dark ink text (`#0D0D0E`), prominent elevation for dark hero surfaces.
  - `Outline (.sp-btn-outline)`: Transparent background, strong border (`rgba(23, 63, 53, 0.22)`), charcoal text.
  - `Frosted (.sp-btn-frosted)`: Semi-transparent white (`rgba(255, 255, 255, 0.15)`), `backdrop-filter: blur(12px)`.
  - `Ghost (.sp-btn-ghost)`: Borderless inline action.
- **Sizes:** Standard (`14px 26px`), Small `.sp-btn-sm` (`10px 18px`, `0.875rem`), Large `.sp-btn-lg` (`18px 36px`, `1.05rem`).
- **Shimmer Interaction:** `.sp-btn-primary::after` executes an automated 3.8s infinite left-to-right gradient sweep (`sp-cta-shimmer`), suppressed under `prefers-reduced-motion`.

### Component 05: Satisfaction Review Badge
- **DOM Selector:** `.sp-review-badge`, `.sp-trustpilot-icon-wrap`, `.sp-trustpilot-star`
- **Source:** [assets/css/sections.css:L480-L530](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L480-L530), [index.html:L152-L163](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/index.html#L152-L163)
- **Role & Description:** Social proof indicator establishing immediate clinical credibility in the hero.
- **Visual Composition:** Translucent pill capsule (`rgba(255, 255, 255, 0.88)`), Trustpilot green star SVG (`#00B67A`), numerical rating "4.4/5", centered bullet divider, and text "Satisfaction Rating From Happy Customers".

### Component 06: Compact Hero Pricing Card
- **DOM Selector:** `.sp-hero-pricing-card`, `.sp-pricing-card__left`, `.sp-pricing-card__price`, `.sp-pricing-card__divider`, `.sp-pricing-card__right`
- **Source:** [assets/css/components.css:L313-L399](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L313-L399)
- **Role & Description:** Prominent financial transparency card integrated into the hero content column.
- **Visual Composition:**
  - Container: Max-width 535px, 95% translucent white surface, `backdrop-filter: blur(14px)`, `border-radius: 18px`, subtle shadow.
  - Left column: Uppercase tracking label ("PLANS STARTING AT"), bold price number "$89", period label "/month".
  - Vertical divider: 1px subtle border line.
  - Right column: Bold headline ("Lock In Your Monthly Price"), subtext ("Pay the same monthly price at every dose while you remain on the same plan.").
  - Responsive behavior: On mobile (`<= 767px`), divider hides and card stacks vertically with 1fr layout.

### Component 07: Hero CTA Cluster & Social Proof Avatars
- **DOM Selector:** `.sp-hero-cta-cluster`, `.sp-hero-cta-btn`, `.sp-hero-social-proof`, `.sp-avatar-stack`, `.sp-user-avatar`
- **Source:** [assets/css/components.css:L401-L495](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L401-L495)
- **Role & Description:** Primary conversion cluster linking action with community validation.
- **Visual Composition:**
  - Button: Primary conversion CTA (`.alivio-hero-primary-cta`), 58px desktop / 52px mobile height, Terracotta `#5B2009` surface with circular action disk (`#FBF8F3` / `#FFEBC4`) and vector arrow. Hover deepens background to `#3E1505` with subtle disk scaling (`1.05x`).
  - Social proof: 4 overlapping 32px circular user avatars with 2px white borders (`margin-left: -8px`), bold "12k+" count, and muted "users" label. Unboxed presentation.

### Component 08: Hero Trust Checkmarks Row
- **DOM Selector:** `.sp-hero-trust-row`, `.sp-pricing-trust-item`, `.sp-pricing-trust-icon`
- **Source:** [assets/css/components.css:L497-L522](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L497-L522)
- **Role & Description:** Lowers cognitive friction directly below the primary qualification CTA.
- **Content:** 3 items with Deep Forest checkmark SVGs:
  1. "Cancel anytime"
  2. "Ongoing clinician support"
  3. "No insurance required"
  4. "Convenient home delivery if prescribed"

### Component 09: Docked Treatment Mini-Carousel
- **DOM Selector:** `.sp-hero-treatments-dock`, `.sp-dock-track`, `.sp-dock-card`, `.sp-dock-card__box`, `.sp-dock-btn`
- **Source:** [assets/css/components.css:L524-L697](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L524-L697), [assets/js/main.js:L50-L61](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/main.js#L50-L61)
- **Role & Description:** Interactive category discovery module anchored to the bottom-right corner of the hero section.
- **Visual Composition:**
  - Dock header: Uppercase title ("TREATMENTS") and circular arrow navigation buttons (`<` and `>`).
  - Cards (152px wide × 184px high, `border-radius: 20px`):
    - Card 1: Weight Loss (`assets/images/sp-treat-weight.jpg`)
    - Card 2: Anti Aging (`assets/images/sp-treat-skin.jpg`)
    - Card 3: Skin Health (`assets/images/sp-treat-hair.jpg`)
  - Inner info box: Rounded floating capsule (`rgba(255, 255, 255, 0.94)`) at bottom of card with protocol icon, title, and right arrow.
  - Interaction: Arrow buttons execute smooth horizontal scroll step of `±140px` along the track. On mobile (`<= 991px`), dock shifts from absolute to relative in-flow positioning.

### Component 10: Hero Background Media Frame
- **DOM Selector:** `.sp-hero-card`, `.sp-hero-bg-media`, `.sp-hero-video`, `.sp-hero-img`
- **Source:** [assets/css/sections.css:L427-L472](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L427-L472), [index.html:L143-L148](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/index.html#L143-L148)
- **Role & Description:** Full-bleed background media container within the rounded hero card (`border-radius: var(--sp-radius-xl)`).
- **Visual Composition:**
  - HTML5 `<video>` element with `autoplay loop muted playsinline`, poster fallback (`assets/images/sp-hero-precision.jpg`), and sources (`assets/videos/gemini_generated_video_6ffafe01.mp4`).
  - Strict absence of dark or faded overlays to maintain clean photographic clarity.
  - Object positioning: `right 14%` on desktop; `75% 38%` on mobile viewports to prevent facial cropping.

### Component 11: Media Publications Marquee
- **DOM Selector:** `.sp-as-seen-in`, `.sp-as-seen-in__track`, `.sp-media-logo`, `.sp-media-svg`
- **Source:** [assets/css/sections.css:L553-L640](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L553-L640), [index.html:L320-L399](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/index.html#L320-L399)
- **Role & Description:** Continuous trust validation strip positioned directly under the hero card.
- **Visual Composition:**
  - Uppercase title: "AS SEEN IN" (`0.775rem`, letter spacing `0.25em`).
  - 6 publication vector SVGs with explicit intrinsic aspect ratio attributes:
    1. WebMD (`180x36`, serif bold)
    2. FORTUNE (`210x30`, serif black, tracking 3px)
    3. FAST COMPANY (`260x30`, sans-serif black)
    4. Bloomberg (`200x36`, system sans bold)
    5. healthline (`190x32`, lowercase sans bold)
    6. Forbes (`150x36`, italic serif bold)
  - Seamless duplicate loop for continuous 32s translation.
  - Linear horizontal gradient mask (`mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)`).

### Component 12: Interactive Step Navigation Pill Track
- **DOM Selector:** `.hiws_subnav`, `.hiws_pill`, `.hiws_pill-step`, `.hiws_pill-dot`, `.hiws_pill-line`
- **Source:** [assets/css/components.css:L171-L243](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L171-L243)
- **Role & Description:** Tablist controller for the 4-step patient onboarding walkthrough.
- **Visual Composition:** White pill container holding 4 numbered steps separated by hairline divider segments (`.hiws_pill-line`).
- **Interactive States:** Active step switches to Deep Forest fill (`#173F35`), white text, and light number bubble (`rgba(255, 255, 255, 0.2)`).

### Component 13: Dynamic How-It-Works Panel
- **DOM Selector:** `.hiws_content_grid`, `.hiws_media_card`, `.hiws_floating_note`
- **Source:** [assets/css/sections.css:L649-L780](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L649-L780), [assets/js/modules/how-it-works.js](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/how-it-works.js)
- **Role & Description:** Synchronized two-column display linking active step copy/FAQs with device dashboard imagery.
- **Visual Composition:**
  - Left column: Dynamic H3 headline, body explanation, expandable sub-accordions, primary step action button.
  - Right column: Large media card (`border-radius: 24px`) with floating status note pill (e.g., "Intake Submitted", "Physician Review Complete").

### Component 14: Clinical Protocols Grid & Cards
- **DOM Selector:** `.section_protocols`, `.sp-protocols-grid`, `.sp-protocol-card`
- **Source:** [assets/css/sections.css:L782-L888](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L782-L888)
- **Role & Description:** 3-column treatment card grid detailing primary care categories.
- **Card Composition:**
  - Overline category tag (METABOLIC HEALTH, FOLLICULAR HEALTH, HORMONAL HEALTH).
  - Editorial photography thumbnail (`220px` height).
  - H3 treatment name + clinical protocol description.
  - Bulleted feature checkmarks with Deep Forest SVG icons.
  - Full-width pill outline button ("Check Suitability →").

### Component 15: Membership Comparison Table
- **DOM Selector:** `.sp2-membership-table`, `.sp2-membership__row`, `.sp2-membership__label`, `.sp2-membership__desc`
- **Source:** [assets/css/components.css:L245-L310](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L245-L310)
- **Role & Description:** Full-width rows contrasting unbundled clinical care against legacy fee-for-service models.
- **Visual Composition:** Alternating row backgrounds (`rgba(247, 247, 246, 0.6)`), green checkmark icons, bold labels, and right-aligned descriptive text. Stacks vertically on mobile (`<= 767px`).

### Component 16: Clinician & Medical Leadership Bio Card
- **DOM Selector:** `.section_clinicians_1`, `.sp-clinicians-grid`, `.sp-clinician-card`
- **Source:** [assets/css/sections.css:L890-L908](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L890-L908)
- **Role & Description:** Physician credentialing showcase featuring Dr. Marcus Vance, MD.
- **Visual Composition:** Two-column split layout with board-certification badging, physician portrait thumbnail, credentials summary, and ongoing clinical oversight narrative.

### Component 17: Packaging & Discretion Feature Showcase
- **DOM Selector:** `.section_protocols#discretion`, `.sp-discretion-grid`
- **Source:** [assets/css/sections.css:L840-L888](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L840-L888)
- **Role & Description:** Dedicated privacy reassurance block with unbranded kraft parcel visual, temperature-controlled cold-chain markers, and HIPAA confidentiality guarantees.

### Component 18: Disclosure Accordions
- **DOM Selector:** `.sp-accordion-item`, `.sp-accordion-trigger`, `.sp-accordion-icon`, `.sp-accordion-panel`, `.sp-accordion-panel-inner`
- **Source:** [assets/css/components.css:L754-L830](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L754-L830), [assets/js/modules/accordion.js](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/modules/accordion.js)
- **Role & Description:** Accessible disclosure list for clinical and operational FAQs.
- **Visual Composition & Interaction:**
  - CSS Grid transition technique (`grid-template-rows: 0fr` to `1fr`) for butter-smooth natural height animation.
  - Plus icon (`+`) inside a circular border rotates `45deg` into a close mark (`✕`) with background color shift to Deep Forest upon expansion.
  - Full keyboard accessibility (Enter/Space toggle, ARIA `aria-expanded` and `aria-hidden` sync).

### Component 19: Pre-Footer Call to Action Banner
- **DOM Selector:** `.section_pre_footer`, `.sp-cta-card`
- **Source:** [assets/css/sections.css:L909-L966](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L909-L966)
- **Role & Description:** High-contrast closing conversion card before footer navigation.
- **Visual Composition:** Deep Forest background (`#173F35`), H2 heading in white text, centered body copy, and large white pill button (`.sp-btn-white.sp-btn-lg`) with label "Become a Member Today".

### Component 20: Structured Site Footer
- **DOM Selector:** `.site-footer`, `.sp-footer-grid`, `.sp-footer-brand`, `.sp-footer-col`, `.sp-footer-disclaimer`, `.sp-footer-bottom`
- **Source:** [assets/css/sections.css:L968-L1070](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/sections.css#L968-L1070)
- **Role & Description:** Comprehensive global footer containing navigation columns, regulatory disclosures, and copyright.
- **Visual Composition:**
  - 4-column desktop grid collapsing to single-column on mobile.
  - Detailed medical compounding disclaimer in muted charcoal typography.
  - Legal row with links to Privacy Policy, Terms of Service, and Telehealth Consent.

### Component 21: Demonstration Intake Assessment Modal
- **DOM Selector:** `.sp-modal-backdrop`, `.sp-modal-card`, `[data-intake-trigger]`, `[data-modal-close]`
- **Source:** [assets/css/components.css:L832-L871](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/css/components.css#L832-L871), [assets/js/main.js:L17-L48](file:///Users/codeclouds-arko/Desktop/Telehealth%20Mockup/assets/js/main.js#L17-L48)
- **Role & Description:** Modal dialog intercepting all demo CTA clicks across the page.
- **Behavior:**
  - Centers on screen with blurred backdrop (`rgba(13, 13, 14, 0.65)`).
  - Animates with scale (`0.98` to `1.0`) and translation (`20px` to `0`).
  - Dismissible via close button, outline button, backdrop click, or Escape key.
