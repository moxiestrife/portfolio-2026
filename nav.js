/**
 * Global nav — shared across portfolio (home) and inner pages.
 * Home: transparent over hero, then .scrolled (ivory bar) after threshold.
 * Inner pages (no .hero): always .scrolled.
 */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const navToggle = nav.querySelector('.nav-toggle');
  const navLinks = nav.querySelector('.nav-links');
  const navLogo = nav.querySelector('.nav-logo');

  // Menu toggle (mobile)
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

  // Inner page: no hero → always show ivory bar (scrolled state)
  var isInnerPage = !document.querySelector('.hero');
  if (isInnerPage) {
    nav.classList.add('scrolled');
    if (navLogo) navLogo.style.color = '#6B2D6E';
    return;
  }

  // Home: dark nav only when actually in the contact (plum) section, not when it’s just peeking (e.g. in Kudos)
  window.addEventListener('scroll', function () {
    nav.classList.remove('nav-open');
    var scrollY = window.scrollY;
    var threshold = window.matchMedia('(max-width: 640px)').matches ? 45 : 80;
    if (scrollY > threshold) {
      nav.classList.add('scrolled');
      if (navLogo) navLogo.style.color = '#6B2D6E';
    } else {
      nav.classList.remove('scrolled');
      if (navLogo) navLogo.style.color = 'rgba(245, 239, 224, 0.75)';
    }
    nav.style.background = '';
    nav.style.backdropFilter = '';
    nav.style.boxShadow = '';
  }, { passive: true });

  window.dispatchEvent(new Event('scroll'));
})();
