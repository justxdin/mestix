// ============================================================
// MESTIX — Widget embebible del comparador (perros)
// Reutiliza exactamente la misma base de datos y lógica de cálculo del
// radar que comparador.html — no hay una segunda fuente de verdad, solo
// una presentación recortada (sin header/nav/footer/publicidad) pensada
// para vivir dentro de un <iframe> en sitios de terceros.
// ============================================================

const DOGS_DB = {
  bravery_chicken: {
    marca:"Bravery", marcaSlug:"bravery", nombre:"Chicken Adult Large/Medium", score:93,
    prot:26, grasa:15, carbs:39.6, ceniza:7.9, fibra:2.5, humedad:9, calcio:1.6, fosforo:0.95,
    ingredientes:"Carne de pollo deshidratada, tapioca, grasa de ave, guisantes, fibra de guisantes, celulosa natural, levadura y extracto de levadura (Saccharomyces cerevisiae), boniato, vaina de algarroba, pulpa de remolacha, aceite de pescado, proteína hidrolizada de pollo, proteína de patata, inulina, minerales, fibra de Plantago ovata, aceites esenciales, hidrolizado de crustáceos, hidrolizado de cartílago, yuca.",
    destacados:["pollo","boniato (carbohidrato de calidad)","omega 3 (ácidos grasos esenciales)"],
    alergenos:"pollo", ventajas:["Bajo en cenizas","Sin maíz ni subproductos"], desventajas:[],
    estado:"clean", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Cachorro","g","Apto"],["Adulto","g","Apto"],["Senior","y","Podría consumir"]], raza:"n",
    precio:"$63.000", formatoKilos:12, fuentes:{oficial:true,marca:true,noOficial:false,sinDato:false}, fuenteVerificada:true, link:"#",
  },
  bravery_light: {
    marca:"Bravery", marcaSlug:"bravery", nombre:"Light Iberian Pork Mini Adult", score:88,
    prot:30, grasa:12, carbs:33.1, ceniza:7.9, fibra:8, humedad:9, calcio:1.6, fosforo:0.95,
    ingredientes:"Carne de cerdo ibérico deshidratada, tapioca, guisantes, grasa de ave, fibra de guisantes, celulosa natural, levadura y extracto de levadura (Saccharomyces cerevisiae), boniato, vaina de algarroba, pulpa de remolacha, aceite de pescado, proteína hidrolizada de cerdo, proteína de patata, inulina, minerales, fibra de Plantago ovata, aceites esenciales, hidrolizado de crustáceos, hidrolizado de cartílago, yuca, concentrado de zumo de melón liofilizado.",
    destacados:["cerdo","boniato (carbohidrato de calidad)","omega 3 (ácidos grasos esenciales)"],
    alergenos:"cerdo", ventajas:["Bajo en cenizas","Sin maíz ni subproductos"], desventajas:[],
    estado:"clean", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Cachorro","n","Información insuficiente"],["Adulto","g","Apto"],["Senior","y","Podría consumir"]], raza:"n",
    precio:"$46.000", formatoKilos:7, fuentes:{oficial:true,marca:true,noOficial:false,sinDato:false}, fuenteVerificada:true, imagen:"img/bravery-light-pork.webp", link:"#",
  },
  fit_formula: {
    marca:"Fit Formula", marcaSlug:"fit-formula", nombre:"Perro Adulto", score:43,
    prot:27, grasa:8, carbs:null, ceniza:null, fibra:3, humedad:11, calcio:null, fosforo:null,
    ingredientes:"Maíz, harina de carne y hueso, subproductos de pollo, grasa animal, colorante artificial, saborizante natural, cloruro de potasio, vitaminas, minerales.",
    destacados:[], alergenos:"maíz", ventajas:[], desventajas:["Contiene maíz","Contiene subproductos","Contiene colorante","Contiene harina de carne y hueso sin especificar","Carbohidratos no disponibles"],
    estado:"warn", hidrolizada:false, etapaComercial:"Adulto",
    etapas:[["Cachorro","n","Información insuficiente"],["Adulto","n","Información insuficiente"],["Senior","n","Información insuficiente"]], raza:"n",
    precio:"$24.990", formatoKilos:3, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, link:"#",
  },
  amity: {
    marca:"Amity", marcaSlug:"amity", nombre:"SP Low Grain Iberian Pork Adult", score:93,
    prot:26, grasa:16, carbs:38.6, ceniza:7.9, fibra:2.5, humedad:9, calcio:1.8, fosforo:1.0,
    ingredientes:"Carne de cerdo deshidratada, arroz, grasa de ave, avena, guisantes, pulpa de remolacha, aceite de salmón, levadura de cerveza, proteína hidrolizada de cerdo, cloruro de potasio, minerales quelatados, extracto de yuca schidigera, vitaminas, taurina, romero.",
    destacados:["cerdo","avena (carbohidrato de calidad)","antioxidantes naturales"],
    alergenos:"cerdo", ventajas:["Bajo en cenizas","Sin maíz ni subproductos"], desventajas:[],
    estado:"clean", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Cachorro","n","Información insuficiente"],["Adulto","g","Apto"],["Senior","g","Apto"]], raza:"n",
    precio:"$36.500", formatoKilos:7.5, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, imagen:"img/amity-iberian-pork.webp", link:"#",
  },
  masterdog: {
    marca:"Masterdog", marcaSlug:"masterdog", nombre:"Adulto Carne", score:57,
    prot:21, grasa:9, carbs:null, ceniza:null, fibra:4, humedad:12, calcio:1.8, fosforo:1.2,
    ingredientes:"Maíz, harina de carne y hueso, subproductos de pollo, grasa animal, colorante artificial, BHA, BHT, cloruro de potasio, vitaminas, minerales.",
    destacados:[], alergenos:"maíz", ventajas:[], desventajas:["Contiene maíz","Contiene subproductos","Contiene colorante","Contiene BHA","Contiene BHT","Contiene harina de carne y hueso sin especificar","Carbohidratos no disponibles"],
    estado:"warn", hidrolizada:false, etapaComercial:"Adulto",
    etapas:[["Cachorro","n","Información insuficiente"],["Adulto","n","Información insuficiente"],["Senior","n","Información insuficiente"]], raza:"n",
    precio:"$18.990", formatoKilos:8, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, link:"#",
  },
  purina: {
    marca:"Purina", marcaSlug:"purina", nombre:"Pro Plan Adulto Raza Mediana", score:95,
    prot:26, grasa:15, carbs:35.5, ceniza:8.5, fibra:3, humedad:12, calcio:1.6, fosforo:1.3,
    ingredientes:"Maíz, subproductos de pollo, harina de maíz, grasa animal, pollo deshidratado, fibra de trigo, saborizante natural, cloruro de potasio, minerales, vitaminas, BHT (conservante). Hidrolizado a base de subproductos de pollo y/o cerdo.",
    destacados:["pollo","omega 3 (ácidos grasos esenciales)"],
    alergenos:"pollo, trigo, maíz, cerdo", ventajas:["Mejor balance de calcio y fósforo","Contiene ácidos grasos omega 3"], desventajas:["Contiene maíz","Contiene subproductos","Contiene BHT"],
    estado:"warn", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Cachorro","n","Información insuficiente"],["Adulto","g","Apto"],["Senior","y","Podría consumir"]], raza:"n",
    precio:"$45.990", formatoKilos:15, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, imagen:"img/pro-plan-adulto.webp", link:"#",
  },
};

