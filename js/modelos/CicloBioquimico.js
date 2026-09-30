/* ==========================================================================
   CicloBioquimico.js — modelo de un ciclo biogeoquímico con su diagrama
   circular interactivo (cada etapa se puede seleccionar con clic o teclado).
   ========================================================================== */
"use strict";

class CicloBioquimico {
  constructor({ id, nombre, simbolo, emoji, color, colorSuave, explicacion, etapas, relacionQRoo, impactoHumano, frase }) {
    this.id = id;
    this.nombre = nombre;
    this.simbolo = simbolo; // texto corto para el centro del diagrama
    this.emoji = emoji;
    this.color = color;
    this.colorSuave = colorSuave;
    this.explicacion = explicacion;
    this.etapas = etapas; // [{nombre, icono, texto}]
    this.relacionQRoo = relacionQRoo;
    this.impactoHumano = impactoHumano;
    this.frase = frase;
  }

  /** Posición de la etapa i alrededor del círculo (empieza arriba). */
  posicion(i, radio = 128, centro = 180) {
    const angulo = (-Math.PI / 2) + (2 * Math.PI * i) / this.etapas.length;
    return { x: centro + radio * Math.cos(angulo), y: centro + radio * Math.sin(angulo), angulo };
  }

  /** Diagrama SVG circular con flechas animadas entre etapas. */
  renderDiagrama(activa = 0) {
    const n = this.etapas.length;
    const u = idUnico("ciclo");
    const R = 128;
    const flechas = this.etapas
      .map((_, i) => {
        const a1 = (-Math.PI / 2) + (2 * Math.PI * i) / n + 0.34;
        const a2 = (-Math.PI / 2) + (2 * Math.PI * (i + 1)) / n - 0.34;
        const p1 = { x: 180 + R * Math.cos(a1), y: 180 + R * Math.sin(a1) };
        const p2 = { x: 180 + R * Math.cos(a2), y: 180 + R * Math.sin(a2) };
        return `<path class="ciclo-flecha" d="M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A${R} ${R} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}" marker-end="url(#punta-${u})"/>`;
      })
      .join("");
    const nodos = this.etapas
      .map((etapa, i) => {
        const { x, y } = this.posicion(i, R);
        const lado = Math.abs(x - 180) > 60; // nodos de los costados
        const derecha = x > 180;
        const tx = lado ? x + (derecha ? 38 : -38) : x;
        const ty = lado ? y + 5 : (y > 180 ? y + 50 : y - 40);
        const ancla = lado ? (derecha ? "start" : "end") : "middle";
        return `<g class="ciclo-nodo${i === activa ? " activo" : ""}" data-etapa="${i}" tabindex="0" role="button" aria-pressed="${i === activa}" aria-label="Etapa ${i + 1}: ${esc(etapa.nombre)}">
          <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="30"/>
          <text class="ciclo-nodo-icono" x="${x.toFixed(1)}" y="${(y + 8).toFixed(1)}" text-anchor="middle">${etapa.icono}</text>
          <text class="ciclo-nodo-texto" x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${ancla}">${esc(etapa.nombre)}</text>
        </g>`;
      })
      .join("");
    return `<svg class="ciclo-diagrama" viewBox="-135 -14 630 394" style="--ciclo:${this.color};--ciclo-suave:${this.colorSuave}" role="group" aria-label="Diagrama del ${esc(this.nombre.toLowerCase())}" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="punta-${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="ciclo-punta"/></marker></defs>
      <circle cx="180" cy="180" r="${R}" class="ciclo-pista"/>
      ${flechas}
      <circle cx="180" cy="180" r="62" class="ciclo-centro"/>
      <text x="180" y="176" text-anchor="middle" class="ciclo-simbolo">${this.simbolo}</text>
      <text x="180" y="200" text-anchor="middle" class="ciclo-centro-texto">${esc(this.nombre.replace("Ciclo del ", "").replace("Ciclo de ", ""))}</text>
      ${nodos}
    </svg>`;
  }

  /** Explicación de la etapa seleccionada. */
  renderEtapa(i) {
    const etapa = this.etapas[i];
    return `<p class="etapa-numero">Etapa ${i + 1} de ${this.etapas.length}</p>
      <h4><span aria-hidden="true">${etapa.icono}</span> ${esc(etapa.nombre)}</h4>
      <p>${etapa.texto}</p>`;
  }

  /** Panel completo del ciclo (diagrama + textos). */
  render() {
    return `<div class="ciclo" data-ciclo="${this.id}" style="--ciclo:${this.color};--ciclo-suave:${this.colorSuave}">
      <div class="ciclo-visual">
        ${this.renderDiagrama(0)}
        <div class="ciclo-etapa" aria-live="polite">${this.renderEtapa(0)}</div>
      </div>
      <div class="ciclo-texto">
        <p class="ciclo-explicacion">${this.explicacion}</p>
        <h4>Etapas principales</h4>
        <ol class="ciclo-etapas">${this.etapas.map((e, i) => `<li><button type="button" class="enlace-etapa" data-etapa="${i}">${e.icono} ${esc(e.nombre)}</button></li>`).join("")}</ol>
        <h4>En Quintana Roo</h4>
        <p>${this.relacionQRoo}</p>
        <h4>Impacto de las actividades humanas</h4>
        <p>${this.impactoHumano}</p>
      </div>
    </div>`;
  }

  /** Conecta los clics y el teclado del diagrama. */
  conectar(raiz) {
    const seleccionar = (i) => {
      $$(".ciclo-nodo", raiz).forEach((nodo) => {
        const activo = Number(nodo.dataset.etapa) === i;
        nodo.classList.toggle("activo", activo);
        nodo.setAttribute("aria-pressed", String(activo));
      });
      $(".ciclo-etapa", raiz).innerHTML = this.renderEtapa(i);
    };
    raiz.addEventListener("click", (evento) => {
      const objetivo = evento.target.closest("[data-etapa]");
      if (objetivo) seleccionar(Number(objetivo.dataset.etapa));
    });
    raiz.addEventListener("keydown", (evento) => {
      const nodo = evento.target.closest(".ciclo-nodo");
      if (!nodo) return;
      const i = Number(nodo.dataset.etapa);
      const n = this.etapas.length;
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        seleccionar(i);
      } else if (evento.key === "ArrowRight" || evento.key === "ArrowDown") {
        evento.preventDefault();
        const siguiente = $(`.ciclo-nodo[data-etapa="${(i + 1) % n}"]`, raiz);
        siguiente.focus();
        seleccionar((i + 1) % n);
      } else if (evento.key === "ArrowLeft" || evento.key === "ArrowUp") {
        evento.preventDefault();
        const anterior = $(`.ciclo-nodo[data-etapa="${(i - 1 + n) % n}"]`, raiz);
        anterior.focus();
        seleccionar((i - 1 + n) % n);
      }
    });
  }
}
