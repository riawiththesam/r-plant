import { type CharacterState } from "./character-state";

export type FriendParsonalState = {
  name: string;
};

export type FriendGraphicsState = {
  image: string;
};

export type FriendCommandState = {
  commandList: Array<[string, string]>;
};

export type FriendInPartyState = {
  position: number;
};

export type FriendCharacterState = {
  parsonal: FriendParsonalState;
  common: CharacterState;
  graphics: FriendGraphicsState;
  command: FriendCommandState;
  inParty: FriendInPartyState;
};

export type FriendListState = {
  list: Array<FriendCharacterState>;
};
