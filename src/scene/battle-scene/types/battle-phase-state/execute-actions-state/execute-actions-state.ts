import { castDraft, produce } from "immer";
import { type PhaseState, type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { createReserveActionsState } from "../reserve-actions-state/reserve-actions-state";
import { type BattleSceneState } from "../../../battle-scene-subject";
import { createCommandEffectList, type CommandEffect } from "../command-effect/command-effect";
import { createBattleLog, type BattleLog } from "../battle-log/battle-log";
import { type PreExecuteActionsState } from "../pre-execute-actions-state/pre-execute-actions-state";

export type ExecuteActionsState = BasePhaseState & {
  type: "executeActions";
  allCharacterCommandList: ReadonlyArray<CommandDetail>;
  executingIndex: number;
  commandEffectCurrentFrame: number;
  commandAutoProgressionDuration: number;
  commandResult: ReadonlyArray<CommandEffect>;
  battleLog: BattleLog;
};

export function createInitialExecuteActionsState(
  currentState: BattleSceneState,
  phase: PreExecuteActionsState,
): ExecuteActionsState | undefined {
  const enemyCommandList: Array<CommandDetail> = currentState.enemyListState.list.map((_, index) => {
    return {
      actorType: "enemy",
      actorIndex: index,
      commandType: "attack",
      targetList: [0],
    };
  });

  const allCharacterCommandList = phase.reservedCommandList.concat(enemyCommandList);

  const command = allCharacterCommandList[0];
  if (command == null) return;

  const commandEffectList = createCommandEffectList(currentState, command);
  const log = createBattleLog(currentState, command.actorType, commandEffectList);

  return {
    type: "executeActions",
    allCharacterCommandList,
    executingIndex: 0,
    commandEffectCurrentFrame: 0,
    commandAutoProgressionDuration: currentState.settingState.commandAutoProgressionDuration,
    commandResult: commandEffectList,
    battleLog: log,
  };
}

export function executeActionsStateCreateNextPhase(current: ExecuteActionsState, state: BattleSceneState): PhaseState {
  // エフェクト表示終了
  if (current.executingIndex + 1 !== current.allCharacterCommandList.length) {
    // 次のコマンド実行
    return produce(current, (draft) => {
      const nextExecutingIndex = draft.executingIndex + 1;
      const nextCommand = draft.allCharacterCommandList[nextExecutingIndex];
      const effectList = createCommandEffectList(state, nextCommand);
      const logList = createBattleLog(state, nextCommand?.actorType ?? "friend", effectList);
      draft.commandEffectCurrentFrame = 0;
      draft.commandAutoProgressionDuration = state.settingState.commandAutoProgressionDuration;
      draft.executingIndex = nextExecutingIndex;
      draft.commandResult = castDraft(effectList);
      draft.battleLog = castDraft(logList);
    });
  } else {
    // 全員のコマンド実行終了
    return createReserveActionsState();
  }
}

export function updateExecuteActionsState(current: ExecuteActionsState, delta: number): ExecuteActionsState {
  return produce(current, (draft) => {
    draft.commandEffectCurrentFrame = draft.commandEffectCurrentFrame + delta;
  });
}
