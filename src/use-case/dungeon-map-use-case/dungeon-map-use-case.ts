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

type PlayerMoveStateType = "stop" | "move";

type PlayerStateType = {
  moveState: PlayerMoveStateType;
  position: PositionInDungeon;
};

const playerStateSubject = new BehaviorSubject<PlayerStateType>({
  moveState: "stop",
  position: {
    x: 0,
    y: 0,
    direction: "east",
  },
});
const playerStateObservable = playerStateSubject.asObservable();

export function useDungeonMapUseCase() {
  async function loadMap() {
    const textJson = await loadFile();
    const json = JSON.parse(textJson);
    const next = validateMapStateType(json);
    currentMapState.next(next);
  }

  function updatePlayer(keyBoard: KeyboardStateType) {
    const current = playerStateSubject.value.position;
    if (keyBoard.w) {
      const next = moveForwardPositionInDungeon(current);
      playerStateSubject.next({
        moveState: "stop",
        position: next,
      });
    }
  }

  return {
    loadMap,
    currentMapObservable,
    playerStateObservable,
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
