/**
 * DocMind AI - Modern Minimal Demo Login Page Logic
 * Vanilla JavaScript implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorAlert = document.getElementById('error-alert');
  const btnGuest = document.getElementById('btn-guest');

  // Helper to show/hide error messages
  const showError = (message) => {
    if (message) {
      errorAlert.textContent = message;
      errorAlert.style.display = 'block';
    } else {
      errorAlert.style.display = 'none';
      errorAlert.textContent = '';
    }
  };

  // Form submission handler
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showError(''); // Reset errors

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // 1. Validation check
    if (!emailValue && !passwordValue) {
      showError('Please enter your email address and password to log in.');
      return;
    }

    if (!emailValue) {
      showError('Please enter your email address.');
      emailInput.focus();
      return;
    }

    if (!passwordValue) {
      showError('Please enter your password.');
      passwordInput.focus();
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      showError('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    // Both are filled and valid, proceed to redirect to dashboard.html
    window.location.href = "dashboard.html";
  });

  // Continue as Guest link handler
  btnGuest.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });

  // Clear errors when the user starts typing
  emailInput.addEventListener('input', () => showError(''));
  passwordInput.addEventListener('input', () => showError(''));
});
