/* ==========================================================================
   Presentacion.js — "🎤 Modo Exposición": convierte cada sección en una
   diapositiva a pantalla completa, con guion de apoyo, cronómetro,
   índice de temas, teclado, gestos táctiles y pantalla completa.
   ========================================================================== */
"use strict";

class Presentacion {
  constructor(secciones, contenedorId = "presentacion") {
    this.diapositivas = secciones.filter((s) => s.enPresentacion).map((s) => s.toDiapositiva());
    this.contenedor = document.getElementById(contenedorId);
    this.actual = 0;
    this.abierta = false;
    this.inicioCronometro = 0;
    this.intervalo = null;
    this.origenFoco = null;
    this.teclado = this.teclado.bind(this);
  }

  /* -------------------- Marcado -------------------- */
  renderMarco() {
    const total = this.diapositivas.length;
    this.contenedor.innerHTML = `
      <div class="pres-barra">
        <p class="pres-marca"><span aria-hidden="true">🎤</span> Modo Exposición</p>
        <p class="pres-contador" aria-live="polite">Diapositiva <strong class="pres-actual">1</strong> de ${total}</p>
        <p class="pres-cronometro" title="Tiempo transcurrido"><span aria-hidden="true">⏱</span> <span class="pres-tiempo">00:00</span></p>
        <div class="pres-herramientas">
          <button type="button" class="pres-boton" data-pres="indice" aria-expanded="false" aria-controls="pres-indice"><span aria-hidden="true">☰</span> Temas</button>
          <button type="button" class="pres-boton" data-pres="pantalla"><span aria-hidden="true">⛶</span> <span class="pres-pantalla-texto">Pantalla completa</span></button>
          <button type="button" class="pres-boton pres-salir" data-pres="cerrar"><span aria-hidden="true">✕</span> Salir</button>
        </div>
      </div>
      <div class="pres-progreso" aria-hidden="true"><span></span></div>
      <nav class="pres-indice" id="pres-indice" aria-label="Temas de la exposición" hidden>
        <ol>${this.diapositivas.map((d, i) => `<li><button type="button" data-ir="${i}"><span aria-hidden="true">${d.emoji}</span> ${esc(d.titulo)}</button></li>`).join("")}</ol>
      </nav>
      <div class="pres-escenario"></div>
      <aside class="pres-guion" id="pres-guion" aria-label="¿Qué puedo decir?" hidden>
        <div class="pres-guion-cabeza"><h2><span aria-hidden="true">💡</span> ¿Qué puedo decir?</h2><button type="button" class="pres-boton" data-pres="guion" aria-label="Cerrar guion">✕</button></div>
        <div class="pres-guion-cuerpo"></div>
      </aside>
      <div class="pres-controles">
        <button type="button" class="pres-nav" data-pres="anterior"><span aria-hidden="true">←</span> Anterior</button>
        <button type="button" class="pres-nav pres-nav-guion" data-pres="guion" aria-expanded="false" aria-controls="pres-guion"><span aria-hidden="true">💡</span> ¿Qué puedo decir?</button>
        <button type="button" class="pres-nav pres-nav-siguiente" data-pres="siguiente">Siguiente <span aria-hidden="true">→</span></button>
      </div>
      <p class="pres-ayuda">Teclado: ← → para avanzar · G para el guion · F pantalla completa · Esc para salir</p>`;
  }

