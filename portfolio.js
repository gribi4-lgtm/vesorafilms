/* =============================================
   VESORA FILMS — portfolio.js
   Handles lightbox for 3 film panels
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const filmPanels    = document.querySelectorAll('.film-panel');
  const lightbox      = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxWrap  = document.getElementById('lightboxVideoWrap');

  function buildEmbedUrl(videoId, platform) {
    if (!videoId) return null;
    if (platform === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    // Default: YouTube
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  function openLightbox(panel) {
    const videoId  = panel.dataset.videoId  || '';
    const platform = panel.dataset.platform || 'youtube';
    const title    = panel.querySelector('.film-info-title')?.textContent || 'Film';
    const embedUrl = buildEmbedUrl(videoId.trim(), platform);

    if (embedUrl) {
      lightboxWrap.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      // Elegant placeholder — no video ID yet
      lightboxWrap.innerHTML = `
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0a0a0a;flex-direction:column;gap:20px;padding:40px;text-align:center;">
          <p style="font-family:'Cormorant Garamond',serif;font-size:2rem;color:#F5F0EB;font-style:italic;">${title}</p>
          <p style="font-family:'Montserrat',sans-serif;font-size:0.65rem;letter-spacing:4px;color:#C9A96E;font-weight:300;">V I D E O &nbsp; C O M I N G &nbsp; S O O N</p>
          <p style="font-family:'Montserrat',sans-serif;font-size:0.6rem;letter-spacing:1px;color:rgba(245,240,235,0.3);font-weight:300;max-width:320px;line-height:1.8;">Add your YouTube or Vimeo ID to the<br>data-video-id attribute in portfolio.html</p>
        </div>`;
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxWrap.innerHTML = '';
    document.body.style.overflow = '';
  }

  filmPanels.forEach(panel => {
    panel.addEventListener('click', () => openLightbox(panel));
    panel.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(panel); }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

});
