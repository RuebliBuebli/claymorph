import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import type { ClayColorSelection } from "../../theme/colors.js";
import { useClayColor } from "../../theme/useClayColor.js";
import { cx } from "../../utils/cx";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: ClayColorSelection;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant = "neutral", color, ...props },
  ref,
) {
  const resolvedColor = useClayColor(color);

  return (
    <span
      {...props}
      ref={ref}
      data-clay-color={resolvedColor}
      className={cx("clay-badge", `clay-badge--${variant}`, className)}
    />
  );
});
