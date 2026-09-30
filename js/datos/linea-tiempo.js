/* ==========================================================================
   linea-tiempo.js — conservación y eventos ambientales en Quintana Roo.
   tipo: "proteccion" | "huracan" | "ciencia" | "ley"
   ========================================================================== */
"use strict";

const LINEA_TIEMPO = [
  new EventoTiempo({ anio: 1981, tipo: "proteccion", titulo: "Parque Nacional Tulum", texto: "Se protege la zona costera alrededor de la ciudad maya de Tulum." }),
  new EventoTiempo({ anio: 1986, tipo: "proteccion", titulo: "Nace Sian Ka'an", texto: "Se decreta la Reserva de la Biósfera Sian Ka'an." }),
  new EventoTiempo({ anio: 1987, tipo: "proteccion", titulo: "Patrimonio Mundial", texto: "La UNESCO inscribe a Sian Ka'an en la Lista del Patrimonio Mundial." }),
  new EventoTiempo({ anio: 1988, tipo: "huracan", titulo: "Huracán Gilberto", texto: "Llega a la península como huracán de categoría 5 y causa grandes daños en la costa norte." }),
  new EventoTiempo({ anio: 1990, tipo: "ley", titulo: "Veda total de tortugas marinas", texto: "México prohíbe capturar tortugas marinas y aprovechar sus productos." }),
  new EventoTiempo({ anio: 1994, tipo: "proteccion", titulo: "Yum Balam y Uaymil", texto: "Se decretan como Áreas de Protección de Flora y Fauna." }),
  new EventoTiempo({ anio: 1996, tipo: "proteccion", titulo: "Protección de arrecifes", texto: "Se decretan Banco Chinchorro, Arrecifes de Cozumel y la costa occidental de Isla Mujeres, Punta Cancún y Punta Nizuc." }),
  new EventoTiempo({ anio: 1998, tipo: "proteccion", titulo: "Isla Contoy y Puerto Morelos", texto: "Se protegen Isla Contoy, el Arrecife de Puerto Morelos y los Arrecifes de Sian Ka'an." }),
  new EventoTiempo({ anio: 2005, tipo: "huracan", titulo: "Huracán Wilma", texto: "Pasa por Cozumel y el norte del estado como categoría 4. Registró 882 hPa, la presión más baja medida en el Atlántico." }),
  new EventoTiempo({ anio: 2007, tipo: "huracan", titulo: "Huracán Dean", texto: "Toca tierra como categoría 5 cerca de Mahahual, en el sur del estado." }),
  new EventoTiempo({ anio: 2008, tipo: "proteccion", titulo: "Manglares de Nichupté", texto: "Se protegen los manglares de la laguna de Cancún." }),
  new EventoTiempo({ anio: 2009, tipo: "proteccion", titulo: "Tiburón Ballena", texto: "Se crea la reserva de la biósfera para proteger su zona de alimentación." }),
  new EventoTiempo({ anio: 2016, tipo: "proteccion", titulo: "Caribe Mexicano", texto: "Se decreta la Reserva de la Biósfera Caribe Mexicano, con más de 5.7 millones de hectáreas." }),
  new EventoTiempo({ anio: 2018, tipo: "ciencia", titulo: "Sac Actun y síndrome blanco", texto: "Se confirma la conexión Sac Actun–Dos Ojos (347 km). Ese año se detecta en el Caribe mexicano el síndrome blanco, una enfermedad que mata corales." }),
  new EventoTiempo({ anio: 2019, tipo: "ley", titulo: "Adiós a los plásticos de un solo uso", texto: "Ley estatal de residuos; inicia la estrategia de la Marina contra el sargazo y el Derecho de Saneamiento Ambiental municipal." }),
  new EventoTiempo({ anio: 2022, tipo: "proteccion", titulo: "Área Jaguar en Tulum", texto: "Se decreta el Área de Protección de Flora y Fauna Jaguar (2,249 ha)." }),
  new EventoTiempo({ anio: 2024, tipo: "huracan", titulo: "Huracán Beryl", texto: "Toca tierra como categoría 2 al noreste de Tulum el 5 de julio." }),
];
