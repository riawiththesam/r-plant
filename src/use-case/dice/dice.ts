import random from "just-random-integer";
import range from "just-range";

export type DiceResult = {
  sum: number;
  list: ReadonlyArray<number>;
};

export function dice(numberOfDice: number, numberOfSides: number): DiceResult {
  const list = range(0, numberOfDice).map(() => {
    return random(1, numberOfSides);
  });
  const sum = list.reduce((a, b) => a + b, 0);
  return {
    sum,
    list,
  };
}
