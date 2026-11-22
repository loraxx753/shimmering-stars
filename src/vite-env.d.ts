/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_API_URL: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_SENTRY_VERIFY?: string;
  readonly VITE_POSTHOG_PROJECT_TOKEN?: string;
  readonly VITE_POSTHOG_HOST?: string;
  readonly VITE_BOOKING_RECORDED_URL?: string;
  readonly VITE_BOOKING_LIVE_READING_URL?: string;
  readonly VITE_BOOKING_COUNSELING_URL?: string;
  readonly VITE_BOOKING_FOLLOWUP_URL?: string;
  readonly VITE_BOOKING_CHECKIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
