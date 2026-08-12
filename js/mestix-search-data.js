// ============================================================
// MESTIX — Índice de búsqueda del sitio
// ============================================================
// Fuente única de productos (perros + gatos) y artículos del blog para el
// buscador con sugerencias en vivo y la página de resultados. Se carga en
// todas las páginas del sitio (mismo <script> en el <head> o antes de
// cierre de </body>). Si se agregan productos o artículos nuevos al sitio,
// hay que sumarlos acá también — este archivo no se genera solo desde el
// Excel ni desde comparador.html, es una copia deliberadamente simple para
// que el buscador no dependa de cargar toda la lógica del comparador.

window.MESTIX_SEARCH_DATA = {
  "productos": [
    {
      "id": "bravery_chicken",
      "especie": "perro",
      "marca": "Bravery",
      "nombre": "Chicken Adult Large/Medium",
      "score": 93,
      "imagen": null,
      "precio": "$63.000",
      "link": "comparador.html?p=bravery_chicken",
      "catalogUrl": "categoria.html"
    },
    {
      "id": "bravery_light",
      "especie": "perro",
      "marca": "Bravery",
      "nombre": "Light Iberian Pork Mini Adult",
      "score": 88,
      "imagen": "img/bravery-light-pork.webp",
      "precio": "$46.000",
      "link": "comparador.html?p=bravery_light",
      "catalogUrl": "categoria.html"
    },
    {
      "id": "fit_formula",
      "especie": "perro",
      "marca": "Fit Formula",
      "nombre": "Perro Adulto",
      "score": 43,
      "imagen": null,
      "precio": "$24.990",
      "link": "comparador.html?p=fit_formula",
      "catalogUrl": "categoria.html"
    },
    {
      "id": "amity",
      "especie": "perro",
      "marca": "Amity",
      "nombre": "SP Low Grain Iberian Pork Adult",
      "score": 93,
      "imagen": "img/amity-iberian-pork.webp",
      "precio": "$36.500",
      "link": "comparador.html?p=amity",
      "catalogUrl": "categoria.html"
    },
    {
      "id": "masterdog",
      "especie": "perro",
      "marca": "Masterdog",
      "nombre": "Adulto Carne",
      "score": 57,
      "imagen": null,
      "precio": "$18.990",
      "link": "comparador.html?p=masterdog",
      "catalogUrl": "categoria.html"
    },
    {
      "id": "purina",
      "especie": "perro",
      "marca": "Purina",
      "nombre": "Pro Plan Adulto Raza Mediana",
      "score": 95,
      "imagen": "img/pro-plan-adulto.webp",
      "precio": "$45.990",
      "link": "comparador.html?p=purina",
      "catalogUrl": "categoria.html"
    },
    {
      "id": "leonardo_salmon",
      "especie": "gato",
      "marca": "Leonardo",
      "nombre": "Fresh Salmón",
      "score": 100,
      "imagen": null,
      "precio": "$28.990",
      "link": "comparador-gatos.html?p=leonardo_salmon",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "nutrience_salmon",
      "especie": "gato",
      "marca": "Nutrience",
      "nombre": "Grain Free Salmon, Nuez",
      "score": 96,
      "imagen": "img/nutrience-grain-free-salmon.webp",
      "precio": "$55.000",
      "link": "comparador-gatos.html?p=nutrience_salmon",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "bravery_kitten",
      "especie": "gato",
      "marca": "Bravery",
      "nombre": "Chicken Kitten",
      "score": 92,
      "imagen": "img/bravery-kitten-chicken.webp",
      "precio": "$54.990",
      "link": "comparador-gatos.html?p=bravery_kitten",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "purina_gatitos",
      "especie": "gato",
      "marca": "Purina",
      "nombre": "Cat Chow Gatitos",
      "score": 81,
      "imagen": null,
      "precio": "$31.490",
      "link": "comparador-gatos.html?p=purina_gatitos",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "acana_senior",
      "especie": "gato",
      "marca": "Acana",
      "nombre": "Indoor Entrée para Gatos Senior",
      "score": 79,
      "imagen": "img/acana-indoor-entree-senior.webp",
      "precio": "$23.990",
      "link": "comparador-gatos.html?p=acana_senior",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "whiskas_adulto",
      "especie": "gato",
      "marca": "Whiskas",
      "nombre": "Gato Adulto Sabor Carne",
      "score": 61,
      "imagen": null,
      "precio": "$25.790",
      "link": "comparador-gatos.html?p=whiskas_adulto",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "whiskas_castrado",
      "especie": "gato",
      "marca": "Whiskas",
      "nombre": "Gato Adulto Castrado Mix Carne",
      "score": 47,
      "imagen": null,
      "precio": "$10.890",
      "link": "comparador-gatos.html?p=whiskas_castrado",
      "catalogUrl": "categoria-gatos.html"
    },
    {
      "id": "champion_cat",
      "especie": "gato",
      "marca": "Champion Cat",
      "nombre": "Adulto Sabor Carne",
      "score": 35,
      "imagen": null,
      "precio": "$23.990",
      "link": "comparador-gatos.html?p=champion_cat",
      "catalogUrl": "categoria-gatos.html"
    }
  ],
  "articulos": [
    {
      "tag": "Cachorros · Raza grande",
      "titulo": "Por qué el calcio importa más en cachorros de raza grande",
      "excerpt": "AAFCO fija un tope distinto de calcio específicamente para cachorros que llegarán a ser perros grandes.",
      "meta": "12 min de lectura",
      "link": "articulo.html",
      "id": "art1"
    },
    {
      "tag": "Mitos",
      "titulo": "Grain-free no siempre es mejor: lo que dice la evidencia",
      "excerpt": "Avena y arroz integral no son lo mismo que maíz de relleno — la diferencia está en la fuente.",
      "meta": "8 min · Gatos y perros",
      "link": "blog.html",
      "id": "art2"
    },
    {
      "tag": "Alergias",
      "titulo": "Los 5 alérgenos más comunes en la dieta de tu perro",
      "excerpt": "Vacuno, lácteos, pollo, trigo y cordero — según una revisión de 297 casos clínicos confirmados.",
      "meta": "6 min · Perros",
      "link": "blog.html",
      "id": "art3"
    },
    {
      "tag": "Etiquetado",
      "titulo": "Cómo leer una etiqueta de alimento en 2 minutos",
      "excerpt": "El orden de los ingredientes no es casualidad — te mostramos qué mirar primero y qué ignorar.",
      "meta": "5 min · Gatos y perros",
      "link": "blog.html",
      "id": "art4"
    },
    {
      "tag": "Gatos senior",
      "titulo": "¿Existe realmente el \"alimento para gato senior\"?",
      "excerpt": "AAFCO no reconoce esta etapa oficialmente — revisamos qué cambia (y qué no) en las fórmulas senior.",
      "meta": "7 min · Gatos",
      "link": "blog.html",
      "id": "art5"
    },
    {
      "tag": "Proteína hidrolizada",
      "titulo": "Proteína hidrolizada: no es una alerta, es una ventaja",
      "excerpt": "Por qué este ingrediente se usa a propósito en dietas para mascotas con alergias.",
      "meta": "6 min · Gatos y perros",
      "link": "blog.html",
      "id": "art6"
    },
    {
      "tag": "Metodología",
      "titulo": "Cómo calculamos el puntaje Mestix, explicado simple",
      "excerpt": "Sin fórmulas complicadas: qué premiamos, qué no penalizamos, y por qué.",
      "meta": "10 min · Sobre Mestix",
      "link": "blog.html",
      "id": "art7"
    }
  ]
};
