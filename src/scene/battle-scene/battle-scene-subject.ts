import { BehaviorSubject } from "rxjs";
import { type EnemyListState } from "./types/enemy-list-state";
import { type FriendListState } from "./types/friend-list-state";
import {
  type SelectTargetState,
  type PhaseState,
  createPreExecuteActionsState,
  createReserveActinsState,
  type CommandDetail,
} from "./types/phase-state";
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

    const nextPhase = produce(phaseState, (draft) => {
      const indexDiff = input === "down" ? 1 : -1 + friendState.command.commandList.length;
      const nextIndex = (draft.selectedCommandIndex + indexDiff) % friendState.command.commandList.length;
      draft.selectedCommandIndex = nextIndex;
    });

    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = nextPhase;
      }),
    );
  }

  applyReserveActionsDecide(): void {
    const phase = this.value.phaseState;
    if (phase.phase !== "reserveActions") return undefined;
    const nextPhase: SelectTargetState = {
      phase: "selectTarget",
      characterIndex: phase.characterIndex,
      selectedCommandIndex: phase.selectedCommandIndex,
      selectedEnemyTargetIndexes: [0],
      reservedCommandList: [...phase.reservedCommandList],
    };
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = nextPhase;
      }),
    );
  }

  applyDecideSelectTarget(): void {
    // selectTarget以外のフェーズ、対象のキャラクターがいない、コマンドが選択できていない場合は何もしない
    const phase = this.value.phaseState;
    if (phase.phase !== "selectTarget") return;
    const friend = this.value.friendListState.list[phase.characterIndex];
    if (friend === null) return;
    const [commandType] = friend?.command.commandList[phase.selectedCommandIndex] ?? [];
    if (commandType == null) return;
    const targetList = [...phase.selectedEnemyTargetIndexes];

    // コマンドを保存
    const command: CommandDetail = { actorType: "friend", actorIndex: phase.characterIndex, commandType, targetList };
    const reservedCommand = [...phase.reservedCommandList, command];

    // 次のPhaseに変更 パーティ全員分の行動を予約したらPreExecuteActions、まだであれば次のキャラクターの行動予約
    this.next(
      produce(this.value, (draft) => {
        const nextPhase =
          reservedCommand.length === draft.friendListState.list.length
            ? createPreExecuteActionsState({
                reservedCommandList: reservedCommand,
              })
            : createReserveActinsState({
                characterIndex: phase.characterIndex + 1,
                reservedCommandList: reservedCommand,
              });
        draft.phaseState = nextPhase;
      }),
    );
  }
}
