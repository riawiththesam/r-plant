import { BehaviorSubject } from "rxjs";
import { MapStateType } from "../../types/map-state-types/map-state.types";
import { loadFile } from "../../util/file/files/files";
import { validateMapStateType } from "../../types/map-state-types/map-state.types.validator";
import { useGameUseCase } from "../game-use-case/game-use-case";
import {
  PlayerStateType,
  defaultPlayerStateType,
  playerIsMoving,
  startMoveForwardPlayer,
  startTurnPlayer,
  updatePlayerMoveState,
} from "./player-state-types";
import { canMoveForward } from "../../types/map-state-types/map-state-type-extensions";

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

const playerStateSubject = new BehaviorSubject<PlayerStateType>(defaultPlayerStateType);
const playerStateObservable = playerStateSubject.asObservable();

export function useDungeonMapUseCase() {
  const gameUseCase = useGameUseCase();

  async function loadMap() {
    const textJson = await loadFile();
    const json = JSON.parse(textJson);
    const next = validateMapStateType(json);
    currentMapState.next(next);
  }

  function updatePlayer(delta: number) {
    const keyBoard = gameUseCase.getKeyBoard();

    // 移動中
    if (playerIsMoving(playerStateSubject.value)) {
      playerStateSubject.next(updatePlayerMoveState(playerStateSubject.value, delta));
      return;
    }

    if (keyBoard.w) {
      if (canMoveForward(playerStateSubject.value.position, currentMapState.value))
        playerStateSubject.next(startMoveForwardPlayer(playerStateSubject.value));
      return;
    }

    if (keyBoard.a) {
      playerStateSubject.next(startTurnPlayer(playerStateSubject.value, "left"));
      return;
    }

    if (keyBoard.d) {
      playerStateSubject.next(startTurnPlayer(playerStateSubject.value, "right"));
      return;
    }
  }

  return {
    loadMap,
    currentMapObservable,
    playerStateObservable,
    updatePlayer,
  };
}
