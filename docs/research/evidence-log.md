# Evidence Log — Competitor & Platform Reference Audit

**Audit Date:** October 15, 2026  
**Auditor:** Principal Product Designer & Front-End Architect  
**Epistemic Standard:** All logged entries strictly categorized into:
- `[Research Observation]`: Directly observed and verified fact from live source.
- `[Assumption]`: Inferred operational premise or behavior requiring client validation.
- `[Hypothesis]`: Strategic design or conversion hypothesis to test.
- `[Unverified Claim]`: Third-party health or commercial claim requiring independent verification.

---

## 1. Hims (`https://www.hims.com/`)
- **Access Status:** Verified live via headless browser inspection session (October 15, 2026).
- **Core Positioning & Audience:**
  - `[Research Observation]` High-end, destigmatized direct-to-consumer health and wellness, historically male-focused, now expanding across broader metabolic and wellness verticals (with Hers serving the dedicated female counterpart).
- **Hero & Above-the-Fold Architecture:**
  - `[Research Observation]` Announcement Banner: Warm amber pill bar: *"The GLP-1 pill is here. Check it out →"*.
  - `[Research Observation]` Header: Minimalist sticky navigation. Lowercase serif wordmark `"hims"`, right-aligned `"Log in"` pill button and hamburger menu.
  - `[Research Observation]` Primary Headline: Editorial, confident, conversational: *"The care you've always deserved"*.
  - `[Research Observation]` Hero Multi-Card Module:
    - Card 1: *"Start your weight loss today / Find your Rx match"* featuring high-definition 3D rendering of branded Wegovy HD injection pen and minted tablet.
    - Card 2: *"See how much weight you can lose / ↓ Lose up to 25%*" featuring an athletic model in dynamic motion overlaid with a progressive curve trajectory graphic.
  - `[Research Observation]` Quick-Action Category Strip (directly beneath cards):
    - *"Have better sex"* (with custom branded chewable tablet graphic)
    - *"Regrow hair"* (with branded formulation pill)
    - *"Boost testosterone"* (with blue tablet icon)
    - *"Get a health check"* (with diagnostic capillary vial)
- **Navigation & Care Categories (Drawer Menu):**
  - `[Research Observation]` Full category taxonomy in drawer:
    1. Weight Loss
    2. Labs
    3. Sexual Health
    4. Testosterone
    5. Hair Regrowth
    6. Mental Health
    7. Skin
    8. Everyday Health
  - `[Research Observation]` "Top Treatments" sub-rail with "Rx" badges highlighting specific medications.
- **Visual Identity, Photography & Motion:**
  - `[Research Observation]` Warm, muted earth tones (taupe `#ECEAE5`, warm bronze/ochre, deep charcoal/black text).
  - `[Research Observation]` Editorial, aspirational photography paired with luxury-grade 3D medication renders; avoids generic clinical "doctor with clipboard" stock art.
  - `[Research Observation]` Subtle hover micro-transitions on cards and drawer triggers.

---

## 2. Alivio Rx (`https://Alivio Rx.com/`)
- **Access Status:** Verified live via HTTP content inspection (October 15, 2026).
- **Page Title:** `"Buy Peptides, GLP-1s & Wellness Care Online from Direct Meds"`
- **Meta Description:** `"Get prescribed online for Semaglutide and Tirzepatide weight loss medications by Direct Meds. Click to shop our transparent pricing and fast delivery."`
- **Core Positioning & Audience:**
  - `[Research Observation]` High-volume, utility-driven direct-to-consumer prescription fulfillment. Emphasizes speed, compounding pharmacy legitimacy, and bundled pricing.
- **Hero & Navigation Architecture:**
  - `[Research Observation]` Top navigation pill contains: *How It Works*, *Patient Success*, *Solutions (Dropdown)*, *GLP-1 Buying Guide (5-chapter content hub)*, *Customer Support*, and CTA buttons (*Login*, *Get Started*).
  - `[Research Observation]` Solutions taxonomy:
    1. Weight Loss
    2. Anti-Aging
    3. Skin Care
    4. Energy & Wellness
    5. Hormone Health
    6. Sexual Health
    7. Pain Relief
    8. Hair Regrowth
- **Trust Signals & Compliance:**
  - `[Research Observation]` Structured data includes `MedicalBusiness` schema (Utah address, rating: 4.3 stars from 2,530 reviews).
  - `[Research Observation]` LegitScript-certified, HIPAA-compliant badges featured. U.S. licensed nurse practitioner review highlighted.
- **Pricing Transparency & Delivery Model:**
  - `[Research Observation]` FAQ states: All-inclusive bundled monthly pricing (medication, nurse support, cold shipping, digital follow-ups).
  - `[Research Observation]` Verbatim pricing cited: Plans start at **$249/month** for sublingual Semaglutide and **$297/month** for injections. Accepts HSA/FSA.
  - `[Unverified Claim]` *"Lose between 15-21% of their body weight"* (Alivio Rx FAQ text — noted as competitor marketing claim, not an accepted internal clinical claim).
- **Patient Journey:**
  - `[Research Observation]` 1. Online quiz / intake form → 2. Licensed medical provider review (within business hours) → 3. Compounded at partner pharmacy → 4. Shipped in 1 business day.

---

