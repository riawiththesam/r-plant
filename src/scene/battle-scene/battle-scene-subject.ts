import { BehaviorSubject } from "rxjs";
import { produce, castDraft } from "immer";
import { type CommandDetail } from "./types/battle-phase-state/command-detail/command-detail";
import {
  createReserveActionsState,
  updateReserveActionsState,
} from "./types/battle-phase-state/reserve-actions-state/reserve-actions-state";
import { createSelectTargetState } from "./types/battle-phase-state/select-target-state/select-target-state";
import { createPreExecuteActionsState } from "./types/battle-phase-state/pre-execute-actions-state/pre-execute-actions-state";
import {
  createInitialExecuteActionsState,
  executeActionsStateCreateNextPhase,
  updateExecuteActionsState,
} from "./types/battle-phase-state/execute-actions-state/execute-actions-state";
import { personalStateApplyCommandEffectList } from "./types/battle-phase-state/command-effect/command-effect";
import { type BattleSceneState, defaultBattleSceneState } from "./types/battle-scene-state/battle-scene-state";

export class BattleSceneSubject extends BehaviorSubject<BattleSceneState> {
  constructor() {
    super(defaultBattleSceneState);
  }

  applyInputFriendListStateIfPossible(input: "down" | "up"): void {
    // 行動選択中
    const phaseState = this.value.phaseState;
    if (phaseState.type !== "reserveActions") return;

    this.next(
      produce(this.value, (draft) => {
        const nextState = updateReserveActionsState(phaseState, draft, input);
        draft.phaseState = nextState != null ? nextState : draft.phaseState;
      }),
    );
  }

  applyReserveActionsDecide(): void {
    const phase = this.value.phaseState;
    if (phase.type !== "reserveActions") return undefined;
    const nextPhase = createSelectTargetState({
      type: "selectTarget",
      characterIndex: phase.characterIndex,
      selectedCommandIndex: phase.selectedCommandIndex,
      selectedEnemyTargetIndexes: [0],
      reservedCommandList: [...phase.reservedCommandList],
    });
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = nextPhase;
      }),
    );
  }

  applyDecideSelectTarget(): void {
    // selectTarget以外のフェーズ、対象のキャラクターがいない、コマンドが選択できていない場合は何もしない
    const phase = this.value.phaseState;
    if (phase.type !== "selectTarget") return;
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
            : createReserveActionsState({
                characterIndex: phase.characterIndex + 1,
                reservedCommandList: reservedCommand,
              });
        draft.phaseState = nextPhase;
      }),
    );
  }

  resolvePreExecuteActions(): void {
    const phase = this.value.phaseState;
    if (phase.type !== "preExecuteActions") return;

    // お互いのすべての行動を設定
    const nextValue = produce(this.value, (draft) => {
      const nextPhase = createInitialExecuteActionsState(draft, phase);
      if (nextPhase == null) return;
      draft.phaseState = castDraft(nextPhase);
    });
    this.next(nextValue);
  }

  updateExecuteActions(delta: number): void {
    const phase = this.value.phaseState;
    if (phase.type !== "executeActions") return;

    if (phase.commandEffectCurrentFrame < phase.commandAutoProgressionDuration) {
      this.next(
        produce(this.value, (draft) => {
          draft.phaseState = castDraft(updateExecuteActionsState(phase, delta));
        }),
      );
      return;
    }
    const nextCharacterState = personalStateApplyCommandEffectList(
      this.value.friendListState,
      this.value.enemyListState,
      phase.commandResult,
    );
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = castDraft(executeActionsStateCreateNextPhase(phase, this.value));
        draft.enemyListState = castDraft(nextCharacterState.enemy);
        draft.friendListState = castDraft(nextCharacterState.friend);
      }),
    );
  }
}
