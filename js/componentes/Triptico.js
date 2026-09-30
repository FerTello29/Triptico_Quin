/* ==========================================================================
   Triptico.js — el tríptico físico de 6 paneles (hoja carta horizontal,
   impresión a doble cara) y los datos editables del estudiante.

   Distribución estándar de un tríptico:
     EXTERIOR:  [Presentación (solapa)] [Contraportada] [Portada]
     INTERIOR:  [Ecosistemas · Biodiversidad · Biósfera] [Esferas · Ciclos]
                [Actividades humanas · Gobierno · Programas sensoriales]
   ========================================================================== */
"use strict";

class DatosEstudiante {
  static campos = [
    { id: "nombre", etiqueta: "Nombre", porDefecto: "Fernando Rosales Tello" },
    { id: "materia", etiqueta: "Materia", porDefecto: "Desarrollo Sustentable" },
    { id: "profesor", etiqueta: "Profesor(a)", porDefecto: "Jimenez Islas Isamar Guadalupe" },
    { id: "grado", etiqueta: "Grado/semestre", porDefecto: "8vo Semestre" },
    { id: "institucion", etiqueta: "Institución", porDefecto: "Instituto Tecnologico Nacional de México Campus Pachuca" },
  ];

  static #valores = null;

  static get valores() {
    if (!DatosEstudiante.#valores) {
      const guardados = Almacen.leer("estudiante", {}) || {};
      DatosEstudiante.#valores = Object.fromEntries(
        DatosEstudiante.campos.map((c) => [c.id, typeof guardados[c.id] === "string" ? guardados[c.id] : c.porDefecto])
      );
    }
    return DatosEstudiante.#valores;
  }

  /** Valor para mostrar: si está vacío se deja una línea para llenar a mano. */
  static valor(id) {
    const v = (DatosEstudiante.valores[id] || "").trim();
    return v || "__________________";
  }

  static actualizar(id, valor) {
    DatosEstudiante.valores[id] = valor;
    Almacen.guardar("estudiante", DatosEstudiante.valores);
    $$(`[data-estudiante="${id}"]`).forEach((el) => { el.textContent = DatosEstudiante.valor(id); });
  }

  static renderFormulario() {
    return `<form class="form-estudiante" id="form-estudiante" novalidate>
      <fieldset>
        <legend>Datos del estudiante</legend>
        <p class="nota">Lo que escribas aquí aparece en la portada del tríptico y en la primera diapositiva. Se guarda solo en este navegador. Si dejas un campo vacío, se imprime una línea para llenarlo a mano.</p>
        <div class="form-rejilla">${DatosEstudiante.campos
          .map((c) => `<label for="estudiante-${c.id}"><span>${c.etiqueta}</span>
            <input id="estudiante-${c.id}" name="${c.id}" type="text" autocomplete="off" value="${esc(DatosEstudiante.valores[c.id])}" placeholder="__________________"></label>`)
          .join("")}</div>
      </fieldset>
    </form>`;
  }

  static conectar() {
    const form = document.getElementById("form-estudiante");
    if (!form) return;
    form.addEventListener("submit", (e) => e.preventDefault());
    form.addEventListener("input", (e) => {
      if (e.target.name) DatosEstudiante.actualizar(e.target.name, e.target.value);
    });
  }
}

class Triptico {
  constructor() {
    this.cara = "exterior";
  }

  estudiante(id) {
    return `<span data-estudiante="${id}">${esc(DatosEstudiante.valor(id))}</span>`;
  }

