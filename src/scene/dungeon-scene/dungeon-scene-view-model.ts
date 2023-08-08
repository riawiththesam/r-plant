import { BehaviorSubject, Subject } from "rxjs";
import { MapStateType } from "../../types/map-state-types/map-state.types";
import {
  PlayerStateType,
  defaultPlayerStateType,
  playerIsMoving,
  startMoveForwardPlayer,
  startTurnPlayer,
  updatePlayerMoveState,
} from "../../types/player-state-types/player-state-types";
import { PositionInDungeon } from "../../types/position-in-dungeon-types/position-in-dungeon-types";
import { enemyListSample, mapSample } from "./dungeon-map-sample";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { canMoveForward } from "../../types/map-state-types/map-state-type-extensions";
import { BattleScene } from "../battle-scene/battle-scene";

export type EnemyListState = {
  list: ReadonlyArray<PositionInDungeon>;
};

type EventEncountEnemyType = {};

export class DungeonSceneViewModel {
  private currentMapState = new BehaviorSubject<MapStateType>({ mapChipList: [] });
  currentMapObservable = this.currentMapState.asObservable();

  private playerStateSubject = new BehaviorSubject<PlayerStateType>(defaultPlayerStateType);
  playerStateObservable = this.playerStateSubject.asObservable();
  private enemyListStateSubject = new BehaviorSubject<EnemyListState>({ list: [] });
  enemyListStateObservable = this.enemyListStateSubject.asObservable();

  private eventOnEncountEnemySubject = new Subject<EventEncountEnemyType>();
  eventOnEncountEnemyObservable = this.eventOnEncountEnemySubject.asObservable();

  private gameUseCase = useGameUseCase();

  async loadMap() {
    /*
    const textJson = await loadFile();
    const json = JSON.parse(textJson);
    const next = validateMapStateType(json);
    */
    const next = mapSample;
    this.currentMapState.next(next);

    this.enemyListStateSubject.next(enemyListSample);
  }

  updatePlayer(delta: number) {
    const keyBoard = this.gameUseCase.getKeyBoard();

    // 移動中
    if (playerIsMoving(this.playerStateSubject.value)) {
      const next = updatePlayerMoveState(this.playerStateSubject.value, delta);
      this.playerStateSubject.next(next);

      if (next.moveState.state == "stop") {
        const enemyList = this.enemyListStateSubject.value.list;
        const playerPosition = this.playerStateSubject.value.position;
        const encountedEnemy = enemyList.find(
          (enemyPosition) => enemyPosition.x == playerPosition.x && enemyPosition.y == playerPosition.y,
        );
        if (encountedEnemy != null) {
          this.eventOnEncountEnemySubject.next({});
          this.gameUseCase.setScene(BattleScene.name);
        }
      }

      return;
    }

    if (keyBoard.w) {
      if (canMoveForward(this.playerStateSubject.value.position, this.currentMapState.value))
        this.playerStateSubject.next(startMoveForwardPlayer(this.playerStateSubject.value));
      return;
    }

    if (keyBoard.a) {
      this.playerStateSubject.next(startTurnPlayer(this.playerStateSubject.value, "left"));
      return;
    }

    if (keyBoard.d) {
      this.playerStateSubject.next(startTurnPlayer(this.playerStateSubject.value, "right"));
      return;
    }
  }
}