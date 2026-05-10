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
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
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
  const numero = document.getElementById('numero').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !numero || !message) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const whatsappMessage = `Hola, soy ${name}. Mi número es ${numero}. Mi pedido: ${message}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/523340187767?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
});

// Fondo dinámico removido - ahora fondos sólidos
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    const maxScroll = 300;
    let opacity = 1 - (scrollY / maxScroll);

    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    heroContent.style.opacity = opacity;

    heroContent.style.transform = `translateY(${scrollY * -0.2}px)`;
  });
  /* ---------- Filtros de Portfolio ---------- */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Cambiar estilo activo
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = 'block';
        card.classList.add('animate');
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ---------- FAQ Accordion ---------- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.question');
  question.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

/* ---------- Newsletter (solo UI) ---------- */
document.getElementById('newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  // Simulación rápida de éxito (puedes conectar a tu backend más tarde)
  alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
  e.target.reset();
});

/* ---------- Hover overlay en tarjetas de producto (ya está en CSS, solo activamos), 
    pero para que el overlay exista añadimos el HTML en la sección de productos: 
    <div class="overlay">Ver detalle</div>
   (Recuerda haber añadido ese div dentro de .card en el HTML) */
});
