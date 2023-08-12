import { type CharacterState } from "./character-state";

export type FriendGraphicsState = {
  image: string;
};

export type FriendCommandState = {
  commandList: Array<[string, string]>;
  selectedCommandIndex: number;
};

export type FriendReservedCommandState = {
  command: string | undefined;
};

export type FriendInPartyState = {
  position: number;
};

export type FriendCharacterState = {
  common: CharacterState;
  graphics: FriendGraphicsState;
  command: FriendCommandState;
  reservedCommand: FriendReservedCommandState;
  inParty: FriendInPartyState;
};

export type FriendListState = {
  list: Array<FriendCharacterState>;
};
