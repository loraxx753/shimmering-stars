# Sentry setup (human steps)

`shimmering-stars` reports UI crashes and Apollo network/GraphQL errors to Sentry.
Vite only exposes `VITE_*` vars, so the DSN is `VITE_SENTRY_DSN`. It is baked into
the browser bundle at **build** time. Chart variables are not attached.

The app still runs if `VITE_SENTRY_DSN` is unset. Session replay is off.

## 1. Create the project

1. Open [Sentry](https://sentry.io) and create a **React** project for `shimmering-stars`.
2. Copy the DSN. This is a different DSN from `astro-server`.

## 2. Local `.env`

```
VITE_SENTRY_DSN=https://...@....ingest.us.sentry.io/...
```

Restart `npm run dev` after saving (Vite reads env at startup).

To send a test event, add `VITE_SENTRY_VERIFY=1`, **restart** Vite, then hard-refresh the app.
Remove that line afterward. Filter Issues by environment **development**.

## 3. Railway

On the **frontend** service, add `VITE_SENTRY_DSN` (same value). Railway must have
it at **build** time, not only runtime. Redeploy after this code is on `main`.

If ingest returns 403, copy a fresh DSN from **Settings → Client Keys** on this React project.
