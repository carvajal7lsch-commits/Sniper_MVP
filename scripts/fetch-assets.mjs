#!/usr/bin/env node
// Descarga las imágenes originales de sniperproacademy.com y genera versiones optimizadas
// en public/media. Necesita Node 18+, `sharp` (devDependency) y `ffmpeg` en el PATH.
//
//   npm run assets            → descarga lo que falte
//   npm run assets -- --force → regenera todo
import { mkdir, writeFile, stat, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'media');
const FORCE = process.argv.includes('--force');
const SITE = process.env.ASSETS_SITE || 'https://www.sniperproacademy.com';
const FB = process.env.ASSETS_FB || 'https://firebasestorage.googleapis.com/v0/b/sniperpro-eaa57.appspot.com/o/';

const mentores = {
  'luis-algarin':
    FB +
    'image_picker_4AA3EE3D-A652-471F-ACFF-BD367EEB0C1A-49637-000014658DCA3505.png?alt=media&token=d0f02b75-35bb-4442-b982-7ad29b374f46',
  'miguel-monsalve':
    FB +
    'image_picker_189FC3FA-3CD5-4F6B-824B-CC9BF5356823-9222-000002FA6849D57F.png?alt=media&token=acbf7a29-84ab-41e5-b294-1d7efc094880',
  'jose-rangel': FB + '1000906027.png?alt=media&token=acbf7a29-84ab-41e5-b294-1d7efc094880',
  'miguel-ibarra': FB + '1000687686.jpg?alt=media&token=ca91b50d-7e0e-43f6-a2ce-29d7fbd6b4dc',
  'sergio-cristancho':
    FB +
    'image_picker_F1EC2CFD-DA1A-443E-B7D9-87FAB40DEF3F-10868-0000017AE9E5C2C3.png?alt=media&token=acbf7a29-84ab-41e5-b294-1d7efc094880',
  'elkyn-avendano':
    FB +
    'image_picker_0EE6D228-C6CB-4C2E-8056-F91DFC84C374-3134-000000D5F2F1B0F7.jpg?alt=media&token=b695c5a7-8740-4221-a5ce-68e92a38b2fa',
  anderson: FB + 'PERFIL%20ANDERSON%20PAGINA%20WEB.png?alt=media&token=e5a9d58d-b1bb-4059-8cbf-1a911f5cc1a6',
};

// Ajuste fino del recorte por mentor (fracción de la altura). Elkyn trae restos de la firma arriba.
const topOverride = { 'elkyn-avendano': 0.185 };

const need = (f) => FORCE || !existsSync(join(OUT, f));
async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} al descargar ${url}`);
  return Buffer.from(await res.arrayBuffer());
}
const log = (m) => console.log(`  ${m}`);

await mkdir(join(OUT, 'mentores'), { recursive: true });

// Logo (se muestra a 44 px de alto → se genera a 88 px para pantallas retina)
if (need('logo.webp')) {
  const buf = await download(`${SITE}/assets/images/logo/logo.png`);
  await sharp(buf).resize({ height: 88 }).webp({ quality: 90 }).toFile(join(OUT, 'logo.webp'));
  log('logo.webp');
}

// Foto del equipo: se recorta la franja inferior donde la imagen original trae texto incrustado
if (need('familia-1600.webp') || need('familia-800.webp')) {
  const buf = await download(`${SITE}/assets/images/material/FAMILIASNIPERPRO.jpg`);
  const { width, height } = await sharp(buf).metadata();
  const crop = sharp(buf).extract({ left: 0, top: 0, width, height: Math.round(height * 0.62) });
  const cropped = await crop.toBuffer();
  await sharp(cropped).resize({ width: 1600 }).webp({ quality: 72 }).toFile(join(OUT, 'familia-1600.webp'));
  await sharp(cropped).resize({ width: 800 }).webp({ quality: 70 }).toFile(join(OUT, 'familia-800.webp'));
  log('familia-1600.webp, familia-800.webp');
}

// Retratos: las tarjetas originales traen nombre y rol como texto dentro de la imagen.
// Se recorta solo la franja del retrato (4:5) para mostrar nombre y rol como texto real.
for (const [slug, url] of Object.entries(mentores)) {
  if (!need(`mentores/${slug}-400.webp`) && !need(`mentores/${slug}-800.webp`)) continue;
  const buf = await download(url);
  const { width, height } = await sharp(buf).metadata();
  const h = Math.min(Math.round(width * 1.25), height);
  const top = Math.min(Math.round(height * (topOverride[slug] ?? 0.175)), height - h);
  const portrait = await sharp(buf).extract({ left: 0, top, width, height: h }).toBuffer();
  for (const w of [400, 800]) {
    await sharp(portrait)
      .resize({ width: w, height: Math.round(w * 1.25), fit: 'cover' })
      .webp({ quality: 74 })
      .toFile(join(OUT, 'mentores', `${slug}-${w}.webp`));
  }
  log(`mentores/${slug}`);
}

// Video de la clase: el original es un GIF animado. Se convierte a MP4 (H.264) y WebM (VP9) sin audio.
if (need('clase.mp4') || need('clase.webm') || need('clase-poster.webp')) {
  const gif = join(tmpdir(), 'sniper-banner.gif');
  await writeFile(gif, await download(`${SITE}/assets/images/banner/banner-01.gif`));
  const vf = 'scale=960:-2:flags=lanczos,fps=24,format=yuv420p';
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-i',
    gif,
    '-vf',
    vf,
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '27',
    '-movflags',
    '+faststart',
    '-an',
    join(OUT, 'clase.mp4'),
  ]);
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-i',
    gif,
    '-vf',
    vf,
    '-c:v',
    'libvpx-vp9',
    '-crf',
    '38',
    '-b:v',
    '0',
    '-deadline',
    'good',
    '-cpu-used',
    '5',
    '-row-mt',
    '1',
    '-an',
    join(OUT, 'clase.webm'),
  ]);
  const frame = join(tmpdir(), 'sniper-poster.png');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', gif, '-vf', 'scale=960:-2', '-frames:v', '1', frame]);
  await sharp(frame).webp({ quality: 70 }).toFile(join(OUT, 'clase-poster.webp'));
  log('clase.mp4, clase.webm, clase-poster.webp');
}

// Resumen
let total = 0;
async function walk(d) {
  for (const f of await readdir(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) await walk(p);
    else total += (await stat(p)).size;
  }
}
await walk(OUT);
console.log(`Listo. public/media pesa ${(total / 1024 / 1024).toFixed(2)} MB en total.`);
