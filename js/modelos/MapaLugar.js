/* ==========================================================================
   MapaLugar.js — un punto del mapa interactivo (área protegida, cenote,
   arrecife, manglar o laguna) con coordenadas geográficas aproximadas.
   ========================================================================== */
"use strict";

class MapaLugar {
  static CATEGORIAS = {
    biosfera: { nombre: "Reserva de la biósfera", color: "#7b4fc9", icono: "🌎" },
    anp: { nombre: "Otra área natural protegida", color: "#2f8f4e", icono: "🌳" },
    arrecife: { nombre: "Arrecife", color: "#e8594f", icono: "🪸" },
    cenote: { nombre: "Cenote / sistema subterráneo", color: "#1a9fc0", icono: "💧" },
    manglar: { nombre: "Manglar", color: "#1f6f5c", icono: "🌿" },
    laguna: { nombre: "Laguna o bahía", color: "#2f6fd1", icono: "🏝️" },
  };

  constructor({ id, nombre, categoria, lat, lon, nivel, decreto, superficie, descripcion, importancia }) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.lat = lat;
    this.lon = lon;
    this.nivel = nivel; // "Federal (CONANP)", "Estatal (IBANQROO)" o "—"
    this.decreto = decreto;
    this.superficie = superficie;
    this.descripcion = descripcion;
    this.importancia = importancia;
  }

  get infoCategoria() {
    return MapaLugar.CATEGORIAS[this.categoria];
  }

  get color() {
    return this.infoCategoria.color;
  }

  /** Convierte latitud/longitud a coordenadas del SVG del mapa. */
  proyectar({ lonMin, latMax, cos, k }) {
    return { x: (this.lon - lonMin) * cos * k, y: (latMax - this.lat) * k };
  }

  renderMarcador(proyeccion) {
    const { x, y } = this.proyectar(proyeccion);
    return `<g class="marcador" data-lugar="${this.id}" data-categoria="${this.categoria}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" tabindex="0" role="button" aria-label="${esc(this.nombre)} (${esc(this.infoCategoria.nombre)})">
      <circle class="marcador-halo" r="28" fill="${this.color}"/>
      <circle class="marcador-punto" r="14" fill="${this.color}"/>
      <circle r="5" fill="#ffffff" pointer-events="none"/>
    </g>`;
  }

  renderInfo() {
    const filas = [
      ["Tipo", this.infoCategoria.nombre],
      this.nivel ? ["Administración", this.nivel] : null,
      this.decreto ? ["Protegida desde", this.decreto] : null,
      this.superficie ? ["Superficie", this.superficie] : null,
    ].filter(Boolean);
    return `<p class="mapa-info-cat" style="--cat:${this.color}"><span aria-hidden="true">${this.infoCategoria.icono}</span> ${esc(this.infoCategoria.nombre)}</p>
      <h3>${esc(this.nombre)}</h3>
      <p>${this.descripcion}</p>
      <dl class="mapa-info-datos">${filas.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join("")}</dl>
      ${this.importancia ? `<p class="mapa-info-importancia"><strong>¿Por qué importa?</strong> ${this.importancia}</p>` : ""}`;
  }
}
