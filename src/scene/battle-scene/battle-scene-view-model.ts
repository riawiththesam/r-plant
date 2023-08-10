import { BehaviorSubject } from "rxjs";
import { type EnemyListState } from "./types/enemy-list-state";
import { type FriendListState } from "./types/friend-list-state";
import { enemyListSample, friendListSample } from "./state-sample";
import { type PhaseState } from "./types/phase-state";

export class BattleSceneViewModel {
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
}
