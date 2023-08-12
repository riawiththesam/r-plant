import { type CharacterState } from "./character-state";

export type FriendParsonalState = {
  name: string;
};

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
  parsonal: FriendParsonalState;
  common: CharacterState;
  graphics: FriendGraphicsState;
  command: FriendCommandState;
  reservedCommand: FriendReservedCommandState;
  inParty: FriendInPartyState;
};

export type FriendListState = {
  list: Array<FriendCharacterState>;
};
