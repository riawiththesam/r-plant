import { BehaviorSubject } from "rxjs";
import { MapStateType } from "../../types/map-state-types/map-state.types";
import { loadFile } from "../../util/file/files/files";
import { validateMapStateType } from "../../types/map-state-types/map-state.types.validator";
import { KeyboardStateType } from "../game-use-case/game-use-case";

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

export type PositionInDungeon = {
  x: number;
  y: number;
  direction: "west" | "east" | "north" | "south";
};

const playerPositionState = new BehaviorSubject<PositionInDungeon>({
  x: 0,
  y: 0,
  direction: "east",
});
const playerPositionObservable = playerPositionState.asObservable();

export function useDungeonMapUseCase() {
  async function loadMap() {
    const textJson = await loadFile();
    const json = JSON.parse(textJson);
    const next = validateMapStateType(json);
    currentMapState.next(next);
  }

  function updatePlayer(keyBoard: KeyboardStateType) {
    const current = playerPositionState.value;
    if (keyBoard.w) {
      const next = moveForwardPositionInDungeon(current);
      playerPositionState.next(next);
    }
  }

  return {
    loadMap,
    currentMapObservable,
    playerPositionObservable,
    updatePlayer,
  };
}

function moveForwardPositionInDungeon(posision: PositionInDungeon): PositionInDungeon {
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