## 3. Alivio Care (`https://jellyhealth.org/`)
- **Access Status:** Verified live via Next.js rendered payload inspection (October 15, 2026).
- **Page Title:** `"Medical treatments for women with hormonal imbalances | Alivio Care"`
- **Meta Description:** `"Your physician. Your plan. Ongoing support—not one-and-done. Physician-led care, 100% online—no insurance needed. GLP-1 weight loss and more."`
- **Core Positioning & Audience:**
  - `[Research Observation]` Female-focused medical weight loss and hormonal health (PCOS, perimenopause, menopause, metabolic resistance). Emphasizes ongoing longitudinal relationship (*"Same physician every visit"*).
- **Typography & Art Direction:**
  - `[Research Observation]` Font pairing: **Playfair Display** (refined, warm editorial serif) + **Outfit** (approachable, human sans-serif).
  - `[Research Observation]` Palette: Deep navy (`#1C1468`), soft cream (`#ECEEF2`), pastel peach, lavender, and warm badge yellow.
- **Hero & Value Proposition:**
  - `[Research Observation]` Headline: *"Expert Weight Loss & Hormone Care for Women"*.
  - `[Research Observation]` Subheadline: *"Doctor-led GLP-1 treatment and hormone therapy for PCOS, menopause, and metabolic health. Personalized plans. Real results."*
  - `[Research Observation]` Primary CTA: *"Get Started"* linking to `/onboarding/intake`.
  - `[Research Observation]` Supporting bullet hierarchy:
    1. *100% online*
    2. *Board-Certified Obesity Medicine & Women's Health Specialists*
    3. *Same physician every visit*
- **Pricing Transparency Model:**
  - `[Research Observation]` Two-part additive pricing clearly exposed on homepage:
    - **Treatment:** *"As low as $99/month for GLP-1 weight loss medication"* (compounded via U.S.-licensed 503A pharmacies).
    - **Membership:** *"+ $149/month for unlimited online care (required)"*.
- **Free Tools & Organic Acquisition:**
  - `[Research Observation]` Free interactive calculators in navigation/footer: BMI Calculator, BMR Calculator, TDEE Calculator, Calorie Calculator, Protein Calculator, Daily Carb Calculator.
- **Trust & Credibility:**
  - `[Research Observation]` Press proof bar: Forbes, Healthline, Women's Health, Vogue, Bloomberg, Endocrine Today.
  - `[Research Observation]` HIPAA Compliant badge & verified LegitScript certification link.

---

## 4. Longevity Meds (`https://www.longevitymeds.com/`)
- **Access Status:** Verified live via HTML and JSON-LD schema inspection (October 15, 2026).
- **Page Title:** `"Longevity Meds | Compounded Semaglutide & Tirzepatide Online"`
- **Meta Description:** `"Clinician-supervised GLP-1 weight loss programs. Compounded Semaglutide from $144.99/mo, Tirzepatide from $184.99/mo. Online assessment → doctor review → discreet delivery in 3–5 days."`
- **Core Positioning & Audience:**
  - `[Research Observation]` Preventative longevity, metabolic optimization, and peptide therapies (GLP-1s, Tirzepatide, NAD+ therapy) catering to proactive health seekers.
- **Typography & Aesthetics:**
  - `[Research Observation]` Primary typeface: **DM Sans** (clean, geometric sans-serif).
  - `[Research Observation]` Palette: Clean clinical white, dark slate, deep blue, modern high-contrast digital health aesthetic.
- **Pricing & Offer Structure:**
  - `[Research Observation]` Verbatim pricing in schema/meta: Compounded Semaglutide from **$144.99/mo**, Tirzepatide from **$184.99/mo**.
  - `[Research Observation]` Policy transparency: No insurance required; subscription cancelable anytime with pro-rated refund (subject to a $50 cancellation fee).
- **Fulfillment & Pharmacy Standards:**
  - `[Research Observation]` Clear clinical FAQ explaining what a **503A state-licensed compounding pharmacy** is, the distinction between commercially manufactured FDA-approved drugs and compounded prescriptions, and cold-chain temperature-controlled shipping (3–5 business days).

---

## 5. Alivio Telehealth Infrastructure (`https://www.Alivio Telehealth Infrastructure.com/`) — *Platform Reference Only*
- **Access Status:** Verified live via Next.js rendered DOM and JSON-LD schema inspection (October 15, 2026).
- **Platform Clarification:**
  - `[Research Observation]` Alivio Telehealth Infrastructure is an API-first, headless B2B SaaS telehealth infrastructure platform, **not** a direct consumer health brand.
- **Core Capabilities & Infrastructure Capabilities:**
  - `[Research Observation]` End-to-end patient workflow supported:
    1. Landing Page creation (headless integrations with Webflow, Framer, Plasmic, custom frontend)
    2. Pre-qualifying intake questionnaire / HIPAA-compliant no-code form builder
    3. Checkout and subscription billing
    4. Identity verification (integrated with partners like Vouched)
    5. Doctor consultation & unified EMR (partnered with MD Integrations, Telegra)
    6. Pharmacy fulfillment & prescription order tracking
  - `[Research Observation]` Ecosystem integrations: CheckoutChamp, Vrio, MD Integrations, Telegra, Vouched, Stripe, Klaviyo.
  - `[Research Observation]` LegitScript expedited partnership program for tenant telehealth brands.
- **Design Takeaway for Our Consumer Brand:**
  - `[Assumption]` Our consumer front-end will sit on top of Alivio Telehealth Infrastructure's API/intake endpoints. The consumer site must be completely distinct from Alivio Telehealth Infrastructure's developer-centric, teal-and-navy B2B look.
