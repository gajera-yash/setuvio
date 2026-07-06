/* ============================================
   SETUVIO - Custom Cursor Effects
   ============================================ */

const CursorEffects = {
  init() {
    this.cursor = document.querySelector('.cursor-glow');
    if (!this.cursor) {
      this.cursor = document.createElement('div');
      this.cursor.className = 'cursor-glow';
      document.body.appendChild(this.cursor);
    }
    this.bindEvents();
  },

  bindEvents() {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      if (this.cursor) {
        this.cursor.style.transform = `translate(${cursorX - 150}px, ${cursorY - 150}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      if (this.cursor) this.cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (this.cursor) this.cursor.style.opacity = '1';
    });

    // Scale up on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .service-card, .product-card, .testimonial-btn, .filter-btn'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.cursor) {
          this.cursor.style.transform = `translate(${cursorX - 150}px, ${cursorY - 150}px) scale(1.5)`;
          this.cursor.style.background = 'radial-gradient(circle, rgba(37, 99, 235, 0.15), transparent 70%)';
        }
      });

      el.addEventListener('mouseleave', () => {
        if (this.cursor) {
          this.cursor.style.transform = `translate(${cursorX - 150}px, ${cursorY - 150}px) scale(1)`;
          this.cursor.style.background = '';
        }
      });
    });
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => CursorEffects.init());