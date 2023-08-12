import { type CharacterState } from "./character-state";

export type FriendGraphicsState = {
  image: string;
};

export type FriendCommandState = {
  commandList: Array<[string, string]>;
  selectedCommandIndex: number;
  instructed: boolean;
};

export type FriendInPartyState = {
  position: number;
};

export type FriendCharacterState = {
  common: CharacterState;
  graphics: FriendGraphicsState;
  command: FriendCommandState;
  inParty: FriendInPartyState;
};

export type FriendListState = {
  list: Array<FriendCharacterState>;
};
