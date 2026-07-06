/* ============================================
   SETUVIO - Main JavaScript Application
   ============================================ */

const Setuvio = {
  init() {
    this.setupNavigation();
    this.setupSearchModal();
    this.setupFAQ();
    this.setupTabs();
    this.setupProductFilters();
    this.setupBackToTop();
    this.setupSmoothScroll();
    this.setupFooterNewsletter();
    this.initAllSubmodules();
  },

  initAllSubmodules() {
    // Initialize all sub-modules if they exist
    if (typeof ThemeManager !== 'undefined' && ThemeManager.init) ThemeManager.init();
    if (typeof CursorEffects !== 'undefined' && CursorEffects.init) CursorEffects.init();
    if (typeof CounterAnimation !== 'undefined' && CounterAnimation.init) CounterAnimation.init();
    if (typeof TestimonialSlider !== 'undefined' && TestimonialSlider.init) TestimonialSlider.init();
    if (typeof Animations !== 'undefined' && Animations.init) Animations.init();
  },

  /* ========== Navigation ========== */
  setupNavigation() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        this.navbar?.classList.add('scrolled');
      } else {
        this.navbar?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile menu toggle
    this.hamburger?.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.mobileMenu?.classList.toggle('active');
      document.body.style.overflow = this.mobileMenu?.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.hamburger?.classList.remove('active');
        this.mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        this.hamburger?.classList.remove('active');
        this.mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Active link highlighting
    this.setActiveNavLink();
  },

  setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  },

  /* ========== Search Modal ========== */
  setupSearchModal() {
    this.searchModal = document.querySelector('.search-modal');
    this.searchInput = this.searchModal?.querySelector('input');
    this.searchClose = this.searchModal?.querySelector('.search-modal-close');
    this.searchTrigger = document.querySelector('.search-trigger');
    
    if (!this.searchModal) return;

    // Open search
    this.searchTrigger?.addEventListener('click', () => {
      this.searchModal.classList.add('active');
      setTimeout(() => this.searchInput?.focus(), 100);
      document.body.style.overflow = 'hidden';
    });

    // Close search
    const closeSearch = () => {
      this.searchModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    this.searchClose?.addEventListener('click', closeSearch);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchModal.classList.contains('active')) {
        closeSearch();
      }
      
      // Open search with Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.searchTrigger?.click();
      }
    });

    // Close on backdrop click
    this.searchModal.addEventListener('click', (e) => {
      if (e.target === this.searchModal) closeSearch();
    });

    // Search functionality
    this.searchInput?.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
  },

  performSearch(query) {
    const resultsContainer = this.searchModal.querySelector('.search-modal-body');
    if (!resultsContainer) return;
    
    const searchData = [
      { title: 'Home', url: 'index.html', description: 'Welcome to Setuvio - Building Digital Bridges to the Future' },
      { title: 'About Us', url: 'about.html', description: 'Learn about our company story, mission, and values' },
      { title: 'Services', url: 'services.html', description: 'Web development, mobile apps, AI solutions, and more' },
      { title: 'Products', url: 'products.html', description: 'Our innovative software products and solutions' },
      { title: 'Portfolio', url: 'portfolio.html', description: 'View our successful projects and case studies' },
      { title: 'Industries', url: 'industries.html', description: 'Solutions for healthcare, education, finance, and more' },
      { title: 'Technologies', url: 'technologies.html', description: 'Our technology stack and expertise' },
      { title: 'Pricing', url: 'pricing.html', description: 'Flexible pricing plans for every business' },
      { title: 'Blog', url: 'blog.html', description: 'Insights, tutorials, and company updates' },
      { title: 'Careers', url: 'careers.html', description: 'Join our team and build the future' },
      { title: 'Contact', url: 'contact.html', description: 'Get in touch with our team' },
      { title: 'Privacy Policy', url: 'privacy-policy.html', description: 'How we handle your data' },
      { title: 'Terms & Conditions', url: 'terms.html', description: 'Terms of service' },
      { title: 'Cookie Policy', url: 'cookies.html', description: 'How we use cookies' },
    ];

    if (!query.trim()) {
      resultsContainer.innerHTML = `
        <div style="text-align:center;padding:2rem;color:var(--text-light)">
          Start typing to search pages...
        </div>
      `;
      return;
    }

    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align:center;padding:2rem;color:var(--text-light)">
          No results found for "${query}"
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = results.map(result => `
      <a href="${result.url}" class="search-result" onclick="document.querySelector('.search-modal').classList.remove('active'); document.body.style.overflow = ''">
        <h4>${result.title}</h4>
        <p>${result.description}</p>
      </a>
    `).join('');
  },

  /* ========== FAQ Accordion ========== */
  setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        });
        
        if (!isActive) {
          item.classList.add('active');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    });
  },

  /* ========== Tabs ========== */
  setupTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab');
      const contents = container.querySelectorAll('.tab-content');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.getAttribute('data-tab');
          
          tabs.forEach(t => t.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          
          tab.classList.add('active');
          const content = container.querySelector(`.tab-content[data-tab="${target}"]`);
          content?.classList.add('active');
        });
      });
    });
  },

  /* ========== Product Filters ========== */
  setupProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productSearch = document.querySelector('.product-search input');
    
    // Filter by category
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });

    // Search products
    productSearch?.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      productCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  },

  /* ========== Back to Top ========== */
  setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /* ========== Smooth Scroll for Anchor Links ========== */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  },

  /* ========== Footer Newsletter ========== */
  setupFooterNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input?.value.trim();
        
        if (email) {
          // Simple validation
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // Success animation
            const btn = form.querySelector('button');
            const originalText = btn?.textContent;
            if (btn) {
              btn.textContent = '✓ Subscribed!';
              btn.style.background = 'var(--success)';
              setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
              }, 2000);
            }
            if (input) input.value = '';
          } else {
            // Error shake
            input.style.borderColor = 'var(--error)';
            setTimeout(() => input.style.borderColor = '', 2000);
          }
        }
      });
    });
  }
};

// Add contact form handler
document.addEventListener('DOMContentLoaded', () => {
  // Contact form
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    if (btn) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--success)';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
      }, 2000);
    }
  });

  // Initialize main app
  Setuvio.init();
});

// Export for use in other modules
window.Setuvio = Setuvio;