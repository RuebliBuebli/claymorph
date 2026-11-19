import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders content with surface, padding, native attributes, and a div ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Card ref={ref} padding="lg" className="custom" data-testid="card">
        Content
      </Card>,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveTextContent("Content");
    expect(card).toHaveClass("clay-surface", "clay-card", "clay-card--padding-lg", "custom");
    expect(ref.current).toBe(card);
  });
});
