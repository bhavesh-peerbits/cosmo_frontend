/* eslint-disable global-require */
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import istanbul from 'vite-plugin-istanbul';
import manifest from './manifest.json';
import { dependencies } from './package.json';

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = ['react', 'react-dom', 'react-router-dom', '@carbon/react'];

// vendor splitting
function renderChunks(deps: Record<string, string>) {
	const chunks: Record<string, string[]> = {};
	Object.keys(deps).forEach(key => {
		if (globalVendorPackages.includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
			scss: process.versions.pnp
				? { importer: require('sass-pnp-importer') }
				: {
						importer: () => {
							return () => {};
						}
				  }
		}
	},
	esbuild:
		mode === 'production'
			? {
					jsxFactory: '_jsx',
					jsxFragment: '_jsxFragment',
					jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`
			  }
			: {},
	plugins: [
		...(mode === 'production' ? [] : [react()]),
		istanbul({
			include: 'src/*',
			exclude: ['node_modules', 'src/test/*', 'src/**/__tests__/*'],
			extension: ['.ts', '.tsx'],
			cypress: true,
			requireEnv: true
		}),
		tsconfigPaths(),
		legacy({
			targets: ['defaults', 'not IE 11']
		}),
		svgrPlugin({
			svgrOptions: {
				icon: true
			}
		}),
		eslintPlugin(),
		pwa({
			includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
			registerType: 'autoUpdate',
			strategies: 'injectManifest',
			srcDir: 'src',
			base: '/',
			filename: 'service-worker.ts',
			manifest,
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: 'index.html'
			}
		})
	],
	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: globalVendorPackages,
					...renderChunks(dependencies)
				}
			}
		}
	}
}));
