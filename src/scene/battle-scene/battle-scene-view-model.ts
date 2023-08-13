import {
  map,
  pairwise,
  type Observable,
  Subscription,
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
import { type PhaseType } from "./types/phase-state";

export class BattleSceneViewModel {
  constructor(private readonly gameRootViewModel: GameRootViewModel) {}

  private readonly battleSceneSubject = new BattleSceneSubject();
  battleSceneObservable = this.battleSceneSubject.asObservable();

  load(): void {
    this.battleSceneSubject.next(
      produce(this.battleSceneSubject.value, (draft) => {
        draft.friendListState = friendListSample;
        draft.enemyListState = enemyListSample;
        draft.phaseState = { phase: "reserveActions", characterIndex: 0, selectedCommandIndex: 0 };
      }),
    );
  }

  subscribeUpdate(updateObservable: Observable<UpdateEventType>): Subscription {
    const subscription = new Subscription();

    // PhaseStateでフィルタ
    const filterPhase = (phase: PhaseType): MonoTypeOperatorFunction<unknown> =>
      filter((_) => this.battleSceneSubject.value.phaseState.phase === phase);

    // 入力でフィルタ 1フレーム目または30フレーム目以降かつ4フレームに一度にフィルタする
    const filterInput = (input: GameInputType): UnaryFunction<Observable<unknown>, Observable<null>> =>
      pipe(
        map((_) => this.gameRootViewModel.getInput()),
        pairwise(),
        filter(([previous, current], index) => {
          const isFirstFrame = previous[input] === 0 && current[input] > 0;
          const isLongPressFrame = current[input] > 30 && index % 4 === 0;
          return isFirstFrame || isLongPressFrame;
        }),
        map((_) => null),
      );

    // 下入力1フレーム目 or 30フレーム目以降かつ4フレームに一度
    updateObservable
      .pipe(filterPhase("reserveActions"), filterInput("down"))
      .subscribe((_) => this.battleSceneSubject.applyInputFriendListStateIfPossible("down"))
      .addTo(subscription);

    // 上入力1フレーム目 or 30フレーム目以降かつ4フレームに一度
    updateObservable
      .pipe(filterPhase("reserveActions"), filterInput("up"))
      .subscribe((_) => this.battleSceneSubject.applyInputFriendListStateIfPossible("up"))
      .addTo(subscription);

    // 決定入力
    updateObservable
      .pipe(filterPhase("reserveActions"), filterInput("buttonA"))
      .subscribe((_) => this.battleSceneSubject.applyReserveActionsDecide())
      .addTo(subscription);

    return subscription;
  }
}
