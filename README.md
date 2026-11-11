# Sniper Pro — demo de rediseño

Propuesta de rediseño de sniperproacademy.com. Sitio estático con Astro y TypeScript: HTML + CSS, casi sin JavaScript (los filtros de cursos, el menú móvil y el video perezoso son scripts pequeños por componente). La arquitectura, las reglas de código y los comandos están en `AGENTS.md`.

## Páginas

| Ruta         | Contenido                                                                                |
| ------------ | ---------------------------------------------------------------------------------------- |
| `/`          | Inicio: hero con la mira, ruta de 3 pasos, clases, mentores, testimonios, app, comunidad |
| `/cursos/`   | Catálogo con filtros por tema y nivel, búsqueda y contacto por WhatsApp                  |
| `/mentores/` | Equipo completo con nombre y rol como texto real                                         |
| `/nosotros/` | Qué es Sniper Pro, pilares y presenciales                                                |
| `/contacto/` | Canales + formulario que abre WhatsApp con el mensaje listo                              |
| `/mejoras/`  | Antes vs. después, para mostrarle al cliente                                             |

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

- **Real** (tomado del sitio actual): textos de "Qué es Sniper Pro", mentores y roles, reseñas de estudiantes (seleccionadas), cifras, teléfono, correo, redes, enlaces de la app y del broker.
- **De ejemplo**: el catálogo de cursos (`src/infraestructura/demo/datos-cursos.ts`). El sitio actual no muestra cursos, así que se armó con los nombres que mencionan los estudiantes en sus reseñas. Se reemplaza conectando el backend real (`FUENTE_DATOS=api`).
