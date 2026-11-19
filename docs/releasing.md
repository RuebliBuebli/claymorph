# Packaging and releasing

No release is authorized merely by code work. An agent must not run `npm publish` without an explicit user request and must not handle credentials in project files or chat.

## Package contract

- Name: `claymorph` (unscoped).
- Initial version: `0.1.0`; use semantic versioning after release.
- `private: true` prevents accidental publication during initial development. A maintainer must deliberately remove it as part of release approval.
- ESM-only output with `main`, `module`, `types`, and explicit `exports` metadata.
- Public entries: `.` and `./styles.css`.
- React/React DOM compatibility is expressed with peer dependencies; build tooling stays in development dependencies.
- `files: ["dist"]` limits package contents. `sideEffects` preserves CSS while permitting JavaScript tree-shaking.
- `prepack` builds distribution files for both `npm pack` and `npm publish`.

## Pre-release procedure

1. Confirm version, author, license, repository, and npm ownership with the maintainer. Remove `private: true` only after release approval.
2. Recheck the registry name with `npm view claymorph`; earlier availability does not reserve it.
3. Start from a clean, reviewed working tree without committing or changing history on the user's behalf.
4. Run `npm run check` and `npm run check:types`.
5. Run `npm pack --dry-run` and inspect files, sizes, entry paths, and declarations. A real local install/SSR smoke test is recommended for packaging changes.
6. Review `README.md`, `docs/README.md`, consumer guide links, roadmap status, and release notes/version changes. The publish allowlist contains distribution output plus README/package metadata, not the full docs directory; confirm documentation links resolve appropriately from the package's repository presentation.

## Publishing

Only after explicit approval, use the maintainer's authenticated npm account and normal npm 2FA workflow. For this unscoped package, `npm publish` is sufficient; no scoped `--access public` workaround is needed. Prefer CI with npm provenance once ownership and automation exist. Never publish a dry-run artifact or claim that a package is published without checking the registry result.
