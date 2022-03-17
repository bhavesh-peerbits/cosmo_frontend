module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        ...[...Array(14).keys()].reduce((acc, v) => ({
          ...acc,
          [`spacing-${v}`]: `var(--spacing-${v})`,
        })),
      },
      colors: {
        primary: 'var(--primary)',
      },
    },
  },
  plugins: [],
};
