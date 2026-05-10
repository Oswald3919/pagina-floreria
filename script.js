/* ==========================================
   SCRIPT FINAL PARA NARA FLORERÍA
   ========================================== */

// Variables globales
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const heroButton = document.querySelector('.hero-content button');

// Elementos para animaciones de scroll (incluyendo la nueva sección de valores)
const scrollElements = document.querySelectorAll(
  '.hero-content, .catalog-header, .card, .section-header, .fest-card, ' + 
  '.contact-card, .contact-form, .footer-brand, .footer-links, ' +
  '.about-container, .about-content, .about-image, .values-container, .value-card, ' +
  '.benefit-item, .portfolio-item, .package-card, .testimonial-card, ' + 
  '.blog-card, .faq-item, .subscription-container'
);

// Configuración del observer
const observerOptions = {
  threshold: 0.18,
};

// Observer para efectos de entrada por scroll
const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Inicialización de las animaciones
scrollElements.forEach(el => {
  el.classList.add('animate');
  scrollObserver.observe(el);
});

// Función para actualizar el estado de la barra de navegación
const updateNavbarState = () => {
  if (window.scrollY > 45) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

// Event listener para cambios al hacer scroll
window.addEventListener('scroll', updateNavbarState);
updateNavbarState();

// Menú móvil
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

// Navegación suave entre secciones
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

// Botón de explorar colección
heroButton?.addEventListener('click', () => {
  const catalogElement = document.querySelector('.catalog');
  if (catalogElement) {
    smoothScrollTo(catalogElement, 1200);
  }
});

// Formulario de contacto
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

// Efecto de transparencia del hero en scroll
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');

  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = 300;
      let opacity = 1 - (scrollY / maxScroll);

      if (opacity < 0) opacity = 0;
      if (opacity > 1) opacity = 1;

      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${scrollY * -0.2}px)`;
    });
  }

  // Filtros para el catálogo de productos
  initProductFilters();
  
  // Filtros para el portfolio
  initPortfolioFilters();
  
  // Inicializamos las preguntas frecuentes
  initFAQ();
  
  // Manejamos el formulario de suscripción por WhatsApp
  initSubscriptionForm();
});

// Filtros para el catálogo de productos
function initProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.card');
  
  // Verificamos que existan los elementos
  if (!filterButtons.length || !products.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Removemos la clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Añadimos la clase active al botón clickeado
      button.classList.add('active');
      
      // Obtenemos la categoría seleccionada
      const filterValue = button.dataset.filter;
      
      // Filtramos los productos
      products.forEach(product => {
        if (filterValue === 'all' || product.dataset.category.includes(filterValue)) {
          product.style.display = 'flex';
          setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          }, 100);
        } else {
          product.style.opacity = '0';
          product.style.transform = 'translateY(20px)';
          setTimeout(() => {
            product.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

// Filtros para la sección de portfolio
function initPortfolioFilters() {
  const portfolioFilterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Verificamos que existan los elementos
  if (!portfolioFilterButtons.length || !portfolioItems.length) return;
  
  portfolioFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Removemos la clase active de todos los botones
      portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Añadimos la clase active al botón clickeado
      button.classList.add('active');
      
      // Obtenemos la categoría seleccionada
      const filterValue = button.dataset.filter;
      
      // Filtramos los items del portfolio
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

// Acordeón para preguntas frecuentes
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Verificamos que existan los elementos
  if (!faqItems.length) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Comprobamos si el elemento está activo
      const isActive = item.classList.contains('active');
      
      // Cerramos todas las preguntas
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Si no estaba activo, lo activamos
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Formulario de suscripción por WhatsApp
function initSubscriptionForm() {
  const subscriptionForm = document.querySelector('.subscription-form');
  
  // Verificamos que exista el formulario
  if (!subscriptionForm) return;
  
  subscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtenemos el número de teléfono del input
    const phoneInput = subscriptionForm.querySelector('input[type="tel"]');
    const phone = phoneInput ? phoneInput.value.trim() : '';
    
    // Validamos que tengamos un número
    if (!phone) {
      alert('Por favor, ingresa tu número de WhatsApp.');
      return;
    }
    
    // Mensaje para WhatsApp
    const whatsappMessage = `Hola, quiero suscribirme a las novedades de Nara Florería. Mi número es: ${phone}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/523340187767?text=${encodedMessage}`;
    
    // Abrimos WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpiamos el formulario
    subscriptionForm.reset();
  });
}