  /** Contenido extra de algunas diapositivas (miniaturas interactivas). */
  extra(id) {
    if (id === "inicio") {
      return `<dl class="dia-estudiante">${DatosEstudiante.campos
        .map((c) => `<div><dt>${c.etiqueta}</dt><dd data-estudiante="${c.id}">${esc(DatosEstudiante.valor(c.id))}</dd></div>`)
        .join("")}</dl>`;
    }
    if (id === "ecosistemas") {
      return `<p class="dia-panel-titulo">Toca un ecosistema para ver su ficha</p><ul class="dia-miniaturas">${ECOSISTEMAS.map((e) => `<li><button type="button" data-abrir-eco="${e.id}">${Ilustraciones.ecosistema(e.id, e.nombre)}<span>${e.emoji} ${esc(e.nombre)}</span></button></li>`).join("")}</ul>`;
    }
    if (id === "biodiversidad") {
      const ids = ["jaguar", "manati", "tortuga-verde", "flamenco", "tiburon-ballena", "mapache-cozumel"];
      return `<p class="dia-panel-titulo">Especies representativas · toca para ver su ficha</p><ul class="dia-miniaturas dia-especies">${ids
        .map((i) => ESPECIES.find((e) => e.id === i))
        .map((e) => `<li><button type="button" data-abrir-especie="${e.id}">${Ilustraciones.especie(e.id, e.nombre)}<span>${esc(e.nombre)}${e.nom059 ? ` · ${e.nom059}` : ""}</span></button></li>`)
        .join("")}</ul>`;
    }
    if (id === "ciclos") {
      return `<p class="dia-panel-titulo">Los cuatro ciclos en una frase</p><ul class="dia-ciclos">${CICLOS.map((c) => `<li style="--ciclo:${c.color}"><strong><span aria-hidden="true">${c.emoji}</span> ${c.nombre}</strong><span>${c.frase}</span></li>`).join("")}</ul>`;
    }
    if (id === "gobierno") {
      const resumen = {
        federal: ["CONANP: áreas protegidas", "SEMARNAT: normas (NOM-059)", "PROFEPA: vigilancia", "SEMAR: sargazo"],
        estatal: ["SEMA: política ambiental", "IBANQROO: ANP estatales", "Ley contra plásticos (2019)"],
        municipal: ["Recolección de basura", "Limpieza de playas", "Reglamentos de ecología"],
      };
      return `<p class="dia-panel-titulo">Tres niveles de gobierno</p><div class="dia-niveles">${Object.entries(resumen)
        .map(([nivel, items]) => `<div class="nivel-${nivel}"><h3>${AccionGobierno.NIVELES[nivel].nombre}</h3><ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul></div>`)
        .join("")}</div>`;
    }
    if (id === "actividades") {
      return `<p class="dia-panel-titulo">Actividad → consecuencia → solución</p><ul class="dia-cadenas">${ACTIVIDADES.slice(0, 5)
        .map((a) => `<li><strong>${a.emoji} ${esc(a.nombre)}</strong><span>→ ${a.consecuencia.split(",")[0].replace(/\.$/, "")}</span><span class="dia-solucion">✔ ${a.solucion.split(",")[0].replace(/\.$/, "")}</span></li>`)
        .join("")}</ul>`;
    }
    if (id === "sensoriales") {
      return `<p class="dia-panel-titulo">Aprender con los sentidos</p><ul class="dia-sentidos">${[["👁️", "Vista", "Observar aves y arrecifes"], ["👂", "Oído", "Reconocer al saraguato"], ["✋", "Tacto", "Texturas de cortezas y hojas"], ["👃", "Olfato", "Plantas aromáticas de la selva"]].map(([e, t, d]) => `<li><span aria-hidden="true">${e}</span><strong>${t}</strong><small>${d}</small></li>`).join("")}</ul>`;
    }
    return "";
  }

  renderDiapositiva(i) {
    const d = this.diapositivas[i];
    const visual = Visual.crear({
      foto: d.visual && d.visual.foto,
      ilustracion: Visual.ilustracionDe(d.visual && d.visual.ilustracion, d.titulo),
      alt: d.titulo,
      clase: "dia-visual",
    });
    const numeroTema = i; // la portada es la 0
    const eyebrow = d.id === "inicio" ? "Exposición" : d.id === "conclusion" ? "Cierre" : `Tema ${numeroTema} de ${this.diapositivas.length - 2}`;
    const datos = d.datos.length
      ? `<ul class="dia-datos">${d.datos.map((x) => `<li><strong>${x.valor}${x.unidad ? ` <small>${x.unidad}</small>` : ""}</strong><span>${x.texto}</span></li>`).join("")}</ul>`
      : "";
    const extra = this.extra(d.id);
    // Columna izquierda: imagen grande o, en algunos temas, un panel interactivo
    const lado = !extra
      ? visual
      : d.id === "inicio"
        ? `<div class="dia-lado">${visual}${extra}</div>`
        : `<div class="dia-lado dia-panel">${extra}</div>`;
    return `<article class="diapositiva tono-${d.tono} diapositiva-${d.id}" aria-roledescription="diapositiva" aria-label="${i + 1} de ${this.diapositivas.length}: ${esc(d.titulo)}">
      ${lado}
      <div class="dia-contenido">
        <p class="dia-eyebrow"><span aria-hidden="true">${d.emoji}</span> ${eyebrow}</p>
        <h2 class="dia-titulo" tabindex="-1">${d.id === "inicio" ? `<span class="dia-titulo-grande">Quintana Roo</span><span class="dia-titulo-sub">Ecosistemas, Biodiversidad y Equilibrio Ambiental</span>` : esc(d.titulo)}</h2>
        ${d.subtitulo ? `<p class="dia-subtitulo">${d.subtitulo}</p>` : ""}
        <p class="dia-resumen">${d.resumen}</p>
        ${datos}
        ${d.frasesClave.length ? `<div class="dia-frases"><h3>Frases clave</h3><ul>${d.frasesClave.map((f) => `<li>${f}</li>`).join("")}</ul></div>` : ""}
      </div>
    </article>`;
  }

