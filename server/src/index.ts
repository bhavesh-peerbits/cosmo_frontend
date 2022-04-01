import throng from 'throng';
import startExpress from '@/start-express';
import logger from '@/logger';
import { IS_PRODUCTION } from '@/env-variables';

const start = async (workerId: number, disconnect: () => void) => {
	startExpress({ workerId });

	const shutdown = () => {
		logger.info(`Worker ${workerId} cleanup.`);
		// cleanup resources here
		disconnect();
	};

	process.once('SIGTERM', shutdown);
	process.once('SIGINT', shutdown);
};

let app;
if (IS_PRODUCTION) {
	throng({
		worker: start,
		count: import.meta.env.WEB_CONCURRENCY || 10
	});
} else {
	app = startExpress({});
}

export const cosmoNodeApp = app;
