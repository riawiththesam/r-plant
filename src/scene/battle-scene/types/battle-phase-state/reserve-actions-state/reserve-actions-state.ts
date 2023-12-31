import { produce } from "immer";
import { type BattleSceneState } from "../../battle-scene-state/battle-scene-state";
import { type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { type SelectTargetState } from "../select-target-state/select-target-state";

export type ReserveActionsState = BasePhaseState & {
  type: "reserveActions";
  characterIndex: number;
  selectedCommandIndex: number;
  reservedCommandList: ReadonlyArray<CommandDetail>;
};

export function createReserveActionsState(value?: Partial<ReserveActionsState>): ReserveActionsState {
  return {
    type: "reserveActions",
    characterIndex: value?.characterIndex ?? 0,
    selectedCommandIndex: value?.selectedCommandIndex ?? 0,
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}

export function updateReserveActionsState(
  current: ReserveActionsState,
  state: BattleSceneState,
  input: "down" | "up",
): ReserveActionsState | undefined {
  const friendState = state.friendListState.list[current.characterIndex];
  if (friendState == null) return;

  const nextPhase = produce(current, (draft) => {
    const indexDiff = input === "down" ? 1 : -1 + friendState.command.commandList.length;
    const nextIndex = (draft.selectedCommandIndex + indexDiff) % friendState.command.commandList.length;
    draft.selectedCommandIndex = nextIndex;
  });

  return nextPhase;
}

export function createInitialSelectTargetState(current: ReserveActionsState): SelectTargetState {
  return {
    type: "selectTarget",
    characterIndex: current.characterIndex,
    selectedCommandIndex: current.selectedCommandIndex,
    // TODO コマンドの種類に合わせて、列選択や、選択可能ターゲットなしなど
    selectedEnemyTargetIndexes: [0],
    reservedCommandList: current.reservedCommandList,
  };
}
