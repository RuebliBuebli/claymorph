import { createContext } from "react";
import type { ClayColorSelection } from "./colors.js";

export const ClayColorContext = createContext<ClayColorSelection>("auto");