  renderGuion(i) {
    const d = this.diapositivas[i];
    return `<p class="pres-guion-tema"><span aria-hidden="true">${d.emoji}</span> ${esc(d.titulo)}</p>
      ${parrafos(d.guion)}
      <h3>Para no olvidar</h3>
      <ul>${d.frasesClave.map((f) => `<li>${f}</li>`).join("")}</ul>
      <p class="pres-guion-tip">Consejo: lee el guion antes de exponer y luego explica con tus palabras mirando al grupo. Usa las frases clave como recordatorio.</p>`;
  }

  /* -------------------- Navegación -------------------- */
  ir(indice, direccion = 1) {
    const total = this.diapositivas.length;
    this.actual = Math.max(0, Math.min(total - 1, indice));
    const escenario = $(".pres-escenario", this.contenedor);
    escenario.innerHTML = this.renderDiapositiva(this.actual);
    const dia = $(".diapositiva", escenario);
    dia.classList.add(direccion >= 0 ? "entra-derecha" : "entra-izquierda");
    GaleriaFotos.aplicar(escenario);
    $(".pres-actual", this.contenedor).textContent = this.actual + 1;
    $(".pres-progreso span", this.contenedor).style.width = `${((this.actual + 1) / total) * 100}%`;
    $(".pres-guion-cuerpo", this.contenedor).innerHTML = this.renderGuion(this.actual);
    $('[data-pres="anterior"]', this.contenedor).disabled = this.actual === 0;
    const siguiente = $('[data-pres="siguiente"]', this.contenedor);
    siguiente.innerHTML = this.actual === total - 1 ? `Terminar <span aria-hidden="true">✓</span>` : `Siguiente <span aria-hidden="true">→</span>`;
    $$("[data-ir]", this.contenedor).forEach((b) => b.setAttribute("aria-current", String(Number(b.dataset.ir) === this.actual)));
    escenario.scrollTop = 0;
  }

  siguiente() {
    if (this.actual >= this.diapositivas.length - 1) return this.cerrar();
    this.ir(this.actual + 1, 1);
  }

  anterior() {
    this.ir(this.actual - 1, -1);
  }

  alternarGuion(forzar) {
    const panel = $(".pres-guion", this.contenedor);
    const mostrar = typeof forzar === "boolean" ? forzar : panel.hidden;
    panel.hidden = !mostrar;
    this.contenedor.classList.toggle("con-guion", mostrar);
    $$('[data-pres="guion"][aria-expanded]', this.contenedor).forEach((b) => b.setAttribute("aria-expanded", String(mostrar)));
    if (mostrar) $(".pres-guion-cuerpo", this.contenedor).scrollTop = 0;
  }

  alternarIndice() {
    const indice = $(".pres-indice", this.contenedor);
    indice.hidden = !indice.hidden;
    $('[data-pres="indice"]', this.contenedor).setAttribute("aria-expanded", String(!indice.hidden));
    if (!indice.hidden) {
      const actual = $(`[data-ir="${this.actual}"]`, indice);
      if (actual) actual.focus();
    }
  }

  async pantallaCompleta() {
    try {
      if (!document.fullscreenElement) await this.contenedor.requestFullscreen();
      else await document.exitFullscreen();
    } catch (error) {
      avisar("Tu navegador no permitió la pantalla completa. Usa F11 o el menú del navegador.");
    }
  }

