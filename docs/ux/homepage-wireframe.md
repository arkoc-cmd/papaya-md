# Homepage UX Wireframe & Section Architecture — Alivio

**Brand:** Alivio  
**Audience:** Adult Men & Women (Dual-Gender, Multi-Category)  
**Art Direction:** The Editorial Apothecary (Warm Bone `#FBF9F5`, Deep Obsidian `#18181B`, Terracotta `#A35C3E`, Playfair Display + Inter)  
**Infrastructure Partner:** Alivio Telehealth Infrastructure (Backend Telehealth Engine)  
**Viewport Baseline:** Mobile-First (390px) → Tablet (768px) → Desktop (1280px+)

---

## 1. Section Sequence & Strategic UX Rationale

The homepage structure is sequenced to systematically eliminate patient friction, reduce clinical anxiety, establish medical credibility, and enable intuitive care exploration.

```
┌────────────────────────────────────────────────────────┐
│ 00. Top Utility Banner (Announcement / Operating States)│
├────────────────────────────────────────────────────────┤
│ 01. Sticky Header & Navigation (Pill Layout + Drawer)  │
├────────────────────────────────────────────────────────┤
│ 02. Hero Section (Dual Value Prop + Direct Rx Intent)  │
├────────────────────────────────────────────────────────┤
│ 03. Immediate Category Discovery Rail (Pill Nav)       │
├────────────────────────────────────────────────────────┤
│ 04. Core Care Pillars & Featured Protocols             │
├────────────────────────────────────────────────────────┤
│ 05. The Alivio Journey (3-Step Patient Protocol)     │
├────────────────────────────────────────────────────────┤
│ 06. Clinical Authority & Medical Oversight             │
├────────────────────────────────────────────────────────┤
│ 07. Transparent Economics & Additive Pricing Model     │
├────────────────────────────────────────────────────────┤
│ 08. Discretion, Privacy & HIPAA Compliance             │
├────────────────────────────────────────────────────────┤
│ 09. Evidence-Based Frequently Asked Questions (FAQ)    │
├────────────────────────────────────────────────────────┤
│ 10. Final Call to Action (Low-Friction Intake Entry)  │
├────────────────────────────────────────────────────────┤
│ 11. Footer & Regulatory Disclaimers (Class 44 Legal)  │
└────────────────────────────────────────────────────────┘
```

---

## 2. In-Depth Section Specifications

### Section 00: Top Utility & Clinical Notice Bar
- **User Need:** Immediate orientation on state availability and latest clinical protocol availability.
- **Content:** Concise editorial announcement: *"Online clinical consultations now available in [Target States Placeholder]. Free discreet delivery."*
- **CTA Destination:** `#care-categories` or state availability modal.
- **Required Assets:** Monoline pin icon (SVG).
- **Mobile Layout:** Compact 34px bar, centered 12px text, subtle bone-to-warm-sand tint.
- **Desktop Layout:** 36px bar with left-aligned clinical note and right-aligned patient portal link.
- **Accessibility:** `role="region" aria-label="Announcement"`, contrast ratio 11.4:1.

---

### Section 01: Sticky Header & Navigation
- **User Need:** Effortless navigation across care categories, direct access to ongoing treatments, frictionless login.
- **Content:**
  - Wordmark: **Alivio** (refined editorial letterforms).
  - Navigation Links: *Treatments (Dropdown/Drawer)*, *How It Works*, *Our Clinicians*, *Pricing Transparency*, *FAQ*.
  - Action Targets: *Log In* (Patient Portal) and *Find Your Care* (Primary CTA pill).
- **CTA Destination:** `/intake/start` (Intake questionnaire powered by Alivio Telehealth Infrastructure API).
- **Required Assets:** SVG wordmark, hamburger icon, search/treatment chevron.
- **Mobile Layout (390px):** Floating pill header with 16px lateral padding. Right hamburger trigger opens full-screen editorial drawer with oversized typographic category links.
- **Desktop Layout (1280px+):** Centered floating pill with frosted backdrop (`backdrop-filter: blur(16px)`).
- **Accessibility:** Accessible `aria-expanded` toggles, visible 2px keyboard focus rings, keyboard trap on mobile drawer.

---

