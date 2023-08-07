import { BehaviorSubject, Subject } from "rxjs";
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
import { PositionInDungeon } from "./position-in-dungeon-types";
import { mapSample, enemyListSample } from "./dungeon-map-sample";

const currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
const currentMapObservable = currentMapState.asObservable();

const playerStateSubject = new BehaviorSubject<PlayerStateType>(defaultPlayerStateType);
const playerStateObservable = playerStateSubject.asObservable();

export type EnemyListState = {
  list: ReadonlyArray<PositionInDungeon>;
};
const enemyListStateSubject = new BehaviorSubject<EnemyListState>({ list: [] });
const enemyListStateObservable = enemyListStateSubject.asObservable();

type EventEncountEnemyType = {};
const eventOnEncountEnemySubject = new Subject<EventEncountEnemyType>();
const eventOnEncountEnemyObservable = eventOnEncountEnemySubject.asObservable();

export function useDungeonMapUseCase() {
  const gameUseCase = useGameUseCase();

  async function loadMap() {
    /*
    const textJson = await loadFile();
    const json = JSON.parse(textJson);
    const next = validateMapStateType(json);
    */
    const next = mapSample;
    currentMapState.next(next);

    enemyListStateSubject.next(enemyListSample);
  }

  function updatePlayer(delta: number) {
    const keyBoard = gameUseCase.getKeyBoard();

    // 移動中
    if (playerIsMoving(playerStateSubject.value)) {
      const next = updatePlayerMoveState(playerStateSubject.value, delta);
      playerStateSubject.next(next);

      if (next.moveState.state == "stop") {
        const enemyList = enemyListStateSubject.value.list;
        const playerPosition = playerStateSubject.value.position;
        const encountedEnemy = enemyList.find(
          (enemyPosition) => enemyPosition.x == playerPosition.x && enemyPosition.y == playerPosition.y,
        );
        if (encountedEnemy != null) {
          eventOnEncountEnemySubject.next({});
        }
      }

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
    enemyListStateObservable,
    eventOnEncountEnemyObservable,
    updatePlayer,
  };
}
