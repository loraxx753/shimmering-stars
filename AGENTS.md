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

## Conventions That Matter
- Keep hooks at top level and maintain existing query/hook abstractions.
- Treat chart/geocode/timezone behavior as deterministic; avoid silent default changes.
- Keep schema-driven frontend assumptions in sync with backend resolver output.

## Reference Docs
- Overview: [README.md](README.md)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- Field reference: [data/astrology-db/docs/field_reference.md](data/astrology-db/docs/field_reference.md)

## Working Rules for Agents
- Validate frontend data contract changes against `astro-server` in the same task when feasible.
- Keep modifications focused and avoid broad UI refactors unless requested.
- Prefer links to existing docs over duplicated instructions.
