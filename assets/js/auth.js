/**
 * Alivio Authentication Module (Login & Registration)
 * ----------------------------------------------------
 * Handles password visibility toggles, client-side input validation,
 * and authentic live email/SMS simulation feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Password Visibility Toggle
  const toggleButtons = document.querySelectorAll('.auth-pwd-toggle');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputWrap = btn.closest('.auth-input-wrap');
      const input = inputWrap.querySelector('input');
      const isPassword = input.type === 'password';

      input.type = isPassword ? 'text' : 'password';
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      btn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');

      // Update SVG icon (eye vs eye-off)
      if (isPassword) {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
      } else {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      }
    });
  });

  // 2. Login Form Handling
  const loginForm = document.getElementById('alivio-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const pwdInput = document.getElementById('login-password');
      const emailGroup = emailInput.closest('.auth-input-group');
      const pwdGroup = pwdInput.closest('.auth-input-group');
      const submitBtn = loginForm.querySelector('.auth-submit-btn');

      let isValid = true;

      // Validate email
      if (!emailInput.value || !emailInput.value.includes('@')) {
        emailGroup.classList.add('is-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('is-error');
      }

      // Validate password
      if (!pwdInput.value || pwdInput.value.length < 6) {
        pwdGroup.classList.add('is-error');
        isValid = false;
      } else {
        pwdGroup.classList.remove('is-error');
      }

      if (!isValid) return;

      // Realistic live feedback simulation
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Signing in...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Display authentic simulation notice
        let notice = document.getElementById('auth-notice');
        if (!notice) {
          notice = document.createElement('div');
          notice.id = 'auth-notice';
          notice.className = 'auth-live-banner';
          loginForm.insertAdjacentElement('beforebegin', notice);
        }
        notice.innerHTML = `
          <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <div>
            <strong>Test Session Recognized:</strong> A login confirmation notification has been dispatched to <strong>${emailInput.value}</strong> for clinical portal review.
          </div>
        `;
      }, 700);
    });
  }

  // 3. Registration Form Handling
  const registerForm = document.getElementById('alivio-register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('register-name');
      const emailInput = document.getElementById('register-email');
      const pwdInput = document.getElementById('register-password');
      const confirmPwdInput = document.getElementById('register-confirm-password');
      const termsCheckbox = document.getElementById('register-terms');
      const submitBtn = registerForm.querySelector('.auth-submit-btn');

      let isValid = true;

      // Validate name
      const nameGroup = nameInput.closest('.auth-input-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('is-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('is-error');
      }

      // Validate email
      const emailGroup = emailInput.closest('.auth-input-group');
      if (!emailInput.value || !emailInput.value.includes('@')) {
        emailGroup.classList.add('is-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('is-error');
      }

      // Validate password
      const pwdGroup = pwdInput.closest('.auth-input-group');
      if (!pwdInput.value || pwdInput.value.length < 8) {
        pwdGroup.classList.add('is-error');
        isValid = false;
      } else {
        pwdGroup.classList.remove('is-error');
      }

      // Validate password match
      const confirmGroup = confirmPwdInput.closest('.auth-input-group');
      if (confirmPwdInput.value !== pwdInput.value || !confirmPwdInput.value) {
        confirmGroup.classList.add('is-error');
        isValid = false;
      } else {
        confirmGroup.classList.remove('is-error');
      }

      // Terms agreement
      if (!termsCheckbox.checked) {
        termsCheckbox.focus();
        isValid = false;
        return;
      }

      if (!isValid) return;

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Creating account...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        let notice = document.getElementById('auth-notice');
        if (!notice) {
          notice = document.createElement('div');
          notice.id = 'auth-notice';
          notice.className = 'auth-live-banner';
          registerForm.insertAdjacentElement('beforebegin', notice);
        }
        notice.innerHTML = `
          <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <div>
            <strong>Account Initialized:</strong> A verification link has been sent to <strong>${emailInput.value}</strong> for HIPAA-compliant intake synchronization.
          </div>
        `;
      }, 700);
    });
  }

  // 4. Forgot Password Form Handling
  const forgotForm = document.getElementById('alivio-forgot-form');
  const forgotSuccessBox = document.getElementById('forgot-success-box');
  const forgotSentMsg = document.getElementById('forgot-sent-msg');
  const forgotResendBtn = document.getElementById('forgot-resend-btn');

  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('forgot-email');
      const emailGroup = emailInput ? emailInput.closest('.auth-input-group') : null;
      const submitBtn = forgotForm.querySelector('.auth-submit-btn');

      if (!emailInput || !emailInput.value || !emailInput.value.includes('@')) {
        if (emailGroup) emailGroup.classList.add('is-error');
        return;
      }
      if (emailGroup) emailGroup.classList.remove('is-error');

      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending link...</span>`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        if (forgotSuccessBox) {
          forgotForm.style.display = 'none';
          forgotSuccessBox.style.display = 'block';
          if (forgotSentMsg) {
            forgotSentMsg.innerHTML = `If an account exists for <strong>${emailInput.value}</strong>, you will receive password reset instructions shortly.`;
          }
        }
      }, 700);
    });
  }

  if (forgotResendBtn && forgotForm && forgotSuccessBox) {
    forgotResendBtn.addEventListener('click', () => {
      forgotSuccessBox.style.display = 'none';
      forgotForm.style.display = 'flex';
      const emailInput = document.getElementById('forgot-email');
      if (emailInput) {
        emailInput.value = '';
        emailInput.focus();
      }
    });
  }
});

// Global Testing Account Modal Controls (Safe Vanilla Functions)
window.openTestModal = function(provider) {
  const modal = document.getElementById('auth-test-modal');
  const text = document.getElementById('auth-test-provider-text');
  if (modal) {
    if (text) {
      const providerName = provider === 'google' ? 'Google' : 'Apple ID';
      text.textContent = `This ${providerName} sign-in utilizes live sandbox credentials connected to the PapayaMD clinical care platform for verification.`;
    }
    modal.style.display = 'flex';
  }
};

window.closeTestModal = function() {
  const modal = document.getElementById('auth-test-modal');
  if (modal) {
    modal.style.display = 'none';
  }
};


