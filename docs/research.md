# Research and decisions

Research completed on 2026-11-19, before implementation. Revisit primary sources when changing the visual recipe or package architecture.

## Claymorphism

### Findings

- Michał Malewicz describes the style as friendly, soft, inflated 3D. Its CSS approximation uses generous rounding, a lighter top-left inner shadow, a darker bottom-right inner shadow, and one larger outer shadow. Unlike neumorphism, the surface can differ from the page background.
- Smashing Magazine's CSS walkthrough confirms the three-shadow recipe: two inset shadows and one outset shadow. It recommends CSS custom properties for reusable, adjustable effects.
- The style works best as a selective enhancement for calls to action, cards, containers, and toggles—not as a reason to remove hierarchy or make every element compete for attention.
- Strong accent colors, restrained typography, and good text contrast keep the friendly shapes from becoming overly childish. Shadows do not replace contrast.
- Dark mode is valid, but surfaces must not be completely black because the inner lighting needs to remain visible.
- Motion can reinforce tactility, but it must respect `prefers-reduced-motion`. Keyboard focus must remain visible outside the soft shadows.

### Implementation decisions

- Use warm neutral surfaces, a coral default accent, and a named coral/orange/yellow/green/teal/blue/pink palette. Keep ink and foreground colors high-contrast and shadows color-tinted rather than black.
- Scale shadow and radius values down for small controls and up for cards.
- Keep component text and native control semantics independent of decorative shadows.
- Provide light and dark token themes through `data-clay-theme="light|dark"`; light is the default.
- Offer `.clay-surface` as a reusable style in addition to styled React components.
- Include clear `:focus-visible` outlines and disable nonessential transitions/transforms for reduced motion.
- For the follow-up palette request, automatic assignment hashes React's stable `useId` rather than calling `Math.random()` during render. This preserves rerender stability and SSR hydration while producing a varied appearance. Explicit element colors override provider scopes; explicit `auto` opts one element back into automatic assignment.

### Sources

- Michał Malewicz, [Claymorphism in User Interfaces](https://hype4.academy/articles/design/claymorphism-in-user-interfaces)
- Adrian Bece, Smashing Magazine, [Claymorphism: Will It Stick Around?](https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/)
- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/), including text/non-text contrast, focus appearance, and target size
- W3C WAI, [Understanding Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

## npm and React package architecture

### Findings

- A publishable package requires at least `name` and `version`. `files` is an allowlist that prevents source, tests, and local configuration from accidentally entering the tarball.
- Modern Node recommends `exports` for an explicit public API. Conditional `types` entries and top-level `types` make declarations discoverable; generated declarations belong in the package.
- ESM-only output avoids unnecessary dual-package hazards. The package can add CJS later only if real consumer requirements justify it.
- Vite library mode builds browser libraries and extracts imported CSS. Dependencies such as React that belong to the host application must be externalized.
- React belongs in `peerDependencies`, with a broad compatible range. Development also needs an installed React copy for tests and the playground.
- An explicit `claymorph/styles.css` export avoids runtime style injection and works with SSR. `sideEffects` should retain CSS while allowing unused JavaScript exports to be tree-shaken.
- `npm pack` is the local publish rehearsal. `publint` checks package metadata and `@arethetypeswrong/cli` checks type resolution from consumer configurations.
- React 18 needs `forwardRef` for DOM refs; React 19 also accepts refs as props. Using `forwardRef` supports both with one implementation.

### Implementation decisions

- Package name: unscoped `claymorph`, version `0.1.0`, ESM only, no runtime dependencies.
- Registry checks returned 404 for `claymorph`, `claymorph-ui`, and `@claymorph/react` on 2026-11-19. Availability is not a reservation; recheck immediately before publishing.
- Toolchain: npm, TypeScript, Vite library mode, Vitest, Testing Library, and a small local Vite playground.
- Publish only `dist` plus npm's automatic README/LICENSE/package metadata files.
- Support React 18 and 19 and forward refs to native DOM elements.
- Never publish from an agent session without an explicit user request.

### Sources

- npm, [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file/)
- npm, [package.json fields](https://docs.npmjs.com/cli/v12/configuring-npm/package-json/)
- Node.js, [Modules: Packages](https://nodejs.org/api/packages.html)
- Node.js, [Publishing a package](https://nodejs.org/learn/modules/publishing-a-package)
- TypeScript, [Publishing declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- Vite, [Library Mode and CSS support](https://vite.dev/guide/build.html#library-mode)
- React, [forwardRef](https://react.dev/reference/react/forwardRef) and [React 19: ref as a prop](https://react.dev/blog/2024/12/05/react-19)
