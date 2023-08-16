import { type BasePhaseState } from "../battle-phase-state";
import { type CommandDetail } from "../command-detail/command-detail";

export type PreExecuteActionsState = BasePhaseState & {
  type: "preExecuteActions";
  reservedCommandList: ReadonlyArray<CommandDetail>;
};

export function createPreExecuteActionsState(value?: Partial<PreExecuteActionsState>): PreExecuteActionsState {
  return {
    type: "preExecuteActions",
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}
