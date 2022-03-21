import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/react';

export default function initSentry() {
	if (import.meta.env.COSMO_SENTRY_DSN) {
		Sentry.init({
			dsn: import.meta.env.COSMO_SENTRY_DSN,
			integrations: [new BrowserTracing()],
			environment: import.meta.env.MODE,
			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
			beforeSend: (event: { event_id: string }) => {
				// TODO save event id
				// eslint-disable-next-line no-console
				console.log(event.event_id);
				// Sentry.showReportDialog({ eventId: event.event_id });
			}
		});
	}
}
