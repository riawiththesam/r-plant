export const phaseTypes = ["prepare", "reserveActions", "executeActions"] as const;
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

type ExecuteActionsState = BasePhaseState & {
  phase: "executeActions";
};

export type PhaseState = PreparePhaseState | ReserveActionsState | ExecuteActionsState;
