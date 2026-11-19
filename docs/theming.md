# Colors, themes, and customization

## Named palette

Claymorph includes seven named accent colors:

- `coral`
- `orange`
- `yellow`
- `green`
- `teal`
- `blue`
- `pink`

Coral is the default accent for plain CSS usage. Warm neutral surfaces replace the original lavender prototype. Each palette color has base, hover, active, foreground, soft-surface, and soft-ink tokens in light and dark themes. Default and palette contrast combinations are covered by `src/styles/tokens.test.ts`.

Use `CLAY_COLORS` to build pickers or iterate over the available names:

```tsx
import { CLAY_COLORS, Button } from "claymorph";

export function ColorPicker() {
  return CLAY_COLORS.map((color) => (
    <Button key={color} color={color}>
      {color}
    </Button>
  ));
}
```

## Automatic per-element colors

Accent-capable components use automatic assignment when their `color` prop is unset and no named provider scope applies:

```tsx
<Button>Automatic action</Button>
<Badge variant="primary">Automatic badge</Badge>
<Input aria-label="Automatic focus accent" />
```

Automatic assignment hashes React's stable `useId`. It is deterministic and visually varied rather than calling `Math.random()` during rendering. This avoids impure rendering, color flicker, and SSR hydration mismatches. Reordering or restructuring the React tree can change the ID and therefore the assigned color; choose an explicit color when identity must be fixed.

## Explicit element colors

```tsx
<Button color="blue">Always blue</Button>
<Badge variant="primary" color="pink">Pink</Badge>
<Input aria-label="Search" color="green" />
```

An explicit named color overrides every ancestor provider. Use `color="auto"` to restore automatic assignment for one element inside a named scope.

## Scoped colors

```tsx
import { ClayProvider } from "claymorph";

<ClayProvider color="teal">
  <Button>Teal action</Button>
  <Badge variant="primary">Teal badge</Badge>
  <Input aria-label="Teal focus accent" />
  <Button color="pink">A pink exception</Button>
</ClayProvider>
```

Precedence is:

1. An explicit named `color` on the element.
2. Explicit `auto` on the element, which forces automatic assignment.
3. The nearest `ClayProvider` color.
4. Automatic assignment when the nearest provider also uses `auto` or no provider exists.

Providers can be nested and add no DOM nodes or layout side effects.

Color selection affects primary buttons, primary badges, and input/textarea hover/focus accents. Secondary buttons remain neutral. Danger, success, and warning variants preserve their semantic meaning and do not randomize.

## Light and dark themes

Light is the default. Set `data-clay-theme="dark"` on the document element or any subtree:

```tsx
<html data-clay-theme="dark">
  {/* app */}
</html>
```

Use `data-clay-theme="light"` to explicitly restore light tokens inside a dark subtree. Dark surfaces remain visibly colored so the inner highlights and shades stay visible. Theme attributes are independent of `ClayProvider` and can be combined freely.

## CSS tokens and overrides

Public custom properties use the `--clay-` prefix. Tokens cover semantic colors, named-palette primitives, radii, spacing, shadows, typography, and motion. `src/styles/tokens.css` is the source of truth and `src/styles/palette.css` maps named selections to semantic tokens.

Override tokens at `:root` or a containing element:

```css
:root {
  --clay-color-background: #fff8f3;
  --clay-radius-lg: 1.75rem;
}
```

For a custom brand color outside the named palette, define the complete state set together:

```css
.my-brand-scope {
  --clay-color-primary: #3269bb;
  --clay-color-primary-hover: #2a5aa5;
  --clay-color-primary-active: #234d91;
  --clay-color-on-primary: #ffffff;
  --clay-color-badge-primary: #e0edff;
  --clay-color-badge-primary-ink: #24548f;
}
```

Apply the scope class directly to the target component or a plain-CSS container. React components with automatic or named `data-clay-color` assignments override inherited accent tokens, so use `ClayProvider` for React scopes and token classes for custom CSS integrations. Review normal, hover, active, dark, and soft-surface contrast whenever customizing colors.

To customize an existing named palette globally, override its `--clay-palette-<name>-*` primitives rather than only the semantic primary token.

## Reusable surfaces

The `.clay-surface` class accepts these optional custom properties:

- `--clay-surface-background`
- `--clay-surface-radius`
- `--clay-surface-shadow`

See [Components and API](components.md#reusable-surface-class) for markup and [Accessibility](accessibility.md) for the constraints that visual customization must preserve.
