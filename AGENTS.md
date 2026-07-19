# storybook10

SolidJS application built with SolidJS, Storybook, TypeScript, and Vite.

## Goals

- Maintainability
- Simplicity
- Performance
- Strong typing

## Stack & entry points

- `package.json` — scripts, deps (prefer pinned over `*`), `engines` / Volta (Node 26)
- `src/app.tsx` — routes (`/` → `/admin`, `/demo`), `ErrorBoundary`, `ReasonContextProvider`
- `src/index.tsx` — Vite app bootstrap
- `.storybook/` — Storybook 10 + `storybook-solidjs-vite`
- `public/globals.css` — design tokens for CSS modules
- `biome.json` — linter (`preset: "all"` with project-specific offs); `npm run check` also enforces sibling `*.stories.tsx`

## Source layout

| Path | Role |
| --- | --- |
| `src/base/` | Shared UI primitives, hooks, utils (e.g. `IDBStorage`) |
| `src/demo/` | `/demo` KV store demo (IndexedDB-backed) |
| `src/admin/` | `/admin` shell, auth, desktop layout, stub pages |

## Conventions (pointers)

- Idiomatic SolidJS: `.cursor/rules/solidjs.mdc`
- Component stories required: `.cursor/rules/component-stories.mdc` (`Component.tsx` → sibling `Component.stories.tsx`)
- Review process: `.cursor/rules/code-review.mdc` (generic Standards / Spec axes)
- `IDBStorage` is typed localStorage-shaped KV (see comment in `src/base/utils/storage.ts`) — no IDB schema

## Review hotspots (Standards)

Project-specific things reviewers should still weigh when the diff touches them (tooling may not catch all):

- **Dialogs**: nested open/close lifecycle; avoid stacked `<dialog>`; prefer JSX handlers/refs over `getElementById` + effect when possible
- **Wrappers**: merge caller `class` with module class; do not clobber spread props
- **Context hooks**: throw if outside provider — no silent `as` casts
- **Storybook**: tokens / `globals.css` available in preview; required props (e.g. modal `id`) so `play` works
- **a11y**: no accidental `tabIndex={-1}` on nav; icon-only controls need names; rows/buttons keyboard-reachable
- **Errors**: domain failures surfaced in UI (not only `console` / uncleared ReasonContext)
- **Dead API**: no public `throw new Error("not implemented")` left callable; wire or remove unused auth/UI
- **Deps**: prefer pinning floating ranges (`vite: "*"` etc.) for reproducibility