### Section 02: Hero Section (Dual Value Proposition)
- **User Need:** Validate that Alivio understands their specific health struggle (weight resistance, hair loss, hormonal imbalance, skin health) without clinical judgment.
- **Content:**
  - Headline: *"The medical care your body actually deserves."*
  - Subheadline: *"Doctor-guided treatments tailored to your biology. Evidence-based GLP-1 metabolic care, hair restoration, and hormonal wellness—prescribed online and delivered discreetly."*
  - Primary CTA: *"Start Free Clinical Assessment"*
  - Secondary CTA: *"Explore Care Categories ↓"*
  - Trust Micro-Copy: *"100% Online • US-Licensed Clinicians • No Insurance Required • Discreet Shipping"*
- **Split Hero Visual Modules:**
  - **Module A (Direct Treatment Intent):** Visual card showing modern bespoke packaging (e.g. prescription GLP-1 pen or topical bottle with elegant custom typography) with callout: *"Personalized Rx Match"*.
  - **Module B (Human Vitality & Trajectory):** Warm, dignified photography of adult model in natural lighting with subtle clinical progress indicator: *"Ongoing provider check-ins"*.
- **CTA Destination:** `/intake/start`
- **Required Assets:** Editorial treatment bottle/pen render; lifestyle portrait photograph.
- **Claims Requiring Verification:** All clinical efficacy or speed-of-delivery timelines must carry appropriate asterisk disclosures.

---

### Section 03: Immediate Category Discovery Strip
- **User Need:** Quickly find their specific medical condition without digging through multi-level menus.
- **Content:** 5 Core Condition Pills:
  1. *Weight & Metabolic Health* (Icon: Balance / Homeostasis)
  2. *Hair Restoration* (Icon: Follicle / Growth)
  3. *Hormonal Health & Vitality* (Icon: Vitality Wave)
  4. *Dermatology & Skin* (Icon: Cellular Radiance)
  5. *Longevity & Routine Labs* (Icon: Molecular Node)
- **CTA Destination:** In-page anchor to `#category-[name]` or dedicated category subpage.
- **Mobile Layout:** Horizontally swipeable pill track with momentum scrolling (`overflow-x: auto; scroll-snap-type: x mandatory`).
- **Desktop Layout:** Centered flex row with subtle hover lift and terracotta accent line.

---

### Section 04: Core Care Pillars & Featured Protocols
- **User Need:** Evaluate specific medical treatment options, understand what is prescribed, and see transparent pricing ranges before starting an intake.
- **Content:**
  - Header: *"Targeted treatments. Real clinical rigor."*
  - Subhead: *"We focus on conditions where modern clinical science delivers meaningful, measurable improvements in daily vitality."*
  - **Card 1: Metabolic & Weight Health:** Compounded GLP-1 therapies (Semaglutide / Tirzepatide protocols where clinically indicated). Features: Weekly injection or sublingual options, provider dosage titration, diet & lifestyle integration.
  - **Card 2: Hair Restoration:** Dual-action topical and oral protocols (Finasteride / Minoxidil formulations). Features: Custom compounded strengths, once-daily routine.
  - **Card 3: Hormonal Wellness & Longevity:** Personalized hormone replacement, NAD+ cellular protocols, preventative biomarker panels.
- **Price Callout:** *"[Pricing Placeholder — e.g. Treatments from $XX/month + $YY/month clinical membership]"*.
- **CTA Destination:** `/treatments/[slug]` or `/intake/start?category=[slug]`.
- **Accessibility:** Semantic `<article>` cards, descriptive headings (`<h3>`), WCAG AAA text contrast.

---

### Section 05: The Alivio Journey (How Telehealth Works)
- **User Need:** Demystify the online healthcare process and alleviate fears of hidden steps, unexpected in-person visits, or awkward appointments.
- **Content:** 3 Simple, Dignified Steps:
  1. **Complete a 5-Minute Health Intake:** Share your health history, symptoms, and goals through our secure, HIPAA-compliant digital intake.
  2. **Dedicated Clinician Evaluation:** A board-certified physician or licensed nurse practitioner in your state reviews your case and tailors a personalized prescription protocol.
  3. **Discreet Doorstep Delivery:** Your medication is prepared by licensed U.S. pharmacies and shipped in unmarked, temperature-controlled packaging right to your door.
- **Platform Note:** Seamlessly powered by Alivio Telehealth Infrastructure’s integrated clinician and pharmacy routing engine.
- **Mobile Layout:** Vertical timeline with connecting hairline.
- **Desktop Layout:** 3-column horizontal grid with numbered monoline badges.

---

