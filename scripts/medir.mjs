#!/usr/bin/env node
// Mide el peso real de la página de inicio compilada (dist/index.html) y lo guarda en
// src/data/medidas.json para que /mejoras muestre cifras reales, no estimadas.
// Se ejecuta entre dos pasadas de `astro build` (ver script "build" en package.json).
//
// Presupuesto de rendimiento: si lo que se descarga ANTES de ver la página supera
// PRESUPUESTO_INICIAL_KB (250 por defecto), el build falla. Así ningún cambio vuelve
// a cargar la página como el sitio original sin que alguien lo note.
import { readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const html = await readFile(join(DIST, 'index.html'), 'utf8');

const size = async (url) => {
  const p = join(DIST, url.split('?')[0]);
  return existsSync(p) ? (await stat(p)).size : 0;
};
// Texto (HTML/CSS/JS) se sirve comprimido con gzip por nginx
const gz = async (url) => {
  const p = join(DIST, url.split('?')[0]);
  return existsSync(p) ? gzipSync(await readFile(p)).length : 0;
};
const attrs = (re) => [...html.matchAll(re)].map((m) => m[1]);

const css = attrs(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g);
const js = attrs(/<script[^>]+src="([^"]+)"/g);
const imgs = [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
const eagerImgs = [
  ...new Set(
    imgs
      .filter((t) => !/loading="lazy"/.test(t))
      .map((t) => t.match(/src="([^"]+)"/)?.[1])
      .filter(Boolean),
  ),
];
const lazyImgs = [
  ...new Set(
    imgs
      .filter((t) => /loading="lazy"/.test(t))
      .map((t) => t.match(/src="([^"]+)"/)?.[1])
      .filter(Boolean),
  ),
];
const posters = attrs(/poster="([^"]+)"/g);
const videos = [...new Set(attrs(/data-src="([^"]+\.mp4)"/g))]; // el navegador baja solo un formato

// Fuente: una sola variante latin
const fontCss = css.length ? await readFile(join(DIST, css[0]), 'utf8').catch(() => '') : '';
const font = (fontCss.match(/url\(([^)]*latin-wdth-normal[^)]*\.woff2)\)/) || [])[1];

const sum = async (arr, fn = size) => (await Promise.all(arr.map(fn))).reduce((a, b) => a + b, 0);
const htmlGz = gzipSync(html).length;
const inicial =
  htmlGz + (await sum(css, gz)) + (await sum(js, gz)) + (await sum(eagerImgs)) + (font ? await size(font) : 0);
const total = inicial + (await sum(lazyImgs)) + (await sum(posters)) + (await sum(videos));

const medidas = {
  inicialKB: Math.round(inicial / 1024),
  totalKB: Math.round(total / 1024),
  solicitudes:
    1 + css.length + js.length + eagerImgs.length + (font ? 1 : 0) + lazyImgs.length + posters.length + videos.length,
  css: css.length,
  js: js.length,
  fecha: new Date().toISOString().slice(0, 10),
};
await writeFile(join(ROOT, 'src', 'generado', 'medidas.json'), JSON.stringify(medidas, null, 2) + '\n');
console.log('Medidas del inicio:', medidas);

const presupuesto = Number(process.env.PRESUPUESTO_INICIAL_KB ?? 250);
if (medidas.inicialKB > presupuesto) {
  console.error(`El inicio descarga ${medidas.inicialKB} KB antes de mostrarse y el presupuesto es ${presupuesto} KB.`);
  process.exit(1);
}
