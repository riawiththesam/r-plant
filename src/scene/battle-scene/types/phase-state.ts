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

type ExecuteActionsState = BasePhaseState & {
  phase: "executeActions";
};

export type PhaseState = PreparePhaseState | ReserveActionsState | ExecuteActionsState;
