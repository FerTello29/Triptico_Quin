/* ==========================================================================
   actividades.js — actividades humanas y su impacto ambiental.
   Estructura: Actividad → Impacto → Consecuencia → Posible solución.
   ========================================================================== */
"use strict";

const ACTIVIDADES = [
  new ActividadHumana({
    id: "turismo", nombre: "Turismo", emoji: "🏨",
    impacto: "Mucha demanda de agua, energía y terreno en la costa; visitas masivas a arrecifes, cenotes y lagunas.",
    consecuencia: "Pérdida de manglar y dunas, más aguas residuales y daño físico a corales y estromatolitos.",
    solucion: "Turismo responsable: límites de visitantes, guías certificados, reglas de las áreas protegidas y tratamiento de aguas en hoteles.",
    ejemplo: "Cancún, la Riviera Maya, Tulum y Bacalar concentran la actividad turística del estado.",
  }),
  new ActividadHumana({
    id: "construccion", nombre: "Construcción", emoji: "🏗️",
    impacto: "Desmonte de selva, relleno de humedales, extracción de piedra caliza y obras sobre cuevas.",
    consecuencia: "Pérdida de hábitat, fragmentación de la selva, erosión y riesgo de hundimientos.",
    solucion: "Evaluar el impacto ambiental antes de construir (MIA), respetar los ordenamientos ecológicos y dejar pasos de fauna.",
  }),
  new ActividadHumana({
    id: "agricultura", nombre: "Agricultura", emoji: "🌽",
    impacto: "Quemas para abrir terrenos y uso de fertilizantes y plaguicidas.",
    consecuencia: "Incendios forestales, contaminación del acuífero y pérdida del suelo delgado.",
    solucion: "Quemas controladas con aviso, milpa con descanso suficiente, agroforestería y manejo integrado de plagas.",
    ejemplo: "En la ribera del Río Hondo se cultiva caña de azúcar; en el centro del estado se practica la milpa maya.",
  }),
  new ActividadHumana({
    id: "pesca", nombre: "Pesca", emoji: "🎣",
    impacto: "Sobrepesca, captura en temporada de veda y redes que atrapan especies que no se buscaban.",
    consecuencia: "Disminución de langosta, caracol y peces; el arrecife pierde equilibrio.",
    solucion: "Respetar vedas y tallas mínimas, crear zonas de refugio pesquero y pescar el pez león, que es invasor.",
    ejemplo: "La langosta del Caribe tiene veda del 1 de marzo al 30 de junio.",
  }),
  new ActividadHumana({
    id: "ganaderia", nombre: "Ganadería", emoji: "🐄",
    impacto: "Desmonte de selva para hacer potreros y compactación del suelo.",
    consecuencia: "Deforestación, pérdida de biodiversidad y emisiones de metano.",
    solucion: "Sistemas silvopastoriles (árboles con pasto), rotación de potreros y no abrir nuevas áreas de selva.",
  }),
  new ActividadHumana({
    id: "urbanizacion", nombre: "Urbanización", emoji: "🏙️",
    impacto: "Crecimiento rápido de ciudades, más drenaje, más basura y más superficie pavimentada.",
    consecuencia: "Aguas residuales hacia el acuífero, islas de calor y pérdida de áreas verdes.",
    solucion: "Planeación urbana, plantas de tratamiento, drenaje completo y áreas verdes con especies nativas.",
    ejemplo: "Cancún, Playa del Carmen y Tulum han crecido muy rápido en las últimas décadas, impulsadas por el turismo.",
  }),
  new ActividadHumana({
    id: "transporte", nombre: "Transporte", emoji: "🚗",
    impacto: "Emisiones de gases, carreteras que dividen la selva y embarcaciones que fondean sobre el arrecife.",
    consecuencia: "Contaminación del aire, atropellamiento de fauna y daño a corales por anclas.",
    solucion: "Transporte público y bicicleta, pasos de fauna, límites de velocidad en zonas de fauna y boyas de amarre.",
  }),
  new ActividadHumana({
    id: "residuos", nombre: "Generación de residuos", emoji: "🗑️",
    impacto: "Mucha basura por la población y por los visitantes; tiraderos a cielo abierto.",
    consecuencia: "Líquidos de la basura (lixiviados) que contaminan el acuífero y plásticos que llegan al mar.",
    solucion: "Reducir, reutilizar, separar y reciclar; rellenos sanitarios bien construidos.",
    ejemplo: "Desde 2019 una ley estatal prohíbe bolsas, popotes y unicel de un solo uso.",
  }),
  new ActividadHumana({
    id: "deforestacion", nombre: "Deforestación", emoji: "🪓",
    impacto: "Cambio de uso del suelo e incendios que eliminan la cubierta de selva.",
    consecuencia: "Pérdida de hábitat, más CO₂ en el aire, erosión y menos protección para el agua subterránea.",
    solucion: "Reforestar con especies nativas, apoyar el manejo forestal comunitario y vigilar la tala ilegal.",
    ejemplo: "Ejidos forestales del centro y sur del estado aprovechan la selva con planes de manejo sin agotarla.",
  }),
  new ActividadHumana({
    id: "contaminacion", nombre: "Contaminación", emoji: "☣️",
    impacto: "Descargas de aguas residuales, químicos, bloqueadores solares, ruido y luz artificial.",
    consecuencia: "Crecimiento excesivo de algas, enfermedades en corales y crías de tortuga que se desorientan con la luz.",
    solucion: "Tratar las aguas residuales, usar luces bajas y cálidas cerca de la playa y evitar bloqueadores con oxibenzona.",
  }),
  new ActividadHumana({
    id: "sobreexplotacion", nombre: "Sobreexplotación de recursos", emoji: "⛏️",
    impacto: "Extraer agua, madera, peces, arena y piedra más rápido de lo que la naturaleza los repone.",
    consecuencia: "Intrusión de agua salada en el acuífero, especies en riesgo y playas que pierden arena.",
    solucion: "Aprovechamiento con planes de manejo, Unidades de Manejo para la Conservación de la Vida Silvestre (UMA) y consumo responsable.",
  }),
];
