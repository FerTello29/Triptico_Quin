/* ==========================================================================
   ilustraciones.js — ilustraciones vectoriales ORIGINALES (SVG) creadas para
   este proyecto. No dependen de internet, se imprimen con nitidez y no tienen
   restricciones de licencia. Cuando hay conexión, la app puede mostrar además
   fotografías reales de Wikimedia Commons (ver GaleriaFotos.js).
   ========================================================================== */
"use strict";

class Ilustraciones {
  /** Envuelve el contenido en una etiqueta <svg> accesible. */
  static svg(viewBox, contenido, etiqueta, clase = "") {
    return `<svg class="ilustracion ${clase}" viewBox="${viewBox}" role="img" aria-label="${esc(etiqueta)}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${contenido}</svg>`;
  }

  static degradado(id, colores, vertical = true) {
    const pasos = colores
      .map((c, i) => `<stop offset="${(i / (colores.length - 1)).toFixed(2)}" stop-color="${c}"/>`)
      .join("");
    return `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${pasos}</linearGradient>`;
  }

  static fondoRedondo(u, colores) {
    return `<defs>${Ilustraciones.degradado(`f${u}`, colores)}</defs><rect width="200" height="200" fill="url(#f${u})"/>`;
  }

  /* ---------------------------------------------------------------------
     ECOSISTEMAS (viewBox 0 0 400 260)
     --------------------------------------------------------------------- */
  static ecosistema(id, etiqueta = "") {
    const u = idUnico("e");
    const escenas = {
      selva: Ilustraciones.#selva,
      manglar: Ilustraciones.#manglar,
      arrecife: Ilustraciones.#arrecife,
      dunas: Ilustraciones.#dunas,
      humedales: Ilustraciones.#humedales,
      lagunas: Ilustraciones.#lagunas,
      playas: Ilustraciones.#playas,
      cenotes: Ilustraciones.#cenotes,
    };
    const dibujar = escenas[id] || Ilustraciones.#selva;
    return Ilustraciones.svg("0 0 400 260", dibujar(u), etiqueta || `Ilustración: ${id}`, `escena escena-${id}`);
  }

