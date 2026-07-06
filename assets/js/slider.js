/* ============================================
   SETUVIO - Testimonials Slider
   ============================================ */

const TestimonialSlider = {
  init() {
    this.track = document.querySelector('.testimonials-track');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.testimonial-dot');
    this.prevBtn = document.querySelector('.testimonial-btn.prev');
    this.nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (!this.track || !this.cards.length) return;
    
    this.currentIndex = 0;
    this.cardWidth = 0;
    this.visibleCards = 1;
    this.maxIndex = 0;
    
    this.calculateDimensions();
    this.bindEvents();
    this.updateSlider();
    
    // Recalculate on resize
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.updateSlider();
    });
  },

  calculateDimensions() {
    if (window.innerWidth < 768) {
      this.visibleCards = 1;
    } else if (window.innerWidth < 1024) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 3;
    }
    
    this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
    
    // Calculate card width including gap
    const containerWidth = this.track.parentElement.offsetWidth;
    const gap = 24; // var(--space-xl)
    this.cardWidth = (containerWidth - (this.visibleCards - 1) * gap) / this.visibleCards;
    
    // Set minimum width
    this.cards.forEach(card => {
      card.style.minWidth = `${this.cardWidth}px`;
    });
  },

  updateSlider() {
    const gap = 24;
    const offset = this.currentIndex * (this.cardWidth + gap);
    this.track.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
    
    // Update buttons
    if (this.prevBtn) {
      this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
    }
    if (this.nextBtn) {
      this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.3' : '1';
    }
  },

  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateSlider();
  },

  next() {
    this.goTo(this.currentIndex + 1);
  },

  prev() {
    this.goTo(this.currentIndex - 1);
  },

  bindEvents() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    // Touch support
    let startX = 0;
    let isDragging = false;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
    }, { passive: true });

    // Auto-play
    this.startAutoPlay();
  },

  startAutoPlay() {
    setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.goTo(0);
      } else {
        this.next();
      }
    }, 5000);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => TestimonialSlider.init());