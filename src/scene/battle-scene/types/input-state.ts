export const gameInputTypes = ["up", "down", "left", "right"] as const;
export type GameInputType = (typeof gameInputTypes)[number];
export type GameInputStateType = {
  [key in GameInputType]: number;
};
