import { type ExecuteActionsState } from "./execute-actions-state/execute-actions-state";
import { type PreExecuteActionsState } from "./pre-execute-actions-state/pre-execute-actions-state";
import { type PreparePhaseState } from "./prepare-phase-state/prepare-phase-state";
import { type ReserveActionsState } from "./reserve-actions-state/reserve-actions-state";
import { type SelectTargetState } from "./select-target-state/select-target-state";

export const phaseTypes = ["prepare", "reserveActions", "selectTarget", "preExecuteActions", "executeActions"] as const;
export type PhaseType = (typeof phaseTypes)[number];

export type BasePhaseState = {
  type: PhaseType;
};

export type PhaseState =
  | PreparePhaseState
  | ReserveActionsState
  | SelectTargetState
  | PreExecuteActionsState
  | ExecuteActionsState;
