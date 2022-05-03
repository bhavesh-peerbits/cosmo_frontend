const { createRequire } = require('module');

const getDependency = createRequire(require.resolve('@carbon/react'));
const plugin = require('tailwindcss/plugin');
const st = createRequire(getDependency.resolve('@carbon/styles/package.json'));
const { styles } = st(st.resolve('@carbon/type'));
const spacing = st(st.resolve('@carbon/layout'));
const motion = st(st.resolve('@carbon/motion'));
const { white } = st(st.resolve('@carbon/themes'));
const kebabCase = require('lodash/kebabCase');

const themeTokens = Object.keys(white).filter(
	key => styles[key] === undefined && spacing[key] === undefined
);

const toKebabCase = (str, replaceZero = true) => {
	return replaceZero ? kebabCase(str).replace(/(0?)(\d*)$/, '$2') : kebabCase(str);
};

const carbonFonts = Object.entries(styles).reduce((acc, [key, value]) => {
	acc[`.text-${toKebabCase(key)}`] = value;
	return acc;
}, {});

const carbonSpacing = spacing.unstable_tokens.reduce((acc, layout) => {
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

const carbonBreakpoints = Object.entries(spacing.breakpoints).reduce(
	(acc, [name, breakpoint]) => {
		acc[name] = breakpoint.width;
		return acc;
	},
	{}
);

module.exports = {
	important: true,
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		spacing: {
			0: '0',
			...carbonSpacing
		},
		borderWidth: {
			...carbonSpacing
		},
		screens: carbonBreakpoints,
		colors: {
			transparent: 'transparent',
			...themeTokens.reduce((acc, key) => {
				const k = toKebabCase(key);
				acc[k] = `var(--cds-${toKebabCase(key, false)})`;
				return acc;
			}, {})
		},
		fontSize: {},
		transitionDuration: carbonDuration,
		transitionTimingFunction: carbonTransition
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		plugin(function ({ addUtilities }) {
			addUtilities(carbonFonts);
		})
	]
};
