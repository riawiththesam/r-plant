export type PositionInDungeon = {
  x: number;
  y: number;
  direction: "west" | "east" | "north" | "south";
};

export function moveForwardPositionInDungeon(posision: PositionInDungeon): PositionInDungeon {
  switch (posision.direction) {
    case "west": {
      return {
        ...posision,
        x: posision.x - 1,
      };
    }
    case "east": {
      return {
        ...posision,
        x: posision.x + 1,
      };
    }
    case "north": {
      return {
        ...posision,
        x: posision.x - 1,
      };
    }
    case "south": {
      return {
        ...posision,
        x: posision.x + 1,
      };
    }
  }
}
