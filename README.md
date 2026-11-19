# Claymorph

Soft, accessible Claymorphism components and reusable styles for React. Built with TypeScript, native HTML semantics, themeable CSS custom properties, and no runtime dependencies.

> **Development status:** version 0.1.0 is implemented locally and has not been published to npm. `private: true` prevents accidental publishing while ownership and release metadata are confirmed.

## Highlights

- `Button`, `Card`, `Input`, `Textarea`, `Badge`, and context-only `ClayProvider` components
- Seven named accent colors with stable automatic per-element assignment
- Explicit element colors and scoped colors through `ClayProvider`
- Light/dark themes and public `--clay-*` CSS tokens
- Native behavior, forwarded refs, visible focus, reduced motion, and forced-colors support
- ESM JavaScript, TypeScript declarations, and an explicit SSR-friendly stylesheet

## Quick preview

```sh
npm install
npm run dev
```

Open the local URL printed by Vite to explore components, both themes, and the interactive palette/scope example.

## Documentation

**[Open the complete documentation hub](docs/README.md).**

### Using Claymorph

- [Getting started](docs/getting-started.md) — installation, stylesheet setup, first example, and local package testing
- [Components and API](docs/components.md) — every component, prop, palette export, and `.clay-surface`
- [Colors, themes, and customization](docs/theming.md) — automatic colors, overrides, scopes, themes, and tokens
- [Accessibility](docs/accessibility.md) — labels, validation, contrast, focus, motion, and verification

### Developing and maintaining

- [Development workflow](docs/development.md) — setup, commands, tests, and contribution checklist
- [Architecture](docs/architecture.md) — source layout, package entries, build outputs, and conventions
- [Design system](docs/design-system.md) — visual recipe and design contracts
- [Releasing](docs/releasing.md) — package metadata and protected npm release procedure

### Project context

- [Research and decisions](docs/research.md) — primary sources and durable implementation decisions
- [Roadmap and status](docs/roadmap.md) — completed work, verification baseline, and future candidates
- [Agent instructions](AGENTS.md) — concise agent entry point and documentation-maintenance rules

React and React DOM 18 or 19 are peer dependencies. The package is ESM-only; CommonJS consumers on supported Node versions need dynamic `import()`.

Repository links come from the existing GitHub origin. Author and license metadata still require maintainer confirmation before release.
