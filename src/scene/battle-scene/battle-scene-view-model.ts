import { BehaviorSubject, type Observable, type Subscription } from "rxjs";
import { type EnemyListState } from "./types/enemy-list-state";
import { type FriendListState } from "./types/friend-list-state";
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

  subscribeUpdate(observable: Observable<UpdateEventType>): Subscription {
    return observable.subscribe((_) => {
      const keyboard = this.gameRootViewModel.getKeyBoard();
      const one = this.friendListSubject.value.one;
      if (one == null) return;

      if (keyboard.w) {
        console.log("w");
      }
      if (keyboard.s) {
        console.log("s");
      }
    });
  }
}
