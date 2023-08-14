import { type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";

export type SelectTargetState = BasePhaseState & {
  type: "selectTarget";
  characterIndex: number;
  selectedCommandIndex: number;
  selectedEnemyTargetIndexes: Array<number>;
  reservedCommandList: Array<CommandDetail>;
};

export function createSelectTargetState(value?: Partial<SelectTargetState>): SelectTargetState {
  return {
    type: "selectTarget",
    characterIndex: value?.characterIndex ?? 0,
    selectedCommandIndex: value?.selectedCommandIndex ?? 0,
    selectedEnemyTargetIndexes: value?.selectedEnemyTargetIndexes ?? [],
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}
