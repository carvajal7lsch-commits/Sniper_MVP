# Historial de versiones

## 0.6.0 (Actual)

**Encabezado**

- El buscador vuelve a ser solo la lupa, como en el sitio actual. Sigue abriendo con Ctrl+K o "/".

**Inicio**

- Al bajar desde la primera pantalla, el titular y el video se desenfocan y se apagan mientras entra la presentación de Miguel, que aparece desde el desenfoque. Solo en navegadores que lo soportan y nunca con "reducir movimiento".
- Las reseñas junto a Miguel se ven como comentarios: avatar, nombre, insignia de estudiante y globo.
- El equipo cabe en una sola franja: un panel por mentor; al pasar el cursor, enfocar con teclado o tocar, el panel se abre con foto, rol y redes. En celular se desliza de lado.
- Comunidad y reseñas en una sola sección: invitación al Telegram gratuito y un celular con un chat de Telegram donde las reseñas reales van llegando una a una.
- Banda "App señales" recreada en código a partir de la pieza original, con insignias de Google Play y TestFlight.
- "Próximos eventos" cierra la página como en el sitio actual: foto de la ciudad de fondo y accesos en color a Weltrade, Instagram, WhatsApp, Facebook, YouTube y Telegram. Reemplaza la banda azul final, la foto de familia y la banda de la app anterior.

**Datos**

- Anderson aparece como Anderson Arango.

## 0.5.0

**Encabezado**

- Buscador como el de TradingView: barra "Buscar" que también abre con Ctrl+K o "/". Busca en cursos, mentores y páginas sin importar tildes, se recorre con las flechas y Enter lleva al resultado. En celular queda como ícono de lupa.
- "Inicio" vuelve al menú.
- Logo más grande (46 px de alto en escritorio, 38 px en celular).

**Inicio**

- Titular un poco más pequeño.

**Cursos y mentores**

- El catálogo abre con la búsqueda que llega del encabezado (`/cursos/?q=forex`) y su buscador ya no distingue tildes.
- Cada mentor tiene su enlace directo (`/mentores/#miguel-monsalve`).

## 0.4.1

**Marca**

- Favicon nuevo con la mira del logo (aro plateado con filo dorado, aro azul y sus cuatro marcas), en SVG, `.ico` (16, 32 y 48 px) e ícono para la pantalla de inicio del celular.

**Inicio**

- La primera pantalla es una sola escena a pantalla completa: el video de la clase de fondo, con un velo oscuro para leer el titular y las velas interactivas como capa sutil. Arriba queda una franja negra y el video empieza debajo del encabezado. Se retira la línea de precio con la mira. Las velas son más visibles y ocupan más alto a los lados; en el centro se apagan para no tapar el texto.

## 0.4.0

Hero más directo, con un fondo de velas interactivo.

**Inicio**

- Titular con la frase de la propia academia: "Más que una academia, una familia.", y un subtítulo que dice qué es Sniper Pro. La sección de la foto del equipo pasa a hablar de los presenciales.
- Fondo de gráfico detrás del titular: cuadrícula y velas que se encienden y se apartan con resorte alrededor del cursor, y una cruz con etiqueta de precio que lo sigue. Canvas propio, sin librerías; en pantallas táctiles queda quieto y se detiene cuando sale de la pantalla.
- El video de la clase sube y queda más cerca del botón.

## 0.3.0

Encabezado y hero con la sobriedad de los sitios de trading de referencia.

**Encabezado**

- Transparente sobre el hero y con fondo al bajar; enlaces de texto y un único botón blanco con el borde inclinado como el logo.
- Cursos abre un panel flotante: curso para empezar, temas con su número de cursos y mentoría personalizada. Se abre con mouse, clic, toque o teclado y se cierra con Escape.
- En celular, menú de pantalla completa con los botones de Telegram y WhatsApp abajo, al alcance del pulgar.
- El aviso de demo sale del encabezado: ahora es una pastilla pequeña en la esquina inferior izquierda, que se puede ocultar durante la visita, y una línea en el pie de página.

**Inicio**

- Hero centrado de una sola idea y, debajo, la clase real a lo ancho con una línea de precio y la mira fijando la entrada. El video entra después de cargar la página y no se descarga con ahorro de datos.
- Paleta más oscura (negro con un toque de azul).

**Cursos**

- Los enlaces del menú abren el catálogo ya filtrado por tema (`/cursos/#forex`).

## 0.2.0

Inicio rediseñado con la voz de la academia y base de arquitectura para conectar el backend real.

**Inicio**

- Hero "Trading en modo plastilina" con acceso al fundador.
- Sección del fundador con reseñas reales sobre él y enlaces a Instagram y YouTube.
- Equipo con tarjetas que muestran rol y redes al pasar el mouse o al enfocar con teclado.
- Video de la clase a lo ancho, reseñas como chat de la comunidad, franja de la app y cierre con Telegram.
- Se retiraron los pasos numerados, el celular con señal de ejemplo y la caja de cierre con degradado.

**Arquitectura**

- Dominio con esquemas Zod, repositorios de demo y de API (pendiente) y raíz de composición por `FUENTE_DATOS`.
- TypeScript estricto, pruebas con Vitest, formato con Prettier y CI en GitHub Actions.
- Presupuesto de peso: el build falla si el inicio descarga más de 250 KB antes de mostrarse.

## 0.1.0

Primera demo del rediseño: inicio, cursos con filtros, mentores, nosotros, contacto por WhatsApp y comparación antes/después en `/mejoras`. Medios optimizados (GIF a video, WebP), aviso de riesgo y despliegue con Docker.
