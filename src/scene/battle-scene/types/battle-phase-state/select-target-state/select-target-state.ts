import { type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";

export type SelectTargetState = BasePhaseState & {
  type: "selectTarget";
  characterIndex: number;
  selectedCommandIndex: number;
  selectedEnemyTargetIndexes: ReadonlyArray<number>;
  reservedCommandList: ReadonlyArray<CommandDetail>;
};