### Section 06: Clinical Authority & Medical Oversight
- **User Need:** Confirm that real, licensed doctors oversee care and that treatments are legally and medically legitimate.
- **Content:**
  - Header: *"Physician-led medicine. Never an algorithm."*
  - Body: *"Every prescription is written and actively monitored by licensed medical providers. No automated pre-approvals. No one-and-done prescriptions. Ongoing asynchronous check-ins ensure your dosage is dialed in for safety and sustainable outcomes."*
  - Clinician Profile Spotlight: Visual badge showcasing credentials (*"[Clinician Credentials Placeholder — Board-Certified in Obesity Medicine & Internal Medicine]"*).
- **CTA Destination:** `/about/our-medical-team`
- **Required Assets:** Professional editorial portrait of medical director / clinician in modern clinical setting.

---

### Section 07: Transparent Economics & Additive Pricing Model
- **User Need:** Understand total monthly cost with zero hidden fees, cancellation traps, or surprise co-pays.
- **Content (Additive Pricing Structure):**
  - **Treatment Cost:** *"[From $XX/mo]"* — Covers compounded or brand medication prepared at licensed U.S. 503A pharmacies.
  - **Clinical Care Membership:** *"[+$YY/mo]"* — Covers unlimited digital clinician consultations, dosage adjustments, ongoing medical check-ins, and free discreet shipping.
  - Value Props: *"HSA/FSA Eligible • Pause or Cancel Anytime • Zero Hidden Pharmacy Fees"*.
- **CTA Destination:** `/intake/start`
- **Mobile/Desktop Layout:** Side-by-side or stacked disaggregated cost cards with intuitive summary calculation.

---

### Section 08: Discretion, Privacy & HIPAA Compliance
- **User Need:** Guarantee that sensitive health information and package deliveries remain 100% confidential.
- **Content:**
  - *"Your health is nobody's business but yours."*
  - Pillar 1: **100% Unmarked Packaging** (Plain brown box; zero brand logos or medication names visible).
  - Pillar 2: **HIPAA-Compliant Security** (256-bit enterprise encryption, strict medical confidentiality standards).
  - Pillar 3: **LegitScript Certified Partner** (Underlying Alivio Telehealth Infrastructure infrastructure verified by regulatory bodies).
- **Required Assets:** Plain discreet box illustration/render; security badge icons.

---

### Section 09: Evidence-Based Frequently Asked Questions (FAQ)
- **User Need:** Instant answers to common hesitation triggers without having to contact support.
- **Content Items:**
  1. *Do I need health insurance to use Alivio?* (No. Alivio works independently of insurance with flat, transparent monthly rates.)
  2. *How do I know if I qualify for treatment?* (Your online intake is reviewed by a licensed physician who determines clinical suitability based on your medical profile.)
  3. *What pharmacies prepare the medications?* (All compounded medications are dispensed by state-licensed U.S. 503A compounding pharmacies adhering to cGMP standards.)
  4. *How does shipping work?* (Medications ship in temperature-controlled, discreet packaging within [X business days placeholder].)
  5. *Can I cancel my subscription?* (Yes. You can manage, pause, or cancel your plan through your patient portal with zero long-term commitments.)
- **Interactivity:** Accessible Vanilla JS accordion (`aria-expanded="false"`, smooth CSS height transition).

---

### Section 10: Final Conversion Module (Low-Friction Intake)
- **User Need:** A clean, compelling final prompt to start care after reviewing all information.
- **Content:**
  - Headline: *"Ready to take control of your health on your terms?"*
  - Subhead: *"Start your free clinical evaluation today. Review your treatment options with a licensed provider in minutes."*
  - Primary CTA Pill: *"Get Started Online"*
  - Reassurance: *"Takes under 5 minutes • HIPAA Secure • No commitment until approved"*
- **Desktop/Mobile Layout:** Full-bleed warm cream surface with deep obsidian typography and terracotta action button.

---

### Section 11: Footer & Regulatory Disclaimers
- **User Need:** Access support, company credentials, state telehealth policies, and legal disclaimers.
- **Content:**
  - Column 1: Alivio Brand Summary & LegitScript / HIPAA Trust Badges.
  - Column 2: Care Categories (Weight Loss, Hair, Skin, Hormones, Longevity).
  - Column 3: Platform & Company (About Us, Medical Team, Careers, Press).
  - Column 4: Patient Support (Contact, FAQs, Login Portal, Pharmacy Partners).
  - **Mandatory Medical Disclaimer:** *"Alivio is not an emergency medical service. If you are experiencing a medical emergency, call 911 immediately. Telehealth services provided through the Alivio Telehealth Infrastructure clinical network. Prescriptions are subject to clinical appropriateness determined by a licensed healthcare provider."*