  static #selva(u) {
    const hoja = (x, y, r, c) =>
      `<ellipse cx="${x}" cy="${y}" rx="16" ry="6" transform="rotate(${r} ${x} ${y})" fill="${c}"/>`;
    return `<defs>${Ilustraciones.degradado(`c${u}`, ["#7fcbe0", "#d9f1e4"])}</defs>
      <rect width="400" height="260" fill="url(#c${u})"/>
      <circle cx="330" cy="52" r="24" fill="#ffe28c"/>
      <path d="M0 140 Q22 112 48 128 Q70 98 100 122 Q124 94 152 118 Q180 92 208 116 Q236 90 264 114 Q292 96 320 120 Q348 100 374 124 Q390 114 400 120 V260 H0Z" fill="#8cc79a"/>
      <path d="M0 172 Q24 140 54 158 Q80 128 110 152 Q138 124 168 150 Q196 126 224 152 Q252 130 278 156 Q306 134 334 158 Q362 138 400 160 V260 H0Z" fill="#4f9a66"/>
      <path d="M262 250 L272 118 L286 118 L298 250 Z" fill="#8c7458"/>
      <path d="M262 250 Q250 236 238 250 M298 250 Q312 236 322 250" stroke="#8c7458" stroke-width="6" fill="none"/>
      <path d="M279 150 L246 124 M281 138 L318 114" stroke="#8c7458" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="279" cy="114" rx="78" ry="17" fill="#2d7148"/>
      <ellipse cx="279" cy="99" rx="58" ry="15" fill="#3a8a57"/>
      <ellipse cx="279" cy="86" rx="36" ry="11" fill="#4ea56b"/>
      <path d="M0 214 Q28 182 62 200 Q92 170 126 196 Q156 172 186 198 Q214 178 238 202 L238 260 H0Z" fill="#2c6e47"/>
      <path d="M330 260 Q340 196 380 206 Q392 200 400 204 V260Z" fill="#2c6e47"/>
      <path d="M118 40 Q128 90 112 150" stroke="#2f6b46" stroke-width="3" fill="none"/>
      <path d="M150 30 Q142 80 158 132" stroke="#2f6b46" stroke-width="2.5" fill="none"/>
      <rect y="240" width="400" height="20" fill="#1c4a31"/>
      ${hoja(40, 238, -30, "#3d8f5c")}${hoja(62, 232, 20, "#3d8f5c")}${hoja(90, 240, -10, "#4ea56b")}
      ${hoja(350, 236, 25, "#3d8f5c")}${hoja(372, 230, -25, "#4ea56b")}${hoja(200, 242, 12, "#3d8f5c")}
      <g transform="translate(120 150)">
        <ellipse cx="0" cy="0" rx="7" ry="11" fill="#141414"/>
        <ellipse cx="2" cy="-3" rx="4" ry="5" fill="#f6d23c"/>
        <circle cx="1" cy="-10" r="5" fill="#141414"/>
        <path d="M5 -12 Q18 -14 20 -9 Q14 -6 5 -7Z" fill="#8bc34a"/>
        <path d="M13 -12 Q18 -13 20 -9 Q17 -8 13 -8Z" fill="#e5533d"/>
      </g>`;
  }

  static #manglar(u) {
    const raices = (x, y) =>
      [-30, -18, -6, 8, 20, 32]
        .map((d) => `<path d="M${x} ${y} Q${x + d * 0.6} ${y + 14} ${x + d} ${y + 40}" stroke="#6b4b34" stroke-width="3" fill="none"/>`)
        .join("");
    const arbol = (x, y, s) => `
      <g transform="translate(${x} ${y}) scale(${s})">
        ${raices(0, 0)}
        <path d="M-3 0 L-2 -40 L3 -40 L4 0Z" fill="#6b4b34"/>
        <ellipse cx="0" cy="-54" rx="40" ry="22" fill="#2f7d4f"/>
        <ellipse cx="-18" cy="-64" rx="24" ry="15" fill="#3c9460"/>
        <ellipse cx="16" cy="-66" rx="26" ry="16" fill="#46a36b"/>
      </g>`;
    return `<defs>${Ilustraciones.degradado(`c${u}`, ["#ffd7a8", "#fdeccf"])}${Ilustraciones.degradado(`a${u}`, ["#4ab3ae", "#1d6f7a"])}</defs>
      <rect width="400" height="260" fill="url(#c${u})"/>
      <circle cx="80" cy="60" r="22" fill="#ffb86b"/>
      <path d="M0 150 Q100 140 200 146 Q300 140 400 148 V160 H0Z" fill="#9dc79a"/>
      <rect y="160" width="400" height="100" fill="url(#a${u})"/>
      ${arbol(90, 170, 1.05)}${arbol(205, 168, 1.25)}${arbol(320, 172, 1)}
      <g opacity="0.25" transform="translate(0 342) scale(1 -1)">${arbol(205, 168, 1.25)}</g>
      <path d="M0 200 Q40 196 80 200 T160 200 T240 200 T320 200 T400 200" stroke="#e8fbf8" stroke-opacity=".45" stroke-width="2" fill="none" class="ola"/>
      <g transform="translate(262 150)">
        <path d="M0 0 Q6 -18 2 -30 Q0 -38 6 -40" stroke="#f7f7f2" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="-6" cy="4" rx="14" ry="8" fill="#f7f7f2"/>
        <path d="M6 -40 L18 -38" stroke="#e0a52c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M-6 11 L-8 30 M-2 11 L0 30" stroke="#3a3a3a" stroke-width="1.5"/>
      </g>
      <g fill="#f2c14e" opacity=".9"><path d="M60 228 q8 -6 16 0 q-8 6 -16 0z M76 228 l6 -5 v10z"/><path d="M300 238 q8 -6 16 0 q-8 6 -16 0z M316 238 l6 -5 v10z"/></g>`;
  }

  static #arrecife(u) {
    const pez = (x, y, c, s = 1, flip = false) =>
      `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" class="pez"><ellipse cx="0" cy="0" rx="12" ry="6" fill="${c}"/><path d="M-10 0 L-20 -7 L-20 7Z" fill="${c}"/><circle cx="6" cy="-1.5" r="1.6" fill="#10233a"/></g>`;
    return `<defs>${Ilustraciones.degradado(`m${u}`, ["#43c6e6", "#1780b0", "#0b4a70"])}</defs>
      <rect width="400" height="260" fill="url(#m${u})"/>
      <g fill="#ffffff" opacity=".12"><path d="M60 0 L100 0 L40 260 L0 260Z"/><path d="M180 0 L210 0 L170 260 L130 260Z"/><path d="M300 0 L340 0 L330 260 L280 260Z"/></g>
      <path d="M0 222 Q60 208 120 220 Q190 232 250 216 Q320 204 400 222 V260 H0Z" fill="#ead9a8"/>
      <g stroke="#d7874a" stroke-width="12" stroke-linecap="round" fill="none">
        <path d="M80 226 L80 196 L56 170 M80 196 L108 168 M56 170 L44 150 M56 170 L66 146 M108 168 L124 146 M108 168 L98 144"/>
      </g>
      <path d="M160 226 Q160 190 196 188 Q232 190 232 226Z" fill="#c4b25f"/>
      <path d="M170 214 q8 -10 16 0 t16 0 t16 0 M172 202 q8 -10 16 0 t16 0 t14 0" stroke="#9c8a3d" stroke-width="2.5" fill="none"/>
      <g transform="translate(290 226)">
        <path d="M0 0 L0 -20 M0 -20 Q-40 -50 -30 -90 Q0 -110 30 -90 Q40 -50 0 -20" fill="#b45cc2" stroke="#8a3f96" stroke-width="3"/>
        <path d="M0 -20 L-22 -84 M0 -20 L0 -100 M0 -20 L22 -84 M-28 -60 L28 -60 M-24 -40 L24 -40" stroke="#8a3f96" stroke-width="1.5"/>
      </g>
      <g stroke="#f06d8c" stroke-width="7" stroke-linecap="round" fill="none"><path d="M350 228 L350 200 L338 182 M350 200 L364 184 M364 184 L370 168"/></g>
      ${pez(150, 110, "#ffd23f")}${pez(180, 96, "#ffd23f", 0.8)}${pez(250, 140, "#3ec1f0", 1, true)}${pez(110, 150, "#f28b3c", 0.9)}${pez(330, 90, "#7ee0c3", 0.8, true)}
      <g fill="none" stroke="#e8fbff" stroke-opacity=".7"><circle cx="208" cy="60" r="3"/><circle cx="214" cy="44" r="2"/><circle cx="206" cy="30" r="2.5"/></g>`;
  }

  static #dunas(u) {
    const arbusto = (x, y, r) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="#3f8a55"/><circle cx="${x + r * 0.8}" cy="${y + 2}" r="${r * 0.8}" fill="#4d9e63"/><circle cx="${x - r * 0.7}" cy="${y + 3}" r="${r * 0.7}" fill="#357a4a"/>`;
    return `<defs>${Ilustraciones.degradado(`c${u}`, ["#8fd4f0", "#e8f7fb"])}${Ilustraciones.degradado(`m${u}`, ["#3cc7d0", "#169ab5"])}</defs>
      <rect width="400" height="260" fill="url(#c${u})"/>
      <rect y="104" width="400" height="30" fill="url(#m${u})"/>
      <path d="M0 132 Q100 124 200 130 Q300 124 400 132 V260 H0Z" fill="#f6e7c1"/>
      <path d="M0 176 Q60 132 130 158 Q190 124 260 156 Q330 128 400 150 V260 H0Z" fill="#ecd7a3"/>
      <path d="M0 222 Q80 180 160 208 Q240 178 320 206 Q360 192 400 200 V260 H0Z" fill="#e3c687"/>
      ${arbusto(70, 150, 12)}${arbusto(220, 140, 14)}${arbusto(330, 142, 11)}${arbusto(150, 200, 13)}${arbusto(300, 196, 12)}
      <g stroke="#5aa06a" stroke-width="2" fill="none">
        <path d="M20 240 q30 -10 60 -2 q30 8 60 -4"/><path d="M200 246 q30 -12 60 -2 q26 8 52 -6"/>
      </g>
      <g fill="#c86fc9"><circle cx="46" cy="236" r="3.5"/><circle cx="104" cy="238" r="3.5"/><circle cx="238" cy="240" r="3.5"/><circle cx="290" cy="241" r="3.5"/></g>
      <g stroke="#6e9f4a" stroke-width="2" stroke-linecap="round"><path d="M372 212 l-8 -22 M372 212 l0 -26 M372 212 l8 -22 M380 214 l10 -18"/></g>`;
  }

  static #humedales(u) {
    const pastos = [];
    for (let i = 0; i < 70; i += 1) {
      const x = (i * 37) % 400;
      const y = 176 + ((i * 13) % 70);
      pastos.push(`<path d="M${x} ${y} l-3 -14 M${x} ${y} l2 -16 M${x} ${y} l6 -12" />`);
    }
    return `<defs>${Ilustraciones.degradado(`c${u}`, ["#a7d8f0", "#f1f7df"])}</defs>
      <rect width="400" height="260" fill="url(#c${u})"/>
      <g fill="#ffffff" opacity=".85"><ellipse cx="90" cy="50" rx="36" ry="10"/><ellipse cx="112" cy="44" rx="22" ry="9"/><ellipse cx="300" cy="36" rx="30" ry="8"/></g>
      <path d="M0 138 Q200 128 400 138 V260 H0Z" fill="#c9c46a"/>
      <path d="M0 150 Q200 142 400 152 V260 H0Z" fill="#a9b451"/>
      <path d="M40 180 Q120 166 200 182 Q260 194 330 176 Q370 170 400 178 V196 Q360 190 320 198 Q250 212 190 198 Q120 186 40 198Z" fill="#6cc3d3"/>
      <path d="M0 226 Q90 212 170 228 Q250 240 400 222 V240 Q260 256 160 242 Q80 232 0 244Z" fill="#6cc3d3"/>
      <g stroke="#7e8c35" stroke-width="1.6" fill="none" stroke-linecap="round">${pastos.join("")}</g>
      <g transform="translate(300 140)"><path d="M0 0 L0 -30" stroke="#6b5a3c" stroke-width="2"/><path d="M0 -30 l-14 -6 M0 -30 l14 -6 M0 -30 l-10 -14 M0 -30 l10 -14 M0 -30 l0 -16" stroke="#3f7d4a" stroke-width="3" stroke-linecap="round"/></g>
      <g transform="translate(318 144)"><path d="M0 0 L0 -24" stroke="#6b5a3c" stroke-width="2"/><path d="M0 -24 l-12 -5 M0 -24 l12 -5 M0 -24 l-8 -12 M0 -24 l8 -12" stroke="#3f7d4a" stroke-width="3" stroke-linecap="round"/></g>
      <g stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M160 70 q8 -8 16 0 q8 -8 16 0"/><path d="M200 90 q6 -6 12 0 q6 -6 12 0"/></g>
      <g transform="translate(120 186)"><path d="M0 0 Q4 -14 0 -24" stroke="#f3a0b4" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="-6" cy="3" rx="11" ry="6" fill="#f3a0b4"/><path d="M0 -24 q8 0 10 6" stroke="#6b6b6b" stroke-width="2.5" fill="none"/><path d="M-6 9 L-6 22 M-2 9 L-2 22" stroke="#6b6b6b" stroke-width="1.4"/></g>`;
  }

  static #lagunas(u) {
    return `<defs>${Ilustraciones.degradado(`c${u}`, ["#9fdcf5", "#eaf8fb"])}${Ilustraciones.degradado(`l${u}`, ["#1b5fa8", "#1f8fd1", "#39c3d4", "#8ee8e0"])}</defs>
      <rect width="400" height="260" fill="url(#c${u})"/>
      <path d="M0 96 Q30 80 60 92 Q90 76 120 90 Q150 78 180 92 Q210 80 240 92 Q270 78 300 90 Q330 80 360 92 Q384 84 400 92 V110 H0Z" fill="#3f8e5c"/>
      <rect y="108" width="400" height="152" fill="url(#l${u})"/>
      <path d="M0 150 Q100 140 200 152 T400 148" stroke="#ffffff" stroke-opacity=".35" stroke-width="2" fill="none" class="ola"/>
      <path d="M0 186 Q100 176 200 188 T400 184" stroke="#ffffff" stroke-opacity=".3" stroke-width="2" fill="none" class="ola"/>
      <g fill="#8b6b4a"><rect x="250" y="118" width="120" height="7" rx="2"/><rect x="258" y="124" width="4" height="26"/><rect x="290" y="124" width="4" height="26"/><rect x="322" y="124" width="4" height="26"/><rect x="354" y="124" width="4" height="26"/></g>
      <path d="M0 226 Q40 214 80 222 Q120 230 150 226 L150 260 H0Z" fill="#f2e6c4"/>
      <g>
        <path d="M22 236 Q20 214 40 212 Q58 212 58 236Z" fill="#9c8c72"/>
        <path d="M26 226 Q40 220 54 226 M24 232 Q40 226 56 232" stroke="#7a6b54" stroke-width="1.5" fill="none"/>
        <path d="M70 240 Q70 222 88 220 Q104 222 104 240Z" fill="#a69879"/>
        <path d="M74 232 Q88 226 100 232" stroke="#7a6b54" stroke-width="1.5" fill="none"/>
        <path d="M112 244 Q114 232 126 232 Q136 234 136 244Z" fill="#978769"/>
      </g>`;
  }

  static #playas(u) {
    return `<defs>${Ilustraciones.degradado(`c${u}`, ["#6fcff5", "#dff5fb"])}${Ilustraciones.degradado(`m${u}`, ["#1e8fc2", "#27c0d0", "#7fe3db"])}</defs>
      <rect width="400" height="260" fill="url(#c${u})"/>
      <circle cx="80" cy="54" r="22" fill="#fff0a8"/>
      <rect y="112" width="400" height="80" fill="url(#m${u})"/>
      <path d="M0 136 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#ffffff" stroke-opacity=".6" stroke-width="2" fill="none" class="ola"/>
      <path d="M0 170 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#ffffff" stroke-opacity=".5" stroke-width="2" fill="none" class="ola"/>
      <path d="M0 190 Q100 180 200 188 Q300 196 400 186 V260 H0Z" fill="#f7ebcc"/>
      <path d="M0 192 Q100 182 200 190 Q300 198 400 188" stroke="#ffffff" stroke-width="4" fill="none"/>
      <path d="M318 256 Q312 190 296 140" stroke="#9a7650" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g fill="#2f8a52" transform="translate(296 138)">
        <path d="M0 0 Q-30 -16 -58 2 Q-30 -6 0 0Z"/><path d="M0 0 Q-22 -30 -46 -30 Q-20 -18 0 0Z"/>
        <path d="M0 0 Q20 -32 46 -28 Q22 -16 0 0Z"/><path d="M0 0 Q30 -12 56 6 Q28 -4 0 0Z"/><path d="M0 0 Q2 -30 10 -44 Q8 -20 0 0Z"/>
      </g>
      <g fill="#c9a86f" opacity=".7">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${150 + i * 7}" y="${244 - i * 8}" width="4" height="3" rx="1"/><rect x="${160 + i * 7}" y="${246 - i * 8}" width="4" height="3" rx="1"/>`).join("")}</g>
      <g transform="translate(196 196)"><ellipse cx="0" cy="0" rx="9" ry="7" fill="#6d8a4a"/><circle cx="8" cy="-5" r="3" fill="#7fa05a"/></g>
      <g fill="#f3b3a0"><circle cx="60" cy="236" r="4"/><circle cx="250" cy="248" r="3"/></g>`;
  }

  static #cenotes(u) {
    return `<defs>${Ilustraciones.degradado(`r${u}`, ["#e9dcc0", "#c9b48d"])}${Ilustraciones.degradado(`a${u}`, ["#44c9df", "#1f86b3"])}${Ilustraciones.degradado(`s${u}`, ["#1b5d86", "#0b3553"])}
        <linearGradient id="h${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#r${u})"/>
      <rect width="400" height="46" fill="#9fdcf2"/>
      <path d="M0 52 Q20 30 44 44 Q66 26 90 42 Q110 30 128 44 L128 56 H0Z M272 44 Q292 28 316 42 Q340 26 364 42 Q384 32 400 40 V56 H272Z" fill="#3b8a58"/>
      <g stroke="#b39c72" stroke-width="1.4" opacity=".7"><path d="M0 90 H130 M270 90 H400 M0 130 H100 M300 130 H400 M0 200 H400 M0 232 H400"/></g>
      <path d="M128 56 Q140 60 150 76 L250 76 Q262 60 272 56 Q300 70 318 110 Q330 150 320 176 L80 176 Q70 150 82 110 Q100 70 128 56Z" fill="#3a2f22" opacity=".15"/>
      <path d="M150 56 L250 56 L262 76 Q320 96 330 150 L330 176 L70 176 L70 150 Q80 96 138 76Z" fill="#5a4a36" opacity=".35"/>
      <path d="M152 56 L248 56 L230 176 L170 176Z" fill="url(#h${u})"/>
      <g fill="#b89f73">${[96, 112, 290, 306].map((x) => `<path d="M${x} 96 l6 22 l6 -22z"/>`).join("")}</g>
      <rect x="70" y="150" width="260" height="26" fill="url(#a${u})"/>
      <path d="M330 150 Q370 150 400 160 V176 L330 176Z" fill="url(#a${u})"/>
      <rect x="70" y="176" width="330" height="24" fill="url(#s${u})" opacity=".92"/>
      <path d="M70 176 H400" stroke="#ffffff" stroke-dasharray="6 5" stroke-width="1.5"/>
      <g stroke="#6b4f33" stroke-width="2" fill="none"><path d="M160 56 Q164 100 158 146"/><path d="M178 56 Q172 96 180 150"/><path d="M234 56 Q240 104 232 148"/></g>
      <path d="M340 164 h40 l-6 -5 m6 5 l-6 5" stroke="#ffffff" stroke-width="2" fill="none" class="flujo"/>
      <g font-family="Figtree, system-ui, sans-serif" font-size="11" font-weight="700">
        <text x="80" y="167" fill="#08324a">agua dulce</text>
        <text x="80" y="193" fill="#e8f7ff">agua salada</text>
        <text x="258" y="222" fill="#4a3b27">roca caliza</text>
      </g>`;
  }

  /* ---------------------------------------------------------------------
     ESPECIES (viewBox 0 0 200 200)
     --------------------------------------------------------------------- */
  static especie(id, etiqueta = "") {
    const u = idUnico("s");
    const dibujos = {
      jaguar: Ilustraciones.#jaguar,
      manati: Ilustraciones.#manati,
      "tortuga-verde": Ilustraciones.#tortuga,
      flamenco: Ilustraciones.#flamenco,
      "tiburon-ballena": Ilustraciones.#tiburon,
      "mono-arana": Ilustraciones.#mono,
      "pavo-ocelado": Ilustraciones.#pavo,
      cocodrilo: Ilustraciones.#cocodrilo,
      tucan: Ilustraciones.#tucan,
      "mapache-cozumel": Ilustraciones.#mapache,
      "loro-yucateco": Ilustraciones.#loro,
      "coral-cuerno-alce": Ilustraciones.#coral,
      ceiba: Ilustraciones.#ceiba,
      chicozapote: Ilustraciones.#chicozapote,
      "mangle-rojo": Ilustraciones.#mangle,
      "palma-chit": Ilustraciones.#palma,
      caoba: Ilustraciones.#caoba,
      orquidea: Ilustraciones.#orquidea,
      "pasto-marino": Ilustraciones.#pasto,
    };
    const dibujar = dibujos[id] || Ilustraciones.#ceiba;
    return Ilustraciones.svg("0 0 200 200", dibujar(u), etiqueta || `Ilustración: ${id}`, `retrato retrato-${id}`);
  }

  static #jaguar(u) {
    const roseta = (x, y, r = 6) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#3b2717" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${r * 0.35}" fill="#3b2717"/>`;
    return `${Ilustraciones.fondoRedondo(u, ["#2f7d4f", "#154a30"])}
      <circle cx="52" cy="62" r="20" fill="#e3a03c"/><circle cx="52" cy="62" r="10" fill="#3b2717"/>
      <circle cx="148" cy="62" r="20" fill="#e3a03c"/><circle cx="148" cy="62" r="10" fill="#3b2717"/>
      <path d="M100 48 C146 48 166 80 164 116 C162 152 134 176 100 176 C66 176 38 152 36 116 C34 80 54 48 100 48Z" fill="#e8a940"/>
      ${roseta(100, 70)}${roseta(78, 80, 5)}${roseta(122, 80, 5)}${roseta(58, 112)}${roseta(142, 112)}${roseta(62, 138, 5)}${roseta(138, 138, 5)}
      <path d="M70 128 C70 112 86 110 100 110 C114 110 130 112 130 128 C130 150 116 162 100 162 C84 162 70 150 70 128Z" fill="#f7ead0"/>
      <ellipse cx="78" cy="100" rx="10" ry="7" fill="#f5d44d"/><ellipse cx="78" cy="100" rx="3" ry="6" fill="#1b140d"/>
      <ellipse cx="122" cy="100" rx="10" ry="7" fill="#f5d44d"/><ellipse cx="122" cy="100" rx="3" ry="6" fill="#1b140d"/>
      <path d="M90 118 Q100 114 110 118 Q108 128 100 130 Q92 128 90 118Z" fill="#6a3324"/>
      <path d="M100 130 V140 M100 140 Q90 150 82 144 M100 140 Q110 150 118 144" stroke="#3b2717" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <g fill="#3b2717"><circle cx="84" cy="134" r="1.6"/><circle cx="80" cy="140" r="1.6"/><circle cx="116" cy="134" r="1.6"/><circle cx="120" cy="140" r="1.6"/></g>`;
  }

  static #manati(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#63cfe0", "#176a8f"])}
      <g fill="#ffffff" opacity=".14"><path d="M40 0 L70 0 L30 200 L0 200Z"/><path d="M130 0 L150 0 L120 200 L96 200Z"/></g>
      <g stroke="#3f9a63" stroke-width="4" stroke-linecap="round" fill="none"><path d="M20 200 q6 -24 -2 -40"/><path d="M32 200 q-6 -20 4 -34"/><path d="M170 200 q6 -22 -2 -36"/><path d="M182 200 q-4 -18 4 -30"/></g>
      <ellipse cx="34" cy="112" rx="22" ry="26" fill="#71828c"/>
      <path d="M40 104 C44 78 88 70 126 78 C156 84 172 100 172 116 C172 136 154 148 124 150 C88 152 56 144 44 128Z" fill="#8a9ba5"/>
      <path d="M60 96 C84 84 120 84 146 94" stroke="#a8b7bf" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="166" cy="112" r="22" fill="#94a4ad"/>
      <ellipse cx="182" cy="120" rx="13" ry="11" fill="#a6b4bb"/>
      <circle cx="162" cy="104" r="2.6" fill="#1e2a31"/>
      <g fill="#5d6b72"><circle cx="180" cy="116" r="1.2"/><circle cx="185" cy="119" r="1.2"/><circle cx="179" cy="122" r="1.2"/><circle cx="186" cy="125" r="1.2"/></g>
      <ellipse cx="128" cy="144" rx="16" ry="7" transform="rotate(30 128 144)" fill="#76868f"/>`;
  }

  static #tortuga(u) {
    const escudo = (x, y, r) => {
      const pts = [0, 1, 2, 3, 4, 5].map((i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
      });
      return `<polygon points="${pts.join(" ")}" fill="#a6844f" stroke="#5f4526" stroke-width="2"/>`;
    };
    return `${Ilustraciones.fondoRedondo(u, ["#5fd8d2", "#1d8aa8"])}
      <ellipse cx="60" cy="82" rx="34" ry="12" transform="rotate(-35 60 82)" fill="#6d8f54"/>
      <ellipse cx="140" cy="82" rx="34" ry="12" transform="rotate(35 140 82)" fill="#6d8f54"/>
      <ellipse cx="74" cy="150" rx="18" ry="9" transform="rotate(35 74 150)" fill="#6d8f54"/>
      <ellipse cx="126" cy="150" rx="18" ry="9" transform="rotate(-35 126 150)" fill="#6d8f54"/>
      <ellipse cx="100" cy="46" rx="15" ry="19" fill="#7ea264"/>
      <circle cx="94" cy="42" r="2.5" fill="#1d2a1a"/><circle cx="106" cy="42" r="2.5" fill="#1d2a1a"/>
      <ellipse cx="100" cy="110" rx="46" ry="54" fill="#8a6a3c" stroke="#5f4526" stroke-width="3"/>
      ${escudo(100, 86, 14)}${escudo(100, 114, 15)}${escudo(100, 142, 12)}${escudo(74, 100, 12)}${escudo(126, 100, 12)}${escudo(76, 130, 11)}${escudo(124, 130, 11)}`;
  }

  static #flamenco(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#b9ecea", "#4fb3bd"])}
      <path d="M0 168 Q50 160 100 168 T200 166 V200 H0Z" fill="#3f9cad" opacity=".55"/>
      <path d="M92 128 L94 186 M104 128 L114 156 L100 184" stroke="#e46a86" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M58 114 C62 96 92 90 118 98 C132 102 136 116 126 126 C112 138 76 138 62 130 C56 126 56 120 58 114Z" fill="#f57f9b"/>
      <path d="M70 110 C86 104 108 106 120 116 C104 124 84 124 70 118Z" fill="#e3577a"/>
      <path d="M58 116 L44 122 L60 124Z" fill="#231f20"/>
      <path d="M118 102 C140 92 142 66 126 54 C114 46 104 56 110 66" stroke="#f57f9b" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="112" cy="62" r="9" fill="#f57f9b"/>
      <path d="M108 66 C100 70 96 76 98 86" stroke="#f3e3cf" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M98 80 C97 84 98 88 100 90" stroke="#231f20" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="114" cy="59" r="2" fill="#231f20"/>`;
  }

  static #tiburon(u) {
    const manchas = [];
    for (let fila = 0; fila < 3; fila += 1) {
      for (let col = 0; col < 8; col += 1) {
        const x = 52 + col * 14 + (fila % 2) * 7;
        const y = 86 + fila * 10 - (col > 5 ? (col - 5) * 2 : 0);
        manchas.push(`<circle cx="${x}" cy="${y}" r="2.6"/>`);
      }
    }
    return `${Ilustraciones.fondoRedondo(u, ["#2b95c7", "#0a3a5e"])}
      <g fill="#ffffff" opacity=".1"><path d="M30 0 L60 0 L20 200 L0 200Z"/><path d="M140 0 L160 0 L130 200 L110 200Z"/></g>
      <path d="M30 100 L6 68 L16 102 L4 134Z" fill="#2f4c63"/>
      <path d="M92 76 L108 46 L118 78Z" fill="#34546f"/>
      <path d="M28 102 C56 70 124 66 164 86 C178 94 188 102 188 110 C176 120 154 126 124 128 C84 132 50 124 28 102Z" fill="#3f5d78"/>
      <path d="M40 112 C80 124 140 126 184 114 C176 122 154 128 124 130 C88 132 58 126 40 112Z" fill="#d3dee6"/>
      <g fill="#f4fbff" opacity=".85">${manchas.join("")}</g>
      <path d="M160 118 Q172 120 186 112" stroke="#1d2e3d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="166" cy="104" r="2.4" fill="#0f1a24"/>
      <path d="M118 126 L104 156 L134 128Z" fill="#34546f"/>
      <g fill="#8fb3c7"><path d="M120 150 q8 -4 14 0 q-6 4 -14 0z"/><path d="M60 146 q8 -4 14 0 q-6 4 -14 0z"/></g>`;
  }

  static #mono(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#8fd19a", "#2a6e45"])}
      <path d="M0 38 Q100 26 200 40" stroke="#6a4a2c" stroke-width="9" fill="none" stroke-linecap="round"/>
      <g fill="#3c8a54"><ellipse cx="30" cy="30" rx="16" ry="7"/><ellipse cx="170" cy="32" rx="16" ry="7"/><ellipse cx="150" cy="22" rx="12" ry="5"/></g>
      <path d="M112 100 C120 70 140 46 132 34 C124 24 112 34 120 42" stroke="#4b3526" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M86 96 C70 72 66 52 72 36" stroke="#5b4331" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M112 100 C130 120 136 146 130 168" stroke="#5b4331" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M92 134 C84 152 82 166 88 180" stroke="#5b4331" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M108 134 C118 152 118 166 112 178" stroke="#5b4331" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="114" rx="19" ry="27" fill="#5b4331"/>
      <circle cx="96" cy="80" r="17" fill="#5b4331"/>
      <ellipse cx="96" cy="84" rx="11" ry="10" fill="#d8b48c"/>
      <circle cx="91" cy="80" r="2.3" fill="#1d140e"/><circle cx="101" cy="80" r="2.3" fill="#1d140e"/>
      <path d="M92 89 Q96 92 100 89" stroke="#1d140e" stroke-width="1.6" fill="none"/>`;
  }

  static #pavo(u) {
    const ocelo = (x, y) =>
      `<circle cx="${x}" cy="${y}" r="7" fill="#3aa0c9"/><circle cx="${x}" cy="${y}" r="7" fill="none" stroke="#c9782c" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="2.5" fill="#1b3b52"/>`;
    return `${Ilustraciones.fondoRedondo(u, ["#bfe3b4", "#4f8f63"])}
      <path d="M36 136 A64 64 0 0 1 164 136Z" fill="#2c5f63"/>
      ${ocelo(52, 112)}${ocelo(66, 90)}${ocelo(88, 76)}${ocelo(112, 76)}${ocelo(134, 90)}${ocelo(148, 112)}
      <path d="M86 150 L82 186 M110 150 L114 186" stroke="#d45a6d" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="98" cy="128" rx="40" ry="28" fill="#3b7e7a"/>
      <g fill="none" stroke="#b67a3a" stroke-width="2" opacity=".85"><path d="M70 120 q6 6 12 0 q6 6 12 0 q6 6 12 0 q6 6 12 0"/><path d="M76 132 q6 6 12 0 q6 6 12 0 q6 6 12 0"/></g>
      <path d="M118 110 C132 96 138 84 138 72" stroke="#3269a8" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="140" cy="66" r="12" fill="#3a78c2"/>
      <g fill="#f08a2c"><circle cx="134" cy="56" r="3.4"/><circle cx="141" cy="53" r="3.4"/><circle cx="148" cy="57" r="3.4"/><circle cx="131" cy="63" r="3"/></g>
      <circle cx="144" cy="66" r="3.2" fill="#e04b3c"/><circle cx="144" cy="66" r="1.4" fill="#1b1b1b"/>
      <path d="M151 68 L160 71 L151 73Z" fill="#e6d3a8"/>`;
  }

  static #cocodrilo(u) {
    const cresta = [];
    for (let i = 0; i < 12; i += 1) cresta.push(`l6 -7 l6 7`);
    return `${Ilustraciones.fondoRedondo(u, ["#a9d3a4", "#3c6b4e"])}
      <path d="M22 110 ${cresta.join(" ")}" stroke="#46522c" stroke-width="3" fill="#56622f"/>
      <path d="M14 120 C40 104 90 102 126 106 L170 104 C184 104 192 110 190 118 C172 124 150 126 122 128 C84 132 44 132 14 120Z" fill="#65723a"/>
      <circle cx="130" cy="100" r="7" fill="#65723a"/>
      <circle cx="131" cy="99" r="3.2" fill="#e8d24a"/><ellipse cx="131" cy="99" rx="1" ry="2.6" fill="#1b1b1b"/>
      <path d="M140 118 L184 116" stroke="#3a4220" stroke-width="2"/>
      <g fill="#fdfbf2">${[146, 154, 162, 170, 178].map((x) => `<path d="M${x} 118 l3 5 l3 -5z"/>`).join("")}</g>
      <rect y="120" width="200" height="80" fill="#2f7a73" opacity=".62"/>
      <path d="M0 122 q25 -6 50 0 t50 0 t50 0 t50 0" stroke="#e9fbf7" stroke-opacity=".6" stroke-width="2" fill="none"/>`;
  }

  static #tucan(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#d8f1ff", "#8cc9a0"])}
      <path d="M10 156 Q100 146 196 160" stroke="#7a5534" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M80 150 L70 184 L90 162Z" fill="#141414"/>
      <ellipse cx="92" cy="112" rx="30" ry="42" transform="rotate(10 92 112)" fill="#141414"/>
      <ellipse cx="104" cy="92" rx="17" ry="21" fill="#f7d236"/>
      <path d="M92 150 q8 6 16 0" stroke="#d62b2b" stroke-width="6" stroke-linecap="round"/>
      <circle cx="104" cy="70" r="19" fill="#141414"/>
      <path d="M118 60 C150 48 180 56 190 70 C178 82 150 88 120 84Z" fill="#8bc34a"/>
      <path d="M150 54 C170 56 184 62 190 70 C180 78 166 82 150 84Z" fill="#f28c28"/>
      <path d="M178 62 C184 64 188 66 190 70 C186 74 182 76 176 78Z" fill="#d62b2b"/>
      <path d="M122 76 C144 80 166 80 186 72" stroke="#3a7bd5" stroke-width="3" fill="none"/>
      <circle cx="112" cy="67" r="6" fill="#86c540"/><circle cx="113" cy="67" r="2.5" fill="#0d0d0d"/>
      <path d="M96 156 v8 M104 156 v8" stroke="#4a78c9" stroke-width="3" stroke-linecap="round"/>`;
  }

  static #mapache(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#f5deb0", "#b98e52"])}
      <path d="M44 84 L50 36 L86 66Z" fill="#8f969c"/><path d="M52 74 L55 50 L74 66Z" fill="#2a2a2a"/>
      <path d="M156 84 L150 36 L114 66Z" fill="#8f969c"/><path d="M148 74 L145 50 L126 66Z" fill="#2a2a2a"/>
      <ellipse cx="100" cy="112" rx="64" ry="54" fill="#9aa1a7"/>
      <path d="M52 84 Q100 70 148 84" stroke="#f4f4f2" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M40 112 C52 92 80 92 94 106 L106 106 C120 92 148 92 160 112 C150 124 126 126 112 118 L88 118 C74 126 50 124 40 112Z" fill="#232323"/>
      <circle cx="74" cy="108" r="8" fill="#1a1a1a"/><circle cx="76" cy="105" r="2.5" fill="#ffffff"/>
      <circle cx="126" cy="108" r="8" fill="#1a1a1a"/><circle cx="128" cy="105" r="2.5" fill="#ffffff"/>
      <ellipse cx="100" cy="142" rx="30" ry="22" fill="#f1efea"/>
      <ellipse cx="100" cy="132" rx="9" ry="6" fill="#1f1f1f"/>
      <path d="M100 138 v8 M100 146 q-8 6 -14 2 M100 146 q8 6 14 2" stroke="#3a3a3a" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  }

  static #loro(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#dff4ff", "#9fd1ea"])}
      <path d="M20 160 Q100 150 190 162" stroke="#7a5534" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M86 150 L76 190 L96 162Z" fill="#3f9c3a"/>
      <ellipse cx="96" cy="118" rx="30" ry="40" fill="#4cb04a"/>
      <path d="M76 110 C84 94 110 96 118 116 C114 140 96 150 80 142Z" fill="#3b913b"/>
      <path d="M84 132 C92 136 104 134 112 128 L110 140 C100 146 88 146 82 140Z" fill="#3563c9"/>
      <path d="M80 124 l10 -4 l2 8z" fill="#d93a3a"/>
      <circle cx="106" cy="72" r="22" fill="#53b851"/>
      <path d="M88 60 C96 50 114 50 122 58 C112 60 98 62 88 64Z" fill="#fafafa"/>
      <path d="M116 70 C120 66 126 66 128 72 C124 76 118 76 116 70Z" fill="#f2d24b"/>
      <circle cx="108" cy="70" r="6.5" fill="#e14c4c"/><circle cx="108" cy="70" r="3" fill="#161616"/>
      <path d="M124 70 C136 70 140 82 134 92 C130 88 126 86 122 86Z" fill="#f1e2b2"/>
      <path d="M98 156 v8 M106 156 v8" stroke="#8a8a8a" stroke-width="3" stroke-linecap="round"/>`;
  }

  static #coral(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#4fc8e6", "#0f5b86"])}
      <path d="M0 178 Q100 166 200 178 V200 H0Z" fill="#e7d6a6"/>
      <g stroke="#d9914f" stroke-linecap="round" fill="none">
        <path d="M100 184 L100 130" stroke-width="16"/>
        <path d="M100 136 L60 104 L40 76 M60 104 L72 70" stroke-width="13"/>
        <path d="M100 136 L144 100 L166 72 M144 100 L130 66" stroke-width="13"/>
        <path d="M100 132 L98 86 L88 56 M98 86 L112 58" stroke-width="12"/>
      </g>
      <g stroke="#f4c08c" stroke-linecap="round" stroke-width="5" fill="none" opacity=".8">
        <path d="M40 76 L36 68 M72 70 L74 62 M166 72 L170 64 M130 66 L128 58 M88 56 L86 48 M112 58 L114 50"/>
      </g>
      <g><path d="M150 140 q9 -6 18 0 q-9 6 -18 0z M168 140 l7 -5 v10z" fill="#ffd23f"/><path d="M36 128 q9 -6 18 0 q-9 6 -18 0z M36 128 l-7 -5 v10z" fill="#5fd0f5"/></g>`;
  }

  static #ceiba(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#bfe6f7", "#eef8ef"])}
      <path d="M0 176 H200 V200 H0Z" fill="#6aa66f"/>
      <path d="M88 178 C92 140 94 110 96 70 L104 70 C106 110 108 140 112 178 C124 180 132 184 138 188 L62 188 C68 184 76 180 88 178Z" fill="#a1a88f"/>
      <path d="M100 96 L66 76 M100 88 L136 70 M100 80 L100 60" stroke="#8f967c" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="100" cy="66" rx="84" ry="16" fill="#2f7a4c"/>
      <ellipse cx="100" cy="52" rx="64" ry="14" fill="#3d9160"/>
      <ellipse cx="100" cy="40" rx="40" ry="11" fill="#4fa872"/>
      <g stroke="#8a917a" stroke-width="1.5" opacity=".6"><path d="M96 110 v60 M104 104 v66"/></g>`;
  }

  static #chicozapote(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#bde3b8", "#3f7e52"])}
      <path d="M84 196 L90 96 L110 96 L116 196Z" fill="#6f5238"/>
      <path d="M90 170 L110 158 L90 146 L110 134 L90 122 L110 110" stroke="#fbf6ea" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M100 172 v10" stroke="#fbf6ea" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="72" r="46" fill="#2f6d45"/>
      <circle cx="66" cy="84" r="30" fill="#377a4e"/><circle cx="136" cy="84" r="30" fill="#377a4e"/>
      <circle cx="100" cy="50" r="30" fill="#428a5a"/>
      <g fill="#9a6b3e"><circle cx="76" cy="70" r="6"/><circle cx="122" cy="60" r="6"/><circle cx="130" cy="92" r="6"/><circle cx="90" cy="96" r="6"/></g>`;
  }

  static #mangle(u) {
    const raices = [-34, -22, -10, 4, 16, 28, 38]
      .map((d) => `<path d="M100 132 Q${100 + d * 0.5} 150 ${100 + d} 176" stroke="#6b4b34" stroke-width="4" fill="none"/>`)
      .join("");
    return `${Ilustraciones.fondoRedondo(u, ["#fde2bf", "#6cc4c4"])}
      <rect y="160" width="200" height="40" fill="#2b8f96"/>
      ${raices}
      <path d="M96 134 L97 84 L103 84 L104 134Z" fill="#6b4b34"/>
      <ellipse cx="100" cy="72" rx="60" ry="32" fill="#2f7d4f"/>
      <ellipse cx="78" cy="58" rx="34" ry="20" fill="#3c9460"/><ellipse cx="124" cy="58" rx="34" ry="20" fill="#46a36b"/>
      <g stroke="#7fae43" stroke-width="3.5" stroke-linecap="round"><path d="M70 92 v26"/><path d="M130 94 v22"/><path d="M104 100 v24"/></g>
      <path d="M0 170 q25 -5 50 0 t50 0 t50 0 t50 0" stroke="#e8fbf8" stroke-opacity=".5" stroke-width="2" fill="none"/>`;
  }

  static #palma(u) {
    const abanico = (x, y, rot) => {
      const lineas = [];
      for (let a = -70; a <= 70; a += 14) {
        const r = ((a + rot) * Math.PI) / 180;
        lineas.push(`<path d="M${x} ${y} L${(x + 42 * Math.sin(r)).toFixed(1)} ${(y - 42 * Math.cos(r)).toFixed(1)}"/>`);
      }
      return `<g stroke="#3f8a4d" stroke-width="3.2" stroke-linecap="round">${lineas.join("")}</g>`;
    };
    return `${Ilustraciones.fondoRedondo(u, ["#d8f2fb", "#f3e6c3"])}
      <path d="M0 180 Q100 170 200 180 V200 H0Z" fill="#e8d3a0"/>
      <path d="M100 184 C98 150 102 120 100 88" stroke="#8c7a5a" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${abanico(100, 88, 0)}${abanico(94, 96, -60)}${abanico(106, 96, 60)}`;
  }

  static #caoba(u) {
    return `${Ilustraciones.fondoRedondo(u, ["#cfeccd", "#4f8f60"])}
      <path d="M92 198 L95 92 L105 92 L108 198Z" fill="#8a3d27"/>
      <path d="M100 112 L74 90 M100 104 L128 84" stroke="#8a3d27" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="100" cy="66" rx="70" ry="40" fill="#2c6b44"/>
      <ellipse cx="72" cy="58" rx="36" ry="24" fill="#357a4f"/><ellipse cx="130" cy="56" rx="36" ry="24" fill="#3f865a"/>
      <g transform="translate(150 150)"><path d="M0 -22 C12 -22 16 -4 12 12 C8 22 -8 22 -12 12 C-16 -4 -12 -22 0 -22Z" fill="#8b5a33"/><path d="M0 -22 V20 M-10 -10 Q0 0 10 -10" stroke="#5e3b1f" stroke-width="2" fill="none"/></g>`;
  }

  static #orquidea(u) {
    const petalo = (rot, c) =>
      `<ellipse cx="100" cy="72" rx="13" ry="32" transform="rotate(${rot} 100 104)" fill="${c}"/>`;
    return `${Ilustraciones.fondoRedondo(u, ["#2f6b4a", "#123d29"])}
      <path d="M40 196 Q60 150 100 140 M160 196 Q140 150 100 140" stroke="#4f9a5f" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M100 196 V126" stroke="#6aa55c" stroke-width="4"/>
      ${petalo(0, "#d67cc0")}${petalo(120, "#d67cc0")}${petalo(240, "#d67cc0")}
      ${petalo(60, "#e9a6d8")}${petalo(300, "#e9a6d8")}
      <path d="M88 108 C88 124 112 124 112 108 C112 136 88 136 88 108Z" fill="#8e2f7a"/>
      <circle cx="100" cy="104" r="6" fill="#f7d74a"/>`;
  }

  static #pasto(u) {
    const hojas = [];
    for (let i = 0; i < 16; i += 1) {
      const x = 12 + i * 12;
      const alto = 70 + ((i * 29) % 60);
      hojas.push(`<path d="M${x} 186 C${x - 6} ${186 - alto / 2} ${x + 8} ${186 - alto * 0.7} ${x + 2} ${186 - alto}" />`);
    }
    return `${Ilustraciones.fondoRedondo(u, ["#5ad2e4", "#1a7fa3"])}
      <path d="M0 180 Q100 170 200 182 V200 H0Z" fill="#eadcaf"/>
      <g stroke="#3ea35a" stroke-width="6" fill="none" stroke-linecap="round">${hojas.join("")}</g>
      <g><path d="M60 70 q9 -6 18 0 q-9 6 -18 0z M78 70 l7 -5 v10z" fill="#ffd23f"/><path d="M130 50 q9 -6 18 0 q-9 6 -18 0z M130 50 l-7 -5 v10z" fill="#f28b3c"/></g>`;
  }

  /* ---------------------------------------------------------------------
     ESCENA PRINCIPAL: corte transversal selva → cenote → mar → arrecife
     --------------------------------------------------------------------- */
  static portada(viewBox = "0 0 1200 520") {
    const u = idUnico("p");
    const arboles = [];
    for (let i = 0; i < 16; i += 1) {
      const x = 20 + i * 42;
      const r = 20 + ((i * 17) % 12);
      const c = ["#2f7a4c", "#3b8f5a", "#46a36b"][i % 3];
      arboles.push(`<circle cx="${x}" cy="${206 - r * 0.6}" r="${r}" fill="${c}"/>`);
    }
    const contenido = `
      <defs>
        ${Ilustraciones.degradado(`cielo${u}`, ["#7fd0ec", "#dff4f4"])}
        ${Ilustraciones.degradado(`roca${u}`, ["#e6d6b3", "#b99f73"])}
        ${Ilustraciones.degradado(`mar${u}`, ["#26b5cf", "#0d6d9a", "#0a3f63"])}
        ${Ilustraciones.degradado(`dulce${u}`, ["#5fd6e6", "#2a9cc4"])}
        <linearGradient id="luz${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="1200" height="520" fill="url(#cielo${u})"/>
      <circle cx="1010" cy="80" r="44" fill="#ffe7a1"/>
      <g fill="#ffffff" opacity=".85"><ellipse cx="220" cy="70" rx="60" ry="14"/><ellipse cx="254" cy="60" rx="34" ry="13"/><ellipse cx="620" cy="52" rx="48" ry="11"/></g>
      <path d="M0 200 H700 L760 206 L1200 212 V520 H0Z" fill="url(#roca${u})"/>
      <g stroke="#a88e62" stroke-width="2" opacity=".55"><path d="M0 260 H300 M420 260 H720 M0 330 H260 M430 330 H760 M0 400 H780 M0 460 H800"/></g>
      ${arboles.join("")}
      <path d="M660 200 Q700 196 740 204 L760 206" stroke="#f3e5bd" stroke-width="10" fill="none"/>
      <g transform="translate(560 150)">
        <path d="M0 58 L10 0 L60 0 L70 58Z" fill="#8c7458"/>
        <ellipse cx="35" cy="-4" rx="60" ry="14" fill="#2d7148"/><ellipse cx="35" cy="-16" rx="42" ry="12" fill="#3a8a57"/>
      </g>
      <path d="M300 202 Q316 210 320 236 L420 236 Q424 210 440 202Z" fill="#6a5a44" opacity=".35"/>
      <path d="M318 206 L422 206 L446 300 Q460 330 452 352 L286 352 Q280 330 294 300Z" fill="#4a3d2c" opacity=".35"/>
      <path d="M326 206 L414 206 L396 352 L344 352Z" fill="url(#luz${u})"/>
      <g stroke="#6b4f33" stroke-width="3" fill="none"><path d="M336 204 Q342 260 334 320"/><path d="M404 204 Q398 256 408 316"/></g>
      <path d="M286 318 H452 Q560 322 700 336 Q820 348 900 352 L900 382 Q800 380 700 372 Q560 362 452 360 H286Z" fill="url(#dulce${u})"/>
      <path d="M286 360 H452 Q560 364 700 372 Q800 380 900 382 L1200 386 V520 H286Z" fill="#12507a" opacity=".85"/>
      <path class="flujo" d="M300 338 Q500 344 700 354 Q820 362 900 366" stroke="#e9fcff" stroke-width="3" stroke-dasharray="10 12" fill="none"/>
      <path d="M760 206 Q900 212 1200 212 V520 H880 Q860 440 820 400 Q790 360 760 206Z" fill="url(#mar${u})"/>
      <g fill="#ffffff" opacity=".13"><path d="M880 212 L930 212 L860 520 L820 520Z"/><path d="M1040 212 L1070 212 L1020 520 L990 520Z"/></g>
      <path class="ola" d="M760 214 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#ffffff" stroke-opacity=".7" stroke-width="3" fill="none"/>
      <path d="M880 520 Q920 470 980 480 Q1060 462 1120 486 Q1170 470 1200 480 V520Z" fill="#e8d7a4"/>
      <g stroke="#e0895a" stroke-width="12" stroke-linecap="round" fill="none"><path d="M990 486 L990 452 L964 426 M990 452 L1018 424 M964 426 L954 404 M1018 424 L1030 402"/></g>
      <g stroke="#f06d8c" stroke-width="8" stroke-linecap="round" fill="none"><path d="M1110 486 L1110 458 L1096 440 M1110 458 L1126 440"/></g>
      <path d="M1050 490 Q1050 462 1076 460 Q1100 462 1100 490Z" fill="#c4b25f"/>
      <g class="pez"><path d="M1060 300 q14 -9 28 0 q-14 9 -28 0z M1060 300 l-10 -7 v14z" fill="#ffd23f"/></g>
      <g class="pez pez-2"><path d="M960 340 q12 -8 24 0 q-12 8 -24 0z M984 340 l9 -6 v12z" fill="#7ee0c3"/></g>
      <g transform="translate(1140 250)" class="tortuga-nado"><ellipse cx="0" cy="0" rx="26" ry="18" fill="#8a6a3c"/><ellipse cx="30" cy="-2" rx="9" ry="7" fill="#7ea264"/><ellipse cx="-4" cy="-20" rx="16" ry="6" transform="rotate(-25 -4 -20)" fill="#6d8f54"/><ellipse cx="-4" cy="20" rx="16" ry="6" transform="rotate(25 -4 20)" fill="#6d8f54"/></g>
      <g font-family="Figtree, system-ui, sans-serif" font-size="17" font-weight="700" fill="#0c2d3b">
        <text x="40" y="180" fill="#0f3d27">selva</text>
        <text x="468" y="296" fill="#3e3120">cenote</text>
        <text x="520" y="354" fill="#063247">río subterráneo</text>
        <text x="300" y="400" fill="#e6f6ff">agua salada</text>
        <text x="980" y="250" fill="#ffffff">Mar Caribe</text>
        <text x="1004" y="440" fill="#ffffff">arrecife</text>
      </g>`;
    return `<svg class="ilustracion portada-svg" viewBox="${viewBox}" role="img" aria-label="Corte transversal de Quintana Roo: la selva sobre roca caliza, un cenote conectado a un río subterráneo que desemboca en el Mar Caribe, donde está el arrecife" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${contenido}</svg>`;
  }

  /* ---------------------------------------------------------------------
     DIAGRAMAS EDUCATIVOS
     --------------------------------------------------------------------- */

  /** Formación de un cenote en 4 etapas (paso 1 a 4). */
  static formacionCenote(paso) {
    const u = idUnico("fc");
    const capas = `<g stroke="#a88e62" stroke-width="1.5" opacity=".6"><path d="M0 100 H400 M0 150 H400 M0 200 H400"/></g>`;
    const superficie = paso < 4
      ? `<path d="M0 60 H400 V72 H0Z" fill="#6d9b5a"/>`
      : `<path d="M0 60 H150 V72 H0Z M250 60 H400 V72 H250Z" fill="#6d9b5a"/>`;
    const arboles = `<g fill="#3a8a57"><circle cx="40" cy="50" r="16"/><circle cx="80" cy="46" r="18"/><circle cx="330" cy="48" r="17"/><circle cx="370" cy="50" r="15"/>${paso < 4 ? `<circle cx="200" cy="46" r="18"/><circle cx="240" cy="50" r="15"/>` : ""}</g>`;
    let extra = "";
    if (paso === 1) {
      const gotas = [60, 110, 170, 230, 290, 350].map((x, i) => `<path class="gota" style="animation-delay:${i * 0.25}s" d="M${x} ${14 + (i % 2) * 8} q4 8 0 12 q-4 -4 0 -12z" fill="#2f8fd1"/>`).join("");
      const flechas = [120, 200, 280].map((x) => `<path d="M${x} 80 v36 m-5 -7 l5 7 l5 -7" stroke="#2f8fd1" stroke-width="2.5" fill="none"/>`).join("");
      extra = `${gotas}${flechas}<text x="206" y="138" font-size="13" font-weight="700" fill="#3e3120">agua + CO₂ = ácido carbónico</text>`;
    } else if (paso === 2) {
      extra = `<g fill="#6b5a44" opacity=".55"><ellipse cx="200" cy="170" rx="46" ry="16"/><ellipse cx="120" cy="190" rx="22" ry="8"/><ellipse cx="290" cy="186" rx="26" ry="9"/><ellipse cx="170" cy="130" rx="14" ry="6"/></g>
        <text x="130" y="236" font-size="13" font-weight="700" fill="#3e3120">la roca se disuelve y forma huecos</text>`;
    } else if (paso === 3) {
      extra = `<path d="M90 190 Q90 110 200 104 Q310 110 310 190Z" fill="#4a3d2c" opacity=".6"/>
        <g fill="#c7b089">${[130, 160, 190, 220, 250, 280].map((x, i) => `<path d="M${x} ${112 + (i % 3) * 4} l6 ${18 + (i % 2) * 8} l6 -${18 + (i % 2) * 8}z"/>`).join("")}</g>
        <rect x="92" y="170" width="216" height="20" fill="#3aa9cf" opacity=".85"/>
        <text x="118" y="236" font-size="13" font-weight="700" fill="#3e3120">se forma una cueva con estalactitas</text>`;
    } else {
      extra = `<path d="M150 60 L250 60 L300 110 Q316 150 306 190 L94 190 Q84 150 100 110Z" fill="#4a3d2c" opacity=".55"/>
        <path d="M156 60 L244 60 L226 190 L174 190Z" fill="url(#l${u})"/>
        <g fill="#8c7458"><path d="M178 190 l10 -26 l12 26z"/><path d="M204 190 l14 -34 l14 34z"/></g>
        <rect x="96" y="160" width="208" height="30" fill="#34b8d8" opacity=".9"/>
        <g stroke="#6b4f33" stroke-width="2" fill="none"><path d="M160 60 Q164 100 158 150"/><path d="M240 60 Q236 98 244 148"/></g>
        <text x="122" y="236" font-size="13" font-weight="700" fill="#3e3120">el techo colapsa: ¡nace un cenote!</text>`;
    }
    const contenido = `<defs>${Ilustraciones.degradado(`r${u}`, ["#eadbb9", "#c6ae83"])}${Ilustraciones.degradado(`c${u}`, ["#a6dcf2", "#e9f6f8"])}
        <linearGradient id="l${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#r${u})"/>
      <rect width="400" height="60" fill="url(#c${u})"/>
      ${capas}${superficie}${arboles}
      <g font-family="Figtree, system-ui, sans-serif">${extra}</g>`;
    return Ilustraciones.svg("0 0 400 260", contenido, `Formación de un cenote, etapa ${paso} de 4`, "diagrama");
  }

  /** Corte del acuífero: lente de agua dulce sobre agua salada. */
  static acuifero() {
    const u = idUnico("aq");
    const contenido = `<defs>${Ilustraciones.degradado(`c${u}`, ["#a8def2", "#eaf7f8"])}${Ilustraciones.degradado(`r${u}`, ["#e6d6b3", "#c2a97c"])}</defs>
      <rect width="600" height="300" fill="url(#c${u})"/>
      <path d="M0 90 H440 Q470 92 500 104 L600 106 V300 H0Z" fill="url(#r${u})"/>
      <g fill="#3a8a57"><circle cx="40" cy="80" r="18"/><circle cx="90" cy="76" r="20"/><circle cx="150" cy="80" r="17"/><circle cx="260" cy="78" r="19"/><circle cx="330" cy="80" r="16"/><circle cx="390" cy="78" r="18"/></g>
      <path d="M470 100 Q540 104 600 104 V300 H500 Q490 180 470 100Z" fill="#1a7fb0"/>
      <path d="M0 150 Q300 150 440 170 Q480 180 500 200 L500 214 Q470 200 430 196 Q300 186 0 196Z" fill="#5fd0e6" opacity=".95"/>
      <path d="M0 196 Q300 186 430 196 Q470 200 500 214 V300 H0Z" fill="#185f8c" opacity=".92"/>
      <path d="M0 196 Q300 186 430 196 Q470 200 500 214" stroke="#ffffff" stroke-dasharray="7 6" stroke-width="2" fill="none"/>
      <path d="M200 90 L210 150 L250 150 L260 90Z" fill="#4a3d2c" opacity=".35"/>
      <rect x="208" y="140" width="46" height="12" fill="#5fd0e6"/>
      <g stroke="#2b7fc4" stroke-width="2.5" fill="none" class="flujo" stroke-dasharray="8 8"><path d="M60 40 V130"/><path d="M160 40 V130"/><path d="M330 40 V130"/></g>
      <path class="flujo" d="M40 172 H420 l-8 -6 m8 6 l-8 6" stroke="#0b4a70" stroke-width="2.5" fill="none" stroke-dasharray="10 8"/>
      <path d="M560 250 Q520 240 490 236 l8 -6 m-8 6 l8 6" stroke="#ffffff" stroke-width="2.5" fill="none"/>
      <g font-family="Figtree, system-ui, sans-serif" font-size="14" font-weight="700">
        <text x="20" y="30" fill="#0b4a70">lluvia que se infiltra</text>
        <text x="20" y="168" fill="#063247">agua dulce (lente)</text>
        <text x="20" y="226" fill="#e6f6ff">agua salada</text>
        <text x="24" y="250" fill="#cfeaff" font-size="12">haloclina: límite entre agua dulce y salada</text>
        <text x="514" y="134" fill="#ffffff">mar</text>
        <text x="420" y="280" fill="#ffffff" font-size="12">intrusión salina si se</text>
        <text x="420" y="295" fill="#ffffff" font-size="12">extrae demasiada agua</text>
        <text x="196" y="80" fill="#3e3120" font-size="12">cenote</text>
      </g>`;
    return Ilustraciones.svg("0 0 600 300", contenido, "Corte del acuífero de Quintana Roo: la lluvia se infiltra, forma una capa de agua dulce que flota sobre agua salada y fluye hacia el mar", "diagrama");
  }

  /** Diagrama de la biósfera como intersección de las otras esferas. */
  static esferas() {
    const contenido = `
      <circle cx="150" cy="115" r="82" fill="#7cc6ef" fill-opacity=".55" stroke="#2b86c4" stroke-width="2"/>
      <circle cx="250" cy="115" r="82" fill="#3aa3c9" fill-opacity=".45" stroke="#136b8f" stroke-width="2"/>
      <circle cx="200" cy="195" r="82" fill="#c9a26b" fill-opacity=".55" stroke="#8a6a3c" stroke-width="2"/>
      <circle cx="200" cy="145" r="30" fill="#4fae6b" stroke="#1f6b45" stroke-width="3"/>
      <g font-family="Figtree, system-ui, sans-serif" font-weight="700" text-anchor="middle">
        <text x="112" y="92" font-size="15" fill="#0b3d5c">Atmósfera</text>
        <text x="112" y="110" font-size="11" fill="#0b3d5c">aire, clima</text>
        <text x="290" y="92" font-size="15" fill="#073a4f">Hidrosfera</text>
        <text x="290" y="110" font-size="11" fill="#073a4f">agua</text>
        <text x="200" y="250" font-size="15" fill="#4a3217">Litosfera</text>
        <text x="200" y="266" font-size="11" fill="#4a3217">roca y suelo</text>
        <text x="200" y="142" font-size="13" fill="#ffffff">Biósfera</text>
        <text x="200" y="157" font-size="10" fill="#ffffff">la vida</text>
      </g>`;
    return `<svg class="ilustracion diagrama-esferas" viewBox="0 0 400 290" role="img" aria-label="Diagrama: la biósfera está donde se unen la atmósfera, la hidrosfera y la litosfera" xmlns="http://www.w3.org/2000/svg">${contenido}</svg>`;
  }

  /** Zonificación de una reserva de la biósfera. */
  static zonificacion() {
    const contenido = `
      <ellipse cx="200" cy="130" rx="180" ry="110" fill="#cfe7b9" stroke="#6f9a52" stroke-width="2" stroke-dasharray="6 5"/>
      <ellipse cx="200" cy="130" rx="130" ry="78" fill="#8cc47a" stroke="#4f8a3c" stroke-width="2"/>
      <ellipse cx="200" cy="130" rx="70" ry="42" fill="#2f7d4f" stroke="#1d5234" stroke-width="2"/>
      <g font-family="Figtree, system-ui, sans-serif" font-weight="700" text-anchor="middle">
        <text x="200" y="128" font-size="14" fill="#ffffff">Zona núcleo</text>
        <text x="200" y="145" font-size="10.5" fill="#e8f7ea">protección estricta</text>
        <text x="200" y="74" font-size="13" fill="#1f4d2a">Zona de amortiguamiento</text>
        <text x="200" y="198" font-size="10.5" fill="#1f4d2a">usos sustentables regulados</text>
        <text x="200" y="36" font-size="12" fill="#3f5d2a">Comunidades y alrededores</text>
      </g>`;
    return `<svg class="ilustracion diagrama-zonas" viewBox="0 0 400 260" role="img" aria-label="Zonificación de una reserva de la biósfera: zona núcleo al centro rodeada por la zona de amortiguamiento" xmlns="http://www.w3.org/2000/svg">${contenido}</svg>`;
  }

  /** Silueta del estado para el tríptico (usa la geometría real del INEGI). */
  static siluetaEstado(lugares = []) {
    if (typeof MAPA_GEO === "undefined") return "";
    const puntos = lugares
      .map((l) => {
        const { x, y } = l.proyectar(MAPA_GEO.proyeccion);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17" fill="${l.color}" stroke="#ffffff" stroke-width="5"/>`;
      })
      .join("");
    return `<svg class="silueta-estado" viewBox="0 0 ${MAPA_GEO.ancho} ${MAPA_GEO.alto}" role="img" aria-label="Silueta de Quintana Roo con algunas áreas naturales protegidas" xmlns="http://www.w3.org/2000/svg">
      <path d="${MAPA_GEO.estado}" fill="#2f8f63" stroke="#1d5f41" stroke-width="3"/>${puntos}</svg>`;
  }
}
