import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge";

describe("Badge", () => {
  it("renders every semantic variant and forwards native props and refs", () => {
    const ref = createRef<HTMLSpanElement>();
    const variants: BadgeVariant[] = ["neutral", "primary", "success", "warning", "danger"];
    const { rerender } = render(
      <Badge ref={ref} className="custom">
        Ready
      </Badge>,
    );

    for (const variant of variants) {
      rerender(
        <Badge ref={ref} variant={variant} className="custom">
          Ready
        </Badge>,
      );

      const badge = screen.getByText("Ready");
      expect(badge).toHaveClass("clay-badge", `clay-badge--${variant}`, "custom");
      expect(ref.current).toBe(badge);
    }
  });
});
