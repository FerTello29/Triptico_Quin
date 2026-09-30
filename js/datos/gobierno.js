/* ==========================================================================
   gobierno.js — acciones de gobierno para proteger el ambiente en Quintana
   Roo, separadas por nivel. Solo se incluyen instituciones, leyes y programas
   reales y verificables. Los programas cambian con el tiempo: conviene
   confirmar su estado actual en los sitios oficiales.
   ========================================================================== */
"use strict";

const ACCIONES_GOBIERNO = [
  /* ---------------- FEDERAL ---------------- */
  new AccionGobierno({
    nivel: "federal", institucion: "CONANP (Comisión Nacional de Áreas Naturales Protegidas)",
    accion: "Administra las Áreas Naturales Protegidas federales",
    detalle: "Sian Ka'an, Caribe Mexicano, Banco Chinchorro, Tiburón Ballena, Yum Balam, Isla Contoy y los parques nacionales marinos, entre otras. Cada una tiene un programa de manejo con reglas de uso, vigilancia y monitoreo biológico.",
    temas: ["Áreas protegidas", "Arrecifes", "Manglares"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "CONANP · Gobierno de México",
    accion: "Protección de especies prioritarias",
    detalle: "Los Programas de Acción para la Conservación de Especies (PACE) atienden especies como el jaguar, las tortugas marinas y el manatí. Además, desde 1990 hay veda total de tortugas marinas: está prohibido capturarlas o aprovechar sus huevos, carne o caparazón.",
    temas: ["Protección de especies"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "SEMARNAT (Secretaría de Medio Ambiente y Recursos Naturales)",
    accion: "Normas oficiales y evaluación de impacto ambiental",
    detalle: "La NOM-059-SEMARNAT-2010 enlista las especies en riesgo; la NOM-022-SEMARNAT-2003 protege los humedales costeros con manglar. Las obras deben presentar una Manifestación de Impacto Ambiental (MIA) según la LGEEPA.",
    temas: ["Regulación ambiental", "Protección de especies", "Manglares"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "Congreso de la Unión · Ley General de Vida Silvestre",
    accion: "Prohibición de dañar el manglar (artículo 60 TER)",
    detalle: "Prohíbe remover, rellenar o afectar el manglar y el flujo de agua que lo mantiene vivo.",
    temas: ["Manglares", "Regulación ambiental"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "PROFEPA (Procuraduría Federal de Protección al Ambiente)",
    accion: "Inspección y vigilancia",
    detalle: "Revisa que se cumplan las leyes ambientales federales: puede clausurar obras sin permiso en manglares o zona costera y realiza operativos durante la anidación de tortugas.",
    temas: ["Regulación ambiental", "Protección de recursos"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "CONAFOR (Comisión Nacional Forestal)",
    accion: "Reforestación, manejo del fuego y pago por servicios ambientales",
    detalle: "Apoya la reforestación, la prevención y el combate de incendios forestales y paga a dueños de selvas por conservarlas.",
    temas: ["Reforestación", "Protección de recursos"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "CONAGUA (Comisión Nacional del Agua)",
    accion: "Administración del acuífero",
    detalle: "Otorga permisos para extraer agua y para descargar aguas residuales, y mide la disponibilidad del acuífero de la península.",
    temas: ["Protección de recursos", "Agua"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "SEMAR (Secretaría de Marina)",
    accion: "Estrategia de atención al sargazo",
    detalle: "Desde 2019 coordina barreras de contención, buques sargaceros y embarcaciones para recoger sargazo en el mar antes de que llegue a la playa, junto con el estado y los municipios.",
    temas: ["Playas", "Residuos"],
  }),
  new AccionGobierno({
    nivel: "federal", institucion: "CONABIO (Comisión Nacional para el Conocimiento y Uso de la Biodiversidad)",
    accion: "Conocimiento y monitoreo de la biodiversidad",
    detalle: "Coordinó el estudio Riqueza biológica de Quintana Roo, opera el Sistema de Monitoreo de los Manglares de México y la plataforma ciudadana Naturalista.",
    temas: ["Educación ambiental", "Manglares"],
  }),

  /* ---------------- ESTATAL ---------------- */
  new AccionGobierno({
    nivel: "estatal", institucion: "SEMA (Secretaría de Ecología y Medio Ambiente de Quintana Roo)",
    accion: "Política ambiental del estado y ordenamiento ecológico",
    detalle: "Diseña la política ambiental estatal, coordina los programas de ordenamiento ecológico que indican qué se puede hacer en cada zona y evalúa el impacto ambiental de obras de competencia estatal.",
    temas: ["Regulación ambiental"],
  }),
  new AccionGobierno({
    nivel: "estatal", institucion: "IBANQROO (Instituto de Biodiversidad y Áreas Naturales Protegidas)",
    accion: "Administra las Áreas Naturales Protegidas estatales",
    detalle: "Entre ellas el Santuario de la Tortuga Marina Xcacel-Xcacelito, Laguna Manatí, el Sistema Lagunar Chacmochuch, el Santuario del Manatí (Bahía de Chetumal) y el Parque Ecológico de Bacalar.",
    temas: ["Áreas protegidas", "Protección de especies"],
  }),
  new AccionGobierno({
    nivel: "estatal", institucion: "Congreso del Estado · PPA (Procuraduría de Protección al Ambiente)",
    accion: "Ley de residuos que prohíbe plásticos de un solo uso",
    detalle: "La Ley para la Prevención, Gestión Integral y Economía Circular de los Residuos del Estado (2019) prohíbe entregar bolsas, popotes y recipientes de unicel desechables. La PPA vigila su cumplimiento.",
    temas: ["Residuos", "Regulación ambiental"],
  }),
  new AccionGobierno({
    nivel: "estatal", institucion: "CAPA (Comisión de Agua Potable y Alcantarillado)",
    accion: "Agua potable, drenaje y saneamiento",
    detalle: "Organismo estatal responsable de los servicios de agua potable, alcantarillado y tratamiento de aguas residuales.",
    temas: ["Agua", "Protección de recursos"],
  }),

  /* ---------------- MUNICIPAL ---------------- */
  new AccionGobierno({
    nivel: "municipal", institucion: "Ayuntamientos (artículo 115 de la Constitución)",
    accion: "Limpia, recolección y disposición final de la basura",
    detalle: "Cada municipio recoge los residuos y debe llevarlos a sitios de disposición adecuados, como rellenos sanitarios.",
    temas: ["Residuos"],
  }),
  new AccionGobierno({
    nivel: "municipal", institucion: "Ayuntamientos",
    accion: "Reglamentos de ecología y desarrollo urbano",
    detalle: "Los municipios aprueban reglamentos ambientales, programas de desarrollo urbano y ordenamientos ecológicos locales que definen dónde y cómo se puede construir.",
    temas: ["Regulación ambiental"],
  }),
  new AccionGobierno({
    nivel: "municipal", institucion: "Municipios turísticos",
    accion: "Derecho de Saneamiento Ambiental",
    detalle: "Desde 2019 varios municipios cobran a los huéspedes un derecho por noche de hospedaje; se destina a limpieza de playas y sargazo, manejo de residuos y otras obras ambientales.",
    temas: ["Playas", "Residuos"],
  }),
  new AccionGobierno({
    nivel: "municipal", institucion: "Ayuntamientos costeros",
    accion: "Limpieza de playas y atención al sargazo",
    detalle: "Organizan cuadrillas de limpieza de playas y participan con la Marina y el estado en la recolección del sargazo.",
    temas: ["Playas", "Residuos"],
  }),
];

/**
 * Matriz de temas × niveles: resume QUIÉN hace QUÉ.
 * Cada celda describe el papel de ese nivel en ese tema.
 */
const MATRIZ_GOBIERNO = [
  { tema: "Áreas Naturales Protegidas", federal: "Decreta y administra ANP federales (CONANP).", estatal: "Decreta y administra ANP estatales (IBANQROO).", municipal: "Puede crear zonas de conservación municipales y parques urbanos." },
  { tema: "Protección de especies", federal: "NOM-059, veda de tortugas y programas PACE.", estatal: "Santuarios estatales de tortuga y manatí.", municipal: "Participa en campañas locales de protección." },
  { tema: "Arrecifes", federal: "El mar es zona federal: parques nacionales marinos y Reserva Caribe Mexicano.", estatal: "Participa en coordinación con la federación.", municipal: "Limpieza y reglas de uso en las playas." },
  { tema: "Manglares", federal: "LGVS art. 60 TER y NOM-022; ANP como Nichupté.", estatal: "Ordenamiento ecológico que limita construir en ellos.", municipal: "Desarrollo urbano que respeta zonas de manglar." },
  { tema: "Reforestación", federal: "Programas de CONAFOR.", estatal: "Participa en campañas de reforestación con la federación y los municipios.", municipal: "Arbolado urbano y parques." },
  { tema: "Regulación ambiental", federal: "LGEEPA y evaluación de impacto ambiental (SEMARNAT).", estatal: "Ley ambiental estatal, SEMA y PPA.", municipal: "Reglamentos de ecología y licencias de construcción." },
  { tema: "Manejo de residuos", federal: "Normas para residuos peligrosos.", estatal: "Ley de residuos y prohibición de plásticos de un solo uso.", municipal: "Recolección, limpia y rellenos sanitarios." },
  { tema: "Educación ambiental", federal: "Programas de cultura para la conservación en ANP y Naturalista (CONABIO).", estatal: "Actividades de educación ambiental en ANP estatales.", municipal: "Campañas de reciclaje y limpieza." },
  { tema: "Agua y recursos naturales", federal: "CONAGUA (acuífero) y vedas pesqueras.", estatal: "CAPA: agua potable y saneamiento.", municipal: "Coordinación de servicios y drenaje urbano." },
];
