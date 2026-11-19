import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import type { ClayColorSelection } from "../../theme/colors.js";
import { useClayColor } from "../../theme/useClayColor.js";
import { cx } from "../../utils/cx";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  color?: ClayColorSelection;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    color,
    type = "button",
    ...props
  },
  ref,
) {
  const resolvedColor = useClayColor(color);

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      data-clay-color={resolvedColor}
      className={cx(
        "clay-button",
        `clay-button--${variant}`,
        `clay-button--${size}`,
        fullWidth && "clay-button--full",
        className,
      )}
    />
  );
});
