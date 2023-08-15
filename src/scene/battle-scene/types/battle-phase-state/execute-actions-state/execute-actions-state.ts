import { castDraft, produce } from "immer";
import { type PhaseState, type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { createReserveActionsState } from "../reserve-actions-state/reserve-actions-state";
import { type BattleSceneState } from "../../../battle-scene-subject";

export type ExecuteActionsState = BasePhaseState & {
  type: "executeActions";
  allCharacterCommandList: Array<CommandDetail>;
  executingIndex: number;
  commandEffectCurrentFrame: number;
  commandAutoProgressionDuration: number;
  battleLogList: Array<string>;
};

export function createExecuteActionsState(value?: Partial<ExecuteActionsState>): ExecuteActionsState {
  return {
    type: "executeActions",
    allCharacterCommandList: value?.allCharacterCommandList ?? [],
    executingIndex: value?.executingIndex ?? 0,
    commandEffectCurrentFrame: value?.commandEffectCurrentFrame ?? 0,
    commandAutoProgressionDuration: value?.commandAutoProgressionDuration ?? 15,
    battleLogList: value?.battleLogList ?? [],
  };
}

export function executeActionsStateCreateNextPhase(
  current: ExecuteActionsState,
  state: BattleSceneState,
  delta: number,
): PhaseState {
  if (current.commandEffectCurrentFrame >= current.commandAutoProgressionDuration) {
    // エフェクト表示終了
    if (current.executingIndex + 1 === current.allCharacterCommandList.length) {
      // 全員のコマンド実行終了
      return createReserveActionsState();
    } else {
      // 次のコマンド実行
      return produce(current, (draft) => {
        const nextExecutingIndex = draft.executingIndex + 1;
        const nextCommand = draft.allCharacterCommandList[nextExecutingIndex];
        draft.commandEffectCurrentFrame = 0;
        draft.commandAutoProgressionDuration = 15;
        draft.executingIndex = nextExecutingIndex;
        draft.battleLogList = castDraft(createBattleLog(state, nextCommand));
      });
    }
  }
  return produce(current, (draft) => {
    draft.commandEffectCurrentFrame = draft.commandEffectCurrentFrame + delta;
  });
}

export function createBattleLog(state: BattleSceneState, command?: CommandDetail): ReadonlyArray<string> {
  if (command == null) return [];

  const actorName = getActorName(state, command);
  // TODO weapon
  const weaponName = "素手";
  // TODO ヒット数
  const numberOfHits = "2回ヒット";
  // TODO ダメージ数
  const numberOfDamage = "10のダメージ";

  return [actorName, weaponName, numberOfHits, numberOfDamage];
}

export function getActorName(state: BattleSceneState, command: CommandDetail): string {
  if (command.actorType === "enemy") {
    const actor = state.enemyListState.list[command.actorIndex];
    return actor?.personal.name ?? "???";
  } else {
    const actor = state.friendListState.list[command.actorIndex];
    return actor?.parsonal.name ?? "???";
  }
}
