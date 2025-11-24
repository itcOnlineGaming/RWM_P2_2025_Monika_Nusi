import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        '.',                     // project root
        path.resolve('./packages')  // allow access to /packages
      ]
    }
  }
});
