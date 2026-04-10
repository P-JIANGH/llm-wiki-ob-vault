import { defineConfig } from 'astro/config';
import { remarkWikilinks } from './src/lib/wikilinks.ts';

const VAULT_ROOT = new URL('../../../', import.meta.url).pathname;

export default defineConfig({
  site: 'http://localhost:4321',
  markdown: {
    remarkPlugins: [remarkWikilinks],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@vault': VAULT_ROOT,
      },
    },
  },
});
