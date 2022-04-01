/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly WEB_CONCURRENCY?: number;
  readonly PORT?: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
