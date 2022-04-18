const { resolve } = require('path');
module.exports = {
	root: false,
	rules: {
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'no-param-reassign': 'off'
	},
	overrides: [
		{
			files: ['jest.config.ts', 'vite.config.ts'],
			parserOptions: {
				project: [resolve(__dirname, 'tsconfig.node.json')]
			}
		}
	]
};
