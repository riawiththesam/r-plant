import { BehaviorSubject } from "rxjs";
import { MapStateType } from "../../types/map-state-types/map-state.types";
import { loadFile } from "../../util/file/files/files";
import { validateMapStateType } from "../../types/map-state-types/map-state.types.validator";
import { useGameUseCase } from "../game-use-case/game-use-case";
import { PositionInDungeon, moveForwardPositionInDungeon, turnPositionInDungeon } from "./position-in-dungeon-types";

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

type PlayerMoveType = "stop" | "move";

type PlayerStateType = {
  moveState: {
    state: PlayerMoveType;
    delta: number;
  };
  position: PositionInDungeon;
};

const playerStateSubject = new BehaviorSubject<PlayerStateType>({
  moveState: {
    state: "stop",
    delta: 0,
  },
  position: {
    x: 0,
    y: 0,
    direction: "east",
  },
});
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

    const currentMoveStateDelta = playerStateSubject.value.moveState.delta + delta;

    // 移動中
    if (playerStateSubject.value.moveState.state == "move") {
      if (currentMoveStateDelta < 20) {
        // 20フレーム(1/3秒)まではdeltaだけを更新
        const current = playerStateSubject.value;
        playerStateSubject.next({
          ...current,
          moveState: {
            ...current.moveState,
            delta: currentMoveStateDelta,
          },
        });
      } else {
        // 移動完了
        const current = playerStateSubject.value;
        playerStateSubject.next({
          ...current,
          moveState: {
            ...current.moveState,
            state: "stop",
            delta: 0,
          },
        });
      }
      return;
    }

    if (keyBoard.w) {
      const current = playerStateSubject.value;
      const nextPosition = moveForwardPositionInDungeon(current.position);
      playerStateSubject.next({
        moveState: {
          state: "move",
          delta: 0,
        },
        position: nextPosition,
      });
      return;
    }

    if (keyBoard.a) {
      const current = playerStateSubject.value;
      const nextPosition = turnPositionInDungeon("left", current.position);
      playerStateSubject.next({
        moveState: {
          state: "move",
          delta: 0,
        },
        position: nextPosition,
      });
      return;
    }

    if (keyBoard.d) {
      const current = playerStateSubject.value;
      const nextPosition = turnPositionInDungeon("right", current.position);
      playerStateSubject.next({
        moveState: {
          state: "move",
          delta: 0,
        },
        position: nextPosition,
      });
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
