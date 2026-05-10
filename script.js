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

// Función para scroll suave personalizado
function smoothScrollTo(element, duration = 1200) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('.navbar nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      smoothScrollTo(targetElement, 1200); // 1.2 segundos de duración
    }
    navbar.classList.remove('open'); // Cerrar menú móvil
  });
});

heroButton?.addEventListener('click', () => {
  const catalogElement = document.querySelector('.catalog');
  if (catalogElement) {
    smoothScrollTo(catalogElement, 1200);
  }
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

// Fondo dinámico removido - ahora fondos sólidos

