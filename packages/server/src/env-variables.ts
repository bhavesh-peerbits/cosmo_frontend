/* eslint-disable import/no-mutable-exports */

import path from 'path';
import { fileURLToPath } from 'url';

let IS_PRODUCTION: boolean | undefined;
let SERVER_PORT: number | undefined;
let CURRENT_DIRNAME: () => string;
let WEB_CONCURRENCY: number;

if (import.meta.env?.DEV) {
	IS_PRODUCTION = import.meta.env.PROD;
	SERVER_PORT = import.meta.env.SERVER_PORT;
	CURRENT_DIRNAME = () => path.dirname(fileURLToPath(import.meta.url));
	WEB_CONCURRENCY = import.meta.env.SERVER_WEB_CONCURRENCY;
} else {
	IS_PRODUCTION = process.env.NODE_ENV === 'production';
	SERVER_PORT = process.env.SERVER_PORT ? +process.env.SERVER_PORT : undefined;
	CURRENT_DIRNAME = () => path.dirname(fileURLToPath(import.meta.url));
	WEB_CONCURRENCY = process.env.SERVER_WEB_CONCURRENCY
		? +process.env.SERVER_WEB_CONCURRENCY
		: 10;
}

export { IS_PRODUCTION, SERVER_PORT, CURRENT_DIRNAME, WEB_CONCURRENCY };
