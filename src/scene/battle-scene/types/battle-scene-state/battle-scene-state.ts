import { type EnemyListState } from "../battle-character-state/enemy-list-state";
import { type FriendListState } from "../battle-character-state/friend-list-state";
import { type PhaseState } from "../battle-phase-state/battle-phase-state";
import { createPreparePhaseState } from "../battle-phase-state/prepare-phase-state/prepare-phase-state";
import { type BattleSettingState } from "../battle-setting-state/battle-setting-state";

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
