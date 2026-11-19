import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import type { ClayColorSelection } from "../../theme/colors.js";
import { useClayColor } from "../../theme/useClayColor.js";
import { cx } from "../../utils/cx";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  color?: ClayColorSelection;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid = false, color, "aria-invalid": ariaInvalid, ...props },
  ref,
) {
  const resolvedColor = useClayColor(color);

  return (
    <textarea
      {...props}
      ref={ref}
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      data-clay-color={resolvedColor}
      className={cx("clay-textarea", className)}
    />
  );
});
