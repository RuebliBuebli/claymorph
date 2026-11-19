# Design system

Read this before changing visual tokens, CSS, themes, or component appearance. Research rationale and links are in `docs/research.md`.

## Visual recipe

Claymorph should feel soft, friendly, tactile, and inflated without sacrificing hierarchy:

1. Start with a solid pastel or strong accent surface.
2. Use generous, size-appropriate rounding.
3. Add a light top-left inset highlight and a darker bottom-right inset shade.
4. Add one diffuse, color-tinted outer shadow for separation.
5. Keep typography simple and ink dark enough to contrast with the surface.

Do not substitute neumorphic same-color extrusion, pure-black dark surfaces, heavy gradients, or shadows as the only state indicator. Do not make static containers respond as though they were buttons. Avoid visible decorative 1px strokes and hard inset rims on clay surfaces; use low-opacity, diffuse inner lighting instead. Functional field boundaries, focus indicators, and forced-colors outlines are not decorative and must remain.

## Color selection

- The default brand accent is coral; surfaces use warm neutrals rather than lavender. The named palette is exported as `CLAY_COLORS`: coral, orange, yellow, green, teal, blue, and pink.
- Accent-capable React components accept `color?: ClayColor | "auto"`. The default `auto` produces a varied per-element palette assignment.
- Automatic assignment hashes React's stable `useId`. Do not replace it with render-time `Math.random()`: deterministic values avoid flicker, impure rendering, and SSR hydration mismatches.
- Precedence is element `color`, nearest `ClayProvider`, then automatic assignment. Nested providers work, and `auto` deliberately restores automatic selection within an outer scope.
- `ClayProvider` uses React context and adds no wrapper DOM node or layout side effects.
- Color selection covers primary buttons, primary badges, and field hover/focus accents. Secondary buttons stay neutral; semantic danger/success/warning variants never randomize.
- Each named color defines base, hover, active, foreground, soft-surface, and soft-ink tokens in both themes. Never add a base color without its complete accessible state set.

## Tokens and themes

- Public custom properties use `--clay-` and are part of the supported theming surface.
- Tokens cover color, radius, shadows, spacing, typography, and motion where needed.
- Light is the default. Set `data-clay-theme="dark"` on the root or a subtree for dark mode; `data-clay-theme="light"` can explicitly isolate a light subtree.
- Dark surfaces remain visibly colored so inset lighting still reads.
- Component CSS should reference semantic tokens before introducing component-specific custom properties.
- Overrides may be applied at `:root` or a containing element; avoid global element selectors and resets that affect the host application.

## Interaction and accessibility

- Use native `button`, `input`, `textarea`, and other semantic elements rather than recreating behavior on generic containers.
- Normal text targets WCAG AA contrast (4.5:1); essential control/state boundaries and focus indicators target at least 3:1 against adjacent colors. `src/styles/tokens.test.ts` reads the actual token files and enforces default pairs plus every named palette's base, hover, active, and soft-surface contrast in both themes; update its pairs intentionally when adding semantic colors.
- Every interactive component needs a clear `:focus-visible` outline that is not hidden by inset or outer shadows.
- Controls should comfortably exceed WCAG 2.2's 24×24 CSS pixel minimum target where practical.
- Disabled states use native disabling and remain legible; do not communicate errors or variants by color alone in component documentation.
- Hover/press motion is subtle and optional. Under `prefers-reduced-motion: reduce`, remove transitions and transforms.
- `.clay-surface` is the reusable static clay treatment. Interactive variants own their state styles.

## Initial components

- `Button`: `primary`, `secondary`, and `danger` variants; `sm`, `md`, and `lg` sizes; optional full width. Defaults to native `type="button"` to avoid accidental form submission.
- `Card`: static surface with configurable padding, native div attributes, and a forwarded div ref.
- `Input` / `Textarea`: native controls with an `invalid` convenience prop mapped to `aria-invalid`; labels and error associations remain composable with native HTML.
- `Badge`: compact noninteractive status/label treatment with semantic color variants.
- `ClayProvider`: context-only color scope with no added DOM node; accepts a named color or `auto`.

Update this file when tokens, variants, accessibility behavior, or theming contracts change.
