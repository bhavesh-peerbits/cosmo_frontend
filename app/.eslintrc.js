const { resolve } = require('path');

module.exports = {
	root: false,
	overrides: [
		{
			files: ['vite.config.ts'],
			parserOptions: {
				project: [resolve(__dirname, 'tsconfig.node.json')]
			}
		},
		{
			files: ['**/__tests__/**/*.ts?(x)'],
			extends: ['plugin:testing-library/react'],
			rules: {
				'testing-library/no-await-sync-events': 'error',
				'testing-library/no-manual-cleanup': 'error',
				'testing-library/prefer-explicit-assert': 'error',
				'testing-library/prefer-user-event': 'error',
				'testing-library/prefer-wait-for': 'error'
			}
		}
	]
};
