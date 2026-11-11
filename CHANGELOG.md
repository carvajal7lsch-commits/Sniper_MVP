# Historial de versiones

## 0.2.0 (Actual)

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
