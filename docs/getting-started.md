# Getting started

## Requirements

Claymorph supports React and React DOM 18 or 19. The package is ESM-only; CommonJS consumers on supported Node versions need dynamic `import()`.

For repository development, use a Node version allowed by the root `package.json` `engines` field and npm. The current toolchain uses TypeScript, Vite, and Vitest.

## Installation

Once published:

```sh
npm install claymorph
```

The package is currently private and unpublished. For local consumer testing:

1. Run `npm install` and `npm pack` in the Claymorph repository.
2. Install the generated `claymorph-0.1.0.tgz` in the consumer application with `npm install /path/to/claymorph-0.1.0.tgz`.
3. Remove or regenerate local tarballs when testing subsequent changes; do not treat packing as publishing.

React and React DOM are peer dependencies and should be installed by the host application.

## Configure the stylesheet

Import the stylesheet once at the application entry:

```tsx
import "claymorph/styles.css";
```

Styles are never injected by component JavaScript. This explicit import keeps loading predictable and server-side rendering safe.

## First example

```tsx
import { Badge, Button, Card, Input } from "claymorph";
import "claymorph/styles.css";

export function ProfileForm() {
  return (
    <Card padding="lg">
      <Badge variant="success">Ready</Badge>
      <label htmlFor="display-name">Display name</label>
      <Input id="display-name" name="display-name" />
      <Button onClick={() => console.log("Saved")}>Save profile</Button>
    </Card>
  );
}
```

With no `color` prop or color provider, accent-capable components receive a stable automatic palette color. See [Colors, themes, and customization](theming.md) to choose an element or scope color.

## Run the local playground

From the repository root:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The playground includes all components, light/dark themes, automatic colors, and an interactive scoped-palette example. Source changes hot-reload while the server is running.

## Next steps

- [Components and API](components.md)
- [Colors, themes, and customization](theming.md)
- [Accessibility](accessibility.md)
- [Development workflow](development.md) for contribution commands