  /* -------------------- Paneles del EXTERIOR -------------------- */
  panelPresentacion() {
    const inicio = seccionPorId("inicio");
    const destacados = ["sian-kaan", "caribe-mexicano", "banco-chinchorro", "tiburon-ballena", "yum-balam", "bacalar"].map((id) => LUGARES.find((l) => l.id === id));
    return `<section class="panel panel-presentacion">
      <p class="t-etiqueta">Presentación</p>
      <h2>¿Por qué Quintana Roo?</h2>
      <p>Quintana Roo, en el oriente de la península de Yucatán, reúne selvas, manglares, cenotes, lagunas y parte del Sistema Arrecifal Mesoamericano. Todos estos ecosistemas están <strong>conectados por el agua</strong>: la lluvia se infiltra en la roca caliza, viaja por ríos subterráneos y llega al mar.</p>
      <h3>El estado en cifras</h3>
      <ul class="t-cifras">${inicio.datos.map((d) => `<li><strong>${d.valor}${d.unidad ? ` ${d.unidad}` : ""}</strong><span>${d.texto}</span></li>`).join("")}</ul>
      <div class="t-mapa">
        ${Ilustraciones.siluetaEstado(destacados)}
        <ul class="t-mapa-leyenda">${destacados.map((l) => `<li><span style="background:${l.color}"></span>${esc(l.nombre.replace("Reserva de la Biósfera ", "RB ").replace("Área de Protección de Flora y Fauna ", "APFF "))}</li>`).join("")}</ul>
      </div>
      <div class="t-sabias"><strong>¿Sabías que…?</strong> En 2018 se confirmó que los sistemas Sac Actun y Dos Ojos, en Tulum, están conectados: 347 km explorados, el sistema de cuevas inundadas más largo conocido.</div>
      <h3>En este tríptico</h3>
      <p class="t-indice">Ecosistemas · Biodiversidad · Biósfera · Hidrosfera · Litosfera · Atmósfera · Ciclos biogeoquímicos · Actividades humanas · Acciones del gobierno · Programas sensoriales</p>
    </section>`;
  }

  panelContraportada() {
    const principales = FUENTES.filter((f) => ["INEGI", "CONABIO", "CONANP", "SEMARNAT · Diario Oficial de la Federación", "UNESCO", "Gobierno de Quintana Roo · IBANQROO"].includes(f.institucion)).slice(0, 7);
    return `<section class="panel panel-contraportada">
      <p class="t-etiqueta">Conclusión</p>
      <h2>Todo está conectado</h2>
      <p>La selva protege el agua que se infiltra; esa agua recorre cenotes y ríos subterráneos hasta el mar, donde está el arrecife. <strong>Lo que hacemos en tierra llega al mar.</strong> Cuidar Quintana Roo es tarea del gobierno y también de cada persona.</p>
      <h3>¿Qué puedo hacer yo?</h3>
      <ul class="t-acciones">
        <li><span aria-hidden="true">💧</span> Ahorrar agua y no tirar químicos ni basura al drenaje o a los cenotes.</li>
        <li><span aria-hidden="true">🛍️</span> Evitar bolsas, popotes y unicel desechables.</li>
        <li><span aria-hidden="true">🌳</span> Plantar especies nativas, como ceiba, chacá o chicozapote.</li>
        <li><span aria-hidden="true">🐢</span> Respetar las áreas protegidas, la fauna y las vedas.</li>
        <li><span aria-hidden="true">🤿</span> Visitar arrecifes y cenotes sin tocar y sin bloqueadores dañinos.</li>
      </ul>
      <h3>Glosario</h3>
      <dl class="t-glosario">
        <div><dt>Acuífero:</dt><dd>capa de roca que guarda agua subterránea.</dd></div>
        <div><dt>Endémica:</dt><dd>especie que solo vive en un lugar.</dd></div>
        <div><dt>Haloclina:</dt><dd>límite entre agua dulce y salada.</dd></div>
        <div><dt>Karst:</dt><dd>paisaje de roca caliza disuelta por el agua.</dd></div>
      </dl>
      <h3>Fuentes principales</h3>
      <ol class="t-fuentes">${principales.map((f) => `<li>${esc(f.citaCorta)}</li>`).join("")}<li>Más fuentes en la aplicación web del proyecto.</li></ol>
      <p class="t-pie">Elaborado por ${this.estudiante("nombre")}. Ilustraciones originales del proyecto. Mapa: límites del INEGI.</p>
    </section>`;
  }

