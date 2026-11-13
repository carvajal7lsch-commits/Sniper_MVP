// Mapa del sitio para Google: páginas fijas, una por curso y una por mentor.
import type { APIRoute } from 'astro';
import { repositorios } from '../infraestructura/contenedor';

export const GET: APIRoute = async ({ site }) => {
  const cursos = await repositorios.cursos.listar();
  const mentores = await repositorios.mentores.listar();
  const rutas = [
    '/',
    '/cursos/',
    '/mentores/',
    '/nosotros/',
    '/contacto/',
    ...cursos.map((c) => `/cursos/${c.slug}/`),
    ...mentores.map((m) => `/mentores/${m.slug}/`),
  ];
  const urls = rutas.map((r) => `  <url><loc>${new URL(r, site).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
