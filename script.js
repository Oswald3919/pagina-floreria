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
  const navbarContainer = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('nav a');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navbarContainer.classList.toggle('menu-open');
      // Prevent scroll when menu is open
      document.body.style.overflow = navbarContainer.classList.contains('menu-open') ? 'hidden' : '';
    });
  }

  // 6. Close Menu on Link Click & Smooth Scroll
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close menu
      navbarContainer.classList.remove('menu-open');
      document.body.style.overflow = '';

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Catalog Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog .card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      catalogCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          // Small timeout to allow display:block to take effect before opacity transition
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

  // 7.1 Catalog Detail Toggle
  const cardDetailTriggers = document.querySelectorAll('.card-btn-detail');
  cardDetailTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      card.classList.toggle('details-open');
      
      // Update button text
      if (card.classList.contains('details-open')) {
        btn.textContent = 'Ocultar detalles';
      } else {
        btn.textContent = 'Ver detalles';
      }
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

  // 8.1 Blog Read More Toggle
  const blogTriggers = document.querySelectorAll('.blog-btn-trigger');
  blogTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.blog-card');
      card.classList.toggle('active');
      
      // Update button text
      if (card.classList.contains('active')) {
        btn.textContent = 'Leer menos';
      } else {
        btn.textContent = 'Leer más';
      }
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