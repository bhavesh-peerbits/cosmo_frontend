import { defineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
// @ts-ignore
import manifest from './manifest.json';
// @ts-ignore
import { dependencies } from './package.json';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = ['react', 'react-dom', 'react-router-dom'];

// vendor splitting
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach(key => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    pwa({
      strategies: 'injectManifest',
      srcDir: '',
      filename: 'service-worker.js',
      manifest,
    }),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
