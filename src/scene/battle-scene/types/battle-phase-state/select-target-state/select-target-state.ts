import { type BattleSceneState } from "../../battle-scene-state/battle-scene-state";
import { type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";
import {
  type PreExecuteActionsState,
  createPreExecuteActionsState,
} from "../pre-execute-actions-state/pre-execute-actions-state";
import { type ReserveActionsState, createReserveActionsState } from "../reserve-actions-state/reserve-actions-state";

export type SelectTargetState = BasePhaseState & {
  type: "selectTarget";
  characterIndex: number;
  selectedCommandIndex: number;
  selectedEnemyTargetIndexes: ReadonlyArray<number>;
  reservedCommandList: ReadonlyArray<CommandDetail>;
};

export function createNextStateOfSelectTarget(
  current: SelectTargetState,
  state: BattleSceneState,
): ReserveActionsState | PreExecuteActionsState | undefined {
  const friend = state.friendListState.list[current.characterIndex];
  if (friend === null) return;
  const [commandType] = friend?.command.commandList[current.selectedCommandIndex] ?? [];
  if (commandType == null) return;
  const targetList = [...current.selectedEnemyTargetIndexes];
  // コマンドを保存
  const command: CommandDetail = { actorType: "friend", actorIndex: current.characterIndex, commandType, targetList };
  const reservedCommandList = [...current.reservedCommandList, command];

  // 次のPhase パーティ全員分の行動を予約したらPreExecuteActions、まだであれば次のキャラクターの行動予約
  const nextPhase =
    reservedCommandList.length === state.friendListState.list.length
      ? createNextPreExecuteActionsState(reservedCommandList)
      : createNextReserveActionsState(current, reservedCommandList);
  return nextPhase;
}

function createNextPreExecuteActionsState(reservedCommandList: ReadonlyArray<CommandDetail>): PreExecuteActionsState {
  return createPreExecuteActionsState({ reservedCommandList });
}

function createNextReserveActionsState(
  current: SelectTargetState,
  reservedCommandList: ReadonlyArray<CommandDetail>,
): ReserveActionsState {
  return createReserveActionsState({
    characterIndex: current.characterIndex + 1,
    reservedCommandList,
  });
}