  panelPortada() {
    return `<section class="panel panel-portada">
      <div class="t-portada-arte">${Ilustraciones.portada("250 90 620 430")}</div>
      <div class="t-portada-texto">
        <p class="t-etiqueta">Tríptico informativo</p>
        <h1><span>Quintana Roo</span> Ecosistemas, Biodiversidad y Equilibrio Ambiental</h1>
        <p class="t-lema">Selva · Cenotes · Manglares · Arrecife</p>
        <p class="t-bajada">Un recorrido por la selva, el agua subterránea y el arrecife del Caribe mexicano, y por lo que podemos hacer para cuidarlos.</p>
        <ul class="t-portada-especies">${["jaguar", "tortuga-verde", "flamenco", "manati"].map((id) => { const e = ESPECIES.find((x) => x.id === id); return `<li>${Ilustraciones.especie(e.id, e.nombre)}<span>${esc(e.nombre.replace(" del Caribe", "").replace(" americano", ""))}</span></li>`; }).join("")}</ul>
      </div>
      <dl class="t-estudiante">${DatosEstudiante.campos.map((c) => `<div><dt>${c.etiqueta}:</dt><dd>${this.estudiante(c.id)}</dd></div>`).join("")}</dl>
    </section>`;
  }

  /* -------------------- Paneles del INTERIOR -------------------- */
  panelVida() {
    const frases = {
      selva: "Cubre la mayor parte del estado; captura carbono.",
      manglar: "Protege la costa; guardería de peces.",
      arrecife: "Parte del Sistema Arrecifal Mesoamericano.",
      dunas: "Barrera natural; ahí anidan tortugas.",
      humedales: "Filtran agua; reciben aves migratorias.",
      lagunas: "Como Bacalar, con estromatolitos.",
      playas: "Arena de coral y pastos marinos.",
      cenotes: "Ventanas al agua subterránea.",
    };
    const riesgo = ["jaguar", "manati", "tortuga-verde", "mono-arana", "flamenco", "tiburon-ballena"].map((id) => ESPECIES.find((e) => e.id === id));
    return `<section class="panel panel-vida">
      <h2><span aria-hidden="true">🌴</span> Ecosistemas</h2>
      <ul class="t-ecos">${ECOSISTEMAS.map((e) => `<li><strong>${e.emoji} ${esc(e.nombre.replace(" y ecosistemas costeros", ""))}:</strong> ${frases[e.id]}</li>`).join("")}</ul>
      <h2><span aria-hidden="true">🦜</span> Biodiversidad</h2>
      <p>Es la variedad de la vida: genes, especies y ecosistemas. En el estado se han registrado <strong>7,938 especies</strong>, entre ellas <strong>483 aves</strong> y <strong>19 especies endémicas</strong> (CONABIO–ECOSUR).</p>
      <ul class="t-especies">${riesgo.map((e) => `<li>${Ilustraciones.especie(e.id, e.nombre)}<span>${esc(e.nombre)}<em>${e.nom059}</em></span></li>`).join("")}</ul>
      <p class="t-nota">P: en peligro de extinción · A: amenazada (NOM-059-SEMARNAT-2010)</p>
      <h2><span aria-hidden="true">🌎</span> Biósfera</h2>
      <p>Es la capa donde existe la vida: donde se unen aire, agua y suelo. Las <strong>reservas de la biósfera</strong> tienen una zona núcleo (protección estricta) y una de amortiguamiento (uso sustentable).</p>
      <ul class="t-lista">
        <li><strong>Sian Ka'an</strong> (1986): 528,148 ha; Patrimonio Mundial desde 1987.</li>
        <li><strong>Caribe Mexicano</strong> (2016): más de 5.7 millones de ha de mar.</li>
        <li><strong>Banco Chinchorro</strong> (1996) y <strong>Tiburón Ballena</strong> (2009).</li>
      </ul>
      <div class="t-diagrama t-diagrama-zonas">${Ilustraciones.zonificacion()}</div>
    </section>`;
  }

