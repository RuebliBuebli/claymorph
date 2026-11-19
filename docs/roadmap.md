# Roadmap and status

This is the living implementation plan. Update statuses and decisions in the same change as the related work; do not preserve completed phases as if they were still pending.

## Current milestone: 0.1.0 foundation — complete locally

- [x] Inspect the empty repository and available runtime.
- [x] Research Claymorphism, accessibility considerations, and npm/React packaging.
- [x] Record research and architectural decisions for future contributors.
- [x] Scaffold the TypeScript/React package and build pipeline.
- [x] Implement tokens, light/dark themes, reusable surface styling, and initial components.
- [x] Add tests and an interactive local playground.
- [x] Verify type checking, tests, production build, package contents, and consumer type resolution.
- [x] Finish consumer and contributor documentation.
- [x] Organize complete guides under `docs/`, with documentation hub and root README links.

## Initial public API

Implemented components: `Button`, `Card`, `Input`, `Textarea`, `Badge`, and `ClayProvider`. Implemented palette exports: `CLAY_COLORS`, `ClayColor`, and `ClayColorSelection`. Accent components support stable automatic colors, explicit `color`, and provider scopes. Style entry: `claymorph/styles.css`, including light/dark tokens, seven named palettes, and `.clay-surface`. The package remains private and unpublished.

## Verification baseline (2026-11-19)

- `npm run check`: passed, including TypeScript, 92 Vitest tests, Vite build, and publint.
- `npm run check:types`: passed for Node-style ESM and bundler consumers.
- `npm pack --dry-run`: passed; 27 files, only distribution output plus README/package metadata.
- Node SSR smoke render, scoped colors, deterministic automatic colors, and CSS subpath resolution: passed.
- Vite playground entry, app, public barrel, palette, and CSS transformation: passed.

## Later candidates (not committed)

- Form-field composition with labels, descriptions, and errors.
- Checkbox, radio, switch, and select primitives.
- Dialog, popover, tabs, and toast primitives with keyboard/focus management.
- Automated accessibility checks and browser-based visual regression tests.
- Release automation with npm provenance after publishing credentials and ownership are configured.

## Release blockers

- Confirm npm package ownership and author/license details with the maintainer. Repository metadata is populated from the existing GitHub origin.
- Recheck npm name availability; research availability does not reserve a name.
- Obtain explicit maintainer approval before any publish.
