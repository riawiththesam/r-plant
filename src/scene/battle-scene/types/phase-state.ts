type BasePhaseState = {
  phase: string;
};

type PreparePhaseState = BasePhaseState & {
  phase: "prepare";
};

type ReserveActionsState = BasePhaseState & {
  phase: "reserveActions";
  characterIndex: number;
};

export type PhaseState = PreparePhaseState | ReserveActionsState;
