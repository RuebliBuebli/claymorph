import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, padding = "md", ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx("clay-surface", "clay-card", `clay-card--padding-${padding}`, className)}
    />
  );
});
