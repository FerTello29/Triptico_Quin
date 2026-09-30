/* ==========================================================================
   Especie.js — modelo de una especie (flora o fauna) de Quintana Roo.
   La categoría de riesgo usa las claves oficiales de la NOM-059-SEMARNAT-2010:
   P = en peligro de extinción, A = amenazada, Pr = sujeta a protección especial.
   ========================================================================== */
"use strict";

class Especie {
  static CATEGORIAS = {
    P: { nombre: "En peligro de extinción", corto: "En peligro", clase: "riesgo-p" },
    A: { nombre: "Amenazada", corto: "Amenazada", clase: "riesgo-a" },
    Pr: { nombre: "Sujeta a protección especial", corto: "Protección especial", clase: "riesgo-pr" },
  };

  constructor({ id, nombre, cientifico, reino, grupo, descripcion, habitat, dato, nom059, otraProteccion, endemica, foto }) {
    this.id = id;
    this.nombre = nombre;
    this.cientifico = cientifico;
    this.reino = reino; // "fauna" | "flora"
    this.grupo = grupo; // mamífero, ave, reptil, árbol…
    this.descripcion = descripcion;
    this.habitat = habitat;
    this.dato = dato;
    this.nom059 = nom059 || null;
    this.otraProteccion = otraProteccion || "";
    this.endemica = endemica || "";
    this.foto = foto;
  }

  get enRiesgo() {
    return Boolean(this.nom059);
  }

  get categoria() {
    return this.nom059 ? Especie.CATEGORIAS[this.nom059] : null;
  }

  /** ¿Coincide con el filtro elegido en la galería? */
  coincideCon(filtro) {
    switch (filtro) {
      case "fauna":
      case "flora":
        return this.reino === filtro;
      case "riesgo":
        return this.enRiesgo;
      case "endemica":
        return Boolean(this.endemica);
      default:
        return true;
    }
  }

  renderInsignia() {
    if (!this.categoria) return `<span class="insignia insignia-libre">Sin categoría de riesgo</span>`;
    return `<span class="insignia ${this.categoria.clase}" title="NOM-059-SEMARNAT-2010: ${this.categoria.nombre}"><abbr title="${this.categoria.nombre}">${this.nom059}</abbr> ${this.categoria.corto}</span>`;
  }

  renderVisual(clase = "", enLinea = false) {
    return Visual.crear({
      foto: this.foto,
      ilustracion: Ilustraciones.especie(this.id, `${this.nombre} (${this.cientifico})`),
      alt: `${this.nombre}, ${this.cientifico}`,
      clase,
      enLinea,
    });
  }

  renderTarjeta() {
    return `<article class="tarjeta-especie" data-especie="${this.id}" data-reino="${this.reino}">
      <button class="tarjeta-especie-boton" type="button" data-abrir-especie="${this.id}" aria-label="Ver ficha de ${esc(this.nombre)}">
        ${this.renderVisual("tarjeta-especie-visual", true)}
        <span class="tarjeta-especie-texto">
          <span class="especie-nombre">${esc(this.nombre)}</span>
          <em class="especie-cientifico">${esc(this.cientifico)}</em>
          <span class="especie-desc">${this.descripcion}</span>
          <span class="especie-pie">${this.renderInsignia()}${this.endemica ? `<span class="insignia insignia-endemica">Endémica</span>` : ""}</span>
        </span>
      </button>
    </article>`;
  }

  renderDetalle() {
    return `<div class="ficha ficha-especie">
      ${this.renderVisual("ficha-visual ficha-visual-especie")}
      <p class="especie-cientifico-grande"><em>${esc(this.cientifico)}</em> · ${esc(this.grupo)}</p>
      <p>${this.renderInsignia()}${this.endemica ? ` <span class="insignia insignia-endemica">Endémica: ${esc(this.endemica)}</span>` : ""}</p>
      <p class="ficha-descripcion">${this.descripcion}</p>
      <dl class="ficha-lista">
        <div><dt>Dónde vive</dt><dd>${this.habitat}</dd></div>
        <div><dt>Dato interesante</dt><dd>${this.dato}</dd></div>
        <div><dt>Protección</dt><dd>${this.categoria ? `NOM-059-SEMARNAT-2010: <strong>${this.categoria.nombre} (${this.nom059})</strong>.` : "No está en la lista de especies en riesgo de la NOM-059-SEMARNAT-2010."} ${this.otraProteccion}</dd></div>
      </dl>
    </div>`;
  }
}
