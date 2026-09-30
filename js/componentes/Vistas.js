/* ==========================================================================
   Vistas.js — arma el contenido de cada sección de la página a partir de
   los objetos de datos (Seccion, Ecosistema, Especie, CicloBioquimico…).
   ========================================================================== */
"use strict";

class Vistas {
  /* ------------------------------------------------------------------
     INICIO
     ------------------------------------------------------------------ */
  static inicio(seccion) {
    const cifras = seccion.datos
      .map((d) => {
        const numero = Number(String(d.valor).replace(/,/g, ""));
        const contar = Number.isFinite(numero) ? ` data-contar="${numero}"` : "";
        return `<li><strong><span${contar}>${d.valor}</span>${d.unidad ? ` <small>${d.unidad}</small>` : ""}</strong><span>${d.texto}</span><em>${esc(d.fuente || "")}</em></li>`;
      })
      .join("");
    return `<div class="hero-texto envoltura">
        <p class="eyebrow">Tríptico interactivo · Quintana Roo, México</p>
        <h1 id="titulo-inicio"><span class="h1-estado">Quintana Roo</span> <span class="h1-tema">Ecosistemas, Biodiversidad y Equilibrio Ambiental</span></h1>
        <p class="hero-sub">${seccion.subtitulo}</p>
        <div class="hero-acciones">
          <button type="button" class="boton boton-primario boton-grande" data-abrir-presentacion><span aria-hidden="true">🎤</span> Modo Exposición</button>
          <a class="boton boton-linea" href="#triptico"><span aria-hidden="true">📄</span> Ver tríptico</a>
          <a class="boton boton-suave" href="#cuestionario"><span aria-hidden="true">🌱</span> ¿Cuánto aprendiste?</a>
        </div>
        <p class="hero-autor">Presenta: <strong data-estudiante="nombre">${esc(DatosEstudiante.valor("nombre"))}</strong></p>
        <a class="hero-mapa" href="#mapa" aria-label="Ir al mapa de Quintana Roo">
          ${Ilustraciones.siluetaEstado(["sian-kaan", "caribe-mexicano", "banco-chinchorro", "tiburon-ballena", "bacalar", "sac-actun"].map((id) => LUGARES.find((l) => l.id === id)))}
          <span class="hero-mapa-texto"><strong>44,705 km²</strong> entre el Golfo de México, el Mar Caribe y Belice <span aria-hidden="true">→</span></span>
        </a>
      </div>
      <div class="hero-arte">${Visual.crear({ ilustracion: Ilustraciones.portada(), clase: "hero-visual" })}</div>
      <div class="envoltura">
        <ul class="cifras" aria-label="Quintana Roo en cifras">${cifras}</ul>
      </div>`;
  }

  /* ------------------------------------------------------------------
     ECOSISTEMAS
     ------------------------------------------------------------------ */
  static ecosistemas(seccion) {
    const cadena = [
      ["🌴", "Selva", "protege el agua que se infiltra"],
      ["💧", "Cenote", "conecta con ríos subterráneos"],
      ["🌿", "Manglar y laguna", "filtran el agua antes del mar"],
      ["🪸", "Arrecife", "necesita agua limpia y clara"],
    ];
    return `<p class="intro">${seccion.intro}</p>
      <ol class="conexion" aria-label="Cómo se conectan los ecosistemas">${cadena
        .map(([e, t, d]) => `<li><span class="conexion-emoji" aria-hidden="true">${e}</span><strong>${t}</strong><span>${d}</span></li>`)
        .join("")}</ol>
      <div class="rejilla-eco">${ECOSISTEMAS.map((e) => e.renderTarjeta()).join("")}</div>
      ${seccion.renderPreguntaRapida()}`;
  }

