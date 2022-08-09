import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';
// import babelCoverage from '@cypress/code-coverage/use-babelrc';

export default defineConfig({
	// setupNodeEvents can be defined in either
	// the e2e or component configuration
	e2e: {
		baseUrl: 'http://localhost:4173/',
		fileServerFolder: 'dist',
		fixturesFolder: false,
		defaultCommandTimeout: 30000,
		experimentalSessionAndOrigin: true,
		setupNodeEvents(on, config) {
			void codeCoverageTask(on, config);
			// include any other plugin code...

			// It's IMPORTANT to return the config object
			// with any changed environment variables
			// on('file:preprocessor', babelCoverage);
			return config;
		}
	}
});
