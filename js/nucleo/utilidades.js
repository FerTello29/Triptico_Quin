/* ==========================================================================
   utilidades.js — funciones pequeñas que usan todos los componentes
   ========================================================================== */
"use strict";

/** Selecciona un elemento (atajo de querySelector). */
const $ = (selector, raiz = document) => raiz.querySelector(selector);

/** Selecciona varios elementos y los devuelve como arreglo. */
const $$ = (selector, raiz = document) => Array.from(raiz.querySelectorAll(selector));

/** Escapa texto para insertarlo de forma segura dentro de HTML. */
function esc(texto) {
  return String(texto ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Formatea números con separador de miles al estilo de México. */
function formatoNumero(numero, decimales = 0) {
  return Number(numero).toLocaleString("es-MX", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

/** Indica si la persona pidió reducir las animaciones en su sistema. */
function reducirMovimiento() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Crea un identificador único para elementos o degradados SVG. */
let __contadorId = 0;
function idUnico(prefijo = "id") {
  __contadorId += 1;
  return `${prefijo}-${__contadorId}`;
}

/** Convierte un texto con saltos de párrafo en etiquetas <p>. */
function parrafos(texto) {
  return String(texto)
    .split(/\n\s*\n/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");
}

/** Lista HTML sencilla a partir de un arreglo de textos. */
function listaHTML(elementos, clase = "") {
  return `<ul class="${clase}">${elementos.map((e) => `<li>${e}</li>`).join("")}</ul>`;
}

/**
 * Almacen: guarda preferencias en el navegador (tema, datos del estudiante…).
 * Todo va dentro de try/catch porque el almacenamiento puede estar bloqueado
 * (ventanas privadas, vistas previas). La app funciona igual sin él.
 */
class Almacen {
  static leer(clave, valorPorDefecto = null) {
    try {
      const valor = window.localStorage.getItem(`qroo:${clave}`);
      return valor === null ? valorPorDefecto : JSON.parse(valor);
    } catch (error) {
      return valorPorDefecto;
    }
  }

  static guardar(clave, valor) {
    try {
      window.localStorage.setItem(`qroo:${clave}`, JSON.stringify(valor));
      return true;
    } catch (error) {
      return false;
    }
  }
}

/** Pequeño sistema de eventos para comunicar componentes sin acoplarlos. */
class Bus {
  static #oyentes = new Map();

  static on(evento, funcion) {
    if (!Bus.#oyentes.has(evento)) Bus.#oyentes.set(evento, new Set());
    Bus.#oyentes.get(evento).add(funcion);
  }

  static emitir(evento, datos) {
    (Bus.#oyentes.get(evento) || []).forEach((funcion) => funcion(datos));
  }
}

/** Anuncia un mensaje breve a lectores de pantalla y lo muestra como aviso. */
function avisar(mensaje) {
  const region = document.getElementById("aviso-vivo");
  if (!region) return;
  region.textContent = "";
  window.requestAnimationFrame(() => {
    region.textContent = mensaje;
    region.classList.add("visible");
    clearTimeout(avisar._t);
    avisar._t = setTimeout(() => region.classList.remove("visible"), 3200);
  });
}
