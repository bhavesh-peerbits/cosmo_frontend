const { resolve } = require('path');
module.exports = {
	...require(resolve(__dirname, '../.prettierrc.js')),
	plugins: ['prettier-plugin-tailwindcss']
};
