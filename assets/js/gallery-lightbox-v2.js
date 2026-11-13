/**
 * Lightbox simples e sem dependências para grids com [data-lightbox].
 * Suporta navegação entre as imagens de um mesmo grupo (setas e teclado).
 * Exposto como window.CasaShantiLightbox.init() para poder ser chamado
 * de novo após conteúdo carregado dinamicamente (ex: eventos.js).
 */
window.CasaShantiLightbox = (function () {
  var overlay;
  var img;
  var prevBtn;
  var nextBtn;
  var items = [];
  var currentIndex = 0;

  function ensureOverlay() {
    if (overlay) {
      return;
    }

    overlay = document.createElement('div');
    overlay.className =
      'fixed inset-0 z-[60] hidden items-center justify-center bg-black/80 p-4';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button type="button" data-action="close" aria-label="Fechar" class="absolute right-4 top-4 text-3xl text-white">&times;</button>' +
      '<button type="button" data-action="prev" aria-label="Foto anterior" class="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-white">&#8249;</button>' +
      '<img class="max-h-full max-w-full rounded-lg shadow-glow" alt="" />' +
      '<button type="button" data-action="next" aria-label="Próxima foto" class="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-white">&#8250;</button>';
    document.body.appendChild(overlay);

    img = overlay.querySelector('img');
    prevBtn = overlay.querySelector('[data-action="prev"]');
    nextBtn = overlay.querySelector('[data-action="next"]');

    overlay.querySelector('[data-action="close"]').addEventListener('click', close);
    prevBtn.addEventListener('click', function () {
      show(currentIndex - 1);
    });
    nextBtn.addEventListener('click', function () {
      show(currentIndex + 1);
    });

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        close();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (overlay.classList.contains('hidden')) {
        return;
      }
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowLeft') {
        show(currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        show(currentIndex + 1);
      }
    });
  }

  function show(index) {
    if (!items.length) {
      return;
    }

    currentIndex = (index + items.length) % items.length;

    var link = items[currentIndex];
    var imgEl = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = imgEl ? imgEl.alt : '';

    var hasMultiple = items.length > 1;
    prevBtn.classList.toggle('hidden', !hasMultiple);
    nextBtn.classList.toggle('hidden', !hasMultiple);
  }

  function open(groupItems, index) {
    items = groupItems;
    show(index);
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  }

  function close() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    img.src = '';
    items = [];
  }

  function init() {
    var galleries = document.querySelectorAll('[data-lightbox]');

    if (!galleries.length) {
      return;
    }

    ensureOverlay();

    galleries.forEach(function (gallery) {
      var links = Array.prototype.slice.call(gallery.querySelectorAll('a[href]'));

      links.forEach(function (link, index) {
        if (link.dataset.lightboxBound) {
          return;
        }
        link.dataset.lightboxBound = 'true';
        link.addEventListener('click', function (event) {
          event.preventDefault();
          open(links, index);
        });
      });
    });
  }

  return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
  window.CasaShantiLightbox.init();
});
