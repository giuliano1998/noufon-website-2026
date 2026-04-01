/* ── popup-form.js — NOUFON ──────────────────────────────────────────
   Maneja: apertura/cierre del popup, envío a Netlify Function,
   y auto-aparición 1 minuto después del primer scroll.
   Incluir con: <script src="popup-form.js" defer></script>
──────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var popup = document.getElementById('contact-popup');
  if (!popup) return;

  function openPopup() {
    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Cerrar con botón X
  var closeBtn = document.getElementById('popupClose');
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Cerrar al click fuera del box
  popup.addEventListener('click', function (e) {
    if (e.target === popup) closePopup();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  // Botón "Contacto" del nav abre el popup
  var navContacto = document.getElementById('navContacto');
  if (navContacto) {
    navContacto.addEventListener('click', function (e) {
      e.preventDefault();
      openPopup();
    });
  }

  // Envío del popup-form → Netlify Function → info@noufon.com
  var popupForm = document.getElementById('popup-form');
  if (popupForm) {
    popupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var fd = new FormData(popupForm);
      var payload = {
        nombre:  (fd.get('popup_nombre')  || '').trim(),
        email:   (fd.get('popup_email')   || '').trim(),
        colegio: (fd.get('popup_colegio') || '').trim()
      };

      try {
        await fetch('/.netlify/functions/send-contact-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (_) { /* silencioso si falla red */ }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'popup_form_submit',
        form_nombre:  payload.nombre,
        form_colegio: payload.colegio
      });

      popupForm.style.display = 'none';
      var divider = document.querySelector('#contact-popup .popup-divider');
      var waBtn   = document.querySelector('#contact-popup .popup-wa-btn');
      var successMsg = document.getElementById('popup-success');
      if (divider)    divider.style.display    = 'none';
      if (waBtn)      waBtn.style.display      = 'none';
      if (successMsg) successMsg.style.display = 'block';
    });
  }

  // Auto-aparición: 1 minuto después del primer scroll (una sola vez por sesión)
  if (!sessionStorage.getItem('popupFired')) {
    window.addEventListener('scroll', function _onFirstScroll() {
      window.removeEventListener('scroll', _onFirstScroll);
      setTimeout(function () {
        if (!popup.classList.contains('active')) {
          openPopup();
          sessionStorage.setItem('popupFired', '1');
        }
      }, 60000); // 1 minuto
    }, { passive: true, once: true });
  }
})();
