import { type CharacterState } from "./character-state";

export type FriendGraphicsState = {
  graphics: {
    image: string;
  };
};

export type FriendCharacterState = CharacterState & FriendGraphicsState;

export const friendListStateKeys = ["one", "two", "three", "four", "five", "six"] as const;
export type FriendListStateKey = (typeof friendListStateKeys)[number];
export type FriendListState = {
  [key in FriendListStateKey]?: FriendCharacterState;
};
