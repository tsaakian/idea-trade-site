(function () {
  'use strict';

  function initializeMenu() {
    var drawer = document.getElementById('mobile-drawer');
    var toggle = document.getElementById('mobile-nav-toggle');
    var closeButton = document.getElementById('mobile-nav-close');
    if (!drawer || !toggle) return;

    function setMenuOpen(isOpen) {
      drawer.classList.toggle('hidden', !isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    }

    toggle.onclick = function () {
      setMenuOpen(drawer.classList.contains('hidden'));
    };

    if (closeButton) closeButton.onclick = function () {
      setMenuOpen(false);
    };

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuOpen(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu);
  } else {
    initializeMenu();
  }
})();
