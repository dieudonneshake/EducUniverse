document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE NAVIGATION =====
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileNavToggle && mobileNav) {
    mobileNavToggle.addEventListener('click', function() {
      // Toggle active states
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Toggle aria-expanded attribute
      const isExpanded = this.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      
      // Toggle body scroll
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close when clicking on links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.header-content') && mobileNav.classList.contains('active')) {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== USER DROPDOWN =====
  const userBtn = document.querySelector('.user-btn');
  const userDropdown = document.querySelector('.user-dropdown');
  
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.user-dropdown')) {
        userDropdown.classList.remove('active');
      }
    });
  }

  // ===== STICKY HEADER ON SCROLL =====
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
      header.classList.toggle('scrolled-header', window.scrollY > 50);
    }
  });

  // ===== BACKGROUND SLIDESHOW =====
  const slides = document.querySelectorAll('.hero-background .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    slides[currentSlide].classList.add('active');
    
    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds (only one interval should run)
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover if needed
    const heroSection = document.querySelector('.hero-background');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroSection.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        setInterval(nextSlide, 5000);
      });
    }
  }

  // ===== FEATURE CARD ANIMATIONS =====
  const features = document.querySelectorAll('.feature-card');
  if (features.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-feature');
          // Optional: Unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    features.forEach(feature => observer.observe(feature));
  }

  // ===== PROGRESS ANIMATIONS =====
  function animateCounter(element, targetValue, duration = 1.5) {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: targetValue,
      duration: duration,
      ease: "power1.out",
      onUpdate: function() {
        element.textContent = Math.round(obj.value) + "%";
      }
    });
  }

  const overallProgress = document.getElementById('overall-progress');
  const courseProgress = document.getElementById('course-progress');
  
  if (overallProgress) animateCounter(overallProgress, 65);
  if (courseProgress) animateCounter(courseProgress, 50);

  // Progress rings animation
  document.querySelectorAll('.progress-ring-fill').forEach(ring => {
    const value = parseInt(ring.parentElement.querySelector('.progress-value').textContent);
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (value / 100) * circumference;
    gsap.to(ring, {
      strokeDashoffset: offset,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.5
    });
  });

  // Progress bars animation
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    gsap.to(bar, {
      width: width,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5
    });
  });
});

