// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isBuildWithoutAdapter =
  process.argv.includes('build') && !process.env.ASTRO_ADAPTER;

// https://astro.build/config
export default defineConfig({
  site: 'https://aslamulalam.com',
  integrations: [
    sitemap(),
    react(),
    ...(isBuildWithoutAdapter ? [] : [keystatic()]),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'keystatic-virtual-config-fallback',
        resolveId(id) {
          if (id === 'virtual:keystatic-config') {
            return this.resolve('./keystatic.config', './a');
          }
          return null;
        },
      },
    ],
  },
});