  /* ------------------------------------------------------------------
     BIODIVERSIDAD
     ------------------------------------------------------------------ */
  static biodiversidad(seccion) {
    const niveles = [
      ["🧬", "Genética", "Diferencias dentro de una misma especie, como los colores y tamaños distintos entre jaguares."],
      ["🐆", "De especies", "La variedad de plantas, animales, hongos y microorganismos de un lugar."],
      ["🌎", "De ecosistemas", "La variedad de ambientes: selva, manglar, arrecife, cenote…"],
    ];
    const filtros = [["todas", "Todas"], ["fauna", "🐾 Fauna"], ["flora", "🌿 Flora"], ["riesgo", "⚠️ En riesgo (NOM-059)"], ["endemica", "📍 Endémicas"]];
    const acordeon = Acordeon.render([
      {
        icono: "💚", titulo: "¿Por qué es importante la biodiversidad?",
        contenido: listaHTML([
          "Produce oxígeno y limpia el agua y el aire.",
          "Da alimento, medicinas, madera y materiales (como el chicle).",
          "Los manglares, las dunas y los arrecifes protegen la costa de los huracanes.",
          "Polinizadores como las abejas meliponas hacen posible muchos cultivos.",
          "Sostiene el turismo y es parte de la cultura maya.",
        ]),
      },
      {
        icono: "⚠️", titulo: "Amenazas a la biodiversidad",
        contenido: listaHTML([
          "Pérdida y fragmentación del hábitat por desmonte y urbanización.",
          "Contaminación del agua, el suelo y el mar.",
          "Especies invasoras como el pez león, que se come a peces nativos del arrecife.",
          "Cambio climático: blanqueamiento de corales y huracanes más intensos.",
          "Cacería y tráfico ilegal de especies (por ejemplo, loros como mascotas).",
          "Sobreexplotación pesquera.",
        ]),
      },
      {
        icono: "🛡️", titulo: "Acciones para conservarla",
        contenido: listaHTML([
          "Respetar las Áreas Naturales Protegidas y sus reglas.",
          "No comprar animales ni plantas silvestres.",
          "Reducir plásticos y separar la basura.",
          "Reforestar con especies nativas.",
          "Hacer turismo responsable: no tocar corales ni alimentar fauna.",
          "Registrar observaciones en la plataforma ciudadana Naturalista (CONABIO).",
        ]),
      },
    ], "acordeon-bio");
    return `<p class="intro">${seccion.intro}</p>
      <div class="bio-cabecera">
        <ul class="niveles-bio">${niveles.map(([e, t, d]) => `<li><span aria-hidden="true">${e}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}</ul>
        ${seccion.renderDatos("datos-destacados datos-compactos")}
      </div>
      <h3 class="subtitulo-bloque">Especies de Quintana Roo</h3>
      <div class="filtros" role="group" aria-label="Filtrar especies">${filtros
        .map(([k, t], i) => `<button type="button" class="filtro" data-filtro-especie="${k}" aria-pressed="${i === 0}">${t}</button>`)
        .join("")}</div>
      <p class="leyenda-riesgo"><span class="insignia riesgo-p">P</span> En peligro de extinción <span class="insignia riesgo-a">A</span> Amenazada <span class="insignia riesgo-pr">Pr</span> Sujeta a protección especial <small>(NOM-059-SEMARNAT-2010)</small></p>
      <div class="rejilla-especies" aria-live="polite">${ESPECIES.map((e) => e.renderTarjeta()).join("")}</div>
      ${acordeon}
      ${seccion.renderPreguntaRapida()}`;
  }

  static conectarBiodiversidad() {
    const seccion = document.getElementById("biodiversidad");
    seccion.addEventListener("click", (evento) => {
      const filtro = evento.target.closest("[data-filtro-especie]");
      if (!filtro) return;
      const valor = filtro.dataset.filtroEspecie;
      $$("[data-filtro-especie]", seccion).forEach((b) => b.setAttribute("aria-pressed", String(b === filtro)));
      let visibles = 0;
      $$(".tarjeta-especie", seccion).forEach((tarjeta) => {
        const especie = ESPECIES.find((e) => e.id === tarjeta.dataset.especie);
        const mostrar = especie.coincideCon(valor);
        tarjeta.hidden = !mostrar;
        if (mostrar) visibles += 1;
      });
      avisar(`${visibles} especies`);
    });
  }

  /* ------------------------------------------------------------------
     BIÓSFERA
     ------------------------------------------------------------------ */
  static biosfera(seccion) {
    const cadenas = {
      Selva: ["🌳 Frutos del ramón y del chicozapote", "🐗 Pecarí y venado", "🐆 Jaguar", "🍄 Hongos y bacterias"],
      Manglar: ["🍃 Hojas de mangle", "🦠 Descomponedores", "🦐 Camarones y peces pequeños", "🐊 Cocodrilo y garzas"],
      Arrecife: ["🌿 Algas y pastos marinos", "🐠 Pez loro y tortuga verde", "🦈 Tiburón gata y otros depredadores", "🦀 Carroñeros y bacterias"],
    };
    const pestanas = Object.entries(cadenas).map(([nombre, pasos]) => ({
      etiqueta: nombre,
      contenido: `<ol class="cadena-trofica">${pasos.map((p) => `<li>${p}</li>`).join("")}</ol>`,
    }));
    const anp = LUGARES.filter((l) => l.nivel);
    const destacados = ["sian-kaan", "caribe-mexicano", "banco-chinchorro", "tiburon-ballena"].map((id) => LUGARES.find((l) => l.id === id));
    const linea = new LineaTiempo(LINEA_TIEMPO, "linea-tiempo");
    Vistas.lineaTiempo = linea;
    return `<p class="intro">${seccion.intro}</p>
      <div class="dos-columnas">
        <figure class="diagrama-caja">${Ilustraciones.esferas()}<figcaption>La biósfera existe donde se encuentran el aire, el agua y el suelo.</figcaption></figure>
        <div>
          <h3>Relación entre seres vivos y ambiente</h3>
          <p>Los seres vivos toman del ambiente agua, luz, aire y nutrientes, y a la vez lo transforman: la selva produce lluvia y suelo, el manglar fabrica suelo con sus raíces y los corales construyen arrecifes enteros. Entre ellos forman <strong>cadenas alimenticias</strong>:</p>
          ${Pestanas.render({ id: "cadenas", etiqueta: "Cadenas alimenticias por ecosistema", pestanas })}
        </div>
      </div>
      <div class="dos-columnas dos-columnas-invertida">
        <div>
          <h3>¿Qué es una reserva de la biósfera?</h3>
          <p>Es un tipo de Área Natural Protegida que conserva ecosistemas importantes y, al mismo tiempo, permite que las comunidades aprovechen los recursos de forma sustentable. La idea viene del programa <strong>El Hombre y la Biósfera (MAB)</strong> de la UNESCO.</p>
          <ul class="lista-marcas">
            <li><strong>Zona núcleo:</strong> protección estricta; solo investigación y monitoreo.</li>
            <li><strong>Zona de amortiguamiento:</strong> actividades reguladas como pesca, turismo de bajo impacto o manejo forestal.</li>
            <li><strong>Importancia:</strong> protegen especies, agua, suelos y paisajes, y sirven de laboratorio vivo para la ciencia.</li>
          </ul>
        </div>
        <figure class="diagrama-caja">${Ilustraciones.zonificacion()}<figcaption>Esquema general de la zonificación de una reserva.</figcaption></figure>
      </div>
      <h3 class="subtitulo-bloque">Ejemplos relevantes en Quintana Roo</h3>
      <div class="rejilla-destacados">${destacados
        .map((l) => `<article class="destacado" style="--cat:${l.color}"><p class="destacado-anio">${esc(l.decreto.split(" ")[0])}</p><h4>${esc(l.nombre.replace("Reserva de la Biósfera ", ""))}</h4><p>${l.descripcion}</p><p class="destacado-dato">${l.superficie ? esc(l.superficie) : ""}</p></article>`)
        .join("")}</div>
      <h3 class="subtitulo-bloque">Áreas Naturales Protegidas de Quintana Roo</h3>
      <div class="tabla-caja">
        <table class="tabla">
          <caption>Algunas áreas protegidas federales y estatales (fuente: CONANP, IBANQROO)</caption>
          <thead><tr><th scope="col">Área</th><th scope="col">Categoría</th><th scope="col">Desde</th><th scope="col">Superficie</th><th scope="col">Administra</th></tr></thead>
          <tbody>${anp
            .map((l) => `<tr><th scope="row">${esc(l.nombre)}</th><td><span class="punto-cat" style="--cat:${l.color}"></span>${esc(Vistas.categoriaANP(l.nombre))}</td><td>${esc(l.decreto ? l.decreto.split(" ")[0] : "—")}</td><td class="num">${esc(l.superficie || "—")}</td><td>${esc(l.nivel)}</td></tr>`)
            .join("")}</tbody>
        </table>
      </div>
      <h3 class="subtitulo-bloque">Línea del tiempo de la conservación</h3>
      ${linea.render()}
      ${seccion.renderPreguntaRapida()}`;
  }

  /** Categoría legal del área protegida a partir de su nombre. */
  static categoriaANP(nombre) {
    if (/^Reserva de la Biósfera/.test(nombre)) return "Reserva de la biósfera";
    if (/^(Parque Nacional|PN )/.test(nombre)) return /APFF/.test(nombre) ? "Parque nacional y APFF" : "Parque nacional";
    if (/^(APFF|Área de Protección)/.test(nombre)) return "Área de protección de flora y fauna";
    if (/^Santuario/.test(nombre)) return "Santuario (área estatal)";
    return "Parque ecológico estatal";
  }

  /* ------------------------------------------------------------------
     HIDROSFERA
     ------------------------------------------------------------------ */
  static hidrosfera(seccion) {
    const cuerpos = [
      ["💧", "Cenotes", "Pozos naturales que dejan ver el agua subterránea. Pueden ser abiertos, semiabiertos o en caverna.", "cenotes"],
      ["🏝️", "Lagunas", "Bacalar (agua dulce), Nichupté y Chacmochuch (costeras) y la Bahía de Chetumal, hogar del manatí.", "lagunas"],
      ["🌊", "Mar Caribe", "Aguas cálidas y transparentes, con pocos nutrientes, ideales para el crecimiento de corales.", "playas"],
      ["🕳️", "Aguas subterráneas", "Un gran acuífero con ríos subterráneos como Sac Actun y Ox Bel Ha. Es la fuente del agua que usamos.", "cenotes"],
      ["🪸", "Arrecifes", "Dependen de agua limpia y clara; los sedimentos y las aguas residuales los enferman.", "arrecife"],
      ["〰️", "Río Hondo", "El principal río de superficie; marca la frontera con Belice y desemboca en la Bahía de Chetumal.", "lagunas"],
    ];
    const acordeon = Acordeon.render([
      {
        icono: "🚱", titulo: "Contaminación del agua",
        contenido: `<p>Como la roca caliza es porosa, lo que se tira en la superficie llega rápido al acuífero.</p>${listaHTML([
          "Aguas residuales sin tratar y fosas sépticas mal construidas.",
          "Líquidos de basureros a cielo abierto (lixiviados).",
          "Fertilizantes, plaguicidas, aceites y combustibles.",
          "Bloqueadores solares y repelentes en cenotes y arrecifes.",
          "Plásticos y microplásticos.",
        ])}`,
      },
      {
        icono: "📉", titulo: "Sobreexplotación",
        contenido: `<p>Las ciudades, los hoteles y la agricultura necesitan mucha agua. Si se extrae más de la que la lluvia recarga, el agua salada del subsuelo sube y entra al acuífero: a esto se le llama <strong>intrusión salina</strong>, y hace que el agua ya no sirva para beber ni para regar.</p>`,
      },
      {
        icono: "🛟", titulo: "Acciones para proteger el agua",
        contenido: listaHTML([
          "Conectar las casas al drenaje o usar biodigestores certificados en lugar de fosas.",
          "Tratar las aguas residuales antes de devolverlas al ambiente.",
          "Cerrar la llave, reparar fugas y reutilizar agua.",
          "No tirar aceite, químicos ni basura al suelo, al drenaje o a los cenotes.",
          "Bañarse antes de entrar a un cenote y no usar bloqueador dentro del agua.",
          "Proteger la selva, que es la zona donde el agua se recarga.",
        ]),
      },
    ], "acordeon-agua", 0);
    return `<p class="intro">${seccion.intro}</p>
      <figure class="diagrama-ancho">${Ilustraciones.acuifero()}<figcaption>Corte simplificado del acuífero de Quintana Roo. La capa de agua dulce flota sobre el agua salada que entra desde el mar.</figcaption></figure>
      <div class="rejilla-agua">${cuerpos
        .map(([e, t, d]) => `<article class="tarjeta-agua"><span class="tarjeta-agua-emoji" aria-hidden="true">${e}</span><h3>${t}</h3><p>${d}</p></article>`)
        .join("")}</div>
      <div class="dos-columnas">
        <div>
          <h3>Importancia del agua para los ecosistemas</h3>
          <ul class="lista-marcas">
            <li><strong>Selva:</strong> depende de las lluvias de verano y del agua del subsuelo en la temporada seca.</li>
            <li><strong>Manglar:</strong> necesita la mezcla de agua dulce del acuífero con agua de mar.</li>
            <li><strong>Arrecife:</strong> requiere agua clara y pobre en nutrientes.</li>
            <li><strong>Cenotes y lagunas:</strong> son hábitat de peces, tortugas, cocodrilos y fauna única.</li>
          </ul>
        </div>
        <div>${acordeon}</div>
      </div>
      ${seccion.renderDatos()}
      ${seccion.renderPreguntaRapida()}`;
  }

  /* ------------------------------------------------------------------
     LITOSFERA
     ------------------------------------------------------------------ */
  static litosfera(seccion) {
    const pasos = [
      ["Lluvia ácida natural", "El agua de lluvia se combina con el dióxido de carbono del aire y del suelo y forma ácido carbónico, un ácido débil."],
      ["Disolución de la caliza", "Ese ácido disuelve poco a poco el carbonato de calcio de la roca y abre grietas y huecos. A este tipo de paisaje se le llama karst."],
      ["Formación de cuevas", "Los huecos crecen hasta formar cuevas. Cuando el nivel del mar era más bajo, las cuevas estaban secas y se formaron estalactitas y estalagmitas."],
      ["Colapso del techo", "El techo de la cueva se debilita y se derrumba: queda al descubierto el agua subterránea y nace un cenote."],
    ];
    const suelos = [
      ["Leptosol", 58.32, "Delgado y pedregoso, sobre la caliza."],
      ["Vertisol", 9.26, "Arcilloso; se agrieta en secas."],
      ["Phaeozem", 6.44, "Oscuro y rico en materia orgánica."],
      ["Gleysol", 6.15, "Inundado gran parte del año."],
      ["Otros", 19.83, "Otros tipos de suelo en conjunto."],
    ];
    const barras = suelos
      .map(([n, v, d]) => `<li title="${n}: ${v} %">
        <span class="barra-nombre">${n}</span>
        <span class="barra-pista"><span class="barra-relleno" style="--valor:${v}%"></span></span>
        <span class="barra-valor">${formatoNumero(v, 2)} %</span>
        <span class="barra-desc">${d}</span>
      </li>`)
      .join("");
    return `<p class="intro">${seccion.intro}</p>
      <div class="formacion" id="formacion-cenote">
        <div class="formacion-visual">${pasos.map((_, i) => `<div class="formacion-cuadro" data-paso="${i}"${i === 3 ? "" : " hidden"}>${Ilustraciones.formacionCenote(i + 1)}</div>`).join("")}</div>
        <div class="formacion-texto">
          <p class="eyebrow">¿Cómo se forma un cenote?</p>
          <ol class="formacion-pasos">${pasos
            .map(([t, d], i) => `<li><button type="button" data-paso-cenote="${i}" aria-pressed="${i === 3}"><span class="paso-num">${i + 1}</span><span><strong>${t}</strong><span class="paso-desc">${d}</span></span></button></li>`)
            .join("")}</ol>
          <button type="button" class="boton boton-suave" data-animar-cenote><span aria-hidden="true">▶</span> Ver animación paso a paso</button>
        </div>
      </div>
      <div class="rejilla-lito">
        <article class="tarjeta-lito"><h3>🧱 Características geológicas</h3><p>El estado forma parte de la <strong>plataforma de Yucatán</strong>, construida con rocas sedimentarias de origen marino, principalmente calizas, que se acumularon durante millones de años cuando la región estaba bajo el mar.</p></article>
        <article class="tarjeta-lito"><h3>🏞️ Relieve principalmente plano</h3><p>No hay montañas: el terreno sube suavemente hacia el oeste. La elevación más alta es el <strong>Cerro El Charro, con unos 200 m</strong> sobre el nivel del mar (INEGI). En el sur hay lomeríos y fallas geológicas alineadas con la Laguna de Bacalar.</p></article>
        <article class="tarjeta-lito"><h3>🪨 Rocas calizas</h3><p>Están hechas de carbonato de calcio (CaCO₃), el mismo material de las conchas y los corales. Son porosas y se disuelven con agua ligeramente ácida; por eso el agua de lluvia se infiltra y forma cuevas.</p></article>
        <article class="tarjeta-lito"><h3>🌱 Importancia del suelo</h3><p>Sostiene la selva y la milpa, filtra el agua que llega al acuífero y guarda carbono. Como es muy delgado, tarda muchísimo en formarse y se pierde con facilidad. Los mayas lo clasificaron con nombres propios, como <em>tsek'el</em> (pedregoso) y <em>k'ankab</em> (rojo).</p></article>
      </div>
      <div class="dos-columnas">
        <figure class="grafica" aria-labelledby="grafica-suelos-titulo">
          <figcaption id="grafica-suelos-titulo"><strong>Tipos de suelo en Quintana Roo</strong> <small>(% de la superficie, INEGI 2022)</small></figcaption>
          <ul class="barras">${barras}</ul>
        </figure>
        <div>
          <h3>Impacto de las actividades humanas</h3>
          <ul class="lista-marcas">
            <li><strong>Deforestación:</strong> sin árboles, la lluvia y el viento se llevan el suelo delgado.</li>
            <li><strong>Extracción de piedra caliza</strong> (bancos de material o <em>sascaberas</em>) para construir: deja huecos y expone el acuífero.</li>
            <li><strong>Rellenos</strong> de humedales y manglares con piedra y arena.</li>
            <li><strong>Construcción sobre cuevas:</strong> riesgo de hundimientos y contaminación.</li>
            <li><strong>Basura y lixiviados</strong> que se filtran por la roca porosa.</li>
          </ul>
        </div>
      </div>
      ${seccion.renderDatos()}
      ${seccion.renderPreguntaRapida()}`;
  }

  static conectarLitosfera() {
    const raiz = document.getElementById("formacion-cenote");
    if (!raiz) return;
    let temporizador = null;
    const mostrar = (i) => {
      $$(".formacion-cuadro", raiz).forEach((c) => { c.hidden = Number(c.dataset.paso) !== i; });
      $$("[data-paso-cenote]", raiz).forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.pasoCenote) === i)));
    };
    raiz.addEventListener("click", (evento) => {
      const paso = evento.target.closest("[data-paso-cenote]");
      if (paso) {
        clearInterval(temporizador);
        mostrar(Number(paso.dataset.pasoCenote));
      }
      const animar = evento.target.closest("[data-animar-cenote]");
      if (animar) {
        clearInterval(temporizador);
        let i = 0;
        mostrar(i);
        temporizador = setInterval(() => {
          i += 1;
          if (i > 3) { clearInterval(temporizador); return; }
          mostrar(i);
        }, 2200);
      }
    });
  }

  /* ------------------------------------------------------------------
     ATMÓSFERA
     ------------------------------------------------------------------ */
  static atmosfera(seccion) {
    const huracanes = LINEA_TIEMPO.filter((e) => e.tipo === "huracan");
    const acordeon = Acordeon.render([
      {
        icono: "🌬️", titulo: "Calidad del aire",
        contenido: `<p>En general el aire es limpio gracias a los vientos que llegan del mar. Los principales problemas son:</p>${listaHTML([
          "El sargazo que se pudre en la playa libera ácido sulfhídrico (olor a huevo podrido), que puede causar molestias.",
          "El humo de incendios forestales y quemas agrícolas en la temporada seca.",
          "Las emisiones de automóviles en ciudades como Cancún, Playa del Carmen y Chetumal.",
        ])}`,
      },
      {
        icono: "🌡️", titulo: "Cambio climático",
        contenido: listaHTML([
          "El mar más caliente provoca el blanqueamiento de los corales.",
          "El aumento del nivel del mar erosiona las playas y empuja agua salada hacia el acuífero.",
          "Se espera una mayor proporción de huracanes intensos.",
          "Científicos estudian su relación con las llegadas masivas de sargazo.",
        ]),
      },
      {
        icono: "🏭", titulo: "Efecto de las actividades humanas",
        contenido: listaHTML([
          "Quemar gasolina, diésel y gas para transporte y electricidad libera CO₂.",
          "La deforestación y los incendios liberan el carbono guardado en la selva.",
          "Los basureros producen metano, un gas de efecto invernadero.",
          "Los vuelos y cruceros del turismo también generan emisiones.",
        ]),
      },
      {
        icono: "🌀", titulo: "¿Los huracanes solo causan daños?",
        contenido: `<p>No. Aunque destruyen casas y dañan ecosistemas, también traen mucha lluvia que <strong>recarga el acuífero</strong>, renuevan la vegetación y remueven sedimentos. Los manglares, las dunas y los arrecifes sanos reducen su fuerza al llegar a la costa.</p>`,
      },
    ], "acordeon-aire", 0);
    return `<p class="intro">${seccion.intro}</p>
      <ul class="clima">
        <li class="clima-temp"><span aria-hidden="true">🌡️</span><strong>26.5 °C</strong><span>temperatura media anual</span></li>
        <li class="clima-lluvia"><span aria-hidden="true">🌧️</span><strong>800–1,500 mm</strong><span>de lluvia al año, sobre todo en verano</span></li>
        <li class="clima-tipo"><span aria-hidden="true">☀️</span><strong>99 %</strong><span>cálido subhúmedo con lluvias en verano</span></li>
        <li class="clima-coz"><span aria-hidden="true">🏝️</span><strong>1 %</strong><span>cálido húmedo, en la isla de Cozumel</span></li>
      </ul>
      <p class="nota">Fuente: INEGI, Aspectos geográficos de Quintana Roo 2022.</p>
      <div class="dos-columnas">
        <div>
          <h3>Huracanes que marcaron al estado</h3>
          <p>La temporada de huracanes del Atlántico va del <strong>1 de junio al 30 de noviembre</strong>.</p>
          <ol class="huracanes">${huracanes.map((h) => `<li><span class="huracan-anio">${h.anio}</span><div><strong>${esc(h.titulo)}</strong><p>${h.texto}</p></div></li>`).join("")}</ol>
        </div>
        <div>${acordeon}</div>
      </div>
      ${seccion.renderPreguntaRapida()}`;
  }

  /* ------------------------------------------------------------------
     CICLOS
     ------------------------------------------------------------------ */
  static ciclos(seccion) {
    return `<p class="intro">${seccion.intro}</p>
      ${Pestanas.render({
        id: "ciclos-tabs",
        etiqueta: "Ciclos biogeoquímicos",
        clase: "pestanas-ciclos",
        pestanas: CICLOS.map((c) => ({ etiqueta: `<span aria-hidden="true">${c.emoji}</span> ${c.nombre.replace(/^Ciclo del? /, "").replace(/^./, (l) => l.toUpperCase())}`, contenido: c.render(), color: c.color })),
      })}
      ${seccion.renderPreguntaRapida()}`;
  }

  static conectarCiclos() {
    CICLOS.forEach((c) => {
      const raiz = document.querySelector(`[data-ciclo="${c.id}"]`);
      if (raiz) c.conectar(raiz);
    });
    // En pantallas angostas el diagrama se acerca al círculo y oculta las etiquetas
    // (la lista de etapas y el panel de explicación siguen visibles).
    const angosta = window.matchMedia("(max-width: 600px)");
    const ajustar = () => $$(".ciclo-diagrama").forEach((svg) => svg.setAttribute("viewBox", angosta.matches ? "10 10 340 340" : "-135 -14 630 394"));
    ajustar();
    if (angosta.addEventListener) angosta.addEventListener("change", ajustar);
  }

  /* ------------------------------------------------------------------
     ACTIVIDADES HUMANAS
     ------------------------------------------------------------------ */
  static actividades(seccion) {
    return `<p class="intro">${seccion.intro}</p>
      <p class="cadena-leyenda" aria-hidden="true"><span class="cl-actividad">Actividad humana</span> → <span class="cl-impacto">Impacto ambiental</span> → <span class="cl-consecuencia">Consecuencia</span> → <span class="cl-solucion">Posible solución</span></p>
      <ol class="cadenas">${ACTIVIDADES.map((a) => a.renderFila()).join("")}</ol>
      ${seccion.renderPreguntaRapida()}`;
  }

  /* ------------------------------------------------------------------
     GOBIERNO
     ------------------------------------------------------------------ */
  static gobierno(seccion) {
    const pestanas = Object.entries(AccionGobierno.NIVELES).map(([clave, nivel]) => ({
      etiqueta: `${nivel.nombre} <small>${nivel.descripcion}</small>`,
      contenido: `<div class="rejilla-acciones">${ACCIONES_GOBIERNO.filter((a) => a.nivel === clave).map((a) => a.renderTarjeta()).join("")}</div>`,
    }));
    return `<p class="intro">${seccion.intro}</p>
      ${Pestanas.render({ id: "niveles", etiqueta: "Niveles de gobierno", pestanas, clase: "pestanas-niveles" })}
      <h3 class="subtitulo-bloque">¿Quién hace qué? Resumen por tema</h3>
      <div class="tabla-caja">
        <table class="tabla tabla-matriz">
          <caption>Papel de cada nivel de gobierno en la protección ambiental de Quintana Roo</caption>
          <thead><tr><th scope="col">Tema</th><th scope="col" class="col-federal">Federal</th><th scope="col" class="col-estatal">Estatal</th><th scope="col" class="col-municipal">Municipal</th></tr></thead>
          <tbody>${MATRIZ_GOBIERNO.map((f) => `<tr><th scope="row">${f.tema}</th><td>${f.federal}</td><td>${f.estatal}</td><td>${f.municipal}</td></tr>`).join("")}</tbody>
        </table>
      </div>
      ${seccion.renderPreguntaRapida()}`;
  }

  /* ------------------------------------------------------------------
     PROGRAMAS SENSORIALES
     ------------------------------------------------------------------ */
  static sensoriales(seccion) {
    const sentidos = [["todos", "✨", "Todos"], ["vista", "👁️", "Vista"], ["oido", "👂", "Oído"], ["tacto", "✋", "Tacto"], ["olfato", "👃", "Olfato"]];
    const pasos = [
      ["Experimentar", "Ver, oír, tocar y oler el ambiente de forma directa."],
      ["Comprender", "Relacionar lo que se siente con cómo funciona el ecosistema."],
      ["Valorar", "Crear un vínculo emocional con el lugar y sus especies."],
      ["Actuar", "Cambiar hábitos y compartir lo aprendido con otras personas."],
    ];
    return `<p class="intro">${seccion.intro}</p>
      <div class="sentidos" role="group" aria-label="Elegir un sentido">${sentidos
        .map(([k, e, t], i) => `<button type="button" class="sentido" data-sentido="${k}" aria-pressed="${i === 0}"><span aria-hidden="true">${e}</span>${t}</button>`)
        .join("")}</div>
      <div class="rejilla-sensorial">${PROGRAMAS_SENSORIALES.map((p) => p.renderTarjeta()).join("")}</div>
      <div class="dos-columnas">
        <div>
          <h3>¿Cómo generan conciencia ambiental?</h3>
          <ol class="pasos-conciencia">${pasos.map(([t, d]) => `<li><strong>${t}</strong><span>${d}</span></li>`).join("")}</ol>
          <p class="nota">Las actividades marcadas como “Dónde se hace” ya se realizan en esos lugares; las demás son propuestas para escuelas y grupos. Antes de visitar un área protegida, consulta sus reglas y usa guías autorizados.</p>
        </div>
        <div class="juego-sonidos" id="juego-sonidos">
          <h3><span aria-hidden="true">🎧</span> Juego: ¿quién suena así?</h3>
          <div class="juego-cuerpo" aria-live="polite"></div>
        </div>
      </div>
      ${seccion.renderPreguntaRapida()}`;
  }

  static conectarSensoriales() {
    const seccion = document.getElementById("sensoriales");
    seccion.addEventListener("click", (evento) => {
      const boton = evento.target.closest("[data-sentido]");
      if (!boton) return;
      const sentido = boton.dataset.sentido;
      $$("[data-sentido]", seccion).forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
      $$(".sensorial", seccion).forEach((tarjeta) => {
        const programa = PROGRAMAS_SENSORIALES.find((p) => p.id === tarjeta.dataset.sensorial);
        tarjeta.hidden = !programa.usaSentido(sentido);
      });
    });

    // Mini juego de sonidos
    const juego = document.getElementById("juego-sonidos");
    const cuerpo = $(".juego-cuerpo", juego);
    let ronda = 0;
    let puntos = 0;
    const mostrarRonda = () => {
      if (ronda >= SONIDOS.length) {
        cuerpo.innerHTML = `<p class="juego-final">Acertaste <strong>${puntos} de ${SONIDOS.length}</strong>. En un recorrido real, escucha con los ojos cerrados durante un minuto: ¿cuántos sonidos distintos reconoces?</p><button type="button" class="boton boton-suave" data-juego="reiniciar">Jugar otra vez</button>`;
        return;
      }
      const s = SONIDOS[ronda];
      cuerpo.innerHTML = `<p class="juego-ronda">Pista ${ronda + 1} de ${SONIDOS.length}</p>
        <p class="juego-pista">“${s.pista}”</p>
        <div class="juego-opciones">${s.opciones.map((o) => `<button type="button" class="opcion" data-respuesta="${esc(o)}">${esc(o)}</button>`).join("")}</div>
        <p class="retro"></p>`;
    };
    juego.addEventListener("click", (evento) => {
      const opcion = evento.target.closest("[data-respuesta]");
      if (opcion && !opcion.disabled) {
        const s = SONIDOS[ronda];
        const bien = opcion.dataset.respuesta === s.respuesta;
        if (bien) puntos += 1;
        $$("[data-respuesta]", juego).forEach((b) => {
          b.disabled = true;
          if (b.dataset.respuesta === s.respuesta) b.classList.add("correcta");
          else if (b === opcion) b.classList.add("incorrecta");
        });
        $(".retro", juego).innerHTML = `${bien ? "✅ ¡Correcto!" : `❌ Era: <strong>${esc(s.respuesta)}</strong>.`} <button type="button" class="boton boton-suave" data-juego="siguiente">Siguiente</button>`;
        $('[data-juego="siguiente"]', juego).focus();
      }
      const accion = evento.target.closest("[data-juego]");
      if (accion) {
        if (accion.dataset.juego === "reiniciar") { ronda = 0; puntos = 0; } else ronda += 1;
        mostrarRonda();
        const primero = $("[data-respuesta], [data-juego]", juego);
        if (primero) primero.focus();
      }
    });
    mostrarRonda();
  }

  /* ------------------------------------------------------------------
     FUENTES
     ------------------------------------------------------------------ */
  static fuentes() {
    const grupos = {
      gobierno: "Gobierno de México y Gobierno de Quintana Roo",
      internacional: "Organismos internacionales",
      academica: "Instituciones académicas y científicas",
      prensa: "Notas periodísticas que citan a fuentes oficiales",
      datos: "Datos geográficos e imágenes",
    };
    return `<p class="intro">Toda la información de esta app proviene de las fuentes siguientes. Las cifras indican su fuente junto al dato. Los enlaces abren en una pestaña nueva.</p>
      <div class="rejilla-fuentes">${Object.entries(grupos)
        .map(([tipo, titulo]) => `<section class="grupo-fuentes"><h3>${titulo}</h3><ul>${FUENTES.filter((f) => f.tipo === tipo).map((f) => f.renderItem()).join("")}</ul></section>`)
        .join("")}</div>
      <section class="creditos-imagenes" aria-labelledby="creditos-titulo">
        <div class="creditos-cabeza">
          <h3 id="creditos-titulo">Créditos de imágenes</h3>
          <button type="button" class="boton boton-suave" id="btn-fotos" aria-pressed="${GaleriaFotos.activo}"></button>
        </div>
        <p>Las <strong>ilustraciones</strong> y los <strong>diagramas</strong> son originales de este proyecto y pueden usarse libremente en el trabajo escolar. Las <strong>fotografías</strong> se cargan desde Wikimedia Commons cuando hay internet; cada una muestra su autor y licencia, que deben respetarse (normalmente Creative Commons con atribución).</p>
        <div id="lista-creditos">${GaleriaFotos.renderCreditos()}</div>
        <p class="nota">Tipografías: Bricolage Grotesque y Figtree (SIL Open Font License), incluidas en el proyecto para que funcione sin conexión.</p>
      </section>`;
  }

  static actualizarBotonFotos() {
    const boton = document.getElementById("btn-fotos");
    if (!boton) return;
    const estado = GaleriaFotos.estado;
    let texto = GaleriaFotos.activo ? "📷 Fotos reales: activadas" : "🎨 Solo ilustraciones";
    if (GaleriaFotos.activo && estado === "cargando") texto = "📷 Cargando fotos…";
    if (GaleriaFotos.activo && estado === "sin-conexion") texto = "📷 Fotos no disponibles (sin conexión)";
    boton.textContent = texto;
    boton.setAttribute("aria-pressed", String(GaleriaFotos.activo));
    const lista = document.getElementById("lista-creditos");
    if (lista) lista.innerHTML = GaleriaFotos.renderCreditos();
  }
}
