export const phaseTypes = ["prepare", "reserveActions", "selectTarget", "preExecuteActions", "executeActions"] as const;
export type PhaseType = (typeof phaseTypes)[number];

export type BasePhaseState = {
  phase: PhaseType;
};

export type PreparePhaseState = BasePhaseState & {
  phase: "prepare";
};

export type ActorType = "enemy" | "friend";

export type CommandDetail = {
  actorType: ActorType;
  actorIndex: number;
  commandType: string;
  targetList: Array<number>;
};

export type ReserveActionsState = BasePhaseState & {
  phase: "reserveActions";
  characterIndex: number;
  selectedCommandIndex: number;
  reservedCommandList: Array<CommandDetail>;
};

export function createReserveActinsState(value: Partial<ReserveActionsState>): ReserveActionsState {
  return {
    phase: "reserveActions",
    characterIndex: value.characterIndex ?? 0,
    selectedCommandIndex: value.selectedCommandIndex ?? 0,
    reservedCommandList: value.reservedCommandList ?? [],
  };
}

export type SelectTargetState = BasePhaseState & {
  phase: "selectTarget";
  characterIndex: number;
  selectedCommandIndex: number;
  selectedEnemyTargetIndexes: Array<number>;
  reservedCommandList: Array<CommandDetail>;
};

export function createSelectTargetState(value: Partial<SelectTargetState>): SelectTargetState {
  return {
    phase: "selectTarget",
    characterIndex: value.characterIndex ?? 0,
    selectedCommandIndex: value.selectedCommandIndex ?? 0,
    selectedEnemyTargetIndexes: value.selectedEnemyTargetIndexes ?? [],
    reservedCommandList: value.reservedCommandList ?? [],
  };
}

export type PreExecuteActionsState = BasePhaseState & {
  phase: "preExecuteActions";
  reservedCommandList: Array<CommandDetail>;
};

export function createPreExecuteActionsState(value: Partial<PreExecuteActionsState>): PreExecuteActionsState {
  return {
    phase: "preExecuteActions",
    reservedCommandList: value.reservedCommandList ?? [],
  };
}

export type ExecuteActionsState = BasePhaseState & {
  phase: "executeActions";
  reservedCommandList: Array<CommandDetail>;
};

export function createExecuteActionsState(value: Partial<ExecuteActionsState>): ExecuteActionsState {
  return {
    phase: "executeActions",
    reservedCommandList: value.reservedCommandList ?? [],
  };
}

export type PhaseState =
  | PreparePhaseState
  | ReserveActionsState
  | SelectTargetState
  | PreExecuteActionsState
  | ExecuteActionsState;
