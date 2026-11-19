/**
 * Alivio — Cinematic Experience, Smooth Scrolling & Visual Systems Module
 * - Lenis Momentum Smooth Scroll (synchronized with GSAP ScrollTrigger)
 * - Clickable Product Cards (Direct PDP navigation)
 * - Hero Video Autoplay & Intersection Loading Guardian
 * - Lucide Icon Initializer
 * - Scroll-Triggered Dynamic Navigation CTA
 */

(function () {
  'use strict';

  // 1. Lenis Smooth Scrolling Integration
  function initLenisScroll() {
    if (typeof Lenis === 'undefined') return;

    // Respect reduced motion: users who prefer reduced motion retain instant native scrolling
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      const lenis = new Lenis({
        duration: 1.2, // Option A: 1.2s premium editorial inertia
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        smoothTouch: false, // Option A: Native 1:1 momentum touch scroll on mobile touch screens
        infinite: false,
      });

      // Synchronize with GSAP ScrollTrigger if present
      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Option A: Smooth anchor navigation via lenis.scrollTo() with sticky header offset
      initLenisAnchorLinks(lenis);

      // Prevent Lenis interference inside scrollable drawers and modal overlays
      const modalElements = document.querySelectorAll('.sp-drawer, .sp-drawer-content, [role="dialog"], .intake-modal');
      modalElements.forEach((el) => {
        el.setAttribute('data-lenis-prevent', 'true');
      });

      window.lenis = lenis;
    } catch (e) {
      console.warn('[Alivio] Lenis initialization notice:', e);
    }
  }

  // Anchor Link Smooth Scrolling with Sticky Navbar Offset
  function initLenisAnchorLinks(lenis) {
    if (!lenis) return;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      // Skip modal triggers that don't correspond to on-page anchor elements
      if (link.hasAttribute('data-intake-trigger') && !document.querySelector(href)) return;

      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const header = document.querySelector('.site-header');
          const offset = header ? -Math.max(header.offsetHeight, 72) : -72;
          lenis.scrollTo(target, {
            offset: offset,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      } catch (err) {
        // Silently ignore invalid selectors
      }
    });
  }

  // 2. Clickable Product Cards (Direct PDP navigation)
  function initClickableProductCards() {
    const isTreatmentsPath = window.location.pathname.includes('/treatments/');
    const defaultPdpUrl = isTreatmentsPath ? 'estradiol-patch.html' : 'estradiol-patch.html';

    const cards = document.querySelectorAll('.sp-product-card, .menopause-product-card');
    cards.forEach((card) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');

      const titleEl = card.querySelector('.sp-product-card__title, .menopause-product-card__title, h3, h4');
      const cardTitle = titleEl ? titleEl.textContent.trim() : 'Treatment Plan';
      card.setAttribute('aria-label', `View details for ${cardTitle}`);

      const targetUrl = card.getAttribute('data-href') || defaultPdpUrl;

      // Click handler
      card.addEventListener('click', (e) => {
        // If user explicitly clicked an internal link, allow native action
        if (e.target.closest('a')) return;
        window.location.href = targetUrl;
      });

      // Keyboard accessibility (Enter / Space)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = targetUrl;
        }
      });
    });
  }

  // 3. Hero Video Autoplay & Intersection Loading Guardian
  function initHeroVideo() {
    const video = document.getElementById('hero-bg-video') || document.querySelector('.sp-hero-video');
    if (!video) return;

    video.muted = true;
    if (video.getAttribute('preload') !== 'metadata') {
      video.setAttribute('preload', 'metadata');
    }

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocks initial play, try on first user scroll or click
          const resumePlayback = () => {
            video.play().catch(() => { });
            window.removeEventListener('scroll', resumePlayback);
            window.removeEventListener('click', resumePlayback);
          };
          window.addEventListener('scroll', resumePlayback, { once: true, passive: true });
          window.addEventListener('click', resumePlayback, { once: true, passive: true });
        });
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startPlayback();
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(video);
    } else {
      startPlayback();
    }
  }

  // 4. Lucide Icon Initializer
  function initLucideIcons() {
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons({
          attrs: {
            'stroke-width': 1.75
          }
        });
      } catch (err) {
        console.warn('[Alivio] Lucide icon initialization notice:', err);
      }
    }
  }

  // 5. Scroll-Triggered Dynamic Navigation CTA
  function initNavbarScrollCta() {
    const navCta = document.querySelector('.alivio-nav-primary-cta');
    if (!navCta) return;

    function handleScrollState() {
      const isScrolled = window.scrollY > 40;
      if (isScrolled) {
        navCta.classList.add('is-scrolled');
      } else {
        navCta.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();
  }

  // Initialize on DOMContentLoaded or immediate execution
  function initAll() {
    initLucideIcons();
    initLenisScroll();
    initClickableProductCards();
    initHeroVideo();
    initNavbarScrollCta();
    initInstantNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expose global initializer for dynamic icon renders

  // 6. Fast Back-Forward Cache (bfcache) Restoration Guardian
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.style.overflow = "";
      const drawer = document.getElementById("mobile-drawer");
      const backdrop = document.getElementById("drawer-backdrop");
      if (drawer) drawer.classList.remove("active");
      if (backdrop) backdrop.classList.remove("active");
      const toggle = document.querySelector(".menu-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });


  // 7. Instant Logo & Navigation Speculative Warming
  function initInstantNavigation() {
    const homeLinks = document.querySelectorAll('a.brand-wordmark, a[href*="index.html"]');
    homeLinks.forEach(link => {
      link.addEventListener("mouseenter", prefetchTarget, { passive: true, once: true });
      link.addEventListener("touchstart", prefetchTarget, { passive: true, once: true });
    });

    function prefetchTarget(e) {
      const href = e.currentTarget.getAttribute("href");
      if (!href || href === "#" || href.startsWith("javascript:")) return;
      if (!document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "document";
        link.href = href;
        document.head.appendChild(link);
      }
    }
  }

  window.refreshAlivioIcons = initLucideIcons;
})();
