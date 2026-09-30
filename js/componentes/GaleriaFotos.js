/* ==========================================================================
   GaleriaFotos.js
   - Visual: crea el marcado de una imagen que primero muestra la ilustración
     original y, si hay conexión, la reemplaza por una fotografía real.
   - GaleriaFotos: consulta la API pública de Wikimedia Commons (una sola
     petición para todas las fotos), obtiene autor y licencia y los muestra.
   ========================================================================== */
"use strict";

class Visual {
  /**
   * @param {object} o
   * @param {string|null} o.foto   clave en FOTOS
   * @param {string} o.ilustracion SVG de respaldo
   * @param {string} o.alt         texto alternativo
   * @param {string} o.clase       clases extra
   * @param {boolean} o.enLinea    usa <span> (para usar dentro de botones)
   */
  static crear({ foto = null, ilustracion = "", alt = "", clase = "", enLinea = false }) {
    const contenedor = enLinea ? "span" : "figure";
    const pie = enLinea ? "span" : "figcaption";
    const tieneFoto = Boolean(foto && FOTOS[foto]);
    return `<${contenedor} class="visual ${clase}"${tieneFoto ? ` data-foto="${foto}"` : ""}>
      <span class="visual-ilustracion">${ilustracion}</span>
      ${tieneFoto ? `<img class="visual-foto" alt="${esc(alt)}" decoding="async" hidden>` : ""}
      ${tieneFoto ? `<${pie} class="visual-credito" hidden></${pie}>` : ""}
    </${contenedor}>`;
  }

  /** Ilustración según el tipo indicado en los datos de una sección. */
  static ilustracionDe(config = {}, etiqueta = "") {
    switch (config.tipo) {
      case "portada": return Ilustraciones.portada();
      case "ecosistema": return Ilustraciones.ecosistema(config.id, etiqueta);
      case "especie": return Ilustraciones.especie(config.id, etiqueta);
      case "esferas": return Ilustraciones.esferas();
      case "acuifero": return Ilustraciones.acuifero();
      case "formacion": return Ilustraciones.formacionCenote(config.paso || 4);
      case "zonificacion": return Ilustraciones.zonificacion();
      default: return Ilustraciones.ecosistema("selva", etiqueta);
    }
  }
}

class GaleriaFotos {
  static API = "https://commons.wikimedia.org/w/api.php";
  static #datos = new Map(); // clave → {thumb, autor, licencia, licenciaUrl, pagina, archivo}
  static #estado = "inactivo"; // inactivo | cargando | listo | sin-conexion
  static activo = Almacen.leer("fotos", true);

  static get estado() {
    return GaleriaFotos.#estado;
  }

