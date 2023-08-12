import { BehaviorSubject, map, pairwise, type Observable, Subscription, filter } from "rxjs";
import { type EnemyListState } from "./types/enemy-list-state";
import { type FriendListState } from "./types/friend-list-state";
import { enemyListSample, friendListSample } from "./state-sample";
import { type PhaseState } from "./types/phase-state";
import { type UpdateEventType } from "../../util/pixi/scene/scene";
import { type GameRootViewModel } from "../../components/game-root/game-root-view-model";
import { produce } from "immer";

export type BattleSceneState = {
  phaseState: PhaseState;
  friendListState: FriendListState;
  enemyListState: EnemyListState;
};

const defaultBattleSceneState: BattleSceneState = {
  phaseState: { phase: "prepare" },
  friendListState: {},
  enemyListState: { list: [] },
};

export class BattleSceneSubject extends BehaviorSubject<BattleSceneState> {
  constructor() {
    super(defaultBattleSceneState);
  }

  applyInputFriendListStateIfPossible(input: "down" | "up"): void {
    const one = this.value.friendListState.one;
    if (one == null) return;
    const nextOne = produce(one, (draft) => {
      const indexDiff = input === "down" ? 1 : -1 + draft.command.commandList.length;
      const nextIndex = (draft.command.selectedCommandIndex + indexDiff) % draft.command.commandList.length;
      draft.command.selectedCommandIndex = nextIndex;
    });
    const next = produce(this.value, (draft) => {
      draft.friendListState.one = nextOne;
    });
    this.next(next);
  }

  applyInputDecide(): void {
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState.phase = "executeActions";
      }),
    );
  }
}

export class BattleSceneViewModel {
  constructor(private readonly gameRootViewModel: GameRootViewModel) {}

  private readonly battleSceneSubject = new BattleSceneSubject();
  battleSceneObservable = this.battleSceneSubject.asObservable();

  load(): void {
    this.battleSceneSubject.next(
      produce(this.battleSceneSubject.value, (draft) => {
        draft.friendListState = friendListSample;
        draft.enemyListState = enemyListSample;
        draft.phaseState = { phase: "reserveActions", characterIndex: 0 };
      }),
    );
  }

  subscribeUpdate(updateObservable: Observable<UpdateEventType>): Subscription {
    const subscription = new Subscription();

    // 下入力1フレーム目
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([previous, current]) => previous.down === 0 && current.down > 0))
      .subscribe((_) => {
        this.battleSceneSubject.applyInputFriendListStateIfPossible("down");
      })
      .addTo(subscription);

    // 下入力30フレーム目以降かつ4フレームに一度
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([_, current], index) => current.down > 30 && index % 4 === 0))
      .subscribe((_) => {
        this.battleSceneSubject.applyInputFriendListStateIfPossible("down");
      })
      .addTo(subscription);

    // 上入力1フレーム目
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([previous, current]) => previous.up === 0 && current.up > 0))
      .subscribe((_) => {
        this.battleSceneSubject.applyInputFriendListStateIfPossible("up");
      })
      .addTo(subscription);

    // 上入力30フレーム目以降かつ4フレームに一度
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([_, current], index) => current.up > 30 && index % 4 === 0))
      .subscribe((_) => {
        this.battleSceneSubject.applyInputFriendListStateIfPossible("up");
      })
      .addTo(subscription);

    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([previous, current]) => previous.buttonA === 0 && current.buttonA > 0))
      .subscribe((_) => {
        this.battleSceneSubject.applyInputDecide();
      })
      .addTo(subscription);

    return subscription;
  }
}
