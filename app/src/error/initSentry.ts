import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/react';
import errorEventEmitter from '@event/ErrorEventEmitter';

export default function initSentry() {
	if (import.meta.env.COSMO_SENTRY_DSN) {
		Sentry.init({
			dsn: import.meta.env.COSMO_SENTRY_DSN,
			integrations: [new Integrations.BrowserTracing()],
			environment: import.meta.env.MODE,
			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
			beforeSend: event => {
				errorEventEmitter.emit(event);
				return event;
			}
		});
	}
}
