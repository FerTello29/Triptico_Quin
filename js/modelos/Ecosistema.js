/* ==========================================================================
   Ecosistema.js — modelo de un ecosistema de Quintana Roo.
   ========================================================================== */
"use strict";

class Ecosistema {
  constructor({ id, nombre, emoji, descripcion, caracteristicas, importancia, flora, fauna, amenazas, dondeVerlo, dato, foto }) {
    this.id = id;
    this.nombre = nombre;
    this.emoji = emoji;
    this.descripcion = descripcion;
    this.caracteristicas = caracteristicas;
    this.importancia = importancia;
    this.flora = flora;
    this.fauna = fauna;
    this.amenazas = amenazas;
    this.dondeVerlo = dondeVerlo;
    this.dato = dato;
    this.foto = foto;
  }

  /** Primera oración de la descripción: sirve para tarjetas y tríptico. */
  get resumenCorto() {
    const punto = this.descripcion.indexOf(". ");
    return punto > 0 ? this.descripcion.slice(0, punto + 1) : this.descripcion;
  }

  get textoAlternativo() {
    return `Ecosistema de ${this.nombre.toLowerCase()} en Quintana Roo`;
  }

  /** Imagen: fotografía real si hay conexión, ilustración si no. */
  renderVisual(clase = "") {
    return Visual.crear({
      foto: this.foto,
      ilustracion: Ilustraciones.ecosistema(this.id, this.textoAlternativo),
      alt: this.textoAlternativo,
      clase,
    });
  }

  renderTarjeta() {
    return `<article class="tarjeta-eco" data-eco="${this.id}">
      ${this.renderVisual("tarjeta-eco-visual")}
      <div class="tarjeta-eco-cuerpo">
        <h3><span aria-hidden="true">${this.emoji}</span> ${esc(this.nombre)}</h3>
        <p>${this.resumenCorto}</p>
        <p class="chips" aria-label="Especies representativas">${this.fauna.slice(0, 3).map((f) => `<span class="chip">${esc(f.split(" (")[0])}</span>`).join("")}</p>
        <button class="boton boton-linea" type="button" data-abrir-eco="${this.id}">Ver ficha completa <span aria-hidden="true">→</span></button>
      </div>
    </article>`;
  }

  renderDetalle() {
    const bloque = (titulo, icono, contenido, clase = "") =>
      `<section class="ficha-bloque ${clase}"><h4><span aria-hidden="true">${icono}</span> ${titulo}</h4>${contenido}</section>`;
    return `<div class="ficha">
      ${this.renderVisual("ficha-visual")}
      <p class="ficha-descripcion">${this.descripcion}</p>
      ${this.dato ? `<p class="ficha-dato"><strong>Dato:</strong> ${this.dato}</p>` : ""}
      <div class="ficha-rejilla">
        ${bloque("Características", "🔎", listaHTML(this.caracteristicas))}
        ${bloque("Importancia ecológica", "💚", `<p>${this.importancia}</p>`)}
        ${bloque("Flora representativa", "🌿", listaHTML(this.flora))}
        ${bloque("Fauna representativa", "🐾", listaHTML(this.fauna))}
        ${bloque("Principales amenazas", "⚠️", listaHTML(this.amenazas), "ficha-amenazas")}
        ${bloque("Dónde conocerlo", "📍", `<p>${this.dondeVerlo}</p>`)}
      </div>
    </div>`;
  }
}
