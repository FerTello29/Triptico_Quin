/* ==========================================================================
   especies.js — especies representativas de Quintana Roo.
   Categoría de riesgo: NOM-059-SEMARNAT-2010 (P, A, Pr).
   Cuando se menciona la UICN es la Lista Roja internacional.
   ========================================================================== */
"use strict";

const ESPECIES = [
  new Especie({
    id: "jaguar", nombre: "Jaguar", cientifico: "Panthera onca", reino: "fauna", grupo: "Mamífero", foto: "jaguar",
    descripcion: "El felino más grande de América y el depredador más importante de la selva.",
    habitat: "Selvas de todo el estado, sobre todo en Sian Ka'an y en las grandes selvas del centro y sur.",
    dato: "Al cazar pecaríes, venados y otros animales mantiene el equilibrio de la selva. Para los mayas era símbolo de poder (balam).",
    nom059: "P", otraProteccion: "La CONANP tiene un Programa de Acción para la Conservación de Especies (PACE) para el jaguar.",
  }),
  new Especie({
    id: "manati", nombre: "Manatí del Caribe", cientifico: "Trichechus manatus manatus", reino: "fauna", grupo: "Mamífero marino", foto: "manati",
    descripcion: "Mamífero acuático herbívoro, lento y pacífico, que vive en bahías, lagunas y ríos.",
    habitat: "Bahía de Chetumal, Río Hondo, lagunas costeras y cenotes conectados al mar.",
    dato: "Pasa gran parte del día comiendo pastos marinos y plantas acuáticas. Los golpes de lanchas son una de sus amenazas.",
    nom059: "P", otraProteccion: "La Bahía de Chetumal es un área protegida estatal: el Santuario del Manatí.",
  }),
  new Especie({
    id: "tortuga-verde", nombre: "Tortuga verde", cientifico: "Chelonia mydas", reino: "fauna", grupo: "Reptil marino", foto: "tortuga-verde",
    descripcion: "Tortuga marina que anida en las playas del estado y se alimenta en praderas de pastos marinos.",
    habitat: "Playas de anidación (Xcacel, Akumal, Sian Ka'an) y bahías con pastos marinos.",
    dato: "Los adultos son herbívoros. Las hembras regresan a anidar a la región donde nacieron.",
    nom059: "P", otraProteccion: "En México hay veda total para todas las especies de tortuga marina desde 1990.",
  }),
  new Especie({
    id: "flamenco", nombre: "Flamenco americano", cientifico: "Phoenicopterus ruber", reino: "fauna", grupo: "Ave", foto: "flamenco",
    descripcion: "Ave rosada de patas largas que filtra su alimento del fondo de lagunas salobres.",
    habitat: "Lagunas costeras del norte del estado, como las de Yum Balam y Holbox.",
    dato: "Su color rosado viene de los pigmentos (carotenoides) de los pequeños crustáceos y algas que come.",
    nom059: "A",
  }),
  new Especie({
    id: "tiburon-ballena", nombre: "Tiburón ballena", cientifico: "Rhincodon typus", reino: "fauna", grupo: "Pez", foto: "tiburon-ballena",
    descripcion: "El pez más grande del mundo; es inofensivo y se alimenta de plancton.",
    habitat: "Aguas del norte del estado (Holbox, Isla Contoy, Isla Mujeres), donde se agrupa en verano.",
    dato: "Filtra enormes cantidades de agua para atrapar plancton y huevos de peces.",
    nom059: "A", otraProteccion: "Su zona de alimentación está protegida por la Reserva de la Biósfera Tiburón Ballena (2009). La UICN lo considera en peligro.",
  }),
  new Especie({
    id: "mono-arana", nombre: "Mono araña", cientifico: "Ateles geoffroyi", reino: "fauna", grupo: "Mamífero", foto: "mono-arana",
    descripcion: "Primate de brazos largos que vive en las copas de los árboles.",
    habitat: "Selvas medianas; se observa en el área protegida Otoch Ma'ax Yetel Kooh (Punta Laguna).",
    dato: "Usa su cola como una quinta mano. Al comer frutos y dispersar semillas ayuda a que la selva se regenere.",
    nom059: "P",
  }),
  new Especie({
    id: "pavo-ocelado", nombre: "Pavo ocelado", cientifico: "Meleagris ocellata", reino: "fauna", grupo: "Ave", foto: "pavo-ocelado",
    descripcion: "Guajolote silvestre de plumas iridiscentes con manchas en forma de ojo.",
    habitat: "Selvas y bordes de selva de la península.",
    dato: "Su cabeza azul tiene verrugas anaranjadas; sus ocelos (manchas como ojos) son azul y bronce.",
    nom059: "A", endemica: "región de la península de Yucatán (México, Belice y Guatemala)",
  }),
  new Especie({
    id: "cocodrilo", nombre: "Cocodrilo de pantano", cientifico: "Crocodylus moreletii", reino: "fauna", grupo: "Reptil", foto: "cocodrilo",
    descripcion: "Cocodrilo de agua dulce que habita humedales, lagunas y cenotes.",
    habitat: "Humedales, lagunas interiores, aguadas y cenotes de todo el estado.",
    dato: "Estuvo muy amenazado por la cacería para aprovechar su piel; gracias a su protección sus poblaciones se han recuperado.",
    nom059: "Pr",
  }),
  new Especie({
    id: "tucan", nombre: "Tucán pico canoa", cientifico: "Ramphastos sulfuratus", reino: "fauna", grupo: "Ave", foto: "tucan",
    descripcion: "Ave de pico enorme y colorido que se alimenta principalmente de frutos.",
    habitat: "Selvas medianas del centro y sur del estado.",
    dato: "Su pico es muy ligero porque por dentro tiene una estructura como de esponja. Dispersa semillas de muchos árboles.",
    nom059: "A",
  }),
  new Especie({
    id: "mapache-cozumel", nombre: "Mapache de Cozumel", cientifico: "Procyon pygmaeus", reino: "fauna", grupo: "Mamífero", foto: "mapache-cozumel",
    descripcion: "Mapache pequeño que solo existe en la isla de Cozumel.",
    habitat: "Principalmente manglares y humedales de Cozumel.",
    dato: "Es más pequeño que el mapache común. Al vivir solo en una isla, cualquier cambio en su hábitat lo pone en riesgo.",
    nom059: "P", endemica: "isla de Cozumel", otraProteccion: "La UICN lo considera en peligro crítico.",
  }),
  new Especie({
    id: "loro-yucateco", nombre: "Loro yucateco", cientifico: "Amazona xantholora", reino: "fauna", grupo: "Ave", foto: "loro-yucateco",
    descripcion: "Loro verde con la frente blanca y una mancha amarilla frente al ojo.",
    habitat: "Selvas bajas y medianas de la península.",
    dato: "Su nombre científico significa “de loras amarillas”, por la zona amarilla entre el pico y el ojo. Capturarlo para venderlo como mascota es ilegal.",
    nom059: "A", endemica: "región de la península de Yucatán",
  }),
  new Especie({
    id: "coral-cuerno-alce", nombre: "Coral cuerno de alce", cientifico: "Acropora palmata", reino: "fauna", grupo: "Coral", foto: "coral-cuerno-alce",
    descripcion: "Coral de ramas anchas y planas que construye la parte del arrecife que rompe las olas.",
    habitat: "Zonas poco profundas y con oleaje de los arrecifes del estado.",
    dato: "Aunque parece planta o roca, es una colonia de animales. Es muy sensible al calentamiento del mar y a las enfermedades.",
    nom059: "Pr", otraProteccion: "La UICN lo considera en peligro crítico.",
  }),
  new Especie({
    id: "ceiba", nombre: "Ceiba", cientifico: "Ceiba pentandra", reino: "flora", grupo: "Árbol", foto: "ceiba",
    descripcion: "Árbol gigante de tronco recto y copa en forma de sombrilla.",
    habitat: "Selvas medianas, cerca de cenotes y en plazas de los pueblos.",
    dato: "Para los mayas es el yaxché, el árbol sagrado que une el inframundo, la tierra y el cielo.",
  }),
  new Especie({
    id: "chicozapote", nombre: "Chicozapote", cientifico: "Manilkara zapota", reino: "flora", grupo: "Árbol", foto: "chicozapote",
    descripcion: "Árbol de la selva que da frutos dulces y del que se obtiene el chicle natural.",
    habitat: "Selvas medianas de todo el estado.",
    dato: "Los chicleros hacen cortes en zigzag en el tronco para recoger su látex, el chicle. Es un ejemplo de aprovechamiento de la selva sin talarla.",
  }),
  new Especie({
    id: "mangle-rojo", nombre: "Mangle rojo", cientifico: "Rhizophora mangle", reino: "flora", grupo: "Árbol", foto: "mangle-rojo",
    descripcion: "Mangle de raíces en forma de zancos que crece en la orilla del agua.",
    habitat: "Orillas de lagunas costeras, bahías y cayos.",
    dato: "Sus semillas germinan en el árbol (propágulos) y caen al agua listas para echar raíz.",
    nom059: "A",
  }),
  new Especie({
    id: "palma-chit", nombre: "Palma chit", cientifico: "Thrinax radiata", reino: "flora", grupo: "Palma", foto: "palma-chit",
    descripcion: "Palma delgada de hojas en abanico, típica de la costa.",
    habitat: "Dunas costeras y selvas cercanas al mar.",
    dato: "Sus hojas y troncos se usan tradicionalmente para techos y construcciones; por eso su aprovechamiento debe estar regulado.",
    nom059: "A",
  }),
  new Especie({
    id: "caoba", nombre: "Caoba", cientifico: "Swietenia macrophylla", reino: "flora", grupo: "Árbol", foto: "caoba",
    descripcion: "Árbol alto de madera rojiza muy valiosa.",
    habitat: "Selvas medianas del centro y sur del estado.",
    dato: "En Quintana Roo hay ejidos que aprovechan su madera con planes de manejo forestal para no agotarla.",
    otraProteccion: "Está en el Apéndice II de la CITES: su comercio internacional está regulado.",
  }),
  new Especie({
    id: "orquidea", nombre: "Orquídeas", cientifico: "Familia Orchidaceae", reino: "flora", grupo: "Plantas epífitas y terrestres", foto: null,
    descripcion: "Plantas de flores vistosas que muchas veces crecen sobre los árboles sin dañarlos.",
    habitat: "Ramas de árboles en selvas y manglares.",
    dato: "El estudio Riqueza biológica de Quintana Roo registró 112 especies de orquídeas en el estado.",
    otraProteccion: "Varias especies de orquídeas están protegidas; nunca deben arrancarse de la selva.",
  }),
  new Especie({
    id: "pasto-marino", nombre: "Pasto tortuga", cientifico: "Thalassia testudinum", reino: "flora", grupo: "Planta marina", foto: "pasto-marino",
    descripcion: "Planta con flores que vive bajo el mar y forma praderas frente a las playas.",
    habitat: "Fondos arenosos poco profundos frente a playas y en lagunas costeras.",
    dato: "Las praderas oxigenan el agua, sujetan la arena y alimentan a tortugas verdes y manatíes.",
  }),
];
