import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  output: 'server',
  // adapter: netlify(),
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), tailwind()],
});
