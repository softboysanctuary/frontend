import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 5173,
    proxy: { // TODO: Change these to prod API urls prior to putting website up...
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/auth/discord': 'https://localhost:3000/auth/discord',
    },
  },
  optimizeDeps: {
    force: true,
    exclude: ['react', 'react-dom'] 
  },
  esbuild: {
    jsxImportSource: 'solid-js',
    jsx: 'automatic',
  },
});