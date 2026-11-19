import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CLAY_COLORS } from "../theme/colors.js";

type Theme = "light" | "dark";
type Tokens = Record<string, string>;

function readTokens(theme: Theme): Tokens {
  const css = readFileSync(resolve(process.cwd(), "src/styles/tokens.css"), "utf8");
  const pattern =
    theme === "light"
      ? /:root,\s*\[data-clay-theme="light"\]\s*\{([\s\S]*?)\}/
      : /\[data-clay-theme="dark"\]\s*\{([\s\S]*?)\}/;
  const body = css.match(pattern)?.[1];

  if (!body) {
    throw new Error(`Could not read the ${theme} token block`);
  }

  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
}

function resolveHex(tokens: Tokens, name: string): string {
  let value = tokens[name];
  const visited = new Set<string>();

  while (true) {
    if (!value || visited.has(name)) {
      throw new Error(`Missing or circular color token: ${name}`);
    }
    visited.add(name);

    const alias = value.match(/^var\(--([\w-]+)\)$/)?.[1];
    if (!alias) {
      break;
    }

    name = alias;
    value = tokens[name];
  }

  if (!/^#[\da-f]{6}$/i.test(value)) {
    throw new Error(`${name} did not resolve to a six-digit hex color: ${value}`);
  }

  return value;
}

function luminance(hex: string): number {
  const channels = hex.match(/[\da-f]{2}/gi)?.map((channel) => parseInt(channel, 16) / 255) ?? [];
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first: string, second: string): number {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

const textPairs = [
  ["clay-color-ink", "clay-color-surface"],
  ["clay-color-muted", "clay-color-surface-raised"],
  ["clay-color-on-primary", "clay-color-primary"],
  ["clay-color-on-danger", "clay-color-danger"],
  ["clay-color-badge-primary-ink", "clay-color-badge-primary"],
  ["clay-color-badge-success-ink", "clay-color-badge-success"],
  ["clay-color-badge-warning-ink", "clay-color-badge-warning"],
  ["clay-color-badge-danger-ink", "clay-color-badge-danger"],
] as const;

const paletteTextPairs = CLAY_COLORS.flatMap((color) => [
  [`clay-palette-${color}-on`, `clay-palette-${color}-base`],
  [`clay-palette-${color}-on`, `clay-palette-${color}-hover`],
  [`clay-palette-${color}-on`, `clay-palette-${color}-active`],
  [`clay-palette-${color}-soft-ink`, `clay-palette-${color}-soft`],
]);

const boundaryPairs = [
  ["clay-color-border", "clay-color-surface-raised"],
  ["clay-color-focus", "clay-color-background"],
] as const;

describe("theme token contrast", () => {
  for (const theme of ["light", "dark"] as const) {
    describe(theme, () => {
      const tokens = readTokens(theme);

      it.each(textPairs)("%s on %s meets 4.5:1", (foreground, background) => {
        const first = resolveHex(tokens, foreground);
        const second = resolveHex(tokens, background);
        expect(contrast(first, second)).toBeGreaterThanOrEqual(4.5);
      });

      it.each(paletteTextPairs)("%s on %s meets 4.5:1", (foreground, background) => {
        const first = resolveHex(tokens, foreground);
        const second = resolveHex(tokens, background);
        expect(contrast(first, second)).toBeGreaterThanOrEqual(4.5);
      });

      it.each(boundaryPairs)("%s against %s meets 3:1", (foreground, background) => {
        const first = resolveHex(tokens, foreground);
        const second = resolveHex(tokens, background);
        expect(contrast(first, second)).toBeGreaterThanOrEqual(3);
      });
    });
  }
});

it("maps every palette color to every semantic accent token", () => {
  const css = readFileSync(resolve(process.cwd(), "src/styles/palette.css"), "utf8");
  const semanticTokens = [
    "color-primary",
    "color-primary-hover",
    "color-primary-active",
    "color-on-primary",
    "color-badge-primary",
    "color-badge-primary-ink",
  ];

  for (const color of CLAY_COLORS) {
    const block = css.match(new RegExp(`\\[data-clay-color="${color}"\\]\\s*\\{([^}]*)\\}`))?.[1];
    expect(block, `Missing palette block for ${color}`).toBeDefined();

    for (const token of semanticTokens) {
      expect(block, `${color} is missing --clay-${token}`).toContain(`--clay-${token}:`);
    }
  }
});
