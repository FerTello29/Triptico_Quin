/* ==========================================================================
   Pregunta.js — una pregunta de opción múltiple del cuestionario.
   ========================================================================== */
"use strict";

class Pregunta {
  constructor({ enunciado, opciones, correcta, explicacion, tema }) {
    this.enunciado = enunciado;
    this.opciones = opciones;
    this.correcta = correcta; // índice de la opción correcta
    this.explicacion = explicacion;
    this.tema = tema;
  }

  /** Devuelve true si el índice elegido es el correcto. */
  verificar(indice) {
    return indice === this.correcta;
  }

  get respuestaCorrecta() {
    return this.opciones[this.correcta];
  }

  render(numero, total) {
    const letras = ["A", "B", "C", "D"];
    return `<fieldset class="pregunta" data-numero="${numero}">
      <legend><span class="pregunta-numero">Pregunta ${numero} de ${total}</span>${this.enunciado}</legend>
      <div class="opciones">${this.opciones
        .map(
          (opcion, i) => `<button type="button" class="opcion" data-opcion="${i}">
            <span class="opcion-letra" aria-hidden="true">${letras[i]}</span><span>${opcion}</span>
          </button>`
        )
        .join("")}</div>
      <p class="retro" aria-live="polite"></p>
    </fieldset>`;
  }
}
