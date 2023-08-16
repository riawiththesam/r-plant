import { produce, castDraft } from "immer";
import { type EnemyListState } from "../battle-character-state/enemy-list-state";
import { type FriendListState } from "../battle-character-state/friend-list-state";
import { type PhaseState } from "../battle-phase-state/battle-phase-state";
import { createPreparePhaseState } from "../battle-phase-state/prepare-phase-state/prepare-phase-state";
import { type BattleSettingState } from "../battle-setting-state/battle-setting-state";
import {
  type ExecuteActionsState,
  executeActionsStateCreateNextPhase,
} from "../battle-phase-state/execute-actions-state/execute-actions-state";

export type BattleSceneState = {
  phaseState: PhaseState;
  friendListState: FriendListState;
  enemyListState: EnemyListState;
  settingState: BattleSettingState;
};

export const defaultBattleSceneState: BattleSceneState = {
  phaseState: createPreparePhaseState(),
  friendListState: { list: [] },
  enemyListState: { list: [] },
  settingState: {
    commandAutoProgressionDuration: 30,
  },
};

export function applyCommandEffectListOfToBattleSceneState(
  state: BattleSceneState,
  phase: ExecuteActionsState,
): BattleSceneState {
  const list = phase.commandResult;
  const effectOnFriend = list.filter((effect) => effect.target === "friend");
  const effectOnEnemy = list.filter((effect) => effect.target === "enemy");

  const friendResult = produce(state.friendListState, (draft) => {
    effectOnFriend.forEach((effect) => {
      const target = draft.list[effect.targetIndex];
      if (target == null) return;
      target.parsonal.currentHitPoint = target.parsonal.currentHitPoint - effect.value;
    });
  });
  const enemyResult = produce(state.enemyListState, (draft) => {
    effectOnEnemy.forEach((effect) => {
      const target = draft.list[effect.targetIndex];
      if (target == null) return;
      target.personal.currentHitPoint = target.personal.currentHitPoint - effect.value;
    });
  });

  const nextPhase = castDraft(executeActionsStateCreateNextPhase(phase, state));

  const nextState = produce(state, (draft) => {
    draft.friendListState = castDraft(friendResult);
    draft.enemyListState = castDraft(enemyResult);
    draft.phaseState = nextPhase;
  });

  return nextState;
}
