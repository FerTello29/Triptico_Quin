/* ==========================================================================
   app.js — punto de entrada. La clase App construye la página con los
   objetos de datos, crea los componentes y conecta los eventos globales.
   ========================================================================== */
"use strict";

class App {
  constructor() {
    this.navegacion = new Navegacion(SECCIONES);
    this.presentacion = new Presentacion(SECCIONES);
    this.mapa = new MapaInteractivo({ geo: MAPA_GEO, lugares: LUGARES, id: "mapa-qroo" });
    this.cuestionario = new Cuestionario(PREGUNTAS, "cuestionario-qroo");
    this.triptico = new Triptico();
  }

  /** Arma todas las secciones dentro de <main>. */
  construirPagina() {
    const main = document.getElementById("contenido");
    const temas = ["ecosistemas", "biodiversidad", "biosfera", "hidrosfera", "litosfera", "atmosfera", "ciclos", "actividades", "gobierno", "sensoriales"];
    const bloques = [];

    const inicio = seccionPorId("inicio");
    bloques.push(`<section id="inicio" class="hero" aria-labelledby="titulo-inicio">${Vistas.inicio(inicio)}</section>`);

    temas.forEach((id, i) => {
      const seccion = seccionPorId(id);
      bloques.push(`<section id="${id}" class="seccion tono-${seccion.tono}" aria-labelledby="titulo-${id}">
        <div class="envoltura">${seccion.renderEncabezado(i + 1)}${Vistas[id](seccion)}</div>
      </section>`);
    });

    const extra = (id, emoji, eyebrow, titulo, subtitulo, cuerpo, tono) => `<section id="${id}" class="seccion tono-${tono}" aria-labelledby="titulo-${id}">
        <div class="envoltura">
          <header class="seccion-encabezado"><p class="eyebrow"><span aria-hidden="true">${emoji}</span> ${eyebrow}</p><h2 id="titulo-${id}">${titulo}</h2><p class="subtitulo">${subtitulo}</p></header>
          ${cuerpo}
        </div>
      </section>`;

    bloques.push(extra("mapa", "🗺️", "Explora", "Mapa de Quintana Roo", "Áreas naturales protegidas, reservas de la biósfera, cenotes, arrecifes, manglares y lagunas.", this.mapa.render(), "caribe"));
    bloques.push(extra("cuestionario", "🌱", "Evalúate", "¿Cuánto aprendiste?", "Un cuestionario rápido para repasar antes de exponer.", this.cuestionario.render(), "selva"));
    bloques.push(extra("triptico", "📄", "Imprime", "Tríptico para imprimir", "Seis paneles organizados para una hoja carta a doble cara.", `${DatosEstudiante.renderFormulario()}${this.triptico.render()}`, "caliza"));
    bloques.push(extra("fuentes", "📚", "Consulta", "Fuentes de información", "Datos de instituciones oficiales y científicas. Sin cifras inventadas.", Vistas.fuentes(), "cielo"));

    main.innerHTML = bloques.join("");
  }

  /** Eventos que se comparten entre varias secciones. */
  conectarGlobal() {
    document.addEventListener("click", (evento) => {
      const eco = evento.target.closest("[data-abrir-eco]");
      if (eco) {
        const e = ECOSISTEMAS.find((x) => x.id === eco.dataset.abrirEco);
        Modal.abrir({ titulo: `${e.emoji} ${e.nombre}`, subtitulo: "Ficha del ecosistema", html: e.renderDetalle(), clase: "modal-ficha" });
        return;
      }
      const especie = evento.target.closest("[data-abrir-especie]");
      if (especie) {
        const s = ESPECIES.find((x) => x.id === especie.dataset.abrirEspecie);
        Modal.abrir({ titulo: s.nombre, subtitulo: s.reino === "fauna" ? "Fauna de Quintana Roo" : "Flora de Quintana Roo", html: s.renderDetalle(), clase: "modal-ficha" });
        return;
      }
      if (evento.target.closest("[data-abrir-presentacion]")) {
        this.presentacion.abrir(0);
        return;
      }
      const revelar = evento.target.closest("[data-revelar]");
      if (revelar) {
        const respuesta = document.getElementById(revelar.dataset.revelar);
        const mostrar = respuesta.hidden;
        respuesta.hidden = !mostrar;
        revelar.setAttribute("aria-expanded", String(mostrar));
        revelar.textContent = mostrar ? "Ocultar respuesta" : "Ver respuesta";
        return;
      }
      if (evento.target.closest("#btn-fotos")) {
        GaleriaFotos.alternar();
        Vistas.actualizarBotonFotos();
      }
    });
    Bus.on("fotos:estado", () => Vistas.actualizarBotonFotos());

    // Abre el Modo Exposición directamente con #exposicion en la dirección
    if (location.hash === "#exposicion") this.presentacion.abrir(0);
  }

  iniciar() {
    GestorTema.iniciar();
    document.documentElement.classList.toggle("sin-fotos", !GaleriaFotos.activo);
    this.construirPagina();
    this.navegacion.render();
    this.navegacion.conectar();
    Modal.iniciar();
    Acordeon.iniciar();
    Pestanas.iniciar();
    Contador.iniciar();
    Vistas.conectarBiodiversidad();
    Vistas.lineaTiempo.conectar();
    Vistas.conectarLitosfera();
    Vistas.conectarCiclos();
    Vistas.conectarSensoriales();
    this.mapa.conectar();
    this.cuestionario.conectar();
    DatosEstudiante.conectar();
    this.triptico.conectar();
    this.presentacion.conectar();
    this.conectarGlobal();
    Vistas.actualizarBotonFotos();
    document.documentElement.classList.add("app-lista");

    // Si la dirección trae un ancla (#mapa, #ciclos…), vuelve a ubicarla ya construida la página
    if (location.hash && location.hash !== "#exposicion") {
      const destino = document.getElementById(location.hash.slice(1));
      if (destino) destino.scrollIntoView();
    }

    // Las fotografías se cargan al final para no retrasar la página
    const cargarFotos = () => GaleriaFotos.cargar();
    if ("requestIdleCallback" in window) requestIdleCallback(cargarFotos, { timeout: 2500 });
    else setTimeout(cargarFotos, 800);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    window.app = new App();
    window.app.iniciar();
  } catch (error) {
    console.error(error);
    const main = document.getElementById("contenido");
    if (main) main.insertAdjacentHTML("afterbegin", `<p class="error-carga">Ocurrió un error al cargar la app: ${esc(error.message)}. Recarga la página.</p>`);
  }
});
