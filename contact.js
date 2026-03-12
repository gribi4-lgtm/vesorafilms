/* =============================================
   CONTACT PAGE — contact.js
   Handles Formspree AJAX submission
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    submitBtn.disabled = true;
    btnText.textContent = 'S E N D I N G . . .';
    successMsg.classList.remove('visible');
    errorMsg.classList.remove('visible');

    try {
      const data     = new FormData(form);
      const response = await fetch(form.action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        successMsg.classList.add('visible');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        errorMsg.classList.add('visible');
      }
    } catch {
      errorMsg.classList.add('visible');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'S E N D \u00a0 I T';
    }
  });
});
