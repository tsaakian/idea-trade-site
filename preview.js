(function () {
  'use strict';

  function initializeMenu() {
    var drawer = document.getElementById('mobile-drawer');
    var toggle = document.getElementById('mobile-nav-toggle');
    if (!drawer || !toggle) return;

    var closeButton = drawer.querySelector('button[aria-label="Close navigation menu"]');
    var links = drawer.querySelectorAll('a');

    function closeMenu() {
      drawer.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.onclick = function () {
      var isOpen = !drawer.classList.contains('hidden');
      drawer.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isOpen));
    };

    if (closeButton) closeButton.onclick = closeMenu;
    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu);
  } else {
    initializeMenu();
  }
})();
