document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('casashanti-menu-toggle');
  var menu = document.getElementById('casashanti-mobile-menu');

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});
