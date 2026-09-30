/* ==========================================================================
   sensoriales.js — programas sensoriales y de educación ambiental.
   tipo "real": actividad que ya se realiza en lugares existentes.
   tipo "propuesta": actividad sugerida para escuelas o grupos.
   ========================================================================== */
"use strict";

const PROGRAMAS_SENSORIALES = [
  new ProgramaSensorial({
    id: "recorridos", nombre: "Recorridos interpretativos", emoji: "👣", sentidos: ["vista", "oido", "olfato", "tacto"], tipo: "real",
    descripcion: "Caminatas guiadas donde una persona capacitada explica lo que se ve, se oye y se huele en el camino: cómo funciona la selva, para qué sirve cada planta o por qué el agua del cenote es tan clara.",
    comoGeneraConciencia: "convierte datos en experiencias; lo que se vive con el cuerpo se recuerda mejor y crea cariño por el lugar.",
    dondeHacerlo: "Senderos de la Reserva de la Biósfera Sian Ka'an (zona de Muyil) y el Jardín Botánico Dr. Alfredo Barrera Marín en Puerto Morelos.",
  }),
  new ProgramaSensorial({
    id: "aves", nombre: "Observación de aves", emoji: "🐦", sentidos: ["vista", "oido"], tipo: "real",
    descripcion: "Con binoculares y una guía de campo se identifican aves por su forma, sus colores y su canto. Quintana Roo registra 483 especies de aves.",
    comoGeneraConciencia: "enseña a observar con paciencia y muestra que cada ave depende de un hábitat: si se pierde el manglar, se pierden sus aves.",
    dondeHacerlo: "Parque Nacional Isla Contoy (aves marinas), Cozumel, Sian Ka'an y la zona de Yum Balam.",
  }),
  new ProgramaSensorial({
    id: "senderos", nombre: "Senderos educativos", emoji: "🌿", sentidos: ["vista", "tacto", "olfato"], tipo: "real",
    descripcion: "Caminos con letreros y estaciones que explican el ecosistema. Se puede agregar un código QR en cada estación con audio o datos extra.",
    comoGeneraConciencia: "permite aprender a tu ritmo y conocer el lugar sin dañarlo, porque el sendero indica por dónde pasar.",
    dondeHacerlo: "Sendero de las dunas en Isla Contoy y senderos de áreas naturales protegidas del estado.",
  }),
  new ProgramaSensorial({
    id: "contacto", nombre: "Experiencias de contacto con la naturaleza", emoji: "🤲", sentidos: ["tacto", "oido", "olfato"], tipo: "propuesta",
    descripcion: "Actividades de silencio y atención: caminar descalzo en la arena, tocar la corteza de los árboles sin arrancar nada, sentir la diferencia de temperatura entre la sombra de la selva y el sol de la playa.",
    comoGeneraConciencia: "ayuda a sentir la naturaleza como algo cercano y no solo como un tema del libro.",
    dondeHacerlo: "Patio escolar, parques urbanos con árboles nativos o playas públicas, siempre con supervisión.",
  }),
  new ProgramaSensorial({
    id: "observacion", nombre: "Observación de ecosistemas", emoji: "🔍", sentidos: ["vista", "tacto"], tipo: "propuesta",
    descripcion: "Con lupa, cuaderno de campo y un cuadro de 1 × 1 m se cuentan plantas, insectos y huellas. En el mar, un recorrido de snorkel con guía permite ver el arrecife sin tocarlo.",
    comoGeneraConciencia: "muestra que en un espacio pequeño hay mucha vida y enseña a registrar datos como hacen los científicos.",
    dondeHacerlo: "Jardines escolares, parques, y el Parque Nacional Arrecife de Puerto Morelos con prestadores de servicio autorizados.",
  }),
  new ProgramaSensorial({
    id: "sonidos", nombre: "Identificación de sonidos de animales", emoji: "🎧", sentidos: ["oido"], tipo: "propuesta",
    descripcion: "Se escuchan grabaciones y luego sonidos reales: el rugido del saraguato al amanecer, el canto de las chachalacas, el croar de las ranas en temporada de lluvias o el zumbido de las abejas meliponas.",
    comoGeneraConciencia: "enseña que la selva se reconoce también con los oídos y que el ruido humano ahuyenta a la fauna.",
    dondeHacerlo: "En el aula con grabaciones de libre uso (por ejemplo, de xeno-canto) y después en un recorrido guiado.",
  }),
  new ProgramaSensorial({
    id: "plantas", nombre: "Identificación de plantas", emoji: "🍃", sentidos: ["vista", "tacto", "olfato"], tipo: "propuesta",
    descripcion: "Reconocer plantas por su forma, su textura y su olor: la corteza roja y lisa del chacá, las hojas aromáticas de la pimienta gorda o las hojas en abanico de la palma chit. Regla de oro: no tocar el chechén, porque su savia irrita la piel.",
    comoGeneraConciencia: "revalora el conocimiento tradicional maya sobre las plantas y enseña a respetarlas.",
    dondeHacerlo: "Jardín Botánico Dr. Alfredo Barrera Marín (Puerto Morelos) y viveros de plantas nativas.",
  }),
  new ProgramaSensorial({
    id: "agua", nombre: "Experiencias en cenotes, manglares y arrecifes", emoji: "🌊", sentidos: ["vista", "tacto", "oido"], tipo: "real",
    descripcion: "Nadar en cenotes autorizados sin bloqueador, recorrer canales de manglar en kayak o lancha lenta y observar el arrecife con snorkel siguiendo las reglas del área protegida.",
    comoGeneraConciencia: "al ver el agua cristalina y la vida que depende de ella, se entiende por qué no hay que contaminar el subsuelo ni el mar.",
    dondeHacerlo: "Canales de Muyil en Sian Ka'an, cenotes con reglamento de visita y parques nacionales marinos con guías autorizados.",
  }),
];

/** Mini juego: adivinar al animal por la descripción de su sonido. */
const SONIDOS = [
  { pista: "Un rugido grave y muy fuerte que se oye a lo lejos al amanecer, desde las copas de los árboles.", respuesta: "Saraguato (mono aullador)", opciones: ["Jaguar", "Saraguato (mono aullador)", "Cocodrilo"] },
  { pista: "Un coro ruidoso y repetitivo de aves que parecen “platicar” todas a la vez en la mañana.", respuesta: "Chachalacas", opciones: ["Chachalacas", "Flamencos", "Pavo ocelado"] },
  { pista: "Un zumbido suave cerca de troncos huecos; son insectos que los mayas cuidan desde hace siglos para obtener miel.", respuesta: "Abejas meliponas", opciones: ["Mosquitos", "Abejas meliponas", "Cigarras"] },
  { pista: "Muchos “croc-croc” al mismo tiempo cuando empiezan las lluvias y se forman charcos.", respuesta: "Ranas y sapos", opciones: ["Ranas y sapos", "Tortugas", "Murciélagos"] },
];
