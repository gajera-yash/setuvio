/* ============================================
   SETUVIO - Theme Manager (Dark/Light Mode)
   ============================================ */

const ThemeManager = {
  init() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.theme = localStorage.getItem('setuvio-theme') || 'light';
    this.applyTheme(this.theme);
    this.bindEvents();
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('setuvio-theme', theme);
    
    if (this.themeToggle) {
      this.themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      this.themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  },

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
  },

  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggle());
    }

    // Listen for system preference changes
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMedia.addEventListener('change', (e) => {
      if (!localStorage.getItem('setuvio-theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
};

// Initialize theme on DOM ready
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());