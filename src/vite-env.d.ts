/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly COSMO_SENTRY_DSN: string;
	readonly COSMO_EXCEPTIONLESS_KEY: string;
	readonly COSMO_EXCEPTIONLESS_HOST: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
