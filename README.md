# Cosmo PWA

Welcome to Cosmo PWA, powered by [Aizoon](https://www.aizoongroup.com/home.aspx#intro).

- `yarn dev` - Run the development server to develop your PWA
- `yarn build` - Create a production build of your site, by default into the `dist` directory
- `yarn serve` - Preview your production build

### Development

- Run `yarn` to install all the dependencies.
- Run `yarn dev` to start the dev server with HR and async Eslint check

### Scripts

- `yarn test` - run unit and integration tests related to changed files based on git.
- `yarn test:ci` - run all unit and integration tests in CI mode.
- `yarn test:e2e` - run all e2e tests with the Cypress Test Runner.
- `yarn test:e2e:headless` - run all e2e tests headlessly.
- `yarn format` - format all files with Prettier.
- `yarn lint` - runs TypeScript, ESLint and Stylelint.
- `yarn validate` - runs `lint`, `test:ci` and `test:e2e:ci`.
