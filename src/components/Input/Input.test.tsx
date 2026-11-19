import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("supports native labeling, typing, custom classes, and refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();

    render(
      <>
        <label htmlFor="email">Email</label>
        <Input ref={ref} id="email" type="email" className="custom" />
      </>,
    );

    const input = screen.getByLabelText("Email");
    await user.type(input, "hello@example.com");

    expect(input).toHaveValue("hello@example.com");
    expect(input).toHaveClass("clay-input", "custom");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(ref.current).toBe(input);
  });

  it("maps invalid to aria-invalid without leaking the custom prop", () => {
    render(<Input aria-label="Email" invalid />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).not.toHaveAttribute("invalid");
  });

  it("allows an explicit aria-invalid value to take precedence", () => {
    render(<Input aria-label="Email" invalid aria-invalid="false" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "false");
  });
});
