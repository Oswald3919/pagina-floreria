const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const heroButton = document.querySelector('.hero-content button');
const scrollElements = document.querySelectorAll('.hero-content, .catalog-header, .card, .section-header, .fest-card, .contact-card, .contact-form, .footer-brand, .footer-links');

const observerOptions = {
  threshold: 0.18,
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

scrollElements.forEach(el => {
  el.classList.add('animate');
  scrollObserver.observe(el);
});

const updateNavbarState = () => {
  if (window.scrollY > 45) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', updateNavbarState);
updateNavbarState();

navToggle?.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

document.querySelectorAll('.navbar nav a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});

heroButton?.addEventListener('click', () => {
  document.querySelector('.catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const whatsappMessage = `Hola, soy ${name}. Mi email es ${email}. Mi pedido: ${message}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/523340187767?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
});