  /* -------------------- Abrir / cerrar -------------------- */
  abrir(indice = 0) {
    if (!this.contenedor) return;
    if (!this.contenedor.firstElementChild) this.renderMarco();
    this.origenFoco = document.activeElement;
    this.abierta = true;
    this.contenedor.hidden = false;
    document.documentElement.classList.add("presentando");
    ["encabezado", "contenido", "pie"].forEach((id) => { const el = document.getElementById(id); if (el) el.inert = true; });
    this.ir(indice, 1);
    this.alternarGuion(false);
    this.iniciarCronometro();
    document.addEventListener("keydown", this.teclado);
    $(".dia-titulo", this.contenedor).focus({ preventScroll: true });
  }

  cerrar() {
    this.abierta = false;
    this.contenedor.hidden = true;
    document.documentElement.classList.remove("presentando");
    ["encabezado", "contenido", "pie"].forEach((id) => { const el = document.getElementById(id); if (el) el.inert = false; });
    clearInterval(this.intervalo);
    document.removeEventListener("keydown", this.teclado);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (this.origenFoco && document.contains(this.origenFoco)) this.origenFoco.focus();
  }

  iniciarCronometro() {
    clearInterval(this.intervalo);
    this.inicioCronometro = Date.now();
    const salida = $(".pres-tiempo", this.contenedor);
    const actualizar = () => {
      const s = Math.floor((Date.now() - this.inicioCronometro) / 1000);
      salida.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    };
    actualizar();
    this.intervalo = setInterval(actualizar, 1000);
  }

  teclado(evento) {
    if (!this.abierta || document.documentElement.classList.contains("modal-abierto")) return;
    const enCampo = evento.target.closest("input, textarea, select");
    if (enCampo) return;
    switch (evento.key) {
      case "ArrowRight":
      case "PageDown":
        evento.preventDefault();
        this.siguiente();
        break;
      case " ":
        if (evento.target.closest("button")) return;
        evento.preventDefault();
        this.siguiente();
        break;
      case "ArrowLeft":
      case "PageUp":
        evento.preventDefault();
        this.anterior();
        break;
      case "Home":
        this.ir(0, -1);
        break;
      case "End":
        this.ir(this.diapositivas.length - 1, 1);
        break;
      case "Escape":
        if (!$(".pres-indice", this.contenedor).hidden) this.alternarIndice();
        else if (!$(".pres-guion", this.contenedor).hidden) this.alternarGuion(false);
        else if (!document.fullscreenElement) this.cerrar();
        break;
      case "g":
      case "G":
        this.alternarGuion();
        break;
      case "f":
      case "F":
        this.pantallaCompleta();
        break;
      case "Tab": {
        // Mantiene el foco dentro de la presentación
        const enfocables = $$("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])", this.contenedor).filter((el) => el.offsetParent !== null);
        if (!enfocables.length) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (evento.shiftKey && document.activeElement === primero) { evento.preventDefault(); ultimo.focus(); }
        else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primero.focus(); }
        break;
      }
      default:
        break;
    }
  }

  conectar() {
    if (!this.contenedor) return;
    this.contenedor.addEventListener("click", (evento) => {
      const ir = evento.target.closest("[data-ir]");
      if (ir) {
        this.ir(Number(ir.dataset.ir), Number(ir.dataset.ir) >= this.actual ? 1 : -1);
        this.alternarIndice();
        return;
      }
      const boton = evento.target.closest("[data-pres]");
      if (!boton) return;
      const accion = boton.dataset.pres;
      if (accion === "siguiente") this.siguiente();
      if (accion === "anterior") this.anterior();
      if (accion === "guion") this.alternarGuion();
      if (accion === "indice") this.alternarIndice();
      if (accion === "pantalla") this.pantallaCompleta();
      if (accion === "cerrar") this.cerrar();
    });
    document.addEventListener("fullscreenchange", () => {
      const texto = $(".pres-pantalla-texto", this.contenedor);
      if (texto) texto.textContent = document.fullscreenElement ? "Salir de pantalla completa" : "Pantalla completa";
    });
    // Gestos: deslizar a la izquierda o derecha en pantallas táctiles
    let inicioX = null;
    let inicioY = null;
    this.contenedor.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "touch") return;
      inicioX = e.clientX;
      inicioY = e.clientY;
    });
    this.contenedor.addEventListener("pointerup", (e) => {
      if (e.pointerType !== "touch" || inicioX === null) return;
      const dx = e.clientX - inicioX;
      const dy = e.clientY - inicioY;
      inicioX = null;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5 && !e.target.closest(".pres-guion")) {
        if (dx < 0) this.siguiente();
        else this.anterior();
      }
    });
  }
}
