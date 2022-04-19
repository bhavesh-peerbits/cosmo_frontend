/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly COSMO_SENTRY_DSN: string;
	readonly COSMO_API_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
