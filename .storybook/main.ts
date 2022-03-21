import { UserConfig } from 'vite';
import { StorybookConfig, CoreConfig, Options } from '@storybook/core-common';

interface CustomizedCoreConfig extends CoreConfig {
	builder: CoreConfig['builder'] | 'storybook-builder-vite';
}
interface CustomizedStorybookConfig extends StorybookConfig {
	core: CustomizedCoreConfig;
	viteFinal?: (config: UserConfig, options: Options) => UserConfig;
}

const config: CustomizedStorybookConfig = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: '@storybook/react',
	core: {
		builder: 'storybook-builder-vite'
	},
	/**
	 * Extend Vite config
	 */
	viteFinal(config, { configType }) {
		if (process.env.NODE_ENV === 'production') {
			config.build.chunkSizeWarningLimit = 1200;
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
							'@storybook/addon-links',
							'@storybook/theming'
						]
				  };
		return config;
	}
};
export default config;
