// astro.config.mjs
import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/functions";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
