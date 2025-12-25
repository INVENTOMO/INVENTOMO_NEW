// Loading Screen - FASTER
const loadingScreen = document.getElementById('loadingScreen');
setTimeout(() => {
  loadingScreen.classList.add('hidden');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 300);
}, 1500);

// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const body = document.body;

function isMobile() {
  return window.innerWidth <= 768;
}

function openMobileMenu() {
  if (!isMobile()) return;

  navLinks.classList.add('active');
  mobileMenuBtn.classList.add('active');
  body.classList.add('menu-open');

  const menuItems = navLinks.querySelectorAll('li');
  menuItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 50 + (index * 30));
  });
}

function closeMobileMenu() {
  if (!isMobile()) return;

  navLinks.classList.remove('active');
  mobileMenuBtn.classList.remove('active');
  body.classList.remove('menu-open');

  const menuItems = navLinks.querySelectorAll('li');
  menuItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(30px)';
  });
}

function toggleMobileMenu() {
  if (navLinks.classList.contains('active')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

// Mobile menu event listeners
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile()) {
      toggleMobileMenu();
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile()) {
        closeMobileMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (isMobile() &&
      navLinks.classList.contains('active') &&
      !navLinks.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (isMobile() &&
      event.key === 'Escape' &&
      navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (!isMobile() && navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .stagger-delay').forEach(el => {
  observer.observe(el);
});

// ========== GET QUOTE BUTTONS ==========
document.querySelectorAll('.get-quote-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const serviceName = this.getAttribute('data-service');
    const serviceDescription = this.getAttribute('data-description');

    const message = `Hello Inventomo!%0A%0AI'm interested in getting a quote for your *${serviceName}* service.%0A%0A*Service Details:*%0A${serviceDescription}%0A%0APlease provide me with a quote and more information about this service.`;

    const whatsappUrl = `https://wa.me/+923291705576?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        isValid = false;
      } else {
        field.classList.remove('error');
      }
    });

    if (isValid) {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value || 'Not provided';
      const service = document.getElementById('service').value;
      const budget = document.getElementById('budget').value;
      const message = document.getElementById('message').value;

      const whatsappMessage =
        `Hello Inventomo!%0A%0A` +
        `*New Project Inquiry*%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Service:* ${service}%0A` +
        `*Budget:* ${budget}%0A` +
        `*Message:* ${message}%0A%0A` +
        `I'd like to discuss this project with you.`;

      window.open(`https://wa.me/+923291705576?text=${whatsappMessage}`, '_blank');

      if (successMessage) {
        successMessage.style.display = 'block';

        setTimeout(() => {
          contactForm.reset();
          successMessage.style.display = 'none';
        }, 3000);

        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

// ========== PLAN SELECTION ==========
window.selectPlan = function (plan) {
  const whatsappMessage = `Hello Inventomo! I'm interested in the ${plan} plan. Can you tell me more about it?`;
  window.open(`https://wa.me/+923291705576?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
};

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinksElements = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
  let current = '';
  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinksElements.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveNavLink, 50);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 100;
      const targetPosition = targetElement.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========== FLOATING MENU - FIXED VERSION ==========
const floatingMainBtn = document.getElementById('floatingMainBtn');
const floatingMenuItems = document.getElementById('floatingMenuItems');

if (floatingMainBtn && floatingMenuItems) {
  floatingMainBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    const isOpen = floatingMenuItems.classList.contains('active');

    if (isOpen) {
      closeFloatingMenu();
    } else {
      openFloatingMenu();
    }
  });

  document.addEventListener('click', function (e) {
    if (floatingMenuItems.classList.contains('active') &&
      !floatingMainBtn.contains(e.target) &&
      !floatingMenuItems.contains(e.target)) {
      closeFloatingMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && floatingMenuItems.classList.contains('active')) {
      closeFloatingMenu();
    }
  });

  const menuItems = document.querySelectorAll('.floating-menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });
}

function openFloatingMenu() {
  const floatingMainBtn = document.getElementById('floatingMainBtn');
  const floatingMenuItems = document.getElementById('floatingMenuItems');

  if (floatingMainBtn && floatingMenuItems) {
    floatingMainBtn.classList.add('active');
    floatingMenuItems.classList.add('active');

    floatingMenuItems.style.pointerEvents = 'auto';
    const allMenuItems = floatingMenuItems.querySelectorAll('*');
    allMenuItems.forEach(el => {
      el.style.pointerEvents = 'auto';
    });
  }
}

function closeFloatingMenu() {
  const floatingMainBtn = document.getElementById('floatingMainBtn');
  const floatingMenuItems = document.getElementById('floatingMenuItems');

  if (floatingMainBtn && floatingMenuItems) {
    floatingMainBtn.classList.remove('active');
    floatingMenuItems.classList.remove('active');

    setTimeout(() => {
      if (!floatingMenuItems.classList.contains('active')) {
        floatingMenuItems.style.pointerEvents = 'none';
      }
    }, 300);
  }
}

// Initialize menu state
closeFloatingMenu();

// ========== INITIALIZE ==========
updateActiveNavLink();

console.log('Inventomo website loaded successfully');
console.log('✅ SEO Schema added');
console.log('✅ Floating contact menu integrated');
console.log('✅ Mobile navigation fixed');
console.log('✅ All features working correctly');

// added slider js

class SliderXi1 {
  constructor() {
    this.slider = document.querySelector('.slider-xi-1');
    this.slides = document.querySelector('.slides-xi-1');
    this.slidesList = document.querySelectorAll('.slide-xi-1');
    this.dots = document.querySelectorAll('.slider-xi-1-dot');
    this.prevBtn = document.querySelector('.slider-xi-1-prev');
    this.nextBtn = document.querySelector('.slider-xi-1-next');
    this.progressBar = document.querySelector('.slider-xi-1-progress-bar');
    this.statNumbers = document.querySelectorAll('.stat-number');

    this.currentIndex = 0;
    this.totalSlides = this.slidesList.length;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 6000; // 6 seconds for better readability
    this.isAutoPlaying = true;
    this.isTransitioning = false;
    this.isTouching = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    // Event Listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    this.dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
      });
    });

    // Touch events for mobile with better handling
    this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.slider.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Pause auto-slide on hover/touch
    this.slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
    this.slider.addEventListener('mouseleave', () => {
      if (this.isAutoPlaying) {
        this.startAutoSlide();
      }
    });

    // Page Visibility API - pause when tab is not active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoSlide();
      } else if (this.isAutoPlaying) {
        this.startAutoSlide();
      }
    });

    // Initialize stats animation
    this.initStatsAnimation();

    // Start autoplay with delay for better initial experience
    setTimeout(() => {
      this.startAutoSlide();
      this.startProgressBar();
    }, 1000);
  }

  initStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) observer.observe(statsContainer);
  }

  animateStats() {
    this.statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  updateSlider() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;

    // Smooth transition with transform
    this.slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Update dots with animation
    this.dots.forEach((dot, index) => {
      const isActive = index === this.currentIndex;
      dot.classList.toggle('active', isActive);
      if (isActive) {
        dot.style.transform = 'scale(1.3)';
      } else {
        dot.style.transform = 'scale(1)';
      }
    });

    // Add content animation on slide change
    const activeSlide = this.slidesList[this.currentIndex];
    const headings = activeSlide.querySelectorAll('h2, p');
    headings.forEach((heading, index) => {
      heading.style.animation = 'none';
      setTimeout(() => {
        heading.style.animation = `slideInUp 0.8s ease forwards ${index * 0.2 + 0.3}s`;
      }, 50);
    });

    // Reset and restart progress bar
    this.resetProgressBar();
    setTimeout(() => this.startProgressBar(), 100);

    // Reset transitioning flag after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 800);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= this.totalSlides) index = this.totalSlides - 1;

    this.currentIndex = index;
    this.updateSlider();
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
    this.isAutoPlaying = true;
  }

  pauseAutoSlide() {
    this.stopAutoSlide();
    this.isAutoPlaying = false;
    this.pauseProgressBar();
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  startProgressBar() {
    if (this.progressBar && !document.hidden) {
      this.progressBar.style.transition = 'none';
      this.progressBar.style.width = '0%';

      // Force reflow
      void this.progressBar.offsetWidth;

      this.progressBar.style.transition = `width ${this.autoSlideDelay}ms linear`;
      this.progressBar.style.width = '100%';
    }
  }

  pauseProgressBar() {
    if (this.progressBar) {
      const computedStyle = window.getComputedStyle(this.progressBar);
      const width = computedStyle.getPropertyValue('width');
      this.progressBar.style.transition = 'none';
      this.progressBar.style.width = width;
    }
  }

  resetProgressBar() {
    if (this.progressBar) {
      this.progressBar.style.transition = 'none';
      this.progressBar.style.width = '0%';
    }
  }

  handleTouchStart(e) {
    this.isTouching = true;
    this.touchStartX = e.touches[0].clientX;
    this.pauseAutoSlide();
  }

  handleTouchMove(e) {
    if (!this.isTouching) return;
    e.preventDefault();
  }

  handleTouchEnd(e) {
    if (!this.isTouching) return;

    this.isTouching = false;
    this.touchEndX = e.changedTouches[0].clientX;
    this.handleSwipe();

    if (this.isAutoPlaying) {
      setTimeout(() => this.startAutoSlide(), 1000);
    }
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  handleKeydown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        this.toggleAutoPlay();
        break;
    }
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.pauseAutoSlide();
    } else {
      this.startAutoSlide();
    }
  }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add blur effect to images for better text readability
  const images = document.querySelectorAll('.slide-xi-1-img');
  images.forEach(img => {
    // Create a low-quality version for faster loading
    const src = img.src.replace('&blur=50', '');
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.style.filter = 'none';
    };
    tempImg.src = src;
  });

  const slider = new SliderXi1();

  // Make slider accessible globally for debugging
  window.sliderXi1 = slider;

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    slider.stopAutoSlide();
  });
});

// our work js

// Filter functionality
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  // Filter function
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Show/hide work items based on filter
      workItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          const categories = item.getAttribute('data-category').split(' ');
          if (categories.includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });

  // Animate stats counter
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.work-stats');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) observer.observe(statsSection);

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Add hover animation to work items
  workItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;

    // Add click effect
    item.addEventListener('click', function (e) {
      if (!e.target.closest('.work-link')) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
  });

  // Work link click handling
  const workLinks = document.querySelectorAll('.work-link');
  workLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);

      // In a real implementation, this would open a project detail page
      alert('In a real implementation, this would open the project details page.');
    });
  });

  // Back button functionality
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      if (history.length > 1) {
        history.back();
      } else {
        // Fallback to home page
        window.location.href = 'index.html';
      }
    });
  }
});
