export const phaseTypes = ["prepare", "reserveActions", "selectTarget", "preExecuteActions", "executeActions"] as const;
export type PhaseType = (typeof phaseTypes)[number];

export type BasePhaseState = {
  type: PhaseType;
};

export type PreparePhaseState = BasePhaseState & {
  type: "prepare";
};

export type ActorType = "enemy" | "friend";

export type CommandDetail = {
  actorType: ActorType;
  actorIndex: number;
  commandType: string;
  targetList: Array<number>;
};

export type ReserveActionsState = BasePhaseState & {
  type: "reserveActions";
  characterIndex: number;
  selectedCommandIndex: number;
  reservedCommandList: Array<CommandDetail>;
};

export function createReserveActinsState(value?: Partial<ReserveActionsState>): ReserveActionsState {
  return {
    type: "reserveActions",
    characterIndex: value?.characterIndex ?? 0,
    selectedCommandIndex: value?.selectedCommandIndex ?? 0,
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}

export type SelectTargetState = BasePhaseState & {
  type: "selectTarget";
  characterIndex: number;
  selectedCommandIndex: number;
  selectedEnemyTargetIndexes: Array<number>;
  reservedCommandList: Array<CommandDetail>;
};

export function createSelectTargetState(value?: Partial<SelectTargetState>): SelectTargetState {
  return {
    type: "selectTarget",
    characterIndex: value?.characterIndex ?? 0,
    selectedCommandIndex: value?.selectedCommandIndex ?? 0,
    selectedEnemyTargetIndexes: value?.selectedEnemyTargetIndexes ?? [],
    reservedCommandList: value?.reservedCommandList ?? [],
  };
}

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
