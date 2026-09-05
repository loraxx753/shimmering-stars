import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();

if (dsn) {
  Sentry.init({
    dsn,
    release: "astrology@0.0.0",
    sendDefaultPii: false,
    tracesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    environment: import.meta.env.PROD ? "production" : "development",
    dataCollection: {
      userInfo: false,
      cookies: false,
      urlQueryParams: false,
      httpBodies: [],
    },
  });

  if (import.meta.env.VITE_SENTRY_VERIFY === "1") {
    Sentry.captureException(new Error("Sentry local verify: shimmering-stars"));
    void Sentry.flush(5000);
  }
}

export function captureSentryException(error: unknown): void {
  if (!dsn) {
    return;
  }
  Sentry.captureException(error);
}

export { Sentry };
