# Tríptico Quintana Roo

**Quintana Roo: Ecosistemas, Biodiversidad y Equilibrio Ambiental**

Aplicación web educativa para elaborar, presentar y exponer un tríptico sobre el medio ambiente de Quintana Roo, México.

Elaborado por: **Fernando Rosales Tello**

Funciona de tres formas:

1. **Página interactiva**: los diez temas con fichas, filtros, diagramas, mapa, línea del tiempo y cuestionario.
2. **🎤 Modo Exposición**: una diapositiva por tema, con guion de apoyo “💡 ¿Qué puedo decir?”, cronómetro, índice y pantalla completa.
3. **🖨️ Tríptico imprimible**: seis paneles en una hoja carta a doble cara. También se puede guardar como PDF.

---

## 1. Cómo abrir el proyecto

No necesitas instalar nada: el proyecto usa solo **HTML5, CSS3 y JavaScript** (sin frameworks ni compilación).

### Opción A: doble clic
Abre la carpeta y haz doble clic en `index.html`. Se abre en tu navegador (Chrome, Edge, Firefox o Safari).

### Opción B: servidor local (recomendado)
Algunas funciones del navegador trabajan mejor desde un servidor. Elige una:

- **Visual Studio Code**: instala la extensión *Live Server*, abre la carpeta y haz clic en **Go Live**.
- **Python** (viene en muchas computadoras):
  ```bash
  cd quintana-roo-triptico
  python -m http.server 8000
  ```
  Luego abre `http://localhost:8000` en el navegador.
- **Node.js**:
  ```bash
  npx serve .
  ```

> Sin internet, la app funciona completa con las ilustraciones originales. Con internet, además carga fotografías reales de Wikimedia Commons con su crédito.

---

## 2. Cómo imprimir o guardar el tríptico como PDF

1. Ve a la sección **📄 Tríptico** y llena los datos del estudiante (materia, profesor, grado, institución). Se guardan en tu navegador.
2. Presiona **🖨️ Imprimir tríptico** o **📄 Guardar como PDF** y luego el botón del cuadro de instrucciones (o `Ctrl + P` / `⌘ + P`).
3. En la ventana de impresión elige:
   - Tamaño de papel: **Carta (Letter)**
   - Orientación: **Horizontal**
   - Márgenes: **Ninguno**
   - **Gráficos de fondo**: activado (Chrome/Edge: “Más opciones”)
   - Escala: **100 %**
   - Para PDF: en *Destino* elige **Guardar como PDF**.
   - Para papel: doble cara **volteando por el borde corto**.
4. Se imprimen 2 páginas: la **1 es el exterior** (presentación, contraportada y portada) y la **2 es el interior** (los temas).
5. Para doblarlo: coloca la hoja con el interior hacia arriba, dobla el panel derecho hacia el centro y luego el izquierdo encima. La portada queda al frente.

La impresión está diseñada con `@media print` (archivo `css/impresion.css`): oculta menús y botones, conserva colores e ilustraciones, usa `@page { size: letter landscape; margin: 0 }` y evita que los paneles se corten.

---

## 3. Cómo usar el Modo Exposición

Presiona **🎤 Modo Exposición** (en la portada o en la barra superior). También puedes abrir la app con `#exposicion` al final de la dirección.

| Tecla | Acción |
|---|---|
| `→` / `Espacio` / `Av Pág` | Siguiente diapositiva |
| `←` / `Re Pág` | Diapositiva anterior |
| `G` | Mostrar u ocultar el guion “¿Qué puedo decir?” |
| `F` | Pantalla completa |
| `Inicio` / `Fin` | Primera / última diapositiva |
| `Esc` | Cerrar guion, índice o salir |

En celular o tableta puedes deslizar el dedo a la izquierda o a la derecha. En las diapositivas de Ecosistemas y Biodiversidad puedes tocar las miniaturas para abrir la ficha completa frente al grupo.

---

## 4. Publicar en GitHub Pages

