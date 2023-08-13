export const phaseTypes = ["prepare", "reserveActions", "selectTarget", "executeActions"] as const;
export type PhaseType = (typeof phaseTypes)[number];

type BasePhaseState = {
  phase: PhaseType;
};

type PreparePhaseState = BasePhaseState & {
  phase: "prepare";
};

type ReserveActionsState = BasePhaseState & {
  phase: "reserveActions";
  characterIndex: number;
};

type SelectTargetState = BasePhaseState & {
  phase: "selectTarget";
  characterIndex: number;
  selectedEnemyTargetIndexes: Array<number>;
};

type ExecuteActionsState = BasePhaseState & {
  phase: "executeActions";
};

export type PhaseState = PreparePhaseState | ReserveActionsState | SelectTargetState | ExecuteActionsState;
