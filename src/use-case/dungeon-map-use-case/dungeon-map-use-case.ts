import { BehaviorSubject } from "rxjs";
import range from "lodash/range";
import { MapChipType, MapStateType } from "../../types/map-state-types/map-state.types";
import { DungeonWallDirection } from "../../components/game/dungeon/dungeon-wall/dungeon-wall";

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

const sample: ReadonlyArray<ReadonlyArray<MapChipType>> = range(0, 20).map((row) => {
  return range(0, 20).map((col) => {
    if (row == 0 && col == 0) {
      return { floor: "floor", walls: { west: "wall", east: "wall", north: "wall", south: "wall" } };
    }
    return { floor: "floor", walls: { west: "none", east: "none", north: "none", south: "none" } };
  });
});

currentMapState.next({
  mapChipList: sample,
});

export function useDungeonMapUseCase() {
  /**
   * マップの対応する座標に全壁(どちらから見ても壁となる壁)
   *
   * @param xIndex
   * @param yIndex
   * @param direction
   */
  function setWall(xIndex: number, yIndex: number, direction: DungeonWallDirection) {
    const backSide = getBackSideWall(xIndex, yIndex, direction);

    const nextList = currentMapState.value.mapChipList.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        // 指定した座標の壁
        if (colIndex == xIndex && rowIndex == yIndex) {
          const nextWalls = { ...col.walls };
          nextWalls[direction] = "wall";
          return { ...col, walls: nextWalls };
        }
        // 指定した座標の裏側の壁
        if (colIndex == backSide.xIndex && rowIndex == backSide.yIndex) {
          const nextWalls = { ...col.walls };
          nextWalls[backSide.direction] = "wall";
          return { ...col, walls: nextWalls };
        }
        return col;
      });
    });

    currentMapState.next({ ...currentMapState.value, mapChipList: nextList });
  }

  return {
    currentMapObservable,
    setWall,
  };
}

type GetBackSideWallResult = {
  xIndex: number;
  yIndex: number;
  direction: DungeonWallDirection;
};

/**
 * 対象の座標に存在する壁の裏側の壁の座標を取得する
 *
 * @param xIndex
 * @param yIndex
 * @param direction
 * @returns
 */
function getBackSideWall(xIndex: number, yIndex: number, direction: DungeonWallDirection): GetBackSideWallResult {
  switch (direction) {
    case "west":
      return {
        xIndex: xIndex - 1,
        yIndex: yIndex,
        direction: "east",
      };
    case "east":
      return {
        xIndex: xIndex + 1,
        yIndex: yIndex,
        direction: "west",
      };
    case "north":
      return {
        xIndex: xIndex,
        yIndex: yIndex - 1,
        direction: "south",
      };
    case "south":
      return {
        xIndex: xIndex,
        yIndex: yIndex + 1,
        direction: "north",
      };
  }
}
