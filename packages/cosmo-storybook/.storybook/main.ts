import { UserConfig } from 'vite';
import { CoreConfig, Options, StorybookConfig } from '@storybook/core-common';

interface CustomizedCoreConfig extends CoreConfig {
	builder: CoreConfig['builder'] | 'storybook-builder-vite';
}
interface CustomizedStorybookConfig extends StorybookConfig {
	core: CustomizedCoreConfig;
	viteFinal?: (config: UserConfig, options: Options) => UserConfig | Promise<UserConfig>;
}

const config: CustomizedStorybookConfig = {
	stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'storybook-react-i18next',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@carbon/storybook-addon-theme/register'
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-vite'
	},

	/**
	 * Extend Vite config
	 */
	viteFinal(config, { configType }) {
		const basePath = 'app/src';
		const aliases = ['components', 'i18n'];

		config.resolve = {
			alias: aliases.reduce(
				(acc, alias) => ({
					...acc,
					[`@${alias}`]: `${basePath}/${alias}`
				}),
				{}
			)
		};
		config.css = {
			preprocessorOptions: {
				scss: {
					importer: () => {
						return () => {};
					}
				}
			}
		};

		config.esbuild = {
			jsxFactory: '_jsx',
			jsxFragment: '_jsxFragment',
			jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`
		};

		if (process.env.NODE_ENV === 'production') {
			const index = config.plugins.findIndex(v =>
				Array.isArray(v)
					? v.find(v => v && v.name === 'vite:react-jsx')
					: v && v.name === 'vite:react-jsx'
			);

			if (index > -1) {
				config.plugins.splice(index, 1);
			}

			config.build = {
				chunkSizeWarningLimit: 1200,
				minify: 'esbuild',
				target: 'esnext'
			};
		}

		// Needed only for development mode: `npm run storybook`
		config.optimizeDeps =
			configType === 'PRODUCTION'
				? config.optimizeDeps
				: {
						...(config.optimizeDeps || {}),
						include: [
							...(config?.optimizeDeps?.include || []),
							// Fix: `@storybook/addon-interactions` exports is not defined or `jest-mock` does not provide an export named 'fn'
							'jest-mock',
							// Optional, but prevents error flashing in the Storybook component preview iframe:
							// Fix: failed to fetch dynamically import module, avoid cache miss for dependencies on the first load
							'@storybook/components',
							'@storybook/store',
							// Add all addons that imported in the `preview.js` or `preview.ts` file and used in exported constants
							'@storybook/react/dist/esm/client/docs/config',
							'@storybook/react/dist/esm/client/preview/config',
							'@storybook/addon-a11y/preview.js',
							'@storybook/addon-links/preview.js',
							'@storybook/addon-docs/preview.js',
							'@storybook/addon-actions/preview.js',
							'@storybook/addon-backgrounds/preview.js',
							'@storybook/addon-measure/preview.js',
							'@storybook/addon-outline/preview.js',
							'@storybook/addon-interactions/preview.js',
							'i18next',
							'translation-check'
						]
				  };
		return config;
	}
};
export default config;
