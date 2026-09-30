# Imágenes del proyecto

El proyecto usa **dos tipos de imágenes** y nunca muestra una imagen rota:

## 1. Ilustraciones originales (siempre disponibles)

Todas las escenas de ecosistemas, los retratos de especies, los diagramas (ciclos, formación de un cenote, acuífero, esferas, zonificación) y la portada son **ilustraciones SVG creadas para este proyecto** en `js/nucleo/ilustraciones.js`.

- Funcionan **sin internet** y se imprimen con nitidez en el tríptico.
- No tienen restricciones de licencia: puedes usarlas libremente en tu trabajo escolar.
- El tríptico impreso usa solo ilustraciones, para que siempre salga igual.

## 2. Fotografías reales de Wikimedia Commons (con internet)

Cuando hay conexión, la clase `GaleriaFotos` (archivo `js/componentes/GaleriaFotos.js`) hace **una sola consulta** a la API pública de Wikimedia Commons, obtiene cada foto con su **autor y licencia**, y la muestra encima de la ilustración con un crédito como este:

> 📷 Nombre del autor · CC BY-SA 4.0 · Wikimedia Commons

- Si una foto no existe o no carga, se queda la ilustración.
- La lista completa de créditos aparece en la sección **📚 Fuentes → Créditos de imágenes**.
- Ahí mismo está el botón para **activar o desactivar las fotos** (por ejemplo, si prefieres solo ilustraciones al exponer).

### Respetar las licencias

Las fotos de Wikimedia Commons suelen tener licencias **Creative Commons con atribución** (CC BY o CC BY-SA) o son de dominio público. Para usarlas correctamente:

1. Menciona al **autor** y la **licencia** (la app ya lo hace automáticamente).
2. Enlaza a la página de la foto en Wikimedia Commons (en la lista de créditos).
3. Si modificas una foto con licencia CC BY-SA, comparte tu versión con la misma licencia.

### Fotografías configuradas

Están en `js/datos/fotos.js`. Cada clave corresponde a un ecosistema, especie o diapositiva.

