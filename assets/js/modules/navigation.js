/**
 * Navigation Module
 * Controls sticky header state, mobile drawer, focus trapping, and ARIA updates.
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.menu-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.sp-drawer, .drawer');
  const backdrop = document.querySelector('.sp-drawer-backdrop, .drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.sp-drawer-link, .drawer-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    isExpanded ? closeDrawer() : openDrawer();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Handle Escape key to close drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
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
      const prevIdx = activeIdx;
      activeIdx = (activeIdx + 1) % slides.length;

      slides[prevIdx].classList.remove('active');
      slides[prevIdx].classList.add('exit');

      slides[activeIdx].classList.add('active');

      setTimeout(() => {
        slides[prevIdx].classList.remove('exit');
      }, 650);
    }, 3500);
  }
}
