/* Mobile drawer: open/close, Escape, scrim, focus trap. Progressive enhancement. */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('nav-drawer');
  if (!toggle || !drawer) return;
  var lastFocus = null;

  function focusables() {
    return Array.prototype.slice.call(
      drawer.querySelectorAll('a[href], button:not([disabled])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }
  function open() {
    lastFocus = document.activeElement;
    drawer.dataset.open = 'true';
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var f = focusables(); if (f.length) f[0].focus();
    document.addEventListener('keydown', onKey);
  }
  function close() {
    drawer.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  toggle.addEventListener('click', open);
  drawer.querySelectorAll('[data-drawer-close]').forEach(function (el) { el.addEventListener('click', close); });
  drawer.querySelectorAll('a[href]').forEach(function (a) {
    a.addEventListener('click', close);
  });
})();

/* Subtle header elevation on scroll */
(function () {
  var h = document.querySelector('.site-header');
  if (!h) return;
  function onScroll() { h.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* Scroll reveal: one-shot, motion-safe, fail-open.
   Reveals any .reveal element at/above the viewport, so nothing can get stuck hidden
   (handles normal scroll, jump-scroll, and #hash navigation). */
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!els.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  function check() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els = els.filter(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) { el.classList.add('in'); return false; }
      return true;
    });
    if (!els.length) {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }
  }
  check();
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check, { passive: true });
})();
