import { MapStateType } from "../../types/map-state-types/map-state.types";
import { PositionInDungeon } from "../../types/position-in-dungeon-types/position-in-dungeon-types";

type EnemyListState = {
  list: ReadonlyArray<PositionInDungeon>;
};

export const enemyListSample: EnemyListState = {
  list: [
    {
      x: 0,
      y: 1,
      direction: "east",
    },
  ],
};

export const mapSample: MapStateType = {
  mapChipList: [
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "door",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "wall",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "none",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "none",
        },
      },
    ],
    [
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "door",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "door",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "door",
          north: "wall",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "door",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "wall",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "none",
          north: "none",
          south: "wall",
        },
      },
      {
        floor: "floor",
        walls: {
          west: "none",
          east: "wall",
          north: "none",
          south: "wall",
        },
      },
    ],
  ],
};