### Sin usar la terminal
1. Crea una cuenta en [github.com](https://github.com) e inicia sesión.
2. Botón **New repository** → nombre, por ejemplo `triptico-quintana-roo` → **Public** → **Create repository**.
3. Haz clic en **uploading an existing file** y arrastra **todo el contenido** de la carpeta del proyecto (el archivo `index.html` debe quedar en la raíz, junto a las carpetas `css`, `js` y `assets`). Presiona **Commit changes**.
4. Entra a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
5. Espera uno o dos minutos. Tu página quedará en `https://TU-USUARIO.github.io/triptico-quintana-roo/`.

### Con Git (terminal)
```bash
cd quintana-roo-triptico
git init
git add .
git commit -m "Tríptico Quintana Roo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/triptico-quintana-roo.git
git push -u origin main
```
Después activa Pages como en el paso 4.

---

## 5. Publicar en Vercel

### Desde GitHub (más fácil)
1. Sube el proyecto a GitHub (sección anterior).
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. **Add New… → Project** → elige el repositorio → **Import**.
4. En *Framework Preset* deja **Other**. No escribas comando de compilación; el directorio de salida es la raíz (`./`).
5. Presiona **Deploy**. Obtendrás una dirección como `https://triptico-quintana-roo.vercel.app`.

### Desde la terminal
```bash
npm install -g vercel
cd quintana-roo-triptico
vercel
```
Responde las preguntas (proyecto nuevo, carpeta actual) y usa `vercel --prod` para publicar la versión final.

---

## 6. Estructura de carpetas

```
quintana-roo-triptico/
├── index.html                 Página principal (estructura y carga de scripts)
├── README.md                  Este archivo
├── IMAGENES.md                Fotografías: fuentes, licencias y cómo cambiarlas
├── assets/
│   ├── favicon.svg            Icono de la pestaña
│   └── fuentes/               Tipografías (Bricolage Grotesque y Figtree, licencia OFL)
├── css/
│   ├── base.css               Tipografías, colores (modo claro y oscuro) y estilos base
│   ├── componentes.css        Menú, botones, modal, acordeones, pestañas, tablas, mapa, cuestionario
│   ├── secciones.css          Portada y diseño de cada tema
│   ├── presentacion.css       Modo Exposición
│   ├── triptico.css           Hoja del tríptico (11 × 8.5 in)
│   └── impresion.css          Reglas @media print
├── js/
│   ├── nucleo/
│   │   ├── utilidades.js      Funciones auxiliares, almacenamiento y eventos
│   │   └── ilustraciones.js   Ilustraciones y diagramas SVG originales
│   ├── modelos/               CLASES (Programación Orientada a Objetos)
│   │   ├── Seccion.js
│   │   ├── Ecosistema.js
│   │   ├── Especie.js
│   │   ├── CicloBioquimico.js
│   │   ├── Pregunta.js
│   │   ├── MapaLugar.js
│   │   └── Tematicos.js       ActividadHumana, AccionGobierno, ProgramaSensorial, EventoTiempo, Fuente
│   ├── datos/                 CONTENIDO (aquí se edita el texto)
│   │   ├── contenido.js       Secciones, resúmenes, datos y guiones de exposición
│   │   ├── ecosistemas.js     8 ecosistemas
│   │   ├── especies.js        19 especies con su categoría NOM-059
│   │   ├── ciclos.js          4 ciclos biogeoquímicos
│   │   ├── actividades.js     11 actividades humanas
│   │   ├── gobierno.js        Acciones federales, estatales y municipales
│   │   ├── sensoriales.js     Programas sensoriales y juego de sonidos
│   │   ├── preguntas.js       Cuestionario (12 preguntas)
│   │   ├── lugares.js         Puntos del mapa
│   │   ├── linea-tiempo.js    Línea del tiempo
│   │   ├── fuentes.js         Fuentes de información
│   │   ├── fotos.js           Nombres de las fotos de Wikimedia Commons
│   │   └── mapa-geo.js        Contornos del mapa (INEGI)
│   ├── componentes/           COMPONENTES REUTILIZABLES
│   │   ├── GaleriaFotos.js    Visual + GaleriaFotos (fotos reales con crédito)
│   │   ├── Interfaz.js        Modal, Acordeon, Pestanas, Contador, LineaTiempo
│   │   ├── MapaInteractivo.js Mapa SVG con filtros y fichas
│   │   ├── Cuestionario.js    "¿Cuánto aprendiste?"
│   │   ├── Presentacion.js    Modo Exposición
│   │   ├── Triptico.js        Tríptico y DatosEstudiante
│   │   ├── Navegacion.js      Menú fijo y GestorTema (claro/oscuro)
│   │   └── Vistas.js          Arma cada sección a partir de los objetos
│   └── app.js                 Clase App: punto de entrada
└── herramientas/
    └── generar-mapa.mjs       (Opcional) Regenera mapa-geo.js desde datos del INEGI
```

---

## 7. Programación Orientada a Objetos

Todo el contenido se maneja con **clases** y **objetos**. Los datos (`js/datos/`) crean objetos, y cada objeto sabe dibujarse y comportarse:

| Clase | Qué representa | Métodos principales |
|---|---|---|
| `Seccion` | Un tema (Ecosistemas, Hidrosfera…) | `renderEncabezado()`, `renderDatos()`, `toDiapositiva()` |
| `Ecosistema` | Un ecosistema | `renderTarjeta()`, `renderDetalle()`, `resumenCorto` |
| `Especie` | Una especie de flora o fauna | `coincideCon(filtro)`, `renderInsignia()`, `enRiesgo` |
| `CicloBioquimico` | Un ciclo con su diagrama | `renderDiagrama()`, `posicion()`, `conectar()` |
| `Pregunta` | Pregunta del cuestionario | `verificar(indice)`, `render()` |
| `MapaLugar` | Un punto del mapa | `proyectar()`, `renderMarcador()`, `renderInfo()` |
| `Presentacion` | El Modo Exposición | `abrir()`, `siguiente()`, `anterior()`, `alternarGuion()` |
| `Cuestionario` | El cuestionario | `responder()`, `mostrar()`, `pantallaResultado()`, `reiniciarEstado()` |
| `MapaInteractivo` | El mapa completo | `render()`, `seleccionar()`, `aplicarFiltros()` |
| `Triptico` | El tríptico de 6 paneles | `renderHojas()`, `ajustarEscala()`, `imprimir()` |
| `Modal`, `Acordeon`, `Pestanas`, `Contador`, `LineaTiempo` | Componentes reutilizables | `abrir()`, `render()`, `iniciar()` |
| `App` | La aplicación | `construirPagina()`, `iniciar()` |

Ejemplo de cómo se agrega una especie nueva (en `js/datos/especies.js`):

```js
new Especie({
  id: "manati-ejemplo", nombre: "Nombre común", cientifico: "Nombre científico",
  reino: "fauna", grupo: "Mamífero", foto: null,
  descripcion: "Descripción breve.",
  habitat: "Dónde vive.",
  dato: "Dato interesante verificado.",
  nom059: "P", // P, A, Pr o null
}),
```

---

## 8. Cómo editar el contenido

- **Textos de cada tema y guiones de exposición**: `js/datos/contenido.js`.
- **Datos del estudiante**: se escriben en la app (sección Tríptico) y se guardan en el navegador. El nombre predeterminado está en `js/componentes/Triptico.js` (clase `DatosEstudiante`).
- **Preguntas del cuestionario**: `js/datos/preguntas.js`.
- **Fotografías**: `js/datos/fotos.js` (ver `IMAGENES.md`).
- **Colores y tipografías**: variables al inicio de `css/base.css`.

---

## 9. Accesibilidad

- Contraste revisado en modo claro y oscuro; botón **☀️ Modo claro / 🌙 Modo oscuro**.
- Navegación completa con teclado: menú, pestañas (flechas), acordeones, mapa (Tab + Enter), diagramas de ciclos (flechas) y Modo Exposición.
- Enlace “Saltar al contenido”, foco visible, textos alternativos en imágenes e ilustraciones (`alt` y `aria-label`).
- Ventanas emergentes con `<dialog>` (se cierran con Esc) y avisos para lectores de pantalla.
- Respeta la preferencia del sistema de reducir animaciones.
- Diseño adaptable a celular, tableta y computadora.

---

## 10. Fuentes y licencias

- **Información**: INEGI, CONABIO, CONANP, SEMARNAT, DOF, Cámara de Diputados, Gobierno de Quintana Roo (IBANQROO), UNESCO, SMN, NOAA, UNAM, INAH y notas periodísticas que citan fuentes oficiales. La lista completa con enlaces está en la sección **📚 Fuentes** de la app y en `js/datos/fuentes.js`.
- **Mapa**: límites estatales y municipales del Marco Geoestadístico del INEGI (a través del paquete de código abierto `@webrek/mx-geo`, MIT); Belice y Guatemala de Natural Earth (dominio público).
- **Ilustraciones y diagramas**: originales de este proyecto.
- **Fotografías**: Wikimedia Commons; cada foto muestra su autor y licencia (ver `IMAGENES.md`).
- **Tipografías**: Bricolage Grotesque y Figtree, SIL Open Font License 1.1.

> Las cifras se tomaron de las fuentes citadas y no se inventaron datos. Los programas de gobierno pueden cambiar con el tiempo: antes de exponer, conviene confirmar su estado actual en los sitios oficiales.

---

## 11. Solución de problemas

| Problema | Solución |
|---|---|
| No aparecen fotografías | Revisa tu conexión. Sin internet se muestran las ilustraciones. En **Fuentes** puedes activar o desactivar las fotos. |
| El tríptico sale con márgenes blancos o cortado | En la ventana de impresión: Márgenes **Ninguno**, Escala **100 %**, tamaño **Carta**, **Horizontal**. |
| El tríptico sale sin colores | Activa **Gráficos de fondo** en las opciones de impresión. |
| La cara de atrás sale al revés | Imprime a doble cara **volteando por el borde corto**. |
| La pantalla completa no funciona | Algunos navegadores la bloquean; usa `F11` (Windows) o el menú Ver del navegador. |
