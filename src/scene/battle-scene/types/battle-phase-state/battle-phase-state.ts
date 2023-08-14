import { type CommandDetail } from "./command-detail/command-detail";
import { type PreparePhaseState } from "./prepare-phase-state/prepare-phase-state";
import { type ReserveActionsState } from "./reserve-actions-state/reserve-actions-state";
import { type SelectTargetState } from "./select-target-state/select-target-state";

export const phaseTypes = ["prepare", "reserveActions", "selectTarget", "preExecuteActions", "executeActions"] as const;
export type PhaseType = (typeof phaseTypes)[number];

export type BasePhaseState = {
  type: PhaseType;
};

export type PreExecuteActionsState = BasePhaseState & {
  type: "preExecuteActions";
  reservedCommandList: Array<CommandDetail>;
};

export function createPreExecuteActionsState(value?: Partial<PreExecuteActionsState>): PreExecuteActionsState {
  return {
    type: "preExecuteActions",
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}

export type ExecuteActionsState = BasePhaseState & {
  type: "executeActions";
  allCharacterCommandList: Array<CommandDetail>;
  executingIndex: number;
  commandEffectCurrentFrame: number;
  commandEffectDuration: number;
};

export function createExecuteActionsState(value?: Partial<ExecuteActionsState>): ExecuteActionsState {
  return {
    type: "executeActions",
    allCharacterCommandList: value?.allCharacterCommandList ?? [],
    executingIndex: value?.executingIndex ?? 0,
    commandEffectCurrentFrame: value?.commandEffectCurrentFrame ?? 0,
    commandEffectDuration: value?.commandEffectDuration ?? 0,
  };
}

export type PhaseState =
  | PreparePhaseState
  | ReserveActionsState
  | SelectTargetState
  | PreExecuteActionsState
  | ExecuteActionsState;
