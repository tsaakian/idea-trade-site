(function () {
  'use strict';

  var toggle = document.getElementById('mobile-nav-toggle');
  var drawer = document.getElementById('mobile-drawer');
  if (!toggle || !drawer) return;

  function closeMenu() {
    drawer.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isHidden = drawer.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(!isHidden));
  });

  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

})();
