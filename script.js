const sections = document.querySelectorAll(".section");
const navHeight = document.querySelector('nav').offsetHeight;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1,
  rootMargin: `-${navHeight}px 0px 0px 0px`
});

sections.forEach(section => {
  observer.observe(section);
});

function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetOffset = targetElement.offsetTop - navHeight;
      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
    }
    if (document.getElementById('nav-links').classList.contains('show')) {
      toggleMenu();
    }
  });
});

$(document).ready(function() {
  // Slick Carousel Initializations
  $('.project-carousel, .resisync-carousel, .blooms-carousel, .contact-carousel, .resisync-dorm-carousel').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  });

  // Lightbox Initialization
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'fadeDuration': 300
  });
  
  // 3D Card Hover Effect
  const cards = document.querySelectorAll('.cert-card');
  const maxTilt = 15;
  cards.forEach(card => {
    const glow = card.querySelector('.cert-card-glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      glow.style.opacity = '0';
    });
  });


  $(document).on('lightbox:open', function() {
    var imageContainer = $('.lb-container');
    var closeButton = $('.lb-close');
    if (imageContainer.length && closeButton.length) {
      closeButton.appendTo(imageContainer);
    }
  });
});