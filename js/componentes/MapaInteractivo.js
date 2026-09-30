/* ==========================================================================
   MapaInteractivo.js — mapa SVG de Quintana Roo con sus 11 municipios
   (límites del INEGI) y marcadores de lugares de importancia ambiental.
   Funciona sin internet: no usa servicios de mapas externos.
   ========================================================================== */
"use strict";

class MapaInteractivo {
  /** Ciudades de referencia (coordenadas aproximadas). */
  static CIUDADES = [
    { nombre: "Chetumal (capital)", lat: 18.50, lon: -88.30, dx: 10, dy: 22, ancla: "start" },
    { nombre: "Cancún", lat: 21.16, lon: -86.85, dx: -12, dy: -10, ancla: "end" },
  ];

  /** Ajustes para que algunas etiquetas no se encimen con ciudades o puntos. */
  static POSICION_ETIQUETA = {
    "Othón P. Blanco": [170, 880],
    "Felipe Carrillo Puerto": [330, 470],
  };

  constructor({ geo, lugares, id }) {
    this.geo = geo;
    this.lugares = lugares;
    this.id = id;
    this.filtrosActivos = new Set(Object.keys(MapaLugar.CATEGORIAS));
    this.seleccionado = null;
  }

  renderLeyenda() {
    return `<div class="mapa-leyenda" role="group" aria-label="Mostrar u ocultar tipos de lugar">${Object.entries(MapaLugar.CATEGORIAS)
      .map(([clave, cat]) => {
        const total = this.lugares.filter((l) => l.categoria === clave).length;
        return `<button type="button" class="mapa-filtro" data-categoria="${clave}" aria-pressed="true" style="--cat:${cat.color}">
          <span class="mapa-filtro-punto" aria-hidden="true"></span>${cat.nombre} <small>(${total})</small>
        </button>`;
      })
      .join("")}</div>`;
  }

  renderSVG() {
    const g = this.geo;
    const vecinos = g.vecinos.map((v) => `<path class="mapa-vecino" d="${v.d}"><title>${esc(v.nombre)}</title></path>`).join("");
    const municipios = g.municipios
      .map((m) => `<path class="mapa-municipio" d="${m.d}" data-municipio="${esc(m.nombre)}"><title>Municipio de ${esc(m.nombre)}</title></path>`)
      .join("");
    const etiquetas = g.municipios
      .filter((m) => !["Cozumel", "Isla Mujeres", "Puerto Morelos", "Benito Juárez"].includes(m.nombre))
      .map((m) => {
        const [x, y] = MapaInteractivo.POSICION_ETIQUETA[m.nombre] || m.c;
        return `<text class="mapa-etiqueta-municipio" x="${x}" y="${y}" text-anchor="middle">${esc(m.nombre)}</text>`;
      })
      .join("");
    const marcadores = this.lugares.map((l) => l.renderMarcador(g.proyeccion)).join("");
    return `<svg class="mapa-svg" viewBox="0 0 ${g.ancho} ${g.alto}" role="group" aria-labelledby="${this.id}-titulo" xmlns="http://www.w3.org/2000/svg">
      <title id="${this.id}-titulo">Mapa de Quintana Roo con áreas de importancia ambiental</title>
      <rect class="mapa-mar" x="0" y="0" width="${g.ancho}" height="${g.alto}"/>
      ${vecinos}${municipios}
      <g class="mapa-textos" aria-hidden="true">
        ${etiquetas}
        <text class="mapa-etiqueta-pais" x="150" y="260">YUCATÁN</text>
        <text class="mapa-etiqueta-pais" x="34" y="860" transform="rotate(-90 34 860)">CAMPECHE</text>
        <text class="mapa-etiqueta-pais" x="215" y="975">BELICE</text>
        <text class="mapa-etiqueta-mar" x="600" y="610" transform="rotate(-70 600 610)">MAR CARIBE</text>
        <text class="mapa-etiqueta-mar" x="190" y="34">GOLFO DE MÉXICO</text>
        ${MapaInteractivo.CIUDADES.map((c) => {
          const { x, y } = MapaLugar.prototype.proyectar.call(c, g.proyeccion);
          return `<circle class="mapa-ciudad-punto" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/><text class="mapa-ciudad" x="${(x + c.dx).toFixed(1)}" y="${(y + c.dy).toFixed(1)}" text-anchor="${c.ancla}">${c.nombre}</text>`;
        }).join("")}
      </g>
      <g class="mapa-marcadores">${marcadores}</g>
      <g class="mapa-escala" transform="translate(470 960)" aria-hidden="true">
        <rect x="0" y="-6" width="${(50 / 111.32 / Math.cos(19.75 * Math.PI / 180)) * g.proyeccion.cos * g.proyeccion.k}" height="6"/>
        <text x="0" y="-12">50 km</text>
      </g>
    </svg>`;
  }

