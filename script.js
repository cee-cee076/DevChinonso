// ========================================
// Chinonso Portfolio - Interactive Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========== Hamburger Menu ==========
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ========== Smooth Scroll Active Link ==========
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // ========== Scroll Fade-Up Animation ==========
  const fadeElements = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .education-card, .about-content, .about-image, .contact-card'
  );

  fadeElements.forEach(el => {
    el.classList.add('fade-up');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after first reveal for performance
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeElements.forEach(el => observer.observe(el));

  // ========== Header background on scroll ==========
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(10, 14, 23, 0.92)';
    } else {
      header.style.background = 'rgba(10, 14, 23, 0.75)';
    }
  });

  // ========== Download CV button reminder ==========
  const cvBtn = document.getElementById('download-cv');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      // If still on placeholder, show a gentle alert
      if (cvBtn.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Please replace the href of the Download CV button with the actual link to your CV (Google Drive, Dropbox, or direct PDF URL).');
      }
    });
  }
});
