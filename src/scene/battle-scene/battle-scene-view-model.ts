import { BehaviorSubject, map, pairwise, type Observable, Subscription, filter } from "rxjs";
import { type EnemyListState } from "./types/enemy-list-state";
import { applyInputFriendListStateIfPossible, type FriendListState } from "./types/friend-list-state";
import { enemyListSample, friendListSample } from "./state-sample";
import { type PhaseState } from "./types/phase-state";
import { type UpdateEventType } from "../../util/pixi/scene/scene";
import { type GameRootViewModel } from "../../components/game-root/game-root-view-model";

export class BattleSceneViewModel {
  constructor(private readonly gameRootViewModel: GameRootViewModel) {}

  private readonly phaseStateSubject = new BehaviorSubject<PhaseState>({ phase: "prepare" });
  phaseStateObservable = this.phaseStateSubject.asObservable();

  private readonly friendListSubject = new BehaviorSubject<FriendListState>({});
  friendListObservable = this.friendListSubject.asObservable();

  private readonly enemyListSubject = new BehaviorSubject<EnemyListState>({ list: [] });
  enemyListObservable = this.enemyListSubject.asObservable();

  load(): void {
    this.friendListSubject.next(friendListSample);
    this.enemyListSubject.next(enemyListSample);
    this.phaseStateSubject.next({ phase: "reserveActions" });
  }

  subscribeUpdate(updateObservable: Observable<UpdateEventType>): Subscription {
    const subscription = new Subscription();

    // 下入力1フレーム目
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([previous, current]) => previous.down === 0 && current.down > 0))
      .subscribe((_) => {
        this.friendListSubject.next(applyInputFriendListStateIfPossible(this.friendListSubject.value, "down"));
      })
      .addTo(subscription);

    // 下入力30フレーム目以降かつ4フレームに一度
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([_, current], index) => current.down > 30 && index % 4 === 0))
      .subscribe((_) => {
        this.friendListSubject.next(applyInputFriendListStateIfPossible(this.friendListSubject.value, "down"));
      })
      .addTo(subscription);

    // 上入力1フレーム目
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([previous, current]) => previous.up === 0 && current.up > 0))
      .subscribe((_) => {
        this.friendListSubject.next(applyInputFriendListStateIfPossible(this.friendListSubject.value, "up"));
      })
      .addTo(subscription);

    // 上入力30フレーム目以降かつ4フレームに一度
    updateObservable
      .pipe(map((_) => this.gameRootViewModel.getInput()))
      .pipe(pairwise())
      .pipe(filter(([_, current], index) => current.up > 30 && index % 4 === 0))
      .subscribe((_) => {
        this.friendListSubject.next(applyInputFriendListStateIfPossible(this.friendListSubject.value, "up"));
      })
      .addTo(subscription);

    return subscription;
  }
}
