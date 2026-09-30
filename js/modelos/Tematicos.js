/* ==========================================================================
   Tematicos.js — modelos pequeños para las secciones de actividades humanas,
   acciones de gobierno, programas sensoriales, línea del tiempo y fuentes.
   ========================================================================== */
"use strict";

/** Actividad humana → impacto → consecuencia → posible solución. */
class ActividadHumana {
  constructor({ id, nombre, emoji, impacto, consecuencia, solucion, ejemplo }) {
    Object.assign(this, { id, nombre, emoji, impacto, consecuencia, solucion, ejemplo });
  }

  renderFila() {
    const celda = (clase, etiqueta, texto) =>
      `<div class="cadena-paso ${clase}"><span class="cadena-etiqueta">${etiqueta}</span><p>${texto}</p></div>`;
    return `<li class="cadena" data-actividad="${this.id}">
      <div class="cadena-paso cadena-actividad"><span class="cadena-emoji" aria-hidden="true">${this.emoji}</span><h3>${esc(this.nombre)}</h3></div>
      ${celda("cadena-impacto", "Impacto ambiental", this.impacto)}
      ${celda("cadena-consecuencia", "Consecuencia", this.consecuencia)}
      ${celda("cadena-solucion", "Posible solución", this.solucion)}
      ${this.ejemplo ? `<p class="cadena-ejemplo"><strong>En Quintana Roo:</strong> ${this.ejemplo}</p>` : ""}
    </li>`;
  }
}

/** Acción de gobierno clasificada por nivel (federal, estatal, municipal). */
class AccionGobierno {
  static NIVELES = {
    federal: { nombre: "Federal", descripcion: "Gobierno de México" },
    estatal: { nombre: "Estatal", descripcion: "Gobierno de Quintana Roo" },
    municipal: { nombre: "Municipal", descripcion: "Los 11 ayuntamientos" },
  };

  constructor({ nivel, institucion, accion, temas, detalle, fuente }) {
    Object.assign(this, { nivel, institucion, accion, temas, detalle, fuente });
  }

  renderTarjeta() {
    return `<article class="accion" data-nivel="${this.nivel}">
      <p class="accion-institucion">${esc(this.institucion)}</p>
      <h4>${this.accion}</h4>
      <p>${this.detalle}</p>
      <p class="chips">${this.temas.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</p>
      ${this.fuente ? `<p class="accion-fuente">Referencia: ${this.fuente}</p>` : ""}
    </article>`;
  }
}

/** Actividad de educación ambiental basada en los sentidos. */
class ProgramaSensorial {
  constructor({ id, nombre, emoji, sentidos, descripcion, comoGeneraConciencia, dondeHacerlo, tipo }) {
    Object.assign(this, { id, nombre, emoji, sentidos, descripcion, comoGeneraConciencia, dondeHacerlo, tipo });
  }

  usaSentido(sentido) {
    return sentido === "todos" || this.sentidos.includes(sentido);
  }

  renderTarjeta() {
    const iconos = { vista: "👁️", oido: "👂", tacto: "✋", olfato: "👃", gusto: "👅" };
    return `<article class="sensorial" data-sensorial="${this.id}">
      <div class="sensorial-cabeza"><span class="sensorial-emoji" aria-hidden="true">${this.emoji}</span><h3>${esc(this.nombre)}</h3></div>
      <p class="sensorial-sentidos" aria-label="Sentidos que se usan">${this.sentidos.map((s) => `<span title="${s}">${iconos[s]}</span>`).join("")}</p>
      <p>${this.descripcion}</p>
      <p class="sensorial-conciencia"><strong>Genera conciencia porque:</strong> ${this.comoGeneraConciencia}</p>
      <p class="sensorial-donde"><strong>${this.tipo === "real" ? "Dónde se hace" : "Dónde se puede hacer"}:</strong> ${this.dondeHacerlo}</p>
    </article>`;
  }
}

/** Evento de la línea del tiempo. */
class EventoTiempo {
  constructor({ anio, titulo, texto, tipo }) {
    Object.assign(this, { anio, titulo, texto, tipo });
  }
}

/** Fuente de información consultada. */
class Fuente {
  constructor({ institucion, titulo, anio, url, tipo, usadaPara }) {
    Object.assign(this, { institucion, titulo, anio, url, tipo, usadaPara });
  }

  renderItem() {
    return `<li class="fuente">
      <p class="fuente-institucion">${esc(this.institucion)}${this.anio ? ` (${this.anio})` : ""}</p>
      <p class="fuente-titulo"><a href="${this.url}" target="_blank" rel="noopener">${esc(this.titulo)}</a></p>
      ${this.usadaPara ? `<p class="fuente-uso">Usada para: ${this.usadaPara}</p>` : ""}
    </li>`;
  }

  /** Formato breve para el tríptico impreso. */
  get citaCorta() {
    return `${this.institucion}${this.anio ? ` (${this.anio})` : ""}. ${this.titulo}.`;
  }
}
