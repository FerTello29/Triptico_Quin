/* ==========================================================================
   Seccion.js — cada tema de la app (Ecosistemas, Biodiversidad, Hidrosfera…)
   es un objeto Seccion. La misma información alimenta tres vistas:
   la página, el Modo Exposición y el tríptico.
   ========================================================================== */
"use strict";

class Seccion {
  /**
   * @param {object} datos
   * @param {string} datos.id            identificador y ancla (#id)
   * @param {string} datos.emoji         icono del menú
   * @param {string} datos.titulo        título visible
   * @param {string} datos.etiquetaMenu  texto corto para el menú
   * @param {string} datos.subtitulo     frase de apoyo
   * @param {string} datos.intro         párrafo introductorio (página)
   * @param {string} datos.resumen       resumen para diapositiva
   * @param {Array}  datos.datos         [{valor, unidad, texto, fuente}]
   * @param {Array}  datos.frasesClave   frases cortas para exponer
   * @param {string} datos.guion         texto de "¿Qué puedo decir?"
   * @param {object} datos.visual        {foto, ilustracion:{tipo,id}, alt}
   * @param {object} datos.preguntaRapida {pregunta, respuesta}
   * @param {string} datos.tono          nombre de la paleta de la sección
   */
  constructor(datos) {
    Object.assign(this, {
      datos: [],
      frasesClave: [],
      guion: "",
      tono: "caribe",
      enMenu: true,
      enPresentacion: true,
    }, datos);
  }

  /** Enlace del menú de navegación. */
  get enlaceMenu() {
    return `<a href="#${this.id}" data-seccion="${this.id}"><span aria-hidden="true">${this.emoji}</span> ${esc(this.etiquetaMenu || this.titulo)}</a>`;
  }

  /** Encabezado común de cada sección de la página. */
  renderEncabezado(numero) {
    return `<header class="seccion-encabezado">
      <p class="eyebrow"><span aria-hidden="true">${this.emoji}</span> Tema ${numero}</p>
      <h2 id="titulo-${this.id}">${esc(this.titulo)}</h2>
      ${this.subtitulo ? `<p class="subtitulo">${this.subtitulo}</p>` : ""}
    </header>`;
  }

  /** Datos destacados (tarjetas pequeñas con cifra y fuente). */
  renderDatos(clase = "datos-destacados") {
    if (!this.datos.length) return "";
    return `<ul class="${clase}">${this.datos
      .map(
        (d) => `<li>
          <strong class="dato-valor">${d.valor}${d.unidad ? `<small> ${d.unidad}</small>` : ""}</strong>
          <span class="dato-texto">${d.texto}</span>
          ${d.fuente ? `<span class="dato-fuente">Fuente: ${esc(d.fuente)}</span>` : ""}
        </li>`
      )
      .join("")}</ul>`;
  }

  /** Bloque de "pregunta rápida" con respuesta que se revela. */
  renderPreguntaRapida() {
    if (!this.preguntaRapida) return "";
    const id = `pr-${this.id}`;
    return `<div class="pregunta-rapida">
      <p class="pr-etiqueta">Pregunta rápida</p>
      <p class="pr-pregunta">${this.preguntaRapida.pregunta}</p>
      <button class="boton boton-suave" type="button" aria-expanded="false" aria-controls="${id}" data-revelar="${id}">Ver respuesta</button>
      <p class="pr-respuesta" id="${id}" hidden>${this.preguntaRapida.respuesta}</p>
    </div>`;
  }

  /** Convierte la sección en una diapositiva para el Modo Exposición. */
  toDiapositiva() {
    return {
      id: this.id,
      emoji: this.emoji,
      titulo: this.titulo,
      subtitulo: this.subtitulo,
      resumen: this.resumen,
      datos: this.datos.slice(0, 4),
      frasesClave: this.frasesClave,
      guion: this.guion,
      visual: this.visual,
      tono: this.tono,
    };
  }
}
