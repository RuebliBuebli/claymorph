export const CLAY_COLORS = ["coral", "orange", "yellow", "green", "teal", "blue", "pink"] as const;

export type ClayColor = (typeof CLAY_COLORS)[number];
export type ClayColorSelection = ClayColor | "auto";
