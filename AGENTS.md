# Claymorph agent guide

Claymorph is a reusable React + TypeScript UI package with a Claymorphism visual language. The npm package name is `claymorph`; it is source-only until a maintainer explicitly publishes it.

## Read only what you need

- `docs/README.md` — documentation hub and consumer guides; update its index when guides change.
- `docs/architecture.md` — source layout, public API, build outputs, and component conventions.
- `docs/design-system.md` — required reading for tokens, styling, themes, or component appearance.
- `docs/development.md` — setup, commands, testing, and contribution checklist.
- `docs/releasing.md` — required reading for package metadata, versioning, packing, or publishing.
- `docs/research.md` — dated design/package research and source links.
- `docs/roadmap.md` — current implementation status and planned work.

## Non-negotiables

- Preserve native HTML semantics, keyboard behavior, visible focus, contrast, and reduced-motion support.
- Prefix public classes with `clay-` and CSS custom properties with `--clay-`.
- Keep React external and declared as a peer dependency. Do not add runtime dependencies without a clear need.
- Keep `claymorph/styles.css` as an explicit consumer import; do not inject styles at runtime.
- Run the checks in `docs/development.md` before considering code complete.
- Never publish, commit, push, or otherwise mutate git history unless the user explicitly requests it.
- Update every relevant documentation file and `docs/roadmap.md` when behavior, APIs, commands, design decisions, or plans change. Keep this file short and put details in the linked documents.