  panelEsferas() {
    return `<section class="panel panel-esferas">
      <h2><span aria-hidden="true">💧</span> Hidrosfera</h2>
      <ul class="t-lista">
        <li>Casi no hay ríos en la superficie: la lluvia (800–1,500 mm al año) se infiltra y forma <strong>ríos subterráneos</strong>.</li>
        <li>En los cenotes, el agua dulce flota sobre el agua salada (<strong>haloclina</strong>).</li>
        <li>El acuífero es la única fuente natural de agua dulce: las aguas negras y la sobreexplotación lo ponen en riesgo.</li>
      </ul>
      <div class="t-diagrama t-diagrama-agua">${Ilustraciones.acuifero().replace("xMidYMid slice", "xMidYMid meet")}</div>
      <h2><span aria-hidden="true">🪨</span> Litosfera</h2>
      <div class="t-cenote">${Ilustraciones.formacionCenote(4).replace("xMidYMid slice", "xMidYMid meet")}</div>
      <ul class="t-lista">
        <li>Roca <strong>caliza</strong> formada bajo el mar; relieve casi plano (máximo ≈ 200 m, Cerro El Charro).</li>
        <li>Suelos delgados: 58 % son leptosoles.</li>
        <li><strong>Cenote</strong> = el agua con CO₂ disuelve la caliza, se forma una cueva y su techo se derrumba.</li>
      </ul>
      <h2><span aria-hidden="true">☁️</span> Atmósfera</h2>
      <ul class="t-lista">
        <li>Clima cálido subhúmedo con lluvias en verano (99 % del estado); temperatura media de 26.5 °C.</li>
        <li>Huracanes del 1 de junio al 30 de noviembre: Gilberto (1988), Wilma (2005), Dean (2007), Beryl (2024).</li>
        <li>El cambio climático calienta el mar y blanquea los corales.</li>
      </ul>
      <h2><span aria-hidden="true">♻️</span> Ciclos biogeoquímicos</h2>
      <ul class="t-ciclos">
        <li style="--ciclo:#1f8fc7"><strong>Agua</strong> lluvia → infiltración → ríos subterráneos → mar.</li>
        <li style="--ciclo:#2f7d4f"><strong>Carbono</strong> selva y manglar capturan CO₂ (“carbono azul”).</li>
        <li style="--ciclo:#7b4fc9"><strong>Nitrógeno</strong> bacterias lo fijan; en exceso daña corales.</li>
        <li style="--ciclo:#0f9aa0"><strong>Oxígeno</strong> lo producen plantas y algas; las aguas negras lo agotan.</li>
      </ul>
    </section>`;
  }

