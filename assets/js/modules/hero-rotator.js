/**
 * Hero Headline Rotating Phrase Module
 * Smoothly cycles through value proposition phrases every 2 seconds.
 * Built with pure vanilla JS & CSS transitions, respecting prefers-reduced-motion.
 */

let rotationTimer = null;

export function initHeroRotator() {
  const container = document.getElementById('hero-dynamic-phrases');
  if (!container) return;

  // Prevent duplicate timers if initialized multiple times
  if (rotationTimer) {
    clearInterval(rotationTimer);
    rotationTimer = null;
  }

  const phrases = Array.from(container.querySelectorAll('.sp-rotating-phrase'));
  if (phrases.length <= 1) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;

  // Find initial active index if set in markup
  const initialIndex = phrases.findIndex(p => p.classList.contains('active'));
  if (initialIndex !== -1) currentIndex = initialIndex;

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

    // Step 1: Animate current phrase out (subtle upward fade-out)
    current.classList.remove('active');
    current.classList.add('exit');

    // Step 2: Animate next phrase in (fade-in moving up into place)
    next.classList.remove('exit');
    next.classList.add('active');

    // Clean up exit class after transition duration
    setTimeout(() => {
      current.classList.remove('exit');
    }, 450);

    currentIndex = nextIndex;
  }

  // Rotate every 2 seconds
  rotationTimer = setInterval(cyclePhrase, 2000);

  // Pause rotation when tab is inactive to preserve battery, resume on focus
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rotationTimer) {
        clearInterval(rotationTimer);
        rotationTimer = null;
      }
    } else {
      if (!rotationTimer) {
        rotationTimer = setInterval(cyclePhrase, 2000);
      }
    }
  });
}
