# Development

## Requirements and setup

Use a Node version supported by the current Vite toolchain (the repository's `engines` field is authoritative) and npm. Install with `npm install`. Do not mix lockfiles from other package managers.

## Commands

- `npm run dev` — start the local component playground.
- `npm run typecheck` — type-check source, tests, configuration, and playground without emitting.
- `npm test` — run the Vitest suite once.
- `npm run test:watch` — run tests interactively.
- `npm run build` — clean/build ESM JavaScript and CSS, then generate declarations.
- `npm run check` — run typecheck, tests, build, and `publint`.
- `npm run check:types` — validate the packed JavaScript entry with Are The Types Wrong in ESM-only mode. The CSS-only export is intentionally excluded because it has no JavaScript/types resolution contract.
- `npm pack --dry-run` — inspect the publish allowlist; this invokes `prepack` and therefore builds.

## Verification checklist

For component changes, test rendering, native attributes, variants, custom classes, DOM refs, and meaningful interaction/accessibility behavior. CSS-only assertions are not a substitute for looking at the playground. Check light and dark themes, keyboard focus, invalid/disabled states, and reduced motion when those behaviors change.

Before release work, also run `npm run check`, `npm run check:types`, and inspect `npm pack --dry-run`. Package validation may create tarballs/build output; these are local artifacts, not permission to publish.

## Documentation maintenance

Update the relevant consumer guide under `docs/` for API/usage changes and the relevant contributor guide for internal changes. Keep `docs/README.md` and the root `README.md` indexes synchronized when adding, removing, or renaming guides; the README is an overview, not a duplicate of the full documentation. Mark roadmap items complete only after their verification is done. Record new durable research or rejected alternatives instead of letting decisions exist only in chat.
