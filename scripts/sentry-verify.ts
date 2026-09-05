import * as Sentry from "@sentry/browser";

try {
  process.loadEnvFile();
} catch {
  // ignore
}

const dsn = process.env.VITE_SENTRY_DSN?.trim();
if (!dsn) {
  console.error("VITE_SENTRY_DSN is not set");
  process.exit(1);
}

Sentry.init({
  dsn,
  release: "astrology@0.0.0",
  environment: "development",
  tracesSampleRate: 0,
  debug: true,
});

const eventId = Sentry.captureException(
  new Error("Sentry local verify: shimmering-stars")
);
const flushed = await Sentry.flush(8000);
await Sentry.close(3000);

console.log(
  JSON.stringify({
    clientInitialized: Boolean(Sentry.getClient()),
    ingestHost: Sentry.getClient()?.getDsn()?.host ?? null,
    eventId: eventId || null,
    flushed,
  })
);
