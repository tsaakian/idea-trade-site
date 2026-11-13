(function () {
  'use strict';

  var drawer = document.getElementById('mobile-drawer');
  var toggle = document.querySelector('header > div:first-child > div > button');
  if (!drawer || !toggle) return;

  function setMenuOpen(isOpen) {
    drawer.classList.toggle('hidden', !isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  toggle.addEventListener('click', function () {
    setMenuOpen(drawer.classList.contains('hidden'));
  });

  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  });
})();