| Clave | Dónde se usa | Archivo en Wikimedia Commons |
|---|---|---|
| `portada` | Portada y diapositivas | [Beach and Ruins at Tulum.jpg](https://commons.wikimedia.org/wiki/File:Beach_and_Ruins_at_Tulum.jpg) |
| `selva` | Ecosistema: selva | [Selva tropical.jpg](https://commons.wikimedia.org/wiki/File:Selva_tropical.jpg) |
| `manglar` | Ecosistema: manglar | [México - Sian Ka'an, Mangles 2.JPG](https://commons.wikimedia.org/wiki/File:M%C3%A9xico_-_Sian_Ka'an,_Mangles_2.JPG) |
| `arrecife` | Ecosistema: arrecife | [Arrecifes de Cozumel National Park.jpg](https://commons.wikimedia.org/wiki/File:Arrecifes_de_Cozumel_National_Park.jpg) |
| `dunas` | Ecosistema: dunas | [Paisaje del sendero de las dunas Parque Nacional Isla COntoy.jpg](https://commons.wikimedia.org/wiki/File:Paisaje_del_sendero_de_las_dunas_Parque_Nacional_Isla_COntoy.jpg) |
| `humedales` | Ecosistema: humedales (y diapositiva de biósfera) | [Biósfera de Sian Kaan Quintana Roo.JPG](https://commons.wikimedia.org/wiki/File:Bi%C3%B3sfera_de_Sian_Kaan_Quintana_Roo.JPG) |
| `lagunas` | Ecosistema: lagunas | [Laguna de Bacalar.JPG](https://commons.wikimedia.org/wiki/File:Laguna_de_Bacalar.JPG) |
| `playas` | Ecosistema: playas (y atmósfera) | [Caribbean near Tulum.jpg](https://commons.wikimedia.org/wiki/File:Caribbean_near_Tulum.jpg) |
| `cenotes` | Ecosistema: cenotes (y litosfera) | [Cenote Dos Ojos, México - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Cenote_Dos_Ojos,_M%C3%A9xico_-_panoramio.jpg) |
| `granCenote` | Diapositiva de hidrosfera | [Gran Cenote Tulum (125162155).jpeg](https://commons.wikimedia.org/wiki/File:Gran_Cenote_Tulum_(125162155).jpeg) |
| `islaContoy` | Diapositiva de gobierno | [Parque Nacional Isla Contoy, Quintana Roo.jpg](https://commons.wikimedia.org/wiki/File:Parque_Nacional_Isla_Contoy,_Quintana_Roo.jpg) |
| `jaguar` | Especie | [Jaguar (Panthera onca palustris) female Piquiri River 2.JPG](https://commons.wikimedia.org/wiki/File:Jaguar_(Panthera_onca_palustris)_female_Piquiri_River_2.JPG) |
| `manati` | Especie | [West Indian Manatee Manatí Antillano (5839912351).jpg](https://commons.wikimedia.org/wiki/File:West_Indian_Manatee_Manat%C3%AD_Antillano_(5839912351).jpg) |
| `tortuga-verde` | Especie | [GreenSeaTurtlesAkumalCancunMexico05.JPG](https://commons.wikimedia.org/wiki/File:GreenSeaTurtlesAkumalCancunMexico05.JPG) |
| `flamenco` | Especie | [American Flamingo - Phoenicopterus ruber.jpg](https://commons.wikimedia.org/wiki/File:American_Flamingo_-_Phoenicopterus_ruber.jpg) |
| `tiburon-ballena` | Especie | [Whale shark at Isla Mujeres.jpg](https://commons.wikimedia.org/wiki/File:Whale_shark_at_Isla_Mujeres.jpg) |
| `mono-arana` | Especie | [Geoffroy's Spider Monkey in tree at Tikal.jpg](https://commons.wikimedia.org/wiki/File:Geoffroy's_Spider_Monkey_in_tree_at_Tikal.jpg) |
| `pavo-ocelado` | Especie | [Ocellated Turkey SMTC.jpg](https://commons.wikimedia.org/wiki/File:Ocellated_Turkey_SMTC.jpg) |
| `cocodrilo` | Especie | [Crocodile de Morelet.jpeg](https://commons.wikimedia.org/wiki/File:Crocodile_de_Morelet.jpeg) |
| `tucan` | Especie | [Ramphastos sulfuratus (keel-billed toucan).jpg](https://commons.wikimedia.org/wiki/File:Ramphastos_sulfuratus_(keel-billed_toucan).jpg) |
| `mapache-cozumel` | Especie | [Cozumel Raccoon1.jpg](https://commons.wikimedia.org/wiki/File:Cozumel_Raccoon1.jpg) |
| `loro-yucateco` | Especie | [Amazona xantholora -Xcaret Eco Park -Mexico-8a.jpg](https://commons.wikimedia.org/wiki/File:Amazona_xantholora_-Xcaret_Eco_Park_-Mexico-8a.jpg) |
| `coral-cuerno-alce` | Especie | [Acropora palmata (Elkhorn coral).jpg](https://commons.wikimedia.org/wiki/File:Acropora_palmata_(Elkhorn_coral).jpg) |
| `ceiba` | Especie | [Sacred Mayan Ceiba Tree.jpg](https://commons.wikimedia.org/wiki/File:Sacred_Mayan_Ceiba_Tree.jpg) |
| `chicozapote` | Especie | [Manilkara zapota - Nispero fruit and leaves 01.jpg](https://commons.wikimedia.org/wiki/File:Manilkara_zapota_-_Nispero_fruit_and_leaves_01.jpg) |
| `mangle-rojo` | Especie | [Rhizophora mangle (prop roots).jpg](https://commons.wikimedia.org/wiki/File:Rhizophora_mangle_(prop_roots).jpg) |
| `palma-chit` | Especie | [Thrinax radiata (green thatch palm) 7.jpg](https://commons.wikimedia.org/wiki/File:Thrinax_radiata_(green_thatch_palm)_7.jpg) |
| `caoba` | Especie | [Swietenia macrophylla (30680883066).jpg](https://commons.wikimedia.org/wiki/File:Swietenia_macrophylla_(30680883066).jpg) |
| `pasto-marino` | Especie | [Green Sea Turtle grazing seagrass.jpg](https://commons.wikimedia.org/wiki/File:Green_Sea_Turtle_grazing_seagrass.jpg) |

> Algunas fotos son de la especie fotografiada fuera de Quintana Roo (por ejemplo, el jaguar en Brasil o el mono araña en Guatemala). Representan correctamente a la especie; si quieres fotos tomadas en el estado, puedes cambiarlas como se explica abajo.

### Cómo cambiar o agregar una foto

1. Busca en [commons.wikimedia.org](https://commons.wikimedia.org) (por ejemplo: `Panthera onca`, `cenote Quintana Roo`, `Laguna de Bacalar`).
2. Abre la foto que te guste y revisa su licencia en la parte de abajo de la página.
3. Copia el **nombre exacto del archivo** que aparece después de `File:` (por ejemplo `Laguna de Bacalar.JPG`).
4. Pégalo en `js/datos/fotos.js` en la clave que quieras reemplazar:
   ```js
   lagunas: "Laguna de Bacalar.JPG",
   ```
5. Guarda y recarga la página. El crédito se actualiza solo.

Para agregar foto a una especie que no la tiene (por ejemplo, las orquídeas), agrega una clave nueva en `FOTOS` y escribe esa clave en el campo `foto` de la especie en `js/datos/especies.js`.

### Otros bancos de imágenes confiables

- **CONABIO – Banco de Imágenes**: https://bdi.conabio.gob.mx (revisa las condiciones de uso de cada foto).
- **Naturalista (CONABIO/iNaturalist)**: https://www.naturalista.mx (muchas fotos tienen licencia CC; la licencia aparece en cada observación).
- **CONANP**: fotografías de las áreas naturales protegidas en https://www.gob.mx/conanp (cita a la CONANP como fuente).

Si descargas fotos a tu computadora, puedes mostrarlas en tus propias diapositivas o carteles citando siempre al autor y la licencia.
