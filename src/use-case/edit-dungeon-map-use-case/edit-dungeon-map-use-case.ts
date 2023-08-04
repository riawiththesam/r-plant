import { BehaviorSubject } from "rxjs";
import range from "lodash/range";
import { MapChipType, MapChipWallType, MapStateType } from "../../types/map-state-types/map-state.types";
import { DungeonWallDirection } from "../../components/game/dungeon/dungeon-wall/dungeon-wall";
import { loadFile, saveFile } from "../../util/file/files/files";
import { validateMapStateType } from "../../types/map-state-types/map-state.types.validator";

type EditWallStateType = "setWall" | "setDoor" | "removeWall";
const editWallState = new BehaviorSubject<EditWallStateType>("setWall");
//const editWallObservable = editWallState.asObservable();

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

const sample: ReadonlyArray<ReadonlyArray<MapChipType>> = range(0, 20).map((_row) => {
  return range(0, 20).map((_col) => {
    return { floor: "floor", walls: { west: "none", east: "none", north: "none", south: "none" } };
  });
});

currentMapState.next({
  mapChipList: sample,
});

export function useEditDungeonMapUseCase() {
  function setSetWall() {
    editWallState.next("setWall");
  }

  function setRemoveWall() {
    editWallState.next("removeWall");
  }

  function setSetDoor() {
    editWallState.next("setDoor");
  }

  function getEditWallState() {
    return editWallState.value;
  }

  /**
   * マップの対応する座標に全壁(どちらから見ても壁となる壁)
   *
   * @param xIndex
   * @param yIndex
   * @param direction
   * @param type
   */
  function setWall(xIndex: number, yIndex: number, direction: DungeonWallDirection, type: MapChipWallType) {
    const backSide = getBackSideWall(xIndex, yIndex, direction);

    const nextList = currentMapState.value.mapChipList.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        // 指定した座標の壁
        if (colIndex == xIndex && rowIndex == yIndex) {
          const nextWalls = { ...col.walls };
          nextWalls[direction] = type;
          return { ...col, walls: nextWalls };
        }
        // 指定した座標の裏側の壁
        if (colIndex == backSide.xIndex && rowIndex == backSide.yIndex) {
          const nextWalls = { ...col.walls };
          nextWalls[backSide.direction] = type;
          return { ...col, walls: nextWalls };
        }
        return col;
      });
    });

    currentMapState.next({ ...currentMapState.value, mapChipList: nextList });
  }

  function exportJSON() {
    const json = JSON.stringify(currentMapState.value, null, 2);
    saveFile("map", json).then(() => {
      console.log("saved");
    });
  }

  async function loadJSON() {
    const jsonText = await loadFile();
    const json = JSON.parse(jsonText);
    const nextState = validateMapStateType(json);
    currentMapState.next(nextState);
    console.log("loaded");
  }

  return {
    currentMapObservable,
    setSetWall,
    setRemoveWall,
    setSetDoor,
    getEditWallState,
    setWall,
    exportJSON,
    loadJSON,
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
