/* ==========================================================================
   fotos.js — fotografías reales opcionales de Wikimedia Commons.
   Solo se guarda el NOMBRE del archivo. Al abrir la app con internet,
   GaleriaFotos consulta la API pública de Wikimedia Commons, obtiene la
   imagen, el autor y la licencia, y muestra el crédito automáticamente.
   Si no hay internet (o la foto no existe) se muestra la ilustración original.

   Para cambiar una foto: busca en https://commons.wikimedia.org, copia el
   nombre exacto del archivo (sin "File:") y pégalo aquí.
   ========================================================================== */
"use strict";

const FOTOS = {
  // Portada y ecosistemas
  portada: "Beach and Ruins at Tulum.jpg",
  selva: "Selva tropical.jpg",
  manglar: "México - Sian Ka'an, Mangles 2.JPG",
  arrecife: "Arrecifes de Cozumel National Park.jpg",
  dunas: "Paisaje del sendero de las dunas Parque Nacional Isla COntoy.jpg",
  humedales: "Biósfera de Sian Kaan Quintana Roo.JPG",
  lagunas: "Laguna de Bacalar.JPG",
  playas: "Caribbean near Tulum.jpg",
  cenotes: "Cenote Dos Ojos, México - panoramio.jpg",
  granCenote: "Gran Cenote Tulum (125162155).jpeg",
  islaContoy: "Parque Nacional Isla Contoy, Quintana Roo.jpg",

  // Fauna
  jaguar: "Jaguar (Panthera onca palustris) female Piquiri River 2.JPG",
  manati: "West Indian Manatee Manatí Antillano (5839912351).jpg",
  "tortuga-verde": "GreenSeaTurtlesAkumalCancunMexico05.JPG",
  flamenco: "American Flamingo - Phoenicopterus ruber.jpg",
  "tiburon-ballena": "Whale shark at Isla Mujeres.jpg",
  "mono-arana": "Geoffroy's Spider Monkey in tree at Tikal.jpg",
  "pavo-ocelado": "Ocellated Turkey SMTC.jpg",
  cocodrilo: "Crocodile de Morelet.jpeg",
  tucan: "Ramphastos sulfuratus (keel-billed toucan).jpg",
  "mapache-cozumel": "Cozumel Raccoon1.jpg",
  "loro-yucateco": "Amazona xantholora -Xcaret Eco Park -Mexico-8a.jpg",
  "coral-cuerno-alce": "Acropora palmata (Elkhorn coral).jpg",

  // Flora
  ceiba: "Sacred Mayan Ceiba Tree.jpg",
  chicozapote: "Manilkara zapota - Nispero fruit and leaves 01.jpg",
  "mangle-rojo": "Rhizophora mangle (prop roots).jpg",
  "palma-chit": "Thrinax radiata (green thatch palm) 7.jpg",
  caoba: "Swietenia macrophylla (30680883066).jpg",
  "pasto-marino": "Green Sea Turtle grazing seagrass.jpg",
};
