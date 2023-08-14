import { type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";

export type ReserveActionsState = BasePhaseState & {
  type: "reserveActions";
  characterIndex: number;
  selectedCommandIndex: number;
  reservedCommandList: Array<CommandDetail>;
};

export function createReserveActionsState(value?: Partial<ReserveActionsState>): ReserveActionsState {
  return {
    type: "reserveActions",
    characterIndex: value?.characterIndex ?? 0,
    selectedCommandIndex: value?.selectedCommandIndex ?? 0,
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}
