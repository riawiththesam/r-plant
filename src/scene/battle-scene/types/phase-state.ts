export const phaseTypes = ["prepare", "reserveActions", "selectTarget", "executeActions"] as const;
export type PhaseType = (typeof phaseTypes)[number];

export type BasePhaseState = {
  phase: PhaseType;
};

export type PreparePhaseState = BasePhaseState & {
  phase: "prepare";
};

export type ReserveActionsState = BasePhaseState & {
  phase: "reserveActions";
  characterIndex: number;
  selectedCommandIndex: number;
};

export type SelectTargetState = BasePhaseState & {
  phase: "selectTarget";
  characterIndex: number;
  selectedEnemyTargetIndexes: Array<number>;
};

export type ExecuteActionsState = BasePhaseState & {
  phase: "executeActions";
};

export type PhaseState = PreparePhaseState | ReserveActionsState | SelectTargetState | ExecuteActionsState;
