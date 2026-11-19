/**
 * Alivio Web Application Bundle (app.js)
 * High-performance Vanilla JavaScript bundle with ZERO external dependencies.
 * Compatible with both local file:/// and http:// protocols.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. HERO HEADLINE ROTATING PHRASE MODULE
  // ==========================================================================
  const rotationTimers = [];

  function initHeroRotator() {
    // Clear any existing rotation timers
    while (rotationTimers.length > 0) {
      clearInterval(rotationTimers.pop());
    }

    const containers = document.querySelectorAll('#hero-dynamic-phrases, .menopause-hero__dynamic-word, [data-hero-rotator]');
    if (!containers.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    containers.forEach((container) => {
      const phrases = Array.from(container.querySelectorAll('.sp-rotating-phrase, .menopause-rotating-word'));
      if (phrases.length <= 1) return;

      let currentIndex = phrases.findIndex(p => p.classList.contains('active'));
      if (currentIndex === -1) currentIndex = 0;

      function cyclePhrase() {
        const current = phrases[currentIndex];
        const nextIndex = (currentIndex + 1) % phrases.length;
        const next = phrases[nextIndex];

        if (prefersReducedMotion) {
          current.classList.remove('active', 'exit');
          next.classList.add('active');
          currentIndex = nextIndex;
          return;
        }

        // Step 1: Animate current phrase out (upward fade-out)
        current.classList.remove('active');
        current.classList.add('exit');

        // Step 2: Animate next phrase in (fade-in moving up into place)
        next.classList.remove('exit');
        next.classList.add('active');

        // Clean up exit class after transition duration (450ms)
        setTimeout(() => {
          current.classList.remove('exit');
        }, 450);

        currentIndex = nextIndex;
      }

      let timer = setInterval(cyclePhrase, 2000);
      rotationTimers.push(timer);

      // Pause rotation when tab is inactive to preserve battery, resume on focus
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        } else {
          if (!timer) {
            timer = setInterval(cyclePhrase, 2000);
            rotationTimers.push(timer);
          }
        }
      });
    });
  }

  // ==========================================================================
  // 2. NAVIGATION & MOBILE DRAWER MODULE
  // ==========================================================================
  function initNavigation() {
    const header = document.querySelector(".site-header");
    const toggleBtn = document.querySelector(".menu-toggle");
    const closeBtn = document.querySelector(".drawer-close");
    const drawer = document.querySelector(".sp-drawer, .drawer");
    const backdrop = document.querySelector(".sp-drawer-backdrop, .drawer-backdrop");
    const drawerLinks = document.querySelectorAll(".sp-drawer-link, .drawer-link, .alivio-treatment-row");

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add("active");
      backdrop.classList.add("active");
      toggleBtn.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      drawer.classList.remove("active");
      backdrop.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      toggleBtn.focus();
    }

    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      isExpanded ? closeDrawer() : openDrawer();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeDrawer);
    }

    backdrop.addEventListener("click", closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    // Handle Escape key to close drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("active")) {
        closeDrawer();
      }
    });

    // Gender Tabs Toggle for Treatment Drawer (Women / Men)
    const genderTabs = drawer.querySelectorAll(".alivio-gender-tab");
    const panelWomen = drawer.querySelector("#treatment-panel-women");
    const panelMen = drawer.querySelector("#treatment-panel-men");

    genderTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const selectedGender = tab.getAttribute("data-gender");

        // Update tab states
        genderTabs.forEach(t => {
          const isActive = t === tab;
          t.classList.toggle("is-active", isActive);
          t.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        // Switch panels with accessible attributes
        if (selectedGender === "women") {
          if (panelWomen) {
            panelWomen.classList.add("is-active");
            panelWomen.removeAttribute("hidden");
          }
          if (panelMen) {
            panelMen.classList.remove("is-active");
            panelMen.setAttribute("hidden", "true");
          }
        } else if (selectedGender === "men") {
          if (panelMen) {
            panelMen.classList.add("is-active");
            panelMen.removeAttribute("hidden");
          }
          if (panelWomen) {
            panelWomen.classList.remove("is-active");
            panelWomen.setAttribute("hidden", "true");
          }
        }
      });
    });

    // Sticky header scroll behavior: reveal pill bar when user scrolls
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Promotional pencil banner text slider loop (every 3.5s)
    const slides = document.querySelectorAll('.sp-utility-slide');
    if (slides && slides.length > 1) {
      let activeIdx = 0;
      setInterval(() => {
        slides[activeIdx].classList.remove('is-active');
        activeIdx = (activeIdx + 1) % slides.length;
        slides[activeIdx].classList.add('is-active');
      }, 3500);
    }
  }

  // ==========================================================================
  // 3. ACCORDION (FAQ) MODULE WITH SMOOTH GSAP ANIMATION
  // ==========================================================================
  function initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    if (!triggers.length) return;

    triggers.forEach(trigger => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const icon = trigger.querySelector('.sp-accordion-icon');
      if (!panel) return;

      // Ensure panel starts closed
      panel.style.height = '0px';
      panel.style.overflow = 'hidden';
      panel.style.opacity = '0';
      panel.style.visibility = 'hidden';

      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          // Close panel
          trigger.setAttribute('aria-expanded', 'false');
          panel.setAttribute('aria-hidden', 'true');
          panel.classList.remove('is-open');

          if (window.gsap) {
            gsap.to(panel, {
              height: 0,
              opacity: 0,
              duration: 0.35,
              ease: 'power2.inOut',
              onComplete: () => {
                panel.style.visibility = 'hidden';
                panel.style.height = '0px';
              }
            });

            if (icon) {
              gsap.to(icon, {
                rotation: 0,
                backgroundColor: '#5C2008',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          } else {
            panel.style.height = '0px';
            panel.style.opacity = '0';
            panel.style.visibility = 'hidden';
          }
        } else {
          // Open panel
          trigger.setAttribute('aria-expanded', 'true');
          panel.setAttribute('aria-hidden', 'false');
          panel.classList.add('is-open');

          panel.style.visibility = 'visible';
          panel.style.height = 'auto';
          const fullHeight = panel.scrollHeight;
          panel.style.height = '0px';

          if (window.gsap) {
            gsap.to(panel, {
              height: fullHeight,
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
              onComplete: () => {
                panel.style.height = 'auto'; // allow responsive resize
              }
            });

            if (icon) {
              gsap.to(icon, {
                rotation: 45,
                backgroundColor: '#3F1404',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          } else {
            panel.style.height = 'auto';
            panel.style.opacity = '1';
            panel.style.visibility = 'visible';
          }
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  // ==========================================================================
  // 4. HOW-IT-WORKS INTERACTIVE MODULE
  // ==========================================================================
  function initHowItWorks() {
    const stepsData = [
      {
        stepNum: '1',
        title: 'Complete your clinical intake',
        body: 'Every protocol starts with a comprehensive biological profile. Answer a confidential 5-minute digital health assessment covering your metabolic history, symptoms, and objectives.',
        image: 'assets/images/step-1.png',
        noteTitle: 'Intake Submitted',
        noteText: 'Encrypted and routed to state-licensed physician network.',
        faqs: [
          'How does Alivio assess my clinical eligibility?',
          'What health history and markers are reviewed?'
        ]
      },
      {
        stepNum: '2',
        title: 'Physician evaluation & prescription',
        body: 'A board-certified healthcare provider licensed in your state thoroughly reviews your profile, analyzes contraindications, and formulates your personalized medical protocol.',
        image: 'assets/images/step-2.png',
        noteTitle: 'Physician Review Complete',
        noteText: 'Custom compound protocol prescribed by licensed doctor.',
        faqs: [
          'Who is my prescribing physician?',
          'How does dose titration work over time?'
        ]
      },
      {
        stepNum: '3',
        title: 'Discreet delivery & action plan',
        body: 'Your personalized medication is prepared at a licensed U.S. 503A compounding pharmacy and shipped directly to your door in 100% unmarked packaging with cold-chain temperature control.',
        image: 'assets/images/step-3.png',
        noteTitle: 'Cold-Chain Parcel Shipped',
        noteText: '100% unmarked packaging with tracking and cold packs.',
        faqs: [
          'What is on the outside of the parcel?',
          'How quickly does cold-chain medication arrive?'
        ]
      },
      {
        stepNum: '4',
        title: 'Continuous doctor care & titration',
        body: 'Healthcare does not stop when your package arrives. Enjoy unlimited asynchronous messaging with your physician for side-effect guidance, progress tracking, and dose optimization.',
        image: 'assets/images/hero-vitality.jpg',
        noteTitle: 'Care Team In Your Pocket',
        noteText: 'Longitudinal follow-ups and dosage adjustments included.',
        faqs: [
          'Can I message my doctor between deliveries?',
          'How do I pause or adjust my subscription?'
        ]
      }
    ];

    const pillButtons = document.querySelectorAll('.hiws_pill-step');
    const titleEl = document.getElementById('hiws-step-title');
    const bodyEl = document.getElementById('hiws-step-body');
    const imgEl = document.getElementById('hiws-step-img');
    const noteTitleEl = document.getElementById('hiws-note-title');
    const noteTextEl = document.getElementById('hiws-note-text');
    const faqContainer = document.getElementById('hiws-faq-container');

    if (!pillButtons.length || !titleEl) return;

    function switchStep(index) {
      const data = stepsData[index];
      if (!data) return;

      pillButtons.forEach((btn, i) => {
        btn.classList.toggle('is-active', i === index);
        btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.gsap.to([titleEl, bodyEl, faqContainer], {
          opacity: 0,
          y: -6,
          duration: 0.15,
          onComplete: () => {
            updateDOM(data);
            window.gsap.to([titleEl, bodyEl, faqContainer], {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: 'power2.out'
            });
          }
        });

        if (imgEl) {
          window.gsap.to(imgEl, {
            opacity: 0.3,
            duration: 0.15,
            onComplete: () => {
              imgEl.src = data.image;
              window.gsap.to(imgEl, { opacity: 1, duration: 0.3 });
            }
          });
        }
      } else {
        updateDOM(data);
        if (imgEl) imgEl.src = data.image;
      }
    }

    function updateDOM(data) {
      titleEl.textContent = data.title;
      bodyEl.textContent = data.body;
      if (noteTitleEl) noteTitleEl.textContent = data.noteTitle;
      if (noteTextEl) noteTextEl.textContent = data.noteText;

      if (faqContainer) {
        faqContainer.innerHTML = '';
        data.faqs.forEach(faqText => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'hiws_faq_btn';
          btn.setAttribute('data-intake-trigger', '');
          btn.innerHTML = `
            <span>${faqText}</span>
            <span class="hiws_faq_icon" aria-hidden="true">+</span>
          `;
          faqContainer.appendChild(btn);
        });
      }
    }

    pillButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => switchStep(idx));
    });
  }

  // ==========================================================================
  // 5. MOTION MODULE (GSAP / SCROLLTRIGGER SAFELY GATED)
  // ==========================================================================
  function initMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
      return;
    }

    const { gsap, ScrollTrigger } = window;
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 992px)',
      isMobile: '(max-width: 991px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    }, (context) => {
      const { isDesktop, reduceMotion } = context.conditions;
      if (reduceMotion) return;

      if (isDesktop) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        heroTl
          .from('.sp-hero-badge', { opacity: 0, y: 12, duration: 0.45 })
          .from('.sp-hero-subtitle', { opacity: 0, y: 12, duration: 0.45 }, '-=0.2')
          .from('.sp-hero-buttons', { opacity: 0, y: 12, duration: 0.4 }, '-=0.2')
          .from('.sp-hero-trust-row', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2');

        // Menopause Hero Page Animations
        const menopauseHero = document.querySelector('.section_menopause-hero');
        if (menopauseHero) {
          const menoTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          menoTl
            .from('.menopause-hero__rating', { opacity: 0, y: 14, duration: 0.45 })
            .from('.menopause-hero__title-line', { opacity: 0, y: 18, stagger: 0.08, duration: 0.5 }, '-=0.25')
            .from('.menopause-hero__description', { opacity: 0, y: 14, duration: 0.45 }, '-=0.2')
            .from('.menopause-hero__cta-group', { opacity: 0, y: 14, duration: 0.4 }, '-=0.2')
            .from('.menopause-hero__trust-row', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2');
        }
      }

      if (ScrollTrigger) {
        const introSection = document.querySelector('.section_sp2_intro');
        if (introSection) {
          gsap.fromTo(introSection,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: introSection,
                start: 'top 88%',
                once: true
              }
            }
          );
        }

        const discoverySection = document.querySelector(".sp-treatment-discovery");
        if (discoverySection) {
          const discHeader = discoverySection.querySelector(".sp-discovery-header");
          if (discHeader) {
            gsap.fromTo(discHeader,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: discHeader,
                  start: "top 85%",
                  once: true
                }
              }
            );
          }
        }

        // ======================================================================
        // HORMONE BALANCE TREATMENT PAGE: RELIABLE SCROLL-DOWN-ONLY GSAP TRIGGERS
        // Triggers once when scrolling down into view; never hides cards on scroll
        // ======================================================================

        // 1. Trust Metrics Section
        const trustMetrics = document.getElementById("alivio-trust-metrics");
        if (trustMetrics) {
          const tmTl = gsap.timeline({
            scrollTrigger: {
              trigger: trustMetrics,
              start: "top 85%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });
          const eyebrow = trustMetrics.querySelector(".alivio-trust-eyebrow");
          const heading = trustMetrics.querySelector(".alivio-trust-heading");
          const cards = trustMetrics.querySelectorAll(".alivio-trust-card");
          if (eyebrow) tmTl.from(eyebrow, { opacity: 0, y: 12, duration: 0.45 });
          if (heading) tmTl.from(heading, { opacity: 0, y: 16, duration: 0.45 }, "-=0.25");
          if (cards.length) tmTl.from(cards, { opacity: 0, y: 20, stagger: 0.08, duration: 0.5 }, "-=0.2");
        }

        // 2. Hormone Showcase Section
        const showcaseSection = document.querySelector(".section_hormone-showcase");
        if (showcaseSection) {
          const showcaseTl = gsap.timeline({
            scrollTrigger: {
              trigger: showcaseSection,
              start: "top 82%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });

          const badge = showcaseSection.querySelector(".alivio-works-pill-badge");
          const title = showcaseSection.querySelector(".hormone-showcase__title");
          const desc = showcaseSection.querySelector(".hormone-showcase__description");
          const media = showcaseSection.querySelector(".hormone-showcase__image-wrapper");
          const badges = showcaseSection.querySelectorAll(".hormone-badge");

          if (badge) showcaseTl.from(badge, { opacity: 0, y: 12, duration: 0.45 });
          if (title) showcaseTl.from(title, { opacity: 0, y: 16, duration: 0.5 }, "-=0.25");
          if (desc) showcaseTl.from(desc, { opacity: 0, y: 12, duration: 0.45 }, "-=0.25");
          if (media) showcaseTl.from(media, { opacity: 0, y: 24, scale: 0.97, duration: 0.6 }, "-=0.2");
          if (badges.length) showcaseTl.from(badges, { opacity: 0, y: 14, stagger: 0.08, duration: 0.45 }, "-=0.35");
        }

        // 3. Online Care Section (Twin Cards + 3 Guarantee Boxes + CTA)
        const onlineCare = document.getElementById("menopause-online-care");
        if (onlineCare) {
          const careTl = gsap.timeline({
            scrollTrigger: {
              trigger: onlineCare,
              start: "top 82%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });

          const badge = onlineCare.querySelector(".alivio-works-pill-badge");
          const title = onlineCare.querySelector(".menopause-online-care__title");
          const subtitle = onlineCare.querySelector(".menopause-online-care__subtitle");
          const cards = onlineCare.querySelectorAll(".menopause-care-card");
          const pillars = onlineCare.querySelectorAll(".menopause-pillar-box");
          const actionWrap = onlineCare.querySelector(".menopause-online-care__action-wrap");

          if (badge) careTl.from(badge, { opacity: 0, y: 12, duration: 0.45 });
          if (title) careTl.from(title, { opacity: 0, y: 16, duration: 0.5 }, "-=0.25");
          if (subtitle) careTl.from(subtitle, { opacity: 0, y: 12, duration: 0.45 }, "-=0.25");
          if (cards.length) careTl.from(cards, { opacity: 0, y: 24, stagger: 0.12, duration: 0.55 }, "-=0.2");
          if (pillars.length) careTl.from(pillars, { opacity: 0, y: 20, stagger: 0.08, duration: 0.5 }, "-=0.25");
          if (actionWrap) careTl.from(actionWrap, { opacity: 0, y: 16, duration: 0.45 }, "-=0.2");
        }

        // 4. Clinical Experts Section
        const expertsSection = document.getElementById("clinical-experts");
        if (expertsSection) {
          const expTl = gsap.timeline({
            scrollTrigger: {
              trigger: expertsSection,
              start: "top 82%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });

          const intro = expertsSection.querySelector(".clinical-experts__intro");
          const media = expertsSection.querySelector(".clinical-experts__media-col");

          if (intro) expTl.from(intro, { opacity: 0, y: 20, duration: 0.5 });
          if (media) expTl.from(media, { opacity: 0, y: 24, scale: 0.98, duration: 0.6 }, "-=0.3");
        }

        // 5. Products & Treatments Section (Bulletproof visible reveal with immediate fallback)
        const productsSection = document.getElementById("menopause-treatments");
        if (productsSection) {
          const header = productsSection.querySelector(".menopause-products__header");
          const cards = productsSection.querySelectorAll(".menopause-product-card");

          // Ensure cards start cleanly and always resolve to visible
          if (header) {
            gsap.from(header, {
              opacity: 0,
              y: 16,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: productsSection,
                start: "top 88%",
                once: true
              }
            });
          }

          if (cards.length) {
            // Animate horizontally scrollable cards directly on their container trigger
            gsap.fromTo(cards,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.06,
                ease: "power2.out",
                clearProps: "all", // Removes inline opacity & transform when finished so cards are 100% visible & clean
                scrollTrigger: {
                  trigger: productsSection,
                  start: "top 90%",
                  once: true,
                  onEnter: () => {
                    // Safety assurance: force display & opacity after trigger
                    cards.forEach(c => {
                      c.style.opacity = "1";
                      c.style.visibility = "visible";
                    });
                  }
                }
              }
            );
          }
        }

        // 6. Testimonials Section
        const testimonialsSection = document.getElementById("patient-testimonials");
        if (testimonialsSection) {
          const testTl = gsap.timeline({
            scrollTrigger: {
              trigger: testimonialsSection,
              start: "top 82%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });

          const badge = testimonialsSection.querySelector(".alivio-works-pill-badge");
          const title = testimonialsSection.querySelector(".sp-testimonials__title");
          const cards = testimonialsSection.querySelectorAll(".sp-testimonial-card");

          if (badge) testTl.from(badge, { opacity: 0, y: 12, duration: 0.45 });
          if (title) testTl.from(title, { opacity: 0, y: 16, duration: 0.5 }, "-=0.25");
          if (cards.length) testTl.from(cards, { opacity: 0, y: 22, stagger: 0.1, duration: 0.55 }, "-=0.2");
        }

        // 7. FAQ Section
        const faqSection = document.getElementById("faq");
        if (faqSection) {
          const faqTl = gsap.timeline({
            scrollTrigger: {
              trigger: faqSection,
              start: "top 82%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });

          const heading = faqSection.querySelector(".sp-heading-h2");
          const lead = faqSection.querySelector(".sp-lead");
          const card = faqSection.querySelector(".sp-faq-container-card");

          if (heading) faqTl.from(heading, { opacity: 0, y: 16, duration: 0.5 });
          if (lead) faqTl.from(lead, { opacity: 0, y: 12, duration: 0.45 }, "-=0.25");
          if (card) faqTl.from(card, { opacity: 0, y: 22, duration: 0.55 }, "-=0.2");
        }

        // 8. Custom Footer Hero Banner
        const customFooter = document.querySelector(".alivio-custom-footer");
        if (customFooter) {
          const footerTl = gsap.timeline({
            scrollTrigger: {
              trigger: customFooter,
              start: "top 85%",
              once: true
            },
            defaults: { ease: "power2.out" }
          });

          const badge = customFooter.querySelector(".alivio-footer-hero__badge");
          const title = customFooter.querySelector(".alivio-footer-hero__title");
          const desc = customFooter.querySelector(".alivio-footer-hero__desc");
          const cta = customFooter.querySelector(".alivio-footer-hero__cta-group");

          if (badge) footerTl.from(badge, { opacity: 0, y: 12, duration: 0.45 });
          if (title) footerTl.from(title, { opacity: 0, y: 18, duration: 0.55 }, "-=0.25");
          if (desc) footerTl.from(desc, { opacity: 0, y: 14, duration: 0.45 }, "-=0.25");
          if (cta) footerTl.from(cta, { opacity: 0, y: 16, duration: 0.45 }, "-=0.2");
        }
      }
    });
  }

  // ==========================================================================
  // 6. MAIN APPLICATION INITIALIZATION
  // ==========================================================================
  function initApp() {
    initNavigation();
    initHowItWorks();
    initAccordion();
    initMotion();
    initHeroRotator();

    // Intake Modal Triggers (Interactive Alivio Health Assessment)
    const intakeTriggers = document.querySelectorAll('[data-intake-trigger]');
    intakeTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preselectedGoal = btn.getAttribute('data-intake-goal');
        if (window.AlivioIntake && typeof window.AlivioIntake.open === 'function') {
          window.AlivioIntake.open(preselectedGoal);
        } else {
          const m = document.getElementById('alivio-intake-modal');
          if (m) {
            m.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });

    const modalClose = document.querySelectorAll('[data-modal-close], [data-intake-close]');
    modalClose.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.AlivioIntake && typeof window.AlivioIntake.close === 'function') {
          window.AlivioIntake.close();
        } else {
          const m = document.getElementById('alivio-intake-modal');
          if (m) {
            m.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });

    // Floating Hero Product Carousel
    const heroProductCard = document.getElementById('hero-product-card');
    if (heroProductCard) {
      const SESSION_DISMISSED_KEY = 'alivio_hero_card_closed';

      if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === 'true') {
        heroProductCard.style.display = 'none';
      } else {
        const cardContent = document.getElementById('hero-card-content');
        const cardImg = document.getElementById('hero-card-img');
        const cardBadge = document.getElementById('hero-card-badge');
        const cardName = document.getElementById('hero-card-name');
        const cardPrice = document.getElementById('hero-card-price');
        const cardCta = document.getElementById('hero-card-cta');
        const closeBtn = document.getElementById('hero-product-card-close');

        const HERO_PRODUCTS = [
          {
            id: 'tirzepatide',
            name: 'Tirzepatide Injection',
            image: 'assets/images/prod-tirzepatide-vial.png',
            alt: 'Tirzepatide Injection vial',
            badge: 'MOST POPULAR',
            price: 'From $89/mo*',
            ctaLabel: 'Get Started',
            ariaLabel: 'Get Started with Tirzepatide'
          },
          {
            id: 'oral-weight-care',
            name: 'Oral Weight Care',
            image: 'assets/images/prod-tirzepatide-oral-pill.png',
            alt: 'Oral Weight Care tablet',
            badge: 'MOST POPULAR',
            price: 'From $89/mo*',
            ctaLabel: 'Get Started',
            ariaLabel: 'Get Started with Oral Weight Care'
          },
          {
            id: 'semaglutide-pen',
            name: 'Semaglutide Pen',
            image: 'assets/images/prod-semaglutide-pen.png',
            alt: 'Semaglutide Pen injection',
            badge: 'MOST POPULAR',
            price: 'From $89/mo*',
            ctaLabel: 'Get Started',
            ariaLabel: 'Get Started with Semaglutide Pen'
          }
        ];

        HERO_PRODUCTS.forEach(p => {
          const preImg = new Image();
          preImg.src = p.image;
        });

        let currentHeroIndex = 0;
        let heroCarouselTimer = null;
        const ROTATION_INTERVAL = 3000;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const applyHeroProduct = (index) => {
          const prod = HERO_PRODUCTS[index];
          if (!prod) return;

          if (cardImg) {
            cardImg.src = prod.image;
            cardImg.alt = prod.alt;
          }
          if (cardBadge) cardBadge.textContent = prod.badge;
          if (cardName) cardName.textContent = prod.name;
          if (cardPrice) cardPrice.textContent = prod.price;
          if (cardCta) {
            cardCta.setAttribute('aria-label', prod.ariaLabel);
            cardCta.setAttribute('data-product', prod.id);
          }
        };

        const changeHeroProduct = (nextIndex) => {
          if (prefersReducedMotion || !cardContent) {
            applyHeroProduct(nextIndex);
            return;
          }

          cardContent.classList.add('is-transitioning');
          setTimeout(() => {
            applyHeroProduct(nextIndex);
            cardContent.classList.remove('is-transitioning');
          }, 220);
        };

        const startHeroCarousel = () => {
          if (heroCarouselTimer) clearInterval(heroCarouselTimer);
          heroCarouselTimer = setInterval(() => {
            currentHeroIndex = (currentHeroIndex + 1) % HERO_PRODUCTS.length;
            changeHeroProduct(currentHeroIndex);
          }, ROTATION_INTERVAL);
        };

        const stopHeroCarousel = () => {
          if (heroCarouselTimer) {
            clearInterval(heroCarouselTimer);
            heroCarouselTimer = null;
          }
        };

        startHeroCarousel();

        heroProductCard.addEventListener('mouseenter', stopHeroCarousel);
        heroProductCard.addEventListener('mouseleave', () => {
          if (sessionStorage.getItem(SESSION_DISMISSED_KEY) !== 'true') {
            startHeroCarousel();
          }
        });
        heroProductCard.addEventListener('focusin', stopHeroCarousel);
        heroProductCard.addEventListener('focusout', () => {
          if (sessionStorage.getItem(SESSION_DISMISSED_KEY) !== 'true') {
            startHeroCarousel();
          }
        });

        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopHeroCarousel();
            sessionStorage.setItem(SESSION_DISMISSED_KEY, 'true');

            heroProductCard.style.transition = 'opacity 240ms ease, transform 240ms ease';
            heroProductCard.style.opacity = '0';
            heroProductCard.style.transform = 'scale(0.96) translateY(4px)';
            heroProductCard.style.pointerEvents = 'none';

            setTimeout(() => {
              heroProductCard.style.display = 'none';
            }, 250);
          });
        }
      }
    }

    // Alivio Treatment Discovery Carousel (Alivio-Style Horizontal Slider)
    const careTrack = document.getElementById("alivio-treatments-track");
    const carePrev = document.getElementById("treatment-carousel-prev");
    const careNext = document.getElementById("treatment-carousel-next");

    if (careTrack) {
      const getScrollAmount = () => {
        const firstCard = careTrack.querySelector(".alivio-care-card");
        return firstCard ? firstCard.offsetWidth + 12 : 316;
      };

      const updateNavButtons = () => {
        if (!carePrev || !careNext) return;
        const maxScroll = careTrack.scrollWidth - careTrack.clientWidth - 5;
        carePrev.disabled = careTrack.scrollLeft <= 5;
        careNext.disabled = careTrack.scrollLeft >= maxScroll;
      };

      if (carePrev) {
        carePrev.addEventListener("click", () => {
          careTrack.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });
      }

      if (careNext) {
        careNext.addEventListener("click", () => {
          careTrack.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        });
      }

      careTrack.addEventListener("scroll", updateNavButtons, { passive: true });
      window.addEventListener("resize", updateNavButtons);
      setTimeout(updateNavButtons, 200);

      // Drag to scroll support for desktop mouse
      let isDown = false;
      let startX = 0;
      let scrollLeftPos = 0;
      let moved = false;

      careTrack.addEventListener("mousedown", (e) => {
        isDown = true;
        moved = false;
        startX = e.pageX - careTrack.offsetLeft;
        scrollLeftPos = careTrack.scrollLeft;
      });

      careTrack.addEventListener("mouseleave", () => {
        isDown = false;
      });

      careTrack.addEventListener("mouseup", () => {
        isDown = false;
      });

      careTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - careTrack.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 5) moved = true;
        careTrack.scrollLeft = scrollLeftPos - walk;
      });

      // Prevent accidental link navigation on drag
      careTrack.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      });
    }

    // Alivio Clinical Trust Metrics Smooth Spinning Number Animation
    const trustMetricsSection = document.getElementById("alivio-trust-metrics");
    if (trustMetricsSection) {
      const counters = trustMetricsSection.querySelectorAll(".alivio-spin-num");
      let hasAnimated = false;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const runSpinningCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        const duration = 2200; // 2.2s smooth acceleration & deceleration
        const startTime = performance.now();

        const animateCounters = (currentTime) => {
          const elapsed = currentTime - startTime;
          const rawProgress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutCubic(rawProgress);

          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target")) || 0;
            const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
            const suffix = counter.getAttribute("data-suffix") || "";

            const currentVal = target * easedProgress;
            const formatted = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal);
            counter.textContent = `${formatted}${suffix}`;
          });

          if (rawProgress < 1) {
            requestAnimationFrame(animateCounters);
          } else {
            // Guarantee exact final values
            counters.forEach((counter) => {
              const target = parseFloat(counter.getAttribute("data-target")) || 0;
              const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
              const suffix = counter.getAttribute("data-suffix") || "";
              counter.textContent = `${decimals > 0 ? target.toFixed(decimals) : target}${suffix}`;
            });
          }
        };

        requestAnimationFrame(animateCounters);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Immediate values without motion
        counters.forEach((counter) => {
          const target = counter.getAttribute("data-target");
          const suffix = counter.getAttribute("data-suffix") || "";
          counter.textContent = `${target}${suffix}`;
        });
      } else if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runSpinningCounters();
              observer.disconnect();
            }
          });
        }, { threshold: 0.25 });

        observer.observe(trustMetricsSection);
      } else {
        runSpinningCounters();
      }
    }

    // Product Showcase Carousel Track Controls
    const productsTrack = document.getElementById("products-track");
    const productsPrev = document.getElementById("products-carousel-prev");
    const productsNext = document.getElementById("products-carousel-next");
    const productsDots = document.querySelectorAll("#products-pagination .sp-products-dot");

    if (productsTrack) {
      const getProductScrollStep = () => {
        const card = productsTrack.querySelector(".sp-product-card");
        if (!card) return 240;
        const gap = parseInt(window.getComputedStyle(productsTrack).gap) || 14;
        return card.offsetWidth + gap;
      };

      const updateProductControls = () => {
        const maxScroll = productsTrack.scrollWidth - productsTrack.clientWidth;
        const currentScroll = productsTrack.scrollLeft;

        if (productsPrev) {
          productsPrev.disabled = currentScroll <= 4;
        }
        if (productsNext) {
          productsNext.disabled = currentScroll >= maxScroll - 4;
        }

        if (productsDots.length && maxScroll > 0) {
          const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
          const activeIdx = Math.min(Math.round(progress * (productsDots.length - 1)), productsDots.length - 1);
          productsDots.forEach((dot, idx) => {
            const isActive = idx === activeIdx;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-selected", isActive ? "true" : "false");
          });
        }
      };

      if (productsPrev) {
        productsPrev.addEventListener("click", () => {
          productsTrack.scrollBy({ left: -getProductScrollStep(), behavior: "smooth" });
        });
      }

      if (productsNext) {
        productsNext.addEventListener("click", () => {
          productsTrack.scrollBy({ left: getProductScrollStep(), behavior: "smooth" });
        });
      }

      productsDots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
          const maxScroll = productsTrack.scrollWidth - productsTrack.clientWidth;
          if (maxScroll > 0) {
            const target = (idx / (productsDots.length - 1)) * maxScroll;
            productsTrack.scrollTo({ left: target, behavior: "smooth" });
          }
        });
      });

      productsTrack.addEventListener("scroll", () => {
        requestAnimationFrame(updateProductControls);
      }, { passive: true });

      // Alivio Category Tabs
      const categoryTabs = document.querySelectorAll("#products-category-tabs .sp-product-tab");
      const categoryOrderMap = {
        "weight-care": ["estradiol-patch", "tirzepatide", "semaglutide", "alivio-oral", "semaglutide-pen", "tirzepatide-oral", "tirzepatide-alt", "semaglutide-alt"],
        "hormone-therapy": ["estradiol-patch", "alivio-oral", "tirzepatide-oral", "tirzepatide", "semaglutide-pen", "semaglutide", "tirzepatide-alt", "semaglutide-alt"],
        "energy-focus": ["semaglutide", "semaglutide-pen", "alivio-oral", "estradiol-patch", "tirzepatide", "tirzepatide-oral", "tirzepatide-alt", "semaglutide-alt"],
        "sleep-recovery": ["tirzepatide-oral", "alivio-oral", "estradiol-patch", "tirzepatide", "semaglutide", "semaglutide-pen", "semaglutide-alt", "tirzepatide-alt"],
        "healthy-aging": ["estradiol-patch", "semaglutide-pen", "tirzepatide", "semaglutide", "alivio-oral", "tirzepatide-oral", "tirzepatide-alt", "semaglutide-alt"],
        "skin-care": ["estradiol-patch", "tirzepatide-oral", "alivio-oral", "semaglutide", "tirzepatide", "semaglutide-pen", "tirzepatide-alt", "semaglutide-alt"]
      };

      if (categoryTabs.length) {
        categoryTabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            if (tab.classList.contains("is-active")) return;

            categoryTabs.forEach((t) => {
              const isActive = t === tab;
              t.classList.toggle("is-active", isActive);
              t.setAttribute("aria-selected", isActive ? "true" : "false");
            });

            const category = tab.getAttribute("data-category");
            const order = categoryOrderMap[category] || categoryOrderMap["weight-care"];

            productsTrack.style.opacity = "0.45";
            productsTrack.style.transform = "scale(0.985)";

            setTimeout(() => {
              order.forEach((id) => {
                const card = productsTrack.querySelector(`.sp-product-card[data-product-id="${id}"]`);
                if (card) {
                  productsTrack.appendChild(card);
                }
              });

              productsTrack.scrollLeft = 0;
              updateProductControls();

              productsTrack.style.opacity = "1";
              productsTrack.style.transform = "scale(1)";
            }, 160);
          });
        });
      }

      productsTrack.scrollLeft = 0;
      updateProductControls();
      window.addEventListener("resize", updateProductControls, { passive: true });
    }

    // ========================================================================
    // 14. HOW ALIVIO WORKS — STILLROOM-INSPIRED SCROLL-DRIVEN GSAP ANIMATION
    // ========================================================================
    initHowItWorksScrollAnimation();

    // ========================================================================
    // 15. PERSONALIZED HORMONE CARE SLIDER (1 SLIDE AT A TIME)
    // ========================================================================
    initCareStoriesSlider();
  }

  function initCareStoriesSlider() {
    const sliderSection = document.getElementById("care-stories");
    if (!sliderSection) return;

    const slides = Array.from(sliderSection.querySelectorAll(".sp-care-slide"));
    const dots = Array.from(sliderSection.querySelectorAll(".sp-care-dot"));
    const prevBtn = sliderSection.querySelector("#care-prev-btn");
    const nextBtn = sliderSection.querySelector("#care-next-btn");

    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      // Update Slides
      slides.forEach((slide, idx) => {
        const isActive = idx === currentSlide;
        slide.classList.toggle("active", isActive);
        slide.setAttribute("aria-hidden", !isActive);
      });

      // Update Dots
      dots.forEach((dot, idx) => {
        const isActive = idx === currentSlide;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-selected", isActive);
      });
    }

    const carousel = sliderSection.querySelector(".sp-care-carousel");

    // 4-Second Auto-Rotation Timer with Pause on Hover
    let autoRotationTimer = null;
    const AUTO_INTERVAL = 4000;

    function startAutoRotation() {
      stopAutoRotation();
      autoRotationTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, AUTO_INTERVAL);
    }

    function stopAutoRotation() {
      if (autoRotationTimer) {
        clearInterval(autoRotationTimer);
        autoRotationTimer = null;
      }
    }

    function resetAutoRotation() {
      stopAutoRotation();
      startAutoRotation();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
        resetAutoRotation();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
        resetAutoRotation();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        goToSlide(idx);
        resetAutoRotation();
      });
    });

    if (carousel) {
      // Pause rotation on hover / focus
      carousel.addEventListener("mouseenter", stopAutoRotation);
      carousel.addEventListener("mouseleave", startAutoRotation);
      carousel.addEventListener("focusin", stopAutoRotation);
      carousel.addEventListener("focusout", startAutoRotation);

      carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          goToSlide(currentSlide - 1);
          resetAutoRotation();
        } else if (e.key === "ArrowRight") {
          goToSlide(currentSlide + 1);
          resetAutoRotation();
        }
      });

      // Touch swipe support for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoRotation();
      }, { passive: true });

      carousel.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoRotation();
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          goToSlide(currentSlide + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
          goToSlide(currentSlide - 1);
        }
      }
    }

    // Start auto rotation initially
    startAutoRotation();
  }

  function initHowItWorksScrollAnimation() {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const cards = Array.from(section.querySelectorAll(".alivio-works-step-card"));
    if (!cards.length) return;

    // Check for GSAP & ScrollTrigger support
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Desktop stacking cards subtle scale/opacity transitions matching Alivio
      if (window.innerWidth >= 992) {
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];
            // Step 1 retains 100% full opacity with no faded effect per direct user requirement
            const targetOpacity = i === 0 ? 1.0 : 0.65;
            gsap.to(card.querySelector(".alivio-works-card-container"), {
              scale: 0.94,
              opacity: targetOpacity,
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,
                start: "top bottom",
                end: "top top",
                scrub: true
              }
            });
          }
        });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