const ETAPA_TIPS = {
  n: "El producto no entrega toda la información necesaria para evaluar esta etapa.",
  g: "El producto es apto para el consumo en esta etapa de vida, dentro del rango nutricional recomendado.",
  y: "Está fuera del rango óptimo, pero dentro de un margen de tolerancia razonable para esta etapa.",
  r: "Está fuera del rango seguro recomendado para esta etapa de vida.",
};
const TIP_HIDRO = "La proteína está fraccionada en partículas más pequeñas, lo que reduce la probabilidad de que desencadene una reacción alérgica. Es una característica buscada en dietas para mascotas con alergias. Si la tuya tiene una alergia diagnosticada, consulta con tu veterinario si este nivel de hidrólisis es el adecuado.";
const TIP_ALERGENOS = "Estos ingredientes son alérgenos comunes reportados en estudios veterinarios. No es una alerta: es información para quienes ya conocen una sensibilidad diagnosticada en su mascota.";
const TIP_CLEAN = "No se detectaron ingredientes cuestionables (maíz, subproductos no especificados, colorantes o conservantes controvertidos) en la lista declarada.";
const TIP_WARN = "Se detectó al menos un ingrediente ambiguo o de menor calidad (maíz, subproductos, colorantes o conservantes controvertidos) en la lista declarada.";
const TIP_RAZA = "Este alimento tiene un nivel de calcio dentro del límite seguro (AAFCO 2016) para el crecimiento de cachorros de raza grande.";

