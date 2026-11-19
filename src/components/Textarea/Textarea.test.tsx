import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("preserves native textarea behavior and forwards its ref", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLTextAreaElement>();

    render(
      <>
        <label htmlFor="bio">Bio</label>
        <Textarea ref={ref} id="bio" className="custom" />
      </>,
    );

    const textarea = screen.getByLabelText("Bio");
    await user.type(textarea, "Soft and accessible");

    expect(textarea).toHaveValue("Soft and accessible");
    expect(textarea).toHaveClass("clay-textarea", "custom");
    expect(ref.current).toBe(textarea);
  });

  it("exposes invalid state through aria-invalid", () => {
    render(<Textarea aria-label="Bio" invalid />);

    const textarea = screen.getByLabelText("Bio");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).not.toHaveAttribute("invalid");
  });
});
