import { BehaviorSubject } from "rxjs";
import { type EnemyListState } from "./types/enemy-list-state";
import { type FriendListState } from "./types/friend-list-state";
import { type PhaseState } from "./types/phase-state";
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
