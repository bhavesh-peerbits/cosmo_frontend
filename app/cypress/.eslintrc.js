const { resolve } = require('path');

module.exports = {
	root: false,
	overrides: [
		{
			files: ['*.ts?(x)'],
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname
			}
		}
	]
};
