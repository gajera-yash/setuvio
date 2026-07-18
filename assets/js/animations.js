/* ============================================
   SETUVIO - Advanced Animations Engine
   ============================================ */

const Animations = {
  init() {
    this.setupRevealAnimations();
    this.setupParallax();
    this.setupMagneticButtons();
    this.setupRippleEffect();
    this.setupScrollProgress();
    this.setupPageTransition();
    this.setup3DScroll();
  },

  /* ========== Scroll Reveal Animations ========== */
  setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add delay based on data-delay attribute or index
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  },

  /* ========== Parallax Effect ========== */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const yPos = (scrollY - rect.top + window.innerHeight) * speed * 0.01;
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    }, { passive: true });
  },

  /* ========== Magnetic Button Effect ========== */
  setupMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    if (!magneticBtns.length) return;

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  },

  /* ========== Button Ripple Effect ========== */
  setupRippleEffect() {
    const rippleBtns = document.querySelectorAll('.btn-ripple');
    
    if (!rippleBtns.length) return;

    rippleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  },

  /* ========== Scroll Progress Bar ========== */
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
  },

  /* ========== Page Transition ========== */
  setupPageTransition() {
    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
      <div class="loading-logo">Setuvio</div>
      <div class="loading-bar">
        <div class="loading-bar-fill"></div>
      </div>
    `;
    document.body.appendChild(loadingScreen);

    // Hide loading screen after content loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 1000);
    });

    // Smooth page transitions for internal links
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.includes('://')) {
          e.preventDefault();
          
          const transition = document.createElement('div');
          transition.className = 'page-transition active';
          transition.innerHTML = '<div class="loader"></div>';
          document.body.appendChild(transition);
          
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });
  },

  /* ========== 3D Scroll Effect ========== */
  setup3DScroll() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .product-card, .hero-center-content');
    
    if (!cards.length) return;

    // Add perspective to parent containers for 3D effect
    cards.forEach(card => {
      if (card.parentElement) {
        card.parentElement.style.perspective = '1200px';
        card.parentElement.style.transformStyle = 'preserve-3d';
      }
    });

    // Update transforms on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          const windowHeight = window.innerHeight;

          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            // Only process if in or near viewport
            if (rect.top < windowHeight + 100 && rect.bottom > -100) {
              const cardCenter = rect.top + rect.height / 2;
              const screenCenter = windowHeight / 2;
              
              // Calculate distance from center of screen (-1 to 1)
              const distance = (cardCenter - screenCenter) / screenCenter;
              
              // Convert distance to rotation angle (max 12 degrees)
              const rotateX = distance * 12;
              
              // Apply a slight translateY based on rotation to enhance 3D feel
              const translateY = distance * 20;
              
              // Subtle scale effect (slightly smaller at edges)
              const scale = 1 - Math.abs(distance) * 0.03;

              card.style.transform = `rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`;
              card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              card.style.willChange = 'transform';
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
};

// Initialize animations on DOM ready
document.addEventListener('DOMContentLoaded', () => Animations.init());