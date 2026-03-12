/* =============================================
   VESORA FILMS — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. NAVBAR: opaque on scroll ---- */
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('opaque');
    } else {
      navbar.classList.remove('opaque');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- 2. HAMBURGER / MOBILE MENU ---- */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobLinks    = document.querySelectorAll('.mob-link');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    navbar.classList.add('opaque');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    if (window.scrollY <= 40) navbar.classList.remove('opaque');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobLinks.forEach(l => l.addEventListener('click', closeMenu));

  /* ---- 3. FILM PANEL LIGHTBOX ---- */
  const filmPanels     = document.querySelectorAll('.film-panel');
  const lightbox       = document.getElementById('lightbox');
  const lightboxClose  = document.getElementById('lightboxClose');
  const lightboxWrap   = document.getElementById('lightboxVideoWrap');

  // Placeholder video URLs — replace with real Vimeo/YouTube embeds later
  const filmSources = [
    '', // film1 — add Vimeo/YouTube embed URL
    '', // film2
    '', // film3
  ];

  filmPanels.forEach((panel, i) => {
    panel.addEventListener('click', () => {
      const src = filmSources[i];
      if (src) {
        lightboxWrap.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      } else {
        // Placeholder until real video is added
        lightboxWrap.innerHTML = `
          <video autoplay controls style="position:absolute;inset:0;width:100%;height:100%;background:#000">
            <source src="" type="video/mp4">
            <p style="color:#fff;padding:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">Video coming soon — add your Vimeo or YouTube URL in script.js</p>
          </video>`;
      }
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    // Keyboard accessibility
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') panel.click();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxWrap.innerHTML = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---- 4. TESTIMONIAL SLIDER ---- */
  const track    = document.getElementById('testimonialTrack');
  const slides   = track.querySelectorAll('.testimonial-slide');
  const prevBtn  = document.getElementById('tPrev');
  const nextBtn  = document.getElementById('tNext');
  let current    = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 6s
  let autoplay = setInterval(() => goTo(current + 1), 6000);

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.parentElement.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 6000);
  });

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });

});
