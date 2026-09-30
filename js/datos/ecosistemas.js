/* ==========================================================================
   ecosistemas.js — los ocho ecosistemas principales de Quintana Roo.
   Fuentes: CONABIO (Riqueza biológica de Quintana Roo), CONANP (programas de
   manejo y fichas de ANP), INEGI (Aspectos geográficos de Quintana Roo 2022),
   Ley General de Vida Silvestre (art. 60 TER) y NOM-059-SEMARNAT-2010.
   ========================================================================== */
"use strict";

const ECOSISTEMAS = [
  new Ecosistema({
    id: "selva",
    nombre: "Selva tropical",
    emoji: "🌴",
    foto: "selva",
    descripcion:
      "Es el ecosistema que cubre la mayor parte del estado. Predominan la selva mediana subperennifolia, donde algunos árboles pierden sus hojas en la temporada seca, y la selva baja, que crece sobre suelos delgados de roca caliza.",
    dato: "Según el INEGI, las selvas son la vegetación dominante de Quintana Roo: ocupan 75.65 % en su clasificación de uso del suelo y vegetación.",
    caracteristicas: [
      "Clima cálido con lluvias en verano.",
      "Varios pisos de vegetación: árboles altos, arbustos, lianas y plantas epífitas como orquídeas y bromelias.",
      "Suelo delgado y pedregoso: la lluvia se infiltra rápido y casi no hay ríos en la superficie.",
    ],
    importancia:
      "Captura dióxido de carbono, produce oxígeno, protege las zonas donde el agua de lluvia recarga el acuífero y es el hogar de especies como el jaguar y el mono araña. También da recursos como el chicle y madera cuando se maneja de forma sustentable.",
    flora: ["Chicozapote (Manilkara zapota)", "Caoba (Swietenia macrophylla)", "Ceiba (Ceiba pentandra)", "Ramón (Brosimum alicastrum)", "Chacá (Bursera simaruba)", "Orquídeas y bromelias"],
    fauna: ["Jaguar (Panthera onca)", "Mono araña (Ateles geoffroyi)", "Saraguato o mono aullador (Alouatta pigra)", "Tapir (Tapirus bairdii)", "Pavo ocelado (Meleagris ocellata)", "Tucán pico canoa (Ramphastos sulfuratus)"],
    amenazas: [
      "Deforestación por cambio de uso del suelo (ciudades, agricultura y ganadería).",
      "Incendios forestales en la temporada seca.",
      "Fragmentación por carreteras y desarrollos, que aísla a los animales.",
      "Cacería y tráfico ilegal de especies.",
    ],
    dondeVerlo: "Reserva de la Biósfera Sian Ka'an, Otoch Ma'ax Yetel Kooh (Punta Laguna) y Bala'an Ka'ax.",
  }),

  new Ecosistema({
    id: "manglar",
    nombre: "Manglares",
    emoji: "🌿",
    foto: "manglar",
    descripcion:
      "Son bosques de árboles que toleran la sal y crecen en las orillas de lagunas costeras, bahías y esteros, donde se mezcla el agua dulce con el agua de mar. Sus raíces forman una red que sostiene el suelo y sirve de refugio a muchos animales.",
    dato: "Las cuatro especies de mangle de México están en la NOM-059-SEMARNAT-2010 como amenazadas, y el artículo 60 TER de la Ley General de Vida Silvestre prohíbe remover o afectar el manglar.",
    caracteristicas: [
      "Raíces aéreas: el mangle rojo tiene raíces en forma de zancos y el mangle negro saca raíces que respiran (neumatóforos).",
      "Suelos inundados, salobres y con poco oxígeno.",
      "En México hay cuatro especies: mangle rojo, negro, blanco y botoncillo.",
    ],
    importancia:
      "Son guarderías de peces, camarones y cangrejos; protegen la costa del oleaje y de los huracanes; atrapan sedimentos que ensuciarían el arrecife y guardan grandes cantidades de carbono en su suelo, al que se le llama “carbono azul”.",
    flora: ["Mangle rojo (Rhizophora mangle)", "Mangle negro (Avicennia germinans)", "Mangle blanco (Laguncularia racemosa)", "Mangle botoncillo (Conocarpus erectus)"],
    fauna: ["Cocodrilo de pantano (Crocodylus moreletii)", "Garzas y espátula rosada", "Manatí del Caribe (Trichechus manatus)", "Crías de peces y cangrejos", "Mapache (Procyon lotor)"],
    amenazas: [
      "Relleno y desmonte para hoteles, casas y marinas.",
      "Carreteras que cortan el paso natural del agua.",
      "Contaminación por aguas residuales y basura.",
    ],
    dondeVerlo: "Área de Protección de Flora y Fauna Manglares de Nichupté (Cancún), Sian Ka'an, Bahía de Chetumal y Yum Balam.",
  }),

  new Ecosistema({
    id: "arrecife",
    nombre: "Arrecifes de coral",
    emoji: "🪸",
    foto: "arrecife",
    descripcion:
      "Son estructuras construidas durante miles de años por corales, animales que viven en colonias y fabrican un esqueleto de carbonato de calcio. Los arrecifes de Quintana Roo forman parte del Sistema Arrecifal Mesoamericano, que se extiende por más de 1,000 km desde el norte del estado hasta Honduras.",
    dato: "El Sistema Arrecifal Mesoamericano es considerado la segunda barrera arrecifal más grande del planeta. La Reserva de la Biósfera Caribe Mexicano protege su parte mexicana.",
    caracteristicas: [
      "Necesitan agua cálida, clara y con pocos nutrientes.",
      "Los corales viven junto con microalgas (zooxantelas) que les dan color y alimento.",
      "Crecen muy despacio: una colonia grande puede tener siglos.",
    ],
    importancia:
      "Albergan una enorme cantidad de especies marinas, frenan la fuerza del oleaje y protegen las playas, producen arena (junto con los peces loro) y sostienen la pesca y el turismo del estado.",
    flora: ["Zooxantelas (microalgas dentro del coral)", "Algas calcáreas como Halimeda", "Pastos marinos cercanos"],
    fauna: ["Coral cuerno de alce (Acropora palmata)", "Coral cuerno de ciervo (Acropora cervicornis)", "Peces loro", "Tortuga carey (Eretmochelys imbricata)", "Langosta del Caribe (Panulirus argus)", "Tiburón gata (Ginglymostoma cirratum)"],
    amenazas: [
      "Blanqueamiento del coral cuando el mar se calienta demasiado.",
      "Enfermedades como el síndrome blanco, detectado en el Caribe mexicano en 2018.",
      "Aguas residuales, sedimentos y sargazo en descomposición.",
      "Turismo sin control: anclas, contacto directo y bloqueadores dañinos.",
    ],
    dondeVerlo: "Parques nacionales Arrecifes de Cozumel, Arrecife de Puerto Morelos y Arrecifes de Xcalak; Reserva de la Biósfera Banco Chinchorro.",
  }),

  new Ecosistema({
    id: "dunas",
    nombre: "Dunas costeras",
    emoji: "🏖️",
    foto: "dunas",
    descripcion:
      "Son montículos de arena que el viento forma detrás de la playa. Las plantas que crecen sobre ellas atrapan la arena y la mantienen en su lugar.",
    dato: "Las dunas son una reserva natural de arena: después de una tormenta, ayudan a que la playa se recupere.",
    caracteristicas: [
      "Arena suelta, mucho sol, viento y salitre.",
      "Plantas rastreras y resistentes a la sal.",
      "Son sitios de anidación de tortugas marinas.",
    ],
    importancia:
      "Funcionan como una barrera natural contra el oleaje y las marejadas de los huracanes, protegen lo que hay detrás de la playa, filtran el agua de lluvia hacia el subsuelo y son zona de anidación de tortugas.",
    flora: ["Riñonina o campanilla de playa (Ipomoea pes-caprae)", "Uva de mar (Coccoloba uvifera)", "Verdolaga de playa (Sesuvium portulacastrum)", "Palma chit (Thrinax radiata)"],
    fauna: ["Tortugas marinas (anidación)", "Cangrejo fantasma", "Lagartijas", "Aves playeras"],
    amenazas: [
      "Construcción de hoteles y casas sobre la duna.",
      "Retiro de la vegetación para “limpiar” la playa.",
      "Luces artificiales que desorientan a las crías de tortuga.",
      "Paso de vehículos y personas que compactan la arena.",
    ],
    dondeVerlo: "Parque Nacional Isla Contoy (sendero de las dunas), Santuario de la Tortuga Marina Xcacel-Xcacelito y la costa de Sian Ka'an.",
  }),

  new Ecosistema({
    id: "humedales",
    nombre: "Humedales",
    emoji: "🦩",
    foto: "humedales",
    descripcion:
      "Son zonas cubiertas de agua dulce o salobre de forma permanente o durante una parte del año: pantanos, sabanas inundables, tulares y petenes (islas de vegetación rodeadas de humedal). En Sian Ka'an forman grandes extensiones.",
    dato: "Sian Ka'an está inscrita en la lista de humedales de importancia internacional de la Convención Ramsar.",
    caracteristicas: [
      "Suelo saturado de agua.",
      "Plantas acuáticas como el tule y el zacate cortador (sibal).",
      "Reciben muchas aves acuáticas y migratorias.",
    ],
    importancia:
      "Almacenan y filtran agua, amortiguan las inundaciones, capturan carbono y son zonas de alimentación y descanso para aves que viajan desde Norteamérica.",
    flora: ["Tule (Typha domingensis)", "Zacate cortador o sibal (Cladium jamaicense)", "Palma tasiste (Acoelorraphe wrightii)", "Nenúfares"],
    fauna: ["Garzas e ibis", "Aves migratorias", "Cocodrilo de pantano (Crocodylus moreletii)", "Tortugas de agua dulce", "Ranas y peces pequeños"],
    amenazas: [
      "Drenado y relleno para construir.",
      "Agroquímicos y aguas residuales que llegan con el agua.",
      "Incendios en la temporada seca.",
    ],
    dondeVerlo: "Reserva de la Biósfera Sian Ka'an, Área de Protección de Flora y Fauna Yum Balam y Uaymil.",
  }),

  new Ecosistema({
    id: "lagunas",
    nombre: "Lagunas",
    emoji: "🏝️",
    foto: "lagunas",
    descripcion:
      "Son cuerpos de agua poco profundos. Las lagunas costeras, como Nichupté o Chacmochuch, se comunican con el mar; las interiores, como Bacalar, son de agua dulce y se alimentan de agua subterránea.",
    dato: "En la Laguna de Bacalar, conocida como “la laguna de los siete colores”, viven estromatolitos: estructuras formadas por comunidades de microorganismos, parientes de las formas de vida más antiguas del planeta.",
    caracteristicas: [
      "Poca profundidad y fondos de arena blanca de carbonato que producen muchos tonos de azul.",
      "Mezcla de agua dulce y salada en las lagunas costeras.",
      "Conectadas con cenotes y con el acuífero.",
    ],
    importancia:
      "Guardan agua dulce, son hábitat de peces, aves y manatíes (como en la Bahía de Chetumal) y sostienen la pesca local y el turismo.",
    flora: ["Mangles en las orillas", "Tulares", "Pastos acuáticos y algas"],
    fauna: ["Estromatolitos (comunidades de microorganismos)", "Caracol manzana (Pomacea flagellata)", "Manatí del Caribe", "Cocodrilos", "Aves acuáticas"],
    amenazas: [
      "Aguas residuales y fosas sépticas mal construidas.",
      "Exceso de nutrientes y sedimentos que cambian el color del agua.",
      "Turismo masivo: pisar o tocar los estromatolitos los destruye.",
    ],
    dondeVerlo: "Laguna de Bacalar, Sistema Lagunar Nichupté (Cancún), Bahía de Chetumal y Laguna Conil (Yum Balam).",
  }),

  new Ecosistema({
    id: "playas",
    nombre: "Playas y ecosistemas costeros",
    emoji: "🌊",
    foto: "playas",
    descripcion:
      "Es la franja donde el mar se encuentra con la tierra. Las playas de Quintana Roo tienen arena blanca y fina formada por restos de corales, conchas y algas calcáreas; frente a ellas suele haber praderas de pastos marinos.",
    dato: "La arena de estas playas es de carbonato de calcio: por eso es blanca y no se calienta tanto como la arena volcánica.",
    caracteristicas: [
      "Arena de origen biológico (corales, conchas, algas).",
      "Oleaje moderado porque el arrecife lo frena.",
      "Pastos marinos cerca de la orilla.",
    ],
    importancia:
      "Son zona de anidación de tortugas y de descanso de aves; los pastos marinos oxigenan el agua, atrapan sedimentos y alimentan a tortugas y manatíes. También son la base de la economía turística del estado.",
    flora: ["Pasto tortuga (Thalassia testudinum)", "Pasto manatí (Syringodium filiforme)", "Uva de mar", "Palma de coco (especie introducida)"],
    fauna: ["Tortuga verde (Chelonia mydas)", "Tortuga caguama (Caretta caretta)", "Fragata y pelícano café", "Cangrejos y peces juveniles"],
    amenazas: [
      "Construcción muy cerca del mar y erosión de la playa.",
      "Llegada masiva de sargazo.",
      "Basura y plásticos.",
      "Aguas residuales que llegan al mar.",
    ],
    dondeVerlo: "Tulum, Akumal, Xcacel, Isla Contoy y Mahahual.",
  }),

  new Ecosistema({
    id: "cenotes",
    nombre: "Cenotes y sistemas subterráneos",
    emoji: "💧",
    foto: "cenotes",
    descripcion:
      "Son pozos naturales que se forman cuando el agua disuelve la roca caliza y el techo de una cueva se derrumba, dejando ver el agua subterránea. La palabra viene del maya ts'ono'ot.",
    dato: "En 2018, al conectarse los sistemas Sac Actun y Dos Ojos (Tulum), Sac Actun alcanzó 347 km explorados y se reconoció como el sistema de cuevas inundadas más largo conocido (proyecto Gran Acuífero Maya).",
    caracteristicas: [
      "Hay cenotes abiertos, semiabiertos y en caverna.",
      "Están conectados por ríos subterráneos que llegan al mar.",
      "Una capa de agua dulce flota sobre agua salada; el límite se llama haloclina.",
      "Tienen estalactitas y estalagmitas que se formaron cuando las cuevas estaban secas.",
    ],
    importancia:
      "Son la ventana al acuífero, la única fuente natural de agua dulce del estado. Albergan fauna adaptada a la oscuridad, guardan restos arqueológicos y paleontológicos y fueron lugares sagrados para los mayas.",
    flora: ["Raíces de árboles que bajan hasta el agua", "Helechos y musgos en la entrada", "Algas en las zonas con luz"],
    fauna: ["Peces y camarones ciegos adaptados a la oscuridad", "Murciélagos", "Golondrinas y momotos (pájaro toh)", "Peces de agua dulce y tortugas"],
    amenazas: [
      "Aguas residuales, fosas sépticas y basureros cuyos líquidos se filtran al subsuelo.",
      "Construcciones sobre las cuevas.",
      "Turismo sin reglas: bloqueadores, basura y visitantes en exceso.",
      "Sobreexplotación del acuífero.",
    ],
    dondeVerlo: "Gran Cenote y Dos Ojos (Tulum), Cenote Azul (Bacalar) y la Ruta de los Cenotes (Puerto Morelos).",
  }),
];
