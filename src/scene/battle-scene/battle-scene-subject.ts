import { BehaviorSubject } from "rxjs";
import { produce, castDraft } from "immer";
import {
  createInitialSelectTargetState,
  updateReserveActionsState,
} from "./types/battle-phase-state/reserve-actions-state/reserve-actions-state";
import {
  createInitialExecuteActionsState,
  executeActionsStateCreateNextPhase,
  updateExecuteActionsState,
} from "./types/battle-phase-state/execute-actions-state/execute-actions-state";
import { personalStateApplyCommandEffectList } from "./types/battle-phase-state/command-effect/command-effect";
import { type BattleSceneState, defaultBattleSceneState } from "./types/battle-scene-state/battle-scene-state";
import { createNextStateOfSelectTarget } from "./types/battle-phase-state/select-target-state/select-target-state";

export class BattleSceneSubject extends BehaviorSubject<BattleSceneState> {
  constructor() {
    super(defaultBattleSceneState);
  }

  applyInputFriendListStateIfPossible(input: "down" | "up"): void {
    // 行動選択中
    const phaseState = this.value.phaseState;
    if (phaseState.type !== "reserveActions") return;
    const nextState = updateReserveActionsState(phaseState, this.value, input);
    if (nextState == null) return;

    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = castDraft(nextState);
      }),
    );
  }

  applyReserveActionsDecide(): void {
    const phase = this.value.phaseState;
    if (phase.type !== "reserveActions") return undefined;
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = castDraft(createInitialSelectTargetState(phase));
      }),
    );
  }

  applyDecideSelectTarget(): void {
    // selectTarget以外のフェーズ、対象のキャラクターがいない、コマンドが選択できていない場合は何もしない
    const phase = this.value.phaseState;
    if (phase.type !== "selectTarget") return;

    const nextPhase = createNextStateOfSelectTarget(phase, this.value);
    if (nextPhase == null) return;

    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = castDraft(nextPhase);
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