  render() {
    return `<div class="mapa" id="${this.id}">
      ${this.renderLeyenda()}
      <div class="mapa-cuerpo">
        <div class="mapa-lienzo">${this.renderSVG()}<p class="mapa-municipio-activo" aria-live="polite"></p></div>
        <aside class="mapa-info" aria-live="polite" tabindex="-1">
          <p class="mapa-info-inicio"><strong>Toca un punto del mapa</strong> para ver información del lugar. También puedes usar la tecla Tab para recorrer los puntos y Enter para abrirlos.</p>
          <ul class="mapa-lista">${this.lugares
            .map((l) => `<li><button type="button" class="enlace-lugar" data-lugar="${l.id}" style="--cat:${l.color}"><span class="mapa-filtro-punto" aria-hidden="true"></span>${esc(l.nombre)}</button></li>`)
            .join("")}</ul>
        </aside>
      </div>
      <p class="nota">Límites estatales y municipales: Marco Geoestadístico del INEGI. Las ubicaciones de los puntos son aproximadas y las áreas marinas se marcan en un punto representativo.</p>
    </div>`;
  }

  seleccionar(id) {
    const raiz = document.getElementById(this.id);
    const lugar = this.lugares.find((l) => l.id === id);
    if (!lugar) return;
    this.seleccionado = id;
    $$(".marcador", raiz).forEach((m) => m.classList.toggle("activo", m.dataset.lugar === id));
    const info = $(".mapa-info", raiz);
    info.innerHTML = `${lugar.renderInfo()}<button type="button" class="boton boton-suave mapa-volver">← Ver todos los lugares</button>`;
    // En celular, lleva la vista al panel de información
    if (window.matchMedia("(max-width: 760px)").matches) info.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "nearest" });
  }

  mostrarLista() {
    const raiz = document.getElementById(this.id);
    const temporal = document.createElement("div");
    temporal.innerHTML = this.render();
    $(".mapa-info", raiz).innerHTML = $(".mapa-info", temporal).innerHTML;
    $$(".marcador", raiz).forEach((m) => m.classList.remove("activo"));
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    const raiz = document.getElementById(this.id);
    $$(".marcador", raiz).forEach((m) => {
      const visible = this.filtrosActivos.has(m.dataset.categoria);
      m.classList.toggle("oculto", !visible);
      m.setAttribute("tabindex", visible ? "0" : "-1");
      m.setAttribute("aria-hidden", String(!visible));
    });
    $$(".enlace-lugar", raiz).forEach((b) => {
      const lugar = this.lugares.find((l) => l.id === b.dataset.lugar);
      b.parentElement.hidden = !this.filtrosActivos.has(lugar.categoria);
    });
  }

  conectar() {
    const raiz = document.getElementById(this.id);
    raiz.addEventListener("click", (evento) => {
      const marcador = evento.target.closest(".marcador, .enlace-lugar");
      if (marcador) return this.seleccionar(marcador.dataset.lugar);
      if (evento.target.closest(".mapa-volver")) return this.mostrarLista();
      const filtro = evento.target.closest(".mapa-filtro");
      if (filtro) {
        const cat = filtro.dataset.categoria;
        const activo = filtro.getAttribute("aria-pressed") === "true";
        filtro.setAttribute("aria-pressed", String(!activo));
        if (activo) this.filtrosActivos.delete(cat);
        else this.filtrosActivos.add(cat);
        this.aplicarFiltros();
      }
    });
    raiz.addEventListener("keydown", (evento) => {
      const marcador = evento.target.closest(".marcador");
      if (marcador && (evento.key === "Enter" || evento.key === " ")) {
        evento.preventDefault();
        this.seleccionar(marcador.dataset.lugar);
      }
    });
    const salida = $(".mapa-municipio-activo", raiz);
    raiz.addEventListener("pointerover", (evento) => {
      const municipio = evento.target.closest(".mapa-municipio");
      if (municipio) salida.textContent = `Municipio: ${municipio.dataset.municipio}`;
    });
  }
}
