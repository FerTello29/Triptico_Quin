/* ==========================================================================
   Interfaz.js — componentes reutilizables: Modal, Acordeon, Pestanas,
   Contador y LineaTiempo.
   ========================================================================== */
"use strict";

/* ------------------------------------------------------------------------
   Modal: ventana emergente accesible basada en <dialog>.
   ------------------------------------------------------------------------ */
class Modal {
  static #dialogo = null;
  static #origen = null;

  static iniciar() {
    Modal.#dialogo = document.getElementById("modal");
    if (!Modal.#dialogo) return;
    Modal.#dialogo.addEventListener("click", (evento) => {
      // Clic en el fondo oscuro o en un botón de cerrar
      if (evento.target === Modal.#dialogo || evento.target.closest("[data-cerrar-modal]")) Modal.cerrar();
    });
    Modal.#dialogo.addEventListener("close", () => {
      document.documentElement.classList.remove("modal-abierto");
      if (Modal.#origen && document.contains(Modal.#origen)) Modal.#origen.focus();
    });
  }

  /** Abre el modal con un título y contenido HTML. */
  static abrir({ titulo, html, clase = "", subtitulo = "" }) {
    const d = Modal.#dialogo;
    if (!d) return;
    Modal.#origen = document.activeElement;
    d.className = `modal ${clase}`;
    $(".modal-titulo", d).textContent = titulo;
    const sub = $(".modal-subtitulo", d);
    sub.textContent = subtitulo;
    sub.hidden = !subtitulo;
    const cuerpo = $(".modal-cuerpo", d);
    cuerpo.innerHTML = html;
    cuerpo.scrollTop = 0;
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
    document.documentElement.classList.add("modal-abierto");
    GaleriaFotos.aplicar(cuerpo);
    $(".modal-cerrar", d).focus();
  }

  static cerrar() {
    const d = Modal.#dialogo;
    if (!d) return;
    if (typeof d.close === "function" && d.open) d.close();
    else {
      d.removeAttribute("open");
      document.documentElement.classList.remove("modal-abierto");
    }
  }
}

/* ------------------------------------------------------------------------
   Acordeon: lista de paneles que se abren y cierran.
   ------------------------------------------------------------------------ */
class Acordeon {
  /**
   * @param {Array<{titulo:string, contenido:string, icono?:string}>} items
   * @param {string} id prefijo único
   */
  static render(items, id, abiertoInicial = -1) {
    return `<div class="acordeon" data-acordeon="${id}">${items
      .map((item, i) => {
        const abierto = i === abiertoInicial;
        return `<div class="acordeon-item">
          <h4 class="acordeon-cabecera">
            <button type="button" class="acordeon-boton" id="${id}-b${i}" aria-expanded="${abierto}" aria-controls="${id}-p${i}">
              ${item.icono ? `<span aria-hidden="true">${item.icono}</span>` : ""}<span>${item.titulo}</span><span class="acordeon-signo" aria-hidden="true"></span>
            </button>
          </h4>
          <div class="acordeon-panel" id="${id}-p${i}" role="region" aria-labelledby="${id}-b${i}"${abierto ? "" : " hidden"}>${item.contenido}</div>
        </div>`;
      })
      .join("")}</div>`;
  }

  /** Un solo manejador para todos los acordeones de la página. */
  static iniciar() {
    document.addEventListener("click", (evento) => {
      const boton = evento.target.closest(".acordeon-boton");
      if (!boton) return;
      const panel = document.getElementById(boton.getAttribute("aria-controls"));
      const abrir = boton.getAttribute("aria-expanded") !== "true";
      boton.setAttribute("aria-expanded", String(abrir));
      panel.hidden = !abrir;
    });
  }
}

/* ------------------------------------------------------------------------
   Pestanas: pestañas accesibles (flechas del teclado para cambiar).
   ------------------------------------------------------------------------ */
class Pestanas {
  static render({ id, etiqueta, pestanas, clase = "" }) {
    return `<div class="pestanas ${clase}" data-pestanas="${id}">
      <div class="pestanas-lista" role="tablist" aria-label="${esc(etiqueta)}">${pestanas
        .map((p, i) => `<button type="button" role="tab" class="pestana" id="${id}-t${i}" aria-selected="${i === 0}" aria-controls="${id}-c${i}" tabindex="${i === 0 ? 0 : -1}" style="${p.color ? `--pestana:${p.color}` : ""}">${p.etiqueta}</button>`)
        .join("")}</div>
      ${pestanas
        .map((p, i) => `<div class="pestana-panel" role="tabpanel" id="${id}-c${i}" aria-labelledby="${id}-t${i}" tabindex="0"${i === 0 ? "" : " hidden"}>${p.contenido}</div>`)
        .join("")}
    </div>`;
  }

