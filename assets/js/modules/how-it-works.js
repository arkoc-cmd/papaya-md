/**
 * Alivio How-It-Works Interactive Step Module
 * Controls step pill navigation, dynamic step content switching, and device screen synchronization.
 */

export function initHowItWorks() {
  const stepsData = [
    {
      stepNum: '1',
      title: 'Complete your clinical intake',
      body: 'Every protocol starts with a comprehensive biological profile. Answer a confidential 5-minute digital health assessment covering your metabolic history, symptoms, and objectives.',
      image: 'assets/images/sp-device-dashboard.jpg',
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
      image: 'assets/images/doctor-profile.jpg',
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
      image: 'assets/images/sp-protocol-action.jpg',
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

    // Update pill states
    pillButtons.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
      btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    // Animate content crossfade
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
