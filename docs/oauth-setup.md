# Sign-in (frontend remainder)

Client IDs and secrets live on `astro-server`, not in this SPA.

Human console steps (Google, GitHub, Mongo, JWT, Railway):
[astro-server/docs/oauth-setup.md](../../astro-server/docs/oauth-setup.md)

This app only needs:

```
VITE_GRAPHQL_API_URL=http://localhost:7004
VITE_SENTRY_DSN=
VITE_POSTHOG_PROJECT_TOKEN=
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

Local callback path: `/signin/callback` (Vite default port 5173).
