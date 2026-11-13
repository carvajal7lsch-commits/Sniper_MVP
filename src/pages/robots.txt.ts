// robots.txt: se deja rastrear para que Google vea el noindex de la demo; con seo.indexar en true
// el sitio queda listo para indexarse con su mapa.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