  panelSociedad() {
    const filas = [
      ["🏨 Turismo", "Pérdida de manglar y dunas", "Turismo responsable"],
      ["🏙️ Urbanización", "Aguas residuales al acuífero", "Plantas de tratamiento"],
      ["🌽 Agricultura y ganadería", "Deforestación e incendios", "Agroforestería"],
      ["🎣 Pesca", "Sobrepesca de langosta y caracol", "Respetar vedas"],
      ["🗑️ Residuos", "Plásticos en el mar", "Reducir y reciclar"],
    ];
    return `<section class="panel panel-sociedad">
      <h2><span aria-hidden="true">👥</span> Actividades humanas</h2>
      <table class="t-tabla">
        <thead><tr><th scope="col">Actividad</th><th scope="col">Impacto</th><th scope="col">Solución</th></tr></thead>
        <tbody>${filas.map((f) => `<tr><th scope="row">${f[0]}</th><td>${f[1]}</td><td>${f[2]}</td></tr>`).join("")}</tbody>
      </table>
      <h2><span aria-hidden="true">🏛️</span> Acciones del gobierno</h2>
      <div class="t-niveles">
        <div><h3>Federal</h3><ul><li>CONANP: áreas protegidas</li><li>SEMARNAT: NOM-059 y NOM-022</li><li>PROFEPA: vigilancia</li><li>SEMAR: sargazo</li></ul></div>
        <div><h3>Estatal</h3><ul><li>SEMA: ordenamiento</li><li>IBANQROO: ANP estatales</li><li>Ley contra plásticos (2019)</li></ul></div>
        <div><h3>Municipal</h3><ul><li>Recolección de basura</li><li>Limpieza de playas</li><li>Reglamentos de ecología</li></ul></div>
      </div>
      <h2><span aria-hidden="true">👁️</span> Programas sensoriales</h2>
      <p>Actividades para conocer la naturaleza con los sentidos:</p>
      <ul class="t-lista t-sentidos">
        <li>👣 Recorridos interpretativos en Sian Ka'an.</li>
        <li>🐦 Observación de aves en Isla Contoy.</li>
        <li>🍃 Identificar plantas por su olor y textura en el Jardín Botánico de Puerto Morelos.</li>
        <li>🎧 Reconocer el rugido del saraguato y el canto de las aves.</li>
        <li>🌿 Senderos educativos, como el de las dunas en Isla Contoy.</li>
        <li>🛶 Recorrer canales de manglar en kayak, sin tocar la fauna.</li>
      </ul>
      <p class="t-nota">Generan conciencia porque lo que se vive con los sentidos se recuerda mejor y crea un vínculo con la naturaleza.</p>
      <p class="t-frase">“Lo que se conoce, se quiere; lo que se quiere, se cuida.”</p>
    </section>`;
  }

  /** Las dos caras de la hoja. */
  renderHojas() {
    return `<div class="hoja hoja-exterior" data-cara="exterior" aria-label="Cara exterior del tríptico">
        ${this.panelPresentacion()}${this.panelContraportada()}${this.panelPortada()}
      </div>
      <div class="hoja hoja-interior" data-cara="interior" aria-label="Cara interior del tríptico">
        ${this.panelVida()}${this.panelEsferas()}${this.panelSociedad()}
      </div>`;
  }

  /** Vista previa en pantalla + controles. */
  render() {
    return `<div class="triptico-app">
      <div class="triptico-controles">
        <div class="segmentado" role="group" aria-label="Cara del tríptico">
          <button type="button" data-cara-ver="exterior" aria-pressed="true">Exterior <small>(portada)</small></button>
          <button type="button" data-cara-ver="interior" aria-pressed="false">Interior</button>
          <button type="button" data-cara-ver="ambas" aria-pressed="false">Ambas</button>
        </div>
        <div class="triptico-acciones">
          <button type="button" class="boton boton-primario" data-imprimir="imprimir"><span aria-hidden="true">🖨️</span> Imprimir tríptico</button>
          <button type="button" class="boton boton-linea" data-imprimir="pdf"><span aria-hidden="true">📄</span> Guardar como PDF</button>
        </div>
      </div>
      <div class="triptico-escala" data-mostrar="exterior">
        <div class="triptico-hojas">${this.renderHojas()}</div>
      </div>
      <p class="nota">Vista previa a escala de una hoja tamaño carta en horizontal. Al imprimir, cada cara ocupa una hoja completa: imprime a doble cara y dobla en tres.</p>
    </div>`;
  }

  /** Ajusta la escala de la vista previa al ancho disponible. */
  ajustarEscala() {
    const caja = $(".triptico-escala");
    if (!caja) return;
    // Una hoja carta horizontal mide 11 × 8.5 pulgadas = 1056 × 816 píxeles CSS
    const anchoHoja = 1056;
    const altoHoja = 816;
    const escala = Math.min(1, caja.clientWidth / anchoHoja);
    caja.style.setProperty("--escala", escala.toFixed(4));
    const ambas = caja.dataset.mostrar === "ambas";
    caja.style.height = `${(ambas ? altoHoja * 2 + 24 : altoHoja) * escala}px`;
  }

