/* ==========================================================================
   preguntas.js — cuestionario "¿Cuánto aprendiste?"
   ========================================================================== */
"use strict";

const PREGUNTAS = [
  new Pregunta({
    tema: "Litosfera",
    enunciado: "¿Qué tipo de roca forma la mayor parte del subsuelo de Quintana Roo?",
    opciones: ["Granito", "Roca caliza", "Basalto volcánico", "Mármol"],
    correcta: 1,
    explicacion: "La península de Yucatán está formada por rocas sedimentarias, sobre todo calizas, que se formaron en el fondo del mar.",
  }),
  new Pregunta({
    tema: "Cenotes",
    enunciado: "¿Cómo se forma un cenote?",
    opciones: [
      "Por la erupción de un volcán",
      "Cuando el agua disuelve la caliza y se derrumba el techo de una cueva",
      "Por el impacto de un meteorito cada vez",
      "Cuando se excava un pozo para sacar agua",
    ],
    correcta: 1,
    explicacion: "El agua de lluvia con CO₂ disuelve la caliza, forma cuevas y, cuando el techo se debilita y colapsa, queda expuesta el agua subterránea.",
  }),
  new Pregunta({
    tema: "Biósfera",
    enunciado: "¿Qué reserva de la biósfera de Quintana Roo es Patrimonio Mundial de la UNESCO desde 1987?",
    opciones: ["Calakmul", "Sian Ka'an", "Montes Azules", "El Vizcaíno"],
    correcta: 1,
    explicacion: "Sian Ka'an se decretó en 1986 y la UNESCO la inscribió como Patrimonio Mundial en 1987. Calakmul está en Campeche.",
  }),
  new Pregunta({
    tema: "Ecosistemas",
    enunciado: "¿De qué gran sistema arrecifal forman parte los arrecifes de Quintana Roo?",
    opciones: ["La Gran Barrera de Coral", "El Sistema Arrecifal Veracruzano", "El Sistema Arrecifal Mesoamericano", "El Arrecife Alacranes"],
    correcta: 2,
    explicacion: "El Sistema Arrecifal Mesoamericano se extiende por más de 1,000 km, desde el norte de Quintana Roo hasta Honduras.",
  }),
  new Pregunta({
    tema: "Ecosistemas",
    enunciado: "¿Por qué son importantes los manglares?",
    opciones: [
      "Porque solo sirven para producir madera",
      "Porque protegen la costa y son guardería de peces y crustáceos",
      "Porque impiden que llueva en la costa",
      "Porque crecen en el desierto",
    ],
    correcta: 1,
    explicacion: "Los manglares frenan el oleaje de las tormentas, atrapan sedimentos, guardan carbono y son refugio de crías de muchas especies.",
  }),
  new Pregunta({
    tema: "Atmósfera",
    enunciado: "¿Qué clima predomina en Quintana Roo según el INEGI?",
    opciones: ["Seco desértico", "Templado con nevadas", "Cálido subhúmedo con lluvias en verano", "Frío de montaña"],
    correcta: 2,
    explicacion: "El 99 % del territorio tiene clima cálido subhúmedo con lluvias en verano; solo en Cozumel hay clima cálido húmedo.",
  }),
  new Pregunta({
    tema: "Hidrosfera",
    enunciado: "¿Por qué casi no hay ríos en la superficie de Quintana Roo?",
    opciones: [
      "Porque nunca llueve",
      "Porque el agua se evapora toda",
      "Porque el agua se infiltra en la roca caliza y corre bajo tierra",
      "Porque los ríos se secaron por la agricultura",
    ],
    correcta: 2,
    explicacion: "La caliza es porosa: la lluvia se filtra rápido y forma ríos subterráneos conectados por cenotes.",
  }),
  new Pregunta({
    tema: "Biodiversidad",
    enunciado: "¿Qué mamífero acuático en peligro de extinción vive en la Bahía de Chetumal?",
    opciones: ["El delfín rosado", "El manatí del Caribe", "La foca monje", "La nutria marina"],
    correcta: 1,
    explicacion: "El manatí del Caribe está en peligro de extinción (NOM-059-SEMARNAT-2010) y la bahía es un santuario estatal para protegerlo.",
  }),
  new Pregunta({
    tema: "Gobierno",
    enunciado: "¿Qué institución federal administra las Áreas Naturales Protegidas federales?",
    opciones: ["INEGI", "CONAGUA", "CONANP", "SEP"],
    correcta: 2,
    explicacion: "La Comisión Nacional de Áreas Naturales Protegidas (CONANP) administra áreas como Sian Ka'an y Caribe Mexicano.",
  }),
  new Pregunta({
    tema: "Ciclos",
    enunciado: "¿Qué gas toman del aire la selva, los manglares y los pastos marinos durante la fotosíntesis?",
    opciones: ["Oxígeno (O₂)", "Dióxido de carbono (CO₂)", "Nitrógeno (N₂)", "Metano (CH₄)"],
    correcta: 1,
    explicacion: "En la fotosíntesis las plantas toman CO₂ y liberan oxígeno; por eso la selva y el manglar ayudan contra el cambio climático.",
  }),
  new Pregunta({
    tema: "Actividades humanas",
    enunciado: "¿Qué puede pasar si llegan muchas aguas residuales al mar?",
    opciones: [
      "El agua se vuelve más clara",
      "Crecen demasiadas algas que compiten con los corales",
      "Aumentan las tortugas",
      "No pasa nada porque el mar es muy grande",
    ],
    correcta: 1,
    explicacion: "El exceso de nutrientes (como nitrógeno) favorece a las algas, que cubren y debilitan a los corales.",
  }),
  new Pregunta({
    tema: "Gobierno",
    enunciado: "¿Qué nivel de gobierno se encarga de recoger la basura de las casas?",
    opciones: ["El federal", "El estatal", "El municipal", "Ninguno"],
    correcta: 2,
    explicacion: "El artículo 115 de la Constitución asigna a los municipios los servicios de limpia, recolección y disposición de residuos.",
  }),
];
