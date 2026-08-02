import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: "https://cse134b-hw5-genesite.netlify.app",
  integrations: [sitemap({
    entryLimit: 10000,
   }),
  ],
});
