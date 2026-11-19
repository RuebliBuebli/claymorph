import type { ReactNode } from "react";
import { ClayColorContext } from "../../theme/color-context.js";
import type { ClayColorSelection } from "../../theme/colors.js";

export interface ClayProviderProps {
  color?: ClayColorSelection;
  children: ReactNode;
}

export function ClayProvider({ color = "auto", children }: ClayProviderProps) {
  return <ClayColorContext.Provider value={color}>{children}</ClayColorContext.Provider>;
}
