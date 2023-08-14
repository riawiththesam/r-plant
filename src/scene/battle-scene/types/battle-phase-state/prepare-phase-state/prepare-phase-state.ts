import { type BasePhaseState } from "../battle-phase-state";

export type PreparePhaseState = BasePhaseState & {
  type: "prepare";
};

export function createPreparePhaseState(): PreparePhaseState {
  return {
    type: "prepare",
  };
}
