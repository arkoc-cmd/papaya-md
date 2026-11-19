/**
 * Alivio Main Application Entry Point
 * Orchestrates navigation, how-it-works interactive steps, accordions, and motion modules.
 */

import { initNavigation } from './modules/navigation.js';
import { initHowItWorks } from './modules/how-it-works.js';
import { initAccordion } from './modules/accordion.js';
import { initMotion } from './modules/motion.js';
import { initHeroRotator } from './modules/hero-rotator.js';

function initApp() {
  initNavigation();
  initHowItWorks();
  initAccordion();
  initMotion();
  initHeroRotator();

  // Handle generic modal placeholders for intake assessment
  const intakeTriggers = document.querySelectorAll('[data-intake-trigger]');
  const modal = document.getElementById('intake-modal');

  intakeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const modalClose = document.querySelectorAll('[data-modal-close]');
  modalClose.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Floating Hero Product Carousel (Auto-Rotating Mini-Carousel)
  const heroProductCard = document.getElementById('hero-product-card');
  if (heroProductCard) {
    const SESSION_DISMISSED_KEY = 'alivio_hero_card_closed';

    // If dismissed in current page session, keep hidden
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

      // Preload images into browser memory to eliminate swap latency
      HERO_PRODUCTS.forEach(p => {
        const preImg = new Image();
        preImg.src = p.image;
      });

      let currentHeroIndex = 0;
      let heroCarouselTimer = null;
      const ROTATION_INTERVAL = 3000; // 3 seconds

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

      // Start automatic 3-second carousel
      startHeroCarousel();

      // Pause on hover or focus to maximize accessibility and prevent misclicks
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

      // Close button dismisses card and saves to sessionStorage
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

  // Treatment Discovery Horizontal Carousel Track Controls
  const treatmentTrack = document.getElementById("treatment-track");
  const treatmentPrev = document.getElementById("treatment-carousel-prev");
  const treatmentNext = document.getElementById("treatment-carousel-next");
  const treatmentDots = document.querySelectorAll(".sp-carousel-dot");

  if (treatmentTrack) {
    const getScrollStep = () => {
      const card = treatmentTrack.querySelector(".sp-treatment-card");
      if (!card) return 300;
      const gap = parseInt(window.getComputedStyle(treatmentTrack).gap) || 20;
      return card.offsetWidth + gap;
    };

    const updateControls = () => {
      const maxScroll = treatmentTrack.scrollWidth - treatmentTrack.clientWidth;
      const currentScroll = treatmentTrack.scrollLeft;

      if (treatmentPrev) {
        treatmentPrev.disabled = currentScroll <= 4;
      }
      if (treatmentNext) {
        treatmentNext.disabled = currentScroll >= maxScroll - 4;
      }

      // Update dots
      if (treatmentDots.length && maxScroll > 0) {
        const progress = currentScroll / maxScroll;
        const activeIdx = Math.min(
          treatmentDots.length - 1,
          Math.round(progress * (treatmentDots.length - 1))
        );
        treatmentDots.forEach((dot, idx) => {
          dot.classList.toggle("is-active", idx === activeIdx);
          dot.setAttribute("aria-selected", idx === activeIdx ? "true" : "false");
        });
      }
    };

    if (treatmentPrev) {
      treatmentPrev.addEventListener("click", () => {
        treatmentTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      });
    }

    if (treatmentNext) {
      treatmentNext.addEventListener("click", () => {
        treatmentTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      });
    }

    treatmentDots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-index"), 10);
        const maxScroll = treatmentTrack.scrollWidth - treatmentTrack.clientWidth;
        const targetScroll = (maxScroll / (treatmentDots.length - 1)) * idx;
        treatmentTrack.scrollTo({ left: targetScroll, behavior: "smooth" });
      });
    });

    treatmentTrack.addEventListener("scroll", () => {
      requestAnimationFrame(updateControls);
    }, { passive: true });

    treatmentTrack.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        treatmentTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        treatmentTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      }
    });

    treatmentTrack.scrollLeft = 0;
    updateControls();
    window.addEventListener("resize", updateControls, { passive: true });
  }

  // Product Showcase Horizontal Carousel Track Controls
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

    productsTrack.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        productsTrack.scrollBy({ left: getProductScrollStep(), behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        productsTrack.scrollBy({ left: -getProductScrollStep(), behavior: "smooth" });
      }
    });

    // Alivio Category Tabs & Dynamic Card Swapping
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

          // Smooth micro-fade to indicate category transition
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
