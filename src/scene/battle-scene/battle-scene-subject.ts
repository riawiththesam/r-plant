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
  friendListState: { list: [] },
  enemyListState: { list: [] },
};

export class BattleSceneSubject extends BehaviorSubject<BattleSceneState> {
  constructor() {
    super(defaultBattleSceneState);
  }

  applyInputFriendListStateIfPossible(input: "down" | "up"): void {
    // 行動選択中
    const phaseState = this.value.phaseState;
    if (phaseState.phase !== "reserveActions") return;

    const friendState = this.value.friendListState.list[phaseState.characterIndex];
    if (friendState == null) return;
    const nextOne = produce(friendState, (draft) => {
      const indexDiff = input === "down" ? 1 : -1 + draft.command.commandList.length;
      const nextIndex = (draft.command.selectedCommandIndex + indexDiff) % draft.command.commandList.length;
      draft.command.selectedCommandIndex = nextIndex;
    });
    const next = produce(this.value, (draft) => {
      draft.friendListState.list[phaseState.characterIndex] = nextOne;
    });
    this.next(next);
  }

  applyInputDecide(): void {
    this.next(
      produce(this.value, (draft) => {
        // 行動選択中
        const phaseTarget = draft.phaseState;
        if (phaseTarget.phase !== "reserveActions") return;

        const friendTarget = draft.friendListState.list[phaseTarget.characterIndex];
        if (friendTarget == null) return;

        // 対象のキャラクターの行動を設定
        const index = friendTarget.command.selectedCommandIndex;
        const [commandType] = friendTarget.command.commandList[index] ?? [];
        if (friendTarget == null || commandType == null) return;

        friendTarget.reservedCommand.command = commandType;

        // 行動選択対象を次に移す
        phaseTarget.characterIndex = phaseTarget.characterIndex + 1;

        // すべてのキャラクターの行動が決まった場合
        if (phaseTarget.characterIndex === draft.friendListState.list.length) {
          draft.phaseState = {
            phase: "executeActions",
          };
        }
      }),
    );
  }
}
