# Architecture

## Package shape

Claymorph is a single, unscoped, ESM-only npm package named `claymorph`. Source lives in `src/`; Vite emits browser-oriented JavaScript and extracted CSS, while TypeScript emits declarations. Only `dist/` is allowlisted for publication, in addition to npm's standard metadata files.

Public entry points:

- `claymorph` — typed React components.
- `claymorph/styles.css` — tokens, themes, reusable styles, and component CSS.

The stylesheet is deliberately an explicit import. JavaScript must not inject CSS or access browser globals during module evaluation, so SSR remains safe. React and the JSX runtime stay external; React is a peer dependency and a development dependency. There are no runtime utility dependencies.

## Source conventions

- `src/index.ts` is the only JavaScript public barrel. It has no CSS side-effect import, so its declarations never reference a nonexistent extracted stylesheet. Relative re-exports use `.js` specifiers so emitted declarations resolve in Node-style ESM as well as bundlers; TypeScript maps them back to source files during development.
- `src/build.ts` is Vite's build-only entry: it imports the CSS and re-exports the public barrel. Vite names its JavaScript output `dist/index.js` and its CSS output `dist/styles.css`.
- Each component lives in `src/components/<Name>/` with its implementation, types, tests, and CSS as appropriate.
- `src/styles/` contains global tokens, named-palette mappings, and shared/reusable styles.
- `src/theme/` contains the public palette constant/types plus internal color context and stable automatic-selection hook. Color assignment uses `useId` and must remain deterministic for SSR; never use render-time randomness.
- `src/utils/` is internal and not exported as package API.
- Public DOM props extend the matching native element props. Custom props must not leak into the DOM.
- Components use `forwardRef` to support both React 18 and 19 and pass refs to the primary native element.
- Public class names use `clay-`; component variants use stable modifier classes. Consumers may append `className` and native attributes.
- Keep styling in CSS, not inline style objects or runtime CSS-in-JS. Use custom properties for intentional theming hooks.

## Build and test topology

- `vite.config.ts` builds the library and serves the root playground in development.
- `tsconfig.json` type-checks source, tests, and playground.
- `tsconfig.build.json` emits declarations only for publishable source.
- `vitest.config.ts` and `src/test/` configure jsdom component tests.
- `index.html` and `playground/` are local development fixtures and are never package entry points.

## Change rules

Adding a component requires a native-semantics review, public types, a barrel export, styles, tests, `docs/components.md` usage, and a playground example. Update other consumer guides when behavior affects them; the root README links to documentation rather than duplicating it. Adding an export subpath requires matching `exports`, generated files, package linting, and consumer resolution checks. Keep this document synchronized with actual paths and commands.
