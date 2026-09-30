/* ==========================================================================
   fuentes.js — fuentes de información consultadas.
   ========================================================================== */
"use strict";

const FUENTES = [
  new Fuente({
    tipo: "gobierno", institucion: "INEGI", anio: 2022,
    titulo: "Aspectos geográficos de Quintana Roo. Compendio 2022",
    url: "https://www.inegi.org.mx/contenidos/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/889463913986.pdf",
    usadaPara: "superficie, clima, temperatura, precipitación, relieve, suelos, geología y vegetación.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "INEGI", anio: 2021,
    titulo: "En Quintana Roo somos 1 857 985 habitantes: Censo de Población y Vivienda 2020",
    url: "https://inegi.org.mx/contenidos/saladeprensa/boletines/2021/EstSociodemo/ResultCenso2020_QRoo.pdf",
    usadaPara: "población del estado.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "CONABIO",
    titulo: "Estudio de Estado: La biodiversidad en Quintana Roo (Riqueza biológica de Quintana Roo. Un análisis para su conservación)",
    url: "https://www.biodiversidad.gob.mx/region/eeb/estudios/ee_quintanaroo",
    usadaPara: "número de especies, especies endémicas y orquídeas.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "CONANP",
    titulo: "Descubre las ANP: Reserva de la Biosfera Caribe Mexicano",
    url: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=26",
    usadaPara: "superficie de la reserva, especies y protección del Sistema Arrecifal Mesoamericano.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "CONANP",
    titulo: "Descubre las ANP: Área de Protección de Flora y Fauna Yum Balam",
    url: "https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=179",
    usadaPara: "ecosistemas y especies de Yum Balam.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "CONANP · Diario Oficial de la Federación", anio: 2015,
    titulo: "Resumen del Programa de Manejo de la Reserva de la Biosfera Sian Ka'an",
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5379437&fecha=23/01/2015",
    usadaPara: "características de Sian Ka'an.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "SEMARNAT · Diario Oficial de la Federación", anio: 2010,
    titulo: "NOM-059-SEMARNAT-2010. Especies nativas de México en riesgo",
    url: "https://dof.gob.mx/nota_detalle_popup.php?codigo=5173091",
    usadaPara: "categorías de riesgo (P, A, Pr) de las especies.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "SEMARNAT",
    titulo: "Reserva de la Biósfera Sian Ka'an, sitio de grandes humedales",
    url: "https://www.gob.mx/semarnat/articulos/reserva-de-la-biosfera-sian-ka-an-sitio-de-grandes-humedales",
    usadaPara: "humedales de Sian Ka'an.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "Cámara de Diputados",
    titulo: "Ley General de Vida Silvestre (artículo 60 TER sobre manglares)",
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGVS.pdf",
    usadaPara: "protección legal del manglar.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "Gobierno de Quintana Roo · IBANQROO",
    titulo: "Quintana Roo fortalece operatividad de Áreas Naturales Protegidas",
    url: "https://cgc.qroo.gob.mx/quintana-roo-fortalece-operatividad-de-areas-naturales-protegidas/",
    usadaPara: "áreas naturales protegidas estatales.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "Gobierno de Quintana Roo",
    titulo: "Comunicado sobre la Ley de residuos y plásticos de un solo uso",
    url: "https://transparenciafocalizada.qroo.gob.mx/sites/default/files/unisitio2021/02/COMUNICADO%20RESIDUOS.pdf",
    usadaPara: "prohibición estatal de plásticos de un solo uso.",
  }),
  new Fuente({
    tipo: "gobierno", institucion: "Servicio Meteorológico Nacional (CONAGUA)", anio: 2024,
    titulo: "Aviso: Beryl tocó tierra como huracán en Quintana Roo",
    url: "https://smn.conagua.gob.mx/files/pdfs/comunicados-de-prensa/Aviso019-24.pdf",
    usadaPara: "huracán Beryl.",
  }),
  new Fuente({
    tipo: "internacional", institucion: "UNESCO",
    titulo: "Sian Ka'an — Lista del Patrimonio Mundial",
    url: "https://whc.unesco.org/en/list/410/",
    usadaPara: "declaratoria de Patrimonio Mundial (1987).",
  }),
  new Fuente({
    tipo: "internacional", institucion: "National Hurricane Center (NOAA)", anio: 2024,
    titulo: "Tropical Cyclone Report: Hurricane Beryl",
    url: "https://www.nhc.noaa.gov/data/tcr/AL022024_Beryl.pdf",
    usadaPara: "trayectoria e intensidad de Beryl.",
  }),
  new Fuente({
    tipo: "academica", institucion: "UNAM · Instituto de Ciencias del Mar y Limnología", anio: 2020,
    titulo: "Nota informativa sobre el síndrome blanco en corales del Caribe mexicano",
    url: "https://www.icmyl.unam.mx/Pdf/Home/2020/Nota.%20Sindromeblanco.F3.pdf",
    usadaPara: "enfermedad de corales (síndrome blanco).",
  }),
  new Fuente({
    tipo: "academica", institucion: "National Geographic en Español · INAH (proyecto Gran Acuífero Maya)", anio: 2018,
    titulo: "México: descubren la cueva inundada más grande del mundo",
    url: "https://www.nationalgeographicla.com/historia/2018/01/mexico-descubren-la-cueva-inundada-mas-grande-del-mundo",
    usadaPara: "conexión Sac Actun–Dos Ojos (347 km).",
  }),
  new Fuente({
    tipo: "prensa", institucion: "Expansión Política", anio: 2022,
    titulo: "Región Jaguar de Tulum es declarada área natural protegida",
    url: "https://politica.expansion.mx/mexico/2022/07/30/region-jaguar-tulum-declarada-area-natural-protegida",
    usadaPara: "decreto del APFF Jaguar (2,249 ha).",
  }),
  new Fuente({
    tipo: "prensa", institucion: "Ruptura 360",
    titulo: "Refuerza Marina acciones para la recolección del sargazo en Quintana Roo",
    url: "https://ruptura360.mx/medioambiente/recoleccion-del-sargazo-quintana-roo/",
    usadaPara: "estrategia de la Secretaría de Marina contra el sargazo.",
  }),
  new Fuente({
    tipo: "prensa", institucion: "Ruptura 360",
    titulo: "Te explicamos todo sobre el Derecho de Saneamiento Ambiental",
    url: "https://ruptura360.mx/medioambiente/derecho-de-saneamiento-ambiental/",
    usadaPara: "cobro municipal por saneamiento ambiental.",
  }),
  new Fuente({
    tipo: "datos", institucion: "INEGI · Marco Geoestadístico",
    titulo: "Límites estatales y municipales usados en el mapa",
    url: "https://www.inegi.org.mx/temas/mg/",
    usadaPara: "geometría del mapa interactivo (vía el paquete de código abierto @webrek/mx-geo).",
  }),
  new Fuente({
    tipo: "datos", institucion: "Natural Earth",
    titulo: "Límites de países (dominio público)",
    url: "https://www.naturalearthdata.com/",
    usadaPara: "silueta de Belice y Guatemala en el mapa.",
  }),
  new Fuente({
    tipo: "datos", institucion: "Wikimedia Commons",
    titulo: "Fotografías con licencias libres (el autor y la licencia de cada foto se muestran abajo)",
    url: "https://commons.wikimedia.org/",
    usadaPara: "fotografías reales cuando hay conexión a internet.",
  }),
];
