import { BehaviorSubject } from "rxjs";
import range from "lodash/range";
import { MapChipType, MapStateType } from "../../types/map-state-types/map-state-types";

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
  return {
    currentMapObservable,
  };
}
