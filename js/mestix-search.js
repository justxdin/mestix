// ============================================================
// MESTIX — Buscador con sugerencias en vivo
// ============================================================
// Se engancha automáticamente a los inputs de búsqueda del header (desktop
// y el panel mobile) usando las clases que ya existen en el HTML — no hace
// falta tocar el markup de cada página. Depende de window.MESTIX_SEARCH_DATA
// (ver js/mestix-search-data.js, debe cargarse ANTES que este archivo).
(function(){

  function normalizar(str){
    return (str || '')
      .toString()
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // saca tildes
  }

  function buscar(query, opciones){
    opciones = opciones || {};
    const data = window.MESTIX_SEARCH_DATA || { productos: [], articulos: [] };
    const q = normalizar(query).trim();
    if (!q) return { productos: [], articulos: [], marcas: [] };

    const productos = data.productos.filter(p =>
      normalizar(p.nombre).includes(q) || normalizar(p.marca).includes(q)
    );
    const articulos = data.articulos.filter(a =>
      normalizar(a.titulo).includes(q) || normalizar(a.excerpt).includes(q) || normalizar(a.tag).includes(q)
    );

    // "¿Podrías estar buscando...?" — si el término calza con una marca,
    // sugiere saltar directo al catálogo filtrado por esa marca y especie,
    // igual que el patrón que mostraste (ej: "bravery" → "bravery gato").
    const marcasEncontradas = {};
    productos.forEach(p => {
      const key = p.marca + '|' + p.especie;
      if (!marcasEncontradas[key] && normalizar(p.marca).includes(q)) {
        marcasEncontradas[key] = { marca: p.marca, especie: p.especie, catalogUrl: p.catalogUrl };
      }
    });

    const limite = opciones.completo ? Infinity : { productos: 5, articulos: 3 };
    return {
      productos: opciones.completo ? productos : productos.slice(0, limite.productos),
      articulos: opciones.completo ? articulos : articulos.slice(0, limite.articulos),
      marcas: Object.values(marcasEncontradas).slice(0, 2)
    };
  }

  // API pública — la usa buscar.html para la página de resultados completa,
  // sin duplicar la lógica de coincidencias del dropdown.
  window.MestixSearch = { buscar, normalizar, scoreClass, escapeHtml };

  function scoreClass(score){
    if (score >= 80) return 'sd-score-good';
    if (score >= 50) return 'sd-score-mid';
    return 'sd-score-bad';
  }

  function renderDropdown(container, query, resultados){
    const { productos, articulos, marcas } = resultados;
    const hayAlgo = productos.length || articulos.length;

    if (!query.trim()){
      container.innerHTML = '';
      container.classList.remove('open');
      return;
    }

    if (!hayAlgo){
      container.innerHTML = `
        <div class="search-dropdown-empty">
          <p>No encontramos resultados para "<strong>${escapeHtml(query)}</strong>".</p>
          <p class="sd-hint">Probá con el nombre de la marca, o revisá que esté bien escrito.</p>
        </div>`;
      container.classList.add('open');
      return;
    }

    let html = '';

    marcas.forEach(m => {
      const etiqueta = m.especie === 'perro' ? 'perro' : 'gato';
      html += `<a class="sd-suggestion" href="${m.catalogUrl}?marca=${encodeURIComponent(m.marca.toLowerCase())}">
        <span class="sd-suggestion-label">¿Podrías estar buscando?</span>
        <span class="sd-suggestion-text">${escapeHtml(m.marca)} ${etiqueta}</span>
      </a>`;
    });

    if (productos.length){
      html += `<div class="sd-section-label">Productos</div>`;
      productos.forEach(p => {
        const img = p.imagen
          ? `<img src="${p.imagen}" alt="">`
          : `<span class="sd-thumb-fallback">${p.especie === 'perro' ? `<svg class="icon-paw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M12 21c-3.5 0-6.5-1.8-6.5-4.5 0-1.8 1.3-2.7 1.3-4.3 0-1.2-.8-1.7-.8-2.9 0-1.4 1.1-2.3 2.3-2.3 1.1 0 1.7.7 2.2 1.6.4.7.9 1.1 1.5 1.1s1.1-.4 1.5-1.1c.5-.9 1.1-1.6 2.2-1.6 1.2 0 2.3.9 2.3 2.3 0 1.2-.8 1.7-.8 2.9 0 1.6 1.3 2.5 1.3 4.3C18.5 19.2 15.5 21 12 21z" fill="currentColor"/><ellipse cx="7" cy="6.2" rx="1.6" ry="2.4" fill="currentColor"/><ellipse cx="17" cy="6.2" rx="1.6" ry="2.4" fill="currentColor"/></svg>` : `<svg class="icon-paw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M12 21c-3.5 0-6.5-1.8-6.5-4.5 0-1.8 1.3-2.7 1.3-4.3 0-1.2-.8-1.7-.8-2.9 0-1.4 1.1-2.3 2.3-2.3 1.1 0 1.7.7 2.2 1.6.4.7.9 1.1 1.5 1.1s1.1-.4 1.5-1.1c.5-.9 1.1-1.6 2.2-1.6 1.2 0 2.3.9 2.3 2.3 0 1.2-.8 1.7-.8 2.9 0 1.6 1.3 2.5 1.3 4.3C18.5 19.2 15.5 21 12 21z" fill="currentColor"/><path d="M5.5 7.5L7.8 4l1 4.3z" fill="currentColor"/><path d="M18.5 7.5L16.2 4l-1 4.3z" fill="currentColor"/></svg>`}</span>`;
        html += `<a class="sd-result" href="${p.link}">
          <span class="sd-thumb">${img}</span>
          <span class="sd-result-text">
            <span class="sd-result-name">${escapeHtml(p.marca)} ${escapeHtml(p.nombre)}</span>
            <span class="sd-result-meta"><span class="sd-score ${scoreClass(p.score)}">${p.score}</span> alimento para ${p.especie === 'perro' ? 'perro' : 'gato'}</span>
          </span>
        </a>`;
      });
    }

    if (articulos.length){
      html += `<div class="sd-section-label">Artículos</div>`;
      articulos.forEach(a => {
        html += `<a class="sd-result sd-result-article" href="${a.link}">
          <span class="sd-thumb sd-thumb-article">📄</span>
          <span class="sd-result-text">
            <span class="sd-result-name">${escapeHtml(a.titulo)}</span>
            <span class="sd-result-meta">${escapeHtml(a.tag)}</span>
          </span>
        </a>`;
      });
    }

    html += `<a class="sd-viewall" href="buscar.html?q=${encodeURIComponent(query)}">Ver todos los resultados para "${escapeHtml(query)}" →</a>`;

    container.innerHTML = html;
    container.classList.add('open');
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function wireInput(input){
    if (input.dataset.mestixSearchWired) return;
    input.dataset.mestixSearchWired = 'true';

    const wrap = input.closest('.header-search, .mobile-search');
    if (!wrap) return;
    wrap.classList.add('search-has-dropdown');

    // El dropdown se cuelga de <body> (no de wrap) y se posiciona con
    // position:fixed calculado en JS — así nunca lo recorta un ancestro con
    // overflow:hidden/auto (por ejemplo el panel del menú mobile, que
    // necesita su propio scroll para la lista de links).
    const isPageBar = wrap.classList.contains('search-page-input');
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown' + (isPageBar ? ' search-dropdown-pagebar' : '');
    document.body.appendChild(dropdown);

    function posicionar(){
      const r = wrap.getBoundingClientRect();
      dropdown.style.top = (r.bottom + 10) + 'px';
      if (isPageBar){
        dropdown.style.left = r.left + 'px';
        dropdown.style.width = r.width + 'px';
        dropdown.style.right = 'auto';
      } else {
        dropdown.style.left = 'auto';
        dropdown.style.right = (window.innerWidth - r.right) + 'px';
      }
    }

    let debounceTimer = null;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const query = input.value;
      debounceTimer = setTimeout(() => {
        posicionar();
        renderDropdown(dropdown, query, buscar(query));
      }, 120);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()){
        posicionar();
        renderDropdown(dropdown, input.value, buscar(input.value));
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter'){
        e.preventDefault();
        const query = input.value.trim();
        if (query) window.location.href = 'buscar.html?q=' + encodeURIComponent(query);
      } else if (e.key === 'Escape'){
        dropdown.classList.remove('open');
        input.blur();
      }
    });

    window.addEventListener('resize', () => { if (dropdown.classList.contains('open')) posicionar(); });
    window.addEventListener('scroll', () => { if (dropdown.classList.contains('open')) posicionar(); }, true);

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  }

  function init(){
    document.querySelectorAll('.header-search input, .mobile-search input').forEach(wireInput);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
