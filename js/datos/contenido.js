/* ==========================================================================
   contenido.js — secciones de la app. Cada una alimenta la página, el Modo
   Exposición (diapositivas + guion "¿Qué puedo decir?") y el tríptico.
   ========================================================================== */
"use strict";

const INEGI_2022 = "INEGI, 2022";
const CONABIO_QR = "CONABIO–ECOSUR";

const SECCIONES = [
  new Seccion({
    id: "inicio", emoji: "🏠", etiquetaMenu: "Inicio", tono: "caribe",
    titulo: "Quintana Roo: Ecosistemas, Biodiversidad y Equilibrio Ambiental",
    subtitulo: "Selva, cenotes, manglares y arrecife: un solo sistema conectado por el agua.",
    resumen:
      "Quintana Roo está en el oriente de la península de Yucatán, frente al Mar Caribe. Además de playas, tiene selvas, manglares, cenotes, lagunas y parte del Sistema Arrecifal Mesoamericano.",
    datos: [
      { valor: "44,705", unidad: "km²", texto: "de superficie (2.3 % del país)", fuente: INEGI_2022 },
      { valor: "1,857,985", texto: "habitantes en 2020", fuente: "INEGI, Censo 2020" },
      { valor: "11", texto: "municipios; capital: Chetumal", fuente: "INEGI" },
      { valor: "7,938", texto: "especies registradas", fuente: CONABIO_QR },
    ],
    frasesClave: [
      "Todo está conectado por el agua: selva → cenote → mar → arrecife.",
      "Es un estado plano de roca caliza, sin casi ríos en la superficie.",
      "Su riqueza natural también sostiene su economía.",
    ],
    guion:
      "Buenos días. Nuestro tema es Quintana Roo: sus ecosistemas, su biodiversidad y el equilibrio ambiental. Quintana Roo está en el oriente de la península de Yucatán, frente al Mar Caribe. Mucha gente lo conoce por Cancún o Tulum, pero además de playas tiene selvas, manglares, cenotes, lagunas y una parte del Sistema Arrecifal Mesoamericano.\n\nPara ubicarnos: según el INEGI, el estado mide 44,705 kilómetros cuadrados y en el censo de 2020 tenía 1,857,985 habitantes en 11 municipios. Un estudio de CONABIO y ECOSUR registró 7,938 especies. En esta exposición veremos cómo se conectan sus ecosistemas y qué podemos hacer para cuidarlos.",
    visual: { foto: "portada", ilustracion: { tipo: "portada" } },
  }),

  new Seccion({
    id: "ecosistemas", emoji: "🌴", etiquetaMenu: "Ecosistemas", tono: "selva",
    titulo: "Ecosistemas de Quintana Roo",
    subtitulo: "Ocho ecosistemas que funcionan como uno solo: lo que pasa en tierra llega al mar.",
    intro:
      "Un ecosistema es el conjunto de seres vivos de un lugar y el ambiente físico en el que viven (agua, suelo, aire, luz). Toca cada tarjeta para ver su ficha completa.",
    resumen:
      "La selva cubre la mayor parte del estado. En la costa hay manglares, dunas y playas; en el mar, el arrecife de coral. Tierra adentro están los humedales, las lagunas y los cenotes.",
    datos: [
      { valor: "75.65", unidad: "%", texto: "de la vegetación clasificada es selva", fuente: INEGI_2022 },
      { valor: "+1,000", unidad: "km", texto: "mide el Sistema Arrecifal Mesoamericano, hasta Honduras" },
      { valor: "4", texto: "especies de mangle, todas amenazadas", fuente: "NOM-059-SEMARNAT-2010" },
      { valor: "347", unidad: "km", texto: "explorados del sistema de cuevas Sac Actun (2018)", fuente: "INAH – Gran Acuífero Maya" },
    ],
    frasesClave: [
      "Un ecosistema = seres vivos + ambiente físico.",
      "El manglar protege la costa y es guardería de peces.",
      "El arrecife frena el oleaje y produce arena.",
      "Los cenotes son ventanas al agua subterránea.",
    ],
    guion:
      "Un ecosistema es el conjunto de seres vivos de un lugar y el ambiente en el que viven. En Quintana Roo hay ocho muy importantes. La selva cubre la mayor parte del estado. En la costa están los manglares, que protegen contra los huracanes y son guardería de peces; las dunas y las playas, donde anidan las tortugas; y en el mar, el arrecife de coral, que es parte de la segunda barrera arrecifal más grande del mundo.\n\nTierra adentro hay humedales, lagunas como Bacalar y cenotes, que son la entrada al agua subterránea. Lo más interesante es que están conectados: si se contamina un cenote, esa agua puede terminar en el arrecife.",
    visual: { foto: "selva", ilustracion: { tipo: "ecosistema", id: "selva" } },
    preguntaRapida: { pregunta: "¿Qué ecosistema costero es “guardería” de peces y protege contra huracanes?", respuesta: "El manglar. Sus raíces frenan el oleaje y dan refugio a crías de peces y crustáceos." },
  }),

  new Seccion({
    id: "biodiversidad", emoji: "🦜", etiquetaMenu: "Biodiversidad", tono: "flamenco",
    titulo: "Biodiversidad",
    subtitulo: "La variedad de la vida: genes, especies y ecosistemas.",
    intro:
      "La biodiversidad (diversidad biológica) incluye la variedad de genes dentro de una especie, la variedad de especies y la variedad de ecosistemas. En Quintana Roo se han registrado 483 especies de aves: 43 % de las que hay en México.",
    resumen:
      "Aquí viven el jaguar, el manatí, tortugas marinas que anidan en sus playas y el tiburón ballena. Algunas especies, como el mapache de Cozumel, solo existen en el estado.",
    datos: [
      { valor: "7,938", texto: "especies registradas", fuente: CONABIO_QR },
      { valor: "483", texto: "especies de aves (43 % de las de México)", fuente: CONABIO_QR },
      { valor: "114", texto: "especies de mamíferos", fuente: CONABIO_QR },
      { valor: "19", texto: "especies endémicas del estado y 118 de la península", fuente: CONABIO_QR },
    ],
    frasesClave: [
      "Biodiversidad = genes + especies + ecosistemas.",
      "Especie endémica: solo vive en un lugar.",
      "La NOM-059 dice qué especies están en riesgo en México.",
    ],
    guion:
      "La biodiversidad es la variedad de la vida: incluye los genes, las especies y los ecosistemas. Quintana Roo tiene mucha: un estudio de CONABIO y ECOSUR registró 7,938 especies, entre ellas 483 de aves, casi la mitad de las que hay en México.\n\nAquí viven el jaguar, el felino más grande de América; el manatí, que está en peligro de extinción; tortugas marinas que anidan en sus playas y el tiburón ballena, el pez más grande del mundo. También hay especies que solo existen aquí, como el mapache de Cozumel. La biodiversidad nos da oxígeno, agua limpia, alimento y protección contra huracanes. Sus amenazas son la pérdida de hábitat, la contaminación, las especies invasoras como el pez león y el cambio climático.",
    visual: { foto: "jaguar", ilustracion: { tipo: "especie", id: "jaguar" } },
    preguntaRapida: { pregunta: "¿Qué significa que una especie sea endémica?", respuesta: "Que solo vive de forma natural en un lugar determinado, como el mapache de Cozumel, que solo existe en esa isla." },
  }),

  new Seccion({
    id: "biosfera", emoji: "🌎", etiquetaMenu: "Biósfera", tono: "caribe",
    titulo: "Biósfera",
    subtitulo: "La capa del planeta donde existe la vida.",
    intro:
      "La biósfera incluye a todos los seres vivos y los lugares donde viven. Se forma donde se encuentran la atmósfera (aire), la hidrosfera (agua) y la litosfera (roca y suelo). Los seres vivos dependen del ambiente y, a la vez, lo transforman.",
    resumen:
      "Las reservas de la biósfera protegen zonas muy valiosas combinando conservación, investigación y desarrollo sustentable. En Quintana Roo destacan Sian Ka'an, Caribe Mexicano, Banco Chinchorro y Tiburón Ballena.",
    datos: [
      { valor: "528,148", unidad: "ha", texto: "de la Reserva de la Biósfera Sian Ka'an (1986)", fuente: "CONANP / DOF" },
      { valor: "1987", texto: "Sian Ka'an es Patrimonio Mundial", fuente: "UNESCO" },
      { valor: "+5.7", unidad: "millones de ha", texto: "protege la Reserva Caribe Mexicano (2016)", fuente: "CONANP" },
      { valor: "5", texto: "reservas de la biósfera federales en el estado", fuente: "CONANP" },
    ],
    frasesClave: [
      "Biósfera = donde se unen aire, agua y suelo con la vida.",
      "Zona núcleo: protección estricta. Zona de amortiguamiento: uso sustentable.",
      "Sian Ka'an significa “origen del cielo”.",
    ],
    guion:
      "La biósfera es la parte del planeta donde hay vida. Se forma donde se juntan la atmósfera, que es el aire; la hidrosfera, que es el agua; y la litosfera, que es el suelo y las rocas. Todos los seres vivos dependemos de esas tres capas.\n\nPara proteger lugares muy valiosos existen las reservas de la biósfera. Tienen una zona núcleo, muy protegida, y una zona de amortiguamiento, donde se permiten actividades sustentables. En Quintana Roo está Sian Ka'an, decretada en 1986 y Patrimonio Mundial de la UNESCO desde 1987, y la Reserva Caribe Mexicano, que protege más de 5.7 millones de hectáreas de mar.",
    visual: { foto: "humedales", ilustracion: { tipo: "esferas" } },
    preguntaRapida: { pregunta: "¿Qué tres capas de la Tierra se combinan para formar la biósfera?", respuesta: "La atmósfera (aire), la hidrosfera (agua) y la litosfera (roca y suelo)." },
  }),

  new Seccion({
    id: "hidrosfera", emoji: "💧", etiquetaMenu: "Hidrosfera", tono: "cenote",
    titulo: "Hidrosfera",
    subtitulo: "En Quintana Roo los ríos corren bajo tierra.",
    intro:
      "La hidrosfera es toda el agua del planeta: mares, lagunas, ríos, agua subterránea, nubes y hielo. En Quintana Roo casi no hay ríos en la superficie: la lluvia se infiltra por la roca caliza y forma un gran acuífero con ríos subterráneos que desembocan en el mar.",
    resumen:
      "El agua subterránea es la única fuente natural de agua dulce del estado. Los cenotes, las lagunas y el arrecife están conectados por ella, así que la contaminación en tierra puede llegar al mar.",
    datos: [
      { valor: "800–1,500", unidad: "mm", texto: "de lluvia al año, según la zona", fuente: INEGI_2022 },
      { valor: "347", unidad: "km", texto: "de cuevas inundadas en Sac Actun", fuente: "INAH – Gran Acuífero Maya, 2018" },
      { valor: "Río Hondo", texto: "el principal río de superficie, frontera con Belice", fuente: INEGI_2022 },
    ],
    frasesClave: [
      "Agua dulce flota sobre agua salada (haloclina).",
      "Lo que se tira en tierra puede llegar al cenote y al mar.",
      "Si se extrae demasiada agua, entra agua salada (intrusión salina).",
    ],
    guion:
      "La hidrosfera es toda el agua del planeta. En Quintana Roo pasa algo especial: casi no hay ríos en la superficie. El agua de lluvia se filtra por la roca caliza y forma ríos subterráneos. Los cenotes son como ventanas a esa agua. Una capa de agua dulce flota encima del agua salada, y al límite entre las dos se le llama haloclina.\n\nEsta agua subterránea es la única fuente natural de agua dulce del estado, por eso es tan importante no contaminarla. Si se tiran aguas negras o basura, se filtran rápido y llegan a los cenotes, a las lagunas y al arrecife. También hay que cuidar no sacar más agua de la que se recarga, porque entraría agua salada.",
    visual: { foto: "granCenote", ilustracion: { tipo: "acuifero" } },
    preguntaRapida: { pregunta: "¿Cómo se llama el límite entre el agua dulce y el agua salada dentro de un cenote?", respuesta: "Haloclina. Se ve como una capa borrosa, porque el agua dulce y la salada tienen diferente densidad." },
  }),

  new Seccion({
    id: "litosfera", emoji: "🪨", etiquetaMenu: "Litosfera", tono: "caliza",
    titulo: "Litosfera",
    subtitulo: "Un estado plano hecho de roca caliza que se formó bajo el mar.",
    intro:
      "La litosfera es la capa sólida de la Tierra: rocas, suelo y relieve. En Quintana Roo, el tipo de roca explica por qué hay cenotes, por qué el suelo es tan delgado y por qué el agua se contamina con facilidad.",
    resumen:
      "Quintana Roo está sobre la plataforma de Yucatán, formada por rocas sedimentarias (calizas) de origen marino. El relieve es casi plano y los suelos son delgados y pedregosos.",
    datos: [
      { valor: "200", unidad: "m", texto: "sobre el nivel del mar: Cerro El Charro, el punto más alto", fuente: INEGI_2022 },
      { valor: "58.32", unidad: "%", texto: "de los suelos son leptosoles (delgados y pedregosos)", fuente: INEGI_2022 },
      { valor: "CaCO₃", texto: "carbonato de calcio: el mineral principal de la caliza" },
    ],
    frasesClave: [
      "Caliza + agua con CO₂ = roca que se disuelve (karst).",
      "Cueva + techo que colapsa = cenote.",
      "Suelo delgado = suelo frágil que se erosiona fácil.",
    ],
    guion:
      "La litosfera es la capa sólida de la Tierra: las rocas y el suelo. Quintana Roo está sobre una plataforma de roca caliza que se formó en el fondo del mar. Su relieve es casi plano: el punto más alto, el cerro El Charro, mide unos 200 metros sobre el nivel del mar.\n\nLos suelos son delgados y pedregosos; más de la mitad son leptosoles. Cuando el agua de lluvia, que lleva dióxido de carbono, disuelve la caliza, se forman cuevas, y si el techo se derrumba, nace un cenote. Actividades como la extracción de piedra, los rellenos y la deforestación dañan este suelo tan frágil.",
    visual: { foto: "cenotes", ilustracion: { tipo: "formacion", paso: 4 } },
    preguntaRapida: { pregunta: "¿Qué ácido débil disuelve la roca caliza y forma cuevas?", respuesta: "El ácido carbónico, que se forma cuando el agua de lluvia se mezcla con dióxido de carbono." },
  }),

  new Seccion({
    id: "atmosfera", emoji: "☁️", etiquetaMenu: "Atmósfera", tono: "cielo",
    titulo: "Atmósfera",
    subtitulo: "Clima cálido, lluvias de verano y temporada de huracanes.",
    intro:
      "La atmósfera es la capa de gases que rodea a la Tierra. Regula la temperatura, nos protege de la radiación del Sol y hace posible la vida. En ella ocurren el clima y el tiempo atmosférico.",
    resumen:
      "El 99 % del estado tiene clima cálido subhúmedo con lluvias en verano. La temperatura media anual es de 26.5 °C. Entre junio y noviembre es temporada de huracanes.",
    datos: [
      { valor: "26.5", unidad: "°C", texto: "temperatura media anual", fuente: INEGI_2022 },
      { valor: "99", unidad: "%", texto: "del territorio con clima cálido subhúmedo", fuente: INEGI_2022 },
      { valor: "1 jun – 30 nov", texto: "temporada de huracanes del Atlántico", fuente: "SMN" },
      { valor: "882", unidad: "hPa", texto: "presión del huracán Wilma (2005), récord del Atlántico" },
    ],
    frasesClave: [
      "Clima = promedio del tiempo atmosférico durante muchos años.",
      "Los huracanes también renuevan ecosistemas y recargan el acuífero.",
      "El sargazo que se pudre libera gases con olor a huevo podrido.",
    ],
    guion:
      "La atmósfera es la capa de aire que rodea la Tierra y regula el clima. Según el INEGI, en el 99 % de Quintana Roo el clima es cálido subhúmedo con lluvias en verano, y la temperatura media es de 26.5 grados.\n\nEs una zona de huracanes: la temporada va del 1 de junio al 30 de noviembre. Han pasado huracanes muy fuertes como Gilberto, Wilma y Dean, y en 2024 Beryl, que tocó tierra cerca de Tulum. El aire suele ser limpio por los vientos que vienen del mar, pero el sargazo que se pudre en las playas suelta gases con olor a huevo podrido, y los incendios producen humo. El cambio climático calienta el mar, blanquea los corales y puede hacer más intensos los huracanes.",
    visual: { foto: "playas", ilustracion: { tipo: "ecosistema", id: "playas" } },
    preguntaRapida: { pregunta: "¿En qué meses es la temporada de huracanes del Atlántico?", respuesta: "Del 1 de junio al 30 de noviembre." },
  }),

  new Seccion({
    id: "ciclos", emoji: "♻️", etiquetaMenu: "Ciclos bioquímicos", tono: "ciclo",
    titulo: "Ciclos biogeoquímicos",
    subtitulo: "Los caminos del agua, el carbono, el nitrógeno y el oxígeno (también llamados ciclos bioquímicos).",
    intro:
      "Los elementos que forman a los seres vivos no se acaban: circulan entre el aire, el agua, el suelo y los organismos. Elige un ciclo y toca cada etapa del diagrama para ver cómo funciona en Quintana Roo.",
    resumen:
      "El agua corre bajo tierra, la selva y el manglar atrapan carbono, las bacterias hacen útil el nitrógeno y las plantas producen oxígeno.",
    datos: [
      { valor: "4", texto: "ciclos: agua, carbono, nitrógeno y oxígeno" },
      { valor: "78", unidad: "%", texto: "del aire es nitrógeno" },
      { valor: "21", unidad: "%", texto: "del aire es oxígeno" },
    ],
    frasesClave: [
      "La materia no se pierde: se recicla.",
      "El manglar guarda “carbono azul”.",
      "Demasiados nutrientes en el mar = algas que asfixian al coral.",
    ],
    guion:
      "Los ciclos biogeoquímicos son los caminos que siguen el agua y algunos elementos, como el carbono, el nitrógeno y el oxígeno, entre los seres vivos y el ambiente. En Quintana Roo el ciclo del agua es especial porque el agua corre bajo tierra.\n\nEn el ciclo del carbono, la selva y los manglares atrapan dióxido de carbono; los manglares guardan tanto carbono en su suelo que se le llama carbono azul. En el ciclo del nitrógeno, unas bacterias lo convierten en nutrientes para las plantas, pero si llegan aguas negras al mar sobran nutrientes y crecen algas que dañan a los corales. Y en el ciclo del oxígeno, las plantas lo producen y todos lo respiramos.",
    visual: { foto: "manglar", ilustracion: { tipo: "ecosistema", id: "manglar" } },
    preguntaRapida: { pregunta: "¿Por qué a los manglares se les llama bodegas de “carbono azul”?", respuesta: "Porque guardan grandes cantidades de carbono en su suelo inundado, junto al mar." },
  }),

  new Seccion({
    id: "actividades", emoji: "👥", etiquetaMenu: "Actividades humanas", tono: "coral",
    titulo: "Actividades humanas y su impacto ambiental",
    subtitulo: "Actividad humana → impacto ambiental → consecuencia → posible solución.",
    intro:
      "Las personas necesitamos vivienda, alimento, trabajo y transporte. Cada actividad cambia el ambiente; conocer la cadena completa ayuda a encontrar soluciones.",
    resumen:
      "El turismo, la construcción, la urbanización, la agricultura, la ganadería y la pesca transforman el ambiente. Para cada impacto existe al menos una solución posible.",
    datos: [
      { valor: "11", texto: "actividades analizadas" },
      { valor: "1 mar – 30 jun", texto: "veda de la langosta del Caribe", fuente: "CONAPESCA" },
      { valor: "2019", texto: "ley estatal contra plásticos de un solo uso", fuente: "Gobierno de Quintana Roo" },
    ],
    frasesClave: [
      "No se trata de prohibir todo, sino de hacerlo de forma sustentable.",
      "Cada impacto tiene una consecuencia y una posible solución.",
      "El turismo depende de un ambiente sano.",
    ],
    guion:
      "Las actividades humanas son necesarias, pero tienen efectos. Por ejemplo, el turismo es la base de la economía del estado, pero necesita mucha agua y energía y a veces se construye sobre manglares y dunas. La urbanización genera aguas residuales que pueden llegar al acuífero. La agricultura y la ganadería pueden provocar deforestación e incendios, y la pesca sin control agota la langosta y el caracol.\n\nPara cada problema hay soluciones: respetar las vedas, tratar el agua, reciclar, reforestar con plantas nativas y hacer turismo responsable. El mensaje es que no se trata de prohibir todo, sino de hacerlo de manera sustentable.",
    visual: { foto: "portada", ilustracion: { tipo: "ecosistema", id: "playas" } },
    preguntaRapida: { pregunta: "¿Qué pez invasor se recomienda pescar para proteger el arrecife?", respuesta: "El pez león, que no es nativo del Caribe y se come a muchos peces pequeños del arrecife." },
  }),

  new Seccion({
    id: "gobierno", emoji: "🏛️", etiquetaMenu: "Acciones del gobierno", tono: "selva",
    titulo: "¿Qué hace el gobierno para proteger el medio ambiente?",
    subtitulo: "Tres niveles de gobierno, cada uno con responsabilidades distintas.",
    intro:
      "La protección del ambiente se reparte entre el gobierno federal, el estatal y los municipios. Aquí solo aparecen instituciones, leyes y programas reales; como pueden cambiar con el tiempo, conviene confirmar su estado actual en los sitios oficiales.",
    resumen:
      "Federal: CONANP, SEMARNAT, PROFEPA, CONAFOR, CONAGUA y SEMAR. Estatal: SEMA, IBANQROO, PPA y la ley contra plásticos de un solo uso. Municipal: basura, limpieza de playas y reglamentos de ecología.",
    datos: [
      { valor: "3", texto: "niveles: federal, estatal y municipal" },
      { valor: "1990", texto: "veda total de tortugas marinas", fuente: "DOF" },
      { valor: "2019", texto: "inicia la estrategia de la Marina contra el sargazo", fuente: "SEMAR" },
    ],
    frasesClave: [
      "Federal: áreas protegidas, normas y vigilancia.",
      "Estatal: ANP estatales, ordenamiento y ley de residuos.",
      "Municipal: basura, playas y reglamentos locales.",
    ],
    guion:
      "El gobierno actúa en tres niveles. El federal, a través de la CONANP, administra las áreas naturales protegidas como Sian Ka'an; la SEMARNAT hace normas como la NOM-059, que dice qué especies están en riesgo; la PROFEPA vigila que se cumplan, y la Marina ayuda a recoger el sargazo.\n\nEl gobierno estatal tiene la Secretaría de Ecología y Medio Ambiente y el IBANQROO, que cuida áreas protegidas estatales como el Santuario del Manatí, y desde 2019 una ley que prohíbe bolsas, popotes y unicel desechables. Los municipios se encargan de recoger la basura, limpiar las playas y aprobar reglamentos de ecología.",
    visual: { foto: "islaContoy", ilustracion: { tipo: "zonificacion" } },
    preguntaRapida: { pregunta: "¿Qué institución federal vigila que se cumplan las leyes ambientales?", respuesta: "La PROFEPA (Procuraduría Federal de Protección al Ambiente)." },
  }),

  new Seccion({
    id: "sensoriales", emoji: "👁️", etiquetaMenu: "Programas sensoriales", tono: "flamenco",
    titulo: "Programas sensoriales y educación ambiental",
    subtitulo: "Conocer la naturaleza con los cinco sentidos para aprender a cuidarla.",
    intro:
      "Los programas sensoriales son actividades que acercan a las personas al ambiente a través de la vista, el oído, el tacto y el olfato. Elige un sentido para ver las actividades que lo usan.",
    resumen:
      "Recorridos interpretativos, observación de aves, senderos educativos e identificación de sonidos y plantas convierten lo que aprendemos en experiencias que se recuerdan.",
    datos: [
      { valor: "483", texto: "especies de aves para observar en el estado", fuente: CONABIO_QR },
      { valor: "8", texto: "actividades sensoriales propuestas" },
      { valor: "4", texto: "sentidos principales: vista, oído, tacto y olfato" },
    ],
    frasesClave: [
      "Lo que se conoce, se quiere; lo que se quiere, se cuida.",
      "Aprender con los sentidos se recuerda mejor.",
      "Observar sin tocar, llevarse solo fotos y recuerdos.",
    ],
    guion:
      "Los programas sensoriales son actividades para conocer la naturaleza usando los sentidos: ver, oír, tocar y oler. Por ejemplo, recorridos guiados en Sian Ka'an, observar aves en Isla Contoy, reconocer árboles por la textura de su corteza en el Jardín Botánico de Puerto Morelos o identificar el rugido del saraguato.\n\nEstas experiencias generan conciencia ambiental porque lo que vivimos con los sentidos se nos queda grabado. Y como dice una frase muy conocida: lo que se conoce, se quiere, y lo que se quiere, se cuida.",
    visual: { foto: "tucan", ilustracion: { tipo: "especie", id: "tucan" } },
    preguntaRapida: { pregunta: "¿Qué árbol NO se debe tocar en los recorridos porque su savia irrita la piel?", respuesta: "El chechén. Por tradición, la corteza del chacá se usa para aliviar la irritación." },
  }),

  new Seccion({
    id: "conclusion", emoji: "🌱", etiquetaMenu: "Conclusión", tono: "selva", enMenu: false,
    titulo: "Conclusión: todo está conectado",
    subtitulo: "Cuidar Quintana Roo es tarea del gobierno y también nuestra.",
    resumen:
      "La selva protege el agua que se infiltra; esa agua viaja por cenotes y ríos subterráneos hasta el mar, donde está el arrecife. Lo que hacemos en tierra afecta al mar.",
    datos: [
      { valor: "💧", texto: "Ahorra agua y no tires nada al drenaje ni a los cenotes." },
      { valor: "🛍️", texto: "Evita plásticos de un solo uso." },
      { valor: "🌳", texto: "Planta especies nativas." },
      { valor: "🐢", texto: "Respeta las áreas protegidas y a la fauna." },
    ],
    frasesClave: [
      "Selva → cenote → mar → arrecife.",
      "Pequeñas acciones diarias, grandes efectos.",
    ],
    guion:
      "Para terminar: en Quintana Roo todo está conectado. La selva protege el agua que se filtra al subsuelo, esa agua viaja por los cenotes y termina en el mar, donde está el arrecife. Por eso lo que hacemos en tierra afecta al mar.\n\nCuidar el estado es tarea del gobierno, pero también nuestra: ahorrar agua, no tirar basura, evitar plásticos desechables, plantar especies nativas, respetar las áreas protegidas y visitar la naturaleza sin dañarla. Muchas gracias por su atención. ¿Tienen alguna pregunta?",
    visual: { foto: "tortuga-verde", ilustracion: { tipo: "especie", id: "tortuga-verde" } },
  }),
];

/** Acceso rápido a una sección por su id. */
const seccionPorId = (id) => SECCIONES.find((s) => s.id === id);
