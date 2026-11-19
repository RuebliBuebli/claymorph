# Components and API

All components are exported from the `claymorph` root entry. Import `claymorph/styles.css` once as described in [Getting started](getting-started.md).

Except for the context-only `ClayProvider`, components accept their corresponding native HTML attributes, append a consumer `className`, and forward refs to their primary DOM element. Custom component props are consumed rather than leaked onto the DOM.

## Button

```tsx
<Button>Primary</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button fullWidth>Full width</Button>
<Button color="blue">Explicitly blue</Button>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "danger"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `fullWidth` | `boolean` | `false` |
| `color` | `ClayColor \| "auto"` | unset; automatic unless scoped |

Buttons default to native `type="button"` to avoid accidental form submission. Pass `type="submit"` intentionally inside a form and use native `disabled` for unavailable actions. Color affects primary buttons; secondary buttons stay neutral and danger keeps its semantic color.

## Card

```tsx
<Card padding="md">Content</Card>
<Card padding="none">Custom layout</Card>
```

| Prop | Type | Default |
| --- | --- | --- |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` |

Cards are static `div` elements with native div attributes and a forwarded div ref. They intentionally have no button-like hover or press behavior.

## Input and Textarea

```tsx
<label htmlFor="email">Email</label>
<Input id="email" type="email" invalid aria-describedby="email-error" />
<span id="email-error">Enter a complete email address.</span>

<label htmlFor="notes">Notes</label>
<Textarea id="notes" rows={5} color="green" />
```

Both controls extend their native element props and provide:

| Prop | Type | Default |
| --- | --- | --- |
| `invalid` | `boolean` | `false` |
| `color` | `ClayColor \| "auto"` | unset; automatic unless scoped |

`invalid` maps to `aria-invalid="true"`; an explicitly supplied `aria-invalid` takes precedence. Color controls hover/focus accents. Always provide a persistent native label and associate help/errors with `aria-describedby` or `aria-errormessage`.

## Badge

```tsx
<Badge>Neutral</Badge>
<Badge variant="primary">Automatic primary</Badge>
<Badge variant="primary" color="pink">Pink</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"neutral" \| "primary" \| "success" \| "warning" \| "danger"` | `"neutral"` |
| `color` | `ClayColor \| "auto"` | unset; automatic unless scoped |

Badges are noninteractive spans. Supply visible text so status is not communicated by color alone. The `color` prop affects the primary variant; semantic variants retain their semantic palettes.

## ClayProvider

```tsx
<ClayProvider color="teal">
  <Button>Teal action</Button>
  <Badge variant="primary">Teal badge</Badge>
  <Input aria-label="Teal focus accent" />
  <Button color="pink">A pink exception</Button>
</ClayProvider>
```

| Prop | Type | Default |
| --- | --- | --- |
| `color` | `ClayColor \| "auto"` | `"auto"` |
| `children` | `ReactNode` | required |

The provider uses React context and renders no wrapper DOM node. Explicit element colors override the nearest provider. An explicit `color="auto"` on an element or nested provider restores automatic assignment. See [Colors, themes, and customization](theming.md) for precedence and palette details.

## Palette exports

```tsx
import { CLAY_COLORS } from "claymorph";
import type { ClayColor, ClayColorSelection } from "claymorph";
```

`CLAY_COLORS` is the readonly list `coral`, `orange`, `yellow`, `green`, `teal`, `blue`, `pink`. `ClayColor` is a named color; `ClayColorSelection` also allows `"auto"`.

## Reusable surface class

Use the three-shadow recipe on static content without a component abstraction:

```tsx
<div className="clay-surface my-surface">Soft content</div>
```

```css
.my-surface {
  padding: 2rem;
}
```

Customize an individual surface with `--clay-surface-background`, `--clay-surface-radius`, or `--clay-surface-shadow`. Keep interaction on semantic interactive elements rather than making a static surface behave like a button without the required keyboard behavior.
