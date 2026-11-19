import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("uses safe native defaults and exposes variant classes and its DOM ref", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Button ref={ref} className="custom" size="lg" fullWidth>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(
      "clay-button",
      "clay-button--primary",
      "clay-button--lg",
      "clay-button--full",
      "custom",
    );
    expect(ref.current).toBe(button);
  });

  it("preserves native interaction and supports a submit override", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button type="submit" variant="danger" onClick={onClick}>
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete" });
    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("clay-button--danger");
  });

  it("uses native disabled behavior", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Unavailable
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Unavailable" });
    await user.click(button).catch(() => undefined);

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
