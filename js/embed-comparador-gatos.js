// ============================================================
// MESTIX — Widget embebible del comparador (gatos)
// Reutiliza exactamente la misma base de datos y lógica de cálculo del
// radar que comparador-gatos.html (7 ejes, incluye Taurina) — no hay una
// segunda fuente de verdad, solo una presentación recortada (sin
// header/nav/footer/publicidad) pensada para vivir dentro de un <iframe>
// en sitios de terceros.
// ============================================================

const CATS_DB = {
  leonardo_salmon: {
    marca:"Leonardo", marcaSlug:"leonardo", nombre:"Fresh Salmón", score:100,
    prot:40, grasa:22, carbs:18, ceniza:7.5, fibra:2.5, humedad:10, calcio:1.3, fosforo:1.1, taurina:1.4,
    ingredientes:"Salmón fresco (43%); carne de ave fresca (42%); harina de guisantes; amaranto; zooplancton marino molido (krill, 1,7%); huevo secado; harina de pescado de agua salada, secado, hidrolizado; hígado de ave hidrolizada; semillas de chía; levadura de cerveza secada; vainas de algarroba; orujo de manzana; verduras secadas; algas secas; fosfato dicálcico; cloruro de potasio; bayas silvestres; arándanos; hierbas secadas; extracto de aceituna.",
    destacados:["salmón","hígado","huevo"],
    alergenos:"huevo, pescado", ventajas:["Alta proteína","Bajo en carbohidratos","Bajo en cenizas","Alta taurina declarada","Mayor contenido de humedad","Sin subproductos","Sin maíz","Sin colorantes artificiales"], desventajas:[],
    estado:"clean", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Gatito / Gestación-Lactancia","g","Apto"],["Adulto","g","Apto"],["Senior","g","Apto"]], castrado:"y",
    precio:"$28.990", formatoKilos:1.5, fuentes:{oficial:true,marca:true,noOficial:false,sinDato:false}, fuenteVerificada:true, link:"#",
  },
  nutrience_salmon: {
    marca:"Nutrience", marcaSlug:"nutrience", nombre:"Grain Free Salmon, Nuez", score:96,
    prot:40, grasa:18, carbs:21, ceniza:7.5, fibra:3.5, humedad:10, calcio:1.1, fosforo:0.9, taurina:"MENTION",
    ingredientes:"Pavo deshuesado, harina de pollo, harina de pavo, arvejas verdes, batatas, lentejas, tapioca, grasa de pollo, pollo deshuesado, arenque deshuesado, huevos enteros, alfalfa curada al sol, hígado de pollo, aceite de salmón, aceite de coco, calabaza, zanahorias, espinaca, brócoli, manzanas, peras, arándanos, granada, vitaminas, minerales, taurina, glucosamina, condroitina, L-carnitina, probióticos.",
    destacados:["salmón","pollo","pavo","hígado","huevo","arenque","boniato (carbohidrato de calidad)","glucosamina (soporte articular)","condroitina (soporte articular)","L-carnitina (metabolismo de grasas)","antioxidantes naturales"],
    alergenos:"pollo, huevo, pescado", ventajas:["Alta proteína","Bajo en cenizas","Mayor contenido de humedad","Sin subproductos","Sin maíz","Sin colorantes artificiales"], desventajas:[],
    estado:"clean", hidrolizada:false, etapaComercial:"Adulto",
    etapas:[["Gatito / Gestación-Lactancia","g","Apto"],["Adulto","g","Apto"],["Senior","g","Apto"]], castrado:"g",
    precio:"$55.000", formatoKilos:5, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, imagen:"img/nutrience-grain-free-salmon.webp", link:"#",
  },
  bravery_kitten: {
    marca:"Bravery", marcaSlug:"bravery", nombre:"Chicken Kitten", score:92,
    prot:38, grasa:18, carbs:26.3, ceniza:7.8, fibra:1.9, humedad:8, calcio:1.3, fosforo:1.1, taurina:0.2,
    ingredientes:"Carne de pollo deshidratada, tapioca, grasa de ave, proteína hidrolizada de pollo, guisantes, levadura, extracto de levadura Saccharomyces cerevisiae, hígado de pollo hidrolizado, aceite de pescado, vaina de algarroba, huevo entero deshidratado, proteína de patata, boniato, pulpa de remolacha, inulina, celulosa natural, minerales, fibra de Plantago ovata, aceites esenciales, hidrolizado de crustáceos, hidrolizado de cartílago, yuca, concentrado de zumo de melón liofilizado.",
    destacados:["pollo","hígado","huevo","boniato (carbohidrato de calidad)","omega 3 (ácidos grasos esenciales)","antioxidantes naturales"],
    alergenos:"pollo, huevo", ventajas:["Bajo en cenizas","Alta taurina declarada","Sin subproductos","Sin maíz","Sin colorantes artificiales","Contiene ácidos grasos omega 3"], desventajas:[],
    estado:"clean", hidrolizada:true, etapaComercial:"Gatito",
    etapas:[["Gatito / Gestación-Lactancia","g","Apto"],["Adulto","g","Apto"],["Senior","g","Apto"]], castrado:"g",
    precio:"$54.990", formatoKilos:7, fuentes:{oficial:true,marca:true,noOficial:false,sinDato:false}, fuenteVerificada:true, imagen:"img/bravery-kitten-chicken.webp", link:"#",
  },
  purina_gatitos: {
    marca:"Purina", marcaSlug:"purina", nombre:"Cat Chow Gatitos", score:81,
    prot:36, grasa:12, carbs:27.5, ceniza:9.5, fibra:3, humedad:12, calcio:1.6, fosforo:1.5, taurina:"MENTION",
    ingredientes:"Maíz, harina de soya, harina de carne y hueso de cerdo, harina de subproductos de pollo, gluten de maíz, aceite de pollo, harina de plumas de pollo, hidrolizado de hígado de pollo y/o cerdo, harina de pescado, ácido fosfórico, colorante natural caramelo, inulina, suplementos vitamínicos, taurina, trigo, harina de algas, colorante natural rojo carmín, leche en polvo bovina, levadura de cerveza, L-lisina, carbonato de calcio.",
    destacados:["salmón","pollo","pavo","hígado","cerdo"],
    alergenos:"pollo, trigo, lácteos, soya, maíz, cerdo, pescado", ventajas:[], desventajas:["Contiene maíz","Contiene subproductos","Contiene colorantes","Contiene grasa animal no especificada","Contiene harina de carne y hueso sin especificar","Contiene colorante caramelo"],
    estado:"warn", hidrolizada:true, etapaComercial:"Gatito",
    etapas:[["Gatito / Gestación-Lactancia","g","Apto"],["Adulto","g","Apto"],["Senior","g","Apto"]], castrado:"n",
    precio:"$31.490", formatoKilos:8, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, link:"#",
  },
  acana_senior: {
    marca:"Acana", marcaSlug:"acana", nombre:"Indoor Entrée para Gatos Senior", score:79,
    prot:33, grasa:14, carbs:29, ceniza:10, fibra:4, humedad:10, calcio:1.8, fosforo:1.2, taurina:0.1,
    ingredientes:"Pollo, harina de pollo, harina de pavo, grano de avena, chícharos enteros, lentejas verdes enteras, garbanzos enteros, grasa de pollo, huevos, pavo, fibra de lenteja, aceite de pescado, pato, hígado de pollo, corazón de pollo, arándanos enteros, alga marina deshidratada, taurina, L-carnitina, extracto de romero, probióticos.",
    destacados:["pollo","pavo","hígado","corazón","huevo","pato","avena (carbohidrato de calidad)","omega 3 (ácidos grasos esenciales)","L-carnitina (metabolismo de grasas)","antioxidantes naturales"],
    alergenos:"pollo, huevo", ventajas:["Mayor contenido de humedad","Sin subproductos","Sin maíz","Sin colorantes artificiales","Contiene ácidos grasos omega 3"], desventajas:[],
    estado:"clean", hidrolizada:false, etapaComercial:"Senior",
    etapas:[["Gatito / Gestación-Lactancia","g","Apto"],["Adulto","g","Apto"],["Senior","g","Apto"]], castrado:"g",
    precio:"$23.990", formatoKilos:1.8, fuentes:{oficial:true,marca:false,noOficial:true,sinDato:false}, fuenteVerificada:false, imagen:"img/acana-indoor-entree-senior.webp", link:"#",
  },
  whiskas_adulto: {
    marca:"Whiskas", marcaSlug:"whiskas", nombre:"Gato Adulto Sabor Carne", score:61,
    prot:30, grasa:10, carbs:35.7, ceniza:8.3, fibra:4, humedad:12, calcio:1.4, fosforo:1.4, taurina:0.1,
    ingredientes:"Maíz y/o trigo y/o arroz, harina de subproductos de pollo, gluten de maíz y/o harina de soja, grasa de pollo y/o sebo bovino, harina de carne y hueso bovino, hidrolizado de menudencias, cloruro de sodio, harina de trigo, colorantes (caramelo, rojo ponceau, amarillo ocaso, tartrazina, índigo carmín), taurina, arginina, vitaminas, minerales, prebióticos, antioxidante (BHT/BHA).",
    destacados:["pollo","cerdo","prebióticos"],
    alergenos:"pollo, trigo, soya, maíz, cerdo", ventajas:["Contiene prebióticos y/o probióticos"], desventajas:["Alto en carbohidratos","Contiene maíz","Contiene subproductos","Contiene colorantes","Contiene BHA","Contiene BHT","Contiene harina de carne y hueso sin especificar","Contiene colorante caramelo"],
    estado:"warn", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Gatito / Gestación-Lactancia","g","Apto"],["Adulto","g","Apto"],["Senior","g","Apto"]], castrado:"n",
    precio:"$25.790", formatoKilos:8, fuentes:{oficial:false,marca:false,noOficial:true,sinDato:false}, fuenteVerificada:false, link:"#",
  },
  whiskas_castrado: {
    marca:"Whiskas", marcaSlug:"whiskas", nombre:"Gato Adulto Castrado Mix Carne", score:47,
    prot:32, grasa:null, carbs:null, ceniza:null, fibra:5, humedad:12, calcio:1.5, fosforo:1.4, taurina:"MENTION",
    ingredientes:"Maíz y/o trigo y/o arroz, harina de subproductos de pollo, gluten de maíz y/o harina de soja, grasa de pollo y/o sebo bovino, harina de carne y hueso bovino, hidrolizado de menudencias, pulpa de remolacha, harina de trigo, taurina, metionina, arginina, vitaminas, minerales, prebióticos, antioxidante (BHT/BHA).",
    destacados:["pollo","cerdo"],
    alergenos:"pollo, soya, maíz, cerdo, pescado", ventajas:[], desventajas:["Ceniza no declarada — esto también impide calcular Carbohidratos, ya que depende de ese dato (pierde puntos en ambas variables por esta única omisión)","Contiene maíz","Contiene subproductos","Contiene BHA","Contiene BHT","Contiene harina de carne y hueso sin especificar"],
    estado:"warn", hidrolizada:true, etapaComercial:"Adulto",
    etapas:[["Gatito / Gestación-Lactancia","r","No recomendado"],["Adulto","r","No recomendado"],["Senior","r","No recomendado"]], castrado:"n",
    precio:"$10.890", formatoKilos:3, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, link:"#",
  },
  champion_cat: {
    marca:"Champion Cat", marcaSlug:"champion-cat", nombre:"Adulto Sabor Carne", score:35,
    prot:32, grasa:8, carbs:null, ceniza:null, fibra:2, humedad:12, calcio:null, fosforo:null, taurina:"MENTION",
    ingredientes:"Maíz, harina de subproductos de pollo, gluten de maíz, harina de soya, grasa animal (bovino y/o cerdo y/o pollo), harina de pescado, hidrolizado líquido de subproductos animales, cloruro de potasio, acidificantes, colorantes, levadura hidrolizada, antioxidantes, extracto de yucca schidigera.",
    destacados:[],
    alergenos:"", ventajas:[], desventajas:["Ceniza no declarada — esto también impide calcular Carbohidratos, ya que depende de ese dato (pierde puntos en ambas variables por esta única omisión)","Contiene maíz","Contiene subproductos","Contiene colorantes","Contiene grasa animal no especificada"],
    estado:"warn", hidrolizada:false, etapaComercial:"Adulto",
    etapas:[["Gatito / Gestación-Lactancia","r","No recomendado"],["Adulto","r","No recomendado"],["Senior","r","No recomendado"]], castrado:"n",
    precio:"$23.990", formatoKilos:8, fuentes:{oficial:true,marca:false,noOficial:false,sinDato:false}, fuenteVerificada:false, link:"#",
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
const TIP_CASTRADO_OK = "Magnesio dentro del rango preventivo (≤0,10% en materia seca) asociado a menor riesgo de cristales de estruvita — relevante porque los gatos castrados tienen mayor incidencia de problemas urinarios.";
const TIP_CASTRADO_ALTO = "Magnesio por sobre el umbral preventivo (0,10% MS). Este es un criterio específico y puntual — no evalúa la calidad general del resto del producto.";

// ===================== Estado =====================
let selected = ['bravery_kitten', 'nutrience_salmon', 'acana_senior'];
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
  return [...keys].sort((a, b) => CATS_DB[b].score - CATS_DB[a].score);
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
    const p = CATS_DB[key];
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


function scoreProteina(c){ if(c==null) return 0; return c>=38?28:c>=36?24.6:c>=33?21.3:c>=31?17.9:c>=26?15.7:0; }
function scoreGrasa(d){ if(d==null) return 0; return d>=18?18:d>=16?16:d>=14?14:d>=12?11:d>=9?8:0; }
function scoreCarbohidratos(h){ if(h==null) return 0; return h<=20?20:h<=24?16.7:h<=29?13.3:h<=33?8.9:h<=37?4.4:0; }
function scoreCeniza(f){ if(f==null) return 0; return f<=7?4:f<=7.5?3.5:f<=8.3?3:f<=9.5?2:f<=11?1:0; }
function scoreFibra(e){ if(e==null) return 0; return e<=3?3:e<=4?2.5:e<=5?2:e<=6?1:0; }
function scoreHumedad(g){ if(g==null) return 0; return g<=12?6:g<14?4:0; }
function scoreCalcio(i){ if(i==null) return 0; return i>=0.6?4:0; }
function scoreFosforo(j){ if(j==null) return 0; return j>=0.5?4:0; }
function scoreCaP(i,j){ if(!i||!j) return 0; const r=i/j; return (r>=1&&r<=2)?5:0; }
function scoreTaurina(k){ if(k==null) return 0; if(typeof k === 'number') return k>=0.1?8:0; if(String(k).toUpperCase().trim()==='MENTION') return 8; return 0; }

function subScores(p){
  return {
    'proteína': scoreProteina(p.prot),
    'grasa': scoreGrasa(p.grasa),
    'nivel de carbohidratos': scoreCarbohidratos(p.carbs),
    'nivel de ceniza': scoreCeniza(p.ceniza),
    'nivel de fibra': scoreFibra(p.fibra),
    'humedad': scoreHumedad(p.humedad),
    'calcio': scoreCalcio(p.calcio),
    'fósforo': scoreFosforo(p.fosforo),
    'equilibrio entre calcio y fósforo': scoreCaP(p.calcio, p.fosforo),
    'taurina': scoreTaurina(p.taurina),
  };
}

// ============ Radar de 7 ejes (incluye Taurina, exclusiva de gatos) — normalizado a 0-100% ============

const RADAR_EJES = ['Proteína', 'Grasa', 'Carbohidratos', 'Minerales', 'Fibra', 'Humedad', 'Taurina'];
function radarValores(p){
  const minerales = ((scoreCalcio(p.calcio)/4) + (scoreFosforo(p.fosforo)/4) + (scoreCaP(p.calcio,p.fosforo)/5)) / 3 * 100;
  return [
    scoreProteina(p.prot) / 28 * 100,
    scoreGrasa(p.grasa) / 18 * 100,
    scoreCarbohidratos(p.carbs) / 20 * 100,
    minerales,
    scoreFibra(p.fibra) / 3 * 100,
    scoreHumedad(p.humedad) / 6 * 100,
    scoreTaurina(p.taurina) / 8 * 100,
  ];
}


const MEDAL_LABELS = ['🥇 1er lugar', '🥈 2do lugar', '🥉 3er lugar'];




function renderRadar(keysRanked){
  if (keysRanked.length === 0) return '';
  if (radarActiveIdx >= keysRanked.length) radarActiveIdx = 0; // por si la selección cambió y el índice quedó fuera de rango

  const RADAR_COLORS = ['#FFA733', '#2ED9A3', '#FF6F91']; // más vibrantes que SERIES_COLORS — solo para esta sección, sobre fondo negro
  const cx = 260, cy = 250, R = 170;
  const angleFor = i => -Math.PI/2 + i * (Math.PI*2/RADAR_EJES.length);
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
    const p = CATS_DB[k];
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
  const keys = (p ? p.split(',') : []).filter(k => CATS_DB[k]).slice(0, 3);

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

  const fullLink = document.getElementById('embedFullLink');
  if (fullLink) fullLink.href = 'https://mestix.cl/comparador-gatos.html?p=' + keys.join(',');
})();
