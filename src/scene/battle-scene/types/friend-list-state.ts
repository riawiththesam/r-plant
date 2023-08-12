import { produce } from "immer";
import { type CharacterState } from "./character-state";
import { type PhaseState } from "./phase-state";

export type FriendGraphicsState = {
  graphics: {
    image: string;
  };
};

export type FriendCommandState = {
  command: {
    commandList: Array<[string, string]>;
    selectedCommandIndex: number;
    instructed: boolean;
  };
};

export type FriendCharacterState = CharacterState & FriendGraphicsState & FriendCommandState;

export const friendListStateKeys = ["one", "two", "three", "four", "five", "six"] as const;
export type FriendListStateKey = (typeof friendListStateKeys)[number];
export type FriendListState = {
  [key in FriendListStateKey]?: FriendCharacterState;
};

export function applyInputFriendListStateIfPossible(current: FriendListState, input: "down" | "up"): FriendListState {
  const one = current.one;
  if (one == null) return current;
  const nextOne = produce(one, (draft) => {
    const indexDiff = input === "down" ? 1 : -1 + draft.command.commandList.length;
    const nextIndex = (draft.command.selectedCommandIndex + indexDiff) % draft.command.commandList.length;
    draft.command.selectedCommandIndex = nextIndex;
  });
  const next = produce(current, (draft) => {
    draft.one = nextOne;
  });
  return next;
}

export function applyInputDecide(current: PhaseState): PhaseState {
  return produce(current, (draft) => {
    draft.phase = "executeActions";
  });
}
