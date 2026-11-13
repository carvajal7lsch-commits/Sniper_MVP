# Sniper Pro — demo de rediseño

Propuesta de rediseño de sniperproacademy.com. Sitio estático con Astro y TypeScript: HTML + CSS, casi sin JavaScript (los filtros de cursos, el menú móvil y el video perezoso son scripts pequeños por componente). La arquitectura, las reglas de código y los comandos están en `AGENTS.md`.

## Páginas

| Ruta                       | Contenido                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| `/`                        | Inicio: hero, La Máquina y su equipo, reseñas, comunidad, app de señales y próximos eventos       |
| `/cursos/`                 | Catálogo real por mentor (fila de caras), tema y nivel, con las ediciones de cada curso agrupadas |
| `/mentores/`               | El equipo: un retrato por mentor que lleva a su perfil                                            |
| `/ingresar/`, `/registro/` | Ingreso y registro rediseñados (de muestra: no envían datos)                                      |
| `/cursos/{slug}/`          | Página de cada curso: portada, descripción, clases con duración, reseñas e inscripción            |
| `/mentores/{slug}/`        | Perfil de cada mentor con su ruta de cursos                                                       |
| `/nosotros/`               | Quiénes somos, misión, visión, cómo enseñamos y presenciales                                      |
| `/contacto/`               | Canales + formulario que abre WhatsApp con el mensaje listo (tema y mentor)                       |
| `/mejoras/`                | Antes vs. después, para mostrarle al cliente                                                      |

## Correr en local

Requiere Node 22.23.4 o más nuevo (Astro 7). Sin Node local: ver "Correr con Docker".

```bash
npm install
npm run assets   # descarga y optimiza fotos/video del sitio original (necesita ffmpeg)
npm run dev      # http://localhost:4321
```

`npm run build` compila dos veces a propósito: la primera para medir el peso real del inicio (`scripts/medir.mjs`) y la segunda para publicar esas cifras en `/mejoras/`.

## Correr con Docker (sin Node en tu PC)

```bash
docker build -f docker/Dockerfile -t sniperpro-demo .
docker run --rm -p 8080:80 sniperpro-demo
```

Abre http://localhost:8080. Es exactamente lo que va a quedar en producción, con fotos y video ya optimizados.

## Deploy en el VPS con Dokploy

1. Sube esta carpeta a un repo de GitHub.
2. En Dokploy: **Create Service → Compose**, conectado al repo, con la ruta del compose `./docker/docker-compose.yml`.
3. Agrega el dominio en Dokploy (ej. `sniperpro.secarvajal.com`), servicio **web**, puerto **80**.
4. DNS: registro A de `sniperpro` hacia la IP del VPS.
5. En el nginx del host, un `server {}` para el subdominio con `proxy_pass http://127.0.0.1:9080;` y luego Certbot para el SSL.

El `docker/Dockerfile` instala ffmpeg, descarga y optimiza las imágenes en una capa cacheada, compila y sirve con nginx (gzip y caché largo para `/_astro/` y `/media/`).

Si prefieres no depender del sitio original al compilar, corre `npm run assets` una vez en tu PC y sube `public/media/` al repo: el script no vuelve a descargar lo que ya existe.

## Qué es contenido real y qué es de ejemplo

- **Real** (tomado del sitio actual): textos de "Quiénes somos", misión y visión, mentores y roles, reseñas de estudiantes (seleccionadas), cifras, teléfono, correo, redes, enlaces de la app y del broker.
- **Catálogo**: los 73 cursos publicados en el sitio actual (título, lecciones, estudiantes, descripción, clases con su duración, portada y reseñas), tomados el 12 de noviembre de 2026 (`src/infraestructura/demo/datos-cursos.ts`). En la versión final se lee del backend real (`FUENTE_DATOS=api`).
