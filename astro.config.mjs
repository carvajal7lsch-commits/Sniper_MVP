import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sniperpro.secarvajal.com',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
