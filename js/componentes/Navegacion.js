/* ==========================================================================
   Navegacion.js — menú fijo con resaltado de la sección visible,
   menú desplegable en celular y cambio de tema claro/oscuro.
   ========================================================================== */
"use strict";

class GestorTema {
  static iniciar() {
    const guardado = Almacen.leer("tema", null);
    if (guardado === "claro" || guardado === "oscuro") GestorTema.aplicar(guardado, false);
    GestorTema.actualizarBoton();
    const medios = window.matchMedia("(prefers-color-scheme: dark)");
    if (medios.addEventListener) medios.addEventListener("change", () => GestorTema.actualizarBoton());
  }

  static get actual() {
    const forzado = document.documentElement.dataset.theme;
    if (forzado === "dark") return "oscuro";
    if (forzado === "light") return "claro";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
  }

  static aplicar(tema, guardar = true) {
    document.documentElement.dataset.theme = tema === "oscuro" ? "dark" : "light";
    if (guardar) Almacen.guardar("tema", tema);
    GestorTema.actualizarBoton();
  }

  static alternar() {
    GestorTema.aplicar(GestorTema.actual === "oscuro" ? "claro" : "oscuro");
    avisar(GestorTema.actual === "oscuro" ? "Modo oscuro activado" : "Modo claro activado");
  }

  static actualizarBoton() {
    const boton = document.getElementById("btn-tema");
    if (!boton) return;
    const oscuro = GestorTema.actual === "oscuro";
    boton.innerHTML = oscuro
      ? `<span aria-hidden="true">☀️</span><span class="boton-texto"> Modo claro</span>`
      : `<span aria-hidden="true">🌙</span><span class="boton-texto"> Modo oscuro</span>`;
    boton.setAttribute("aria-label", oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }
}

class Navegacion {
  constructor(secciones) {
    this.secciones = secciones.filter((s) => s.enMenu);
    this.menu = document.getElementById("menu");
    this.boton = document.getElementById("btn-menu");
  }

  static EXTRAS = [
    { id: "mapa", emoji: "🗺️", etiqueta: "Mapa" },
    { id: "cuestionario", emoji: "🌱", etiqueta: "¿Cuánto aprendiste?" },
    { id: "triptico", emoji: "📄", etiqueta: "Ver tríptico" },
    { id: "fuentes", emoji: "📚", etiqueta: "Fuentes" },
  ];

  render() {
    const temas = this.secciones.map((s, i) => `<li>${s.enlaceMenu.replace("</a>", i > 0 ? `<small>Tema ${i}</small></a>` : "</a>")}</li>`);
    const extras = Navegacion.EXTRAS.map((e) => `<li><a href="#${e.id}" data-seccion="${e.id}"><span aria-hidden="true">${e.emoji}</span> ${e.etiqueta}</a></li>`);
    const acciones = [
      `<li><button type="button" data-abrir-presentacion><span aria-hidden="true">🎤</span> Modo exposición</button></li>`,
      `<li><button type="button" data-imprimir="imprimir"><span aria-hidden="true">🖨️</span> Imprimir tríptico</button></li>`,
    ];
    this.menu.innerHTML = `<div class="menu-panel">
      <p class="menu-titulo">Temas del tríptico</p>
      <ul class="menu-temas">${temas.join("")}</ul>
      <div class="menu-inferior">
        <ul class="menu-extras">${extras.join("")}</ul>
        <ul class="menu-acciones">${acciones.join("")}</ul>
      </div>
    </div>`;
  }

  abrirMenu(abrir) {
    document.documentElement.classList.toggle("menu-abierto", abrir);
    this.boton.setAttribute("aria-expanded", String(abrir));
    this.boton.setAttribute("aria-label", abrir ? "Cerrar menú de temas" : "Abrir menú de temas");
    if (abrir) {
      const activo = $("a.activo", this.menu) || $("a", this.menu);
      if (activo) activo.focus({ preventScroll: true });
    }
  }

  resaltar(id) {
    $$("a[data-seccion]", this.menu).forEach((a) => {
      const activo = a.dataset.seccion === id;
      a.classList.toggle("activo", activo);
      if (activo) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    // Indicador de la sección actual en la barra
    const indicador = document.getElementById("seccion-actual");
    const seccion = this.secciones.find((s) => s.id === id);
    const extra = Navegacion.EXTRAS.find((e) => e.id === id);
    const dato = seccion ? { emoji: seccion.emoji, etiqueta: seccion.etiquetaMenu } : extra;
    if (indicador && dato) {
      indicador.innerHTML = `<span aria-hidden="true">${dato.emoji}</span> ${esc(dato.etiqueta)}`;
      indicador.href = `#${id}`;
    }
  }

  conectar() {
    this.boton.addEventListener("click", () => this.abrirMenu(!document.documentElement.classList.contains("menu-abierto")));
    this.menu.addEventListener("click", (evento) => {
      if (evento.target.closest("a, button")) this.abrirMenu(false);
    });
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && document.documentElement.classList.contains("menu-abierto")) {
        this.abrirMenu(false);
        this.boton.focus();
      }
    });
    // Cierra el menú al hacer clic fuera de él
    document.addEventListener("click", (evento) => {
      if (!document.documentElement.classList.contains("menu-abierto")) return;
      if (!evento.target.closest("#menu, #btn-menu")) this.abrirMenu(false);
    });
    document.getElementById("btn-tema").addEventListener("click", () => GestorTema.alternar());

    // Resalta en el menú la sección que se está leyendo
    if ("IntersectionObserver" in window) {
      const visibles = new Map();
      const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => visibles.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let mejor = null;
        let maximo = 0;
        visibles.forEach((ratio, id) => { if (ratio > maximo) { maximo = ratio; mejor = id; } });
        if (mejor) this.resaltar(mejor);
      }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01, 0.2, 0.5] });
      $$("main > section[id]").forEach((s) => observador.observe(s));
    }
  }
}