  static seleccionar(pestana) {
    const grupo = pestana.closest("[data-pestanas]");
    $$(":scope > .pestanas-lista > .pestana", grupo).forEach((p) => {
      const activa = p === pestana;
      p.setAttribute("aria-selected", String(activa));
      p.tabIndex = activa ? 0 : -1;
      document.getElementById(p.getAttribute("aria-controls")).hidden = !activa;
    });
    Bus.emitir("pestana:cambio", { grupo: grupo.dataset.pestanas, pestana: pestana.id });
  }

  static iniciar() {
    document.addEventListener("click", (evento) => {
      const pestana = evento.target.closest('[role="tab"]');
      if (pestana) Pestanas.seleccionar(pestana);
    });
    document.addEventListener("keydown", (evento) => {
      const pestana = evento.target.closest('[role="tab"]');
      if (!pestana) return;
      const lista = $$('[role="tab"]', pestana.parentElement);
      const i = lista.indexOf(pestana);
      let destino = null;
      if (evento.key === "ArrowRight") destino = lista[(i + 1) % lista.length];
      if (evento.key === "ArrowLeft") destino = lista[(i - 1 + lista.length) % lista.length];
      if (evento.key === "Home") destino = lista[0];
      if (evento.key === "End") destino = lista[lista.length - 1];
      if (destino) {
        evento.preventDefault();
        destino.focus();
        Pestanas.seleccionar(destino);
      }
    });
  }
}

/* ------------------------------------------------------------------------
   Contador: anima una cifra desde 0 cuando aparece en pantalla.
   El valor final ya está escrito en el HTML, así que se lee aunque no
   haya animación.
   ------------------------------------------------------------------------ */
class Contador {
  static iniciar(raiz = document) {
    const elementos = $$("[data-contar]", raiz);
    if (!elementos.length || reducirMovimiento() || !("IntersectionObserver" in window)) return;
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        observador.unobserve(entrada.target);
        Contador.animar(entrada.target);
      });
    }, { threshold: 0.6 });
    elementos.forEach((el) => observador.observe(el));
  }

  static animar(elemento) {
    const final = Number(elemento.dataset.contar);
    const decimales = Number(elemento.dataset.decimales || 0);
    const duracion = 1300;
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min(1, (ahora - inicio) / duracion);
      const suave = 1 - Math.pow(1 - t, 3);
      elemento.textContent = formatoNumero(final * suave, decimales);
      if (t < 1) requestAnimationFrame(paso);
      else elemento.textContent = formatoNumero(final, decimales);
    };
    requestAnimationFrame(paso);
  }
}

/* ------------------------------------------------------------------------
   LineaTiempo: eventos ordenados por año con filtros por tipo.
   ------------------------------------------------------------------------ */
class LineaTiempo {
  static TIPOS = {
    proteccion: { nombre: "Protección", icono: "🛡️" },
    huracan: { nombre: "Huracanes", icono: "🌀" },
    ley: { nombre: "Leyes y programas", icono: "📜" },
    ciencia: { nombre: "Ciencia", icono: "🔬" },
  };

  constructor(eventos, id) {
    this.eventos = [...eventos].sort((a, b) => a.anio - b.anio);
    this.id = id;
  }

  render() {
    const filtros = [["todos", "Todos", "✨"], ...Object.entries(LineaTiempo.TIPOS).map(([k, v]) => [k, v.nombre, v.icono])];
    return `<div class="linea-tiempo" id="${this.id}">
      <div class="filtros" role="group" aria-label="Filtrar línea del tiempo">${filtros
        .map(([k, nombre, icono], i) => `<button type="button" class="filtro" data-filtro-lt="${k}" aria-pressed="${i === 0}"><span aria-hidden="true">${icono}</span> ${nombre}</button>`)
        .join("")}</div>
      <ol class="lt-lista">${this.eventos
        .map((e) => `<li class="lt-evento lt-${e.tipo}" data-tipo="${e.tipo}">
          <span class="lt-anio">${e.anio}</span>
          <div class="lt-tarjeta"><p class="lt-tipo"><span aria-hidden="true">${LineaTiempo.TIPOS[e.tipo].icono}</span> ${LineaTiempo.TIPOS[e.tipo].nombre}</p><h4>${esc(e.titulo)}</h4><p>${e.texto}</p></div>
        </li>`)
        .join("")}</ol>
    </div>`;
  }

  conectar() {
    const raiz = document.getElementById(this.id);
    raiz.addEventListener("click", (evento) => {
      const boton = evento.target.closest("[data-filtro-lt]");
      if (!boton) return;
      const tipo = boton.dataset.filtroLt;
      $$("[data-filtro-lt]", raiz).forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
      $$(".lt-evento", raiz).forEach((li) => { li.hidden = tipo !== "todos" && li.dataset.tipo !== tipo; });
    });
  }
}
