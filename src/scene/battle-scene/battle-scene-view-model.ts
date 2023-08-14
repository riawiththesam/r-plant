import {
  map,
  pairwise,
  type Observable,
  type Subscription,
  filter,
  type MonoTypeOperatorFunction,
  pipe,
  type UnaryFunction,
} from "rxjs";
import { enemyListSample, friendListSample } from "./state-sample";
import { type UpdateEventType } from "../../util/pixi/scene/scene";
import { type GameRootViewModel } from "../../components/game-root/game-root-view-model";
import { produce } from "immer";
import { BattleSceneSubject } from "./battle-scene-subject";
import { type GameInputType } from "./types/input-state";
import { type PhaseType } from "./types/phase-state/phase-state";
import { letSubscription } from "../../util/rxjs/subscription/subscriptions";

export class BattleSceneViewModel {
  constructor(private readonly gameRootViewModel: GameRootViewModel) {}

  private readonly battleSceneSubject = new BattleSceneSubject();
  battleSceneObservable = this.battleSceneSubject.asObservable();

  load(): void {
    this.battleSceneSubject.next(
      produce(this.battleSceneSubject.value, (draft) => {
        draft.friendListState = friendListSample;
        draft.enemyListState = enemyListSample;
        draft.phaseState = {
          type: "reserveActions",
          characterIndex: 0,
          selectedCommandIndex: 0,
          reservedCommandList: [],
        };
      }),
    );
  }

  subscribeUpdate(updateObservable: Observable<UpdateEventType>): Subscription {
    return letSubscription((subscription) => {
      // PhaseStateでフィルタ
      const filterPhase = (phase: PhaseType): MonoTypeOperatorFunction<unknown> =>
        filter((_) => this.battleSceneSubject.value.phaseState.type === phase);

      // 入力でフィルタ 1フレーム目または30フレーム目以降かつ4フレームに一度にフィルタする
      const filterInput = (
        input: GameInputType,
        press: boolean,
      ): UnaryFunction<Observable<unknown>, Observable<null>> =>
        pipe(
          map((_) => this.gameRootViewModel.getInput()),
          pairwise(),
          filter(([previous, current], index) => {
            const isFirstFrame = previous[input] === 0 && current[input] > 0;
            const isLongPressFrame = current[input] > 30 && index % 4 === 0;
            return isFirstFrame || (isLongPressFrame && press);
          }),
          map((_) => null),
        );

      // 行動実行前の状態になったら行動情報を整理する
      updateObservable
        .pipe(filterPhase("preExecuteActions"))
        .subscribe((_) => this.battleSceneSubject.resolvePreExecuteActions())
        .addTo(subscription);

      // 戦闘実行
      updateObservable
        .pipe(filter((_) => this.battleSceneSubject.value.phaseState.type === "executeActions"))
        .subscribe((event) => this.battleSceneSubject.updateExecuteActions(event.delta))
        .addTo(subscription);

      // 下入力1フレーム目 or 30フレーム目以降かつ4フレームに一度
      updateObservable
        .pipe(filterPhase("reserveActions"), filterInput("down", true))
        .subscribe((_) => this.battleSceneSubject.applyInputFriendListStateIfPossible("down"))
        .addTo(subscription);

      // 上入力1フレーム目 or 30フレーム目以降かつ4フレームに一度
      updateObservable
        .pipe(filterPhase("reserveActions"), filterInput("up", true))
        .subscribe((_) => this.battleSceneSubject.applyInputFriendListStateIfPossible("up"))
        .addTo(subscription);

      // 決定入力
      updateObservable
        .pipe(filterPhase("reserveActions"), filterInput("buttonA", false))
        .subscribe((_) => this.battleSceneSubject.applyReserveActionsDecide())
        .addTo(subscription);

      // 対象決定
      updateObservable
        .pipe(filterPhase("selectTarget"), filterInput("buttonA", false))
        .subscribe((_) => this.battleSceneSubject.applyDecideSelectTarget())
        .addTo(subscription);
    });
  }
}
