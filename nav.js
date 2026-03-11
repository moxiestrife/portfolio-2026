/**
 * Global nav — fetches nav.html partial and injects it, then initialises behaviour.
 * Home: transparent over hero, transitions to .scrolled (ivory bar) on scroll.
 * Inner pages (no .hero): start in .scrolled state immediately.
 */
(function () {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  fetch('nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.outerHTML = html;
      initNav();
    })
    .catch(function () {
      // fetch failed (e.g. file:// protocol) — nav.html must be served via HTTP
      console.warn('nav.html could not be fetched. Make sure you are running a local server.');
    });

  function initNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const navToggle = nav.querySelector('.nav-toggle');
    const navLinks  = nav.querySelector('.nav-links');
    const navLogo   = nav.querySelector('.nav-logo');

    // Mobile menu toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        nav.classList.toggle('nav-open');
        const open = nav.classList.contains('nav-open');
        navToggle.setAttribute('aria-expanded', open);
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('nav-open');
        });
      });
    }

    // Inner pages (no .hero-wrap) — start already in scrolled/plum state
    const isInnerPage = !document.querySelector('.hero-wrap');
    if (isInnerPage) {
      nav.classList.add('scrolled');
      if (navLogo) navLogo.style.color = '#6B2D6E';
      return;
    }

    // Homepage — transparent at top, ivory bar after scroll threshold
    function updateNav() {
      nav.classList.remove('nav-open');
      const scrollY    = window.scrollY;
      const threshold  = window.matchMedia('(max-width: 640px)').matches ? 45 : 80;
      if (scrollY > threshold) {
        nav.classList.add('scrolled');
        if (navLogo) navLogo.style.color = '#6B2D6E';
      } else {
        nav.classList.remove('scrolled');
        if (navLogo) navLogo.style.color = 'rgba(245, 239, 224, 0.75)';
      }
      nav.style.background    = '';
      nav.style.backdropFilter = '';
      nav.style.boxShadow     = '';
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }
})();
