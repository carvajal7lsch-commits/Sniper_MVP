# Historial de versiones

## 0.3.0 (Actual)

Encabezado y hero con la sobriedad de los sitios de trading de referencia.

**Encabezado**

- Transparente sobre el hero y con fondo al bajar; enlaces de texto y un único botón blanco con el borde inclinado como el logo.
- Cursos abre un panel flotante: curso para empezar, temas con su número de cursos y mentoría personalizada. Se abre con mouse, clic, toque o teclado y se cierra con Escape.
- En celular, menú de pantalla completa con los botones de Telegram y WhatsApp abajo, al alcance del pulgar.
- La barra de demo pasa a ser una línea discreta.

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
