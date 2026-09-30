/* ==========================================================================
   ciclos.js — ciclos biogeoquímicos (también llamados ciclos bioquímicos).
   ========================================================================== */
"use strict";

const CICLOS = [
  new CicloBioquimico({
    id: "agua",
    nombre: "Ciclo del agua",
    simbolo: "H₂O",
    emoji: "💧",
    color: "#1f8fc7",
    colorSuave: "#d8f0fa",
    explicacion:
      "El agua se mueve sin parar entre el mar, el aire, la tierra y los seres vivos. Cambia de estado (líquido, vapor) pero la cantidad total en el planeta se mantiene.",
    etapas: [
      { nombre: "Evaporación", icono: "☀️", texto: "El sol calienta el Mar Caribe, las lagunas y los cenotes abiertos; el agua se convierte en vapor. Las plantas de la selva también liberan vapor por sus hojas (transpiración)." },
      { nombre: "Condensación", icono: "☁️", texto: "El vapor sube, se enfría y forma nubes. Los vientos del este traen humedad del mar hacia la península." },
      { nombre: "Precipitación", icono: "🌧️", texto: "El agua cae como lluvia, sobre todo en verano y otoño. En Quintana Roo llueven entre 800 y 1,500 mm al año, según la zona (INEGI)." },
      { nombre: "Infiltración", icono: "⬇️", texto: "Como la roca caliza es porosa, la lluvia se filtra rápido al subsuelo. Por eso casi no hay ríos en la superficie." },
      { nombre: "Flujo subterráneo", icono: "💧", texto: "El agua viaja por ríos subterráneos y cuevas inundadas; los cenotes son ventanas a este sistema." },
      { nombre: "Descarga al mar", icono: "🌊", texto: "El agua subterránea sale al mar por manantiales costeros y “ojos de agua”, y el ciclo vuelve a empezar." },
    ],
    relacionQRoo:
      "La selva devuelve humedad al aire y protege la calidad del agua que se infiltra; los cenotes, las lagunas y el arrecife están conectados por el mismo flujo. Lo que se tira en tierra puede llegar al mar a través del subsuelo.",
    impactoHumano:
      "La deforestación reduce la transpiración y deja el suelo expuesto; el pavimento impide la infiltración; las aguas residuales y los basureros contaminan el acuífero; y extraer más agua de la que se recarga puede provocar que el agua salada suba (intrusión salina).",
    frase: "En Quintana Roo los ríos corren bajo tierra.",
  }),

  new CicloBioquimico({
    id: "carbono",
    nombre: "Ciclo del carbono",
    simbolo: "C",
    emoji: "🌳",
    color: "#2f7d4f",
    colorSuave: "#dff1e4",
    explicacion:
      "El carbono pasa del aire a los seres vivos, al suelo, a las rocas y al océano, y regresa al aire. Es el elemento base de la vida y forma parte del dióxido de carbono (CO₂), un gas de efecto invernadero.",
    etapas: [
      { nombre: "Fotosíntesis", icono: "🌿", texto: "La selva, los manglares, los pastos marinos y el fitoplancton toman CO₂ del aire o del agua y lo convierten en azúcares y madera." },
      { nombre: "Cadena alimenticia", icono: "🐒", texto: "Los animales obtienen carbono al comer plantas o a otros animales; por ejemplo, la tortuga verde al comer pastos marinos." },
      { nombre: "Respiración", icono: "💨", texto: "Plantas, animales y microorganismos respiran y devuelven CO₂ al ambiente." },
      { nombre: "Descomposición", icono: "🍂", texto: "Hongos y bacterias degradan hojas y restos; parte del carbono queda guardado en el suelo, sobre todo en el lodo del manglar." },
      { nombre: "Almacenamiento", icono: "🪨", texto: "Los corales y las conchas fijan carbono en su esqueleto de carbonato de calcio; con millones de años eso formó la roca caliza de la península." },
      { nombre: "Combustión", icono: "🔥", texto: "La quema de gasolina, diésel y gas, y los incendios forestales, liberan rápidamente carbono que estaba guardado." },
    ],
    relacionQRoo:
      "Los manglares y los pastos marinos guardan “carbono azul” en sus suelos. La roca caliza sobre la que está el estado es carbono almacenado durante millones de años por organismos marinos.",
    impactoHumano:
      "Talar selva o rellenar manglares libera el carbono guardado. El CO₂ extra calienta el planeta y, al disolverse en el mar, lo vuelve más ácido, lo que dificulta que los corales construyan su esqueleto.",
    frase: "El manglar es una bodega de carbono.",
  }),

  new CicloBioquimico({
    id: "nitrogeno",
    nombre: "Ciclo del nitrógeno",
    simbolo: "N",
    emoji: "🫘",
    color: "#7b4fc9",
    colorSuave: "#ece4fa",
    explicacion:
      "El nitrógeno forma 78 % del aire, pero las plantas no pueden usarlo directamente. Unas bacterias lo transforman en compuestos que sí pueden aprovechar; así llega a las proteínas de todos los seres vivos.",
    etapas: [
      { nombre: "Nitrógeno del aire", icono: "🌬️", texto: "El nitrógeno (N₂) está en la atmósfera, pero es un gas muy estable." },
      { nombre: "Fijación", icono: "🦠", texto: "Bacterias del suelo y de las raíces de las leguminosas (como el tzalam y el huaxín de la selva) y cianobacterias del mar lo convierten en amonio." },
      { nombre: "Nitrificación", icono: "🧪", texto: "Otras bacterias transforman el amonio en nitratos, la forma que absorben la mayoría de las plantas." },
      { nombre: "Asimilación", icono: "🌱", texto: "Las plantas toman los nitratos por sus raíces y los usan para formar proteínas; los animales los obtienen al comer." },
      { nombre: "Descomposición", icono: "🍂", texto: "Al morir los seres vivos, los descomponedores devuelven el nitrógeno al suelo como amonio." },
      { nombre: "Desnitrificación", icono: "↩️", texto: "En suelos inundados, como humedales y manglares, algunas bacterias devuelven el nitrógeno al aire." },
    ],
    relacionQRoo:
      "Las leguminosas enriquecen los suelos delgados de la selva. Los humedales y manglares funcionan como filtros que retiran el exceso de nitrógeno antes de que llegue al mar.",
    impactoHumano:
      "Las aguas residuales mal tratadas y los fertilizantes agregan nitrógeno al acuífero y al mar. Ese exceso hace crecer demasiadas algas (eutrofización), que compiten con los corales y enturbian lagunas como Bacalar.",
    frase: "Demasiado nutriente también contamina.",
  }),

  new CicloBioquimico({
    id: "oxigeno",
    nombre: "Ciclo del oxígeno",
    simbolo: "O₂",
    emoji: "🫧",
    color: "#0f9aa0",
    colorSuave: "#d6f3f2",
    explicacion:
      "El oxígeno circula entre la atmósfera, el agua y los seres vivos. Está muy unido al ciclo del carbono: la fotosíntesis produce oxígeno y la respiración lo consume.",
    etapas: [
      { nombre: "Fotosíntesis", icono: "🌿", texto: "La selva, los manglares, los pastos marinos, las algas y el fitoplancton liberan oxígeno al aire y al agua." },
      { nombre: "Oxígeno en aire y agua", icono: "🫧", texto: "El oxígeno queda en la atmósfera y disuelto en el mar, las lagunas y los cenotes; los peces lo toman con sus branquias." },
      { nombre: "Respiración", icono: "🫁", texto: "Personas, animales, plantas y microorganismos usan oxígeno para obtener energía y liberan CO₂." },
      { nombre: "Descomposición", icono: "🍂", texto: "Las bacterias que descomponen la materia orgánica también consumen oxígeno." },
      { nombre: "Combustión", icono: "🔥", texto: "El fuego y los motores consumen oxígeno al quemar combustibles o vegetación." },
      { nombre: "Capa de ozono", icono: "🛡️", texto: "En la estratosfera, parte del oxígeno forma ozono (O₃), que filtra la radiación ultravioleta del Sol." },
    ],
    relacionQRoo:
      "Las praderas de pastos marinos y las algas oxigenan el agua de lagunas y costas; el oxígeno disuelto es indispensable para los peces del arrecife y para la fauna de los cenotes.",
    impactoHumano:
      "Cuando llegan muchas aguas residuales o se pudren grandes cantidades de sargazo, las bacterias gastan el oxígeno del agua y se forman zonas con muy poco oxígeno (hipoxia) donde mueren peces. La deforestación reduce la producción local de oxígeno.",
    frase: "Sin oxígeno disuelto, el arrecife se asfixia.",
  }),
];
