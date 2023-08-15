import { type PersonalState } from "./personal-state";

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
  parsonal: PersonalState;
  graphics: FriendGraphicsState;
  command: FriendCommandState;
  inParty: FriendInPartyState;
};

export type FriendListState = {
  list: ReadonlyArray<FriendCharacterState>;
};
