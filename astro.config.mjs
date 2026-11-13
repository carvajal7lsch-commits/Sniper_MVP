import { defineConfig } from 'astro/config';

export default defineConfig({
  // Dominio de la demo. Al publicar en el dominio de la academia, cambiar por https://www.sniperproacademy.com
  site: 'https://sniper.secarvajal.com',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
