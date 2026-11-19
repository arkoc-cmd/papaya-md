/**
 * Category Rail Module
 * Handles category chip click filtering, aria-selected synchronization, and fluid mobile centering.
 */

export function initCategoryRail() {
  const chips = document.querySelectorAll('.category-chip');
  const pillarCards = document.querySelectorAll('.pillar-card');

  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCategory = chip.getAttribute('data-category');

      // Synchronize active state and ARIA tab attributes
      chips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      // Smooth horizontal auto-centering for mobile touch tracks
      chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      // Scroll smoothly to care pillars section
      const targetSection = document.getElementById('treatments');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Highlight target card if matching category
      if (targetCategory && targetCategory !== 'all') {
        pillarCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cardCat === targetCategory) {
            card.style.transform = 'translateY(-4px)';
            card.style.borderColor = 'var(--color-accent-action)';
            setTimeout(() => {
              card.style.transform = '';
              card.style.borderColor = '';
            }, 1800);
          }
        });
      }
    });

    // Keyboard support: Enter and Space
    chip.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        chip.click();
      }
    });
  });
}
