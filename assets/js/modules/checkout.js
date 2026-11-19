/**
 * PAPAYAMD CHECKOUT ENGINE (checkout.js)
 * Architecture: Clean Vanilla ES6 JavaScript (No frameworks)
 *
 * Core Capabilities:
 * 1. Weight Care Focused (Semaglutide from $199/mo & Tirzepatide from $299/mo)
 * 2. Administration Method Tabs (Injectable vs Oral Daily/Sublingual)
 * 3. Side-by-Side Treatment Cards (Large centered vial, content below, Most Popular badge only)
 * 4. Viewport Scroll-Triggered Unique Smooth Slow Trajectory Graph Animation (2.8s) + Animated Numbers
 * 5. Choose Your Plan Cadence Selection (Monthly, 3-Month Best Value, 6-Month Transformation)
 * 6. Order Summary Dynamic Recalculation (Strictly updates .alivio-cta-label without destroying arrow disk)
 * 7. Real-time Delivery Date calculation (3 business days ahead)
 * 8. Live Credit Card (4-digit spacing), Expiry MM/YY, and Phone input formatters
 * 9. Accessible FAQ Accordion
 * 10. Master CTA Button Design System Compliance
 */

(function () {
  'use strict';

  // WEIGHT CARE TREATMENT CATALOG
  const TREATMENTS = {
    injectable: [
      {
        id: 'semaglutide',
        name: 'Semaglutide Injections',
        sub: 'Weekly subcutaneous injection with Vitamin B12',
        priceMonthly: 199.00,
        badge: 'Most Popular',
        img: 'assets/images/prod-semaglutide-vial.png'
      },
      {
        id: 'tirzepatide',
        name: 'Tirzepatide Injections',
        sub: 'Dual GIP / GLP-1 receptor agonist weekly injection',
        priceMonthly: 299.00,
        badge: null, // Per user directive: Only highlight most popular, no maximum potency
        img: 'assets/images/prod-tirzepatide-vial.png'
      }
    ],
    oral: [
      {
        id: 'oral-semaglutide',
        name: 'Oral Semaglutide Sublingual',
        sub: 'Daily sublingual lozenge formulation with Vitamin B12',
        priceMonthly: 199.00,
        badge: 'Most Popular',
        img: 'assets/images/prod-alivio-oral-pill.png'
      },
      {
        id: 'oral-tirzepatide',
        name: 'Oral Tirzepatide Compound',
        sub: 'Daily compounded dual-action sublingual tablet',
        priceMonthly: null || 299.00,
        badge: null,
        img: 'assets/images/prod-tirzepatide-oral-pill.png'
      }
    ]
  };

  const METRICS = [
    {
      num: '18%',
      target: 18,
      suffix: '%',
      decimals: 0,
      icon: 'assets/images/metric-icon-scale.png',
      desc: 'Average total body weight reduction observed in clinical studies'
    },
    {
      num: '9/10',
      target: 9,
      suffix: '/10',
      decimals: 0,
      icon: 'assets/images/metric-icon-badge.png',
      desc: 'Patients report noticeable reduction in food noise within first 14 days'
    },
    {
      num: '6.6”',
      target: 6.6,
      suffix: '”',
      decimals: 1,
      icon: 'assets/images/metric-icon-waist.png',
      desc: 'Average reduction in waist circumference at week 16 milestone'
    },
    {
      num: '90%',
      target: 90,
      suffix: '%',
      decimals: 0,
      icon: 'assets/images/metric-icon-trophy.png',
      desc: 'Adherence rate among patients continuing treatment past month 3'
    }
  ];

  // STATE
  const state = {
    method: 'injectable',
    selectedMedId: 'semaglutide',
    cadence: '3-month', // 'monthly', '3-month' (20% off), '6-month' (30% off)
    chartAnimated: false,
    metricsAnimated: false
  };

  // DOM REFERENCES
  const dom = {
    heroImg: document.getElementById('checkout-hero-img'),

    // Chart
    chartContainer: document.getElementById('checkout-chart-container'),
    chartLine: document.getElementById('checkout-chart-line'),
    chartFill: document.getElementById('checkout-chart-fill'),
    chartYStart: document.getElementById('checkout-chart-ystart'),
    chartYMid: document.getElementById('checkout-chart-ymid'),
    chartYEnd: document.getElementById('checkout-chart-yend'),

    // Treatment Selection
    tabInjectable: document.getElementById('tab-injectable'),
    tabOral: document.getElementById('tab-oral'),
    medicationsContainer: document.getElementById('checkout-medications-container'),
    metricsGrid: document.getElementById('checkout-metrics-grid'),
    deliveryDateText: document.getElementById('checkout-delivery-date-text'),

    // Cadence
    planOptions: document.querySelectorAll('.checkout-plan-option'),
    priceMonthly: document.getElementById('price-cadence-monthly'),
    price3Mo: document.getElementById('price-cadence-3mo'),
    price6Mo: document.getElementById('price-cadence-6mo'),

    // Order Summary
    receiptMedImg: document.getElementById('checkout-receipt-med-img'),
    receiptMedTitle: document.getElementById('checkout-receipt-med-title'),
    receiptMedSub: document.getElementById('checkout-receipt-med-sub'),
    receiptMedStrike: document.getElementById('checkout-receipt-med-strike'),
    receiptMedFinal: document.getElementById('checkout-receipt-med-final'),
    receiptDiscount: document.getElementById('checkout-receipt-discount'),
    receiptTotalStrike: document.getElementById('checkout-receipt-total-strike'),
    receiptTotal: document.getElementById('checkout-receipt-total'),
    btnTotalText: document.getElementById('checkout-btn-total-text'),

    // Shipping & Payment Forms
    checkoutForm: document.getElementById('checkout-multistep-form'),
    firstName: document.getElementById('checkout-first-name'),
    lastName: document.getElementById('checkout-last-name'),
    email: document.getElementById('checkout-email'),
    phone: document.getElementById('checkout-phone'),
    cardNumber: document.getElementById('checkout-card-number'),
    expiry: document.getElementById('checkout-expiry'),
    cvv: document.getElementById('checkout-cvv'),
    submitBtn: document.getElementById('checkout-complete-submit-btn'),

    // FAQs
    faqItems: document.querySelectorAll('.checkout-faq-item')
  };

  /**
   * INITIALIZE ENGINE
   */
  function init() {
    setupDeliveryDate();
    renderMetrics();
    setupMethodTabs();
    renderMedicationCards();
    setupCadenceSelection();
    setupInputFormatters();
    setupFaqAccordion();
    setupFormSubmission();
    setupChartObserver();
    updateReceipt();
    checkExistingSession();
  }

  /**
   * Check existing session storage to prefill shipping fields if available
   */
  function checkExistingSession() {
    try {
      const storedName = sessionStorage.getItem('papayamd_patient_name') || sessionStorage.getItem('alivio_patient_name');
      const storedEmail = sessionStorage.getItem('papayamd_patient_email') || sessionStorage.getItem('alivio_patient_email');

      if (storedName && dom.firstName && !dom.firstName.value) {
        const parts = storedName.trim().split(' ');
        dom.firstName.value = parts[0] || '';
        if (parts.length > 1 && dom.lastName && !dom.lastName.value) {
          dom.lastName.value = parts.slice(1).join(' ');
        }
      }
      if (storedEmail && dom.email && !dom.email.value) {
        dom.email.value = storedEmail;
      }
    } catch (e) {
      // Non-blocking
    }
  }

  /**
   * Setup Delivery Method Tabs (Injectable vs Oral)
   */
  function setupMethodTabs() {
    if (dom.tabInjectable) {
      dom.tabInjectable.addEventListener('click', function () {
        if (state.method === 'injectable') return;
        state.method = 'injectable';
        dom.tabInjectable.classList.add('is-active');
        dom.tabInjectable.setAttribute('aria-selected', 'true');
        dom.tabOral.classList.remove('is-active');
        dom.tabOral.setAttribute('aria-selected', 'false');

        // Auto-select first item
        state.selectedMedId = 'semaglutide';
        renderMedicationCards();
        updateCadenceDisplay();
        updateReceipt();
      });
    }

    if (dom.tabOral) {
      dom.tabOral.addEventListener('click', function () {
        if (state.method === 'oral') return;
        state.method = 'oral';
        dom.tabOral.classList.add('is-active');
        dom.tabOral.setAttribute('aria-selected', 'true');
        dom.tabInjectable.classList.remove('is-active');
        dom.tabInjectable.setAttribute('aria-selected', 'false');

        // Auto-select first oral item
        state.selectedMedId = 'oral-semaglutide';
        renderMedicationCards();
        updateCadenceDisplay();
        updateReceipt();
      });
    }
  }

  /**
   * Render side-by-side treatment cards with centered large image & content below
   */
  function renderMedicationCards() {
    if (!dom.medicationsContainer) return;

    const list = TREATMENTS[state.method] || TREATMENTS.injectable;
    dom.medicationsContainer.innerHTML = '';

    list.forEach((med) => {
      const isSelected = med.id === state.selectedMedId;
      const card = document.createElement('div');
      card.className = `checkout-med-col-card ${isSelected ? 'is-selected' : ''}`;
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-med-id', med.id);

      // Pill tag ONLY for Most Popular (No Maximum Potency)
      let pillHtml = '';
      if (med.badge && med.badge.toLowerCase().includes('popular')) {
        pillHtml = `<span class="checkout-card-pill-tag">MOST POPULAR</span>`;
      }

      card.innerHTML = `
        ${pillHtml}
        <div class="checkout-med-col-thumb-wrap">
          <img src="${med.img}" alt="${med.name}" class="checkout-med-col-thumb">
        </div>
        <div class="checkout-med-col-content">
          <div class="checkout-med-col-radio-row">
            <div class="checkout-radio-indicator" aria-hidden="true">
              <span class="checkout-radio-indicator-dot"></span>
            </div>
            <h3 class="checkout-med-col-name">${med.name}</h3>
          </div>
          <p class="checkout-med-col-sub">${med.sub}</p>
          <div class="checkout-med-col-price-row">
            <span class="checkout-med-col-from">From</span>
            <span class="checkout-med-col-price">$${med.priceMonthly.toFixed(0)}</span>
            <span class="checkout-med-col-freq">/month</span>
          </div>
        </div>
      `;

      // Selection click & keyboard handlers
      const selectCard = () => {
        state.selectedMedId = med.id;
        document.querySelectorAll('.checkout-med-col-card').forEach((c) => {
          c.classList.remove('is-selected');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('is-selected');
        card.setAttribute('aria-checked', 'true');

        // Update hero image to match chosen medication
        if (dom.heroImg) {
          dom.heroImg.src = med.img;
        }

        updateCadenceDisplay();
        updateReceipt();
      };

      card.addEventListener('click', selectCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          selectCard();
        }
      });

      dom.medicationsContainer.appendChild(card);
    });
  }

  /**
   * Render Clinical Proof 4-Metric Tiles with Custom Icons & Number Animation
   */
  function renderMetrics() {
    if (!dom.metricsGrid) return;
    dom.metricsGrid.innerHTML = '';

    METRICS.forEach((m, idx) => {
      const tile = document.createElement('div');
      tile.className = 'checkout-metric-tile';
      tile.innerHTML = `
        <div class="checkout-metric-header">
          <img src="${m.icon}" alt="" class="checkout-metric-icon" aria-hidden="true">
          <span class="checkout-metric-num" id="checkout-metric-counter-${idx}">0${m.suffix}</span>
        </div>
        <p class="checkout-metric-desc">${m.desc}</p>
      `;
      dom.metricsGrid.appendChild(tile);
    });

    setupMetricsObserver();
  }

  /**
   * Intersection Observer for Clinical Metric Numbers Animation
   */
  function setupMetricsObserver() {
    if (!dom.metricsGrid) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.metricsAnimated) {
            state.metricsAnimated = true;
            animateMetricCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      observer.observe(dom.metricsGrid);
    } else {
      animateMetricCounters();
    }
  }

  /**
   * Smooth Count-Up Animation (1.2s ease-out cubic)
   */
  function animateMetricCounters() {
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      METRICS.forEach((m, idx) => {
        const el = document.getElementById(`checkout-metric-counter-${idx}`);
        if (!el) return;

        if (progress >= 1) {
          el.textContent = m.num;
        } else {
          const currentVal = ease * m.target;
          if (m.decimals > 0) {
            el.textContent = `${currentVal.toFixed(m.decimals)}${m.suffix}`;
          } else {
            el.textContent = `${Math.floor(currentVal)}${m.suffix}`;
          }
        }
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Setup Plan Cadence Selection (Monthly, 3-Month, 6-Month)
   */
  function setupCadenceSelection() {
    if (!dom.planOptions || dom.planOptions.length === 0) return;

    dom.planOptions.forEach((option) => {
      const selectPlan = () => {
        dom.planOptions.forEach((o) => {
          o.classList.remove('is-selected');
          o.setAttribute('aria-checked', 'false');
        });
        option.classList.add('is-selected');
        option.setAttribute('aria-checked', 'true');

        state.cadence = option.getAttribute('data-cadence');
        updateReceipt();
      };

      option.addEventListener('click', selectPlan);
      option.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          selectPlan();
        }
      });
    });

    updateCadenceDisplay();
  }

  /**
   * Update Cadence displayed prices based on selected medication
   */
  function updateCadenceDisplay() {
    const med = getCurrentMedication();
    if (!med) return;

    const baseMonthly = med.priceMonthly;
    const price3MoMonthly = Math.round(baseMonthly * 0.80); // 20% discount
    const price6MoMonthly = Math.round(baseMonthly * 0.70); // 30% discount

    if (dom.priceMonthly) dom.priceMonthly.textContent = `$${baseMonthly.toFixed(0)}`;
    if (dom.price3Mo) dom.price3Mo.textContent = `$${price3MoMonthly}`;
    if (dom.price6Mo) dom.price6Mo.textContent = `$${price6MoMonthly}`;
  }

  /**
   * Get currently active medication object
   */
  function getCurrentMedication() {
    const list = TREATMENTS[state.method] || TREATMENTS.injectable;
    return list.find((m) => m.id === state.selectedMedId) || list[0];
  }

  /**
   * Update Order Summary & Price Breakdown with WELCOME20 Coupon (20% OFF)
   */
  function updateReceipt() {
    const med = getCurrentMedication();
    if (!med) return;

    const baseMonthly = med.priceMonthly;
    let months = 3;
    let monthlyRate = Math.round(baseMonthly * 0.80);
    let cadenceLabel = '3-Month Protocol';
    let retailUnit = baseMonthly >= 299 ? 299.99 : 199.99;

    if (state.cadence === 'monthly') {
      months = 1;
      monthlyRate = baseMonthly;
      cadenceLabel = 'Month-to-Month Plan';
    } else if (state.cadence === '6-month') {
      months = 6;
      monthlyRate = Math.round(baseMonthly * 0.70);
      cadenceLabel = '6-Month Transformation';
    }

    const planSubtotal = monthlyRate * months;
    const retailTotal = retailUnit * months;

    // Apply WELCOME20: 20% discount on order
    const couponDiscount = Math.round(planSubtotal * 0.20 * 100) / 100;
    const totalDue = planSubtotal - couponDiscount;

    // Update medication thumbnail
    if (dom.receiptMedImg) {
      dom.receiptMedImg.src = med.img || 'assets/images/prod-semaglutide-vial.png';
      dom.receiptMedImg.alt = med.name;
    }
    // Update medication title & subtitle
    if (dom.receiptMedTitle) {
      dom.receiptMedTitle.textContent = med.name;
    }
    if (dom.receiptMedSub) {
      dom.receiptMedSub.textContent = `Compounded w/ B12 • ${cadenceLabel} (${months} Mo${months > 1 ? 's' : ''})`;
    }
    // Strike price and final price on medication row
    if (dom.receiptMedStrike) {
      dom.receiptMedStrike.textContent = `$${retailTotal.toFixed(2)}`;
    }
    if (dom.receiptMedFinal) {
      dom.receiptMedFinal.textContent = `$${planSubtotal.toFixed(2)}`;
    }
    // Coupon discount line
    if (dom.receiptDiscount) {
      dom.receiptDiscount.textContent = `- $${couponDiscount.toFixed(2)}`;
    }
    // Total lines
    if (dom.receiptTotalStrike) {
      dom.receiptTotalStrike.textContent = `$${planSubtotal.toFixed(2)}`;
    }
    if (dom.receiptTotal) {
      dom.receiptTotal.textContent = `$${totalDue.toFixed(2)}`;
    }

    // Update CTA button label cleanly
    if (dom.btnTotalText) {
      dom.btnTotalText.textContent = `Pay $${totalDue.toFixed(2)} & Complete Order`;
    }
  }

  /**
   * Viewport Scroll-Triggered Unique Smooth Slow Trajectory Graph Animation (2.8s)
   */
  function setupChartObserver() {
    if (!dom.chartContainer) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.chartAnimated) {
            triggerChartAnimation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      observer.observe(dom.chartContainer);
    } else {
      // Fallback
      triggerChartAnimation();
    }
  }

  function triggerChartAnimation() {
    if (state.chartAnimated) return;
    state.chartAnimated = true;

    if (dom.chartLine) {
      dom.chartLine.classList.add('checkout-chart-line-anim');
    }
    if (dom.chartFill) {
      dom.chartFill.classList.add('checkout-chart-fill-anim');
    }

    animateWeightNumbers();
  }

  function animateWeightNumbers() {
    if (!dom.chartYStart || !dom.chartYMid || !dom.chartYEnd) return;

    const duration = 2800; // Slow, luxurious 2.8s duration
    const startTime = performance.now();

    const startVal = 210;
    const midTarget = 190;
    const endTarget = 172;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // smooth cubic-bezier approximation
      const ease = 1 - Math.pow(1 - progress, 3);

      const currentMid = Math.round(startVal - (startVal - midTarget) * ease);
      const currentEnd = Math.round(startVal - (startVal - endTarget) * ease);

      dom.chartYStart.textContent = `210 lbs (Week 1)`;
      dom.chartYMid.textContent = `${currentMid} lbs (Week 6)`;
      dom.chartYEnd.textContent = `${currentEnd} lbs (Week 12)`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Dynamic Delivery Date (3 Business Days from today)
   */
  function setupDeliveryDate() {
    if (!dom.deliveryDateText) return;

    const now = new Date();
    let daysAdded = 0;
    let delivery = new Date(now);

    while (daysAdded < 3) {
      delivery.setDate(delivery.getDate() + 1);
      const day = delivery.getDay();
      if (day !== 0 && day !== 6) { // Exclude Sunday (0) and Saturday (6)
        daysAdded++;
      }
    }

    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    dom.deliveryDateText.textContent = delivery.toLocaleDateString('en-US', options);
  }

  /**
   * Input Formatters: Credit Card, Expiry, CVV, Phone
   */
  function setupInputFormatters() {
    // Card Number (4-digit spacing)
    if (dom.cardNumber) {
      dom.cardNumber.addEventListener('input', function (e) {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        e.target.value = formatted;
      });
    }

    // Expiry (MM/YY)
    if (dom.expiry) {
      dom.expiry.addEventListener('input', function (e) {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          e.target.value = val.substring(0, 2) + '/' + val.substring(2);
        } else {
          e.target.value = val;
        }
      });
    }

    // CVV (3-4 digits max)
    if (dom.cvv) {
      dom.cvv.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      });
    }

    // Phone Number ((xxx) xxx-xxxx)
    if (dom.phone) {
      dom.phone.addEventListener('input', function (e) {
        let num = e.target.value.replace(/\D/g, '').substring(0, 10);
        if (num.length > 6) {
          e.target.value = `(${num.substring(0, 3)}) ${num.substring(3, 6)}-${num.substring(6)}`;
        } else if (num.length > 3) {
          e.target.value = `(${num.substring(0, 3)}) ${num.substring(3)}`;
        } else if (num.length > 0) {
          e.target.value = `(${num}`;
        } else {
          e.target.value = '';
        }
      });
    }
  }

  /**
   * FAQ Accordion
   */
  function setupFaqAccordion() {
    if (!dom.faqItems || dom.faqItems.length === 0) return;

    dom.faqItems.forEach((item) => {
      const trigger = item.querySelector('.checkout-faq-trigger');
      const body = item.querySelector('.checkout-faq-body');

      if (!trigger || !body) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all others
        dom.faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.checkout-faq-trigger');
          const otherBody = other.querySelector('.checkout-faq-body');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        });

        // Toggle selected
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  /**
   * Form Submission (Safe front-end simulation)
   */
  function setupFormSubmission() {
    if (!dom.checkoutForm) return;

    dom.checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!dom.submitBtn) return;

      // Loading State preserving pill container
      dom.submitBtn.disabled = true;
      dom.submitBtn.style.opacity = '0.85';
      if (dom.btnTotalText) {
        dom.btnTotalText.textContent = 'Processing Medical Intake & Order...';
      }

      setTimeout(() => {
        if (dom.btnTotalText) {
          dom.btnTotalText.textContent = 'Order Confirmed & Sent to Clinician!';
        }
        dom.submitBtn.style.backgroundColor = '#2D3622';

        alert('Thank you! Your intake evaluation and order have been securely received. A licensed physician is reviewing your chart. You will receive an email confirmation shortly.');
      }, 1600);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
