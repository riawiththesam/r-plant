import { produce } from "immer";
import { type PhaseState, type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { createReserveActionsState } from "../reserve-actions-state/reserve-actions-state";

export type ExecuteActionsState = BasePhaseState & {
  type: "executeActions";
  allCharacterCommandList: Array<CommandDetail>;
  executingIndex: number;
  commandEffectCurrentFrame: number;
  commandAutoProgressionDuration: number;
};

export function createExecuteActionsState(value?: Partial<ExecuteActionsState>): ExecuteActionsState {
  return {
    type: "executeActions",
    allCharacterCommandList: value?.allCharacterCommandList ?? [],
    executingIndex: value?.executingIndex ?? 0,
    commandEffectCurrentFrame: value?.commandEffectCurrentFrame ?? 0,
    commandAutoProgressionDuration: value?.commandAutoProgressionDuration ?? 15,
  };
}

export function executeActionsStateCreateNextPhase(current: ExecuteActionsState, delta: number): PhaseState {
  if (current.commandEffectCurrentFrame >= current.commandAutoProgressionDuration) {
    // エフェクト表示終了
    if (current.executingIndex + 1 === current.allCharacterCommandList.length) {
      // 全員のコマンド実行終了
      return createReserveActionsState();
    } else {
      // 次のコマンド実行
      return produce(current, (draft) => {
        draft.commandEffectCurrentFrame = 0;
        draft.commandAutoProgressionDuration = 15;
        draft.executingIndex = draft.executingIndex + 1;
      });
    }
  }
  return produce(current, (draft) => {
    draft.commandEffectCurrentFrame = draft.commandEffectCurrentFrame + delta;
  });
}
