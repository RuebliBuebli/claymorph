import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { ClayColorSelection } from "../../theme/colors.js";
import { useClayColor } from "../../theme/useClayColor.js";
import { cx } from "../../utils/cx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  color?: ClayColorSelection;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, color, "aria-invalid": ariaInvalid, ...props },
  ref,
) {
  const resolvedColor = useClayColor(color);

  return (
    <input
      {...props}
      ref={ref}
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      data-clay-color={resolvedColor}
      className={cx("clay-input", className)}
    />
  );
});