// ===================== Estado =====================
let selected = ['bravery_light', 'amity', 'purina'];
let radarActiveIdx = 0; // qué producto está destacado en el radar + tarjeta carrusel
let pickerTargetIndex = null;

// ===================== Helpers de render =====================
function bar(val, maxv, warn, color){
  if (val === null || val === undefined) return '<div class="bar-track"><div class="bar-fill" style="width:0%;background:#EDE0CC"></div></div>';
  const pct = Math.min(100, Math.round((val / maxv) * 100));
  const style = color ? `width:${pct}%;background:${color}` : `width:${pct}%`;
  return `<div class="bar-track"><div class="bar-fill${(warn && !color) ? ' warn' : ''}" style="${style}"></div></div>`;
}
function fmt(val, suffix){ return (val === null || val === undefined) ? '—' : val + (suffix || ''); }

function scoreTier(score){
  if (score >= 80) return {
    cls: 'score-good',
    tip: '🟢 Puntaje óptimo (80-100 pts): el alimento está bien optimizado según el modelo Mestix, comparado con otros de su categoría.'
  };
  if (score >= 50) return {
    cls: 'score-mid',
    tip: '🟡 Puntaje intermedio (50-79 pts): el alimento cumple lo básico, pero hay margen de mejora en su perfil nutricional comparado con otros de su categoría.'
  };
  return {
    cls: 'score-bad',
    tip: '🔴 Puntaje bajo (0-49 pts): varias variables del alimento están fuera del rango óptimo comparado con otros de su categoría.'
  };
}

// Color fijo por producto — se asigna por PUESTO (1er, 2do, 3er lugar), no por orden de selección
const SERIES_COLORS = ['#F8931D', '#2B6E63', '#782A04']; // naranja · verde azulado · café

// Devuelve las claves ordenadas de mejor a peor puntaje — el orden se usa en TODA la vista
function rankedKeys(keys){
  return [...keys].sort((a, b) => DOGS_DB[b].score - DOGS_DB[a].score);
}

