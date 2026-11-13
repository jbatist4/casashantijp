/**
 * Carrega os dados de /assets/data/eventos.json e renderiza:
 * - o card do "Próximo Evento" na Home (#proximo-evento-container)
 * - a grade de eventos em /eventos/ (#eventos-grid)
 * - a grade da galeria em /galeria/ (#galeria-grid)
 * - o detalhe de um evento em /evento.html?slug=... (#evento-detalhe)
 *
 * Todos os caminhos (imagens, links) são absolutos a partir da raiz do site,
 * então este script funciona da mesma forma em qualquer página/profundidade.
 */
(function () {
  var WHATSAPP_NUMBER = '5583993503000';

  var DIAS_SEMANA = {
    Sunday: 'Domingo',
    Monday: 'Segunda-feira',
    Tuesday: 'Terça-feira',
    Wednesday: 'Quarta-feira',
    Thursday: 'Quinta-feira',
    Friday: 'Sexta-feira',
    Saturday: 'Sábado',
  };

  var MESES = [
    '', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDatePt(dateStr) {
    if (!dateStr) {
      return '';
    }
    var parts = dateStr.split('-');
    if (parts.length !== 3) {
      return dateStr;
    }
    var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    var diaSemanaEn = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    var diaSemana = DIAS_SEMANA[diaSemanaEn] || diaSemanaEn;
    var dia = date.getUTCDate();
    var mes = MESES[date.getUTCMonth() + 1];
    var ano = date.getUTCFullYear();
    return diaSemana + ', ' + dia + ' de ' + mes + ' de ' + ano;
  }

  function formatPrice(value) {
    if (value === '' || value === null || value === undefined) {
      return '';
    }
    var num = Number(value);
    return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function whatsappLink(message) {
    var base = 'https://wa.me/' + WHATSAPP_NUMBER;
    if (!message) {
      return base;
    }
    return base + '?text=' + encodeURIComponent(message);
  }

  function whatsappButtonHtml(message, label, extraClass) {
    return (
      '<a href="' + escapeHtml(whatsappLink(message)) + '" target="_blank" rel="noopener noreferrer" ' +
      'class="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-medium text-teal-900 shadow-md transition-colors hover:bg-amber-500 ' + (extraClass || '') + '">' +
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18c-1.66 0-3.214-.45-4.553-1.234l-.327-.193-3.024.9.9-3.024-.193-.327A8 8 0 1 1 12 20Zm4.4-5.6c-.243-.122-1.434-.706-1.656-.787-.222-.082-.384-.122-.546.122-.162.244-.626.787-.768.95-.142.163-.284.183-.526.061-.243-.122-1.026-.378-1.957-1.21-.723-.645-1.21-1.44-1.352-1.683-.142-.244-.015-.376.107-.498.122-.122.273-.317.41-.476.137-.158.183-.273.274-.456.092-.183.046-.34-.046-.476-.092-.137-.41-.99-.563-1.367-.15-.366-.304-.317-.418-.323-.107-.006-.23-.007-.353-.007-.122 0-.32.046-.49.226-.17.183-.65.635-.65 1.547 0 .913.668 1.795.762 1.918.092.122 1.27 1.946 3.083 2.65 1.812.703 1.812.468 2.13.44.318-.03 1.026-.42 1.17-.825.142-.406.142-.754.1-.825-.04-.07-.152-.112-.395-.234Z"/>' +
      '</svg>' +
      escapeHtml(label) +
      '</a>'
    );
  }

  function eventoUrl(evento) {
    return '/evento.html?slug=' + encodeURIComponent(evento.slug);
  }

  /**
   * Card escuro usado na Home (Próximo Evento) e em /eventos/.
   */
  function renderEventCard(evento) {
    var mensagemZap = evento.mensagem_whatsapp ||
      ('Olá! Quero me inscrever no evento "' + evento.title + '".');

    var html = '<article class="overflow-hidden rounded-2xl bg-slate-950 text-slate-50 shadow-glow">';

    if (evento.imagem) {
      var imgFit = evento.imagem_contain ? 'object-contain' : 'object-cover';
      html += '<div class="aspect-[16/9] w-full overflow-hidden">' +
        '<img src="' + escapeHtml(evento.imagem) + '" alt="' + escapeHtml(evento.title) + '" class="h-full w-full ' + imgFit + '" />' +
        '</div>';
    }

    html += '<div class="space-y-3 p-6">';

    if (evento.vagas_limitadas) {
      html += '<span class="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-900">Vagas Limitadas</span>';
    }

    html += '<h3 class="font-display text-2xl font-semibold text-glow">' +
      '<a href="' + escapeHtml(eventoUrl(evento)) + '">' + escapeHtml(evento.title) + '</a>' +
      '</h3>';

    html += '<ul class="space-y-1 text-sm text-slate-300">';
    if (evento.data) {
      html += '<li><strong class="text-amber-300">Data:</strong> ' + escapeHtml(formatDatePt(evento.data)) + '</li>';
    }
    if (evento.hora) {
      html += '<li><strong class="text-amber-300">Horário:</strong> ' + escapeHtml(evento.hora) + '</li>';
    }
    if (evento.local) {
      html += '<li><strong class="text-amber-300">Local:</strong> ' + escapeHtml(evento.local) + '</li>';
    }
    if (evento.valor !== '' && evento.valor !== null && evento.valor !== undefined) {
      html += '<li><strong class="text-amber-300">Valor:</strong> ' + escapeHtml(formatPrice(evento.valor)) + '</li>';
    }
    html += '</ul>';

    if (evento.excerpt) {
      html += '<p class="text-sm text-slate-300">' + escapeHtml(evento.excerpt) + '</p>';
    }

    html += whatsappButtonHtml(mensagemZap, 'Reservar via WhatsApp', 'mt-2');
    html += '</div></article>';

    return html;
  }

  /**
   * Card claro usado em /galeria/ (eventos realizados).
   */
  function renderGalleryCard(evento) {
    var html = '<a href="' + escapeHtml(eventoUrl(evento)) + '" class="group overflow-hidden rounded-2xl bg-teal-50 shadow-md transition-transform hover:scale-[1.01]">';

    if (evento.imagem) {
      html += '<div class="aspect-[4/3] w-full overflow-hidden">' +
        '<img src="' + escapeHtml(evento.imagem) + '" alt="' + escapeHtml(evento.title) + '" class="h-full w-full object-cover transition-transform group-hover:scale-105" />' +
        '</div>';
    }

    html += '<div class="p-5">';
    html += '<h2 class="font-display text-xl font-semibold text-teal-800">' + escapeHtml(evento.title) + '</h2>';
    if (evento.data) {
      html += '<p class="mt-1 text-sm text-teal-700">' + escapeHtml(formatDatePt(evento.data)) + '</p>';
    }
    html += '</div></a>';

    return html;
  }

  /**
   * Grid de fotos com lightbox (usado no detalhe de eventos realizados).
   */
  function renderGalleryGrid(images) {
    if (!images || !images.length) {
      return '';
    }

    var html = '<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4" data-lightbox>';
    images.forEach(function (path) {
      html += '<a href="' + escapeHtml(path) + '" class="block aspect-square overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]">' +
        '<img src="' + escapeHtml(path) + '" alt="" class="h-full w-full object-cover" />' +
        '</a>';
    });
    html += '</div>';

    return html;
  }

  /**
   * Página de detalhe de um evento (/evento.html?slug=...).
   */
  function renderEventDetail(evento) {
    var mensagemZap = evento.mensagem_whatsapp ||
      ('Olá! Quero me inscrever no evento "' + evento.title + '".');

    var html = '<article class="bg-slate-950 py-14 text-stone-50">' +
      '<div class="mx-auto max-w-3xl px-4 sm:px-6">';

    if (evento.vagas_limitadas && evento.status === 'proximo') {
      html += '<span class="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-900">Vagas Limitadas</span>';
    }

    html += '<h1 class="mt-4 font-display text-4xl font-semibold text-glow sm:text-5xl">' + escapeHtml(evento.title) + '</h1>';

    if (evento.imagem) {
      html += '<div class="mt-6 overflow-hidden rounded-2xl shadow-glow">' +
        '<img src="' + escapeHtml(evento.imagem) + '" alt="' + escapeHtml(evento.title) + '" class="w-full" />' +
        '</div>';
    }

    html += '<ul class="mt-6 space-y-1 text-sm text-slate-300">';
    if (evento.data) {
      html += '<li><strong class="text-amber-300">Data:</strong> ' + escapeHtml(formatDatePt(evento.data)) + '</li>';
    }
    if (evento.hora) {
      html += '<li><strong class="text-amber-300">Horário:</strong> ' + escapeHtml(evento.hora) + '</li>';
    }
    if (evento.local) {
      html += '<li><strong class="text-amber-300">Local:</strong> ' + escapeHtml(evento.local) + '</li>';
    }
    if (evento.valor !== '' && evento.valor !== null && evento.valor !== undefined) {
      html += '<li><strong class="text-amber-300">Valor:</strong> ' + escapeHtml(formatPrice(evento.valor)) + '</li>';
    }
    html += '</ul>';

    if (evento.conteudo) {
      html += '<div class="prose prose-invert mt-6 max-w-none text-slate-200">' + evento.conteudo + '</div>';
    }

    if (evento.status === 'proximo') {
      html += '<div class="mt-8">' + whatsappButtonHtml(mensagemZap, 'Reservar via WhatsApp', '') + '</div>';
    }

    if (evento.status === 'realizado' && evento.galeria && evento.galeria.length) {
      html += '<div class="mt-12">' +
        '<h2 class="font-display text-2xl font-semibold text-stone-50">Galeria do Evento</h2>' +
        '<div class="mt-4">' + renderGalleryGrid(evento.galeria) + '</div>' +
        '</div>';
    }

    html += '</div></article>';

    return html;
  }

  function getProximos(eventos) {
    return eventos
      .filter(function (e) { return e.status === 'proximo'; })
      .sort(function (a, b) { return (a.data || '').localeCompare(b.data || ''); });
  }

  function getRealizados(eventos) {
    return eventos
      .filter(function (e) { return e.status === 'realizado'; })
      .sort(function (a, b) { return (b.data || '').localeCompare(a.data || ''); });
  }

  function init(eventos) {
    var proximoContainer = document.getElementById('proximo-evento-container');
    if (proximoContainer) {
      var proximos = getProximos(eventos);
      var section = document.getElementById('proximo-evento-section');
      if (proximos.length) {
        proximoContainer.innerHTML = renderEventCard(proximos[0]);
      } else if (section) {
        section.classList.add('hidden');
      }
    }

    var eventosGrid = document.getElementById('eventos-grid');
    var eventosVazio = document.getElementById('eventos-vazio');
    if (eventosGrid) {
      var todosProximos = getProximos(eventos);
      if (todosProximos.length) {
        eventosGrid.innerHTML = todosProximos.map(renderEventCard).join('');
      } else if (eventosVazio) {
        eventosVazio.classList.remove('hidden');
      }
    }

    var galeriaGrid = document.getElementById('galeria-grid');
    var galeriaVazio = document.getElementById('galeria-vazio');
    if (galeriaGrid) {
      var realizados = getRealizados(eventos);
      if (realizados.length) {
        galeriaGrid.innerHTML = realizados.map(renderGalleryCard).join('');
      } else if (galeriaVazio) {
        galeriaVazio.classList.remove('hidden');
      }
    }

    var detalheContainer = document.getElementById('evento-detalhe');
    if (detalheContainer) {
      var params = new URLSearchParams(window.location.search);
      var slug = params.get('slug');
      var evento = eventos.find(function (e) { return e.slug === slug; });

      if (evento) {
        detalheContainer.innerHTML = renderEventDetail(evento);
        document.title = evento.title + ' - Casa Shanti';
      } else {
        detalheContainer.innerHTML =
          '<div class="bg-slate-950 py-14 text-center text-stone-50">' +
          '<p>Evento não encontrado.</p>' +
          '<p class="mt-4"><a href="/eventos/" class="text-cyan-300 underline">Ver todos os eventos</a></p>' +
          '</div>';
      }
    }

    // Disparar lightbox para grids carregados dinamicamente.
    if (window.CasaShantiLightbox) {
      window.CasaShantiLightbox.init();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch('/assets/data/eventos.json')
      .then(function (response) { return response.json(); })
      .then(init)
      .catch(function (error) {
        console.error('Erro ao carregar eventos.json', error);
      });
  });
})();
