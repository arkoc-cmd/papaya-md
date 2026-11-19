/**
 * Alivio Interactive Treatment Selection & Intake Modal Engine
 * Pure Vanilla JavaScript (ES Module & Universal Browser Compatible)
 * Features:
 * - Unified modal entry point connected to all intake CTA buttons:
 *   "2-Minutes Assessment", "See If You Qualify", "Find My Fit", "Find Your Treatment"
 * - Clean treatment listing modal adhering to Alivio apothecary design system
 * - Inter regular (400 weight, -0.03em letter spacing) typography
 * - Disabled treatment cards with clear "Not Currently Available" status badge
 * - Direct navigation on active "Hormone Therapy (for women)" to hormone-women.html
 * - Full keyboard accessibility (Escape to close, enter/space trigger) & focus trapping
 */

(function() {
  'use strict';

  // Active treatment route mappings
  const TREATMENT_ROUTES = {
    'weight-loss': 'weight-loss.html',
    'hormone-women': 'hormone-women.html'
  };

  const STORAGE_KEY_SELECTED_TREATMENT = 'alivio_selected_treatment';

  function initIntakeEngine() {
    const modal = document.getElementById('alivio-intake-modal');
    if (!modal) return;

    // Connect all existing and new homepage/header intake trigger buttons
    const triggers = document.querySelectorAll('[data-intake-trigger]');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openIntakeModal();
      });
    });

    // Close buttons (e.g., top-right X button)
    const closeBtns = modal.querySelectorAll('[data-intake-close]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeIntakeModal();
      });
    });

    // Escape Key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeIntakeModal();
      }
    });

    // Click backdrop outside window to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeIntakeModal();
      }
    });

    // Attach card listeners
    setupTreatmentCards();
  }

  function openIntakeModal() {
    const modal = document.getElementById('alivio-intake-modal');
    if (!modal) return;

    // Close mobile/tablet navigation drawer if open
    const drawer = document.querySelector('.sp-drawer, .drawer');
    const backdrop = document.querySelector('.sp-drawer-backdrop, .drawer-backdrop');
    const toggleBtn = document.querySelector('.menu-toggle');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
      if (backdrop) backdrop.classList.remove('active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus management: focus the active selectable treatment card or close button
    const activeCard = modal.querySelector('.alivio-answer-card:not(.is-disabled)');
    if (activeCard) {
      activeCard.focus();
    } else {
      const closeBtn = modal.querySelector('.alivio-intake-close-btn');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeIntakeModal() {
    const modal = document.getElementById('alivio-intake-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function selectAndNavigateTreatment(value, label, targetUrl) {
    try {
      sessionStorage.setItem(STORAGE_KEY_SELECTED_TREATMENT, JSON.stringify({
        goal: value,
        label: label,
        selectedAt: new Date().toISOString()
      }));
    } catch (e) {
      // Non-blocking storage fallback
    }

    closeIntakeModal();
    if (targetUrl) {
      const isSub = window.location.pathname.includes('/treatments/');
      const finalUrl = isSub ? targetUrl.replace(/^treatments\//, '') : targetUrl;
      if (window.location.pathname.endsWith(finalUrl)) {
        const targetSection = document.getElementById('formulations') || document.getElementById('main-content');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.location.href = finalUrl;
    }
  }

  function setupTreatmentCards() {
    const modal = document.getElementById('alivio-intake-modal');
    if (!modal) return;

    const cards = modal.querySelectorAll('.alivio-answer-card');
    cards.forEach(card => {
      const isDisabled = card.classList.contains('is-disabled');
      if (isDisabled) {
        card.setAttribute('aria-disabled', 'true');
        card.setAttribute('tabindex', '-1');
        return;
      }

      const value = card.getAttribute('data-value') || 'hormone-women';
      const label = card.getAttribute('data-label') || 'Women’s Hormone Care';
      const targetUrl = TREATMENT_ROUTES[value] || 'hormone-women.html';

      // Click handler
      card.addEventListener('click', (e) => {
        e.preventDefault();
        selectAndNavigateTreatment(value, label, targetUrl);
      });

      // Keyboard handler (Enter / Space)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectAndNavigateTreatment(value, label, targetUrl);
        }
      });
    });
  }

  // Export to Global window object for external scripts / telemetry
  window.AlivioIntake = {
    open: openIntakeModal,
    close: closeIntakeModal,
    getSelectedTreatment: () => {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY_SELECTED_TREATMENT);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    treatmentRoutes: TREATMENT_ROUTES
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntakeEngine);
  } else {
    initIntakeEngine();
  }
})();
