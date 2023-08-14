import { type BasePhaseState } from "../battle-phase-state";

export type PreparePhaseState = BasePhaseState & {
  type: "prepare";
};