  mostrarCara(cara) {
    const caja = $(".triptico-escala");
    caja.dataset.mostrar = cara;
    $$("[data-cara-ver]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.caraVer === cara)));
    this.ajustarEscala();
  }

  /** Coloca una copia sin escalar para imprimir, al final del documento. */
  prepararImpresion() {
    const destino = document.getElementById("triptico-impresion");
    if (destino) destino.innerHTML = this.renderHojas();
  }

  /** Ventana con instrucciones y botón para abrir el diálogo de impresión. */
  abrirDialogoImpresion(modo = "imprimir") {
    const enMarco = window.self !== window.top;
    const pasos = [
      "Tamaño de papel: <strong>Carta</strong> (Letter).",
      "Orientación: <strong>Horizontal</strong>.",
      "Márgenes: <strong>Ninguno</strong> (o “Mínimo”).",
      "Activa <strong>Gráficos de fondo</strong> (en Chrome y Edge está en “Más opciones”).",
      "Escala: <strong>100 %</strong> (predeterminada).",
      modo === "pdf"
        ? "En <strong>Destino</strong> elige <strong>Guardar como PDF</strong> y presiona Guardar."
        : "Doble cara: <strong>Voltear por el borde corto</strong>. Si tu impresora no imprime a doble cara, imprime la página 1, vuelve a meter la hoja y luego imprime la página 2.",
    ];
    const html = `<div class="dialogo-impresion">
      <p>${modo === "pdf" ? "Para guardar el tríptico como PDF se usa la función de impresión del navegador." : "El tríptico se imprime en <strong>una hoja carta por las dos caras</strong>: página 1 = exterior (portada), página 2 = interior."}</p>
      <ol class="pasos">${pasos.map((p) => `<li>${p}</li>`).join("")}</ol>
      <h4>Cómo doblarlo</h4>
      <ol class="pasos">
        <li>Coloca la hoja con el <strong>interior hacia arriba</strong>.</li>
        <li>Dobla el panel derecho hacia el centro.</li>
        <li>Dobla el panel izquierdo encima. La portada queda al frente.</li>
      </ol>
      ${enMarco ? `<p class="aviso-marco">Estás viendo la app dentro de una vista previa que no permite imprimir. Abre la versión descargada o publicada (GitHub Pages o Vercel) y usa este botón, o presiona <kbd>Ctrl</kbd> + <kbd>P</kbd> (<kbd>⌘</kbd> + <kbd>P</kbd> en Mac).</p>` : ""}
      <div class="dialogo-acciones">
        <button type="button" class="boton boton-primario" data-imprimir-ahora="1"><span aria-hidden="true">${modo === "pdf" ? "📄" : "🖨️"}</span> ${modo === "pdf" ? "Abrir y guardar como PDF" : "Abrir impresión"}</button>
        <button type="button" class="boton boton-suave" data-cerrar-modal>Cancelar</button>
      </div>
    </div>`;
    Modal.abrir({ titulo: modo === "pdf" ? "📄 Guardar como PDF" : "🖨️ Imprimir tríptico", html, clase: "modal-angosto" });
  }

  imprimir() {
    this.prepararImpresion();
    Modal.cerrar();
    // Espera a que se cierre el modal antes de abrir el diálogo del navegador
    setTimeout(() => window.print(), 150);
  }

  conectar() {
    const app = $(".triptico-app");
    if (!app) return;
    app.addEventListener("click", (evento) => {
      const cara = evento.target.closest("[data-cara-ver]");
      if (cara) this.mostrarCara(cara.dataset.caraVer);
    });
    document.addEventListener("click", (evento) => {
      const abrir = evento.target.closest("[data-imprimir]");
      if (abrir) {
        evento.preventDefault();
        this.abrirDialogoImpresion(abrir.dataset.imprimir);
      }
      if (evento.target.closest("[data-imprimir-ahora]")) this.imprimir();
    });
    window.addEventListener("beforeprint", () => this.prepararImpresion());
    if ("ResizeObserver" in window) new ResizeObserver(() => this.ajustarEscala()).observe($(".triptico-escala"));
    window.addEventListener("resize", () => this.ajustarEscala());
    this.ajustarEscala();
    this.prepararImpresion();
  }
}
