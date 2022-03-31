const plugin = require('tailwindcss/plugin');
const { tokens } = require('@carbon/themes');
const { styles } = require('@carbon/type');
const spacing = require('@carbon/layout');
const motion = require('@carbon/motion');
const kebabCase = require('lodash/kebabCase');

const toKebabCase = str => {
	return kebabCase(str).replace('0', '');
};

const carbonFonts = Object.entries(styles).reduce((acc, [key, value]) => {
	acc[`.text-${toKebabCase(key)}`] = value;
	return acc;
}, {});

const carbonSpacing = tokens.layout.reduce((acc, layout) => {
	acc[toKebabCase(layout.replace('spacing', ''))] = spacing[layout];
	return acc;
}, {});

const carbonDuration = motion.unstable_tokens.reduce((acc, token) => {
	acc[toKebabCase(token)] = motion[token];
	return acc;
}, {});

const carbonTransition = Object.entries(motion.easings).reduce((acc, [name, value]) => {
	Object.entries(value).reduce((internalAcc, [mode, modeValue]) => {
		internalAcc[`${name}-${mode}`] = modeValue;
		return internalAcc;
	}, acc);
	return acc;
}, {});

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		spacing: carbonSpacing,
		colors: {
			primary: 'var(--primary)'
		},
		fontSize: {},
		transitionDuration: carbonDuration,
		transitionTimingFunction: carbonTransition
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities(carbonFonts);
		})
	]
};
