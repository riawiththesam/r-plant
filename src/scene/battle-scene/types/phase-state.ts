type BasePhaseState = {
  phase: string;
};

type PreparePhaseState = BasePhaseState & {
  phase: "prepare";
};

type ReserveActionsState = BasePhaseState & {
  phase: "reserveActions";
};

export type PhaseState = PreparePhaseState | ReserveActionsState;
