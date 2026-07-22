const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const otaTrack = document.querySelector('.ota-track');
const otaPrev = document.querySelector('.carousel-btn.prev');
const otaNext = document.querySelector('.carousel-btn.next');
let activeIndex = 0;
let autoPlay;

function showSlide(index) {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === activeIndex);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === activeIndex);
  });
}

function startAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    showSlide(activeIndex + 1);
  }, 5000);
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slide));
    startAutoPlay();
  });
});

if (otaTrack && otaPrev && otaNext) {
  let otaDirection = 1;
  let otaAutoScroll;

  function startOtaAutoScroll() {
    clearInterval(otaAutoScroll);
    otaAutoScroll = setInterval(() => {
      if (otaTrack.scrollLeft + otaTrack.clientWidth >= otaTrack.scrollWidth - 10) {
        otaDirection = -1;
      } else if (otaTrack.scrollLeft <= 0) {
        otaDirection = 1;
      }

      otaTrack.scrollBy({ left: otaDirection * 220, behavior: 'smooth' });
    }, 1800);
  }

  otaPrev.addEventListener('click', () => {
    otaDirection = -1;
    otaTrack.scrollBy({ left: -220, behavior: 'smooth' });
    startOtaAutoScroll();
  });

  otaNext.addEventListener('click', () => {
    otaDirection = 1;
    otaTrack.scrollBy({ left: 220, behavior: 'smooth' });
    startOtaAutoScroll();
  });

  otaTrack.addEventListener('mouseenter', () => clearInterval(otaAutoScroll));
  otaTrack.addEventListener('mouseleave', startOtaAutoScroll);
  startOtaAutoScroll();
}

showSlide(0);
startAutoPlay();
