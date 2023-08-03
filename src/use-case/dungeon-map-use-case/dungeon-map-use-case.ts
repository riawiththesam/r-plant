import { BehaviorSubject } from "rxjs";
import range from "lodash/range";
import { MapChipType, MapStateType } from "../../types/map-state-types/map-state-types";
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
  function setWall(xIndex: number, yIndex: number, direction: DungeonWallDirection) {
    const nextList = currentMapState.value.mapChipList.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        const nextWalls = { ...col.walls };
        nextWalls[direction] = "wall";
        if (colIndex == xIndex && rowIndex == yIndex) return { ...col, walls: nextWalls };
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
