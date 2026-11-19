import { useContext, useId } from "react";
import { CLAY_COLORS } from "./colors.js";
import type { ClayColor, ClayColorSelection } from "./colors.js";
import { ClayColorContext } from "./color-context.js";

function colorForId(id: string): ClayColor {
  let hash = 2166136261;

  for (let index = 0; index < id.length; index += 1) {
    hash = Math.imul(hash ^ id.charCodeAt(index), 16777619);
  }

  return CLAY_COLORS[(hash >>> 0) % CLAY_COLORS.length];
}

export function useClayColor(color?: ClayColorSelection): ClayColor {
  const scopeColor = useContext(ClayColorContext);
  const id = useId();

  if (color && color !== "auto") {
    return color;
  }

  if (color === "auto" || scopeColor === "auto") {
    return colorForId(id);
  }

  return scopeColor;
}
