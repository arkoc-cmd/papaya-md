/**
 * Alivio Product Details Page (PDP) — Interactive Foundation
 * Lightweight, vanilla JavaScript module managing dosage selection,
 * plan selection, quantity counter, gallery thumbnails, and FAQ accordions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Thumbnail Switching
  const thumbButtons = document.querySelectorAll('.pdp-hero__thumb-btn');
  const mainImage = document.querySelector('.pdp-hero__main-img');
  const mainPlaceholder = document.querySelector('.pdp-hero__main-view .pdp-placeholder-media__label');

  if (thumbButtons.length > 0) {
    thumbButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        thumbButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const newSrc = btn.getAttribute('data-full-img');
        const newAlt = btn.getAttribute('data-alt');
        const viewLabel = btn.getAttribute('data-label');

        if (mainImage && newSrc) {
          mainImage.src = newSrc;
          if (newAlt) mainImage.alt = newAlt;

          // 2nd, 3rd, 4th, 5th image fit to box proportionally
          if (index === 0) {
            mainImage.classList.remove('pdp-hero__main-img--cover');
          } else {
            mainImage.classList.add('pdp-hero__main-img--cover');
          }
        }

        if (mainPlaceholder && viewLabel) {
          mainPlaceholder.textContent = viewLabel;
        }
      });
    });
  }

  // 2. Dosage Strength Selection
  const dosageButtons = document.querySelectorAll('.pdp-dosage-btn');
  dosageButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      dosageButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  // 3. Cadence Selection
  const cadenceButtons = document.querySelectorAll('.pdp-cadence-btn');
  cadenceButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      cadenceButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  // 4. Care Plan Selector (Subscription vs 90-day)
  const planCards = document.querySelectorAll('.pdp-plan-card');
  planCards.forEach((card) => {
    card.addEventListener('click', () => {
      planCards.forEach(c => {
        c.classList.remove('is-active');
        const radio = c.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
      });
      card.classList.add('is-active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // 5. Quantity Counter
  const qtyMinus = document.getElementById('pdp-qty-minus');
  const qtyPlus = document.getElementById('pdp-qty-plus');
  const qtyDisplay = document.getElementById('pdp-qty-display');

  let currentQty = 1;
  const minQty = 1;
  const maxQty = 6;

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener('click', () => {
      if (currentQty > minQty) {
        currentQty--;
        qtyDisplay.textContent = currentQty;
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (currentQty < maxQty) {
        currentQty++;
        qtyDisplay.textContent = currentQty;
      }
    });
  }

  // 6. Mobile Drawer Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('is-open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  }

  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  // 7. Menopause Products Carousel Navigation (Exact from Treatment Page)
  const menoTrack = document.getElementById('meno-track');
  const menoPrev = document.getElementById('meno-prev');
  const menoNext = document.getElementById('meno-next');

  if (menoTrack && menoPrev && menoNext) {
    const cardWidth = 336; // 320px width + 16px gap

    const updateMenoButtons = () => {
      menoPrev.disabled = menoTrack.scrollLeft <= 5;
      menoNext.disabled = menoTrack.scrollLeft >= (menoTrack.scrollWidth - menoTrack.clientWidth - 5);
    };

    menoPrev.addEventListener('click', () => {
      menoTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    menoNext.addEventListener('click', () => {
      menoTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    menoTrack.addEventListener('scroll', updateMenoButtons, { passive: true });
    updateMenoButtons();
  }

  // 8. Bottom Sticky Quick Purchase Bar (Reveals on scroll past Hero first fold)
  const stickyBar = document.getElementById('pdp-sticky-bar');
  const heroSection = document.getElementById('section-product-hero');

  if (stickyBar) {
    const handleStickyBarScroll = () => {
      // Trigger when scrolling past hero section or past 500px
      const triggerY = heroSection ? (heroSection.offsetTop + heroSection.offsetHeight - 120) : 550;
      if (window.scrollY > triggerY) {
        stickyBar.classList.add('is-visible');
        stickyBar.setAttribute('aria-hidden', 'false');
      } else {
        stickyBar.classList.remove('is-visible');
        stickyBar.setAttribute('aria-hidden', 'true');
      }
    };

    window.addEventListener('scroll', handleStickyBarScroll, { passive: true });
    handleStickyBarScroll();
  }

  // 9. GSAP & ScrollTrigger Animations (Matching Homepage Editorial Standard)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Animate section header badges, titles, and subheadings
      const sectionHeaders = document.querySelectorAll('.pdp-section-header, .sp-testimonials__header');
      sectionHeaders.forEach((header) => {
        const badge = header.querySelector('.alivio-works-pill-badge');
        const title = header.querySelector('.pdp-section-title, .sp-testimonials__title');
        const sub = header.querySelector('.pdp-section-subtitle, .alivio-testimonials-trustpilot');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          }
        });

        if (badge) {
          tl.fromTo(badge, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        }
        if (title) {
          tl.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
        }
        if (sub) {
          tl.fromTo(sub, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3');
        }
      });

      // Animate Treatment Benefits cards and center showcase
      const benefitsLayout = document.querySelector('.pdp-benefits-layout');
      if (benefitsLayout) {
        gsap.fromTo(
          benefitsLayout.querySelectorAll('.pdp-benefit-card, .pdp-benefits-center-showcase'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: benefitsLayout,
              start: 'top 82%',
              once: true
            }
          }
        );
      }

      // Animate Comparison Matrix Card
      const matrixCard = document.querySelector('.pdp-matrix-card');
      if (matrixCard) {
        gsap.fromTo(
          matrixCard,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: matrixCard,
              start: 'top 82%',
              once: true
            }
          }
        );
      }

      // Animate Video Testimonials cards
      const videoGrid = document.querySelector('.pdp-video-grid');
      if (videoGrid) {
        gsap.fromTo(
          videoGrid.querySelectorAll('.pdp-video-card'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoGrid,
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // Animate Clinical Details section
      const detailsLayout = document.querySelector('.pdp-details-layout');
      if (detailsLayout) {
        gsap.fromTo(
          detailsLayout.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailsLayout,
              start: 'top 82%',
              once: true
            }
          }
        );
      }
    }
  }
});