// ============ 1. Header: SOLO título + puntaje + imagen + precio + marca ============
function verifiedIconSVG(){
  return `<svg width="25" height="25" viewBox="0 0 22 22" fill="none">
    <path d="M11 0l2.39 1.7 2.9-.3 1.13 2.7 2.7 1.13-.3 2.9L21.52 11l-1.7 2.39.3 2.9-2.7 1.13-1.13 2.7-2.9-.3L11 22l-2.39-1.7-2.9.3-1.13-2.7-2.7-1.13.3-2.9L.48 11l1.7-2.39-.3-2.9 2.7-1.13L5.71 1.4l2.9.3L11 0z" fill="#2F7A4D"/>
    <path d="M7.2 11.3l2.3 2.3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// Cita de procedencia de TODA la información del producto (no solo el
// precio) — va al final de la sección Precio, una sola vez por producto,
// justo porque el precio es lo último que se muestra en la ficha completa.
// Formato de cita simple y discreto (texto en cursiva), no una insignia
// destacada: es una nota de transparencia, no un dato para comparar.
function renderFuentesCitas(keysRanked, DB){
  const LABELS = { oficial:'sitio web oficial', marca:'entregado directamente por la marca', noOficial:'sitio no oficial', sinDato:'sin dato oficial' };
  const orden = ['marca','oficial','noOficial','sinDato'];
  const lineas = keysRanked.map(k => {
    const p = DB[k];
    const activos = p.fuentes ? orden.filter(key => p.fuentes[key]) : [];
    const texto = activos.length ? activos.map(key => LABELS[key]).join(', ') : 'sin especificar';
    return `<p>${p.nombre} — Fuente de datos: ${texto}.</p>`;
  });
  return `<div class="fuentes-citas">${lineas.join('')}</div>`;
}

function renderHeaderRow(keysRanked){
  const medals = keysRanked.length > 1 ? computeMedals(keysRanked) : [];
  return keysRanked.map((key, idx) => {
    const p = DOGS_DB[key];
    const medal = medals[idx];
    const isWin = medal && medal.cls === 'g1';
    const tier = scoreTier(p.score);
    const seriesColor = SERIES_COLORS[idx % SERIES_COLORS.length];
    const removeHtml = keysRanked.length > 1 ? `<button class="remove-btn" data-key="${key}" title="Quitar de la comparación">✕</button>` : '';
    const medalHtml = medal ? `<span class="medal ${medal.cls}">${medal.label}</span>` : '';
    const costoKg = costoPorKilo(p);
    const verificadoIcon = p.fuenteVerificada
      ? `<span class="verified-icon tt" data-tip="Dato entregado directamente por el fabricante o su sitio oficial — no de una fuente de terceros.">${verifiedIconSVG()}</span>`
      : '';

    return `<div class="chead-col ${isWin ? 'win' : ''}" style="--series-color:${seriesColor}">
      ${removeHtml}
      ${medalHtml}
      <div class="chead-media">
        <img src="${p.imagen || 'img/producto_placeholder.svg'}" alt="${p.nombre}">
        ${p.precio ? `<a href="${p.link}" class="price-badge" target="_blank" rel="noopener sponsored"><span class="price-badge-amount">${p.precio}</span><span class="price-badge-store">Ver tienda →</span></a>` : ''}
      </div>
      <div class="chead-body">
        <a href="categoria.html?marca=${p.marcaSlug}" class="brand-tag">${p.marca}</a>
        <h3>${isWin ? '<span class="crown" title="Ganador">👑</span> ' : ''}${p.nombre}${verificadoIcon}</h3>
        <div class="score-big"><span class="num ${tier.cls} tt" data-tip="${tier.tip}">${p.score}</span><span class="of">/ 100 pts</span></div>
      </div>
    </div>`;
  }).join('');
}

function fmtCLP(n){ return '$' + Math.round(n).toLocaleString('es-CL'); }


function scoreProteina(c){ if(c==null) return 0; const b = c>=30?15:c>=25?13+(c-25)*(2/5):c>=22?10+(c-22):c>=18?4+(c-18)*(6/4):0; return b*(17/15); }
function scoreGrasa(d){ if(d==null) return 0; return d>=16?12:d>=12?10+(d-12)*0.5:d>=9?6+(d-9)*(4/3):d>=7?2+(d-7)*2:0; }
function scoreCarbohidratos(h){ if(h==null) return 0; const b = h<=25?15:h<=40?15-(h-25)*(2/15):h<=50?13-(h-40)*0.5:h<=60?8-(h-50)*0.5:0; return b*(17/15); }
function scoreCeniza(f){ if(f==null) return 0; return f<=7?10:f<=9?10-(f-7):f<=11?8-(f-9)*2:f<=12?4-(f-11)*3:0; }
function scoreFibra(e){ if(e==null) return 0; return e<=3?8:e<=5?8-(e-3):e<=7?6-(e-5)*1.5:e<=9?3-(e-7):0; }
function scoreHumedad(g){ if(g==null) return 0; return g<=12?15:g<14?10:0; }
function scoreCalcio(i){ if(i==null) return 0; if(i>=0.5&&i<=2.5) return 8; if((i>=0.4&&i<0.5)||(i>2.5&&i<=2.7)) return 4; return 0; }
function scoreFosforo(j){ if(j==null) return 0; if(j>=0.4&&j<=1.6) return 8; if((j>=0.3&&j<0.4)||(j>1.6&&j<=1.8)) return 4; return 0; }
function scoreCaP(i,j){ if(!i||!j) return 0; const r=i/j; if(r>=1.2&&r<=1.4) return 5; if(r>=1&&r<=2) return 3; return 0; }

const RADAR_EJES = ['Proteína', 'Grasa', 'Carbohidratos', 'Minerales', 'Fibra', 'Humedad'];
function radarValores(p){
  const minerales = ((scoreCalcio(p.calcio)/8) + (scoreFosforo(p.fosforo)/8) + (scoreCaP(p.calcio,p.fosforo)/5)) / 3 * 100;
  return [
    scoreProteina(p.prot) / 17 * 100,
    scoreGrasa(p.grasa) / 12 * 100,
    scoreCarbohidratos(p.carbs) / 17 * 100,
    minerales,
    scoreFibra(p.fibra) / 8 * 100,
    scoreHumedad(p.humedad) / 15 * 100,
  ];
}


const MEDAL_LABELS = ['🥇 1er lugar', '🥈 2do lugar', '🥉 3er lugar'];




function renderRadar(keysRanked){
  if (keysRanked.length === 0) return '';
  if (radarActiveIdx >= keysRanked.length) radarActiveIdx = 0; // por si la selección cambió y el índice quedó fuera de rango

  const RADAR_COLORS = ['#FFA733', '#2ED9A3', '#FF6F91']; // más vibrantes que SERIES_COLORS — solo para esta sección, sobre fondo negro
  const cx = 260, cy = 250, R = 170;
  const angleFor = i => -Math.PI/2 + i * (Math.PI*2/6);
  const pointAt = (i, pct) => {
    const a = angleFor(i);
    const r = R * (pct/100);
    return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
  };

  // Anillos de la grilla (25/50/75/100%)
  let grid = '';
  [25,50,75,100].forEach(pct => {
    const pts = RADAR_EJES.map((_, i) => pointAt(i, pct).join(',')).join(' ');
    grid += `<polygon points="${pts}" fill="none" stroke="rgba(232,242,251,0.12)" stroke-width="1"/>`;
  });
  // Líneas de eje + etiquetas
  let axes = '';
  RADAR_EJES.forEach((label, i) => {
    const [x,y] = pointAt(i, 100);
    axes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(232,242,251,0.12)" stroke-width="1"/>`;
    const [lx,ly] = pointAt(i, 122);
    axes += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="#E8F2FB" font-family="Nunito Sans" font-size="13.5" font-weight="700">${label}</text>`;
  });

  // Una forma por producto — la activa se dibuja al final (queda arriba) y resaltada; el resto se atenúa
  let shapesDim = '', shapeActive = '';
  const legend = keysRanked.map((k, idx) => {
    const p = DOGS_DB[k];
    const color = RADAR_COLORS[idx % RADAR_COLORS.length];
    const isActive = idx === radarActiveIdx;
    const valores = radarValores(p);
    const pts = valores.map((v, i) => pointAt(i, Math.max(v,2)).join(',')).join(' ');
    const dots = valores.map((v, i) => { const [x,y] = pointAt(i, Math.max(v,2)); return `<circle cx="${x}" cy="${y}" r="${isActive ? 5 : 3}" fill="${color}" fill-opacity="${isActive ? 1 : 0.5}"/>`; }).join('');
    const shapeMarkup = `<polygon points="${pts}" fill="${color}" fill-opacity="${isActive ? 0.22 : 0.05}" stroke="${color}" stroke-opacity="${isActive ? 1 : 0.35}" stroke-width="${isActive ? 3.5 : 1.5}"/>${dots}`;
    if (isActive) shapeActive += shapeMarkup; else shapesDim += shapeMarkup;
    return `<div class="radar-legend-item ${isActive ? 'active' : ''}" data-idx="${idx}">
      <span class="radar-dot" style="background:${color}"></span>
      <div><span class="radar-legend-name">${p.marca}<br>${p.nombre}</span><span class="radar-legend-score" style="color:${color}">${p.score}</span></div>
    </div>`;
  }).join('');

  // OJO: el widget embebible es solo radar + leyenda — a propósito NO
  // incluye la tarjeta del ganador (imagen, precio, link "Ver tienda",
  // carrusel). Esa tarjeta pertenece a la ficha completa dentro de Mestix;
  // el widget solo tiene que despertar interés y mandar tráfico de vuelta
  // vía el link "Ver comparación completa" del pie, no reemplazar la visita.

  return `<section class="fgroup radar"><div class="wrap">
    <div class="embed-brand-row">
      <img src="img/logo_mestix_white.svg" alt="Mestix" class="embed-brand-logo">
    </div>
    <div class="fgroup-label" style="color:#F8931D;">Visión general</div>
    <div class="radar-box radar-box-embed">
      <div class="radar-legend">${legend}</div>
      <svg class="radar-svg" viewBox="0 0 520 500" xmlns="http://www.w3.org/2000/svg">
        ${grid}${axes}${shapesDim}${shapeActive}
      </svg>
    </div>
  </div></section>`;
}


// --- Arranque: lee ?p=key1,key2,key3 de la URL del iframe ---
(function(){
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  const contenedor = document.getElementById('embedRoot');
  const keys = (p ? p.split(',') : []).filter(k => DOGS_DB[k]).slice(0, 3);

  if (keys.length === 0){
    contenedor.innerHTML = '<div class="embed-empty">Elige una comparación en Mestix para generar este widget.</div>';
    return;
  }

  contenedor.innerHTML = renderRadar(keys);
  const irA = (idx) => {
    radarActiveIdx = ((idx % keys.length) + keys.length) % keys.length;
    contenedor.innerHTML = renderRadar(keys);
    wire();
  };
  function wire(){
    contenedor.querySelectorAll('.radar-legend-item').forEach(el => {
      el.addEventListener('click', () => irA(parseInt(el.dataset.idx)));
    });
  }
  wire();

  // Link "Ver comparación completa" apunta siempre a la misma selección
  const fullLink = document.getElementById('embedFullLink');
  if (fullLink) fullLink.href = 'https://mestix.cl/comparador.html?p=' + keys.join(',');
})();