  static get creditos() {
    return [...GaleriaFotos.#datos.entries()];
  }

  /** Descarga los datos de todas las fotos en una sola petición. */
  static async cargar() {
    if (!GaleriaFotos.activo || GaleriaFotos.#estado === "cargando" || GaleriaFotos.#estado === "listo") {
      if (GaleriaFotos.#estado === "listo") GaleriaFotos.aplicar(document);
      return;
    }
    if (!("fetch" in window) || navigator.onLine === false) {
      GaleriaFotos.#estado = "sin-conexion";
      Bus.emitir("fotos:estado", GaleriaFotos.#estado);
      return;
    }
    GaleriaFotos.#estado = "cargando";
    Bus.emitir("fotos:estado", GaleriaFotos.#estado);

    const claves = Object.keys(FOTOS);
    const titulos = claves.map((c) => `File:${FOTOS[c]}`);
    const parametros = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1280",
      iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl",
      titles: titulos.join("|"),
    });

    const control = "AbortController" in window ? new AbortController() : null;
    const temporizador = setTimeout(() => control && control.abort(), 9000);
    try {
      const respuesta = await fetch(`${GaleriaFotos.API}?${parametros}`, control ? { signal: control.signal } : {});
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const json = await respuesta.json();
      GaleriaFotos.#procesar(json, claves, titulos);
      GaleriaFotos.#estado = "listo";
      GaleriaFotos.aplicar(document);
    } catch (error) {
      GaleriaFotos.#estado = "sin-conexion";
    } finally {
      clearTimeout(temporizador);
      Bus.emitir("fotos:estado", GaleriaFotos.#estado);
    }
  }

  static #textoPlano(html = "") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || "").replace(/\s+/g, " ").trim();
  }

  static #procesar(json, claves, titulos) {
    const consulta = json.query || {};
    const normalizado = new Map((consulta.normalized || []).map((n) => [n.from, n.to]));
    const paginas = Object.values(consulta.pages || {});
    const porTitulo = new Map(paginas.map((p) => [p.title, p]));
    claves.forEach((clave, i) => {
      const titulo = normalizado.get(titulos[i]) || titulos[i];
      const pagina = porTitulo.get(titulo);
      const info = pagina && !("missing" in pagina) && pagina.imageinfo && pagina.imageinfo[0];
      if (!info) return;
      const meta = info.extmetadata || {};
      GaleriaFotos.#datos.set(clave, {
        archivo: titulo.replace(/^File:/, ""),
        thumb: info.thumburl || info.url,
        pagina: info.descriptionurl,
        autor: GaleriaFotos.#textoPlano(meta.Artist && meta.Artist.value) || "Autor en Wikimedia Commons",
        licencia: GaleriaFotos.#textoPlano(meta.LicenseShortName && meta.LicenseShortName.value) || "Ver licencia",
        licenciaUrl: meta.LicenseUrl && meta.LicenseUrl.value,
      });
    });
  }

  /** Coloca las fotos ya descargadas dentro de un elemento. */
  static aplicar(raiz) {
    if (!GaleriaFotos.activo || GaleriaFotos.#estado !== "listo" || !raiz) return;
    $$("[data-foto]", raiz).forEach((figura) => {
      const datos = GaleriaFotos.#datos.get(figura.dataset.foto);
      const img = $(".visual-foto", figura);
      if (!datos || !img || figura.classList.contains("con-foto") || img.dataset.cargando) return;
      img.dataset.cargando = "1";
      img.addEventListener("load", () => {
        img.hidden = false;
        figura.classList.add("con-foto");
        const credito = $(".visual-credito", figura);
        if (credito) {
          credito.textContent = `📷 ${datos.autor} · ${datos.licencia} · Wikimedia Commons`;
          credito.hidden = false;
        }
      }, { once: true });
      img.addEventListener("error", () => { delete img.dataset.cargando; }, { once: true });
      img.src = datos.thumb;
    });
  }

  /** Activa o desactiva las fotografías reales. */
  static alternar() {
    GaleriaFotos.activo = !GaleriaFotos.activo;
    Almacen.guardar("fotos", GaleriaFotos.activo);
    document.documentElement.classList.toggle("sin-fotos", !GaleriaFotos.activo);
    if (GaleriaFotos.activo) {
      $$(".visual.con-foto").forEach((f) => f.classList.remove("oculta-foto"));
      GaleriaFotos.cargar();
    }
    Bus.emitir("fotos:estado", GaleriaFotos.#estado);
    return GaleriaFotos.activo;
  }

  /** Lista de créditos para la sección de fuentes. */
  static renderCreditos() {
    if (GaleriaFotos.#estado !== "listo" || !GaleriaFotos.#datos.size) {
      return `<p class="nota">Sin conexión a Wikimedia Commons, la app muestra solo las ilustraciones originales creadas para este proyecto (sin restricciones de uso). Con internet, aquí aparecerán el autor y la licencia de cada fotografía.</p>`;
    }
    return `<ul class="creditos">${[...GaleriaFotos.#datos.values()]
      .map((d) => `<li><a href="${esc(d.pagina)}" target="_blank" rel="noopener">${esc(d.archivo)}</a> — ${esc(d.autor)} · ${d.licenciaUrl ? `<a href="${esc(d.licenciaUrl)}" target="_blank" rel="noopener">${esc(d.licencia)}</a>` : esc(d.licencia)}</li>`)
      .join("")}</ul>`;
  }
}
