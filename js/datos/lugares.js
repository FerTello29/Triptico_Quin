/* ==========================================================================
   lugares.js — puntos del mapa interactivo. Coordenadas aproximadas (grados
   decimales, WGS84) del centro o de un punto representativo de cada lugar.
   Fechas de decreto y superficies: CONANP / Diario Oficial de la Federación.
   ========================================================================== */
"use strict";

const LUGARES = [
  new MapaLugar({
    id: "sian-kaan", nombre: "Reserva de la Biósfera Sian Ka'an", categoria: "biosfera", lat: 19.62, lon: -87.78,
    nivel: "Federal (CONANP)", decreto: "1986 · Patrimonio Mundial UNESCO en 1987", superficie: "528,148 ha",
    descripcion: "Selvas, sabanas inundables, humedales, manglares, lagunas costeras y parte del arrecife. Su nombre maya se traduce como “origen del cielo”.",
    importancia: "Es una de las áreas protegidas más grandes y diversas del Caribe mexicano y un sitio Ramsar de humedales.",
  }),
  new MapaLugar({
    id: "arrecifes-sian-kaan", nombre: "Reserva de la Biósfera Arrecifes de Sian Ka'an", categoria: "biosfera", lat: 19.30, lon: -87.40,
    nivel: "Federal (CONANP)", decreto: "1998", superficie: "34,927 ha",
    descripcion: "Franja marina frente a Sian Ka'an con arrecifes, pastos marinos y bahías.",
    importancia: "Complementa a Sian Ka'an: protege la parte marina que conecta la costa con el arrecife.",
  }),
  new MapaLugar({
    id: "caribe-mexicano", nombre: "Reserva de la Biósfera Caribe Mexicano", categoria: "biosfera", lat: 20.02, lon: -87.08,
    nivel: "Federal (CONANP)", decreto: "2016", superficie: "más de 5.7 millones de ha (sobre todo marinas)",
    descripcion: "Protege el mar frente a casi toda la costa del estado, incluida la parte mexicana del Sistema Arrecifal Mesoamericano.",
    importancia: "Cuida arrecifes, manglares y aguas donde viven tiburones, tortugas y manatíes.",
  }),
  new MapaLugar({
    id: "banco-chinchorro", nombre: "Reserva de la Biósfera Banco Chinchorro", categoria: "biosfera", lat: 18.58, lon: -87.33,
    nivel: "Federal (CONANP)", decreto: "1996", superficie: "144,360 ha",
    descripcion: "Gran complejo arrecifal en mar abierto frente a Mahahual, con cayos y restos de naufragios.",
    importancia: "Sus arrecifes son refugio y zona de reproducción de langosta, caracol y peces.",
  }),
  new MapaLugar({
    id: "tiburon-ballena", nombre: "Reserva de la Biósfera Tiburón Ballena", categoria: "biosfera", lat: 21.63, lon: -87.08,
    nivel: "Federal (CONANP)", decreto: "2009", superficie: "145,988 ha",
    descripcion: "Zona marina al norte de Holbox y Cabo Catoche donde el tiburón ballena se agrupa para alimentarse en verano.",
    importancia: "Protege la zona de alimentación del pez más grande del mundo.",
  }),
  new MapaLugar({
    id: "yum-balam", nombre: "Área de Protección de Flora y Fauna Yum Balam", categoria: "manglar", lat: 21.38, lon: -87.32,
    nivel: "Federal (CONANP)", decreto: "1994", superficie: "154,052 ha",
    descripcion: "Selvas, manglares, dunas y la laguna Conil (Yalahau), con la isla Holbox.",
    importancia: "Refugio de aves acuáticas, felinos como el ocelote y zona cercana al tiburón ballena.",
  }),
  new MapaLugar({
    id: "isla-contoy", nombre: "Parque Nacional Isla Contoy", categoria: "anp", lat: 21.49, lon: -86.79,
    nivel: "Federal (CONANP)", decreto: "1998", superficie: "5,126 ha",
    descripcion: "Isla pequeña con dunas, manglares y lagunas interiores; recibe un número limitado de visitantes al día.",
    importancia: "Es un sitio muy importante de anidación de aves marinas.",
  }),
  new MapaLugar({
    id: "isla-mujeres", nombre: "PN Costa Occidental de Isla Mujeres, Punta Cancún y Punta Nizuc", categoria: "arrecife", lat: 21.18, lon: -86.72,
    nivel: "Federal (CONANP)", decreto: "1996",
    descripcion: "Arrecifes frente a Cancún e Isla Mujeres; aquí está el Museo Subacuático de Arte (MUSA).",
    importancia: "Las esculturas sumergidas atraen a buzos y reducen la presión sobre los arrecifes naturales.",
  }),
  new MapaLugar({
    id: "nichupte", nombre: "APFF Manglares de Nichupté", categoria: "manglar", lat: 21.08, lon: -86.82,
    nivel: "Federal (CONANP)", decreto: "2008", superficie: "4,257 ha",
    descripcion: "Manglares del sistema lagunar Nichupté, en medio de la zona urbana y hotelera de Cancún.",
    importancia: "Filtran el agua de la laguna, protegen de tormentas y son hábitat de cocodrilos y aves.",
  }),
  new MapaLugar({
    id: "puerto-morelos", nombre: "Parque Nacional Arrecife de Puerto Morelos", categoria: "arrecife", lat: 20.86, lon: -86.84,
    nivel: "Federal (CONANP)", decreto: "1998", superficie: "9,067 ha",
    descripcion: "Arrecife cercano a la costa con praderas de pastos marinos.",
    importancia: "Muy estudiado por científicos; sitio de observación y restauración de corales.",
  }),
  new MapaLugar({
    id: "ruta-cenotes", nombre: "Ruta de los Cenotes (Puerto Morelos)", categoria: "cenote", lat: 20.85, lon: -87.03,
    descripcion: "Camino tierra adentro con varios cenotes abiertos y en caverna.",
    importancia: "Muestra cómo el acuífero está conectado bajo la selva del norte del estado.",
  }),
  new MapaLugar({
    id: "cozumel-arrecifes", nombre: "Parque Nacional Arrecifes de Cozumel", categoria: "arrecife", lat: 20.33, lon: -87.03,
    nivel: "Federal (CONANP)", decreto: "1996",
    descripcion: "Arrecifes del suroeste de Cozumel, famosos en el mundo para el buceo.",
    importancia: "Tienen gran diversidad de corales y peces; sufren presión por el turismo y los cruceros.",
  }),
  new MapaLugar({
    id: "cozumel-apff", nombre: "APFF Isla Cozumel (porción norte y franja costera oriental)", categoria: "anp", lat: 20.56, lon: -86.86,
    nivel: "Federal (CONANP)", decreto: "2012", superficie: "37,829 ha",
    descripcion: "Selvas, manglares y humedales del norte de Cozumel y la costa este de la isla.",
    importancia: "Hábitat de especies que solo viven en Cozumel, como el mapache de Cozumel.",
  }),
  new MapaLugar({
    id: "sac-actun", nombre: "Sistema Sac Actun y Dos Ojos", categoria: "cenote", lat: 20.33, lon: -87.40,
    descripcion: "Sistema de cuevas inundadas cerca de Tulum. En 2018 se confirmó su conexión con Dos Ojos: 347 km explorados.",
    importancia: "Es el sistema de cuevas inundadas más largo conocido y guarda restos arqueológicos y de fauna antigua.",
  }),
  new MapaLugar({
    id: "tulum", nombre: "Parque Nacional Tulum y APFF Jaguar", categoria: "anp", lat: 20.20, lon: -87.47,
    nivel: "Federal (CONANP)", decreto: "1981 (parque nacional) y 2022 (Área de Protección de Flora y Fauna Jaguar, 2,249 ha)",
    descripcion: "Zona arqueológica frente al mar, selva y playas de anidación de tortugas.",
    importancia: "El área Jaguar busca mantener corredores de selva para el jaguar y proteger el acuífero.",
  }),
  new MapaLugar({
    id: "otoch-maax", nombre: "APFF Otoch Ma'ax Yetel Kooh (Punta Laguna)", categoria: "anp", lat: 20.64, lon: -87.64,
    nivel: "Federal (CONANP)", decreto: "2002", superficie: "5,367 ha",
    descripcion: "Selva y lagunas administradas junto con la comunidad maya de Punta Laguna. Su nombre significa “casa del mono araña y del puma”.",
    importancia: "Es uno de los mejores lugares para observar al mono araña en libertad.",
  }),
  new MapaLugar({
    id: "uaymil", nombre: "APFF Uaymil", categoria: "anp", lat: 18.95, lon: -87.82,
    nivel: "Federal (CONANP)", decreto: "1994", superficie: "89,118 ha",
    descripcion: "Selvas, humedales y lagunas costeras al sur de Sian Ka'an.",
    importancia: "Conecta Sian Ka'an con los ecosistemas del sur y la Bahía de Chetumal.",
  }),
  new MapaLugar({
    id: "bacalar", nombre: "Laguna de Bacalar y Cenote Azul", categoria: "laguna", lat: 18.69, lon: -88.39,
    nivel: "Estatal (Parque Ecológico de Bacalar, IBANQROO)",
    descripcion: "Laguna de agua dulce con muchos tonos de azul, conectada con cenotes como el Cenote Azul.",
    importancia: "Tiene estromatolitos, estructuras formadas por microorganismos que están entre las formas de vida más antiguas.",
  }),
  new MapaLugar({
    id: "bahia-chetumal", nombre: "Santuario del Manatí – Bahía de Chetumal", categoria: "laguna", lat: 18.62, lon: -88.14,
    nivel: "Estatal (IBANQROO)",
    descripcion: "Bahía rodeada de manglares, frente a la capital del estado.",
    importancia: "Es hábitat del manatí del Caribe, especie en peligro de extinción.",
  }),
  new MapaLugar({
    id: "xcalak", nombre: "Parque Nacional Arrecifes de Xcalak", categoria: "arrecife", lat: 18.27, lon: -87.82,
    nivel: "Federal (CONANP)", decreto: "2000", superficie: "17,949 ha",
    descripcion: "Arrecife, manglares y lagunas en el extremo sur de la costa del estado.",
    importancia: "Zona de pesca tradicional y de observación de fauna marina.",
  }),
];
