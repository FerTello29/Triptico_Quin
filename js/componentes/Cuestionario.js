/* ==========================================================================
   Cuestionario.js — "🌱 ¿Cuánto aprendiste?" Muestra una pregunta a la vez,
   da retroalimentación inmediata y al final presenta el resultado.
   ========================================================================== */
"use strict";

class Cuestionario {
  constructor(preguntas, id) {
    this.preguntas = preguntas;
    this.id = id;
    this.reiniciarEstado();
  }

  reiniciarEstado() {
    this.indice = -1; // -1 = pantalla de inicio
    this.respuestas = []; // índices elegidos
    this.aciertos = 0;
  }

  get raiz() {
    return document.getElementById(this.id);
  }

  render() {
    return `<div class="cuestionario" id="${this.id}">
      <div class="cuestionario-barra" aria-hidden="true"><span></span></div>
      <div class="cuestionario-pantalla" tabindex="-1"></div>
    </div>`;
  }

  actualizarBarra() {
    const progreso = this.indice < 0 ? 0 : ((this.indice + (this.respuestas[this.indice] !== undefined ? 1 : 0)) / this.preguntas.length) * 100;
    $(".cuestionario-barra span", this.raiz).style.width = `${progreso}%`;
  }

  pantallaInicio() {
    return `<div class="cuestionario-inicio">
      <p class="cuestionario-emoji" aria-hidden="true">🌱</p>
      <h3>${this.preguntas.length} preguntas sobre Quintana Roo</h3>
      <p>Responde una por una. Después de cada respuesta verás si acertaste y por qué. Al final obtendrás tu calificación.</p>
      <button type="button" class="boton boton-primario" data-q="iniciar">Comenzar cuestionario</button>
    </div>`;
  }

  pantallaPregunta() {
    const p = this.preguntas[this.indice];
    return `${p.render(this.indice + 1, this.preguntas.length)}
      <div class="cuestionario-acciones">
        <span class="cuestionario-puntos">Aciertos: <strong>${this.aciertos}</strong></span>
        <button type="button" class="boton boton-primario" data-q="siguiente" hidden>${this.indice === this.preguntas.length - 1 ? "Ver resultado" : "Siguiente pregunta"} <span aria-hidden="true">→</span></button>
      </div>`;
  }

  get mensajeFinal() {
    const porcentaje = (this.aciertos / this.preguntas.length) * 100;
    if (porcentaje === 100) return { emoji: "🏆", texto: "¡Perfecto! Dominas el tema. Estás listo para exponer." };
    if (porcentaje >= 80) return { emoji: "🌟", texto: "¡Muy bien! Conoces muy bien los ecosistemas de Quintana Roo." };
    if (porcentaje >= 60) return { emoji: "🌿", texto: "Bien. Repasa las preguntas que fallaste y vuelve a intentarlo." };
    return { emoji: "🌱", texto: "Vas empezando. Revisa las secciones de la app y vuelve a intentarlo." };
  }

  pantallaResultado() {
    const total = this.preguntas.length;
    const calificacion = ((this.aciertos / total) * 10).toFixed(1);
    const { emoji, texto } = this.mensajeFinal;
    const revision = this.preguntas
      .map((p, i) => {
        const bien = p.verificar(this.respuestas[i]);
        return `<li class="${bien ? "rev-bien" : "rev-mal"}"><span aria-hidden="true">${bien ? "✅" : "❌"}</span> <span class="sr-only">${bien ? "Correcta" : "Incorrecta"}:</span> ${p.enunciado} <em>Respuesta: ${p.respuestaCorrecta}</em></li>`;
      })
      .join("");
    return `<div class="cuestionario-resultado">
      <p class="cuestionario-emoji" aria-hidden="true">${emoji}</p>
      <h3>Obtuviste ${this.aciertos} de ${total} aciertos</h3>
      <p class="calificacion">Calificación: <strong>${calificacion}</strong> / 10</p>
      <p>${texto}</p>
      <details class="revision"><summary>Revisar mis respuestas</summary><ol>${revision}</ol></details>
      <button type="button" class="boton boton-primario" data-q="reiniciar">Intentar de nuevo</button>
    </div>`;
  }

  mostrar() {
    const pantalla = $(".cuestionario-pantalla", this.raiz);
    if (this.indice < 0) pantalla.innerHTML = this.pantallaInicio();
    else if (this.indice >= this.preguntas.length) pantalla.innerHTML = this.pantallaResultado();
    else pantalla.innerHTML = this.pantallaPregunta();
    this.actualizarBarra();
  }

  responder(opcion) {
    if (this.respuestas[this.indice] !== undefined) return;
    const pregunta = this.preguntas[this.indice];
    const correcta = pregunta.verificar(opcion);
    this.respuestas[this.indice] = opcion;
    if (correcta) this.aciertos += 1;
    const pantalla = $(".cuestionario-pantalla", this.raiz);
    $$(".opcion", pantalla).forEach((boton) => {
      const i = Number(boton.dataset.opcion);
      boton.disabled = true;
      if (i === pregunta.correcta) boton.classList.add("correcta");
      if (i === opcion && !correcta) boton.classList.add("incorrecta");
    });
    $(".retro", pantalla).innerHTML = `<strong>${correcta ? "✅ ¡Correcto!" : "❌ No es correcto."}</strong> ${pregunta.explicacion}`;
    $(".cuestionario-puntos strong", pantalla).textContent = this.aciertos;
    const siguiente = $('[data-q="siguiente"]', pantalla);
    siguiente.hidden = false;
    siguiente.focus();
    this.actualizarBarra();
  }

  conectar() {
    this.mostrar();
    this.raiz.addEventListener("click", (evento) => {
      const opcion = evento.target.closest(".opcion");
      if (opcion) return this.responder(Number(opcion.dataset.opcion));
      const accion = evento.target.closest("[data-q]");
      if (!accion) return;
      const tipo = accion.dataset.q;
      if (tipo === "iniciar") this.indice = 0;
      if (tipo === "siguiente") this.indice += 1;
      if (tipo === "reiniciar") {
        this.reiniciarEstado();
        this.indice = 0;
      }
      this.mostrar();
      const pantalla = $(".cuestionario-pantalla", this.raiz);
      const primero = $(".opcion, [data-q]", pantalla);
      if (primero) primero.focus({ preventScroll: true });
      pantalla.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "nearest" });
    });
  }
}
