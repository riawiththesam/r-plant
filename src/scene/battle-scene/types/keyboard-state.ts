const gameKeyTypes = ["w", "a", "s", "d"] as const;
type GameKeyType = (typeof gameKeyTypes)[number];
export type KeyboardStateType = {
  [key in GameKeyType]: boolean;
};
