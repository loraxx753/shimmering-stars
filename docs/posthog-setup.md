# PostHog setup (human steps)

Page views and signed-in users (opaque id only). Autocapture and session replay are off
so natal-chart forms are not scraped. Query strings are stripped so OAuth `code` never
lands in analytics. The app runs without these env vars.

## 1. Create the project

1. Open [PostHog Cloud](https://us.posthog.com/signup) (use EU at [eu.posthog.com](https://eu.posthog.com/signup) if you want EU hosting).
2. Create a project named `shimmering-stars`.
3. Project settings → **Project API token** (starts with `phc_`).
4. In **Session replay** and **Autocapture**, leave them disabled in the UI too if they are on by default.

## 2. Local `.env`

US:

```
VITE_POSTHOG_PROJECT_TOKEN=phc_...
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

EU:

```
VITE_POSTHOG_HOST=https://eu.i.posthog.com
```

Restart Vite after saving.

Local Vite is **`http://localhost:5173`**, not `https`. In PostHog authorized/allowed URLs, add:

- `http://localhost:5173`
- later `https://shimmeringstars.org`

`https://localhost:5173` will not match. Ad blockers often swallow `*.posthog.com`; disable them on localhost. If you created the project on **eu.posthog.com**, set `VITE_POSTHOG_HOST=https://eu.i.posthog.com`.

## 3. Railway

On the **frontend** service, add the same two `VITE_*` variables. They must be present at **build** time. Redeploy after this code is on `main`.

## 4. What is captured

- `$pageview` with pathname only (no `?code=` from `/signin/callback`)
- `identify` with Mongo/JWT user id and `provider` (`GOOGLE` / `GITHUB`) after sign-in
- `reset` on sign-out

Do not send birth date, time, lat/long, email, name, or chart JSON.

## 5. Verify

Open the app, click around, then PostHog → **Activity**. You should see `$pageview`. After Google/GitHub sign-in, a person with only `id` + `provider` should appear.
