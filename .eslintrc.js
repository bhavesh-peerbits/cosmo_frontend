const { resolve } = require('path');
const { readdirSync, lstatSync } = require('fs');

const PACKAGE_DIR = 'packages/';
// get files in packages

const noExtraneousOverrides = readdirSync(resolve(__dirname, PACKAGE_DIR))
	// filter for non-hidden dirs to get a list of packages
	.filter(
		entry =>
			entry.substring(0, 1) !== '.' &&
			lstatSync(resolve(__dirname, PACKAGE_DIR, entry)).isDirectory()
	)
	.map(entry => ({ pkg: PACKAGE_DIR, entry }))
	.concat({ pkg: 'app', entry: '' })
	// map to override rules pointing to local and root package.json for rule
	.flatMap(({ pkg, entry }) => [
		{
			files: [`${pkg}${entry}/**/*`],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies: [
							resolve(__dirname, pkg, entry, 'vite.config.ts'),
							resolve(__dirname, pkg, entry) + '/src/test/**/*.{ts,tsx}',
							resolve(__dirname, pkg, entry) + '/**/__tests__/*.{ts,tsx}',
							resolve(__dirname, pkg, entry) + '/**/*.stories.tsx'
						],
						optionalDependencies: false,
						peerDependencies: false,
						packageDir: [__dirname, resolve(__dirname, pkg, entry)]
					}
				]
			}
		},
		{
			files: [`${pkg}${entry}/**/*.ts?(x)`],
			parserOptions: {
				project: [resolve(__dirname, pkg, entry, 'tsconfig.json')]
			}
		}
	]);

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	ignorePatterns: ['**/*.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'airbnb',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended'
	],
	plugins: [
		'@typescript-eslint',
		'eslint-plugin-import',
		'eslint-plugin-react',
		'eslint-plugin-react-hooks',
		'import'
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function'
			}
		],
		'no-console': 'error'
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	overrides: [...noExtraneousOverrides]
};
