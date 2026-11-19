# Accessibility

Claymorphism is decorative depth, not a substitute for semantics, contrast, hierarchy, or clear state. Claymorph supplies an accessible foundation, but the composed application must also be tested.

## Built-in behavior

- Components use native `button`, `input`, `textarea`, `div`, and `span` elements as appropriate.
- Buttons default to `type="button"` and support native keyboard, form, and disabled behavior.
- Components forward native attributes and DOM refs for labels, descriptions, focus management, and testing.
- `:focus-visible` uses a 3px outline outside decorative shadows.
- Interactive targets comfortably exceed WCAG 2.2's 24×24 CSS pixel minimum where practical.
- Field borders and focus indicators are functional and intentionally remain even where decorative clay strokes are removed.
- Forced-colors mode removes decorative shadows and restores system borders.
- Hover/press transitions and transforms are removed under `prefers-reduced-motion: reduce`.

## Labels and validation

Always give inputs and textareas a persistent native label:

```tsx
<label htmlFor="email">Email</label>
<Input id="email" type="email" invalid aria-describedby="email-hint email-error" />
<span id="email-hint">Used for account notifications.</span>
<span id="email-error">Enter a complete email address.</span>
```

Use `aria-describedby` or `aria-errormessage` to associate help and validation text. `invalid` maps to `aria-invalid="true"`; do not communicate an error through the border color alone. Add live announcements when validation appears dynamically and move focus intentionally on failed form submission.

Badges are noninteractive text labels, not buttons. If a badge-shaped element performs an action, use a semantic `Button` or link instead.

## Contrast and color

Normal text targets at least 4.5:1 contrast. Essential control/state boundaries and focus indicators target at least 3:1 against adjacent colors. `src/styles/tokens.test.ts` checks the actual token files for:

- Default text, badge, boundary, and focus pairs in both themes.
- Every named palette's base, hover, and active foreground combinations.
- Every named palette's soft-surface and soft-ink combination.

Run `npm test` after any palette change. These checks cover isolated token pairs, not every possible composed or consumer-customized interface. Check actual backgrounds, opacity, disabled content, icons, and application-specific color combinations separately.

Automatic and scoped accent colors do not replace semantic danger, success, or warning styling. Supply readable text and non-color cues wherever status matters.

## Motion and interaction review

Test keyboard focus, hover, active, disabled, invalid, light/dark, reduced-motion, and forced-colors states for relevant changes. Browser zoom and high-contrast tooling should not make text or controls unusable. Avoid adding autoplay, parallax, or large motion without a separate accessibility review.

## Verification resources

- [Development workflow](development.md) for test and playground commands.
- [Design system](design-system.md) for contributor design contracts.
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) for the underlying standards.
- [W3C WAI: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) for motion guidance.
