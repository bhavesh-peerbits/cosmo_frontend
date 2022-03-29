/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18nResources from 'vite-plugin-i18n-resources';
import { resolve } from 'path';
import { i18nextDtsGen } from '@liuli-util/rollup-plugin-i18next-dts-gen';
import { dependencies } from './package.json';
import manifest from './manifest.json';

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = ['react', 'react-dom', 'react-router-dom'];

// vendor splitting
function renderChunks(deps: Record<string, string>) {
	const chunks: Record<string, string[]> = {};
	Object.keys(deps).forEach(key => {
		if (globalVendorPackages.includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		'process.env': {}
	},
	envPrefix: 'COSMO_',
	test: {
		include: ['src/**/__tests__/*'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/test/setupTests.ts',
		clearMocks: true,
		coverage: {
			enabled: true,
			reporter: ['text', 'lcov'],
			reportsDirectory: 'coverage/jest'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				includePaths: ['node_modules']
			}
		}
	},
	plugins: [
		tsconfigPaths(),
		react(),
		legacy({
			targets: ['defaults', 'not IE 11']
		}),
		eslintPlugin({
			eslintOptions: {
				cacheLocation: 'node_modules/.cache/'
			}
		}),
		pwa({
			strategies: 'injectManifest',
			srcDir: '',
			filename: 'service-worker.js',
			manifest
		}),
		i18nResources({
			path: resolve(__dirname, 'src/i18n/locales')
		}),
		i18nextDtsGen({
			dirs: [
				resolve(__dirname, 'src/i18n/locales/pages/home'),
				resolve(__dirname, 'src/i18n/locales/pages/test')
			]
		})
	],
	build: {
		sourcemap: false,
		outDir: 'dist/cosmo',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: globalVendorPackages,
					...renderChunks(dependencies)
				}
			}
		}
	}
});
