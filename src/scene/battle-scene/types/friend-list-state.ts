import { type CharacterState } from "./character-state";

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
