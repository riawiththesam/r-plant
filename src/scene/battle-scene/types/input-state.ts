export const gameInputTypes = ["up", "down", "left", "right", "buttonA", "buttonB"] as const;
export type GameInputType = (typeof gameInputTypes)[number];
export type GameInputStateType = {
  [key in GameInputType]: number;
};

export const defaultGameInputState = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
  buttonA: 0,
  buttonB: 0,
};
