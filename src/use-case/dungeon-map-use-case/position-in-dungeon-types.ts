const directionInDungeonTypes = ["east", "south", "west", "north"] as const;
type DirectionInDungeonKeys = (typeof directionInDungeonTypes)[number];

export type PositionInDungeon = {
  x: number;
  y: number;
  direction: DirectionInDungeonKeys;
};

export function moveForwardPositionInDungeon(position: PositionInDungeon): PositionInDungeon {
  switch (position.direction) {
    case "west": {
      return {
        ...position,
        x: position.x - 1,
      };
    }
    case "east": {
      return {
        ...position,
        x: position.x + 1,
      };
    }
    case "north": {
      return {
        ...position,
        y: position.y - 1,
      };
    }
    case "south": {
      return {
        ...position,
        y: position.y + 1,
      };
    }
  }
}

export function turnPositionInDungeon(turn: "right" | "left", position: PositionInDungeon): PositionInDungeon {
  const directionIndex = directionInDungeonTypes.findIndex((value) => value == position.direction);
  const nextIndex = directionIndex + (turn == "right" ? 1 : -1);
  const nextDirection = directionInDungeonTypes[nextIndex] || "east";

  return {
    ...position,
    direction: nextDirection,
  };
}
