const path = require('path');

module.exports = {
	root: false,
	overrides: [
		{
			files: ['*.ts?(x)'],
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname
			},
			env: {
				'cypress/globals': true
			},
			plugins: ['cypress'],
			rules: {
				'import/namespace': 'off',
				'import/no-extraneous-dependencies': 'off',
				'@typescript-eslint/no-unused-expressions': 'off',
				'no-void': 'off',
				'cypress/no-assigning-return-values': 'error',
				'cypress/no-unnecessary-waiting': 'error',
				'cypress/no-async-tests': 'error',
				'cypress/no-force': 'error',
				'cypress/assertion-before-screenshot': 'error',
				'cypress/require-data-selectors': 'error',
				'cypress/no-pause': 'error'
			}
		}
	]
};
