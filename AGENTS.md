# AGENTS

Scope: this file applies to all work under astrology/shimmering-stars/.

## Repo Identity
- Canonical role: production astrology frontend.
- Stack: React + TypeScript + Vite + Tailwind + Storybook.
- UI conventions follow [MeanwhileJS/meanwhile](https://github.com/MeanwhileJS/meanwhile). Do not assume a local Meanwhile checkout or any particular sibling folder layout.

## Fast Start
- Install: `npm install`
- Dev: `npm run dev`
- Tests: `npm run test`, `npm run test:houses`
- Lint: `npm run lint`
- Build: `npm run build`
- Storybook: `npm run storybook`

## Architecture Notes
- Frontend depends on GraphQL contract from `astro-server`.
- Reuses Meanwhile-style component conventions from [MeanwhileJS/meanwhile](https://github.com/MeanwhileJS/meanwhile).
- Data docs are maintained under `data/astrology-db/docs/`.

## Jira
- Site: https://macovin.atlassian.net
- Project: Shimmering Stars (`SS`)
- Default issue type: Task
- Create and update tickets in `SS` unless the user names another project.
- Pair backend work with `astro-server` under the same `SS` project.
- Loop: create a ticket when the work starts, ship the feature, mark the ticket **Done**. Tracking is a byproduct of shipping, not a required ceremony before code.
- Do not hold a feature open for Storybook, tests, or docs. File those as later housekeeping (often under a separate epic) and close the feature ticket when behavior is on the branch.

## Conventions That Matter
- Keep hooks at top level and maintain existing query/hook abstractions.
- Treat chart/geocode/timezone behavior as deterministic; avoid silent default changes.
- Keep schema-driven frontend assumptions in sync with backend resolver output.
- Meanwhile is convention, not a gate. The easy path is: a page with `.path`, reuse existing primitives, hooks at top level.
- During active development only `component.tsx` (plus `index.ts` / `.path` for pages) is required. `story.tsx`, tests, `docs.mdx`, and `variants.tsx` are housekeeping for breathing room, not part of the feature unless asked.
- `m create` is optional scaffolding, not a requirement. Copying a neighbor file is a valid development path.
- Do not invent a parallel pattern when an existing page or primitive already covers it. Drift is allowed; it should be the more expensive option, not the default.

## Reference Docs
- Overview: [README.md](README.md)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- OAuth human setup: [docs/oauth-setup.md](docs/oauth-setup.md) (console/env steps live with `astro-server`)
- Sentry (UI errors): [docs/sentry-setup.md](docs/sentry-setup.md)
- PostHog (page views): [docs/posthog-setup.md](docs/posthog-setup.md)
- Field reference: [data/astrology-db/docs/field_reference.md](data/astrology-db/docs/field_reference.md)

## Working Rules for Agents
- Validate frontend data contract changes against `astro-server` in the same task when feasible.
- Keep modifications focused and avoid broad UI refactors unless requested.
- Prefer links to existing docs over duplicated instructions.
- When a feature ships, transition its SS ticket to Done and leave a short comment of what landed. Housekeeping stays on its own tickets.
