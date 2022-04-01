import { Exceptionless } from '@exceptionless/react';

export default function initExeptionless() {
	if (import.meta.env.COSMO_EXCEPTIONLESS_KEY) {
		const startExceptionless = async () => {
			await Exceptionless.startup(c => {
				const config = c;
				config.apiKey = import.meta.env.COSMO_EXCEPTIONLESS_KEY;
				config.useDebugLogger();
				config.serverUrl = import.meta.env.COSMO_EXCEPTIONLESS_HOST;

				config.defaultTags.push('Example', 'React');
			});
		};

		startExceptionless();
	}
}
