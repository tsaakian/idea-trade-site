(function () {
  'use strict';

  function setMenuState(drawer, toggle, open) {
    drawer.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  function initialize() {
    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('mobile-menu-toggle');

    if (drawer && toggle) {
      toggle.addEventListener('click', function () {
        setMenuState(drawer, toggle, drawer.classList.contains('hidden'));
      });

      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setMenuState(drawer, toggle, false);
        });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !drawer.classList.contains('hidden')) {
          setMenuState(drawer, toggle, false);
          toggle.focus();
        }
      });
    }

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
