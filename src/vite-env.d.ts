/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_API_URL: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_SENTRY_VERIFY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
