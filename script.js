// Premium Animations and Interactions
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Entry Animation
  const hero = document.getElementById('hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('loaded');
    }, 100);
  }

  // 2. Reveal on Scroll Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. Parallax Effect for Hero
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `scale(1.05) translateY(${scroll * 0.3}px)`;
    }
  });

  // 5. Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.navbar nav');
  
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      // Basic toggle, could be improved with a class
      navbar.classList.toggle('menu-open');
    });
  }

  // 6. Smooth Scroll for Nav Links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          nav.style.display = 'none';
        }
      }
    });
  });

  // 7. Catalog Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Toggle current
      item.classList.toggle('active');
      // Close others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
    });
  });

  // 9. Contact Form Logic (WhatsApp)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const numero = document.getElementById('numero').value;
      const message = document.getElementById('message').value;

      const whatsappUrl = `https://wa.me/523340187767?text=Hola,%20soy%20${name}.%20${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});