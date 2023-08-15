import { castDraft, produce } from "immer";
import { type PhaseState, type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { createReserveActionsState } from "../reserve-actions-state/reserve-actions-state";
import { type BattleSceneState } from "../../../battle-scene-subject";
import { createCommandEffectList, type CommandEffect } from "../command-effect/command-effect";

export type ExecuteActionsState = BasePhaseState & {
  type: "executeActions";
  allCharacterCommandList: ReadonlyArray<CommandDetail>;
  executingIndex: number;
  commandEffectCurrentFrame: number;
  commandAutoProgressionDuration: number;
  commandResult: ReadonlyArray<CommandEffect>;
  battleLogList: ReadonlyArray<string>;
};

export function createExecuteActionsState(value?: Partial<ExecuteActionsState>): ExecuteActionsState {
  return {
    type: "executeActions",
    allCharacterCommandList: value?.allCharacterCommandList ?? [],
    executingIndex: value?.executingIndex ?? 0,
    commandEffectCurrentFrame: value?.commandEffectCurrentFrame ?? 0,
    commandAutoProgressionDuration: value?.commandAutoProgressionDuration ?? 15,
    commandResult: value?.commandResult ?? [],
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
        const effectList = createCommandEffectList(state, nextCommand);
        const logList = castDraft(createBattleLog(state, effectList));
        draft.commandEffectCurrentFrame = 0;
        draft.commandAutoProgressionDuration = 15;
        draft.executingIndex = nextExecutingIndex;
        draft.battleLogList = logList;
      });
    }
  }
  return produce(current, (draft) => {
    draft.commandEffectCurrentFrame = draft.commandEffectCurrentFrame + delta;
  });
}

export function createBattleLog(
  state: BattleSceneState,
  commandEffectList: ReadonlyArray<CommandEffect>,
): ReadonlyArray<string> {
  return commandEffectList
    .map((effect) => {
      // TODO weapon
      const weaponName = "素手";
      const numberOfAttacks = `${effect.numberOfAttacks}回攻撃`;
      const numberOfHits = `${effect.numberOfHits}回ヒット`;
      const numberOfDamage = `${effect.value}のダメージ`;
      const actorName = getActorName(state, effect);
      return [actorName, weaponName, numberOfAttacks, numberOfHits, numberOfDamage];
    })
    .flat();
}

export function getActorName(state: BattleSceneState, commandEffect: CommandEffect): string {
  if (commandEffect.target === "enemy") {
    const actor = state.enemyListState.list[commandEffect.targetIndex];
    return actor?.personal.name ?? "???";
  } else {
    const actor = state.friendListState.list[commandEffect.targetIndex];
    return actor?.parsonal.name ?? "???";
  }
}
