/**
 * Alivio Motion Module
 * Sleek, high-performance GSAP and ScrollTrigger animations.
 */

export function initMotion() {
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

    // 1. Hero Entrance Animation (Desktop Only, smooth fast reveal)
    if (isDesktop) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      heroTl
        .from('.sp-hero-badge', { opacity: 0, y: 12, duration: 0.45 })
        .from('.sp-hero-subtitle', { opacity: 0, y: 12, duration: 0.45 }, '-=0.2')
        .from('.sp-hero-buttons', { opacity: 0, y: 12, duration: 0.4 }, '-=0.2')
        .from('.sp-hero-trust-row', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2');
    }

    if (ScrollTrigger) {
      // 2. Doctor Proof & Institution Bar Reveal
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

      // 3. Treatment Categories Carousel Reveal
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

        const treatmentCards = discoverySection.querySelectorAll(".sp-treatment-card");
        if (treatmentCards.length) {
          gsap.fromTo(treatmentCards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".sp-treatment-track",
                start: "top 85%",
                once: true
              },
              clearProps: "transform"
            }
          );
        }
      }

      // 4. Preserved Protocol Cards for Section 07 (Discretion & Packaging)
      const protocols = document.querySelectorAll('.sp-protocol-card');
      if (protocols.length) {
        gsap.fromTo(protocols,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.sp-protocols-grid',
              start: 'top 85%',
              once: true
            },
            clearProps: 'transform'
          }
        );
      }

      // 5. Alivio Membership Table Rows Staggered Reveal
      const rows = document.querySelectorAll('.sp2-membership__row');
      if (rows.length) {
        gsap.fromTo(rows,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.sp2-membership-table',
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // 6. Clinical Leadership Split Grid
      const clinicians = document.querySelector('.section_clinicians_1');
      if (clinicians) {
        gsap.fromTo(clinicians.querySelector('.sp-clinicians-grid'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: clinicians,
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // 7. Desktop-Only Hero Background Subtle Parallax
      if (isDesktop) {
        const heroMedia = document.querySelector('.sp-hero-video, .sp-hero-img');
        if (heroMedia) {
          gsap.to(heroMedia, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: '.section_sp2-home-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5
            }
          });
        }
      }
    }
  });
}
