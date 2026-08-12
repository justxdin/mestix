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
          : `<span class="sd-thumb-fallback">${p.especie === 'perro' ? `<svg class="icon-dog" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M18,4C16.29,4 15.25,4.33 14.65,4.61C13.88,4.23 13,4 12,4C11,4 10.12,4.23 9.35,4.61C8.75,4.33 7.71,4 6,4C3,4 1,12 1,14C1,14.83 2.32,15.59 4.14,15.9C4.78,18.14 7.8,19.85 11.5,20V15.72C10.91,15.35 10,14.68 10,14C10,13 12,13 12,13C12,13 14,13 14,14C14,14.68 13.09,15.35 12.5,15.72V20C16.2,19.85 19.22,18.14 19.86,15.9C21.68,15.59 23,14.83 23,14C23,12 21,4 18,4M4.15,13.87C3.65,13.75 3.26,13.61 3,13.5C3.25,10.73 5.2,6.4 6.05,6C6.59,6 7,6.06 7.37,6.11C5.27,8.42 4.44,12.04 4.15,13.87M9,12A1,1 0 0,1 8,11C8,10.46 8.45,10 9,10A1,1 0 0,1 10,11C10,11.56 9.55,12 9,12M15,12A1,1 0 0,1 14,11C14,10.46 14.45,10 15,10A1,1 0 0,1 16,11C16,11.56 15.55,12 15,12M19.85,13.87C19.56,12.04 18.73,8.42 16.63,6.11C17,6.06 17.41,6 17.95,6C18.8,6.4 20.75,10.73 21,13.5C20.75,13.61 20.36,13.75 19.85,13.87Z" fill="currentColor"/></svg>` : `<svg class="icon-cat" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" fill="currentColor"/></svg>`}</span>`;
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

    const isPageBar = wrap.classList.contains('search-page-input');
    // El buscador del panel mobile es un caso especial: NO usamos
    // position:fixed con coordenadas calculadas por JS ahí, porque cuando
    // se abre el teclado en un celular real, el navegador re-scrollea el
    // panel para mantener visible el input — y las coordenadas ya
    // calculadas quedan desactualizadas, dando la sensación de que el
    // dropdown (o el resto del menú) "se pierde". En vez de perseguir esa
    // posición con más listeners, el dropdown vive en el flujo normal del
    // documento, justo debajo del input, adentro del propio panel — así se
    // mueve solo, gratis, con cualquier scroll (lo mueva el teclado, el
    // usuario, o lo que sea), sin cálculos.
    const isMobileMenu = wrap.classList.contains('mobile-search');

    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown' +
      (isPageBar ? ' search-dropdown-pagebar' : '') +
      (isMobileMenu ? ' search-dropdown-inline' : '');

    if (isMobileMenu) {
      wrap.insertAdjacentElement('afterend', dropdown);
    } else {
      document.body.appendChild(dropdown);
    }

    function posicionar(){
      if (isMobileMenu) return; // en flujo normal, no hace falta calcular nada
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

    if (!isMobileMenu) {
      window.addEventListener('resize', () => { if (dropdown.classList.contains('open')) posicionar(); });
      window.addEventListener('scroll', () => { if (dropdown.classList.contains('open')) posicionar(); }, true);
    }

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
