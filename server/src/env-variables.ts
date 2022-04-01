/* eslint-disable import/no-mutable-exports */

import path from 'path';
import { fileURLToPath } from 'url';

let IS_PRODUCTION: boolean | undefined;
let SERVER_PORT: number | undefined;
let CURRENT_DIRNAME: () => string;

if (import.meta.env?.MODE) {
	IS_PRODUCTION = import.meta.env.PROD;
	SERVER_PORT = import.meta.env.PORT;
	CURRENT_DIRNAME = () => path.dirname(fileURLToPath(import.meta.url));
} else {
	IS_PRODUCTION = process.env.NODE_ENV === 'production';
	SERVER_PORT = process.env.PORT ? +process.env.PORT : undefined;
	CURRENT_DIRNAME = () => __dirname;
}

export { IS_PRODUCTION, SERVER_PORT, CURRENT_DIRNAME };
