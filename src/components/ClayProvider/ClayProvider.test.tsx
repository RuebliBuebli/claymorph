import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CLAY_COLORS } from "../../theme/colors.js";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { ClayProvider } from "./ClayProvider";

describe("ClayProvider", () => {
  it("scopes accent colors and lets an element override its scope", () => {
    render(
      <ClayProvider color="teal">
        <Button>Scoped action</Button>
        <Badge variant="primary">Scoped badge</Badge>
        <Input aria-label="Scoped field" />
        <Button color="pink">Individual action</Button>
      </ClayProvider>,
    );

    expect(screen.getByRole("button", { name: "Scoped action" })).toHaveAttribute(
      "data-clay-color",
      "teal",
    );
    expect(screen.getByText("Scoped badge")).toHaveAttribute("data-clay-color", "teal");
    expect(screen.getByLabelText("Scoped field")).toHaveAttribute("data-clay-color", "teal");

    const individual = screen.getByRole("button", { name: "Individual action" });
    expect(individual).toHaveAttribute("data-clay-color", "pink");
    expect(individual).not.toHaveAttribute("color");
  });

  it("keeps automatic colors stable across rerenders", () => {
    const { rerender } = render(<Button>Automatic</Button>);
    const button = screen.getByRole("button", { name: "Automatic" });
    const initialColor = button.getAttribute("data-clay-color");

    expect(CLAY_COLORS).toContain(initialColor);
    rerender(<Button>Automatic</Button>);
    expect(button).toHaveAttribute("data-clay-color", initialColor);
  });

  it("assigns a varied palette without explicit colors", () => {
    render(
      <div>
        {Array.from({ length: 28 }, (_, index) => (
          <Button key={index}>Action {index}</Button>
        ))}
      </div>,
    );

    const assignedColors = new Set(
      screen.getAllByRole("button").map((button) => button.getAttribute("data-clay-color")),
    );

    expect(assignedColors.size).toBeGreaterThan(1);
    for (const color of assignedColors) {
      expect(CLAY_COLORS).toContain(color);
    }
  });

  it("lets one element explicitly opt out of a scope with auto", () => {
    const { rerender } = render(
      <ClayProvider color="teal">
        <Button color="auto">Independent action</Button>
        <Button>Scoped action</Button>
      </ClayProvider>,
    );

    const independent = screen.getByRole("button", { name: "Independent action" });
    const automaticColor = independent.getAttribute("data-clay-color");
    expect(CLAY_COLORS).toContain(automaticColor);

    rerender(
      <ClayProvider color="orange">
        <Button color="auto">Independent action</Button>
        <Button>Scoped action</Button>
      </ClayProvider>,
    );

    expect(independent).toHaveAttribute("data-clay-color", automaticColor);
    expect(screen.getByRole("button", { name: "Scoped action" })).toHaveAttribute(
      "data-clay-color",
      "orange",
    );
  });

  it("supports nested scopes", () => {
    render(
      <ClayProvider color="blue">
        <ClayProvider color="orange">
          <Button>Nested action</Button>
        </ClayProvider>
      </ClayProvider>,
    );

    expect(screen.getByRole("button", { name: "Nested action" })).toHaveAttribute(
      "data-clay-color",
      "orange",
    );
  });
});
