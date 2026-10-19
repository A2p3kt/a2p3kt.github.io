// =========================================
// DARK MODE TOGGLE
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme from localStorage
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    updateThemeToggle(true);
  } else if (storedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    updateThemeToggle(false);
  } else {
    // Default to light
    document.documentElement.classList.remove('dark');
    updateThemeToggle(false);
  }

  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggle(isDark);
    });
  }

  // Set active nav link
  setActiveNavLink();
});

function updateThemeToggle(isDark) {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.dataset.mode = isDark ? 'dark' : 'light';
    toggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun theme-icon" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-moon theme-icon" aria-hidden="true"></i>';
  }
}

function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');

    if (!href || href.includes('#')) {
      link.removeAttribute('aria-current');
      return;
    }

    if (href === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// =========================================
// STICKY NAV ON SCROLL
// =========================================

let scrollTimer;

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  scrollTimer = setTimeout(() => {
    // Optional: hide nav on scroll down, show on scroll up
    // This can be enhanced later for more sophisticated behavior
  }, 150);
}, false);