import { BehaviorSubject } from "rxjs";
import { MapStateType } from "../../types/map-state-types/map-state.types";
import { loadFile } from "../../util/file/files/files";
import { validateMapStateType } from "../../types/map-state-types/map-state.types.validator";

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

export function useDungeonMapUseCase() {
  async function loadMap() {
    const textJson = await loadFile();
    const json = JSON.parse(textJson);
    const next = validateMapStateType(json);
    currentMapState.next(next);
  }

  return {
    loadMap,
    currentMapObservable,
  };
}
